import { Outlet, useLocation, useNavigation } from "react-router-dom";
import Header from "../Header/Header";
import ErrorMessagePopup from "../ErrorMessagePopup/ErrorMessagePopup";
import { useEffect } from "react";
import Footer from "../Footer/Footer";
import { Profile } from "../../models/Profile";

interface AppLayoutProps {
  setUser: React.Dispatch<React.SetStateAction<Profile>>
  errMessage: string[]
}

export default function AppLayout({setUser, errMessage}: AppLayoutProps) {

      
  
  return (
    <div className="page">
      <Header setUser={setUser} />
      <main>
        <Outlet />
      </main>  
      <Footer />
      <ErrorMessagePopup errMsg={errMessage}/>
    </div>
  )
}