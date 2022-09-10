export function closeActivePopup(evt) {
    if (evt.key === 'Escape') {
     const popupOpened = document.querySelector('.popup_opened') 
    if (popupOpened) { 
        closePopup(popupOpened); 
        } 
    } 
}

export function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeActivePopup); 
  }
  
  export function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeActivePopup); 
  }