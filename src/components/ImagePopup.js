export default function ImagePopup(props) {
  return (
    <div className={`popup popup_image ${props.card ? 'popup_opened' : ''}`}>
      <div className="popup__overlay popup__overlay_image"></div>
      <div className="popup__image-window">
        <img className="popup__image" src={props.card ? props.card.link : ''} alt={props.card ? props.card.name : ''} />
        <button className="popup__close-button popup__close-button_image" type="button" onClick={props.onClose}></button>
        <h2 className="popup__title-image">{props.card ? props.card.name : ''}</h2>
      </div>
    </div>
  );
}