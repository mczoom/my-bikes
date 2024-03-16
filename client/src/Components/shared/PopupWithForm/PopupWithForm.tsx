import { BaseSyntheticEvent } from 'react';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import FormButton from 'ui/FormButton/FormButton';

interface PopupWithFormProps {
  name?: string;
  children: React.ReactNode;
  title: string;
  btnText: string;
  submitHandler?: (e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
  isPopupOpen: boolean;
  onClose: () => void;
}

export default function PopupWithForm({
  children,
  title,
  btnText,
  submitHandler,
  isPopupOpen,
  onClose
}: PopupWithFormProps) {
  const popupClassName = `bike-popup ${isPopupOpen ? 'bike-popup_on' : ''}`;

  function closePopupByOverlayClick(e: React.MouseEvent) {
    if (e.currentTarget === e.target) {
      onClose();
    }
  }

  return (
    <div className={popupClassName} onClick={closePopupByOverlayClick}>
      <div className="bike-popup__container">
        <button type="button" className="bike-popup__close-btn" onClick={onClose}></button>
        <div className="popup-with-form">
          <h2 className="popup-with-form__text">{title}</h2>
          <form className="popup-with-form__form" onSubmit={submitHandler}>
            <div className="popup__inputs-wrapper">{children}</div>
            <div className="popup__buttons-wrapper">
              <FormButton btnText={btnText} btnType={'submit'} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
