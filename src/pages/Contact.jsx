import { Form, useLoaderData } from 'react-router-dom';
import { BsStar, BsStarFill } from 'react-icons/bs';
import { getContact } from '../api';

export async function loader({ params }) {
  const contact = await getContact(params.id);
  return contact;
}

export default function Contact() {
  const contact = useLoaderData();

  return (
    <section className='contact-profile'>
      <div className='contact-image'>
        <img src={contact.avatarUrl} alt={`${contact.firstname} ${contact.lastname}`} />
      </div>

      <div className='contact-details'>
        <div>
          <h1>
            {contact.firstname} {contact.lastname}
          </h1>
          <button>{contact.favorite ? <BsStarFill className='starred' /> : <BsStar />}</button>
        </div>

        <a href={`https://twitter.com/${contact.twitter.slice(1)}`} target='_blank'>
          {contact.twitter}
        </a>

        <p>{contact.notes}</p>

        <div className='btn-group'>
          <Form action='edit'>
            <button className='btn edit' type='submit'>
              Edit
            </button>
          </Form>
          <Form action='delete' method='delete'>
            <button className='btn delete' type='submit'>
              Delete
            </button>
          </Form>
        </div>
      </div>
    </section>
  );
}
