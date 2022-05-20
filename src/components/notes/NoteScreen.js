import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '../../hooks/useForm';
import { activeNotes, startDeleting } from '../actions/notes';
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {
    const { active: note } = useSelector(state => state.notes);
    const dispatch = useDispatch();
    const [formValue, handlerInputChanger, reset] = useForm(note);

    const { body, title } = formValue;

    const activeId = useRef(note.id)
    useEffect(() => {

        if (activeId.current !== note.id) {
            reset(note);
            activeId.current = note.id;
        }

    }, [note, reset])
    useEffect(() => {
        dispatch(activeNotes(formValue.id, { ...formValue }))

    }, [formValue, dispatch])
    const handlerInputChangerDelete = () => {
        dispatch(startDeleting())
    }

    return (
        <div className="note__main-content">
            <NotesAppBar />
            <div className="note__content">

                <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={handlerInputChanger}
                    placeholder="Escribe algo aquí tu titulo"
                    className="note__title-input"
                    autoComplete="off"
                />
                <textarea
                    name="body"
                    value={body}
                    onChange={handlerInputChanger}
                    placeholder="Escribe algo aquí"
                    className="notes__textarea"
                />
                {
                    note.url &&
                    <div className="note__image">
                        <img src={note.url}
                            alt="Imagen" />
                    </div>

                }

            </div>
            <button
                onClick={handlerInputChangerDelete}
                className="btn btn-danger"
            >
                Eliminar
            </button>
        </div>
    )
}
