import { Link } from "react-router-dom"

interface AuthButtonProps {
  text: string
  onClick: () => void
}


export default function AuthButton({text, onClick}: AuthButtonProps) {

  return(
    <Link to={'/'}>
      <button className="logout-btn" type="button" onClick={onClick}>{text}</button>
    </Link>
  )
}