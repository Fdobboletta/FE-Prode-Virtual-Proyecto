import { memo } from 'react';
import { Typography, Button, Stack } from '@mui/material';
import { Refresh } from '@mui/icons-material';

type UserRoomEmptyStateProps = {
  onRefresh: () => void;
};

const UserRoomEmptyStateInternal = (props: UserRoomEmptyStateProps) => {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      height="80vh" // Ajusta la altura según tus necesidades
      spacing={2}
    >
      <Typography variant="h4" align="center">
        No hay salas disponibles para participar en este momento.
      </Typography>
      <Typography variant="body1" align="center">
        Comprueba si hay nuevas salas disponibles al actualizar la lista.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<Refresh />}
        onClick={props.onRefresh}
      >
        Actualizar Lista
      </Button>
    </Stack>
  );
};

export const UserRoomEmptyState = memo(UserRoomEmptyStateInternal);
