import '../pages/index.css';
import {createCard} from'../components/card.js';
import {openModal, closeModal} from '../components/modal.js';
//import {initialCards} from '../scripts/cards.js';
import {enableValidation, clearValidation } from '../components/validation.js';
import {NewUserInfo, getUserInfo, getInitialCards, addCard, likeCard, unlikeCard, deleteCardApi, updateAvatar} from '../components/api.js';

let currentUser = {};
let cardDelete = {};

//профиль
const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit'); 
const popupCloseProfile = editPopup.querySelector('.popup__close'); 
const formElementProfile = editPopup.querySelector('.popup__form');

//аватар
const avatarPopup = document.querySelector('.popup_type_new_avatar');
const imgAvatar = document.querySelector('.profile__image');
const buttonCloseAvatar = avatarPopup.querySelector('.popup__close');
const formAvatarProfile = avatarPopup.querySelector('.popup__form');
const avatarUrlInput = formAvatarProfile.elements.avatar;

//Формы
const editForm = document.forms['edit-profile'];
const addCardFrom = document.forms['new-place'];

//карточки
const profileaddBtn = document.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_type_new-card'); 
const popupCloseCard = popupNewCard.querySelector('.popup__close'); 

//удаление карточки
const deletePopup = document.querySelector('.popup_type_delete');
const deleteForm = deletePopup.querySelector('.popup__form');
const yesbtn = deletePopup.querySelector('.popup__button');

//куда добавляются карточки
const placesList = document.querySelector('.places__list');

//темплейт
const cardTemplate = document.querySelector("#card-template").content;
const popupTypeImage = document.querySelector('.popup_type_image'); 
const popupImage = popupTypeImage.querySelector('.popup__image'); 
const popupCaption = popupTypeImage.querySelector('.popup__caption'); 
const popupCloseImg = popupTypeImage.querySelector('.popup__close'); 

// Загрузка данных при загрузке страницы
Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cards]) => {
    currentUser = userData;
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    imgAvatar.style.backgroundImage = `url(${userData.avatar})`;
    cards.forEach(card => {
      const cardElement = createCard(card, handleDeleteButtonClick, openImageCard, currentUser._id);
      placesList.append(cardElement);
    });
  })
  .catch(err => {
    console.error(err);
  });

//открытие редоктора
editButton.addEventListener('click', () => {
  nameInput.value = currentUser.name;
  jobInput.value = currentUser.about;
  clearValidation(editPopup, validationConfig);
  openModal(editPopup);
});

//Изменение текста кнопки во время загрузки
function buttonLoading (isLoading, formElement) {
  const button = formElement.querySelector('.popup__button');
  button.textContent = isLoading ? 'Сохранение...' : 'Сохранить';
};

//изменение текста кнопки во время загрузки удаления
function buttondeleteLoading(isLoading, formElement) {
  const buttonDelete = formElement.querySelector('.popup__button');
  if (buttonDelete) {
    buttonDelete.textContent = isLoading ? 'Удаление...' : 'Да'; 
  } else {
    console.error('Кнопка с классом .popup__button не найдена внутри формы');
  }
};

//Открытие формы обновления аватара.
imgAvatar.addEventListener('click', () => {
  avatarUrlInput.value = currentUser.avatar;
  formAvatarProfile.reset();
  openModal(avatarPopup);
});

//Закрытие формы обновления аватара.
buttonCloseAvatar.addEventListener('click', () => {
  closeModal(avatarPopup);
  formAvatarProfile.reset();
});

//открытие формы добавления карточек
profileaddBtn.addEventListener('click', () => {
  clearValidation(addCardFrom);
  openModal(popupNewCard);
  addCardFrom.reset();
});

//закрытие редактора
popupCloseProfile.addEventListener('click', () => {
  closeModal(editPopup);
});

//закрытие формы добавления карточек
popupCloseCard.addEventListener('click', () => {
  closeModal(popupNewCard);
});

//закрыть картинку 
popupCloseImg.addEventListener('click', () => {
  closeModal(popupTypeImage);
});


// Обработчик отправки формы обновления аватара.
function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  buttonLoading(true, formAvatarProfile);
  updateAvatar(avatarUrlInput.value)
    .then((user) => {
      currentUser.avatar = user.avatar;
      imgAvatar.style.backgroundImage = `url(${user.avatar})`;
      formAvatarProfile.reset();
      clearValidation(formAvatarProfile, validationConfig);
      closeModal(avatarPopup);
    })
  .catch(function (err) {
    console.error(err);
  })
  .finally(() => {
    buttonLoading(false, formAvatarProfile);
  });
};
formAvatarProfile.addEventListener('submit', handleAvatarFormSubmit); 

//работа с формой редактирования профиля
const nameInput = formElementProfile.querySelector('#name-input');
const jobInput = formElementProfile.querySelector('#description-input');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  buttonLoading(true, editForm);

  NewUserInfo(nameInput.value, jobInput.value)
    .then((userData) => {
      currentUser = userData;
      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;
      closeModal(editPopup);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      buttonLoading(false, editForm);
    });
};
formElementProfile.addEventListener('submit', handleProfileFormSubmit); 

//работа с формой добавления карточек
const CardNameInput = addCardFrom.querySelector('.popup__input_type_card-name');
const CardUrlInput = addCardFrom.querySelector('.popup__input_type_url');

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  buttonLoading(true, addCardFrom);

  const newCard = {
    name: CardNameInput.value.trim(),
    link: CardUrlInput.value.trim()
  };

  console.log('Отправляемая карточка:', newCard);

  addCard(newCard)
    .then((Card) => {
      const cardElement = createCard(Card, handleDeleteButtonClick, openImageCard, currentUser._id);
      placesList.prepend(cardElement);

      addCardFrom.reset();
      clearValidation(addCardFrom, validationConfig);
      closeModal(popupNewCard);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      buttonLoading(false, addCardFrom);
    });
};
addCardFrom.addEventListener('submit', handleCardFormSubmit);

// Обработчик клика по кнопке удаления карточки
export function handleDeleteButtonClick(cardElement) {
  const cardId = cardElement.dataset.cardId;
  cardDelete.element = cardElement;
  cardDelete.id = cardId;
  openModal(deletePopup);
};

//удаляем карточку
function handleDeleteForm(evt) {
  evt.preventDefault();

  buttondeleteLoading(true, deleteForm);

  deleteCardApi(cardDelete.id)
    .then(() => {
      // Удаляем из DOM
      if (cardDelete.element) {
        cardDelete.element.remove();
      }
      closeModal(deletePopup);
      cardDelete = {}; // очистка
    })
    .catch((err) => {
      console.error('Ошибка удаления карточки:', err);
    })
    .finally(() => {
      buttondeleteLoading(false, deleteForm);
      closeModal(deletePopup);
    });
};
deleteForm.addEventListener('submit', handleDeleteForm);


function openImageCard (link, name) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
  openModal(popupTypeImage);
};

//конфигурация валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

//включение валидации
enableValidation(validationConfig); 