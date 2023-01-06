import React, {useEffect} from 'react';
import AccessButton from '../AccessButton/AccessButton';




export default function AccessPage() {




  return (
    <section className='access-page'>
      <AccessButton />
      <p>Для использования приложения необходимо разрешить доступ к аккаунту Strava</p>
    </section>
  )
}
