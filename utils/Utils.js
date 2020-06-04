'use strict';

const addClass = (element, elementClass) => {
    element.classList.add(elementClass);
};

const resetError = (error) => {
    error.innerHTML = "";
    error.classList.remove('popup__error');
};

const toggleClass = (element, elementClass) => {
    element.classList.toggle(elementClass);
};