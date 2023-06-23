import { Outlet, useLocation, useNavigation } from "react-router-dom";
import Header from "../Header/Header";
import ErrorMessagePopup from "../ErrorMessagePopup/ErrorMessagePopup";
import { useEffect } from "react";
import Footer from "../Footer/Footer";

interface AppLayoutProps {
    isLoggedIn: boolean
    onLogout: () => void
    errMessage: string[]
  }

export default function AppLayout({isLoggedIn, onLogout, errMessage}: AppLayoutProps) {

      
  
    return (
      <div className="page">
        <Header isLoggedIn={isLoggedIn} onLogout={onLogout} />
        <main>
          <Outlet />
        </main>  
        <Footer />
        <ErrorMessagePopup errMsg={errMessage}/>
      </div>
    )
  }