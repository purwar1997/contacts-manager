// import { Suspense } from 'react';
import { Form, Link, Outlet, useLoaderData } from 'react-router-dom';
import { BsStarFill } from 'react-icons/bs';
import { getContacts } from '../api';

export async function loader() {
  const contacts = await getContacts();
  return contacts;
}

export default function Root() {
  const contacts = useLoaderData();

  return (
    <main className='root'>
      <section className='sidebar'>
        <div className='sidebar-top'>
          <Form>
            <input type='search' name='query' placeholder='Search' />
          </Form>
          <Link to='contacts/add' className='btn'>
            New
          </Link>
        </div>

        <div className='contacts-list'>
          {contacts.length ? (
            <div className='contacts'>
              {contacts.map(contact => (
                <Link to={`contacts/${contact.id}`} key={contact.id}>
                  <nav className='contact'>
                    <h1>
                      {contact.firstname} {contact.lastname}
                    </h1>
                    {contact.favorite && <BsStarFill className='favorite' />}
                  </nav>
                </Link>
              ))}
            </div>
          ) : (
            <p>No contacts found</p>
          )}
        </div>

        <div className='sidebar-bottom'>
          <h1>Contacts Manager</h1>
        </div>
      </section>

      <section className='content-section'>
        <Outlet />
      </section>
    </main>
  );
}
