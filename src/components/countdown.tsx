import { useState, useEffect } from 'react';
import { formatDistanceToNow, differenceInSeconds } from 'date-fns';
import { es } from 'date-fns/locale';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import { toRem } from '@/utils';

const CountdownContainer = styled.div`
  padding: ${toRem(16)};
  border-radius: ${toRem(4)};
`;

const CountdownText = styled(Typography)`
  font-size: 1.5rem;
`;

type CountdownProps = {
  targetDate: string;
  label: string;
};

const Countdown = (props: CountdownProps) => {
  const [timeRemaining, setTimeRemaining] = useState(
    formatDistanceToNow(new Date(props.targetDate), {
      includeSeconds: true,
      locale: es,
    })
  );

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const targetTime = new Date(props.targetDate);

    const updateRemaining = () => {
      const currentTime = new Date();

      if (targetTime <= currentTime) {
        // Si la fecha objetivo es igual o menor a la fecha actual, muestra "Sala vencida"
        setTimeRemaining('Sala vencida');
        clearInterval(interval);
        return;
      }

      const remaining = Math.max(
        0,
        differenceInSeconds(targetTime, currentTime)
      );

      if (remaining <= 60) {
        // Si quedan 60 segundos o menos, actualiza cada segundo
        setTimeRemaining(`${remaining} segundo${remaining !== 1 ? 's' : ''}`);
        clearInterval(interval);
        interval = setInterval(updateRemaining, 1000);
      } else {
        // Si quedan más de 60 segundos, actualiza cada minuto
        setTimeRemaining(
          formatDistanceToNow(targetTime, {
            includeSeconds: true,
            locale: es,
          })
        );
        clearInterval(interval);
        interval = setInterval(updateRemaining, 60000);
      }
    };

    updateRemaining(); // Llama a la función una vez para establecer el intervalo inicial

    return () => {
      clearInterval(interval);
    };
  }, [props.targetDate]);

  return (
    <CountdownContainer>
      <CountdownText variant="subtitle2">
        {props.label} {timeRemaining}
      </CountdownText>
    </CountdownContainer>
  );
};

export default Countdown;
