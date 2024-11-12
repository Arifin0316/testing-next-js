import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query, updateDoc, where } from 'firebase/firestore';
import app from './init';
import bcrypt from 'bcrypt';

const Firestore = getFirestore(app);

export async function retrieveDataByCollection(collectionName: string) {
  try {
    const snapshot = await getDocs(collection(Firestore, collectionName));
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return data;
  } catch (error) {
    console.error('Error retrieving data:', error);
    throw error;
  }
}

export async function retrieveDataById(collectionName: string, id: string) {
  try {
    const snapshot = await getDoc(doc(Firestore, collectionName, id));
    const data = snapshot.data();
    return data;
  } catch (error) {
    console.error('Error retrieving data:', error);
    throw error;
  }
}

export async function signIn(userData: { email: string }) {
  const q = query(collection(Firestore, 'user'), where('email', '==', userData.email));
  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  if (data) {
    return data[0];
  } else {
    return null;
  }
}

export async function signInWithGoogle(userData: any, callback: any) {
  const q = query(collection(Firestore, 'user'), where('email', '==', userData.email));
  const snapshot = await getDocs(q);
  const data: any = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  if (data.length > 0) {
    userData.role = data[0].role
    await updateDoc(doc(Firestore, 'user', data[0].id), userData)
      .then(() => {
        callback({ status: false, message: 'singin with google succes', data: userData });
      })
      .catch(() => {
        callback({ status: false, message: 'singin with google failet' });
      });
  } else {
    userData.role = "member"
    await addDoc(collection(Firestore, 'user'), userData)
      .then(() => {
        callback({ status: true, message: 'singin with google suckses', data: userData });
      })
      .catch(() => {
        callback({ status: false, message: 'singin with google failet' });
      });
  }
}

export async function signUp(
  userData: {
    email: string;
    fullname: string;
    password: string;
    role?: string;
  },
  callback: (result: { status: boolean; message: string }) => void
) {
  try {
    const q = query(collection(Firestore, 'user'), where('email', '==', userData.email));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      // Jika email sudah ada
      callback({ status: false, message: 'Email already exists' });
      return;
    }

    // Jika email belum ada, hash password dan tambahkan user ke Firestore
    userData.password = await bcrypt.hash(userData.password, 10);
    userData.role = 'member';

    await addDoc(collection(Firestore, 'user'), userData);
    callback({ status: true, message: 'Sign up successful' });
  } catch (error: any) {
    console.error('Error signing up:', error);
    callback({ status: false, message: error.message || 'Sign up failed. Please try again.' });
  }
}
