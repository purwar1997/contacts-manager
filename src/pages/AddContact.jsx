import { Form, redirect } from 'react-router-dom';
import { addContact } from '../api';

export async function action({ request }) {
  const formData = await request.formData();
  const contact = Object.fromEntries(formData.entries());
  await addContact(contact);
}

export default function AddContact() {
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
        <textarea name='notes' id='notes'></textarea>
      </div>

      <div className='add-contact-btns'>
        <button className='btn save' type='submit'>
          Add
        </button>
        <button className='btn' type='button'>
          Cancel
        </button>
      </div>
    </Form>
  );
}
