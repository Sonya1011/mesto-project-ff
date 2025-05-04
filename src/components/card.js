import {initialCards} from '../scripts/cards.js';
import '../components/modal.js';

const content = document.querySelector('.content'); 
const placesList = content.querySelector('.places__list'); 
const cardTemplate = document.querySelector('#card-template').content; 


export function createCard (Card,  handlerdeletecard, openImageCard, likeBtn) { 
  const cardPlaces = cardTemplate.querySelector('.places__item').cloneNode(true);

  const cardImage = cardPlaces.querySelector('.card__image'); 
  const cardTitle = cardPlaces.querySelector('.card__title'); 

  const cardButton = cardPlaces.querySelector('.card__delete-button');
  const likeButton = cardPlaces.querySelector('.card__like-button');

  cardImage.src = Card.link; 
  cardImage.alt = Card.name; 
  cardTitle.textContent = Card.name; 


//нажатие на кнопку удаления карточек
  cardButton.addEventListener('click', () => {
    handlerdeletecard(cardPlaces);
  });

//клик по картинке
  cardImage.addEventListener('click', () => {
    openImageCard(Card.link, Card.name);
  });

//клик по сердцу
  likeButton.addEventListener('click', () => {
    likeBtn(likeButton)
});
  
  return cardPlaces;  
};

//удаление карточки
export function deleteCard(elementCard) {
  if(!elementCard) return;
  elementCard.remove();
};

//поставить лайк
export function likeBtn(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
  };

