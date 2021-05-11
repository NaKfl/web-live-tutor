import React, { memo } from 'react';
import LiveTutorLogo from 'assets/icons/live_tutor.ico';
import { StyledLogo } from './styles';

export const Logo = () => (
  <StyledLogo>
    <img className="logo-img" src={LiveTutorLogo} alt="Live Tutor logo" />
    <div className="logo-name"> LiveTutor</div>
  </StyledLogo>
);

export default memo(Logo);
