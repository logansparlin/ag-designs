import { post } from "@lib/http";

class EmailjsClient {
  endpoint: string;
  publicKey: string;
  serviceId: string;

  constructor(endpoint: string, publicKey: string, serviceId: string) {
    this.endpoint = endpoint;
    this.publicKey = publicKey;
    this.serviceId = serviceId;
  }

  private getAuthProps() {
    return { user_id: this.publicKey, service_id: this.serviceId };
  }

  sendTemplateMessage(templateId: string, params: any) {
    return post(this.endpoint, {
      ...this.getAuthProps(),
      template_id: templateId,
      template_params: params,
    });
  }
}

export function createEmailjsClient() {
  return new EmailjsClient(
    process.env.NEXT_PUBLIC_EMAILJS_ENDPOINT,
    process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
  );
};
