import type { INodeProperties } from 'n8n-workflow';

const showOnlyForContact = {
	resource: ['contact'],
};

const createOrUpdate = { resource: ['contact'], operation: ['createOrUpdate'] };

const bodyBool = (property: string) => ({
	send: { type: 'body' as const, property, value: '={{$value ? 1 : 0}}' },
});

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
		displayOptions: { show: createOrUpdate },
		routing: { send: { type: 'body', property: 'phone_number' } },
	},
	{
		displayName: 'Update If Contact Exists',
		name: 'force_update',
		type: 'boolean',
		default: true,
		description:
			'Whether to update the contact when the phone number already exists. When off, an existing contact makes the request fail with "409 Contact already exists".',
		displayOptions: { show: createOrUpdate },
		routing: bodyBool('force_update'),
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: createOrUpdate },
		options: [
			{
				displayName: 'Add to Power Dialer',
				name: 'add_to_powerdialer',
				type: 'boolean',
				default: false,
				description: "Whether to add the contact to the assigned user's Power Dialer",
				routing: bodyBool('add_to_powerdialer'),
			},
			{
				displayName: 'Address',
				name: 'address',
				type: 'string',
				default: '',
				routing: { send: { type: 'body', property: 'address' } },
			},
			{
				displayName: 'Assigned User Name or ID',
				name: 'user_id',
				type: 'options',
				default: '',
				description:
					'Aloware user (agent) to assign this contact to. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
				typeOptions: { loadOptionsMethod: 'getUsers' },
				routing: { send: { type: 'body', property: 'user_id' } },
			},
			{
				displayName: 'Check Available Users',
				name: 'check_available_users',
				type: 'boolean',
				default: false,
				description:
					'Whether to assign the contact only to a user who is currently available (used with Distribute to Ring Group)',
				routing: bodyBool('check_available_users'),
			},
			{
				displayName: 'Check Available Users With Fallback',
				name: 'check_available_users_with_fallback',
				type: 'boolean',
				default: false,
				description:
					'Whether to fall back to any ring group member when no user is currently available',
				routing: bodyBool('check_available_users_with_fallback'),
			},
			{
				displayName: 'City',
				name: 'city',
				type: 'string',
				default: '',
				routing: { send: { type: 'body', property: 'city' } },
			},
			{
				displayName: 'Company Name',
				name: 'company_name',
				type: 'string',
				default: '',
				routing: { send: { type: 'body', property: 'company_name' } },
			},
			{
				displayName: 'Country',
				name: 'country',
				type: 'string',
				default: '',
				routing: { send: { type: 'body', property: 'country' } },
			},
			{
				displayName: 'Custom Field 1',
				name: 'csf1',
				type: 'string',
				default: '',
				routing: { send: { type: 'body', property: 'csf1' } },
			},
			{
				displayName: 'Custom Field 2',
				name: 'csf2',
				type: 'string',
				default: '',
				routing: { send: { type: 'body', property: 'csf2' } },
			},
			{
				displayName: 'Date of Birth',
				name: 'date_of_birth',
				type: 'dateTime',
				default: '',
				description: 'Sent to Aloware as YYYY-MM-DD',
				routing: {
					send: {
						type: 'body',
						property: 'date_of_birth',
						value: '={{ $value ? DateTime.fromISO($value).toFormat("yyyy-LL-dd") : undefined }}',
					},
				},
			},
			{
				displayName: 'Disposition Status ID',
				name: 'disposition_status_id',
				type: 'string',
				default: '',
				routing: { send: { type: 'body', property: 'disposition_status_id' } },
			},
			{
				displayName: 'Distribute to Ring Group',
				name: 'distribute_to_ring_group',
				type: 'boolean',
				default: false,
				description: 'Whether to assign the contact to a member of the ring group given in Ring Group ID',
				routing: bodyBool('distribute_to_ring_group'),
			},
			{
				displayName: 'Do Not Contact (DNC)',
				name: 'is_dnc',
				type: 'boolean',
				default: false,
				description: 'Whether to mark the contact as Do Not Contact',
				routing: bodyBool('is_dnc'),
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
				displayName: 'First Name',
				name: 'first_name',
				type: 'string',
				default: '',
				routing: { send: { type: 'body', property: 'first_name' } },
			},
			{
				displayName: 'Force Update Sequence',
				name: 'force_update_sequence',
				type: 'boolean',
				default: false,
				description:
					'Whether to move the contact into the given sequence even if already enrolled in another one',
				routing: bodyBool('force_update_sequence'),
			},
			{
				displayName: 'Last Name',
				name: 'last_name',
				type: 'string',
				default: '',
				routing: { send: { type: 'body', property: 'last_name' } },
			},
			{
				displayName: 'Lead Source',
				name: 'lead_source',
				type: 'string',
				default: '',
				routing: { send: { type: 'body', property: 'lead_source' } },
			},
			{
				displayName: 'Line ID',
				name: 'line_id',
				type: 'string',
				default: '',
				description: 'Aloware line to associate the contact with',
				routing: { send: { type: 'body', property: 'line_id' } },
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
				displayName: 'Notes',
				name: 'notes',
				type: 'string',
				typeOptions: { rows: 3 },
				default: '',
				routing: { send: { type: 'body', property: 'notes' } },
			},
			{
				displayName: 'Other Phone Numbers (Comma-Separated)',
				name: 'other_phone_numbers',
				type: 'string',
				default: '',
				routing: { send: { type: 'body', property: 'other_phone_numbers' } },
			},
			{
				displayName: 'Power Dialer Position',
				name: 'powerdialer_position',
				type: 'options',
				default: 'bottom',
				options: [
					{ name: 'Top', value: 'top' },
					{ name: 'Bottom', value: 'bottom' },
				],
				description: 'Where in the Power Dialer queue the contact is inserted',
				routing: { send: { type: 'body', property: 'powerdialer_position' } },
			},
			{
				displayName: 'Ring Group ID',
				name: 'ring_group_id',
				type: 'string',
				default: '',
				description: 'Ring group used by Distribute to Ring Group',
				routing: { send: { type: 'body', property: 'ring_group_id' } },
			},
			{
				displayName: 'Sequence ID',
				name: 'sequence_id',
				type: 'string',
				default: '',
				description: 'Enroll the contact into this sequence right after saving',
				routing: { send: { type: 'body', property: 'sequence_id' } },
			},
			{
				displayName: 'State',
				name: 'state',
				type: 'string',
				default: '',
				routing: { send: { type: 'body', property: 'state' } },
			},
			{
				displayName: 'Tag ID',
				name: 'tag_id',
				type: 'string',
				default: '',
				description: 'ID of an existing tag to apply (use Tags for names)',
				routing: { send: { type: 'body', property: 'tag_id' } },
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
				displayName: 'Timezone',
				name: 'timezone',
				type: 'string',
				default: '',
				placeholder: 'America/Los_Angeles',
				description: 'IANA timezone name',
				routing: { send: { type: 'body', property: 'timezone' } },
			},
			{
				displayName: 'Website',
				name: 'website',
				type: 'string',
				default: '',
				routing: { send: { type: 'body', property: 'website' } },
			},
			{
				displayName: 'ZIP Code',
				name: 'zipcode',
				type: 'string',
				default: '',
				routing: { send: { type: 'body', property: 'zipcode' } },
			},
		],
	},
];
