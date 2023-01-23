import { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { ServerCardsContext } from "../contexts/ServerCardsContext";

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete }) {
  const user = useContext(CurrentUserContext);
  const cards = useContext(ServerCardsContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__photo-wrap" onClick={onEditAvatar}>
          <img src={user.avatar} alt="Фотография пользователя" className="profile__avatar" />
        </div>
        <div className="profile__wrapper">
          <div className="profile__wrap">
            <h1 className="profile__title">{user.name}</h1>
            <button className="profile__edit-button" type="button" aria-label="Редактировать профиль" onClick={onEditProfile}></button>
          </div>
          <p className="profile__subtitle">{user.about}</p>
        </div>
        <button className="profile__add-button" type="button" aria-label="Добавить фото" onClick={onAddPlace}></button>
      </section>
      <section className="gallery">
        {/*Список с карточками мест*/}
        <ul className="gallery__list">
          {cards.map(card => (
            <Card
              key={card._id}
              card={card}
              user={user}
              onCardClick={onCardClick}
              isOwn={card.owner._id === user._id}
              isLiked={card.likes.some(i => i._id === user._id)}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete} />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
