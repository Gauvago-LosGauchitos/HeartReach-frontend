import React, { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';
import { NavBar } from '../../NavBar/NavBar.jsx';
import { Footer } from '../../Footer/Footer.jsx';
import { useSearch } from '../../../shared/hooks/useSearch.jsx';
import { useChatData } from '../../../shared/hooks/useMessages.jsx';
import {jwtDecode} from 'jwt-decode';
import './ChatApp.css';
import { sendPrivateMessage, sendUserMessage, getPrivateMessages, getUserMessages } from '../../../services/api.js';

const socket = io('http://localhost:2690');

export const ChatApp = () => {
    const [messageInput, setMessageInput] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showContacts, setShowContacts] = useState(true);
    const [activeChat, setActiveChat] = useState(null);
    const [type, setType] = useState('');

    const messagesEndRef = useRef(null);
    const searchInputRef = useRef(null);

    const { searchUsers2, searchOrganizations2 } = useSearch();
    const { messages, setMessages, contacts, setContacts } = useChatData(activeChat);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to server');
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });

        socket.on('userMessage', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('userMessage');
        };
    }, [setMessages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    };

    const handleChatClick = async (contact) => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error('No token found');
            return;
        }

        const decodedToken = jwtDecode(token);
        const senderId = decodedToken.uid;
        const receiverId = contact._id;

        setActiveChat({ ...contact, senderId, receiverId });
        setShowContacts(true);

        try {
            let oldMessages = [];
            if (contact.type === 'organization') {
                oldMessages = await getPrivateMessages(senderId, receiverId); // API call to get messages between user and organization
            } else {
                oldMessages = await getUserMessages(senderId, receiverId); // API call to get messages between two users
            }
            const formattedMessages = oldMessages.map(msg => ({
                id: msg._id,
                sender: msg.username || 'Unknown', // Adjust according to your data structure
                content: msg.message,
                time: new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }));
            setMessages(formattedMessages);
        } catch (error) {
            console.error('Error fetching old messages:', error);
        }
    };

    const handleBackClick = () => {
        setActiveChat(null);
        setShowContacts(true);
    };

    const handleInputChange = async (event) => {
        const { value } = event.target;
        setSearchQuery(value);

        if (value.trim() !== '') {
            try {
                const usersResults = await searchUsers2(value);
                const orgsResults = await searchOrganizations2(value);
                const combinedResults = [...usersResults, ...orgsResults];
                setSearchResults(combinedResults);
            } catch (error) {
                console.error('Error al buscar:', error);
                setSearchResults([]);
            }
        } else {
            setSearchResults([]);
        }
    };

    const handleSearchResultClick = (result) => {
        setContacts((prevContacts) => [...prevContacts, result]);
        handleChatClick(result);
        setSearchQuery('');
        setSearchResults([]);
        setShowContacts(false);
    };

    const handleSendMessage = async () => {
        if (messageInput.trim() !== '') {
            const newMessage = {
                id: `${messages.length + 1}`,
                sender: 'You',
                content: messageInput,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages([...messages, newMessage]);
            setMessageInput('');

            try {
                if (type === 'organization') {
                    await sendPrivateMessage({
                        user: activeChat.senderId,
                        organization: activeChat.receiverId,
                        username: 'You',
                        message: newMessage.content
                    });
                } else {
                    await sendUserMessage({
                        sender: activeChat.senderId,
                        receiver: activeChat.receiverId,
                        message: newMessage.content
                    });
                }

                socket.emit('sendMessage', { chatId: activeChat.id, message: newMessage });
            } catch (error) {
                console.error('Error al enviar el mensaje:', error);
            }
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && messageInput.trim() !== '') {
            handleSendMessage();
        }
    };

    return (
        <div className='bodyChat'>
            <NavBar />
            <div className="containerChat">
                <div className={`contacts ${activeChat ? 'hidden' : ''}`}>
                    <div className="contacts-header">
                        <h2>Contacts</h2>
                        <button className="add-button" onClick={() => setShowContacts(!showContacts)}>+</button>
                    </div>
                    {!showContacts && (
                        <div className="search-bar">
                            <input
                                ref={searchInputRef}
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={handleInputChange}
                            />
                            {searchResults.length > 0 && (
                                <div className="search-results">
                                    {searchResults.map(result => (
                                        <div key={result.id} className="search-result" onClick={() => handleSearchResultClick(result)}>
                                            <p>{result.username || result.name}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                    {showContacts && (
                        <div className="default-contacts">
                            {contacts.length > 0 ? (
                                contacts.map((contact) => (
                                    <div className="contact" key={contact.id} onClick={() => handleChatClick(contact)}>
                                        <img src="https://placehold.co/24x24" alt="user-icon" className="avatar" />
                                        <div className="contact-info">
                                            <p className="contact-name">{contact.username || contact.name}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div>No contacts available</div>
                            )}
                        </div>
                    )}
                </div>
                <div className={`chat ${activeChat ? '' : 'hidden'}`}>
                    <div className='backSection'>
                        <button className='buttonBack' onClick={handleBackClick}>
                            Back
                        </button>
                    </div>
                    <div className="chat-messages">
                        {messages.map((message) => (
                            <div className={`message ${message.sender === 'You' ? 'message-self' : ''}`} key={message.id}>
                                <img src="https://placehold.co/24x24" alt="user-icon" className="avatar" />
                                <div>
                                    <p className="message-sender">{message.sender} <span className="message-time">{message.time}</span></p>
                                    <p className="message-content">{message.content}</p>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef}></div>
                    </div>
                    <div className="chat-input">
                        <input
                            type="text"
                            placeholder="Type your message..."
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                        <button className="send-button" onClick={handleSendMessage}>
                            <img src="https://placehold.co/24x24?text=✈" alt="send-icon" />
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};
