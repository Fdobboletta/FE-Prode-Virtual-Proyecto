import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TextField } from '@mui/material';
import styled from 'styled-components';
import { memo } from 'react';

const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export type CreateOrUpdateMatchFormData = {
  homeTeam: string;
  awayTeam: string;
  startDate: Date;
};

type CreateOrUpdateMatchFormProps = {
  onInputChange: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  onDateChange: (newDate: Date | null) => void;
  formData: CreateOrUpdateMatchFormData;
};

const CreateOrUpdateMatchFormInternal = (
  props: CreateOrUpdateMatchFormProps
) => {
  return (
    <Form>
      <TextField
        label="Equipo Local"
        margin="normal"
        variant="outlined"
        name="homeTeam"
        fullWidth
        value={props.formData.homeTeam}
        onChange={props.onInputChange}
      />
      <TextField
        label="Equipo Visitante"
        margin="normal"
        variant="outlined"
        name="awayTeam"
        fullWidth
        value={props.formData.awayTeam}
        onChange={props.onInputChange}
      />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Dia del Partido"
          value={props.formData.startDate}
          disablePast
          slotProps={{
            textField: {
              fullWidth: true,
              sx: { marginTop: '16px', marginBottom: '8px' },
            },
          }}
          onChange={props.onDateChange}
        />
      </LocalizationProvider>
    </Form>
  );
};

export const CreateOrUpdateMatchForm = memo(CreateOrUpdateMatchFormInternal);
