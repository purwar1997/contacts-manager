import { Form, useNavigate } from 'react-router-dom';

export default function ContactForm({ contact }) {
  const navigate = useNavigate();

  return (
    <Form className='contact-form' method='post'>
      <div className='name'>
        <label>Name</label>
        <div>
          <input
            type='text'
            name='firstname'
            placeholder='First'
            defaultValue={contact?.firstname}
            required
          />
          <input type='text' name='lastname' placeholder='Last' defaultValue={contact?.lastname} />
        </div>
      </div>

      <div className='twitter'>
        <label htmlFor='twitter'>Twitter</label>
        <input
          type='text'
          name='twitter'
          id='twitter'
          placeholder='@jack'
          defaultValue={contact?.twitter}
          required
        />
      </div>

      <div className='avatar'>
        <label htmlFor='avatar'>Avatar URL</label>
        <input
          type='url'
          name='avatarUrl'
          id='avatar'
          placeholder='https://example.com/avatar.jpg'
          defaultValue={contact?.avatarUrl}
          required
        />
      </div>

      <div className='notes'>
        <label htmlFor='notes'>Notes</label>
        <textarea name='notes' id='notes' defaultValue={contact?.notes} />
      </div>

      <div className='btn-group'>
        <button className='btn save' type='submit'>
          Save
        </button>
        <button className='btn' type='button' onClick={() => navigate('-1')}>
          Cancel
        </button>
      </div>
    </Form>
  );
}
