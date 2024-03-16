interface FormButtonProps {
  btnText: string;
  btnType: 'submit' | 'button';
  onAction?: () => void;
  error?: boolean;
}

export default function FormButton({ btnText, btnType, onAction, error }: FormButtonProps) {
  const buttonClassName = `form-btn ${btnType === 'submit' ? 'submit-btn' : 'common-btn'}`;
  const isError = error ? true : false;

  return (
    <button className={buttonClassName} type={btnType} onClick={onAction} disabled={isError}>
      {btnText}
    </button>
  );
}
