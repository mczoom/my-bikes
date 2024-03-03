interface FormButtonProps {
  btnText: string;
  btnType: 'submit' | 'button';
  onAction?: () => void;
}

export default function FormButton({ btnText, btnType, onAction }: FormButtonProps) {
  const buttonClassName = `form-btn ${btnType === 'submit' ? 'submit-btn' : 'common-btn'}`;

  return (
    <button className={buttonClassName} type={btnType} onClick={onAction}>
      {btnText}
    </button>
  );
}
