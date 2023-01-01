import React from 'react'
import SectionCardsList from '../SectionCardsList/SectionCardsList';
import AccessButton from '../AccessButton/AccessButton';

export default function Main() {
  return (
    <section className='main'>
      <AccessButton />
      <SectionCardsList />
    </section>
  )
}
