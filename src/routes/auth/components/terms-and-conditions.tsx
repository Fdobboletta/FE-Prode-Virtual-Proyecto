import {
  FormControlLabel,
  Checkbox,
  Typography,
  Box,
  Container,
} from '@mui/material';

type TermsAndConditionsProps = {
  termsAccepted: boolean;
  onChange: (checked: boolean) => void;
};

const TermsAndConditions = (props: TermsAndConditionsProps) => {
  return (
    <Container maxWidth="sm">
      <Typography variant="h6" gutterBottom>
        Términos y Condiciones
      </Typography>
      <Box
        sx={{
          maxHeight: 300,
          overflow: 'auto',
          border: '1px solid #ccc',
          p: 2,
        }}
      >
        {/* TODO: Agregar terminos y condiciones*/}
      </Box>
      <FormControlLabel
        control={
          <Checkbox
            checked={props.termsAccepted}
            onChange={(_, checked) => props.onChange(checked)}
          />
        }
        label="Acepto los términos y condiciones"
      />
    </Container>
  );
};

export default TermsAndConditions;
