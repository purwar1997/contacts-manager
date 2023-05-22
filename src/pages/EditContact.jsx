import { Suspense } from 'react';
import { useLoaderData, redirect, defer, Await } from 'react-router-dom';
import { getContact, updateContact } from '../api';
import ContactForm from '../components/ContactForm';

export async function loader({ params }) {
  return defer({ contact: getContact(params.id) });
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData.entries());
  await updateContact(params.id, updates);
  return redirect(`/contacts/${params.id}`);
}

export default function EditContact() {
  const { contact } = useLoaderData();

  return (
    <Suspense fallback={<p>Loading contact...</p>}>
      <Await resolve={contact}>{contact => <ContactForm contact={contact} />}</Await>
    </Suspense>
  );
}
