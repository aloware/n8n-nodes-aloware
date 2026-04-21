# n8n-nodes-aloware

This is an [n8n](https://n8n.io) community node for [Aloware](https://aloware.com) — an AI-powered contact center platform for SMS, voice calls, power dialing and sales outreach.

It lets you call the Aloware API from n8n workflows to manage contacts, send SMS/MMS, trigger calls, and orchestrate sequences and power dialer lists.

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
- **Create or Update** — create a new contact or update an existing one by phone number

### SMS
- **Send** — send an SMS or MMS message

### User
- **Get Many** — list all Aloware users (agents) in the account

More operations (Call, Sequence, Power Dialer) will ship in upcoming releases.

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
