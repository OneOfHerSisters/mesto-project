export const popupPhoto = document.querySelector('.popup_content_photo');
export const placeTemplate = document.querySelector('#place').content; 
export const popupPlacePicture = popupPhoto.querySelector('.popup__place-picture');
export const popupPlaceTitle = popupPhoto.querySelector('.popup__place-title');
export const popupAvatar = document.querySelector('.popup_content_avatar');
export const formAvatar = popupAvatar.querySelector('.form')
export const avatarSubmitButton = formAvatar.querySelector('.form__button')
export const buttonEdit = document.querySelector('.profile__edit-button');
export const buttonAdd = document.querySelector('.profile__add-button');
export const profilePicture = document.querySelector('.profile__picture')
export const placesArea = document.querySelector('.places');
export const popups = document.querySelectorAll('.popup')
export const avatarInput = document.querySelector('.form__input_content_avatar')
export const popupProfile = document.querySelector('.popup_content_profile');
export const formProfile = popupProfile.querySelector('.form')
export const profileSubmitButton = formProfile.querySelector('.form__button')
export const buttonClosePlacePopup = popupPhoto.querySelector('.popup__close-button');
export const popupPlace = document.querySelector('.popup_content_place');
export const formPlace = popupPlace.querySelector('.form')
export const placeSubmitButton = formPlace.querySelector('.form__button')
export const namePlaceInput = formPlace.querySelector('.form__input_content_name');
export const imageInput = formPlace.querySelector('.form__input_content_about');
export const profileName = document.querySelector('.profile__name');
export const profileAbout = document.querySelector('.profile__about');
export const nameInput = formProfile.querySelector('.form__input_content_name');
export const jobInput = formProfile.querySelector('.form__input_content_about');
export const settings = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
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

