import React from 'react'
import { useDispatch } from 'react-redux';
import { startSaveNote, startUploading } from '../actions/notes'

export const NotesAppBar = () => {
    const dispatch = useDispatch();
    const handlerInputChanger = () => {
        dispatch(startSaveNote())
    }
    const handlerInputPucture = () => {
        document.querySelector('#fileSelector').click();
    }
    const handlerFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            dispatch(startUploading(file))
        }

    }
    return (
        <div className="notes__appbar">
            <span>28 de agosto 2020</span>
            <input
                id='fileSelector'
                type="file"
                name="file"
                style={{ display: 'none' }}
                onChange={handlerFileChange}

            ></input>
            <div>
                <button
                    onClick={handlerInputPucture}
                    className="btn"
                >
                    Picture
                </button>
                <button className="btn"

                    onClick={handlerInputChanger}
                >
                    save
                </button>
            </div>

        </div>
    )
}
