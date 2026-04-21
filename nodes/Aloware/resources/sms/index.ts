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
				description: 'Send an SMS/MMS through Aloware',
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
	{
		displayName: 'To (Phone Number)',
		name: 'phone_number',
		type: 'string',
		required: true,
		default: '',
		placeholder: '+18181234567',
		description: 'Recipient phone number in E.164 format',
		displayOptions: { show: { resource: ['sms'], operation: ['send'] } },
		routing: { send: { type: 'body', property: 'phone_number' } },
	},
	{
		displayName: 'From User ID',
		name: 'user_id',
		type: 'number',
		required: true,
		default: 0,
		description: 'Aloware user ID the SMS is sent from',
		displayOptions: { show: { resource: ['sms'], operation: ['send'] } },
		routing: { send: { type: 'body', property: 'user_id' } },
	},
	{
		displayName: 'Message',
		name: 'body',
		type: 'string',
		typeOptions: { rows: 4 },
		required: true,
		default: '',
		description: 'Text body of the SMS. For MMS, also provide Media URL.',
		displayOptions: { show: { resource: ['sms'], operation: ['send'] } },
		routing: { send: { type: 'body', property: 'body' } },
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['sms'], operation: ['send'] } },
		options: [
			{
				displayName: 'Media URL',
				name: 'media_url',
				type: 'string',
				default: '',
				description: 'Public URL of an image/media file to send as MMS',
				routing: { send: { type: 'body', property: 'media_url' } },
			},
			{
				displayName: 'Line ID',
				name: 'line_id',
				type: 'number',
				default: 0,
				description: 'Aloware line ID to send from',
				routing: { send: { type: 'body', property: 'line_id' } },
			},
		],
	},
];
