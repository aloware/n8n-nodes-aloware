import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { contactDescription } from './resources/contact';
import { smsDescription } from './resources/sms';
import { userDescription } from './resources/user';
import { sequenceDescription } from './resources/sequence';
import { powerDialerDescription } from './resources/powerDialer';

export class Aloware implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Aloware',
		name: 'aloware',
		icon: { light: 'file:aloware.svg', dark: 'file:aloware.dark.svg' },
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["resource"] + ": " + $parameter["operation"]}}',
		description: 'Send SMS/MMS, manage contacts, enroll into sequences and manage power dialer lists via the Aloware API',
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
					{ name: 'Contact', value: 'contact' },
					{ name: 'Power Dialer', value: 'powerDialer' },
					{ name: 'Sequence', value: 'sequence' },
					{ name: 'SMS', value: 'sms' },
					{ name: 'User', value: 'user' },
				],
				default: 'contact',
			},
			...contactDescription,
			...smsDescription,
			...userDescription,
			...sequenceDescription,
			...powerDialerDescription,
		],
	};
}
