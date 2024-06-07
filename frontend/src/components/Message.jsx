import React, { useState } from 'react';
import axios from 'axios';

function Message(props) {
    const [deleted, setDeleted] = useState(false); // State to track whether the message is deleted

    const deleteMessageHandler = () => {
        const email = props.message.email;
        axios.delete(`http://localhost:8000/api/messages/${email}`)
            .then(res => {
                console.log(res.data);
                // Update state to indicate that the message is deleted
                setDeleted(true);
            })
            .catch(error => {
                console.error('Error deleting message:', error);
            });
    };

    if (deleted) {
        // If message is deleted, don't render it
        return null;
    }

    return (
        <div>
            <p>
                <span>{props.message.name} ({props.message.email}) : </span> 
                {props.message.purpose} - {props.message.message}
                <button onClick={deleteMessageHandler}>Delete</button>
            </p>
        </div>
    );
}

export default Message;
