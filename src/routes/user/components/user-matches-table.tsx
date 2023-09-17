import React, { memo, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Select,
  MenuItem,
  Chip,
} from '@mui/material';
import styled from 'styled-components';
import { Match, Score } from '@/generated/graphql-types.generated';
import { toRem } from '@/utils';
import { format } from 'date-fns';
import { Check, Close, LockOpen, LockOutlined } from '@mui/icons-material';

import useUrlState from '@ahooksjs/use-url-state';
import { useRoomPageContext } from '@/routes/admin/context/room-page-context';
import useDateComparison from '@/utils/use-date-comparison';

const StyledTableCell = styled(TableCell)`
  font-weight: bold;
`;

const StyledIconButton = styled(IconButton)`
  text-align: center;
`;

const StyledSelect = styled(Select)`
  width: ${toRem(100)};
  max-height: ${toRem(35)};
`;

type MatchesTableProps = {
  matches: Match[];
  onScoreSelect: (matchId: string, score: Score | undefined) => void;
  onSaveScores: () => void;
};

const getScoreLabel = (score?: Score | null | undefined) => {
  if (score === Score.Home) return 'LOCAL';
  if (score === Score.Away) return 'VISITANTE';
  if (score === Score.Draw) return 'EMPATE';
  return 'No disputado';
};

const UserMatchesTableInternal = (props: MatchesTableProps) => {
  const [urlState, setUrlState] = useUrlState<{ isEditing: '1' }>();
  const [clickCount, setClickCount] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);
  const { room } = useRoomPageContext();

  const { isDateReached } = useDateComparison({ targetDate: room.dueDate });

  const handleRowDoubleClick = () => {
    setClickCount(0);
    setLastClickTime(0);

    if (urlState.isEditing) {
      props.onSaveScores();
      setUrlState({ isEditing: undefined });
      return;
    }

    setUrlState({ isEditing: '1' });
  };

  const handleLockIconClick = () => {
    const currentTime = new Date().getTime();

    if (currentTime - lastClickTime < 300) {
      handleRowDoubleClick();
    } else {
      setClickCount(clickCount + 1);
    }

    setLastClickTime(currentTime);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: `${toRem(440)}` }}>
        <Table stickyHeader aria-label="Tabla de encuentros">
          <TableHead>
            <TableRow>
              <StyledTableCell>Equipo Local</StyledTableCell>
              <StyledTableCell>Equipo Visitante</StyledTableCell>
              <StyledTableCell>Fecha del Encuentro</StyledTableCell>
              <StyledTableCell>
                Pronostico
                {room.isActive && !room.isClosed && !isDateReached && (
                  <StyledIconButton
                    sx={{
                      ':hover': {
                        backgroundColor: 'inherit',
                      },
                      ':focus': {
                        backgroundColor: 'inherit',
                      },
                    }}
                    onClick={(event) => {
                      event.stopPropagation();
                      handleLockIconClick();
                    }}
                  >
                    {urlState.isEditing ? (
                      <LockOpen fontSize="small" />
                    ) : (
                      <LockOutlined fontSize="small" />
                    )}
                  </StyledIconButton>
                )}
              </StyledTableCell>
              {room.isClosed && (
                <StyledTableCell>Resultado Oficial</StyledTableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.matches.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.homeTeam}</TableCell>
                <TableCell>{row.awayTeam}</TableCell>
                <TableCell>
                  {format(new Date(row.startDate), 'dd/MM/yyyy')}
                </TableCell>
                {urlState.isEditing && room.isActive ? (
                  <TableCell>
                    <StyledSelect
                      labelId={`${row.id}-select-score`}
                      id={`${row.id}-select-score`}
                      value={row.userForecast || ''}
                      onChange={(event) => {
                        const score = event.target.value as Score;
                        props.onScoreSelect(row.id, score);
                      }}
                    >
                      <MenuItem value={Score.Home}>Local</MenuItem>
                      <MenuItem value={Score.Away}>Visitante</MenuItem>
                      <MenuItem value={Score.Draw}>Empate</MenuItem>
                      <MenuItem value={''}>No disputado</MenuItem>
                    </StyledSelect>
                  </TableCell>
                ) : !room.isClosed ? (
                  <TableCell>{getScoreLabel(row.userForecast)}</TableCell>
                ) : (
                  <TableCell>
                    <Chip
                      label={getScoreLabel(row.userForecast)}
                      icon={
                        row.userForecast === row.officialScore ? (
                          <Check color="inherit" />
                        ) : (
                          <Close color="inherit" />
                        )
                      }
                      sx={{
                        backgroundColor:
                          row.userForecast === row.officialScore
                            ? '#4CAF50'
                            : '#F44336',
                        color: 'white',
                      }}
                    />
                  </TableCell>
                )}
                {room.isClosed && (
                  <TableCell>{getScoreLabel(row.officialScore)}</TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export const UserMatchesTable = memo(UserMatchesTableInternal);
