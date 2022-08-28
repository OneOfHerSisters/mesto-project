export const popupPlace = document.querySelector('.popup_content_place');
const popupPhoto = document.querySelector('.popup_content_photo');
const formPlace = popupPlace.querySelector('.form')
export const popupProfile = document.querySelector('.popup_content_profile');
const formProfile = popupProfile.querySelector('.form')
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
export const profileName = document.querySelector('.profile__name');
export const profileAbout = document.querySelector('.profile__about');
export const nameInput = formProfile.querySelector('.form__input_content_name');
export const jobInput = formProfile.querySelector('.form__input_content_about');
const namePlaceInput = formPlace.querySelector('.form__input_content_name');
const imageInput = formPlace.querySelector('.form__input_content_about');
const placesArea = document.querySelector('.places');
const popups = document.querySelectorAll('.popup')
const settings = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__button',
    inactiveButtonClass: 'form__button_inactive',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active'
  }

import '../styles/index.css';
import {initialCards, createPlace} from './cards.js';
import {enableValidation} from './validate.js';
import {closePopup, openPopup} from './utils.js';
import {handleOpenProfilePopup} from './modal.js'
import {toggleButton} from './validate.js'


function submitProfileForm (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileAbout.textContent = jobInput.value;
    closePopup(popupProfile);
}

function submitPlaceForm (evt) {
    evt.preventDefault();
    placesArea.prepend(createPlace(namePlaceInput.value, imageInput.value, settings)); 
    formPlace.reset();
    closePopup(popupPlace);
}

formProfile.addEventListener('submit', submitProfileForm);
formPlace.addEventListener('submit', submitPlaceForm);

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__close-button')) {
          closePopup(popup)
        }
    })
})

initialCards.forEach(function(elem) {
    placesArea.append(createPlace(elem.name, elem.link, settings)); 
})

buttonEdit.addEventListener('click', () => {
    openPopup(popupProfile);
    handleOpenProfilePopup();
});

buttonAdd.addEventListener('click', () => {
    openPopup(popupPlace);
    toggleButton(popupPlace, settings);
})

enableValidation(settings); 

