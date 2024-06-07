import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MessageListView from './MessageListView';

function MessageList() {
    const [messageList, setMessageList] = useState([]);
    const [name, setName] = useState('');
    const [purpose, setPurpose] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/messages')
            .then(res => {
                setMessageList(res.data);
            })
            .catch(error => {
                console.error('Error fetching messages:', error);
            });
    }, []);

    const addMessageHandler = () => {
        let errorList = [];

        if (!name) errorList.push("Name is required.");
        if (!email) errorList.push("Email is required.");
        if (!message) errorList.push("Message is required.");

        if (errorList.length > 0) {
            setErrors(errorList);
            return;
        }

        axios.post('http://localhost:8000/api/messages', {
            name: name,
            purpose: purpose,
            email: email,
            message: message
        })
            .then(res => {
                console.log(res);
                setMessageList([...messageList, res.data]);
                // Clear the form fields
                setName('');
                setPurpose('');
                setEmail('');
                setMessage('');
                setErrors([]); // Clear errors on successful submission
            })
            .catch(error => {
                console.error('Error adding message:', error);
            });
    };

    return (
        <div>
            <h1>Message List</h1>
            <div className="form">
                <input
                    type="text"
                    placeholder="Name..."
                    value={name}
                    required    
                    onChange={event => setName(event.target.value)}
                />
                <input
                    type="text"
                    placeholder="Purpose..."
                    value={purpose}
                    onChange={event => setPurpose(event.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email..."
                    value={email}
                    required
                    onChange={event => setEmail(event.target.value)}
                />
                <input
                    type="text"
                    placeholder="Message..."
                    value={message}
                    required
                    onChange={event => setMessage(event.target.value)}
                />
                <button onClick={addMessageHandler}>Add Message</button>
            </div>
            {errors.length > 0 && (
                <div className="error-messages">
                    <ul>
                        {errors.map((error, index) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}
            <h1>Your Messages</h1>
            <MessageListView messageList={messageList} />
        </div>
    );
}

export default MessageList;
