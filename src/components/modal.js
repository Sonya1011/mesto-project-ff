export const openModal = (Popup) => {
  Popup.classList.add('popup_is-animated');
  Popup.classList.add('popup_is-opened');

  document.addEventListener('keydown', keydownEscape);
  document.addEventListener('click', clickOverlay);
};

export const closeModal = (Popup) => {
  Popup.classList.remove('popup_is-opened');
};

//закрытие esc
export function keydownEscape (evt){
  const key = evt.key;
  if(key === "Escape"){
      closeModal(document.querySelector('.popup_is-opened'));
  }
}

//закрытие оверлей
export function clickOverlay (evt){
  closeModal(evt.target);
}
