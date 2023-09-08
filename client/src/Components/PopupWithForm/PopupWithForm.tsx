import FormButton from '../FormButton/FormButton';


interface PopupWithFormProps {
  name: string
  children: React.ReactNode
  title: string
  btnText: string
  submitHandler?: (e: React.SyntheticEvent) => void
}

export default function PageWithForm({name, children, title, btnText, submitHandler}: PopupWithFormProps) {
  
  return (
    <div className='popup-with-form'>      
      <h2 className='popup-with-form__text'>{title}</h2>
      <form className='popup-with-form__form' onSubmit={submitHandler}>
        <div className='popup__inputs-wrapper'>
          {children}
        </div>
        <div className='popup__buttons-wrapper'>
          <FormButton btnText={btnText} btnType={'submit'}/>
        </div>
      </form>
    </div>
  )
}
