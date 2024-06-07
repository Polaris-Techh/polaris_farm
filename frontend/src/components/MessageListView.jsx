import React from 'react';
import Message from './Message';

function MessageListView(props) {
    return (
        <div>
            <ul>
                {props.messageList.map(message => (
                    <Message key={message.email} message={message} />
                ))}
            </ul>
        </div>
    );
}

export default MessageListView;
