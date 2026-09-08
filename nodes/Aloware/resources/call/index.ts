import type { INodeProperties } from 'n8n-workflow';

const showOnlyForCall = { resource: ['call'] };
const twoLegged = { resource: ['call'], operation: ['twoLegged'] };

export const callDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForCall },
		options: [
			{
				name: 'Make Two-Legged Call',
				value: 'twoLegged',
				action: 'Make a two legged call',
				description:
					'Ring an agent (or a ring group) first, then dial the contact and bridge the two legs',
				routing: {
					request: {
						method: 'POST',
						url: '/api/v1/webhook/two-legged-call',
					},
				},
			},
		],
		default: 'twoLegged',
	},

	// ----- Leg 1: who to ring first -----
	{
		displayName: 'Call On Behalf Of',
		name: 'callerType',
		type: 'options',
		required: true,
		default: 'user_id',
		description: 'Who Aloware rings first, before dialing the contact',
		options: [
			{ name: 'User (Agent)', value: 'user_id' },
			{ name: 'Ring Group (Inbox)', value: 'ring_group_id' },
		],
		displayOptions: { show: twoLegged },
	},
	{
		displayName: 'User Name or ID',
		name: 'user_id',
		type: 'options',
		required: true,
		default: '',
		description:
			'Agent to ring first. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
		typeOptions: { loadOptionsMethod: 'getUsers' },
		displayOptions: { show: { ...twoLegged, callerType: ['user_id'] } },
		routing: { send: { type: 'body', property: 'user_id' } },
	},
	{
		displayName: 'User Phone Number',
		name: 'user_phone_number',
		type: 'string',
		default: '',
		placeholder: '+18181234567',
		description:
			'Optional. Ring the agent on this number instead of their Aloware softphone (E.164 format).',
		displayOptions: { show: { ...twoLegged, callerType: ['user_id'] } },
		routing: { send: { type: 'body', property: 'user_phone_number' } },
	},
	{
		displayName: 'Ring Group ID',
		name: 'ring_group_id',
		type: 'string',
		required: true,
		default: '',
		description: 'Ring group (inbox) whose available agents are rung first',
		displayOptions: { show: { ...twoLegged, callerType: ['ring_group_id'] } },
		routing: { send: { type: 'body', property: 'ring_group_id' } },
	},

	// ----- Leg 2: the contact -----
	{
		displayName: 'Identify Contact By',
		name: 'contactType',
		type: 'options',
		required: true,
		default: 'contact_phone_number',
		options: [
			{ name: 'Phone Number', value: 'contact_phone_number' },
			{ name: 'Contact ID', value: 'contact_id' },
		],
		displayOptions: { show: twoLegged },
	},
	{
		displayName: 'Contact Phone Number',
		name: 'contact_phone_number',
		type: 'string',
		required: true,
		default: '',
		placeholder: '+18181234567',
		description: 'Phone number to dial once the agent has answered (E.164 format)',
		displayOptions: { show: { ...twoLegged, contactType: ['contact_phone_number'] } },
		routing: { send: { type: 'body', property: 'contact_phone_number' } },
	},
	{
		displayName: 'Contact ID',
		name: 'contact_id',
		type: 'string',
		required: true,
		default: '',
		description: 'Aloware contact ID to dial once the agent has answered',
		displayOptions: { show: { ...twoLegged, contactType: ['contact_id'] } },
		routing: { send: { type: 'body', property: 'contact_id' } },
	},

	// ----- The line to call from -----
	{
		displayName: 'Identify Line By',
		name: 'lineType',
		type: 'options',
		required: true,
		default: 'line_phone_number',
		options: [
			{ name: 'Phone Number', value: 'line_phone_number' },
			{ name: 'Line ID', value: 'line_id' },
		],
		displayOptions: { show: twoLegged },
	},
	{
		displayName: 'Line Phone Number',
		name: 'line_phone_number',
		type: 'string',
		required: true,
		default: '',
		placeholder: '+18552562001',
		description: 'One of your Aloware line numbers, shown to the contact as caller ID (E.164 format)',
		displayOptions: { show: { ...twoLegged, lineType: ['line_phone_number'] } },
		routing: { send: { type: 'body', property: 'line_phone_number' } },
	},
	{
		displayName: 'Line ID',
		name: 'line_id',
		type: 'string',
		required: true,
		default: '',
		description: 'Aloware line ID to call from',
		displayOptions: { show: { ...twoLegged, lineType: ['line_id'] } },
		routing: { send: { type: 'body', property: 'line_id' } },
	},
];
