import { memo } from 'react';
import { AdminPage } from '../admin-page';
import styled from 'styled-components';
import { toRem } from '@/utils';

import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';
import { CircularProgress } from '@mui/material';

import './iframe-styles.css';
import { usePowerBiReport } from './use-power-bi-report';

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: ${toRem(32)};
`;

const ReportsPageInternal = () => {
  const { reportToken, reportUrl, reportId, loading, userId } =
    usePowerBiReport();
  return (
    <AdminPage>
      <PageContainer data-testid="test-container">
        {loading || !userId ? (
          <CircularProgress />
        ) : (
          <PowerBIEmbed
            embedConfig={{
              type: 'report',
              id: reportId,
              embedUrl: reportUrl,
              accessToken: reportToken,
              tokenType: models.TokenType.Embed, // Use models.TokenType.Aad for SaaS embed
              settings: {
                panes: { filters: { expanded: false, visible: false } },
                background: models.BackgroundType.Transparent,
              },
              filters: [
                {
                  filterType: models.FilterType.Basic,
                  $schema: 'http://powerbi.com/product/schema#basic',
                  target: {
                    table: 'Administradores',
                    column: 'id',
                  },
                  operator: 'In',
                  values: [userId],
                },
              ],
            }}
            cssClassName={'styled-iframe'}
          />
        )}
      </PageContainer>
    </AdminPage>
  );
};

export const ReportsPage = memo(ReportsPageInternal);
