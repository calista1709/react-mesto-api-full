import { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ onClose, isOpened, onAddPlace }) {
  const linkRef = useRef();
  const nameRef = useRef();

  useEffect(() => {
    nameRef.current.value = '';
    linkRef.current.value = '';
  }, [isOpened]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: nameRef.current.value,
      link: linkRef.current.value
    });
  }

  return (
    <PopupWithForm name="add-form" title="Новое место" onClose={onClose} buttonText="Создать" isOpened={isOpened} onSubmit={handleSubmit}>
      <div className="popup__input-wrap">
        <input ref={nameRef} type="text" name="name" id="place-name" className="popup__input popup__input_content_place-name"
          placeholder="Название" required minLength="2" maxLength="30" />
        <span className="popup__error place-name-error"></span>
      </div>
      <div className="popup__input-wrap">
        <input ref={linkRef} type="url" name="link" id="place-link" className="popup__input popup__input_content_place-link"
          placeholder="Ссылка на картинку" required />
        <span className="popup__error place-link-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default AddPlacePopup;