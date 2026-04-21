# n8n-nodes-aloware

This is an [n8n](https://n8n.io) community node for [Aloware](https://aloware.com) — an AI-powered contact center platform for SMS, voice calls, power dialing and sales outreach.

It lets you call the Aloware API from n8n workflows to manage contacts, send SMS/MMS, enroll contacts into sequences, and manage power dialer lists.

[Installation](#installation)  
[Operations](#operations)  
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

## Credentials

You need an **API Token** from your Aloware account. Generate it from Aloware **UI → Integrations → API Tokens**.

When creating the credential in n8n you can choose between:
- **Production** — `https://app.aloware.io`
- **Development** — `https://app.alodev.org`

The token is sent automatically with every request (as a query parameter for `GET` and in the body for `POST`, matching Aloware's webhook API convention).

## Compatibility

- Requires n8n version `1.0` or later
- Tested against Node.js 22 LTS

## Resources

- [Aloware API documentation](https://support.aloware.com/en/articles/9020040-api-documentation-aloware-sms-api-integration)
- [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)

## License

[MIT](LICENSE.md)
