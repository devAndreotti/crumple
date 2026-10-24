# Security Policy

## Supported versions

Security fixes go to the latest `1.x` release.

## Reporting a vulnerability

Please report security problems privately. Do not open a public issue or pull request for them.

Use the private advisory form: <https://github.com/devAndreotti/crumple/security/advisories/new>

Include:

- the version of the package (or the commit) and the browser you tested;
- the steps to reproduce, with a minimal page if you have one;
- the impact you expect (for example, a way to run script through a paper's text, or to read data it should not);
- whether you want to be credited in the fix.

Crumple builds its text on a canvas and in the DOM of the CSS fallback, and it never inserts the paper text as HTML. A report that shows otherwise is very welcome.

The maintainer will reply through the advisory and keep you posted until the fix is released.
