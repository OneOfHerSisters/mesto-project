export const popupPlace = document.querySelector('.popup_content_place');
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
const profileSubmitButton = formProfile.querySelector('.form__button')
const placeSubmitButton = formPlace.querySelector('.form__button')
const avatarSubmitButton = formAvatar.querySelector('.form__button')
const avatarInput = document.querySelector('.form__input_content_avatar')
export var myId;
export const settings = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__button',
    inactiveButtonClass: 'form__button_inactive',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active'
  }

  
import '../styles/index.css';
import {createPlace} from './cards.js';
import {enableValidation} from './validate.js';
import {closePopup, openPopup, buttonClosePlacePopup, popupPhoto, renderLoading} from './utils.js';
import {toggleButton} from './validate.js'
import {renderProfile, submitPlaceForm, submitProfileForm, changeAvatar, getCards} from './api.js'
import { handleDeleteLike, handleAddLike, handleDeleteCard} from './api.js';
  
formProfile.addEventListener('submit', (evt) => {
    renderLoading(profileSubmitButton, 'Сохранить', true)
    evt.preventDefault();
    submitProfileForm(nameInput, jobInput)
        .then((res) => {
            profileName.textContent = res.name;
            profileAbout.textContent = res.about;
            profilePicture.setAttribute('src', res.avatar);
            closePopup(popupProfile)
            })
        .catch((err) =>{
                console.log(err);
            })  
        .finally(() => renderLoading(profileSubmitButton, 'Сохранить', false))
});

formPlace.addEventListener('submit', (evt) => {
    renderLoading(placeSubmitButton, 'Создать', true)
    evt.preventDefault();
    submitPlaceForm(namePlaceInput, imageInput)
    .then((res) => {
        placesArea.prepend(createPlace(res.name, res.link, [], myId, res._id, handleDeleteLike, handleAddLike, handleDeleteCard)) 
        formPlace.reset();
        closePopup(popupPlace)
    })
    .catch((err) =>{
        console.log(err);
    })  
    .finally(() => renderLoading(placeSubmitButton, 'Создать', false))
}
);

formAvatar.addEventListener('submit', (evt) => {
    renderLoading(avatarSubmitButton, 'Сохранить', true)
    evt.preventDefault();
    changeAvatar(avatarInput)
    .then((res) => {
            formAvatar.reset()
            profileName.textContent = res.name;
            profileAbout.textContent = res.about;
            profilePicture.setAttribute('src', res.avatar);
            closePopup(popupAvatar)
            })
    .catch((err) =>{
        console.log(err);
    })  
    .finally(() => renderLoading(avatarSubmitButton, 'Сохранить', false))
        
    })



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

buttonClosePlacePopup.addEventListener('click', () => {
  closePopup(popupPhoto);
})

enableValidation(settings); 

Promise.all([renderProfile(), getCards()])
    .then((res) => {
        myId = res[0]._id
        profileName.textContent = res[0].name;
        profileAbout.textContent = res[0].about;
        profilePicture.setAttribute('src', res[0].avatar);
        res[1].forEach(function(elem) {
            placesArea.append(createPlace(elem.name, elem.link, elem.likes, elem.owner._id, elem._id, handleDeleteLike, handleAddLike, handleDeleteCard)); 
            })
    })
    .catch((err) =>{
        console.log(err);
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

function handleOpenProfilePopup() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileAbout.textContent;
}
