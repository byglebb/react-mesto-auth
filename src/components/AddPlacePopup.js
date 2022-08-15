import PopupWithForm from "./PopupWithForm";
import { useState, useEffect } from "react";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace, valid, setValid }) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [isValidName, setIsValidName] = useState(true);
  const [isValidLink, setIsValidLink] = useState(true);
  const [validTextName, setValidTextName] = useState('');
  const [validTextLink, setValidTextLink] = useState('');

  function handleChangeName(evt) {
    setName(evt.target.value);
    setIsValidName(evt.target.validity.valid);
    setValidTextName(evt.target.validationMessage);
  }

  function handleChangeLink(evt) {
    setLink(evt.target.value);
    setIsValidLink(evt.target.validity.valid);
    setValidTextLink(evt.target.validationMessage);
    setValid();
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({ name, link });
  }

  function validityForm() {
    return valid && isValidName && isValidLink;
  }

  const inputPlaceClassName = isValidName ? "popup__input popup__input_data_place" : "popup__input popup__input_data_place popup__input_type_error";
  const inputLinkClassName = isValidLink ? "popup__input popup__input_data_link" : "popup__input popup__input_data_link popup__input_type_error";

  useEffect(() => {
    setName('');
    setLink('');
    setIsValidName(true);
    setIsValidLink(true);
    setValidTextName('');
    setValidTextLink('');
  }, [isOpen]);

  return (
    <PopupWithForm
      name="addcard"
      title="Новое место"
      submitButton="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={validityForm()}>
      <input
        type="text"
        className={inputPlaceClassName}
        name="name"
        id="place-input"
        minLength="2"
        maxLength="30"
        placeholder="Название"
        value={name || ''}
        onChange={handleChangeName}
        required />
      <span className="popup__input-error place-input-error">{validTextName}</span>
      <input
        type="url"
        className={inputLinkClassName}
        name="link"
        id="link-input"
        placeholder="Ссылка на картинку"
        value={link || ''}
        onChange={handleChangeLink}
        required />
      <span className="popup__input-error link-input-error">{validTextLink}</span>
    </PopupWithForm>
  );
}