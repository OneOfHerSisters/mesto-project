import {closeActivePopup} from './modal.js'

export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeActivePopup); 
}

export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeActivePopup); 
} 