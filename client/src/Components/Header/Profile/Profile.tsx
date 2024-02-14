import { useContext } from 'react';
import { CurrentUserContext } from 'contexts/CurrentUserContext';

export default function Profile() {
  const currentUser = useContext(CurrentUserContext);

  const avatar = currentUser.profile;
  const name = currentUser.firstname;

  return (
    <section className="profile">
      {currentUser.profile && (
        <>
          <img src={avatar} alt="Аватара пользователя" className="profile__image"></img>
          <p className="profile__name">{name}</p>
        </>
      )}
    </section>
  );
}
