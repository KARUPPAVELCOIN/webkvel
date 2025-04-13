// Hardcoded password (in a real app, use secure authentication)
const ADMIN_PASSWORD = "admin123";

function checkPassword() {
    const passwordInput = document.getElementById('passwordInput');
    const passwordError = document.getElementById('passwordError');
    const passwordPrompt = document.getElementById('passwordPrompt');
    const adminContent = document.getElementById('adminContent');

    if (passwordInput.value === ADMIN_PASSWORD) {
        passwordPrompt.classList.add('hidden');
        adminContent.classList.remove('hidden');
    } else {
        passwordError.textContent = 'Incorrect password!';
    }
}

async function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const status = document.getElementById('status');
    const message = messageInput.value.trim();

    if (message === '') {
        status.textContent = 'Please enter a message!';
        status.style.color = 'red';
        return;
    }

    const newMessage = {
        text: message,
        timestamp: new Date().toLocaleString()
    };

    try {
        const response = await fetch('http://localhost:3000/webkvel', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newMessage)
        });

        if (response.ok) {
            messageInput.value = '';
            status.textContent = 'Message sent!';
            status.style.color = '#28a745';
            setTimeout(() => {
                status.textContent = '';
            }, 2000);
        } else {
            status.textContent = 'Failed to send message!';
            status.style.color = 'red';
        }
    } catch (err) {
        console.error('Error:', err);
        status.textContent = 'Server error!';
        status.style.color = 'red';
    }
}
