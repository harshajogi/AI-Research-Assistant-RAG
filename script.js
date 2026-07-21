const UPLOAD_WEBHOOK = "http://localhost:5678/webhook/upload-pdf";
const CHAT_WEBHOOK = "http://localhost:5678/webhook/ask";

document.getElementById("uploadBtn").addEventListener("click", uploadPDF);

async function uploadPDF() {

    const file = document.getElementById("pdf").files[0];

    if (!file) {
        alert("Select a PDF");
        return;
    }

    const formData = new FormData();
    formData.append("data", file);

    document.getElementById("status").innerHTML = "Uploading...";

    try {

        const response = await fetch(UPLOAD_WEBHOOK, {
            method: "POST",
            body: formData
        });

        await response.text();

        document.getElementById("status").innerHTML = "✅ Uploaded Successfully";

    }

    catch (err) {

        console.error(err);

        document.getElementById("status").innerHTML = "❌ Upload Failed";

    }

}

function addMessage(message, type) {

    const chatBox = document.getElementById("chatBox");

    // Remove welcome screen on first message
    const welcome = chatBox.querySelector(".welcome");

    if (welcome) {
        welcome.remove();
    }

    const bubble = document.createElement("div");

    bubble.className = type;

    bubble.innerHTML = message;

    chatBox.appendChild(bubble);

    chatBox.scrollTop = chatBox.scrollHeight;

    return bubble;

}

async function askAI() {

    const question = document.getElementById("question").value.trim();

    if (!question) {

        alert("Enter a question");

        return;

    }

    // Show user message
    addMessage(question, "user");

    // Clear input
    document.getElementById("question").value = "";

    // Thinking bubble
    const thinkingBubble = addMessage("🤖 Thinking...", "bot");

    try {

        const response = await fetch(CHAT_WEBHOOK, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                question: question
            })

        });

        const data = await response.json();

        // Remove Thinking...
        thinkingBubble.remove();

        // Create empty bot bubble
        const botBubble = addMessage("", "bot");

        // Typing animation
        const text = data.answer;

        let i = 0;

        function typeEffect() {

            if (i < text.length) {

                botBubble.innerHTML += text.charAt(i);

                i++;

                document.getElementById("chatBox").scrollTop =
                    document.getElementById("chatBox").scrollHeight;

                setTimeout(typeEffect, 10);

            }

        }

        typeEffect();

    }

    catch (err) {

        console.error(err);

        thinkingBubble.remove();

        addMessage("❌ Something went wrong.", "bot");

    }

}

// Ask with Enter key
document.getElementById("question").addEventListener("keypress", function(e) {

    if (e.key === "Enter") {

        askAI();

    }

});

// Ask with Button
document.getElementById("askBtn").addEventListener("click", askAI);