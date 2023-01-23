import PopupWithForm from "./PopupWithForm";
import { useRef, useEffect } from "react";

function EditAvatarPopup({ onClose, isOpened, onUpdateAvatar }) {
  const avatarRef = useRef();

  useEffect(() => {
    avatarRef.current.value = '';
  }, [isOpened]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm name="change-avatar" title="Обновить аватар" onClose={onClose} buttonText="Сохранить" isOpened={isOpened} onSubmit={handleSubmit}>
      <div className="popup__input-wrap">
        <input ref={avatarRef} type="url" name="avatar-link" id="avatar-link" className="popup__input popup__input_content_avatar-link" placeholder="Ссылка на картинку" required />
        <span className="popup__error avatar-link-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;