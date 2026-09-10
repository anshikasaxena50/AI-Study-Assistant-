function formatAnswer(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\*\*\*(.*?)\*\*\*/g, "<strong><em>$1</em></strong>")
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.*?)\*/g, "<em>$1</em>")
        .replace(/^### (.*)$/gm, "<h3>$1</h3>")
        .replace(/^## (.*)$/gm, "<h2>$1</h2>")
        .replace(/^# (.*)$/gm, "<h1>$1</h1>")
        .replace(/^---$/gm, "<hr>")
        .replace(/^\d+\.\s+(.*)$/gm, "<div class='list-item'>• $1</div>")
        .replace(/^\*\s+(.*)$/gm, "<div class='list-item'>• $1</div>")
        .replace(/\n\n/g, "<br><br>")
        .replace(/\n/g, "<br>");
}

async function askAI() {
    const question = document.getElementById("question").value;
    const answer = document.getElementById("answer");

    if (question.trim() === "") {
        answer.innerText = "Please enter a question.";
        return;
    }

    answer.innerText = "Thinking...";

    try {
        const response = await fetch("https://ai-study-assistant.anshikasaxena50.workers.dev", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                question: question
            })
        });

        const data = await response.json();

        if (data.error) {
            answer.innerText = "Error: " + data.error;
        } else {
            answer.innerHTML = formatAnswer(data.answer);
        }

    } catch (error) {
        answer.innerText = "Unable to connect to AI. Please try again.";
        console.error(error);
    }
}
async function makeNotes() {
    const question = document.getElementById("question").value;
    const answer = document.getElementById("answer");

    if (question.trim() === "") {
        answer.innerText = "Please enter a topic for your notes.";
        return;
    }

    answer.innerText = "📝 Creating your notes...";

    try {
        const response = await fetch("https://ai-study-assistant.anshikasaxena50.workers.dev", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                question: `Create clear, student-friendly study notes on this topic: ${question}

Use:
- A short definition
- Important points
- Key concepts
- Examples where useful
- A short summary at the end

Keep the notes well organized and easy to revise.`
            })
        });

        const data = await response.json();

        if (data.error) {
            answer.innerText = "Error: " + data.error;
        } else {
            answer.innerHTML = formatAnswer(data.answer);
        }

    } catch (error) {
        answer.innerText = "Unable to create notes. Please try again.";
        console.error(error);
    }
}
async function handwrittenNotes() {
    const question = document.getElementById("question").value;
    const answer = document.getElementById("answer");

    if (question.trim() === "") {
        answer.innerText = "Please enter a topic for handwritten notes.";
        return;
    }

    answer.innerText = "✍️ Creating your handwritten notes...";

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);

    try {
        const response = await fetch("https://ai-study-assistant.anshikasaxena50.workers.dev", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            signal: controller.signal,
            body: JSON.stringify({
                question: `Create clear and short study notes on: ${question}

Include:
1. Simple definition
2. Important points
3. Key concepts
4. Examples if useful
5. Short summary

Keep the notes easy for a college student to revise.`
            })
        });

        clearTimeout(timeout);

        const data = await response.json();

        if (data.error) {
            answer.innerText = "Error: " + data.error;
        } else {
            answer.innerHTML = `
                <div class="handwritten-note">
                    ${formatAnswer(data.answer)}
                </div>
            `;
        }

    } catch (error) {
        clearTimeout(timeout);

        if (error.name === "AbortError") {
            answer.innerText = "⏳ AI is taking too long. Please try again.";
        } else {
            answer.innerText = "Unable to create handwritten notes. Please try again.";
        }

        console.error(error);
    }
}
.handwritten-note {
    width: 90%;
    max-width: 700px;
    margin: 30px auto;
    padding: 30px 35px;
    text-align: left;

    background-color: #fffef5;

    background-image:
        linear-gradient(#d6e4f0 1px, transparent 1px);

    background-size: 100% 32px;

    border-left: 5px solid #e57373;
    border-radius: 4px;

    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);

    font-family: "Comic Sans MS", "Segoe Print", cursive;
    font-size: 18px;
    line-height: 32px;

    color: #1d4f91;
}

.handwritten-note h1,
.handwritten-note h2,
.handwritten-note h3 {
    color: #174a8b;
    font-family: "Comic Sans MS", "Segoe Print", cursive;
}

.handwritten-note strong {
    color: #174a8b;
}
