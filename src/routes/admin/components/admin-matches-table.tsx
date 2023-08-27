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
} from '@mui/material';
import styled from 'styled-components';
import { Match, Score } from '@/generated/graphql-types.generated';
import { toRem } from '@/utils';
import { format } from 'date-fns';
import { LockOpen, LockOutlined, MoreHoriz } from '@mui/icons-material';
import { MatchesTableRowMenu } from './matches-table-row-menu';
import useUrlState from '@ahooksjs/use-url-state';

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
  onEditMatch: (matchId: string) => void;
  onDeleteMatch: (matchId: string) => void;
  onScoreSelect: (matchId: string, score: Score | undefined) => void;
  onSaveScores: () => void;
};

const getScoreLabel = (score?: Score | null | undefined) => {
  if (score === Score.Home) return 'LOCAL';
  if (score === Score.Away) return 'VISITANTE';
  if (score === Score.Draw) return 'EMPATE';
  return 'No disputado';
};

const AdminMatchesTableInternal = (props: MatchesTableProps) => {
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null);
  const [urlState, setUrlState] = useUrlState<{ isEditing: '1' }>();
  const [clickCount, setClickCount] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);

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

  const [menuAnchorElement, setMenuAnchorElement] =
    useState<null | HTMLElement>(null);

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
                Resultado
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
              </StyledTableCell>
              <StyledTableCell>Acciones</StyledTableCell>
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
                {urlState.isEditing ? (
                  <TableCell>
                    <StyledSelect
                      labelId={`${row.id}-select-score`}
                      id={`${row.id}-select-score`}
                      value={row.officialScore || ''}
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
                ) : (
                  <TableCell>{getScoreLabel(row.officialScore)}</TableCell>
                )}
                <TableCell>
                  <StyledIconButton
                    onClick={(event) => {
                      event.stopPropagation();
                      setMenuAnchorElement(event.currentTarget);
                      setSelectedRowId(row.id);
                    }}
                  >
                    <MoreHoriz />
                  </StyledIconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {menuAnchorElement && selectedRowId && (
        <MatchesTableRowMenu
          matchId={selectedRowId}
          menuAnchorElement={menuAnchorElement}
          open={Boolean(menuAnchorElement) && Boolean(selectedRowId)}
          onClose={() => {
            setMenuAnchorElement(null);
            setSelectedRowId(null);
          }}
          onEdit={(matchId) => {
            props.onEditMatch(matchId);
            setMenuAnchorElement(null);
            setSelectedRowId(null);
          }}
          onDelete={(matchId) => {
            props.onDeleteMatch(matchId);
            setMenuAnchorElement(null);
            setSelectedRowId(null);
          }}
        />
      )}
    </Paper>
  );
};

export const AdminMatchesTable = memo(AdminMatchesTableInternal);
