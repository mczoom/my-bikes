import FormButton from 'ui/FormButton/FormButton';

interface ConfirmationPopupProps {
  title: string;
  ConfirmBtnText: string;
  CancelBtnText: string;
  onDelete: (part: string) => void;
  isPopupOpen: boolean;
  onClose: () => void;
  partId: string;
}

export default function ConfirmationPopup({
  ConfirmBtnText,
  CancelBtnText,
  title,
  onDelete,
  isPopupOpen,
  onClose,
  partId
}: ConfirmationPopupProps) {
  const popupClassName = `bike-popup ${isPopupOpen ? 'bike-popup_on' : ''}`;

  function closePopupByOverlayClick(e: React.MouseEvent) {
    if (e.currentTarget === e.target) {
      onClose();
    }
  }

  function deletePart() {
    onDelete(partId);
    onClose();
  }

  return (
    <div className={popupClassName} onClick={closePopupByOverlayClick}>
      <div className="bike-popup__container">
        <button type="button" className="bike-popup__close-btn" onClick={onClose}></button>
        <div className="popup-with-form">
          <h2 className="popup-with-form__text">{title}</h2>
          <div className="popup-with-form__form">
            <div className="popup__buttons-wrapper">
              <FormButton btnText={ConfirmBtnText} onAction={deletePart} btnType={'submit'} />
              <FormButton btnText={CancelBtnText} onAction={onClose} btnType={'button'} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
