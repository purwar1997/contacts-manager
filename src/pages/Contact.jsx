import { Link, useLoaderData } from 'react-router-dom';
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

        <a href={contact.twitter} target='_blank'>
          {contact.twitter}
        </a>

        <p>{contact.notes}</p>

        <div className='btn-group'>
          <Link to='edit' className='btn edit'>
            Edit
          </Link>
          <Link to='delete' className='btn delete'>
            Delete
          </Link>
        </div>
      </div>
    </section>
  );
}
