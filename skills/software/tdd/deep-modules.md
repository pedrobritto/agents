# Deep Modules

Pick Deep Modules when possible. Shallow only when deep not possible.

Deep modules have:

- small interface. e.g. Few methods, simple params.
- hidden, but well built, complex logic.

In contrast, shallow module have:

- large interface: Many methods, complex params.
- little implementation.

When designing interfaces, ask:

- Can I reduce number of methods?
- Can I simplify parameters?
- Can I hide more complexity inside?
