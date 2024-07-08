import { useState, useEffect } from 'react';
import { getPrivateMessages, getUserMessages, getContacts } from '../../services/api.js';

export const useChatData = (activeChat) => {
    const [contacts, setContacts] = useState([]);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const contactsData = await getContacts();
                const combinedContacts = [
                    ...contactsData.users.map(user => ({ ...user, type: 'user' })),
                    ...contactsData.organizations.map(org => ({ ...org, type: 'organization' }))
                ];
                setContacts(combinedContacts);
            } catch (error) {
                console.error('Error al cargar contactos:', error);
            }
        };
        fetchContacts();
    }, []);

    useEffect(() => {
        const fetchMessages = async () => {
            if (activeChat) {
                try {
                    let response;
                    if (activeChat.type === 'organization') {
                        response = await getPrivateMessages({ user: activeChat.senderId, organization: activeChat.receiverId });
                    } else {
                        response = await getUserMessages({ sender: activeChat.senderId, receiver: activeChat.receiverId });
                    }
                    setMessages(response);
                } catch (error) {
                    console.error('Error al cargar mensajes antiguos:', error);
                }
            } else {
                setMessages([]);
            }
        };

        fetchMessages();
    }, [activeChat]);

    return { contacts, messages, setMessages, setContacts };
};
