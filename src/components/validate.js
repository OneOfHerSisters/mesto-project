const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('form__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('form__input-error_active');
  };
  
const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('form__input_type_error');
    errorElement.classList.remove('form__input-error_active');
    errorElement.textContent = '';
  };

export function enableValidation(){
    const formList = Array.from(document.querySelectorAll('.form'))
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function(evt) {
        evt.preventDefault();
      })
      setEventListeners(formElement)
    })
}

function setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll('.form__input'));
    const buttonElement = formElement.querySelector('.form__button')
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function (evt) {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement)
      });
    });
  };

function checkInputValidity (formElement, inputElement) {
    if (inputElement.validity.valueMissing) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessageValueMissing);
    } else if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity("");
    }

    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  };

function hasInvalidInput(inputList) {
    return inputList.some((inputItem) => {
      return !inputItem.validity.valid;
    })
  }
  
function toggleButtonState(inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {3
      buttonElement.classList.add('form__button_inactive')
    } else {
      buttonElement.classList.remove('form__button_inactive')
    }
  }