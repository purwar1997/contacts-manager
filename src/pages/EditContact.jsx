import { useLoaderData, redirect } from 'react-router-dom';
import { getContact, updateContact } from '../api';
import ContactForm from '../components/ContactForm';

export async function loader({ params }) {
  const contact = await getContact(params.id);
  return contact;
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const contact = Object.fromEntries(formData.entries());
  await updateContact(params.id, contact);
  return redirect(`/contacts/${params.id}`);
}

export default function EditContact() {
  const contact = useLoaderData();

  return <ContactForm contact={contact} />;
}
