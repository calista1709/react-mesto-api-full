function ImagePopup({ card, onClose }) {
  if (!card) return;

  return (
    <div className="popup popup_type_opened-photo popup_opened">
      <figure className="popup__figure">
        <img src={card.link} alt={card.name} className="popup__photo" />
        <figcaption className="popup__figcaption">{card.name}</figcaption>
        <button type="button" className="popup__close" aria-label="Закрыть" onClick={onClose}></button>
      </figure>
    </div>
  );
}

export default ImagePopup;