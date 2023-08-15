import { toRem } from '@/utils';
import styled from 'styled-components';

const ModalBody = styled.div<{ height?: number; minHeight?: number }>`
  flex: 1 1;
  overflow-y: auto;
  height: ${(props) => (props.height ? toRem(props.height) : '100%')};
  min-height: ${(props) =>
    props.minHeight ? toRem(props.minHeight) : toRem(100)};
  max-height: 50vh;
  margin-top: ${toRem(8)};
`;

export { ModalBody };
