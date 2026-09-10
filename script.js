console.log("AI Study Assistant loaded");
async function askAI() {
    const question = document.getElementById("question").value;
    const answer = document.getElementById("answer");

    if (question.trim() === "") {
        answer.innerText = "Please enter a question.";
        return;
    }

    answer.innerText = "TESTING...";

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
            answer.innerText = data.answer;
        }

    } catch (error) {
        answer.innerText = "Unable to connect to AI. Please try again.";
    }
}
