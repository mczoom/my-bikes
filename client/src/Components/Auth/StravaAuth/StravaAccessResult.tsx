import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addStravaPermissions, exchangeToken } from 'utils/stravaAuthApi';
import { mandatoryStravaPermissions } from 'utils/constants';
import useAuth from 'hooks/useAuth';
import { setLocalStorage } from 'utils/service';

interface stravaToken {
  strToken: string;
}

export default function StravaAccessResult() {
  const navigate = useNavigate();
  const auth = useAuth();

  const stravaPermissions = getStravaPermissionsScope();

  function getStravaPermissionsScope(): string[] | undefined {
    const params: any = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop: string) => searchParams.get(prop)
    });
    const scope: string = params.scope;
    const scopeArr = scope?.split(',');

    if (!scope || scopeArr.length !== mandatoryStravaPermissions.length) {
      return;
    } else {
      return scopeArr;
    }
  }

  async function setStrTokenToLocalStorageAfterRegistration() {
    exchangeToken()
      .then((token: stravaToken) => {
        setLocalStorage('stravaToken', token.strToken);
      })
      .catch((err) => console.log(err));
  }

  function setStravaTokenAndPermissionsAfterRegistration(permissions: string[] | undefined) {
    addStravaPermissions(permissions)
      .then(async () => {
        await setStrTokenToLocalStorageAfterRegistration();
        //auth.checkPermissions();
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
        navigate('/access');
      });
  }

  useEffect(() => {
    setStravaTokenAndPermissionsAfterRegistration(stravaPermissions);
  }, [stravaPermissions]);

  return <div>You are about to be transfered</div>;
}
