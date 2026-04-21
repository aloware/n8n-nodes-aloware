import type { INodeProperties } from 'n8n-workflow';

const showOnlyForUser = { resource: ['user'] };

export const userDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForUser },
		options: [
			{
				name: 'Get Many',
				value: 'getMany',
				action: 'Get many users',
				description: 'Retrieve all Aloware users (agents) in the account',
				routing: {
					request: {
						method: 'GET',
						url: '/api/v1/webhook/users',
					},
				},
			},
		],
		default: 'getMany',
	},
];
