// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { createEmailjsClient } from "@lib/emailjs";

interface ContactResponse {
  message: string;
  debug?: any;
}

export default function handleContact(req: NextApiRequest, res: NextApiResponse) {
  const contactTemplateId = process.env.EMAILJS_CONTACT_TEMPLATE_ID
  if (req.method !== 'POST') {
    return res.setHeader('Allow', ['POST']).status(405)
      .json({ message: `Method ${req.method} Not Allowed` });
  }
  if (!contactTemplateId) {
    return res.status(500)
      .json({ message: "Admin issue! Missing CONTACT_TEMPLATE_ID environment variable" });
  };

  const emailjsClient = createEmailjsClient();
  const { name, email, phone, message } = req.body;

  return emailjsClient.sendTemplateMessage(contactTemplateId, {
    full_name: name,
    email_address: email,
    phone,
    message,
  }).then(res => res.text()).then(text => {
    const response: ContactResponse = { message: "Message Sent" };

    if (process.env.DEBUG === "true") {
      response.debug = { requestBody: req.body, emailjsResponse: text };
    }
    return res.status(200).json(response);

  }).catch(error => {
    console.error("emailjs error", error);
    return res.status(500).json({ message: "Error sending message" });
  });

}
