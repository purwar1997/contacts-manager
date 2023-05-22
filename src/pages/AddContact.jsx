import { redirect } from 'react-router-dom';
import { addContact } from '../api';
import ContactForm from '../components/ContactForm';

export async function action({ request }) {
  const formData = await request.formData();
  const contact = Object.fromEntries(formData.entries());
  const addedContact = await addContact(contact);
  return redirect(`/contacts/${addedContact.id}`);
}

export default function AddContact() {
  return <ContactForm />;
}
