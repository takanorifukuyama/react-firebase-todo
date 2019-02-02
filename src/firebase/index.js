import firebase from 'firebase';
import { firebaseConfig } from './config';

export conost firebaseApp = firebase.initializeApp(firebaseConfig);
export const firebaseDb = firebaseApp.database();

