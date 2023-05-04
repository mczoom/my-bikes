import React, {useEffect} from 'react';
import AccessButton from '../AccessButton/AccessButton';
import FeaturesList from '../FeaturesList/FeaturesList';
import { redirect, useNavigate } from 'react-router-dom';



export default function AccessPage({}) {

  return (
    <section className='access-page'>
      <p className='access-page__text'>Для использования приложения необходимо разрешить доступ к аккаунту Strava</p>
      <AccessButton />
      <FeaturesList />
    </section>
  )
}
