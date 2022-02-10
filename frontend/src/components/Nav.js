import React from 'react';
import AuthButton from './AuthButton';
import { useAuth0 } from '@auth0/auth0-react'


function Nav() {

  const { user, isAuthenticated } = useAuth0();

  return (
  <div>
    <div>Hunter Log</div>

    <div>
      {isAuthenticated && user.name}
      <AuthButton />
    </div>
  </div>
  )
}

export default Nav;
