import {closePopup} from './utils.js';

export function closeActivePopup(evt) {
    if (evt.key === 'Escape') {
     const popupOpened = document.querySelector('.popup_opened') 
    if (popupOpened) { 
        closePopup(popupOpened); 
        } 
    } 
}