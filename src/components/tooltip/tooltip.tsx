import { FC, ReactElement, ReactNode, useMemo } from 'react';

import styled from 'styled-components';

import MuiTooltip, {
  TooltipProps as MuiTooltipProps,
} from '@mui/material/Tooltip';

import { Typography } from '@mui/material';
import { toRem } from '@/utils';
import theme from '../../styles/theme';

type TooltipPlacement =
  | 'bottom-end'
  | 'bottom-start'
  | 'bottom'
  | 'left-end'
  | 'left-start'
  | 'left'
  | 'right-end'
  | 'right-start'
  | 'right'
  | 'top-end'
  | 'top-start'
  | 'top';

export type TooltipProps = {
  title?: ReactNode;
  description?: ReactNode;
  children: ReactElement;
  followCursor?: boolean;
  enterDelay?: number;
  enterNextDelay?: number;
  leaveDelay?: number;
  placement?: TooltipPlacement;
  disableInteractive?: boolean;
  hotkey?: {
    command: Array<string | JSX.Element>;
    description: ReactNode;
  };
  componentsProps?: MuiTooltipProps['componentsProps'];
  open?: boolean;
  light?: boolean;
};

const Title = styled(Typography)<{ component?: string }>`
  font-size: ${(props) => props.theme.typography.body2.fontSize} !important;
  font-weight: ${(props) => props.theme.typography.body2.fontWeight} !important;
  flex: 1;
`;

const Description = styled(Typography)<{ component?: string }>`
  font-size: ${(props) => props.theme.typography.body1.fontSize} !important;
  font-weight: ${(props) => props.theme.typography.body1.fontWeight} !important;
  flex: 1;
`;

const TooltipContainer = styled.div<{ $light?: boolean }>`
  padding: ${toRem(2)} 0;
  min-width: ${toRem(200)};
  background-color: ${(props) =>
    props.$light
      ? props.theme.palette.background.default
      : props.theme.palette.info.main} !important;
  color: ${(props) =>
    props.$light ? props.theme.palette.text.primary : '#FFFFFF'};
`;

const TooltipSection = styled.div<{ $hidden?: boolean }>`
  padding: ${toRem(10)} ${toRem(12)} ${toRem(12)} ${toRem(12)};
  display: ${(props) => (props.$hidden ? 'none' : 'flex')};
  flex: 1;
  flex-direction: column;
`;

const HotkeyContainer = styled.div<{ $standalone?: boolean }>`
  font-size: ${(props) => props.theme.typography.body1.fontSize} !important;
  font-weight: ${(props) => props.theme.typography.body1.fontWeight} !important;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: ${(props) =>
    props.$standalone
      ? 'none'
      : `${toRem(1)} solid ${props.theme.palette.text.disabled}`};
  padding-top: ${toRem(12)};
  padding-bottom: ${toRem(10)};
  white-space: nowrap;
`;

const HotkeyDescription = styled.div<{ $light?: boolean }>`
  font-size: ${(props) => props.theme.typography.body1.fontSize} !important;
  font-weight: ${(props) => props.theme.typography.body1.fontWeight} !important;
  color: ${(props) =>
    props.$light
      ? props.theme.palette.neutral.dark
      : props.theme.palette.neutral.main};

  padding-left: ${toRem(12)};
`;

const HotkeyCommand = styled.div`
  font-size: ${(props) => props.theme.typography.caption.fontSize} !important;
  font-weight: ${(props) => props.theme.typography.body1.fontWeight} !important;
  margin-left: ${toRem(8)};
  padding-right: ${toRem(12)};
  display: flex;
  align-items: center;
  color: white;
`;

const HotkeySeparator = styled.span`
  background-color: ${(props) =>
    props.theme.palette.info.mediumLight} !important;
  border-radius: ${toRem(3)};
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: ${toRem(22)};
  height: ${toRem(22)};
  padding: ${toRem(2)};
  margin: 0 ${toRem(1)};
  color: white !important;
`;

const TooltipTitle = (props: {
  description?: ReactNode;
  title?: ReactNode;
  hotkey?: { command: Array<string | JSX.Element>; description: ReactNode };
  light?: boolean;
}) => (
  <TooltipContainer $light={props.light}>
    <TooltipSection $hidden={!(props.title || props.description)}>
      {props.title && <Title component="span">{props.title}</Title>}
      {typeof props.description === 'object' ? (
        props.description
      ) : (
        <Description component="span">{props.description}</Description>
      )}
    </TooltipSection>
    {props.hotkey && (
      <HotkeyContainer $standalone={!(props.title || props.description)}>
        <HotkeyDescription $light={props.light}>
          {props.hotkey.description}
        </HotkeyDescription>
        <HotkeyCommand>
          {props.hotkey.command.map((cmd, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <HotkeySeparator key={`cmd-${i}`}>{cmd}</HotkeySeparator>
          ))}
        </HotkeyCommand>
      </HotkeyContainer>
    )}
  </TooltipContainer>
);

const defaultProps: Partial<TooltipProps> = {
  enterDelay: 800,
  enterNextDelay: 800,
  leaveDelay: 100,
  placement: 'bottom',
  disableInteractive: true,
};

export const Tooltip: FC<TooltipProps> = (inProps) => {
  const props = { ...defaultProps, ...inProps };
  const title = useMemo(
    () =>
      props.description || props.title || props.hotkey ? (
        <TooltipTitle
          description={props.description}
          hotkey={props.hotkey}
          light={props.light}
          title={props.title}
        />
      ) : (
        ''
      ),
    [props.description, props.title, props.hotkey, props.light]
  );

  const componentsProps = {
    ...props.componentsProps,
    tooltip: {
      ...props.componentsProps?.tooltip,
      sx: {
        ...props.componentsProps?.tooltip?.sx,
        padding: '0',
        boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.12)',
        [theme.breakpoints.down(theme.breakpoints.values.sm)]: {
          maxWidth: toRem(375),
        },
      },
    },
  };

  return (
    <MuiTooltip
      componentsProps={componentsProps}
      disableInteractive={props.disableInteractive}
      enterDelay={props.enterDelay}
      enterNextDelay={props.enterNextDelay}
      followCursor={props.followCursor}
      leaveDelay={props.leaveDelay}
      open={props.open}
      placement={props.placement}
      title={title}
    >
      {props.children}
    </MuiTooltip>
  );
};
