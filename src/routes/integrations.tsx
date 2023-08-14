import { UserRole } from '@/generated/graphql-types.generated';
import { toRem } from '@/utils';
import { Box, Button, CircularProgress, Stack } from '@mui/material';
import { useLocalStorageState } from 'ahooks';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { AdminPage } from './admin-page';
import useUrlState from '@ahooksjs/use-url-state';
import { useGetUserMpAccessTokenQuery } from '@/graphql/getUserMpAccessToken.generated';
import {
  WithSnackbarProps,
  snackSeverity,
  withSnack,
} from '@/components/snackbar';
import { useAuthorizeMercadoPagoMutation } from '@/graphql/authorizeMercadoPago.generated';

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

const useIntegrationsPage = (props: WithSnackbarProps) => {
  const [authData] = useLocalStorageState<{
    id: string;
    email: string;
    role: UserRole;
  }>('authData');

  const [isIntegrated, setIsIntegrated] = useState(false);

  const [urlState] = useUrlState();
  const { loading: loadingGetAccessTokenQuery } = useGetUserMpAccessTokenQuery({
    onCompleted: (data) => {
      if (data.getUserMpAccessToken) {
        setIsIntegrated(true);
      }
    },
  });
  const [authorizeMercadoPago, { loading: loadingAuthorizeMutation }] =
    useAuthorizeMercadoPagoMutation();
  const mercadoPagoCode = urlState.code as string;

  useEffect(() => {
    const authorizeMercadoPagoAndGetAccessToken = async (
      mercadoPagoAuthCode: string
    ) => {
      await authorizeMercadoPago({
        variables: { mercadoPagoCode: mercadoPagoAuthCode },
        onCompleted: () => {
          props.snackbarShowMessage(
            4000,
            'Integracion con Mercado Pago exitosa!',
            snackSeverity.success
          );
          setIsIntegrated(true);
        },
      });
    };
    if (mercadoPagoCode) {
      authorizeMercadoPagoAndGetAccessToken(mercadoPagoCode);
    }
  }, [mercadoPagoCode]);

  return {
    loading: loadingGetAccessTokenQuery || loadingAuthorizeMutation,
    isIntegrated,
    authData,
  };
};

const IntegrationsPageInternal = (props: WithSnackbarProps) => {
  const controller = useIntegrationsPage(props);

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
              {controller.loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                <StyledLabel>
                  {controller.isIntegrated
                    ? `Felicitaciones: Su cuenta se encuentra correctamente sincronizada con mercado
                  pago`
                    : 'No integrado'}
                </StyledLabel>
              )}

              <Button
                onClick={() =>
                  handleRedirectToMercadoPago(controller.authData?.id || '')
                }
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

export const IntegrationsPage = withSnack(IntegrationsPageInternal);
