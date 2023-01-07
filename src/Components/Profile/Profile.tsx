import React, {useEffect, useState} from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';


export default function Profile() {

  const currentUser = React.useContext(CurrentUserContext);
  const [avatar, setAvatar] = useState<string>('')
  const [name, setName] = useState<string>('')


  useEffect(() => {
    if (currentUser) {
      setAvatar(currentUser.profile);
      setName(currentUser.firstname);
    }
  }, [currentUser]);

  return (
    <section className='profile'>
      <img src={avatar} alt='Аватара пользователя' className='profile__image'></img>
      <p className='profile__name'>{name}</p>
    </section>
  )
}
