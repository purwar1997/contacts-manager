import { redirect } from 'react-router-dom';
import { addContact } from '../api';
import ContactForm from '../components/ContactForm';

export async function action({ request }) {
  const formData = await request.formData();
  const contactInfo = Object.fromEntries(formData.entries());
  const contact = await addContact(contactInfo);
  return redirect(`/contacts/${contact.id}`);
}

export default function AddContact() {
  return <ContactForm />;
}
