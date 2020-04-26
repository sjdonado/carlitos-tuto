import { db, auth } from '../services/firebase';

const userCollection = db.collection('Users');

export const login = (email, password) => auth
  .signInWithEmailAndPassword(email, password);

export const addUser = (uid, data) => userCollection.doc(uid).set({
  name: data.name,
  lastName: data.lastName,
  email: data.email,
  password: data.password,
});

export const allUsers = () => userCollection.get();
