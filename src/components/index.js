const popupPlace = document.querySelector('.popup_content_place');
export const popupPhoto = document.querySelector('.popup_content_photo');
const formPlace = popupPlace.querySelector('.form')
export const popupProfile = document.querySelector('.popup_content_profile');
const formProfile = popupProfile.querySelector('.form')
const buttonCloseProfile = popupProfile.querySelector('.popup__close-button');
const buttonClosePlace = popupPlace.querySelector('.popup__close-button');
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
export const profileName = document.querySelector('.profile__name');
export const profileAbout = document.querySelector('.profile__about');
export const nameInput = formProfile.querySelector('.form__input_content_name');
export const jobInput = formProfile.querySelector('.form__input_content_about');
const namePlaceInput = formPlace.querySelector('.form__input_content_name');
const imageInput = formPlace.querySelector('.form__input_content_about');
const placesArea = document.querySelector('.places');


import '../styles/index.css';
import {initialCards, createPlace} from './cards.js';
import {enableValidation} from './validate.js';
import {handleOverlayClick, handleEscKeydown} from './modal.js';
import {closePopup, openPopup} from './utils.js';

function submitProfileForm (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileAbout.textContent = jobInput.value;
    closePopup(popupProfile);
}

function submitPlaceForm (evt) {
    evt.preventDefault();
    placesArea.prepend(createPlace(namePlaceInput.value, imageInput.value)); 
    formPlace.reset();
    closePopup(popupPlace);
}

formProfile.addEventListener('submit', submitProfileForm);
formPlace.addEventListener('submit', submitPlaceForm);
popupPlace.addEventListener("click", handleOverlayClick);
popupProfile.addEventListener("click", handleOverlayClick);

document.addEventListener("keydown", function(evt) {
    if (evt.keyCode == 27) {
        handleEscKeydown(evt)
    }
});

initialCards.forEach(function(elem) {
    placesArea.append(createPlace(elem.name, elem.link)); 
})

buttonCloseProfile.addEventListener('click', () => {
    closePopup(popupProfile)
});

buttonClosePlace.addEventListener('click', () => {
    closePopup(popupPlace)
});

buttonEdit.addEventListener('click', () => {
    openPopup(popupProfile)
});

buttonAdd.addEventListener('click', () => {
    openPopup(popupPlace)
});

enableValidation({
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__button',
    inactiveButtonClass: 'form__button_disabled',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__error_visible'
  }); 

