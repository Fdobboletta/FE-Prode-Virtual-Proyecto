import { UserRole } from '@/generated/graphql-types.generated';
import { toRem } from '@/utils';
import { Box, Button, CircularProgress, Stack } from '@mui/material';
import { useLocalStorageState } from 'ahooks';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import useUrlState from '@ahooksjs/use-url-state';
import { useGetUserMpAccessTokenQuery } from '@/graphql/getUserMpAccessToken.generated';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import {
  WithSnackbarProps,
  snackSeverity,
  withSnack,
} from '@/components/snackbar';
import { useAuthorizeMercadoPagoMutation } from '@/graphql/authorizeMercadoPago.generated';
import { useDisconnectMercadoPagoIntegrationMutation } from '@/graphql/disconnectMpIntegration.generated';
import { ConfirmationModal, useModal } from '@/components/modal-container';
import { AdminPage } from '../admin-page';

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
const StyledTitle = styled.div`
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: ${toRem(6)};
  text-align: center;
`;

const handleRedirectToMercadoPago = (userId: string) => {
  const clientId = import.meta.env.VITE_TEST_MERCADO_PAGO_CLIENT_ID as string;
  const redirectUri = 'https://comuniprode.netlify.app/admin/integrations';
  const authUrl = `https://auth.mercadopago.com/authorization?client_id=${clientId}&response_type=code&platform_id=mp&state=${userId}&redirect_uri=${redirectUri} `;

  window.location.href = authUrl;
};

const useIntegrationsPage = (props: WithSnackbarProps) => {
  const [authData] = useLocalStorageState<{
    id: string;
    email: string;
    address: string;
    phone: string;
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

  const [
    disconnectMercadoPagoIntegration,
    { loading: loadingDisconnectMutation },
  ] = useDisconnectMercadoPagoIntegrationMutation();

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

  const handleDisconnectIntegration = useCallback(async () => {
    await disconnectMercadoPagoIntegration({
      onCompleted: () => {
        props.snackbarShowMessage(
          4000,
          'Integracion desconectada con exito',
          snackSeverity.success
        );
        setIsIntegrated(false);
      },
    });
  }, []);

  const { onCloseModal, onOpenModal, modalOpen } = useModal();

  return {
    loading: loadingGetAccessTokenQuery || loadingAuthorizeMutation,
    loadingDisconnectMutation,
    isIntegrated,
    authData,
    handleDisconnectIntegration,
    confirmationModal: {
      onCloseModal,
      onOpenModal,
      modalOpen,
    },
  };
};

const IntegrationsPageInternal = (props: WithSnackbarProps) => {
  const controller = useIntegrationsPage(props);

  return (
    <AdminPage title="Integracion con Mercado Pago">
      <PageContainer>
        <Box
          sx={{
            width: 300,
            backgroundColor: 'white',
            border: 'solid black',
          }}
        >
          <BoxContainer>
            <Stack spacing={3}>
              <StyledTitle> Integrar con mercado pago</StyledTitle>
              <StyledLabel> ESTADO:</StyledLabel>
              {controller.loading ? (
                <CircularProgress
                  size={24}
                  color="inherit"
                  style={{ alignSelf: 'center' }}
                />
              ) : controller.isIntegrated ? (
                <>
                  <CheckCircleIcon
                    fontSize="large"
                    style={{ color: 'green', alignSelf: 'center' }}
                  />
                  <StyledLabel>
                    Felicitaciones: Su cuenta esta lista para operar con Mercado
                    Pago
                  </StyledLabel>
                </>
              ) : (
                <>
                  <CancelIcon
                    fontSize="large"
                    style={{ color: '#f44336', alignSelf: 'center' }}
                  />
                  <StyledLabel>No Integrado</StyledLabel>
                </>
              )}

              {controller.isIntegrated &&
              import.meta.env.VITE_ENV === 'local' ? (
                <Button
                  onClick={() => controller.confirmationModal.onOpenModal()}
                  variant="contained"
                >
                  {controller.loadingDisconnectMutation ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    'Desconectar Mercado Pago'
                  )}
                </Button>
              ) : (
                <Button
                  onClick={() =>
                    handleRedirectToMercadoPago(controller.authData?.id || '')
                  }
                  variant="contained"
                  disabled={controller.loading}
                >
                  {controller.isIntegrated
                    ? 'Cambiar cuenta receptora'
                    : 'Click aqui para comenzar'}
                </Button>
              )}
            </Stack>
          </BoxContainer>
        </Box>
      </PageContainer>
      <ConfirmationModal
        ariaLabel={'confirm-disconnect-modal'}
        destructive
        isModalOpen={controller.confirmationModal.modalOpen}
        onConfirm={() => {
          controller.handleDisconnectIntegration();
          controller.confirmationModal.onCloseModal();
        }}
        onCloseModal={() => controller.confirmationModal.onCloseModal()}
      >
        Estas seguro que deseas desconectar tu integracion con Mercado Pago?
        Esto implicara volver a realizar todo el proceso de sincronizacion la
        proxima vez
      </ConfirmationModal>
    </AdminPage>
  );
};

export const IntegrationsPage = withSnack(IntegrationsPageInternal);
