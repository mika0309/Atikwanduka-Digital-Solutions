import React from 'react';

const App = () => {
    const phoneNumber = '255650654600';
    const greetingMessage = 'Hello! I need assistance.';
    const waHref = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(greetingMessage)}`;

    return (
        <div>
            <h1>Welcome to Our Service</h1>
            <a href={waHref} target="_blank" rel="noopener noreferrer">Contact us on WhatsApp</a>
        </div>
    );
};

export default App;