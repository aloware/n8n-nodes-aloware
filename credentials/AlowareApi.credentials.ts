import type {
	IAuthenticateGeneric,
	Icon,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class AlowareApi implements ICredentialType {
	name = 'alowareApi';

	displayName = 'Aloware API';

	icon: Icon = { light: 'file:aloware.svg', dark: 'file:aloware.dark.svg' };

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
			baseURL: 'https://app.aloware.io',
			url: '/api/v1/webhook/users',
			method: 'GET',
		},
	};
}
