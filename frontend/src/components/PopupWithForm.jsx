function PopupWithForm({ name, title, onClose, buttonText, isOpened, children, onSubmit }) {
  return (
    <div className={`popup popup_type_${name} ${isOpened ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form action="#" method="post" name={`${name}`} className="popup__form" onSubmit={onSubmit}>
          {children}
          <input type="submit" name="save" className="popup__save popup__button" value={buttonText} />
        </form>
        <button type="button" className="popup__close" aria-label="Закрыть" onClick={onClose}></button>
      </div>
    </div>
  );
}

export default PopupWithForm;