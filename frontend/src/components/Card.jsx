function Card({ card, user, onCardClick, isOwn, isLiked, onCardLike, onCardDelete }) {
  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card, user);
  }

  function handleDeleteClick() {
    onCardDelete(card._id);
  }

  return (
    <li className="gallery__item">
      <img src={card.link} alt={card.name} className="gallery__photo" onClick={handleClick} />
      <div className="gallery__wrap">
        <h2 className="gallery__title">{card.name}</h2>
        <div className="gallery__like-block">
          <button className={`gallery__like ${isLiked ? 'gallery__like_active' : ''}`} type="button" aria-label="Нравится" onClick={handleLikeClick}></button>
          <span className="gallery__count">{card.likes.length}</span>
        </div>
      </div>
      <button className={`gallery__delete ${isOwn ? 'gallery__delete_active' : ''}`} type="button" aria-label="Удалить" onClick={handleDeleteClick}></button>
    </li>
  );
}

export default Card;