import type { INodeProperties } from 'n8n-workflow';

const showOnlyForContact = {
	resource: ['contact'],
};

export const contactDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForContact },
		options: [
			{
				name: 'Lookup by Phone',
				value: 'lookupByPhone',
				action: 'Look up a contact by phone number',
				description: 'Find a contact by their phone number',
				routing: {
					request: {
						method: 'GET',
						url: '/api/v1/webhook/contact/phone-number',
					},
				},
			},
			{
				name: 'Create or Update',
				value: 'createOrUpdate',
				action: 'Create or update a contact',
				description: 'Create a new contact or update if phone number already exists',
				routing: {
					request: {
						method: 'POST',
						url: '/api/v1/webhook/forms',
					},
				},
			},
		],
		default: 'lookupByPhone',
	},

	// ----- Lookup by Phone -----
	{
		displayName: 'Phone Number',
		name: 'phone_number',
		type: 'string',
		required: true,
		default: '',
		placeholder: '+18181234567',
		description: 'Phone number to look up (E.164 or local format)',
		displayOptions: {
			show: { resource: ['contact'], operation: ['lookupByPhone'] },
		},
		routing: {
			send: { type: 'query', property: 'phone_number' },
		},
	},

	// ----- Create or Update -----
	{
		displayName: 'Phone Number',
		name: 'phone_number',
		type: 'string',
		required: true,
		default: '',
		placeholder: '+18181234567',
		description: 'Contact phone number (unique identifier)',
		displayOptions: {
			show: { resource: ['contact'], operation: ['createOrUpdate'] },
		},
		routing: { send: { type: 'body', property: 'phone_number' } },
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: { resource: ['contact'], operation: ['createOrUpdate'] },
		},
		options: [
			{
				displayName: 'First Name',
				name: 'first_name',
				type: 'string',
				default: '',
				routing: { send: { type: 'body', property: 'first_name' } },
			},
			{
				displayName: 'Last Name',
				name: 'last_name',
				type: 'string',
				default: '',
				routing: { send: { type: 'body', property: 'last_name' } },
			},
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				placeholder: 'name@example.com',
				default: '',
				routing: { send: { type: 'body', property: 'email' } },
			},
			{
				displayName: 'Company Name',
				name: 'company_name',
				type: 'string',
				default: '',
				routing: { send: { type: 'body', property: 'company_name' } },
			},
			{
				displayName: 'Notes',
				name: 'notes',
				type: 'string',
				typeOptions: { rows: 3 },
				default: '',
				routing: { send: { type: 'body', property: 'notes' } },
			},
			{
				displayName: 'Tags (Comma-Separated)',
				name: 'tags',
				type: 'string',
				default: '',
				description: 'Tag names to apply to the contact, separated by commas',
				routing: { send: { type: 'body', property: 'tags' } },
			},
			{
				displayName: 'List IDs (Comma-Separated)',
				name: 'list_ids',
				type: 'string',
				default: '',
				description: 'Aloware list IDs to add the contact to, separated by commas',
				routing: { send: { type: 'body', property: 'list_ids' } },
			},
			{
				displayName: 'Assigned User ID',
				name: 'user_id',
				type: 'number',
				default: 0,
				description: 'Aloware user (agent) ID to assign this contact to',
				routing: { send: { type: 'body', property: 'user_id' } },
			},
		],
	},
];
