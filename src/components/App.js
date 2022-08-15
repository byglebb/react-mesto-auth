import Footer from './Footer';
import Header from './Header';
import ImagePopup from './ImagePopup';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useEffect, useState } from 'react';
import api from '../utils/Api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    api.getUserInfo()
      .then((userDataInfo) => {
        setCurrentUser(userDataInfo);
      })
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
      });

    api.getInitialCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
      });
  }, [])

  function openEditProfilePopup() {
    setIsEditProfilePopupOpen(true);
  }

  function openAddPlacePopup() {
    setIsAddPlacePopupOpen(true);
  }

  function openEditAvatarPopup() {
    setIsEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setIsValid(false);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleValid() {
    setIsValid(true);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.toggleLikeButton(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
      });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(
        setCards((state) => state.filter((c) => c._id !== card._id)))
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
      });
  }

  function handleUpdateUser({ name, about }) {
    api.setUserInfo({ name, about })
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
      });
  }

  function handleUpdateAvatar({ avatar }) {
    api.updateAvatar({ avatar })
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
      });
  }

  function handleAddPlaceSubmit({ name, link }) {
    api.addCard({ name, link })
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          onEditProfile={openEditProfilePopup}
          onAddPlace={openAddPlacePopup}
          onEditAvatar={openEditAvatarPopup}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          cards={cards}
        />
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          valid={isValid} />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          valid={isValid}
          setValid={handleValid} />
        <PopupWithForm
          name="confirmation"
          title="Вы уверены?"
          submitButton="Да"
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          valid={isValid}
          setValid={handleValid} />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
