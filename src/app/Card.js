import { addClass } from '../utils/Utils';

export default class Card {
    constructor(image, description) {
        this.image = image;
        this.description = description;
    }

    like() {
        if (this.dom) {
            // Можно лучше: Код можно упростить, если использовать event.target, который передаётся в обработчик события.
            this.dom.querySelector('.place-card__like-icon').classList.toggle('place-card__like-icon_liked');
        }
    }

    remove() {
        if (this.dom) {
            this.dom.closest('.place-card').remove();
        }
    }

    create() {
        const card = document.createElement('div');
        const image = document.createElement('div');
        const deleteIcon = document.createElement('button');
        const description = document.createElement('div');
        const name = document.createElement('h3');
        const likeIcon = document.createElement('button');

        name.textContent = this.description;
        image.setAttribute('style', 'background-image: url(' + this.image + ')');

        addClass(card, 'place-card');
        addClass(image, 'place-card__image');
        addClass(deleteIcon, 'place-card__delete-icon');
        addClass(description, 'place-card__description');
        addClass(name, 'place-card__name');
        addClass(likeIcon, 'place-card__like-icon');

        image.appendChild(deleteIcon);
        description.appendChild(name);
        description.appendChild(likeIcon);
        card.appendChild(image);
        card.appendChild(description);

        this.dom = card;

        likeIcon.addEventListener('click', () => this.like());
        deleteIcon.addEventListener('click', () => this.remove());

        return card;
    }
}

