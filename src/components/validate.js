import {popupPlace} from './index.js'

const showInputError = (formElement, inputElement, errorMessage, validationSettings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationSettings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationSettings.errorClass);
  };
  
const hideInputError = (formElement, inputElement, validationSettings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationSettings.inputErrorClass);
    errorElement.classList.remove(validationSettings.errorClass);
    errorElement.textContent = '';
  };

export function enableValidation(validationSettings){
    const formList = Array.from(document.querySelectorAll(validationSettings.formSelector))
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function(evt) {
        evt.preventDefault();
      })
      setEventListeners(formElement, validationSettings)
    })
}

function setEventListeners(formElement, validationSettings) {
    const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
    const buttonElement = formElement.querySelector(validationSettings.submitButtonSelector);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function (evt) {
        checkInputValidity(formElement, inputElement, validationSettings);
        toggleButtonState(inputList, buttonElement, validationSettings)
      });
    });
  };

function checkInputValidity (formElement, inputElement, validationSettings) {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity("");
    }

    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, validationSettings);
    } else {
      hideInputError(formElement, inputElement, validationSettings);
    }
  };

function hasInvalidInput(inputList) {
    return inputList.some((inputItem) => {
      return !inputItem.validity.valid;
    })
  }

export function hasEmptyInput(inputList) {
    return inputList.some((inputItem) => {
        return inputItem.textContent.length !== 0;
      })
}

export function toggleButtonState(inputList, buttonElement, validationSettings) {
    if (hasInvalidInput(inputList) || hasEmptyInput(inputList)) {
      buttonElement.classList.add(validationSettings.inactiveButtonClass);
      buttonElement.setAttribute('disabled', 'disabled');
    } else {
      buttonElement.classList.remove(validationSettings.inactiveButtonClass)
      buttonElement.removeAttribute('disabled', 'disabled');
    }
  }

export function toggleButton(popup, validationSettings) {
    const inputList = Array.from(popup.querySelectorAll(validationSettings.inputSelector));
    const buttonElement = popup.querySelector(validationSettings.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, validationSettings)
}
