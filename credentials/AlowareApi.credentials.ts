import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class AlowareApi implements ICredentialType {
	name = 'alowareApi';

	displayName = 'Aloware API';

	documentationUrl =
		'https://support.aloware.com/en/articles/9020040-api-documentation-aloware-sms-api-integration';

	properties: INodeProperties[] = [
		{
			displayName: 'API Token',
			name: 'apiToken',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			description:
				'Your Aloware API token. Find it in Aloware UI → Integrations → API Tokens.',
		},
		{
			displayName: 'Environment',
			name: 'environment',
			type: 'options',
			options: [
				{ name: 'Production (app.aloware.io)', value: 'https://app.aloware.io' },
				{ name: 'Development (app.alodev.org)', value: 'https://app.alodev.org' },
			],
			default: 'https://app.aloware.io',
			description: 'Which Aloware environment to call',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			qs: {
				api_token: '={{$credentials.apiToken}}',
			},
			body: {
				api_token: '={{$credentials.apiToken}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.environment}}',
			url: '/api/v1/webhook/users',
			method: 'GET',
		},
	};
}
