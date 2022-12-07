import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'

function CommentsSubCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const { comment, index } = props;

    return (
        <div style={{
            color: 'lightgray',
            fontSize: '16pt',
            margin: '12px',
            padding: '18px',
            borderRadius: '20px',
            backgroundColor: '#charcoal'}}
            >
            <div style={{fontStyle: 'italic', fontSize: 16, padding: '0px 5px 5px 0px'}}> {comment.user} <br/></div>
            {comment.comment}
        </div>
    );
}

export default CommentsSubCard