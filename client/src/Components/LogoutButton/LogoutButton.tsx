interface LogoutButtonProps {
    onLogout: () => void
  }


export default function LogoutButton({onLogout}: LogoutButtonProps) {


  return(
    <button className="logout-btn" type="button" onClick={onLogout}>Выйти</button>
  )
}