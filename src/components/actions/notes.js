import { type } from "@testing-library/user-event/dist/type";
import { addDoc, collection, deleteDoc, doc, setDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import { db } from "../../firebase/firebase-config";
import { file_upload } from "../../helpers/fileUpload";
import { loadNotes } from "../../helpers/loadNotes";
import { types } from "../../types/types";




export const starNewNotes = () => {
    return async (dispatch, getState) => {

        try {
            const { uid } = getState().auth;

            const newNote = {
                title: '',
                body: '',
                date: new Date().getTime(),
            }

            const doc = await addDoc(collection(db, `${uid}/journal/notes`), newNote);
            dispatch(activeNotes(doc.uid, newNote));
            dispatch(addNewNote(doc.id, newNote));
            console.log("Document written with ID: ", doc);
        } catch (e) {
            console.error("Error adding document: ", e);
        }

    }
}

export const activeNotes = (id, note) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
});
export const addNewNote = (id, note) => ({
    type: types.notesAddNew,
    payload: {
        id,
        ...note
    }
});

export const startLoading = (uid) => {
    return async (dispatch) => {
        const notas = await loadNotes(uid);
        dispatch(setNotes(notas))
    }
}
export const setNotes = (notes) => ({
    type: types.notesLoad,
    payload: notes
})

export const startSaveNote = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        const { id, title, body, url = '' } = getState().notes.active;
        console.log(getState().notes.active.id, uid)
        const note = {
            title,
            body,
            url,
            date: new Date().getTime()
        }

        try {
            await setDoc(doc(db, `${uid}/journal/notes/${getState().notes.active.id}`), note);

            //  dispatch(activeNotes(id, note));
            dispatch(refreshNotes(id, note));
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Guardado en base de datos',
                showConfirmButton: false,
                timer: 1500
            })
        } catch (e) {
            console.error(e);
        }

    }
}

export const refreshNotes = (id, note) => ({
    type: types.notesUpdate,
    payload: {
        id,
        note: {
            id,
            ...note
        }
    }
});


export const startUploading = (file) => {

    return async (dispatch, getState) => {
        const { active: activeNote } = getState().notes;
        Swal.fire({
            title: 'Subiendo imagen',
            html: 'Espere.....',

            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading()

            },

        })
        const fileUrl = await file_upload(file);
        activeNote.url = fileUrl;
        dispatch(startSaveNote(activeNote))
        Swal.close();

    }

}

export const startDeleting = () => {
    return async (dispatch, getState) => {
        const uid = getState().auth.uid;

        try {
            await deleteDoc(doc(db, `${uid}/journal/notes/${getState().notes.active.id}`));
            dispatch(deleteNote(getState().notes.active.id));
        } catch (error) {

        }
    }
}
export const deleteNote = (id) => ({
    type: types.notesDelete,
    payload: id
})



export const startLogoutCleaning = () => {
    return (dispatch) => {
        dispatch(noteLogout());

    }
}

export const noteLogout = () => ({
    type: types.notesLogoutCleaning
});