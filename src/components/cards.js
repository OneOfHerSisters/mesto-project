import {closePopup, openPopup} from './utils.js';
import {settings, myId} from './index.js'
import {deleteLike, addLike, deletePlace, getCards} from './api.js';

const popupPhoto = document.querySelector('.popup_content_photo');
const buttonClosePlacePopup = popupPhoto.querySelector('.popup__close-button');
const placeTemplate = document.querySelector('#place').content; 
const popupPlacePicture = popupPhoto.querySelector('.popup__place-picture');
const popupPlaceTitle = popupPhoto.querySelector('.popup__place-title');
const placesArea = document.querySelector('.places');

buttonClosePlacePopup.addEventListener('click', () => {
  closePopup(popupPhoto);
})

export function createPlace(name, link, likes, ownerId, elemId, validationSettings) {
    const place = placeTemplate.querySelector('.place').cloneNode(true);
    const placePicture = place.querySelector('.place__picture');
    const likesNumber = place.querySelector('.place__likes');
    placePicture.src = link;
    placePicture.alt = name;
    place.querySelector('.place__title').textContent = name;
    likesNumber.textContent = likes.length;
  
    const likeButton = place.querySelector('.place__like-button');
    if (likes) {
      let isMyLike = likes.some(like => {
        return like._id == myId
      })
      if (isMyLike) {
        likeButton.classList.add('place__like-button_active');
      } 
    }

    likeButton.addEventListener('click', () => {
        if (likeButton.classList.contains('place__like-button_active')) {
          deleteLike(elemId).then((res) => {likesNumber.textContent = res.likes.length}).then(likeButton.classList.remove('place__like-button_active'));
        } else {
          addLike(elemId).then((res) => {likesNumber.textContent = res.likes.length}).then(likeButton.classList.add('place__like-button_active'))
        }
    });

    const deleteButton = place.querySelector('.place__delete-button');

    if (myId != ownerId) {
      deleteButton.classList.add('place__delete-button_disabled')
    } else {
      deleteButton.addEventListener('click', () => {
        deletePlace(elemId)
        place.remove();
    });
    }
    placePicture.addEventListener('click', () => {
      popupPlacePicture.src = link;
      popupPlacePicture.alt = name; 
      popupPlaceTitle.textContent = name;
      openPopup(popupPhoto);
     })

     return(place);
}

getCards().then((res) => {
  res.forEach(function(elem) {
  placesArea.append(createPlace(elem.name, elem.link, elem.likes, elem.owner._id, elem._id, settings)); 
  })
});