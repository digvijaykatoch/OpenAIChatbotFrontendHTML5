 const chatHistory = document.getElementById("chat-history");

    const chatForm = document.getElementById("chat-form");

    const messageInput = document.getElementById("message");

 

    chatForm.addEventListener("submit", (event) => {

      event.preventDefault();

      const message = messageInput.value;

      messageInput.value = "";

      addChatBubble(message, true);

      fetch("/api/send-message", {

          method: "POST",

          headers: {

            "Content-Type": "application/json",

          },

          body: JSON.stringify({ message }),

        })

        .then((response) => response.json())

        .then((data) => {

          addChatBubble(data.message, false);

        })

        .catch((error) => console.error(error));

    });

 

    function addChatBubble(text, isUser) {

      const chatBubble = document.createElement("div");

      chatBubble.classList.add("chat-bubble");

      if (isUser) {

        chatBubble.classList.add("user");

      }

      chatBubble.textContent = text;

      chatHistory.appendChild(chatBubble);

      chatHistory.scrollTop = chatHistory.scrollHeight;

    }
