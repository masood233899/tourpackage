import React from 'react';
import { redirect } from 'react-router-dom';

const withRoleBasedAccess = (allowedRoles, Component) => {
  const userRole = sessionStorage.getItem('admin');

  return userRole && allowedRoles.includes(userRole) ? <Component /> : <redirect to="/login" />;
};

export default withRoleBasedAccess;
