import React from 'react';
import {clientId} from '../../utils/secretConstants';
import { getStravaAccess } from '../../utils/stravaAuthApi';

export default function AccessButton() {
  return (
    // <a href={`http://www.strava.com/oauth/authorize?client_id=${clientId}&response_type=code&redirect_uri=http://localhost:3000&scope=profile:read_all,activity:read_all`}>
    //     <button type='button' className='access-button'></button>
    // </a>

    <>
      <button type='button' className='access-button' onClick={getStravaAccess}></button>
    </>
  )
}
