import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { ServerCardsContext } from "../contexts/ServerCardsContext";
import api from "../utils/api";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ProtectedRoute from "./ProtectedRoute";
import { register, authorize, checkToken } from "../utils/auth";
import InfoTooltip from "./InfoTooltip";

function App() {

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isRegisterSuccessful, setIsRegisterSuccessful] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const navigate = useNavigate();

  // Проверка авторизирован ли пользователь
  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (!token) return;
    checkToken(token)
      .then((res) => {
        setIsLoggedIn(true);
        navigate("/");
        setUserEmail(res.data.email);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [isLoggedIn, navigate]);

  // Загрузка данных с сервера о пользователе
  useEffect(() => {
    api.getUserInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  // Загрузка данных с сервера о карточках
  useEffect(() => {
    api.getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  // Функция открытия попапа редактирования аватара
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  // Функция открытия попапа редактирования профиля
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };

  // Функция открытия попапа добавления новой карточки
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };

  // Функция открытия попапа большой фотографии
  function handleCardClick(card) {
    setSelectedCard(card);
  };

  // Функция закрытия всех попапов
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  };

  // Функция добавления/удаления лайков
  function handleCardLike(card, user) {
    const isLiked = card.likes.some(i => i._id === user._id);
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => {
        console.log(err);
      });
  };

  // Функция удаления карточки
  function handleCardDelete(id) {
    api.deleteCard(id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== id));
      })
      .catch(err => {
        console.log(err);
      });
  };

  // Функция изменения данных о пользователе
  function handleUpdateUser(updatedUser) {
    api.setUserInfo(updatedUser)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
  };

  // Функция редактирования аватарки пользователя
  function handleUpdateAvatar(avatar) {
    api.changeAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
  };

  // Функция добавления новой карточки
  function handleAddPlaceSubmit(newPhoto) {
    api.setCard(newPhoto)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
  };

  // Функция закрытия окна оповещения после регистрации
  function closeInfoTooltip(isRegistered) {
    setIsInfoTooltipOpen(false);
    isRegistered && navigate("/sign-in");
  };

  // Функция отправки формы регистрации пользователя
  function handleRegisterSubmit(password, email) {
    register(password, email)
      .then(() => {
        setIsRegisterSuccessful(true);
      })
      .catch((err) => {
        setIsRegisterSuccessful(false);
        console.log(err);
      })
      .finally(() => {
        setIsInfoTooltipOpen(true);
      });
  }

  // Функция отправки формы авторизации пользователя
  function handleAuthorizeSubmit(password, email) {
    authorize(password, email)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          setIsLoggedIn(true);
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Функция выхода из аккаунта пользователя
  function handleLogout() {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
  }

  return (
    <div className="container">
      <Routes>
        <Route exact path="/" element={
          <ProtectedRoute loggedIn={isLoggedIn} components={
            <CurrentUserContext.Provider value={currentUser}>
              <ServerCardsContext.Provider value={cards}>
                <Header link="/sign-in" linkName="Выйти" userEmail={userEmail} onClick={handleLogout} />
                <Main
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />
                {/*Попап редактирования профиля*/}
                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

                {/*Попап добавления карточки*/}
                <AddPlacePopup onClose={closeAllPopups} isOpened={isAddPlacePopupOpen} onAddPlace={handleAddPlaceSubmit} />

                {/*Попап обновления аватара*/}
                <EditAvatarPopup onClose={closeAllPopups} isOpened={isEditAvatarPopupOpen} onUpdateAvatar={handleUpdateAvatar} />

                {/*Попап открытой карточки*/}
                <ImagePopup card={selectedCard} onClose={closeAllPopups} />

                {/*Попап удаления карточки*/}
                <PopupWithForm name="deleting-photo" title="Вы уверены?" onClose={closeAllPopups} isOpened={false} />

                <Footer />
              </ServerCardsContext.Provider>
            </CurrentUserContext.Provider>
          } />
        } />

        <Route path="/sign-up" element={
          <>
            <Header link="/sign-in" linkName="Войти" />
            <Register onRegister={handleRegisterSubmit} />
          </>
        } />
        <Route path="/sign-in" element={
          <>
            <Header link="/sign-up" linkName="Регистрация" />
            <Login onAuthorize={handleAuthorizeSubmit} />
          </>
        } />
      </Routes>

      <InfoTooltip success={isRegisterSuccessful} isOpened={isInfoTooltipOpen} onClose={closeInfoTooltip} />
    </div>
  );
}

export default App;

