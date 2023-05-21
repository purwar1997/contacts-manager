import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom';

import Root, { loader as rootLoader } from './pages/Root';
import Index from './pages/Index';
import Contact, { loader as contactLoader } from './pages/Contact';
import AddContact, { action as addAction } from './pages/AddContact';
import Edit, { loader as editLoader, action as editAction } from './pages/EditContact';
import { loader as deleteLoader } from './pages/DeleteContact';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Root />} loader={rootLoader}>
      <Route index element={<Index />} />
      <Route path='contacts/add' element={<AddContact />} action={addAction} />
      <Route path='contacts/:id' element={<Contact />} loader={contactLoader}>
        <Route path='edit' element={<Edit />} loader={editLoader} action={editAction} />
        <Route path='delete' loader={deleteLoader} />
      </Route>
    </Route>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}
