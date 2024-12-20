import { Suspense } from 'react';
import { useLoaderData, redirect, defer, Await } from 'react-router-dom';
import { getContact, updateContact } from '../services/contacts';
import ContactForm from '../components/ContactForm';
import SkeletonForm from '../components/skeletons/SkeletonForm';

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
    <Suspense fallback={<SkeletonForm />}>
      <Await resolve={contact}>{contact => <ContactForm contact={contact} />}</Await>
    </Suspense>
  );
}
