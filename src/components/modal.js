import {closePopup} from './utils.js';


export function handleOverlayClick(evt) {
    if (evt.target.classList.contains('popup')) {
        closePopup(document.querySelector('.popup_opened'));
    }
}

export function handleEscKeydown(evt) {
    const popupOpened = document.querySelector('.popup_opened')
    if (popupOpened) {
        closePopup(popupOpened);
    }
}