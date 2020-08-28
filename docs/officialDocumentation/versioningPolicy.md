# Versioning Policy

React follows [semantic versioning (semver)](https://semver.org/) principles.

1. MAJOR version when you make incompatible API changes,
1. MINOR version when you add functionality in a backwards compatible manner, and
1. PATCH version when you make backwards compatible bug fixes.

That means that with a version number x.y.z:

- When releasing critical bug fixes, we make a patch release by changing the z number (ex: 15.6.2 to 15.6.3).
- When releasing new features or non-critical fixes, we make a minor release by changing the y number (ex: 15.6.2 to 15.7.0).
- When releasing breaking changes, we make a major release by changing the x number (ex: 15.6.2 to 16.0.0).

Major releases can also contain new features, and any release can include bug fixes.

Minor releases are the most common type of release.

## What Counts as a Breaking Change?

In general, we don’t bump the major version number for changes to:

- Development warnings. Since these don’t affect production behavior, we may add new warnings or modify existing warnings in between major versions. In fact, this is what allows us to reliably warn about upcoming breaking changes.
- APIs starting with unstable*. These are provided as experimental features whose APIs we are not yet confident in. By releasing these with an unstable* prefix, we can iterate faster and get to a stable API sooner.
- Alpha and canary versions of React. We provide alpha versions of React as a way to test new features early, but we need the flexibility to make changes based on what we learn in the alpha period. If you use these versions, note that APIs may change before the stable release.
- Undocumented APIs and internal data structures. If you access internal property names like **SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED or **reactInternalInstance\$uk43rzhitjg, there is no warranty. You are on your own.

## If a Minor Release Includes No New Features, Why Isn’t It a Patch?

It’s possible that a minor release will not include new features. This is allowed by semver, which states ”[a minor version] MAY be incremented if substantial new functionality or improvements are introduced within the private code. It MAY include patch level changes.”

However, it does raise the question of why these releases aren’t versioned as patches instead.

The answer is that any change to React (or other software) carries some risk of breaking in unexpected ways. Imagine a scenario where a patch release that fixes one bug accidentally introduces a different bug. This would not only be disruptive to developers, but also harm their confidence in future patch releases. It’s especially regrettable if the original fix is for a bug that is rarely encountered in practice.

We have a pretty good track record for keeping React releases free of bugs, but patch releases have an even higher bar for reliability because most developers assume they can be adopted without adverse consequences.

For these reasons, we reserve patch releases only for the most critical bugs and security vulnerabilities.

If a release includes non-essential changes — such as internal refactors, changes to implementation details, performance improvements, or minor bugfixes — we will bump the minor version even when there are no new features.
