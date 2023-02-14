const chatArea = document.getElementById('chat-area');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

sendButton.addEventListener('click', async () => {
  // Get the user's message
  const message = messageInput.value.trim();
  messageInput.value = '';
  
  // Show user's message in the chat area
  const userMessageElement = document.createElement('div');
  userMessageElement.className = 'bubble user-bubble';
  userMessageElement.innerText = message;
  chatArea.appendChild(userMessageElement);

  // Send the user's message to the server and get the response
  const response = await fetch('/get_response', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ message })
  }).then(res => res.json());

  // Show the response in the chat area
  const botMessageElement = document.createElement('div');
  botMessageElement.className = 'bubble bot-bubble';
  botMessageElement.innerText = response.message;
  chatArea.appendChild(botMessageElement);
});

// Allow sending messages by pressing enter key
messageInput.addEventListener('keydown', event => {
  if (event.keyCode === 13) {
    event.preventDefault();
    sendButton.click();
  }
});
