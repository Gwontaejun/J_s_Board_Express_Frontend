import firebase from "firebase/app";
import 'firebase/auth';
import "firebase/firestore";
import "firebase/storage";
import { fbConfig } from "./firebaseConfig";

firebase.initializeApp(fbConfig);

const firestore = firebase;

export default firestore;
