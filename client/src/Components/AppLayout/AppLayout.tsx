import { Outlet } from 'react-router-dom';
import Header from 'components/Header/Header';
import Snackbar from 'components/shared/Snackbar/Snackbar';
import Footer from 'components/Footer/Footer';
import useSnackbar from 'hooks/useSnackbar';

interface AppLayoutProps {
  handleReset: () => void;
}

export default function AppLayout(props: AppLayoutProps) {
  const snackbar = useSnackbar();

  return (
    <div>
      <Header {...props} />
      <main className="page">
        <Outlet />
      </main>
      <Footer />
      <Snackbar errMsg={snackbar.messages} />
    </div>
  );
}
