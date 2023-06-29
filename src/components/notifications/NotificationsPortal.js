import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { createPortal } from 'react-dom';

import Notification from "./Notification";
import NotificationsContext from './NotificationsContext';

function NotificationsPortal(props) {
    const location = useLocation();

    const [error, setError] = useState(null);
    const [messages, setMessages] = useState(null);

    function sendError(title="Error", message="") {
        setError({ type: 'danger', title: title, message: message });
    }

    /**
     * Could be used to send success messages later
     */
    function sendMessage(type="success", title="Success!", message="") {
        /** append the message to the list of messages */
        setMessages([...messages, { type: type, title: title, message: message }]);
    }

    function clear() {
        setError(null);
        setMessages(null);
    }

    return (
        <NotificationsContext.Provider value={{ sendError, sendMessage, clear }}>
            <>
                { createPortal((
                    <div aria-label='notifications-portal' style={{
                        position: 'fixed',
                        top: '5.275rem',
                        right: 15,
                        zIndex: 2000,
                    }}>
                        {/** render the error notification on path change for notification clarity */}
                        {error && <Notification key={location.pathname} error={error} />}
                        {messages && messages.map((message, index) => <Notification key={index} message={message} />)}
                    </div>
                ), document.body) }
            </>
            {props.children}
        </NotificationsContext.Provider>
    );
}

export default NotificationsPortal;