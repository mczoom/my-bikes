import poweredByStravaLogo from '../../images/pwrd_by_strava_horiz.png';

export default function Footer() {
  
  const startYear = 2023;
  const actualYear = new Date().getFullYear();
  const isSameYear = actualYear - startYear;
  const yearsInService = isSameYear === 0 ? startYear : `${startYear} - ${actualYear}`;


  return (
    <footer className='footer'>
      <p className='footer__text'>My-Bikes. {yearsInService}</p>
      <div className='footer__strava'>
        <p className='strava__text'>Сайт использует данные сервиса Strava</p>
        <img src={poweredByStravaLogo} className='strava__logo'></img>
      </div>
    </footer>
  )
}
