import {useEffect, useState, useContext} from 'react';
import { CurrentUserContext } from 'contexts/CurrentUserContext';


export default function Profile() {

  const currentUser = useContext(CurrentUserContext);
  const [avatar, setAvatar] = useState<string>('');
  const [name, setName] = useState<string>('');


  useEffect(() => {
    setAvatar(currentUser.profile);
    setName(currentUser.firstname);    
  }, [currentUser]);

  return (
    <section className='profile'>
      {currentUser.profile &&
        <>
          <img src={avatar} alt='Аватара пользователя' className='profile__image'></img>
          <p className='profile__name'>{name}</p>
        </>
      }
    </section>
  )
}
