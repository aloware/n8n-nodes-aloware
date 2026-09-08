import type { INodeProperties } from 'n8n-workflow';

const showOnlyForPowerDialer = { resource: ['powerDialer'] };

export const powerDialerDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForPowerDialer },
		options: [
			{
				name: 'Remove Contact From Lists',
				value: 'removeContactFromLists',
				action: 'Remove a contact from all power dialer lists',
				description: 'Remove the given contact from every Power Dialer list',
				routing: {
					request: {
						method: 'POST',
						url: '/api/v1/webhook/powerdialer-remove-contact-from-lists',
					},
				},
			},
			{
				name: 'Clear List',
				value: 'clearList',
				action: 'Clear all contacts from a power dialer list',
				description: 'Remove every contact from the specified Power Dialer list',
				routing: {
					request: {
						method: 'POST',
						url: '/api/v1/webhook/powerdialer-clear-list',
					},
				},
			},
			{
				name: 'Clear User Lists',
				value: 'clearUserLists',
				action: 'Clear all power dialer lists owned by a user',
				description: "Remove every contact from all Power Dialer lists owned by the given user",
				routing: {
					request: {
						method: 'POST',
						url: '/api/v1/webhook/powerdialer-clear-user-lists',
					},
				},
			},
		],
		default: 'removeContactFromLists',
	},

	// ----- Remove Contact from Lists -----
	{
		displayName: 'Contact ID',
		name: 'contact_id',
		type: 'string',
		required: true,
		default: '',
		description: 'Aloware contact ID to remove from all Power Dialer lists',
		displayOptions: {
			show: { resource: ['powerDialer'], operation: ['removeContactFromLists'] },
		},
		routing: { send: { type: 'body', property: 'contact_id' } },
	},

	// ----- Clear List -----
	{
		displayName: 'List ID',
		name: 'list_id',
		type: 'string',
		required: true,
		default: '',
		description: 'Power Dialer list ID to clear. Use the list ID from Aloware Classic (the number in the list URL); list numbers shown in Aloware Talk are different and the API rejects them as invalid.',
		displayOptions: {
			show: { resource: ['powerDialer'], operation: ['clearList'] },
		},
		routing: { send: { type: 'body', property: 'list_id' } },
	},

	// ----- Clear User Lists -----
	{
		displayName: 'User Name or ID',
		name: 'user_id',
		type: 'options',
		required: true,
		default: '',
		description:
			'Power Dialer owner whose lists will be cleared. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
		typeOptions: { loadOptionsMethod: 'getUsers' },
		displayOptions: {
			show: { resource: ['powerDialer'], operation: ['clearUserLists'] },
		},
		routing: { send: { type: 'body', property: 'user_id' } },
	},
];
