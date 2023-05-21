import { redirect } from 'react-router-dom';
import { deleteContact } from '../api';

export async function loader({ params }) {
  await deleteContact(params.id);
  return redirect('/');
}
