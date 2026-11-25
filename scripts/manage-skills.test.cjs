const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { test } = require('node:test');

function fixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'agents-skills-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const repo = path.join(root, 'repo');
  const home = path.join(root, 'home');
  const bin = path.join(root, 'bin');
  const calls = path.join(root, 'calls.jsonl');

  for (const dir of [path.join(repo, 'scripts'), path.join(home, '.agents'), bin]) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.copyFileSync(path.join(__dirname, 'manage-skills.cjs'), path.join(repo, 'scripts/manage-skills.cjs'));
  fs.writeFileSync(path.join(bin, 'pnpm'), `#!${process.execPath}
const fs = require('node:fs');
fs.appendFileSync(process.env.CALLS_FILE, JSON.stringify(process.argv.slice(2)) + '\\n');
process.exit(Number(process.env.CLI_EXIT || 0));
`, { mode: 0o755 });

  return {
    writeGlobal(lock) {
      fs.writeFileSync(path.join(home, '.agents/.skill-lock.json'), JSON.stringify(lock));
    },
    writeSnapshot(lock) {
      fs.writeFileSync(path.join(repo, '.skill-lock.json'), JSON.stringify(lock));
    },
    snapshot() {
      return JSON.parse(fs.readFileSync(path.join(repo, '.skill-lock.json'), 'utf8'));
    },
    calls() {
      return fs.existsSync(calls)
        ? fs.readFileSync(calls, 'utf8').trim().split('\n').map(line => JSON.parse(line))
        : [];
    },
    run(command, env = {}) {
      return spawnSync(process.execPath, [path.join(repo, 'scripts/manage-skills.cjs'), command], {
        cwd: root,
        encoding: 'utf8',
        env: { ...process.env, HOME: home, PATH: `${bin}${path.delimiter}${process.env.PATH}`, CALLS_FILE: calls, ...env },
      });
    },
  };
}

const external = {
  source: 'example/skills',
  sourceType: 'github',
  sourceUrl: 'https://github.com/example/skills.git',
  skillFolderHash: 'folder-hash',
};

test('sync captures external entries without local paths or CLI preferences', t => {
  const f = fixture(t);
  const lock = {
    version: 3,
    skills: {
      local: { sourceType: 'local', source: '/old/machine/deleted-skill' },
      external,
    },
    lastSelectedAgents: ['unrelated-agent'],
  };
  f.writeGlobal(lock);
  const result = f.run('sync');

  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(f.snapshot(), { version: 3, skills: { external } });
  assert.deepEqual(f.calls(), []);
});

test('sync supports an empty external list', t => {
  const f = fixture(t);
  f.writeGlobal({ version: 3, skills: {} });

  assert.equal(f.run('sync').status, 0);
  assert.deepEqual(f.snapshot(), { version: 3, skills: {} });
});

test('sync does not overwrite the snapshot when the global lock is missing or invalid', t => {
  const f = fixture(t);
  const snapshot = { version: 3, skills: { external } };
  f.writeSnapshot(snapshot);

  assert.notEqual(f.run('sync').status, 0);
  f.writeGlobal({ version: 2, skills: {} });
  assert.notEqual(f.run('sync').status, 0);
  f.writeGlobal({ version: 3, skills: { invalid: {} } });
  assert.notEqual(f.run('sync').status, 0);
  assert.deepEqual(f.snapshot(), snapshot);
});

test('install uses the pinned CLI, explicit skills, global scope, and the three harnesses', t => {
  const f = fixture(t);
  const snapshot = { version: 3, skills: { external: { ...external, ref: 'v1.2.3' } } };
  f.writeSnapshot(snapshot);
  const result = f.run('install');

  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(f.calls(), [[
    'dlx', 'skills@1.9.0', 'add', `${external.sourceUrl}#v1.2.3`,
    '--global', '--skill', 'external', '--agent', 'codex', 'pi', 'claude-code', '--yes', '--full-depth',
  ]]);
  assert.deepEqual(f.snapshot(), snapshot);
});

test('install prefers a recorded commit over a moving ref', t => {
  const f = fixture(t);
  f.writeSnapshot({ version: 3, skills: { external: { ...external, ref: 'main', commit: 'abc123' } } });

  assert.equal(f.run('install').status, 0);
  assert.equal(f.calls()[0][3], `${external.sourceUrl}#abc123`);
});

test('install supports an unpinned source shorthand when no source URL is recorded', t => {
  const f = fixture(t);
  f.writeSnapshot({ version: 3, skills: { external: { source: 'example/skills', sourceType: 'github' } } });

  assert.equal(f.run('install').status, 0);
  assert.equal(f.calls()[0][3], 'example/skills');
});

test('install with an empty snapshot does not invoke the CLI', t => {
  const f = fixture(t);
  f.writeSnapshot({ version: 3, skills: {} });

  assert.equal(f.run('install').status, 0);
  assert.deepEqual(f.calls(), []);
});

test('install validates all entries before invoking the CLI', t => {
  const f = fixture(t);

  for (const bad of [
    { sourceType: 'local', source: '/machine/local' },
    { ...external, sourceUrl: '--all' },
    { ...external, sourceUrl: '/machine/local' },
    { ...external, sourceUrl: 'file:///machine/local' },
    { ...external, ref: 123 },
  ]) {
    f.writeSnapshot({ version: 3, skills: { external, bad } });
    assert.notEqual(f.run('install').status, 0);
    assert.deepEqual(f.calls(), []);
  }
});

test('install stops on CLI failure and reports it', t => {
  const f = fixture(t);
  f.writeSnapshot({ version: 3, skills: { external, second: external } });
  const result = f.run('install', { CLI_EXIT: '7' });

  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Installation failed for external \(exit 7\)/);
  assert.equal(f.calls().length, 1);
});
