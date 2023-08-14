import { UserRole } from '@/generated/graphql-types.generated';
import { toRem } from '@/utils';
import { Box, Button, Stack } from '@mui/material';
import { useLocalStorageState } from 'ahooks';
import { useEffect } from 'react';
import { useLocation } from 'react-router';
import styled from 'styled-components';
import { AdminPage } from './admin-page';
import useUrlState from '@ahooksjs/use-url-state';

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
  const [authData, _] = useLocalStorageState<{
    id: string;
    email: string;
    role: UserRole;
  }>('authData');

  const [urlState] = useUrlState();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const mercadoPagoCode = queryParams.get('code');
  const status = queryParams.get('status');

  useEffect(() => {
    console.log('urlState', urlState);
    console.log('MercadoPagoCode', mercadoPagoCode);
    console.log('Status', status);
  }, [mercadoPagoCode, status]);
  return (
    <AdminPage>
      <Box
        sx={{
          marginTop: 10,
          width: 300,
          height: 300,
          backgroundColor: 'white',
          border: 'solid black',
        }}
      >
        <BoxContainer>
          <Stack spacing={5}>
            <StyledLabel> Integrar con mercado pago</StyledLabel>
            <Button
              onClick={() => handleRedirectToMercadoPago(authData?.id || '')}
              variant="contained"
            >
              Click aqui para comenzar
            </Button>
          </Stack>
        </BoxContainer>
      </Box>
    </AdminPage>
  );
};
