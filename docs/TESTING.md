# Verification

Run `npm test` and `npm run check`.

- 22 automated tests cover geography and the 23-delegation roster, directional evidence, proposal separation, conflicts, historical revisions, backup validation, CSV, ballot rules, and the AI endpoint with a mocked provider.
- Browser smoke checks opened the home map, created a synthetic France statement, saved a three-line summary and an approved proposal assessment, and verified after reload that France showed proposal support and an unknown UK relationship. The unconfigured AI endpoint showed a clear error with manual entry still available.
- A live provider call requires account credentials and remains unverified. Deployment, mobile layout, and end-to-end PDF import and backup restoration were not exercised here. PDF extraction needs a text layer. Geography is a present-day Natural Earth reference. The country overview uses the latest available statement summary.
