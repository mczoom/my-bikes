import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import ErrorMessagePopup from "../ErrorMessagePopup/ErrorMessagePopup";

interface AppLayoutProps {
    isLoggedIn: boolean
    onLogout: () => void
    errMessage: string
  }

export default function AppLayout({isLoggedIn, onLogout, errMessage}: AppLayoutProps) {
    

    return (
      <div className="page">
        <Header isLoggedIn={isLoggedIn} onLogout={onLogout} />
        <Outlet />
        <ErrorMessagePopup errMsg={errMessage}/>
      </div>
    )
  }