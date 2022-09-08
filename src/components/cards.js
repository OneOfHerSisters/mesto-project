import {openPopup, popupPhoto, placeTemplate, popupPlacePicture, popupPlaceTitle, placesArea} from './utils.js';
import {myId} from './index.js'

export function createPlace(name, link, likes, ownerId, elemId, handleDeleteLike, handleAddLike, handleDeleteCard) {
    const place = placeTemplate.querySelector('.place').cloneNode(true);
    const placePicture = place.querySelector('.place__picture');
    const likesNumber = place.querySelector('.place__likes');
    placePicture.src = link;
    placePicture.alt = name;
    place.querySelector('.place__title').textContent = name;
    likesNumber.textContent = likes.length;
  
    const likeButton = place.querySelector('.place__like-button');
    if (likes) {
      const isMyLike = likes.some(like => {
        return like._id == myId
      })
      if (isMyLike) {
        likeButton.classList.add('place__like-button_active');
      } 
    }

    likeButton.addEventListener('click', () => {
        if (likeButton.classList.contains('place__like-button_active')) {
          handleDeleteLike(elemId, likesNumber)
          likeButton.classList.remove('place__like-button_active');
        } else {
          handleAddLike(elemId, likesNumber)
          likeButton.classList.add('place__like-button_active');
        }
    });

    const deleteButton = place.querySelector('.place__delete-button');

    if (myId != ownerId) {
      deleteButton.classList.add('place__delete-button_disabled')
    } else {
      deleteButton.addEventListener('click', () => {
        handleDeleteCard(elemId, place)
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
