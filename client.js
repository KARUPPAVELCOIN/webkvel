async function loadMessages() {
    const messageList = document.getElementById('messageList');

    try {
        const response = await fetch('http://localhost:3000/messages');
        if (!response.ok) {
            messageList.innerHTML = '<p>Error loading messages</p>';
            return;
        }

        const data = await response.json();
        messageList.innerHTML = '';

        // Handle empty messages
        const messages = data.messages.message || [];
        messages.forEach(msg => {
            const messageDiv = document.createElement('div');
            messageDiv.className = 'message';
            messageDiv.innerHTML = `<strong>${msg.timestamp}</strong><p>${msg.text}</p>`;
            messageList.appendChild(messageDiv);
        });
    } catch (err) {
        console.error('Error:', err);
        messageList.innerHTML = '<p>Server error</p>';
    }
}

// Load messages initially
loadMessages();

// Poll for new messages every 2 seconds
setInterval(loadMessages, 2000);