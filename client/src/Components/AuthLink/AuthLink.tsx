import { Link } from "react-router-dom"

interface AuthLinkProps {
  link: string  
  text: string
}


export default function AuthLink({link, text}: AuthLinkProps) {

  return(    
    <Link to={link}>
      <p className="auth-link">
        {text}
      </p>
    </Link>    
  )
}