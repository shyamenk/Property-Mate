import {initializeApp} from 'firebase/app'
import {getFireStore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDSnoEg8K-guMMvaRV688opLawxQmgbRH8',
  authDomain: 'property-mate-6b9ac.firebaseapp.com',
  projectId: 'property-mate-6b9ac',
  storageBucket: 'property-mate-6b9ac.appspot.com',
  messagingSenderId: '524817980203',
  appId: '1:524817980203:web:925ade2ee2be884e79836e',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFireStore()
