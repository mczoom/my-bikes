interface ErrorMessagePopupProps {
  errMsg: string
}
  
   
  export default function ErrorMessagePopup({errMsg}: ErrorMessagePopupProps) {
  
     const errPopupClassName = `err-popup ${errMsg ? 'err-popup_on' : ''}` 
    
    return (
      <div className={errPopupClassName}>
        <p className="err-popup__message">{errMsg}</p>
      </div>
    )
  }