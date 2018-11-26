import App from './components/App.html';
import { questions } from './data/questions.js';
import { randomQuestion } from './checker';

let question = randomQuestion(questions);

const app = new App({
    target: document.getElementById('app'),
    props: {
        questions,
        question
    }
});

export default app;