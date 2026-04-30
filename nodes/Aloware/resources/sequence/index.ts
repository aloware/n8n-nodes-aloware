import type { INodeProperties } from 'n8n-workflow';

const showOnlyForSequence = { resource: ['sequence'] };

const sourceOptions = [
	{ name: 'Phone Number', value: 'phone_number' },
	{ name: 'Aloware Contact ID', value: 'aloware' },
	{ name: 'HubSpot', value: 'hubspot' },
	{ name: 'Zoho', value: 'zoho' },
	{ name: 'Guesty', value: 'guesty' },
	{ name: 'Pipedrive', value: 'pipedrive' },
];

export const sequenceDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForSequence },
		options: [
			{
				name: 'Enroll Contact',
				value: 'enroll',
				action: 'Enroll a contact into a sequence',
				description: 'Add a contact to an Aloware sequence',
				routing: {
					request: {
						method: 'POST',
						url: '/api/v1/webhook/sequence-enroll',
					},
				},
			},
			{
				name: 'Disenroll Contact',
				value: 'disenroll',
				action: 'Disenroll a contact from all sequences',
				description: 'Remove a contact from all Aloware sequences',
				routing: {
					request: {
						method: 'POST',
						url: '/api/v1/webhook/sequence-disenroll',
					},
				},
			},
		],
		default: 'enroll',
	},

	// ----- Enroll: sequence_id -----
	{
		displayName: 'Sequence ID',
		name: 'sequence_id',
		type: 'string',
		required: true,
		default: '',
		description: 'ID of the Aloware sequence to enroll the contact into',
		displayOptions: { show: { resource: ['sequence'], operation: ['enroll'] } },
		routing: { send: { type: 'body', property: 'sequence_id' } },
	},

	// ----- Source (both Enroll and Disenroll) -----
	{
		displayName: 'Source',
		name: 'source',
		type: 'options',
		required: true,
		default: 'phone_number',
		description: 'How the contact is identified. Choose Phone Number to use a phone, or pick a CRM to identify the contact by its ID in that system.',
		options: sourceOptions,
		displayOptions: { show: { resource: ['sequence'] } },
		routing: { send: { type: 'body', property: 'source' } },
	},

	// ----- Phone Number (when source=phone_number) -----
	{
		displayName: 'Phone Number',
		name: 'phone_number',
		type: 'string',
		required: true,
		default: '',
		placeholder: '+18181234567',
		description: 'Contact phone number (used when Source is Phone Number)',
		displayOptions: {
			show: { resource: ['sequence'], source: ['phone_number'] },
		},
		routing: { send: { type: 'body', property: 'phone_number' } },
	},

	// ----- Contact ID (when source != phone_number) -----
	{
		displayName: 'Contact ID',
		name: 'id',
		type: 'string',
		required: true,
		default: '',
		description: 'ID of the contact in the selected source system',
		displayOptions: {
			show: { resource: ['sequence'] },
			hide: { source: ['phone_number'] },
		},
		routing: { send: { type: 'body', property: 'id' } },
	},

	// ----- Force Enroll (Enroll only) -----
	{
		displayName: 'Force Enroll',
		name: 'force_enroll',
		type: 'boolean',
		default: false,
		description: 'Whether to enroll the contact even if already enrolled in another sequence',
		displayOptions: { show: { resource: ['sequence'], operation: ['enroll'] } },
		routing: {
			send: {
				type: 'body',
				property: 'force_enroll',
				value: '={{$value ? 1 : 0}}',
			},
		},
	},
];
