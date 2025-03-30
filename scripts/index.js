// @todo: Темплейт карточки
const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');

function createCard (name, link, deleteCard) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardPlaces = cardTemplate.querySelector('.places__item').cloneNode(true); 
  const cardImage = cardPlaces.querySelector('.card__image');
  const cardDeleteButton = cardPlaces.querySelector('.card__delete-button');
  const cardTitle = cardPlaces.querySelector('.card__title');

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;

  cardDeleteButton.addEventListener('click', function() {
    const deleteCard = cardDeleteButton.closest('.places__item');
    deleteCard.remove();
});

  return cardPlaces;
}

for (let i = 0; i < initialCards.length; i++) {
  placesList.append(createCard(initialCards[i].name, initialCards[i].link, initialCards.deleteCard))
};

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу