const app = new App(
    document.querySelector('.root'),
    new Api({
        // Отлично!: Параметры api передаются в конструктор.
        baseUrl: 'https://praktikum.tk/cohort10/',
        headers: {
            authorization: 'c38a1f03-c141-4547-92be-fa0cc360e1d4',
            'Content-Type': 'application/json'
        }
    })
);

app.renderPage();

// Работа принята.
//
// Что можно улучшить:
// - доработать класс UserInfo, чтобы не было нужды хранить ссылки на его внутренние dom-элементы в коде класса App;
// - доработать класс Popup, вынеся оттуда логику форм.
//
// Успехов в дальнейшем обучении!
