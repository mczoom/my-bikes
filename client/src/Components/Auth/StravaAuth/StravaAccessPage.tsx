import AccessButton from 'ui/AccessButton/AccessButton';
import FeaturesList from 'components/Feature/FeaturesList/FeaturesList';

export default function StravaAccessPage() {
  return (
    <section className="access-page">
      <p className="access-page__text">Для использования приложения необходимо разрешить доступ к аккаунту Strava</p>
      <AccessButton />
      <FeaturesList />
    </section>
  );
}
