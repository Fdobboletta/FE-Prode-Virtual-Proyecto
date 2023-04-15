import { ThemeProvider as MaterialThemeProvider } from '@mui/material/styles';
import React, { FC } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import theme from './theme';

type ThemeProviderProps = {
  children: React.ReactNode;
};

export const ThemeProvider: FC<ThemeProviderProps> = (
  props: ThemeProviderProps
) => (
  <MaterialThemeProvider theme={theme}>
    <StyledThemeProvider theme={theme}>{props.children}</StyledThemeProvider>
  </MaterialThemeProvider>
);
