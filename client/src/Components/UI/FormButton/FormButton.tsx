interface FormButtonProps {
  btnText: string;
  btnType: 'submit' | 'button';
  onAction?: () => void;
  error?: boolean;
  warning?: boolean;
}

export default function FormButton({ btnText, btnType, onAction, error, warning }: FormButtonProps) {
  const buttonClassName = `form-btn ${btnType === 'submit' ? 'submit-btn' : 'common-btn'} ${warning ? 'warn-btn' : ''}`;
  const isError = error ? true : false;

  return (
    <button className={buttonClassName} type={btnType} onClick={onAction} disabled={isError}>
      {btnText}
    </button>
  );
}
