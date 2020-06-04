import Popup from "./Popup";
import FormValidator from "./FormValidator";
import Card from "./Card";
import CardList from "./CardList";
import UserInfo from "./UserInfo";

export default class App {
    constructor(root, api) {
        this.root = root;
        this.api = api;
    }

    renderPage() {
        if (!this.api) {
            console.log('Rest service is undefined');
            return;
        }

        const userPromise = this.api.getUser();
        const cardsPromise = this.api.getCards();

        Promise.all([userPromise, cardsPromise])
            .then(results => {
                const userInfo = this._renderUserInfo(results[0]);
                const cardList = this._renderCards(results[1]);

                const editButton = this.root.querySelector('.user-info__edit-button');
                const popupButton = this.root.querySelector('.popup__button');
                const userName = this.root.querySelector('.user-info__name');
                const userJob = this.root.querySelector('.user-info__job');
                const userPhoto = this.root.querySelector('.user-info__photo');
                const form = this.root.querySelector('.popup__form');
                const addButton = this.root.querySelector('.user-info__button');
                const popupDomElement = this.root.querySelector('.popup');

                const popup = new Popup(popupDomElement, 'form');
                const formValidator = new FormValidator(popupDomElement);
                formValidator.setEventListeners();

                addButton.addEventListener('click', () => {
                    const type = 'place';
                    popup.open(
                        type,
                        null,
                        'Новое место',
                        'Название',
                        'Ссылка на картинку',
                        '+'
                    );
                    form.setAttribute('type', type);
                });

                editButton.addEventListener('click', () => {
                    const type = 'userInfo';
                    popup.open(
                        type,
                        null,
                        'Редактировать профиль',
                        'Имя',
                        'О себе',
                        'Сохранить',
                        userName.textContent,
                        userJob.textContent
                    );
                    form.setAttribute('type', type);
                });

                form.addEventListener('submit', event => {
                    const mark = event.target.getAttribute('type');
                    if (mark === 'place') {
                        event.preventDefault();
                        this.api.addCard({
                            name: form.elements.name.value,
                            link: form.elements.link.value
                        })
                            .then(
                                response => this._addCard(response, cardList, form, popup, popupButton)
                            )
                            .catch(
                                response => console.log('Image is not added: ' + response.statusText)
                            );
                    } else if (mark === 'userInfo') {
                        event.preventDefault();
                        this.api.updateProfile({
                            name: form.elements.name.value,
                            about: form.elements.link.value
                        })
                            .then(
                                response => this._updateUserInfo(
                                    response, userInfo, form, popup, popupButton, userName, userJob, userPhoto)
                            )
                            .catch(response => {
                                console.log('Profile is not updated: ' + response.statusText);
                            });

                    }
                });
            })
            .catch(response => {
                console.log('Data is not loaded: ' + response.statusText);
            });
    };

    _addCard(data, cardList, form, popup, popupButton) {
        const { name, link } = data;
        cardList.addCard(new Card(link, name));
        form.reset();
        popup.close();
        popupButton.setAttribute('disabled', '');
    }

    _updateUserInfo(data, userInfo, form, popup, popupButton, userName, userJob, userPhoto) {
        const { name, about, avatar } = data;
        userInfo.setUserInfo(name, about, avatar);
        userInfo.updateUserInfo(userName, userJob, userPhoto);
        form.reset();
        popup.close();
        popupButton.setAttribute('disabled', '');
    }

    _renderUserInfo(data) {
        const { name, avatar, about } = data;

        const userInfo = new UserInfo();
        userInfo.setUserInfo(name, about, avatar);
        userInfo.create(this.root.querySelector('.user-info'));

        return userInfo;
    }

    _renderCards(cards) {
        const imagePopup = new Popup(this.root.querySelector('.image-popup'), 'image');

        const cardElements = cards.map(element => new Card(element.link, element.name));
        const cardList = new CardList(this.root.querySelector('.places-list'), cardElements);

        cardList.getDomNode().addEventListener('click', (event) => {
            if (event.target.classList.contains('place-card__image')) {
                imagePopup.open(null, event.target.style.backgroundImage);
            }
        });

        cardList.render();

        return cardList;
    }
}
