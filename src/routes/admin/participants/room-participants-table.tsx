import React, { memo } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { GetParticipantsByRoomIdQuery } from '@/graphql/participants/getParticipantsByRoomId.generated';
import styled from 'styled-components';

type ParticipantsTableProps = {
  participants: GetParticipantsByRoomIdQuery['getParticipantsByRoomId'];
};

const StyledTableHead = styled(TableHead)`
  background-color: ${(props) => props.theme.palette.primary.main};
`;

const StyledHeaderCell = styled(TableCell)`
  color: white !important;
`;

const ParticipantsTableInternal: React.FC<ParticipantsTableProps> = (props) => {
  if (props.participants.length === 0) {
    return (
      <Box>
        <Typography variant="h5" gutterBottom>
          Lista de Participantes
        </Typography>
        <Typography variant="body1">
          No hay participantes inscriptos a esta sala.
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        {`Lista de Participantes (${props.participants.length})`}
      </Typography>
      <Paper elevation={3}>
        <TableContainer>
          <Table>
            <StyledTableHead>
              <TableRow>
                <StyledHeaderCell>#</StyledHeaderCell>
                <StyledHeaderCell>Nombre</StyledHeaderCell>
                <StyledHeaderCell>Email</StyledHeaderCell>
              </TableRow>
            </StyledTableHead>
            <TableBody>
              {props.participants.map((participant, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{`${participant.firstName} ${participant.lastName}`}</TableCell>
                  <TableCell>{participant.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export const ParticipantsTable = memo(ParticipantsTableInternal);
