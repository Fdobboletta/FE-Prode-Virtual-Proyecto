import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { InputAdornment, TextField } from '@mui/material';
import styled from 'styled-components';
import { memo } from 'react';
import { isToday } from 'date-fns';

const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export type CreateOrUpdateRoomFormData = {
  name: string;
  entryPrice: number;
  prizeMoney: number;
  dueDate: Date;
  dueTime: Date;
};

type CreateOrUpdateRoomFormProps = {
  onInputChange: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  onDateChange: (newDate: Date | null) => void;
  onTimeChange: (newTime: Date | null) => void;
  formData: CreateOrUpdateRoomFormData;
};

const CreateOrUpdateRoomFormInternal = (props: CreateOrUpdateRoomFormProps) => {
  return (
    <Form>
      <TextField
        label="Nombre"
        margin="normal"
        variant="outlined"
        name="name"
        fullWidth
        value={props.formData.name}
        onChange={props.onInputChange}
      />
      <TextField
        label="Precio de entrada"
        margin="normal"
        variant="outlined"
        type="number"
        name="entryPrice"
        fullWidth
        value={props.formData.entryPrice}
        onChange={props.onInputChange}
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
      />
      <TextField
        label="Premio en dinero"
        margin="normal"
        variant="outlined"
        type="number"
        name="prizeMoney"
        fullWidth
        value={props.formData.prizeMoney}
        onChange={props.onInputChange}
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
      />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Fecha límite"
          value={props.formData.dueDate}
          disablePast
          slotProps={{
            textField: {
              fullWidth: true,
              sx: { marginTop: '16px', marginBottom: '8px' },
            },
          }}
          onChange={props.onDateChange}
        />
        <TimePicker
          label="Hora límite"
          value={props.formData.dueTime}
          disablePast={isToday(props.formData.dueDate)}
          slotProps={{
            textField: {
              fullWidth: true,
              sx: { marginTop: '16px', marginBottom: '8px' },
            },
          }}
          onChange={props.onTimeChange}
        />
      </LocalizationProvider>
    </Form>
  );
};

export const CreateOrUpdateRoomForm = memo(CreateOrUpdateRoomFormInternal);
