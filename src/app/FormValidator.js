import { EMPTY_FIELD_ERROR_TEXT, INCORRECT_FIELD_LENGTH_ERROR } from "../utils/constants";
import { addClass, resetError } from '../utils/Utils';

export default class FormValidator {
    constructor(popup) {
        this.popup = popup;
    }

    _inputHandler(event, popupButton) {
        const name = event.currentTarget.elements.name;
        const link = event.currentTarget.elements.link;
        if (name.value.length === 0 || link.value.length === 0) {
            popupButton.setAttribute('disabled', '');
        } else {
            popupButton.removeAttribute('disabled');
        }
    }

    checkInputValidity(field, error) {
        const length = field.value.length;
        if (length === 0) {
            error.innerHTML = EMPTY_FIELD_ERROR_TEXT;
            addClass(error, 'popup__error');
        } else if (length < 2 || length > 30) {
            error.innerHTML = INCORRECT_FIELD_LENGTH_ERROR;
            addClass(error, 'popup__error');
        } else {
            resetError(error);
        }
    }

    setSubmitButtonState(button, nameError, linkError) {
        const popupError = 'popup__error';
        if (nameError.classList.contains(popupError) || linkError.classList.contains(popupError)) {
            button.setAttribute('disabled', '');
        } else {
            button.removeAttribute('disabled');
        }
    }

    setEventListeners() {
        const form = this.popup.querySelector('.popup__form');
        const name = form.querySelector('.popup__input_type_name');
        const link = form.querySelector('.popup__input_type_link-url');
        const nameError = form.querySelector('.name-error');
        const linkError = form.querySelector('.link-error');
        const button = form.querySelector('.popup__button');

        name.addEventListener("input", event => {
            if (event.target.classList.contains('user-info-popup')) {
                this.checkInputValidity(name, nameError);
            }
        });
        link.addEventListener("input", event => {
            if (event.target.classList.contains('user-info-popup')) {
                this.checkInputValidity(link, linkError);
            }
        });
        form.addEventListener("input", event => {
            if (event.target.classList.contains('user-info-popup')) {
                this.setSubmitButtonState(button, nameError, linkError)
            } else {
                this._inputHandler(event, button);
            }
        });
    }
}

