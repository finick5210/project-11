'use strict';

export const addClass = (element, elementClass) => {
    element.classList.add(elementClass);
};

export const resetError = (error) => {
    error.innerHTML = "";
    error.classList.remove('popup__error');
};

export const toggleClass = (element, elementClass) => {
    element.classList.toggle(elementClass);
};