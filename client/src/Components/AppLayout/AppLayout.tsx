import { Outlet, useLocation, useNavigation } from "react-router-dom";
import Header from "../Header/Header";
import ErrorMessagePopup from "../ErrorMessagePopup/ErrorMessagePopup";
import { useEffect } from "react";
import Footer from "../Footer/Footer";

interface AppLayoutProps {
    errMessage: string[]
  }

export default function AppLayout({errMessage}: AppLayoutProps) {

      
  
  return (
    <div className="page">
      <Header />
      <main>
        <Outlet />
      </main>  
      <Footer />
      <ErrorMessagePopup errMsg={errMessage}/>
    </div>
  )
}