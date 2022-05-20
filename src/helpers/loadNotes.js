import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase-config"

export const loadNotes = async (uid) => {
 //   const notesSnap = await collection(db, `${uid}/journal/notes`).get();
//const docRef = doc(db, `${uid}/journal/notes`);
    const querySnapshot = await getDocs(collection(db, `${uid}/journal/notes`));

    const notes = [];
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        notes.push({
            id:doc.id,
            ...doc.data()
        })
      });
    return notes;
}