import Api from "./service/Api";
import App from "./app/App";
import './pages/index.css';

const app = new App(
    document.querySelector('.root'),
    new Api({
        baseUrl: 'https://praktikum.tk/cohort10/',
        headers: {
            authorization: 'c38a1f03-c141-4547-92be-fa0cc360e1d4',
            'Content-Type': 'application/json'
        }
    })
);

app.renderPage();
