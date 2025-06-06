import {likeCard, unlikeCard} from "../components/api.js"


const cardTemplate = document.querySelector('#card-template').content; 

export function createCard (Card,  handleDeleteButtonClick, openImageCard, cardId) { 
  const cardPlaces = cardTemplate.querySelector('.places__item').cloneNode(true);

  const cardImage = cardPlaces.querySelector('.card__image'); 
  const cardTitle = cardPlaces.querySelector('.card__title'); 

  const cardButton = cardPlaces.querySelector('.card__delete-button');
  const likeButton = cardPlaces.querySelector('.card__like-button'); 
  const likeCounter = cardPlaces.querySelector('.like-counter'); 

  cardImage.src = Card.link; 
  cardImage.alt = Card.name; 
  cardTitle.textContent = Card.name; 
  cardPlaces.dataset.cardId = Card._id;


if (likeCounter) {
  likeCounter.textContent = Card.likes.length;
}

if (Card.likes.some(like => like._id === cardId)) {
  likeButton.classList.add('card__like-button_is-active');
}

//удаление карточки
if (Card.owner && Card.owner._id !== cardId) {
  cardButton.style.display = 'none';
};

//клик по картинке
  cardImage.addEventListener('click', () => {
    openImageCard(Card.link, Card.name);
  });
  
cardButton.addEventListener('click', () => {
  handleDeleteButtonClick(cardPlaces)
});

// Обработка лайка
likeButton.addEventListener('click', () => {
  if (likeButton.classList.contains('card__like-button_is-active')) {
    // Убираем лайк
    unlikeCard(Card._id)
      .then(updatedCard => {
        // Обновляем счетчик
        likeCounter.textContent = updatedCard.likes.length;
        likeButton.classList.remove('card__like-button_is-active');
      })
      .catch(err => console.error(err));
  } else {
    // Добавляем лайк
    likeCard(Card._id)
      .then(updatedCard => {
        likeCounter.textContent = updatedCard.likes.length;
        likeButton.classList.add('card__like-button_is-active');
      })
      .catch(err => console.error(err));
  }
});

  return cardPlaces;  
};

