import { useContext, useState, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setName(currentUser.name || '');
    setDescription(currentUser.about || '');
  }, [currentUser, isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm name="edit-profile" title="Редактировать профиль" onClose={onClose} buttonText="Сохранить" isOpened={isOpen} onSubmit={handleSubmit}>
      <div className="popup__input-wrap">
        <input type="text" name="user-name" id="user-name" className="popup__input popup__input_content_name"
          placeholder="Имя" required minLength="2" maxLength="40" value={name} onChange={handleNameChange} />
        <span className="popup__error user-name-error"></span>
      </div>
      <div className="popup__input-wrap">
        <input type="text" name="user-job" id="user-job" className="popup__input popup__input_content_job"
          placeholder="Вид деятельности" required minLength="2" maxLength="200" value={description} onChange={handleDescriptionChange} />
        <span className="popup__error user-job-error"></span>
      </div>
    </PopupWithForm>
  );
}


export default EditProfilePopup;