import { Form, useLoaderData, redirect, useNavigate } from 'react-router-dom';
import { getContact, updateContact } from '../api';

export async function loader({ params }) {
  const contact = await getContact(params.id);
  //   console.log(contact);
  return contact;
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const contact = Object.fromEntries(formData.entries());
  contact.twitter = `https://twitter.com/${contact.twitter.slice(1)}`;

  await updateContact(params.id, contact);
  return redirect(`/contacts/${params.id}`);
}

export default function Edit() {
  return <h1>edit</h1>;
}

// export default function EditContact() {
//   const contact = useLoaderData();
//   const navigate = useNavigate();
//   console.log(contact);

//   return (
//     <Form className='add-contact-form' method='post'>
//       <div className='name'>
//         <label>Name</label>
//         <div>
//           <input
//             type='text'
//             name='firstname'
//             placeholder='First'
//             value={contact.firstname}
//             required
//           />
//           <input type='text' name='lastname' placeholder='Last' value={contact.lastname} />
//         </div>
//       </div>

//       <div className='twitter'>
//         <label htmlFor='twitter'>Twitter</label>
//         <input
//           type='text'
//           name='twitter'
//           id='twitter'
//           placeholder='@jack'
//           value={contact.twitter}
//           required
//         />
//       </div>

//       <div className='avatar'>
//         <label htmlFor='avatar'>Avatar URL</label>
//         <input
//           type='url'
//           name='avatarUrl'
//           id='avatar'
//           placeholder='https://example.com/avatar.jpg'
//           value={contact.avatarUrl}
//           required
//         />
//       </div>

//       <div className='notes'>
//         <label htmlFor='notes'>Notes</label>
//         <textarea name='notes' id='notes' value={contact.notes} />
//       </div>

//       <div className='btn-group'>
//         <button className='btn save' type='submit'>
//           Edit
//         </button>
//         <button className='btn' type='button' onClick={() => navigate('-1')}>
//           Cancel
//         </button>
//       </div>
//     </Form>
//   );
// }
