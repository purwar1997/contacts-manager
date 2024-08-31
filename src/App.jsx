import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom';

import Root, { loader as rootLoader } from './pages/Root';
import Index from './pages/Index';
import Contact, { loader as contactLoader, action as contactAction } from './pages/Contact';
import AddContact, { action as addAction } from './pages/AddContact';
import EditContact, { loader as editLoader, action as editAction } from './pages/EditContact';
import { action as deleteAction } from './pages/DeleteContact';
import Error from './components/Error';
import NotFound from './pages/NotFound';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Root />} loader={rootLoader} errorElement={<Error />}>
        <Route errorElement={<Error />}>
          <Route index element={<Index />} />

          <Route path='contacts/add' element={<AddContact />} action={addAction} />

          <Route path='contacts/:id'>
            <Route index element={<Contact />} loader={contactLoader} action={contactAction} />

            <Route path='edit' element={<EditContact />} loader={editLoader} action={editAction} />

            <Route path='delete' action={deleteAction} />
          </Route>
        </Route>
      </Route>

      <Route path='*' element={<NotFound />} />
    </>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}
