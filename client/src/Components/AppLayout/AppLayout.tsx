import { Outlet } from "react-router-dom";
import Header from "components/Header/Header";
import Snackbar from "components/shared/Snackbar/Snackbar";
import Footer from "components/Footer/Footer";
import { Profile } from "types/Profile";
import useSnackbar from "hooks/useSnackbar";
import { Activity } from "types/Activity";

interface AppLayoutProps {
  setUser: React.Dispatch<React.SetStateAction<Profile>>
  setAllActivities: React.Dispatch<React.SetStateAction<Activity[]>>
}

export default function AppLayout({setUser, setAllActivities}: AppLayoutProps) {

  const snackbar = useSnackbar();    
  
  return (
    <div>
      <Header setUser={setUser} setAllActivities={setAllActivities}/>
      <main className="page">
        <Outlet />
      </main>  
      <Footer />
      <Snackbar errMsg={snackbar.messages}/>
    </div>
  )
}