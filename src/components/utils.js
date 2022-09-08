export const popupPhoto = document.querySelector('.popup_content_photo');
export const buttonClosePlacePopup = popupPhoto.querySelector('.popup__close-button');
export const placeTemplate = document.querySelector('#place').content; 
export const popupPlacePicture = popupPhoto.querySelector('.popup__place-picture');
export const popupPlaceTitle = popupPhoto.querySelector('.popup__place-title');
export const placesArea = document.querySelector('.places');

import {closeActivePopup} from './modal.js'

export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeActivePopup); 
}

export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeActivePopup); 
}

export function renderLoading(button, btnText, isLoading) {
  if (isLoading) {
      button.textContent = 'Сохранение...'
  } else {
      button.textContent = btnText;
  }
}

export const getResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(res);
}