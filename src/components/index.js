import '../styles/index.css';
import {createPlace, changeLikeStatus} from './cards.js';
import {enableValidation} from './validate.js';
import {popupPhoto, renderLoading, popupAvatar, formAvatar, avatarSubmitButton, buttonEdit,buttonAdd, profilePicture, placesArea, popups, avatarInput, popupProfile, formProfile, profileSubmitButton, buttonClosePlacePopup, formPlace, placeSubmitButton, namePlaceInput, imageInput, profileName, profileAbout, nameInput, jobInput, popupPlace, settings} from './utils.js';
import {toggleButton} from './validate.js'
import {renderProfile, submitPlaceForm, submitProfileForm, changeAvatar, getCards, deleteLike, addLike, deletePlace} from './api.js'
import {closePopup, openPopup} from './modal.js';

export let myId;

function handleDeleteLike(elemId, likesNumber, likeButton) {
    deleteLike(elemId)
        .then((res) => {changeLikeStatus(res,likesNumber, likeButton, true)})
        .catch((err) =>{console.log(err);});
}

function handleAddLike(elemId, likesNumber, likeButton) {
    addLike(elemId)
        .then((res) => {changeLikeStatus(res, likesNumber, likeButton, false)})
        .catch((err) =>{console.log(err);});
}

function handleDeleteCard(elemId, place) {
    deletePlace(elemId)
        .then(() => place.remove())
        .catch((err) =>{
            console.log(err)
        });
}
  
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
