# Changelog

## [0.2.0] - 2026-09-08

### Added
- **Aloware Trigger** node. Starts a workflow on any Aloware webhook event — call and
  SMS dispositions, contact changes, appointments, voicemails, recordings, transcriptions
  and AloAi call summaries. Aloware has no API to register webhooks, so the node shows
  setup instructions and the user pastes the URL into *Integrations → Webhook
  Integration*. Optional filter by event family; the `{"body": …, "event": …}`
  envelope is flattened to `{event, …fields}` by default.
- **Call → Make Two-Legged Call** (`POST /two-legged-call`): ring an agent or a ring
  group first, then dial the contact by phone number or contact ID from a chosen line.
- **Contact → Create or Update** now sends `force_update` (**Update If Contact Exists**,
  on by default). Without it Aloware answers `409 Contact already exists` for any known
  phone number, so the operation was create-only in practice.
- **Contact → Create or Update** exposes the full `/forms` surface: lead source, date of
  birth, timezone, address/city/state/ZIP/country, website, custom fields, other phone
  numbers, line, sequence enrollment, Power Dialer placement, ring-group distribution,
  tag ID, disposition status and DNC.
- **User dropdowns.** Every user ID field (assigned user, two-legged call agent, Power
  Dialer owner) is now a searchable list loaded from `GET /users`, with expressions
  still allowed.

### Changed
- **Power Dialer → Clear List** documents that `list_id` must be an Aloware Classic list
  ID; Aloware Talk list numbers are rejected.
- **User → Get Many** documents that the endpoint has no pagination and always returns
  every user.
- `Contact → Create or Update → Assigned User` changed from a number field to a user
  dropdown. Existing workflows keep working; the stored value is the same user ID.

## [0.1.4] - 2026-08-12

### Changed
- Dropped the `.git` suffix from `repository.url`. The n8n Creator Portal's
  automated review reports the repository as "invalid or private" even though
  it is public and anonymously reachable; a checker that derives `owner/repo`
  from the URL without stripping `.git` would query a non-existent repository.

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
