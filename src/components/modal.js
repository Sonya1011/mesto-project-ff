export const openModal = (popup) => {
  popup.classList.add('popup_is-animated');
  popup.classList.add('popup_is-opened');

  document.addEventListener('keydown', keydownEscape);
  //document.addEventListener('click', clickOverlay);
  popup.addEventListener('click', clickOverlay);
};

export const closeModal = (popup) => {
  popup.classList.remove('popup_is-opened');

  document.removeEventListener('keydown', keydownEscape);
  document.removeEventListener('click', clickOverlay);
};

//закрытие esc
export function keydownEscape (evt){
  const key = evt.key;
  if(key === "Escape"){
      closeModal(document.querySelector('.popup_is-opened'));
  }
};

//закрытие оверлей
/*export function clickOverlay(evt) {
  if(evt.target.classList.contains('.popup__close') ||
  evt.target.classList.contains('.popup')) {
      const openedPopup = document.querySelector('.popup_is-opened');
      closeModal(openedPopup);
  }
};*/

export function clickOverlay(evt) {
  if (evt.target === evt.currentTarget) {
      closeModal(evt.currentTarget);
  }
}