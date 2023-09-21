import { Outlet } from "react-router-dom";
import Header from "components/Header/Header";
import ErrorMessagePopup from "components/shared/ErrorMessagePopup/ErrorMessagePopup";
import Footer from "components/Footer/Footer";
import { Profile } from "types/Profile";

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