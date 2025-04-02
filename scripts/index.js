// @todo: Темплейт карточки
const content = document.querySelector('.content'); 
const placesList = content.querySelector('.places__list'); 
const cardTemplate = document.querySelector('#card-template').content; 


function createCard (name, link, handlerdeletecard) { 
  const cardPlaces = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardPlaces.querySelector('.card__image'); 
  const cardTitle = cardPlaces.querySelector('.card__title'); 
  const cardButton = cardPlaces.querySelector('.card__delete-button');

  cardImage.src = link; 
  cardImage.alt = name; 
  cardTitle.textContent = name; 

  cardButton.addEventListener('click', () => {
    handlerdeletecard(cardPlaces);
  });

  return cardPlaces;  
};

function deleteCard(elementCard) {
  if(!elementCard) return;
  elementCard.remove();
}


for (let i = 0; i < initialCards.length; i++) { 
  placesList.append(createCard(initialCards[i].name, initialCards[i].link, deleteCard)) 
};



// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу