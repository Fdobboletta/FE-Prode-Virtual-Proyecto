import { UserRole } from '@/generated/graphql-types.generated';
import { toRem } from '@/utils';
import { Box, Button, CircularProgress, Stack } from '@mui/material';
import { useLocalStorageState } from 'ahooks';
import { useEffect } from 'react';
import styled from 'styled-components';
import { AdminPage } from './admin-page';
import useUrlState from '@ahooksjs/use-url-state';
import { useGetUserMpAccessTokenQuery } from '@/graphql/getUserMpAccessToken.generated';

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: ${toRem(32)};
`;

const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: ${toRem(12)};
`;

const StyledLabel = styled.div`
  margin-bottom: ${toRem(6)};
  text-align: center;
`;

const handleRedirectToMercadoPago = (userId: string) => {
  const clientId = import.meta.env.VITE_MERCADO_PAGO_CLIENT_ID as string;
  const redirectUri = 'https://comuniprode.netlify.app/admin/integrations';
  const authUrl = `https://auth.mercadopago.com/authorization?client_id=${clientId}&response_type=code&platform_id=mp&state=${userId}&redirect_uri=${redirectUri}&test_token=true `;

  window.location.href = authUrl;
};

export const IntegrationsPage = () => {
  const [authData] = useLocalStorageState<{
    id: string;
    email: string;
    role: UserRole;
  }>('authData');

  const [urlState] = useUrlState();
  const { data, loading } = useGetUserMpAccessTokenQuery();
  const mercadoPagoCode = urlState.code as string;

  useEffect(() => {
    if (mercadoPagoCode) {
      console.log('hey');
    }
  });

  return (
    <AdminPage>
      <PageContainer>
        <Box
          sx={{
            width: 300,
            height: 300,
            backgroundColor: 'white',
            border: 'solid black',
          }}
        >
          <BoxContainer>
            <Stack spacing={5}>
              <StyledLabel> Integrar con mercado pago</StyledLabel>
              <StyledLabel> ESTADO:</StyledLabel>
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                <StyledLabel>
                  {data?.getUserMpAccessToken
                    ? `Su cuenta se encuentra correctamente sincronizada con mercado
                  pago`
                    : 'No integrado'}
                </StyledLabel>
              )}

              <Button
                onClick={() => handleRedirectToMercadoPago(authData?.id || '')}
                variant="contained"
              >
                Click aqui para comenzar
              </Button>
            </Stack>
          </BoxContainer>
        </Box>
      </PageContainer>
    </AdminPage>
  );
};
