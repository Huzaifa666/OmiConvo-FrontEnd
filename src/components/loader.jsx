import React from 'react';
import loading from '@assets/images/logo-tumbler.gif';

export const Loader = ({ ...attribute }) => {
  return <img {...attribute} src={loading} alt="loadingAnimation" />;
};
