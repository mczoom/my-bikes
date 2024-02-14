import poweredByStravaLogo from 'assets/images/pwrd_by_strava_horiz.png';
import { appStartYear, currentYear } from 'utils/constants';

export default function Footer() {
  const isSameYear = currentYear === appStartYear;
  const yearsInService = isSameYear ? appStartYear : `${appStartYear} - ${currentYear}`;

  return (
    <footer className="footer">
      <p className="footer__text">My-Bikes. {yearsInService}</p>
      <div className="footer__strava">
        <p className="strava__text">Сайт использует данные сервиса Strava</p>
        <img src={poweredByStravaLogo} className="strava__logo"></img>
      </div>
    </footer>
  );
}
