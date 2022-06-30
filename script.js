const popupPlace = document.querySelector('.popup_place');
const formPlace = popupPlace.querySelector('.form')
const popupProfile = document.querySelector('.popup_profile');
const formProfile = popupProfile.querySelector('.form')
const closeButtonProfile = popupProfile.querySelector('.popup__close-button');
const closeButtonPlace = popupPlace.querySelector('.popup__close-button');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const nameInput = formProfile.querySelector('.form__input_name');
const jobInput = formProfile.querySelector('.form__input_about');
const namePlaceInput = formPlace.querySelector('.form__input_name');
const imageInput = formPlace.querySelector('.form__input_about');
const placeTemplate = document.querySelector('#place').content; 
const places = document.querySelector('.places');

const initialCards = [
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

function createPlace(name, link) {
    const place = placeTemplate.querySelector('.place').cloneNode(true);
    place.querySelector('.place__picture').src = link;
    place.querySelector('.place__picture').alt = name;
    place.querySelector('.place__title').textContent = name;
    const likeButton = place.querySelector('.place__like-button');
    likeButton.addEventListener('click', () => {
        likeButton.classList.toggle('place__like-button_active');
    });
    const deleteButton = place.querySelector('.place__delete-button');
    deleteButton.addEventListener('click', () => {
        place.remove();
    });
    place.querySelector('.place__picture').addEventListener('click', () => {
        const popup = document.querySelector('.popup_photo');
        popup.querySelector('.popup__place-picture').src = link;
        popup.querySelector('.popup__place-picture').alt = name;
        popup.querySelector('.popup__place-title').textContent = name;
        popup.classList.add('popup_opened');
        const closeButtonPlacePopup = popup.querySelector('.popup__close-button');
        closeButtonPlacePopup.addEventListener('click', () => {
            closePopup(popup);
        })
     })
     return(place);

}

initialCards.forEach(function(elem) {
    places.append(createPlace(elem.name, elem.link)); 
})

nameInput.value = profileName.textContent
jobInput.value = profileAbout.textContent

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

closeButtonProfile.addEventListener('click', () => {
    closePopup(popupProfile)
});

closeButtonPlace.addEventListener('click', () => {
    closePopup(popupPlace)
});

editButton.addEventListener('click', () => {
    openPopup(popupProfile)
});

addButton.addEventListener('click', () => {
    openPopup(popupPlace)
});

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileAbout.textContent = jobInput.value;
    closePopup(popupProfile);
}

function formPlaceSubmitHandler (evt) {
    evt.preventDefault();
    places.prepend(createPlace(namePlaceInput.value, imageInput.value)); 
    closePopup(popupPlace);
}

formProfile.addEventListener('submit', formSubmitHandler);
formPlace.addEventListener('submit', formPlaceSubmitHandler);

