import { resetError, toggleClass } from '../utils/Utils';

export default class Popup {
    constructor(domNode, type) {
        this.domNode = domNode;
        this.type = type;

        this._setEventListeners(this.domNode, this.type);
    }

    _updatePopup(popup, type) {
        switch(type) {
            case 'form': {
                toggleClass(popup, 'popup_is-opened');
                break;
            }
            case 'image': {
                toggleClass(popup,'image-popup_is-opened');
                break;
            }
            default: {
                console.log('Incorrect popup type');
            }
        }
    };

    _fillPopup(popup, src, mode, popupTitle, namePlaceholder, linkPlaceholder, buttonText, userNameValue, userJobValue) {
        if (popup.type === 'image') {
            const picture = popup.domNode.querySelector('.image-popup__picture');
            picture.src = src.split('"')[1];
        } else {
            const title = popup.domNode.querySelector('.popup__title');
            const form = popup.domNode.querySelector('.popup__form');
            const name = form.elements.name;
            const link = form.elements.link;
            const button = popup.domNode.querySelector('.popup__button');

            title.textContent = popupTitle;
            name.setAttribute('placeholder', namePlaceholder);
            link.setAttribute('placeholder', linkPlaceholder);
            button.textContent = buttonText;

            if (mode === 'userInfo') {
                name.value = userNameValue;
                link.value = userJobValue;
                this._updateInputClassByValues(name, 'user-info-popup', 'new-card-popup');
                this._updateInputClassByValues(link, 'user-info-popup', 'new-card-popup');
            } else {
                name.value = '';
                link.value = '';
                this._updateInputClassByValues(name, 'new-card-popup', 'user-info-popup');
                this._updateInputClassByValues(link, 'new-card-popup', 'user-info-popup');
            }

            resetError(form.querySelector('.name-error'));
            resetError(form.querySelector('.link-error'));
        }
    };

    _setEventListeners(dom, type) {
        switch (type) {
            case 'image': {
                dom.querySelector('.image-popup__close').addEventListener('click', () => {
                    this._updatePopup(dom, type);
                });
                break;
            }
            case 'form': {
                dom.querySelector('.popup__close').addEventListener('click', () => {
                    this._updatePopup(dom, type);
                });
                break;
            }
            default: {
                console.log('Popup type ' + type + ' is not supported');
            }
        }
    };

    _updateInputClassByValues(input, addingClass, removingClass) {
        input.classList.remove(removingClass);
        input.classList.add(addingClass);
    };

    open(mode, src, title, namePlaceholder, linkPlaceholder, buttonText, userNameValue, userJobValue) {
        this._fillPopup(this, src, mode, title, namePlaceholder, linkPlaceholder, buttonText, userNameValue, userJobValue);
        this._updatePopup(this.domNode, this.type);
    }

    close() {
        this._updatePopup(this.domNode, this.type);

        if (this.type === 'form') {
            this.domNode.querySelector('.popup__form').reset();
        }
    }
}

