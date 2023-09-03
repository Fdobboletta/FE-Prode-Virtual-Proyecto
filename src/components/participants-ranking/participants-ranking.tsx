import React from 'react';
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

type ParticipantsRankingProps = {
  participants: GetParticipantsByRoomIdQuery['getParticipantsByRoomId'];
};

const StyledTableHead = styled(TableHead)`
  background-color: ${(props) => props.theme.palette.primary.main};
`;

const StyledHeaderCell = styled(TableCell)`
  color: white !important;
`;

const ParticipantsRanking: React.FC<ParticipantsRankingProps> = (props) => {
  if (props.participants.length === 0) {
    // Mostrar un mensaje si no hay participantes
    return (
      <Box>
        <Typography variant="h5" gutterBottom>
          Ranking de Participantes
        </Typography>
        <Typography variant="body1">
          No hay participantes disponibles en el ranking.
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Ranking de Participantes
      </Typography>
      <Paper elevation={3}>
        <TableContainer>
          <Table>
            <StyledTableHead>
              <TableRow>
                <StyledHeaderCell>#</StyledHeaderCell>
                <StyledHeaderCell>Nombre</StyledHeaderCell>
                <StyledHeaderCell>Email</StyledHeaderCell>
                <StyledHeaderCell>Puntuación</StyledHeaderCell>
              </TableRow>
            </StyledTableHead>
            <TableBody>
              {props.participants.map((participant, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{`${participant.firstName} ${participant.lastName}`}</TableCell>
                  <TableCell>{participant.email}</TableCell>
                  <TableCell>{participant.score}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default ParticipantsRanking;
