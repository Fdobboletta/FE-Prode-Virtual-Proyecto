import { toRem } from '@/utils';
import styled from 'styled-components';

type ModalFooterProps = {
  divider?: boolean;
  align?: 'start' | 'end';
  justify?: 'start' | 'end';
};

const ModalFooter = styled.div<ModalFooterProps>`
  align-items: ${(props) =>
    props.align === 'start'
      ? 'flex-start'
      : props.align === 'end'
      ? 'flex-end'
      : 'flex-end'};
  display: flex;
  justify-content: ${(props) =>
    props.justify === 'start'
      ? 'flex-start'
      : props.justify === 'end'
      ? 'flex-end'
      : 'flex-end'};
  height: ${toRem(54)};
  border-top: ${(props) =>
    props.divider &&
    `${props.theme.palette.divider} solid
    1px`};
`;

export { ModalFooter };
