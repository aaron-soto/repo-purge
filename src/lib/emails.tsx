import { ContactFormData } from '@/app/contact/page';
import { NewsletterFormData } from '@/app/page';

export function sendContactEmail({
  data,
  form,
}: {
  data: ContactFormData | NewsletterFormData;
  form: string;
}) {
  const apiEndpoint = '/api/email';

  return fetch(apiEndpoint, {
    method: 'POST',
    body: JSON.stringify({ ...data, form }),
  });
}
