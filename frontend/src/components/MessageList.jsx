import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../static/Form.css'; // Make sure to import the CSS

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
        <div className="container">
            <main className="row">
                <section className="col left">
                    <div className="contactTitle">
                        <h2>Get In Touch</h2>
                        <p>Let us know what you think about this community.</p>
                        {errors.length > 0 && (
                        <div className="error-messages">
                            <ul>
                                {errors.map((error, index) => (
                                    <li key={index}>{error}</li>
                                ))}
                            </ul>
                        </div>
                    )}  
                    </div>
                    <div className="contactInfo">
                        <div className="iconGroup">
                            <div className="icon">
                                <i className="fa-solid fa-envelope"></i>
                            </div>
                            <div className="details">
                                <span className='email'>Email</span>
                                <span>techpolaris24@gmail.com</span>
                            </div>
                        </div>
                        <div className="iconGroup">
                            <div className="icon">
                                <i className="fa-solid fa-location-dot"></i>
                            </div>
                            <div className="details">
                                <span>Location</span>
                                <span>Pakistan</span>
                            </div>
                        </div>
                    </div>
                    <div className="socialMedia">
                        <a href="#"><i className="fa-brands fa-facebook-f"></i></a>
                        <a href="#"><i className="fa-brands fa-twitter"></i></a>
                        <a href="#"><i className="fa-brands fa-instagram"></i></a>
                        <a href="#"><i className="fa-brands fa-linkedin-in"></i></a>
                    </div>
                </section>
                
                <section className="col right">
                    <form className="messageForm">
                        <div className="inputGroup halfWidth">
                            <input 
                                type="text" 
                                name="name" 
                                required 
                                value={name} 
                                placeholder='Your Name'
                                onChange={event => setName(event.target.value)} 
                            />
                        </div>
                        <div className="inputGroup halfWidth">
                            <input 
                                type="email" 
                                name="email" 
                                required 
                                value={email} 
                                placeholder='Email'
                                onChange={event => setEmail(event.target.value)} 
                            />
                        </div>
                        <div className="inputGroup fullWidth">
                            <input 
                                type="text" 
                                name="purpose" 
                                required 
                                value={purpose} 
                                placeholder='Subject'
                                onChange={event => setPurpose(event.target.value)} 
                            />
                        </div>
                        <div className="inputGroup fullWidth">
                            <textarea 
                                name="message" 
                                required 
                                value={message} 
                                placeholder='Say Something'
                                onChange={event => setMessage(event.target.value)} 
                            />
                        </div>
                        <div className="inputGroup fullWidth">
                            <button type="button" onClick={addMessageHandler}>Send Message</button>
                        </div>
                    </form>
                   
                </section>
            </main>
        </div>
    );
}

export default MessageList;
