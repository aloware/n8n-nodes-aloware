# n8n-nodes-aloware

This is an [n8n](https://n8n.io) community node for [Aloware](https://aloware.com) — an AI-powered contact center platform for SMS, voice calls, power dialing and sales outreach.

It lets you call the Aloware API from n8n workflows to manage contacts, send SMS/MMS, enroll contacts into sequences, and manage power dialer lists.

[Installation](#installation)  
[Operations](#operations)  
[Example use cases](#example-use-cases)  
[Credentials](#credentials)  
[Compatibility](#compatibility)  
[Resources](#resources)

## Installation

Follow the [community nodes installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n documentation.

In your n8n instance go to **Settings → Community Nodes → Install** and enter:

```
n8n-nodes-aloware
```

> Community nodes run only on **self-hosted n8n**. They cannot be installed on n8n Cloud.

## Operations

### Contact
- **Lookup by Phone** — find a contact by phone number
- **Create or Update** — create a new contact or update an existing one by phone number (supports first/last name, email, company, notes, tags, list IDs, assigned user)

### SMS
- **Send** — send an SMS or MMS message (supports sending from a phone number or line ID, user-ownership modes, MMS image, force-random, and up to 3 custom fields)

### User
- **Get Many** — list all Aloware users (agents) in the account

### Sequence
- **Enroll Contact** — add a contact to an Aloware sequence (identify contact by phone number or by ID from Aloware, HubSpot, Zoho, Guesty, or Pipedrive; optional force enrollment)
- **Disenroll Contact** — remove a contact from all sequences

### Power Dialer
- **Remove Contact from Lists** — remove a contact from every Power Dialer list
- **Clear List** — remove every contact from a specific Power Dialer list
- **Clear User Lists** — remove every contact from all Power Dialer lists owned by a given user

## Example use cases

### Text every new CRM lead within seconds

`HubSpot Trigger` → `Aloware: Contact – Create or Update` → `Aloware: SMS – Send`

Push the new lead into Aloware so your agents see it, then send the first touch
immediately instead of waiting for someone to pick up the phone.

```
Contact – Create or Update
  Phone Number: {{ $json.properties.phone }}
  Additional Fields:
    First Name:  {{ $json.properties.firstname }}
    Email:       {{ $json.properties.email }}
    Tags:        webform,hot-lead

SMS – Send
  Send From: Phone Number (From)
  From:      +18885551234          ← one of your Aloware line numbers
  To:        {{ $json.properties.phone }}
  Message:   Hi {{ $json.properties.firstname }}, thanks for reaching out! An agent will call you shortly.
```

### Start a nurture sequence from a website form

`n8n Form Trigger` → `Aloware: Sequence – Enroll Contact`

```
Sequence – Enroll Contact
  Sequence ID: 4821
  Source:      Phone Number
  Phone Number: {{ $json.phone }}
  Force Enroll: false
```

### Stop messaging a customer once the deal closes

`Salesforce Trigger` (Opportunity → Closed Won) → `Aloware: Sequence – Disenroll Contact`

Removes the contact from every active sequence so a new customer never receives
another prospecting message.

### Reduce no-shows with an appointment reminder

`Schedule Trigger` (hourly) → `Google Calendar: Get Many` → `Aloware: SMS – Send`

Look up meetings starting in the next hour and text each attendee a confirmation.

### Clean up a Power Dialer list after a campaign

`Schedule Trigger` (nightly) → `Aloware: Power Dialer – Clear List`

```
Power Dialer – Clear List
  List ID: 1207
```

### Let an AI agent send messages on your behalf

This node sets `usableAsTool: true`, so it can be attached directly to n8n's
**AI Agent** node. Give the agent the Aloware node as a tool and it can look up a
contact and send an SMS as part of its reasoning — no code, no HTTP Request node.

`AI Agent` → tool: `Aloware: SMS – Send`

> Tip: numeric fields such as **Sequence ID**, **List ID** and **User ID** come from
> your Aloware account. Run **User – Get Many** once to discover user IDs, and read
> sequence and list IDs from their URLs in the Aloware UI.

## Credentials

You need an **API Token** from your Aloware account. Generate it from Aloware **UI → Integrations → API Tokens**.

All requests are sent to the Aloware production API (`https://app.aloware.io`).

The token is sent automatically with every request (as a query parameter for `GET` and in the body for `POST`, matching Aloware's webhook API convention).

## Compatibility

- Tested with self-hosted n8n up to `2.23`
- Tested against Node.js 22 LTS
- Published with [npm provenance](https://docs.npmjs.com/generating-provenance-statements) — every release is cryptographically traceable to the commit it was built from

## Resources

Aloware API documentation (per resource used by this node):

- [Lead API (Contacts — Lookup / Create or Update)](https://support.aloware.com/en/articles/9020058-aloware-lead-api-documentation)
- [SMS API (Send SMS / MMS)](https://support.aloware.com/en/articles/9020040-api-documentation-aloware-sms-api-integration)
- [Users API (List users / agents)](https://support.aloware.com/en/articles/9352647-api-documentation-users-api)
- [Sequence API (Enroll / Disenroll contacts)](https://support.aloware.com/en/articles/9020073-aloware-sequence-api-enroll-and-disenroll-contacts-in-sequences)
- [Power Dialer APIs (Manage lists)](https://support.aloware.com/en/articles/9167815-aloware-power-dialer-apis)
- [Webhooks overview](https://support.aloware.com/en/collections/8591828-webhooks)

n8n:

- [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)

## License

[MIT](LICENSE.md)
