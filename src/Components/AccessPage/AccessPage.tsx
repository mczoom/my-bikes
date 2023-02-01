import React, {useEffect} from 'react';
import AccessButton from '../AccessButton/AccessButton';
import FeaturesList from '../FeaturesList/FeaturesList';
import { exchangeToken, renewToken } from '../../utils/stravaAuthApi';
import { useNavigate } from 'react-router-dom';



export default function AccessPage({}) {

  const navigate = useNavigate();


  useEffect(() => {
    const access = localStorage.getItem('accessToStrava');
    if(access){
      navigate('/');
    }
  }, []);


  return (
    <section className='access-page'>
      <p className='access-page__text'>Для использования приложения необходимо разрешить доступ к аккаунту Strava</p>
      <AccessButton />
      <FeaturesList />
    </section>
  )
}
