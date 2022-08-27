import {closePopup} from './utils.js';
import {profileName, profileAbout, nameInput, jobInput} from './index.js';

export function closeActivePopup(evt) {
    if (evt.key === 'Escape') {
     const popupOpened = document.querySelector('.popup_opened') 
    if (popupOpened) { 
        closePopup(popupOpened); 
        } 
    } 
}

export function handleOpenProfilePopup() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileAbout.textContent;
}
