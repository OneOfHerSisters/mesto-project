export const popupPlace = document.querySelector('.popup_content_place');
const popupPhoto = document.querySelector('.popup_content_photo');
const popupAvatar = document.querySelector('.popup_content_avatar');
const formAvatar = popupAvatar.querySelector('.form')
const formPlace = popupPlace.querySelector('.form')
export const popupProfile = document.querySelector('.popup_content_profile');
const formProfile = popupProfile.querySelector('.form')
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
export const profileName = document.querySelector('.profile__name');
export const profileAbout = document.querySelector('.profile__about');
const profilePicture = document.querySelector('.profile__picture')
export const nameInput = formProfile.querySelector('.form__input_content_name');
export const jobInput = formProfile.querySelector('.form__input_content_about');
const namePlaceInput = formPlace.querySelector('.form__input_content_name');
const imageInput = formPlace.querySelector('.form__input_content_about');
const placesArea = document.querySelector('.places');
const popups = document.querySelectorAll('.popup')
const avatarInput = document.querySelector('.form__input_content_avatar')
export const myId = '406c1766e82c89a03ddcef32';
export const settings = {
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
import {renderProfile, submitPlaceForm, submitProfileForm, changeAvatar} from './api.js'

function renderLoading(button, btnText, isLoading) {
    if (isLoading) {
        button.textContent = 'Сохранение...'
    } else {
        button.textContent = btnText;
    }
  }
  
formProfile.addEventListener('submit', (evt) => {
    const button = formProfile.querySelector(settings.submitButtonSelector)
    renderLoading(button, 'Сохранить', true)
    evt.preventDefault();
    submitProfileForm(nameInput, jobInput)
        .then(renderProfile().then((res) => {
            profileName.textContent = res.name;
            profileAbout.textContent = res.about;
            profilePicture.setAttribute('src', res.avatar);
            }))
        .then(closePopup(popupProfile))
        .finally(() => renderLoading(button, 'Сохранить', false))
});

formPlace.addEventListener('submit', (evt) => {
    const button = formPlace.querySelector(settings.submitButtonSelector)
    renderLoading(button, 'Создать', true)
    evt.preventDefault();
    submitPlaceForm(namePlaceInput, imageInput)
    .then((res) => {
        placesArea.prepend(createPlace(res.name, res.link, [], myId, '', settings) ) 
        formPlace.reset();
        closePopup(popupPlace)
    })
    .finally(() => renderLoading(button, 'Создать', false))
}
);

formAvatar.addEventListener('submit', (evt) => {
    const button = formAvatar.querySelector(settings.submitButtonSelector)
    renderLoading(button, 'Сохранить', true)
    evt.preventDefault();
    changeAvatar(avatarInput)
    .then(() => formAvatar.reset())
    .then((res) => {
        renderProfile().then((result) => {
            profileName.textContent = result.name;
            profileAbout.textContent = result.about;
            profilePicture.setAttribute('src', result.avatar);
            });
        
    })
    .then(() => closePopup(popupAvatar))
    .finally(() => renderLoading(button, 'Сохранить', false))
}
);

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

buttonEdit.addEventListener('click', () => {
    openPopup(popupProfile);
    handleOpenProfilePopup();
});

buttonAdd.addEventListener('click', () => {
    openPopup(popupPlace);
    toggleButton(popupPlace, settings);
})

enableValidation(settings); 

renderProfile().then((res) => {
    profileName.textContent = res.name;
    profileAbout.textContent = res.about;
    profilePicture.setAttribute('src', res.avatar);
    })

const editPicture = document.querySelector('.profile__edit-picture');

profilePicture.addEventListener("mouseover", function () {
    editPicture.style.display = "block"
})

profilePicture.addEventListener("mouseout", function () {
    editPicture.style.display = "none"
})

editPicture.addEventListener('click', () => {
    openPopup(popupAvatar);
    toggleButton(popupAvatar, settings);
})