interface ErrorMessagePopupProps {
  errMsg: string[]
}
  
   
  export default function ErrorMessagePopup({errMsg}: ErrorMessagePopupProps) {
  
     const errPopupClassName = `err-popup ${errMsg ? 'err-popup_on' : ''}` 

     
    return (      
      <ul className={errPopupClassName}>
       {errMsg.map((message) => (
        <li>
          <p className="err-popup__message">{message}</p>
        </li>
      ))}
    </ul>
    
    )
  }