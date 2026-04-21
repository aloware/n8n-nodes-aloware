import type { INodeProperties } from 'n8n-workflow';

const showOnlyForSms = { resource: ['sms'] };

export const smsDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForSms },
		options: [
			{
				name: 'Send',
				value: 'send',
				action: 'Send an SMS or MMS',
				description: 'Send an SMS or MMS through Aloware',
				routing: {
					request: {
						method: 'POST',
						url: '/api/v1/webhook/sms-gateway/send',
					},
				},
			},
		],
		default: 'send',
	},

	// ----- Sender selector: From Phone OR Line ID -----
	{
		displayName: 'Send From',
		name: 'senderType',
		type: 'options',
		required: true,
		default: 'from',
		description: 'Choose how to identify the sending number',
		options: [
			{ name: 'Phone Number (From)', value: 'from' },
			{ name: 'Line ID', value: 'line_id' },
		],
		displayOptions: { show: { resource: ['sms'], operation: ['send'] } },
	},
	{
		displayName: 'From (Phone Number)',
		name: 'from',
		type: 'string',
		required: true,
		default: '',
		placeholder: '+18552562001',
		description: 'One of your Aloware line phone numbers (E.164 format)',
		displayOptions: { show: { resource: ['sms'], operation: ['send'], senderType: ['from'] } },
		routing: { send: { type: 'body', property: 'from' } },
	},
	{
		displayName: 'Line ID',
		name: 'line_id',
		type: 'number',
		required: true,
		default: 0,
		description: 'Aloware line ID to send from',
		displayOptions: { show: { resource: ['sms'], operation: ['send'], senderType: ['line_id'] } },
		routing: { send: { type: 'body', property: 'line_id' } },
	},

	// ----- Required: To, Message -----
	{
		displayName: 'To (Phone Number)',
		name: 'to',
		type: 'string',
		required: true,
		default: '',
		placeholder: '+18181234567',
		description: 'Recipient phone number in E.164 format',
		displayOptions: { show: { resource: ['sms'], operation: ['send'] } },
		routing: { send: { type: 'body', property: 'to' } },
	},
	{
		displayName: 'Message',
		name: 'message',
		type: 'string',
		typeOptions: { rows: 4 },
		required: true,
		default: '',
		description: 'Text body of the message. Limit 160 characters per segment.',
		displayOptions: { show: { resource: ['sms'], operation: ['send'] } },
		routing: { send: { type: 'body', property: 'message' } },
	},

	// ----- Optional fields -----
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['sms'], operation: ['send'] } },
		options: [
			{
				displayName: 'Image URL (MMS)',
				name: 'image_url',
				type: 'string',
				default: '',
				description: 'Public URL of an image to send as MMS',
				routing: { send: { type: 'body', property: 'image_url' } },
			},
			{
				displayName: 'User ID',
				name: 'user_id',
				type: 'number',
				default: 0,
				description:
					'Send on behalf of a user. Use -1 for Company (no user ownership), 0 for contact owner (falls back to Company), or any valid Aloware user ID.',
				routing: { send: { type: 'body', property: 'user_id' } },
			},
			{
				displayName: 'Force Random',
				name: 'force_random',
				type: 'boolean',
				default: false,
				description: 'Whether to ignore number stickiness when selecting a sending number',
				routing: {
					send: {
						type: 'body',
						property: 'force_random',
						value: '={{$value ? 1 : 0}}',
					},
				},
			},
			{
				displayName: 'Custom Field 1',
				name: 'custom_field_1',
				type: 'string',
				default: '',
				description: 'Shown on the message as "Custom Field 1: <value>"',
				routing: { send: { type: 'body', property: 'custom_fields.custom_field_1' } },
			},
			{
				displayName: 'Custom Field 2',
				name: 'custom_field_2',
				type: 'string',
				default: '',
				description: 'Shown on the message as "Custom Field 2: <value>"',
				routing: { send: { type: 'body', property: 'custom_fields.custom_field_2' } },
			},
			{
				displayName: 'Custom Field 3',
				name: 'custom_field_3',
				type: 'string',
				default: '',
				description: 'Shown on the message as "Custom Field 3: <value>"',
				routing: { send: { type: 'body', property: 'custom_fields.custom_field_3' } },
			},
		],
	},
];
