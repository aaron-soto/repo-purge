import { ContactFormData } from '@/app/contact/page';

export function sendContactEmail(data: ContactFormData) {
  const apiEndpoint = '/api/email';

  return fetch(apiEndpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}
