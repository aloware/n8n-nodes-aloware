import {
	NodeConnectionTypes,
	type ILoadOptionsFunctions,
	type INodePropertyOptions,
	type INodeType,
	type INodeTypeDescription,
} from 'n8n-workflow';
import { callDescription } from './resources/call';
import { contactDescription } from './resources/contact';
import { smsDescription } from './resources/sms';
import { userDescription } from './resources/user';
import { sequenceDescription } from './resources/sequence';
import { powerDialerDescription } from './resources/powerDialer';

interface AlowareUser {
	id: number;
	name: string;
	email: string;
}

export class Aloware implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Aloware',
		name: 'aloware',
		icon: { light: 'file:aloware.svg', dark: 'file:aloware.dark.svg' },
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["resource"] + ": " + $parameter["operation"]}}',
		description:
			'Send SMS/MMS, place two-legged calls, manage contacts, enroll into sequences and manage power dialer lists via the Aloware API',
		defaults: {
			name: 'Aloware',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'alowareApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://app.aloware.io',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Call', value: 'call' },
					{ name: 'Contact', value: 'contact' },
					{ name: 'Power Dialer', value: 'powerDialer' },
					{ name: 'Sequence', value: 'sequence' },
					{ name: 'SMS', value: 'sms' },
					{ name: 'User', value: 'user' },
				],
				default: 'contact',
			},
			...callDescription,
			...contactDescription,
			...smsDescription,
			...userDescription,
			...sequenceDescription,
			...powerDialerDescription,
		],
	};

	methods = {
		loadOptions: {
			// Backs every "User Name or ID" dropdown. GET /users has no pagination and returns
			// every user of the account in one response.
			async getUsers(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const users = (await this.helpers.httpRequestWithAuthentication.call(this, 'alowareApi', {
					method: 'GET',
					baseURL: 'https://app.aloware.io',
					url: '/api/v1/webhook/users',
					headers: { Accept: 'application/json' },
					json: true,
				})) as AlowareUser[];

				return users
					.filter((u) => !u.email?.includes('_deleted_'))
					.map((u) => ({ name: `${u.name} (${u.email})`, value: String(u.id) }))
					.sort((a, b) => a.name.localeCompare(b.name));
			},
		},
	};
}
