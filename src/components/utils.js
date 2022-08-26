import {popupProfile} from './index.js'
import {profileName, profileAbout, nameInput, jobInput} from './index.js';

export function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

export function openPopup(popup) {
    popup.classList.add('popup_opened');

    if (popup === popupProfile) {
      nameInput.value = profileName.textContent;
      jobInput.value = profileAbout.textContent;
    }
}