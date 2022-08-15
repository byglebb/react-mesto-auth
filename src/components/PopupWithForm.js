export default function PopupWithForm(props) {
  const popupSubmitButtonClassName = !props.isValid ? "popup__submit-button popup__submit-button_disabled" : "popup__submit-button"

  return (
    <div className={`popup popup_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className={`popup__overlay popup__overlay_${props.name}`}></div>
      <div className="popup__window">
        <button 
          className={`popup__close-button popup__close-button_${props.name}`} 
          type="button" 
          onClick={props.onClose}></button>
        <h2 className="popup__title">{props.title}</h2>
        <form 
          className={`popup__form popup__form_${props.name}`} 
          name={`popup-form-${props.name}`}
          onSubmit={props.onSubmit}
          noValidate>
          {props.children}
          <button 
            className={popupSubmitButtonClassName} 
            type="submit"
            disabled={!props.isValid}>{props.submitButton}
          </button>
        </form>
      </div>
    </div>
  );
}