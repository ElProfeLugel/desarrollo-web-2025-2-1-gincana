document.addEventListener('DOMContentLoaded'){
    const questions = [
        {
            question: "¿Quien conquisto America?",
            options: ["Colon", "Chaplin", "Mbappe"],
            correctAnswer: "Colon"
        },
        {
            question: "Cual es el pais mas grande del mundo?",
            options: ["Peru", "China", "Rusia"],
            correctAnswer: "Rusia"

        },
        {
            question: "Quien hizo el gol en la final del mundial 2014",
            options: ["Gotze", "Messi", "Muller"],
            correctAnswer: "Gotze"
        },   
    ];
//Contador para obtener elementos y mostrarlos en el html incluyendo la respuesta correcta
    const questionElement = document.getElementById("question")
    const optionsElement = document.getElementById("options")
    const correctAnswerElement = document.getElementById("correctAnswer")
    for (let currQuestionIndex= 0; questions.length< currQuestionIndex++){
        
        