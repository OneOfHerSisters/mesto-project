import {closePopup, openPopup} from './utils.js';
const popupPhoto = document.querySelector('.popup_content_photo');
const buttonClosePlacePopup = popupPhoto.querySelector('.popup__close-button');
const placeTemplate = document.querySelector('#place').content; 
const popupPlacePicture = popupPhoto.querySelector('.popup__place-picture');
const popupPlaceTitle = popupPhoto.querySelector('.popup__place-title');

export const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

buttonClosePlacePopup.addEventListener('click', () => {
  closePopup(popupPhoto);
})

export function createPlace(name, link, validationSettings) {
    const place = placeTemplate.querySelector('.place').cloneNode(true);
    const placePicture = place.querySelector('.place__picture');
    placePicture.src = link;
    placePicture.alt = name;
    place.querySelector('.place__title').textContent = name;
    
    const likeButton = place.querySelector('.place__like-button');
    likeButton.addEventListener('click', () => {
        likeButton.classList.toggle('place__like-button_active');
    });

    const deleteButton = place.querySelector('.place__delete-button');
    deleteButton.addEventListener('click', () => {
        place.remove();
    });

    placePicture.addEventListener('click', () => {
      popupPlacePicture.src = link;
      popupPlacePicture.alt = name; 
      popupPlaceTitle.textContent = name;
      openPopup(popupPhoto);
     })

     return(place);
}
