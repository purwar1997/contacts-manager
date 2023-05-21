import db from './firebase.config';
import {
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  Timestamp,
  setDoc,
  deleteDoc,
} from 'firebase/firestore';

const contactsRef = collection(db, 'contacts');

export async function getContacts() {
  const querySnapshot = await getDocs(contactsRef);
  const contacts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return contacts;
}

export async function getContact(contactId) {
  const docRef = doc(db, 'contacts', contactId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw {
      message: 'Contact not found',
      status: 404,
    };
  }

  const contact = { id: docSnap.id, ...docSnap.data() };
  return contact;
}

export async function addContact(contact) {
  await addDoc(contactsRef, {
    createdAt: Timestamp.fromDate(new Date()),
    ...contact,
  });
}

export async function updateContact(contactId, updates) {
  const docRef = doc(db, 'contacts', contactId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw {
      message: 'Contact not found',
      status: 404,
    };
  }

  await setDoc(docRef, {
    updatedAt: Timestamp.fromDate(new Date()),
    updates,
  });
}

export async function deleteContact(contactId) {
  const docRef = doc(db, 'contacts', contactId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw {
      message: 'Contact not found',
      status: 404,
    };
  }

  await deleteDoc(docRef);
}
