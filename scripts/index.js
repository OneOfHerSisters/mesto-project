const popupPlace = document.querySelector('.popup_content_place');
const popupPhoto = document.querySelector('.popup_content_photo');
const formPlace = popupPlace.querySelector('.form')
const popupProfile = document.querySelector('.popup_content_profile');
const formProfile = popupProfile.querySelector('.form')
const buttonCloseProfile = popupProfile.querySelector('.popup__close-button');
const buttonClosePlace = popupPlace.querySelector('.popup__close-button');
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const nameInput = formProfile.querySelector('.form__input_content_name');
const jobInput = formProfile.querySelector('.form__input_content_about');
const namePlaceInput = formPlace.querySelector('.form__input_content_name');
const imageInput = formPlace.querySelector('.form__input_content_about');
const placeTemplate = document.querySelector('#place').content; 
const placesArea = document.querySelector('.places');


function createPlace(name, link) {
    const place = placeTemplate.querySelector('.place').cloneNode(true);
    const placePicture = place.querySelector('.place__picture')
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

initialCards.forEach(function(elem) {
    placesArea.append(createPlace(elem.name, elem.link)); 
})

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

function openPopup(popup) {
    popup.classList.add('popup_opened');

    if (popup === popupProfile) {
      nameInput.value = profileName.textContent;
      jobInput.value = profileAbout.textContent;
    }
}

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

