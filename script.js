function askAI() {
    const question = document.getElementById("question").value;

    if (question.trim() === "") {
        alert("Please enter a question.");
        return;
    }

    alert("Your question is: " + question);
}