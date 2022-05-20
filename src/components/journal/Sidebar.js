import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startLogout } from '../actions/auth';
import { noteLogout, starNewNotes, startLogoutCleaning } from '../actions/notes';
import { JournalEntries } from './JournalEntries'

export default function Sidebar() {
    const dispatch = useDispatch();
    const {  name } = useSelector(state => state.auth)
    const handelLogout = () => {
        dispatch(startLogout());
        dispatch(startLogoutCleaning());
    }
    const handelAddNewEntry = () => {

        dispatch(starNewNotes())

    }
    return (
        <aside className="journal__slidebar">
            <div className="journal__slidebar-navbar">
                <h3 className="mt-5">
                    <i className="fa fa-moon"></i>
                    <span> {name}</span>
                </h3>
                <button className="btn"
                    onClick={handelLogout}
                >
                    Logout
                </button>
            </div>

            <div className="journal__new-entry animate__animated animate__bounceInDown"
                onClick={handelAddNewEntry}
            >
                <i className="far fa-calendar-plus fa-5x " />

                <p className="mt-5">New entry</p>
            </div>
            <JournalEntries />
        </aside>
    )
}
