import pic_fail from '../images/Pic_fail.svg';
import pic_success from '../images/Pic_success.svg';

export default function InfoTooltip({isOpen, onClose, isCondition}) {
  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
    <div className="popup__overlay"></div>
    <div className="popup__window">
      <button 
        className="popup__close-button" 
        type="button" 
        onClick={onClose}></button>
      <img className='popup__picture' src={isCondition ? pic_success : pic_fail} alt='Изображение состояния регистрации' />
      <h2 className="popup__text">{isCondition ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</h2>
    </div>
  </div>
  );
}