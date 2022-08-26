import {popupPhoto} from './index.js'
import {closePopup, openPopup} from './utils.js';

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

  export function createPlace(name, link) {
    const placeTemplate = document.querySelector('#place').content; 
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
      const placePicture = popupPhoto.querySelector('.popup__place-picture');
      placePicture.src = link;
      placePicture.alt = name;
      popupPhoto.querySelector('.popup__place-title').textContent = name;
      openPopup(popupPhoto);
        const buttonClosePlacePopup = popupPhoto.querySelector('.popup__close-button');
        buttonClosePlacePopup.addEventListener('click', () => {
            closePopup(popupPhoto);
        })
     })
     return(place);

}