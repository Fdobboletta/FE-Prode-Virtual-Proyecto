import styled from 'styled-components';
import { SportsSoccer } from '@mui/icons-material';
import { toRem } from './utils';
import { memo } from 'react';

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  font-family: 'Arial', sans-serif;
  font-weight: bold;
  font-size: ${toRem(36)};
  color: white;
  margin-bottom: ${toRem(12)} !important;
`;

const LogoIcon = styled(SportsSoccer)`
  width: ${toRem(60)} !important;
  height: ${toRem(60)} !important;
  margin-right: ${toRem(12)} !important;

  color: white;
`;

const InternalLogo = () => (
  <LogoContainer>
    <LogoIcon />
    ComuniProde
  </LogoContainer>
);

export const Logo = memo(InternalLogo);
