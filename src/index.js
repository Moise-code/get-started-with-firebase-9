import { initializeApp} from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCTUrZs6gMDcWs3BU_R77Xnt8nj1i0lqgQ",
    authDomain: "fir-9-dojo-ae64f.firebaseapp.com",
    projectId: "fir-9-dojo-ae64f",
    storageBucket: "fir-9-dojo-ae64f.appspot.com",
    messagingSenderId: "693717251089",
    appId: "1:693717251089:web:c2ec95e5f2ce1c1402edb0"
  };

// initialize the firebase application to initialize firebase first

initializeApp(firebaseConfig)

// initialize the services so, we must first assign the firestore to the db variable to relate it to the database.

const db = getFirestore();

// collection reference or a database 
const colRef = collection(db, 'books')


// get collection data from the collection

getDocs(colRef)
.then((snapshot) =>{
   let books = [];
   snapshot.docs.forEach((doc) =>{
    books.push({...doc.data(), id: doc.id })
   })
   console.log(books);
})
.catch((error) =>{
    console.log(error);
});