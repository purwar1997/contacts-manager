import { useEffect, Suspense } from 'react';
import {
  Form,
  Link,
  NavLink,
  Outlet,
  useLoaderData,
  useSubmit,
  useNavigation,
  defer,
  Await,
} from 'react-router-dom';
import { BsStarFill } from 'react-icons/bs';
import { IoSearchOutline } from 'react-icons/io5';
import { FiRefreshCw } from 'react-icons/fi';
import { getContacts } from '../api';

export async function loader({ request }) {
  const query = new URL(request.url).searchParams.get('query');
  const contacts = getContacts(query);
  return defer({ contacts, query });
}

export default function Root() {
  const { contacts, query } = useLoaderData();
  const navigation = useNavigation();
  const submit = useSubmit();

  const searching =
    navigation.location && new URLSearchParams(navigation.location.search).get('query');

  useEffect(() => {
    document.getElementById('search').value = query;
  }, [query]);

  return (
    <main className='root'>
      <section className='sidebar'>
        <div className='sidebar-top'>
          <Form className='search-form'>
            <input
              type='search'
              id='search'
              name='query'
              placeholder='Search'
              defaultValue={query}
              onChange={e => {
                const isFirstSearch = query === null;
                submit(e.currentTarget.form, {
                  replace: !isFirstSearch,
                });
              }}
            />
            <div className={`icon search ${searching ? 'hide' : ''}`}>
              <IoSearchOutline />
            </div>
            <div className={`icon spinner ${searching ? '' : 'hide'}`}>
              <FiRefreshCw />
            </div>
          </Form>
          <Link to='contacts/add' className='btn'>
            New
          </Link>
        </div>

        <div className='contacts-list'>
          <Suspense fallback={<p>Loading contacts...</p>}>
            <Await resolve={contacts}>
              {contacts =>
                contacts.length ? (
                  <div className='contacts'>
                    {contacts.map(contact => (
                      <nav key={contact.id}>
                        <NavLink
                          to={`contacts/${contact.id}`}
                          className={`contact ${({ isActive }) => (isActive ? 'active' : '')}`}
                        >
                          <h1>
                            {contact.firstname} {contact.lastname}
                          </h1>
                          {contact.favorite && <BsStarFill className='favorite' />}
                        </NavLink>
                      </nav>
                    ))}
                  </div>
                ) : (
                  <p>No contacts found</p>
                )
              }
            </Await>
          </Suspense>
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
