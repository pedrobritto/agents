const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const snapshotPath = path.resolve(__dirname, '../.skill-lock.json');
const globalLockPath = path.join(os.homedir(), '.agents/.skill-lock.json');

function readLock(file) {
  const lock = JSON.parse(fs.readFileSync(file, 'utf8'));

  if (lock.version !== 3 || !lock.skills || typeof lock.skills !== 'object' || Array.isArray(lock.skills)) {
    throw new Error(`Expected a version 3 Skills CLI lockfile: ${file}`);
  }

  for (const [name, entry] of Object.entries(lock.skills)) {
    if (!name || name.startsWith('-') || !entry || typeof entry !== 'object' ||
        typeof entry.sourceType !== 'string' || typeof entry.source !== 'string' || !entry.source) {
      throw new Error(`Invalid skill entry: ${name}`);
    }

    for (const field of ['sourceUrl', 'ref', 'commit']) {
      if (entry[field] !== undefined && (typeof entry[field] !== 'string' || !entry[field])) {
        throw new Error(`Invalid ${field} for skill: ${name}`);
      }
    }
  }

  return lock;
}

function syncSkills() {
  const lock = readLock(globalLockPath);
  const skills = Object.fromEntries(
    Object.entries(lock.skills)
      .filter(([, entry]) => entry.sourceType !== 'local')
      .sort(([left], [right]) => left.localeCompare(right))
  );

  fs.writeFileSync(snapshotPath, `${JSON.stringify({ version: 3, skills }, null, 2)}\n`);
  console.log(`Saved ${Object.keys(skills).length} external skills to ${snapshotPath}`);
}

function installSkills() {
  const lock = readLock(snapshotPath);
  const installs = Object.entries(lock.skills).map(([name, entry]) => {
    if (entry.sourceType === 'local') {
      throw new Error(`Local skill ${name} must be deployed with copy:global:skills`);
    }

    const source = entry.sourceUrl || entry.source;
    if (source.startsWith('-') || source.startsWith('/') || source.startsWith('.') ||
        source.startsWith('~') || source.startsWith('file:') || /^[A-Za-z]:[\\/]/.test(source)) {
      throw new Error(`Expected a remote source for skill: ${name}`);
    }

    const ref = entry.commit || entry.ref;
    const installSource = ref ? `${source.split('#')[0]}#${ref}` : source;
    return [name, installSource];
  });

  for (const [name, source] of installs) {
    console.log(`Installing ${name} from ${source}`);
    const result = spawnSync('pnpm', [
      'dlx', 'skills@1.9.0', 'add', source,
      '--global', '--skill', name,
      '--agent', 'codex', 'pi', 'claude-code', '--yes', '--full-depth',
    ], { stdio: 'inherit' });

    if (result.error) throw result.error;
    if (result.status !== 0) throw new Error(`Installation failed for ${name} (exit ${result.status})`);
  }

  console.log(`Installed ${installs.length} external skills.`);
}

try {
  const command = process.argv[2];

  if (process.argv.length !== 3 || !['sync', 'install'].includes(command)) {
    throw new Error('Usage: node scripts/manage-skills.cjs <sync|install>');
  }

  if (command === 'sync') syncSkills();
  else installSkills();
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
