import { clientId } from 'utils/constants';

export default function AccessButton() {
  return (
    <a
      href={`http://www.strava.com/oauth/authorize?client_id=${clientId}&response_type=code&redirect_uri=http://localhost:3000/access-result&scope=read_all,profile:read_all,activity:read_all`}
    >
      <button type="button" className="access-button"></button>
    </a>
  );
}
