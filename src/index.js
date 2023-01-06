import { initializeApp} from 'firebase/app';
import { getFirestore, collection, onSnapshot, addDoc, deleteDoc, doc, query, where, orderBy, serverTimestamp, getDoc, updateDoc } from 'firebase/firestore';

const addBookForm = document.querySelector('.add');
const deleteBookForm = document.querySelector('.delete');
const updateForm = document.querySelector('.update')

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

// querries
const q = query(colRef, orderBy('createdAt'));

// get collection data from the collection as real time data.

onSnapshot(q, (snapshot) =>{
    let books = [];
    snapshot.docs.forEach((doc) =>{
     books.push({...doc.data(), id: doc.id })
    })
    console.log(books);
 })
// adding the event listerner to the add book form

addBookForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    addDoc(colRef, {
        title: addBookForm.title.value.trim(),
        author: addBookForm.author.value.trim(),
        createdAt: serverTimestamp()
    })
    .then(() =>{
addBookForm.reset();

    })
});

// adding the event listerner to the delete book form

deleteBookForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    const docRef = doc(db, 'books', deleteBookForm.id.value.trim());
    deleteDoc(docRef)
    .then(() =>{
        deleteBookForm.reset();
    }).catch((error) =>{
        console.log(error);
    });
})

// get a single document

const docRef = doc(db,'books','eQiJo9tH8diMHT9VOExg');
getDoc(docRef)
.then((doc) =>{
    console.log(doc.data(), doc.id);
})

// get the updates from the firestore updated on the snapshot view.
onSnapshot(docRef,(doc) =>{
    console.log(doc.data(), doc.id)
})

updateForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    const docRef = doc(db,'book', updateForm.id.value.trim());
    updateForm(docRef, {
        title: 'update title' 
    })
    .then(() =>{
        updateForm.reset();
    })
})
