interface AuthButtonProps {
  text: string
  onLogout: () => void
}


export default function AuthButton({text, onLogout}: AuthButtonProps) {


  return(
    <button className="logout-btn" type="button" onClick={onLogout}>{text}</button>
  )
}