import { redirect } from 'react-router-dom';
import { deleteContact } from '../api';

export async function action({ params }) {
  const isConfirmed = confirm('This contact will be deleted permanently. Do you want to proceed?');

  if (isConfirmed) {
    await deleteContact(params.id);
    return redirect('/');
  }

  return redirect(`/contacts/${params.id}`);
}
