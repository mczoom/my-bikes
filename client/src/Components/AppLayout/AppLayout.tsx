import { Outlet } from "react-router-dom";
import Header from "components/Header/Header";
import Snackbar from "components/shared/Snackbar/Snackbar";
import Footer from "components/Footer/Footer";
import { Profile } from "types/Profile";
import useSnackbar from "hooks/useSnackbar";

interface AppLayoutProps {
  setUser: React.Dispatch<React.SetStateAction<Profile>>
}

export default function AppLayout({setUser}: AppLayoutProps) {

  const snackbar = useSnackbar();    
  
  return (
    <div className="page">
      <Header setUser={setUser} />
      <main>
        <Outlet />
      </main>  
      <Footer />
      <Snackbar errMsg={snackbar.messages}/>
    </div>
  )
}