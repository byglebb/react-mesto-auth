import { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import PopupWithForm from "./PopupWithForm";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isValidName, setIsValidName] = useState(true);
  const [isValidDescription, setIsValidDescription] = useState(true);
  const [validTextName, setValidTextName] = useState('');
  const [validTextDescription, setValidTextDescription] = useState('');

  function handleChangeName(evt) {
    setName(evt.target.value);
    setIsValidName(evt.target.validity.valid);
    setValidTextName(evt.target.validationMessage);
  }

  function handleChangeDescription(evt) {
    setDescription(evt.target.value);
    setIsValidDescription(evt.target.validity.valid);
    setValidTextDescription(evt.target.validationMessage);
  }

  function validityForm() {
    return isValidName && isValidDescription;
  }

  const inputNameClassName = isValidName ? "popup__input popup__input_data_name" : "popup__input popup__input_data_name popup__input_type_error";
  const inputDescriptionClassName = isValidDescription ? "popup__input popup__input_data_activity" : "popup__input popup__input_data_activity popup__input_type_error";


  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      submitButton="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={validityForm()}>
      <input
        type="text"
        value={name || ''}
        onChange={handleChangeName}
        className={inputNameClassName}
        name="name"
        id="name-input"
        minLength="2"
        maxLength="40"
        placeholder="Ваше имя"
        required />
      <span className="popup__input-error name-input-error">{validTextName}</span>
      <input
        type="text"
        value={description || ''}
        onChange={handleChangeDescription}
        className={inputDescriptionClassName}
        name="about"
        id="activity-input"
        minLength="2"
        maxLength="200"
        placeholder="Ваша профессия"
        required />
      <span className="popup__input-error activity-input-error">{validTextDescription}</span>
    </PopupWithForm>
  );
}