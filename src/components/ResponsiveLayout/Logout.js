import React, { useContext } from 'react';
import { AccountContext } from 'src/components/ExonAccounts';

function Logout() {
  const { logout } = useContext(AccountContext);

  return <a onClick={logout}> LogOut </a>;
}

export default Logout;
