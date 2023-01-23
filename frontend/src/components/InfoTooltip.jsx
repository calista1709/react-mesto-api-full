function InfoTooltip({ success, isOpened, onClose }) {

  function handleClose() {
    onClose(success);
  }

  return (
    <div className={`popup popup_type_tooltip ${isOpened ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        {success ?
          <p className="popup__tooltip-status popup__tooltip-status_success">Вы успешно зарегистрировались!</p> :
          <p className="popup__tooltip-status popup__tooltip-status_fail">Что-то пошло не так! Попробуйте ещё раз.</p>
        }
        <button type="button" className="popup__close" aria-label="Закрыть" onClick={handleClose}></button>
      </div>
    </div>
  );
}

export default InfoTooltip;
