import {likeCard, unlikeCard} from "../components/api.js"


const cardTemplate = document.querySelector('#card-template').content; 

export function createCard (card,  handleDeleteButtonClick, openImageCard, cardId) { 
  const cardPlaces = cardTemplate.querySelector('.places__item').cloneNode(true);

  const cardImage = cardPlaces.querySelector('.card__image'); 
  const cardTitle = cardPlaces.querySelector('.card__title'); 

  const cardButton = cardPlaces.querySelector('.card__delete-button');
  const likeButton = cardPlaces.querySelector('.card__like-button'); 
  const likeCounter = cardPlaces.querySelector('.like-counter'); 

  cardImage.src = card.link; 
  cardImage.alt = card.name; 
  cardTitle.textContent = card.name; 
  cardPlaces.dataset.cardId = card._id;


if (likeCounter) {
  likeCounter.textContent = card.likes.length;
}

if (card.likes.some(like => like._id === cardId)) {
  likeButton.classList.add('card__like-button_is-active');
}

//удаление карточки
if (card.owner && card.owner._id !== cardId) {
  cardButton.style.display = 'none';
};

//клик по картинке
  cardImage.addEventListener('click', () => {
    openImageCard(card.link, card.name);
  });
  
cardButton.addEventListener('click', () => {
  handleDeleteButtonClick(cardPlaces)
});

// Обработка лайка
likeButton.addEventListener('click', () => {
  if (likeButton.classList.contains('card__like-button_is-active')) {
    // Убираем лайк
    unlikeCard(card._id)
      .then(updatedCard => {
        // Обновляем счетчик
        likeCounter.textContent = updatedCard.likes.length;
        likeButton.classList.remove('card__like-button_is-active');
      })
      .catch(err => console.error(err));
  } else {
    // Добавляем лайк
    likeCard(card._id)
      .then(updatedCard => {
        likeCounter.textContent = updatedCard.likes.length;
        likeButton.classList.add('card__like-button_is-active');
      })
      .catch(err => console.error(err));
  }
});

  return cardPlaces;  
};

