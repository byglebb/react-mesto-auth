import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  function handleImageClick() {
    onCardClick(card);
  }
  function handleLikeClick() {
    onCardLike(card);
  }
  function handleDeleteClick() {
    onCardDelete(card);
  }

  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `element__delete-button ${isOwn ? '' : 'element__delete-button_inactive'}`;

  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = `element__like ${isLiked ? 'element__like_active' : ''}`;

  return (
    <article className="element" key={card._id}>
      <button className={cardDeleteButtonClassName} onClick={handleDeleteClick} type="button"></button>
      <img
        className="element__image"
        src={card.link}
        alt={card.name}
        onClick={handleImageClick} />
      <div className="element__description">
        <h2 className="element__place">{card.name}</h2>
        <div className="element__like-container">
          <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button"></button>
          <p className="element__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}