import { Form, redirect, useNavigate } from 'react-router-dom';
import { addContact } from '../api';

export async function action({ request }) {
  const formData = await request.formData();
  const contact = Object.fromEntries(formData.entries());
  contact.twitter = `https://twitter.com/${contact.twitter.slice(1)}`;

  const addedContact = await addContact(contact);
  return redirect(`/contact/${addedContact.id}`);
}

export default function AddContact() {
  const navigate = useNavigate();

  return (
    <Form className='add-contact-form' method='post'>
      <div className='name'>
        <label>Name</label>
        <div>
          <input type='text' name='firstname' placeholder='First' required />
          <input type='text' name='lastname' placeholder='Last' />
        </div>
      </div>

      <div className='twitter'>
        <label htmlFor='twitter'>Twitter</label>
        <input type='text' name='twitter' placeholder='@jack' id='twitter' required />
      </div>

      <div className='avatar'>
        <label htmlFor='avatar'>Avatar URL</label>
        <input
          type='url'
          name='avatarUrl'
          placeholder='https://example.com/avatar.jpg'
          id='avatar'
          required
        />
      </div>

      <div className='notes'>
        <label htmlFor='notes'>Notes</label>
        <textarea name='notes' id='notes' />
      </div>

      <div className='btn-group'>
        <button className='btn save' type='submit'>
          Add
        </button>
        <button className='btn' type='button' onClick={() => navigate('-1')}>
          Cancel
        </button>
      </div>
    </Form>
  );
}
