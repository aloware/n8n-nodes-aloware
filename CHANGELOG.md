# Changelog

## [0.1.3] - 2026-08-12

### Changed
- `repository.url` now matches the format used by the official n8n node
  template (plain `https://`, which npm normalises to `git+https://` on
  publish). Released so the n8n Creator Portal re-runs its automated review
  against the now-public repository.

## [0.1.2] - 2026-08-12

### Added
- **Example use cases** section in the README, covering lead follow-up, sequence
  enrollment, appointment reminders, Power Dialer cleanup and AI-agent usage.

### Changed
- Releases are now published through npm OIDC trusted publishing instead of a
  long-lived access token.
- Compatibility notes updated for n8n 2.23.

## [0.1.1] - 2026-08-12

### Fixed
- `peerDependencies.n8n-workflow` is now `*`, as required by the official
  `@n8n/scan-community-package` check for community nodes.
- `publishConfig.access` is set to `public` so npm can attach a provenance
  attestation when publishing.

## [0.1.0] - 2026-04-30

### Added
- Initial public release of the Aloware community node for n8n.
- `Aloware` action node with resources:
  - **Contact** — Lookup by Phone, Create or Update
  - **SMS** — Send (SMS/MMS, sender by phone number or line ID, user-ownership modes, custom fields)
  - **User** — Get Many
  - **Sequence** — Enroll Contact, Disenroll Contact
  - **Power Dialer** — Remove Contact from Lists, Clear List, Clear User Lists
- `Aloware API` credential (API token, production environment).
