import { memo } from 'react';
import { AdminPage } from './admin-page';
import styled from 'styled-components';
import { toRem } from '@/utils';

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: ${toRem(32)};
`;

const RoomsPageInternal = () => {
  return (
    <AdminPage>
      <PageContainer>Hello!</PageContainer>
    </AdminPage>
  );
};

export const RoomsPage = memo(RoomsPageInternal);
