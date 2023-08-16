/* eslint-disable prettier/prettier */
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  styled,
} from '@mui/material';
import { ArrowForward } from '@mui/icons-material/';
import { memo, useState } from 'react';
import TableWithSortingAndSearch from './table-sort-search';
import { Room } from '@/generated/graphql-types.generated';

type AccordionTableProps = {
  title: string;
  data: Room[];
};

const StyledAccordion = styled(Accordion)`
  width: 100%;
`;

const StyledAccordionSummary = styled(AccordionSummary)`
  background-color: ${(props) => props.theme.palette.primary.main};
  color: white;

  .MuiAccordionSummary-expandIconWrapper {
    color: white;
  }

  &.Mui-expanded {
    .MuiAccordionSummary-expandIconWrapper {
      transform: rotate(90deg);
    }
  }
`;

const StyledAccordionDetails = styled(AccordionDetails)`
  padding: 0;
`;

const AccordionWithTableInternal = (props: AccordionTableProps) => {
  const [expanded, setExpanded] = useState(false);

  const handleAccordionChange = () => {
    setExpanded(!expanded);
  };

  return (
    <StyledAccordion expanded={expanded} onChange={handleAccordionChange}>
      <StyledAccordionSummary
        aria-controls="panel-content"
        id="panel-header"
        expandIcon={<ArrowForward />}
      >
        <Typography>{`${props.title} (${props.data.length})`}</Typography>
      </StyledAccordionSummary>
      <StyledAccordionDetails>
        <TableWithSortingAndSearch data={props.data} />
      </StyledAccordionDetails>
    </StyledAccordion>
  );
};

export const AccordionWithTable = memo(AccordionWithTableInternal);
