import {
	NodeConnectionTypes,
	type IDataObject,
	type INodeType,
	type INodeTypeDescription,
	type IWebhookFunctions,
	type IWebhookResponseData,
} from 'n8n-workflow';

// Real event names seen from Aloware, e.g. OutboundPhoneCall-DispositionCompleted,
// InboundSMS-DispositionCompleted, transcription.call.summarized.
const EVENT_MATCHERS: Record<string, (event: string) => boolean> = {
	call: (e) => e.includes('PhoneCall'),
	sms: (e) => e.includes('SMS'),
	callSummarized: (e) => e === 'transcription.call.summarized',
	other: (e) => !e.includes('PhoneCall') && !e.includes('SMS') && e !== 'transcription.call.summarized',
};

interface AlowarePayload {
	event?: string;
	body?: IDataObject;
}

// A webhook trigger cannot act as an AI tool, so usableAsTool is deliberately absent.
// eslint-disable-next-line @n8n/community-nodes/node-usable-as-tool
export class AlowareTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Aloware Trigger',
		name: 'alowareTrigger',
		icon: { light: 'file:aloware.svg', dark: 'file:aloware.dark.svg' },
		group: ['trigger'],
		version: 1,
		subtitle: '={{$parameter["events"].length ? $parameter["events"].join(", ") : "all events"}}',
		description:
			'Starts the workflow when Aloware sends a webhook event — a call or SMS is disposed, a contact is created or updated, a recording, voicemail, transcription or AloAi call summary is saved',
		defaults: {
			name: 'Aloware Trigger',
		},
		inputs: [],
		outputs: [NodeConnectionTypes.Main],
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: 'webhook',
			},
		],
		properties: [
			{
				displayName:
					'Aloware cannot register webhooks over its API, so connect this trigger by hand: copy the <b>Production URL</b> above, then in Aloware go to <b>Integrations → Webhook Integration → + Add Webhook</b>, paste the URL, set Authentication to <i>None</i> and tick the events you want. Use the Test URL the same way while building.',
				name: 'setupNotice',
				type: 'notice',
				default: '',
			},
			{
				displayName: 'Events',
				name: 'events',
				type: 'multiOptions',
				default: [],
				description:
					'Only start the workflow for these event families. Leave empty to receive every event Aloware sends to the URL.',
				options: [
					{
						name: 'Call Disposed',
						value: 'call',
						description: 'Inbound and outbound phone call events (OutboundPhoneCall-DispositionCompleted, …)',
					},
					{
						name: 'SMS Disposed',
						value: 'sms',
						description: 'Inbound and outbound SMS/MMS events (InboundSMS-DispositionCompleted, …)',
					},
					{
						name: 'Call Summarized (AloAi)',
						value: 'callSummarized',
						description: 'AI summary and transcription of a finished call (transcription.call.summarized)',
					},
					{
						name: 'Other Events',
						value: 'other',
						description: 'Contact, appointment, voicemail, recording and transcription events',
					},
				],
			},
			{
				displayName: 'Options',
				name: 'options',
				type: 'collection',
				placeholder: 'Add option',
				default: {},
				options: [
					{
						displayName: 'Flatten Payload',
						name: 'flatten',
						type: 'boolean',
						default: true,
						description:
							'Whether to output the event fields at the top level next to "event". When off, the original {"body": …, "event": …} envelope is kept.',
					},
				],
			},
		],
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const payload = this.getBodyData() as AlowarePayload;
		const event = typeof payload.event === 'string' ? payload.event : '';
		const events = this.getNodeParameter('events', []) as string[];

		if (events.length > 0 && !events.some((key) => EVENT_MATCHERS[key]?.(event))) {
			// Acknowledge so Aloware does not retry, but do not start the workflow.
			return { webhookResponse: { received: true, ignored: true } };
		}

		const options = this.getNodeParameter('options', {}) as { flatten?: boolean };
		const flatten = options.flatten ?? true;
		const inner = payload.body;

		const output: IDataObject =
			flatten && inner && typeof inner === 'object' && !Array.isArray(inner)
				? { event, ...inner }
				: { ...(payload as IDataObject) };

		return {
			webhookResponse: { received: true },
			workflowData: [this.helpers.returnJsonArray([output])],
		};
	}
}
