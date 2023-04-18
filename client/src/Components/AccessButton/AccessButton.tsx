import React from 'react';
import {clientId} from '../../utils/constants';
import { Link } from 'react-router-dom';


export default function AccessButton() {
  return (    
    <Link to={`http://www.strava.com/oauth/authorize?client_id=${clientId}&response_type=code&redirect_uri=http://localhost:3000/about&scope=profile:read_all,activity:read_all`}>
        <button type='button' className='access-button'></button>
    </Link>
  )
}
