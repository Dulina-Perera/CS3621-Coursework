import { FirebaseApp, initializeApp } from 'firebase/app';
import { collection, Firestore, getDocs, getFirestore } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};
console.log(firebaseConfig);

// Initialize Firebase.
const app: FirebaseApp = initializeApp(firebaseConfig);

// Initialize Firestore.
const db: Firestore = getFirestore(app);

// Display all cafes.
const cafeList: Element | null = document.querySelector('#cafe-list');

const renderCafe = (doc: any) => {
	let li: HTMLElement = document.createElement('li');
	let name: HTMLSpanElement = document.createElement('span');
	let city: HTMLSpanElement = document.createElement('span');

	li.setAttribute('data-id', doc.id);
	name.textContent = doc.data().name;
	city.textContent = doc.data().city;

	li.appendChild(name);
	li.appendChild(city);

	cafeList?.appendChild(li);
};

getDocs(collection(db, 'cafes')).then((snapshot) => {
	snapshot.docs.forEach((doc) => {
		renderCafe(doc);
	});
});
