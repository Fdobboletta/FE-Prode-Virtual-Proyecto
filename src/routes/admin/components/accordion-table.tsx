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

type AccordionTableProps = {
  title: string;
  dataLength: number;
  children: JSX.Element;
  keepExpanded?: boolean;
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
  const [expanded, setExpanded] = useState(props.keepExpanded);

  const handleAccordionChange = () => {
    if (props.keepExpanded) return;
    setExpanded(!expanded);
  };

  return (
    <StyledAccordion expanded={expanded} onChange={handleAccordionChange}>
      <StyledAccordionSummary
        aria-controls="panel-content"
        id="panel-header"
        expandIcon={<ArrowForward />}
      >
        <Typography>{`${props.title} (${props.dataLength})`}</Typography>
      </StyledAccordionSummary>
      <StyledAccordionDetails>{props.children}</StyledAccordionDetails>
    </StyledAccordion>
  );
};

export const AccordionWithTable = memo(AccordionWithTableInternal);
