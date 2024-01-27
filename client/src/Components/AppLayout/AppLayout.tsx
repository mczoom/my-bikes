import { Outlet } from "react-router-dom";
import Header from "components/Header/Header";
import Snackbar from "components/shared/Snackbar/Snackbar";
import Footer from "components/Footer/Footer";
import { Profile } from "types/Profile";
import useSnackbar from "hooks/useSnackbar";
import { Activity } from "types/Activity";

interface AppLayoutProps {
  setUser: (user: Profile) => void
  setAllActivities: (activities: Activity[]) => void
}

export default function AppLayout(props: AppLayoutProps) {

  const snackbar = useSnackbar();    
  
  return (
    <div>
      <Header {...props}/>
      <main className="page">
        <Outlet />
      </main>  
      <Footer />
      <Snackbar errMsg={snackbar.messages}/>
    </div>
  )
}