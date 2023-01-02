import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

export default function Stats() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {

    navigate("/")}, 3000)
  }, [])
  return (
    <section>
      <p>Количество тренировок за всё время:</p>
      <p>Пройдено км за всё время:</p>
      <p>Количество тренировок за год:</p>
      <p>Пройдено км за год:</p>
    </section>
  )
}
