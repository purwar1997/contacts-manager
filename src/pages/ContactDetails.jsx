import { Suspense } from 'react';
import { Form, useFetcher, useLoaderData, defer, Await } from 'react-router-dom';
import { BsStar, BsStarFill } from 'react-icons/bs';
import { getContact, updateContact } from '../services/contacts';
import SkeletonPost from '../components/skeletons/SkeletonPost';

export async function loader({ params }) {
  return defer({ contact: getContact(params.id) });
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const updates = { favorite: formData.get('favorite') === 'true' ? true : false };
  return await updateContact(params.id, updates);
}

export default function ContactDetails() {
  const { contact } = useLoaderData();

  return (
    <Suspense fallback={<SkeletonPost />}>
      <Await resolve={contact}>
        {contact => (
          <section className='contact-profile'>
            <div className='contact-image'>
              <img src={contact.avatarUrl} alt={`${contact.firstname} ${contact.lastname}`} />
            </div>

            <div className='contact-details'>
              <div>
                <h1>
                  {contact.firstname} {contact.lastname}
                </h1>
                <Favorite contact={contact} />
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
        )}
      </Await>
    </Suspense>
  );
}

function Favorite({ contact }) {
  const fetcher = useFetcher();
  let favorite = contact.favorite;

  if (fetcher.formData) {
    favorite = fetcher.formData.get('favorite') === 'true';
  }

  return (
    <fetcher.Form method='post'>
      <button type='submit' name='favorite' value={favorite ? 'false' : 'true'}>
        {favorite ? <BsStarFill className='starred' /> : <BsStar />}
      </button>
    </fetcher.Form>
  );
}
