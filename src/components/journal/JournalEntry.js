import React from 'react'
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { activeNotes } from '../actions/notes';
export const JournalEntry = ({ id, date, title, body, url }) => {
    const noteDate = moment(date);
    const dispatch = useDispatch();
    const handelViewEntry = () => {
       dispatch(activeNotes(id,{date, title, body, url}))
     
    }

    return (
        <div className="journal__entry pointer" onClick={handelViewEntry}>

            {url && <div className="journal__entry-picture"
                style={{
                    backgroundSize: 'cover',
                    backgroundImage: `url(${url})`
                }}
            />}
            <div className="jornal__entry-body">
                <p className="jornal__entry-title">{title}</p>
                <p className="jornal__entry-content">{body}</p>
            </div>
            <div className="jornal__entry-date-box">
                <span>{noteDate.format('dddd')}</span>
                <h4>{noteDate.format('Do')}</h4>
            </div>
        </div>
    )
}
