import PopupWithForm from "./PopupWithForm";
import { useRef, useEffect, useState } from "react";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, valid, setValid }) {
  const avatarRef = useRef();

  const [isValidLink, setIsValidLink] = useState(true);
  const [validTextLink, setValidTextLink] = useState('');

  function handleChangeLink(evt) {
    setIsValidLink(evt.target.validity.valid);
    setValidTextLink(evt.target.validationMessage);
    setValid();
  }

  function validityForm() {
    return valid && isValidLink;
  }

  const inputLinkClassName = isValidLink ? "popup__input popup__input_data_avatar" : "popup__input popup__input_data_avatar popup__input_type_error";

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  useEffect(() => {
    avatarRef.current.value = "";
    setIsValidLink(true);
    setValidTextLink('');
  }, [isOpen]);

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      submitButton="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={validityForm()} >
      <input
        type="url"
        className={inputLinkClassName}
        name="avatar"
        id="avatar-input"
        placeholder="Ссылка на аватар"
        ref={avatarRef}
        onChange={handleChangeLink}
        required />
      <span className="popup__input-error avatar-input-error">{validTextLink}</span>
    </PopupWithForm>
  );
}