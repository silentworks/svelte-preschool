export function randomQuestion(questions) {
    let filteredQuestions = questions.filter((question) => {
        return question.points === undefined;
    });
    return filteredQuestions[Math.floor(Math.random() * filteredQuestions.length)];
};

export function addTriesToQuestion(question) {
    if (question.tries === undefined) {
        question.tries = 0;
    }
    
    question.tries += 1;
    return question;
};

export function addPointToQuestion(question) {
    let lookup = {1: 3, 2: 2, 3: 1};

    if (question.points === undefined) {
        question.points = 0;
    }

    question.points = lookup[question.tries] || 0;
    return question;
};

export function resetQuestions(questions) {
    return questions.map(question => {
        return Object.assign({}, question, {
            points: undefined,
            tries: undefined
        });
    });
};
