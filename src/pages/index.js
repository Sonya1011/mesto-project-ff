import '../pages/index.css';
import {deleteCard, createCard, likeBtn} from'../components/card.js';
import {openModal, closeModal} from '../components/modal.js';
import {initialCards} from '../scripts/cards.js';

//профиль
const editButton = document.querySelector('.profile__edit-button'); //открытие редактора
const editPopup = document.querySelector('.popup_type_edit'); 
const popupClose = editPopup.querySelector('.popup__close'); 
const formElement = editPopup .querySelector('.popup__form');

//карточки
const ProfileaddBtn = document.querySelector('.profile__add-button'); //плюсик
const popupNewCard = document.querySelector('.popup_type_new-card'); 
const popupCloseCard = popupNewCard.querySelector('.popup__close'); 
const formNewCard = popupNewCard.querySelector('.popup__form');

//куда добавляются карточки
const placesList = document.querySelector('.places__list');

//темплейт
const cardTemplate = document.querySelector("#card-template").content;
const popupTypeImage = document.querySelector('.popup_type_image'); //картинка
const popupImage = popupTypeImage.querySelector('.popup__image'); //картинка
const popupCaption = popupTypeImage.querySelector('.popup__caption'); //текст картинки
const popupCloseImg = popupTypeImage.querySelector('.popup__close'); //текст картинки


//добавляет карточки на страницу 
initialCards.forEach((card) => {
  const addCard = createCard(card, deleteCard, openImageCard, likeBtn);
  placesList.append(addCard);
});

//открытие редоктора
editButton.addEventListener('click', () => {
  openModal(editPopup)
});

//открытие формы добавления карточек
ProfileaddBtn.addEventListener('click', () => {
  openModal(popupNewCard)
});

//закрытие редактора
popupClose.addEventListener('click', () => {
  closeModal(editPopup)
});

//закрытие формы добавления карточек
popupCloseCard.addEventListener('click', () => {
  closeModal(popupNewCard)
});

//закрытие формы добавления карточек
popupCloseCard.addEventListener('click', () => {
  closeModal(popupNewCard)
});

//закрыть картинку 
popupCloseImg.addEventListener('click', () => {
  closeModal(popupTypeImage);
});


//работа с формой редактирования профиля
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');

function handleFormSubmit(evt) {
  evt.preventDefault(); 

  const elementName = nameInput.value;
  const elementJob = jobInput.value;

  const profileTitle = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');

  profileTitle.textContent = elementName;
  profileDescription.textContent = elementJob;

  closeModal(editPopup);
}
formElement.addEventListener('submit', handleFormSubmit); 



//работа с формой добавления карточек
const CardNameInput = formNewCard.querySelector('.popup__input_type_card-name');
const CardUrlInput = formNewCard.querySelector('.popup__input_type_url');

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const newCard = {
    name: CardNameInput.value,
    link: CardUrlInput.value
  };
  
  const addCard = createCard(newCard, deleteCard, openImageCard, likeBtn);
  placesList.prepend(addCard);

  closeModal(popupNewCard);
  formNewCard.reset();
}
formNewCard.addEventListener('submit', handleCardFormSubmit);


function openImageCard (link, name) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
  openModal(popupTypeImage);
}


