/* eslint-disable react/no-unescaped-entities */
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
        Términos y Condiciones 1. Introducción Estos términos y condiciones (en
        adelante, "los Términos") establecen los derechos y obligaciones de los
        usuarios (en adelante, "los Usuarios") al utilizar nuestra plataforma en
        línea (en adelante, "la Plataforma"). Al acceder y utilizar la
        Plataforma, aceptas quedar legalmente vinculado por estos Términos. Si
        no estás de acuerdo con alguno de estos términos, por favor, no utilices
        nuestra Plataforma. 2. Uso de la Plataforma a) La Plataforma brinda a
        los Usuarios la posibilidad de participar en la creación y organización
        de pronósticos deportivos, así como interactuar con otros Usuarios. b)
        Los Usuarios reconocen y aceptan que la Plataforma no es un servicio de
        apuestas o juegos de azar. La Plataforma actúa únicamente como un medio
        para facilitar la comunidad y la interacción entre los Usuarios. c) Los
        Usuarios son responsables de cumplir con todas las leyes y regulaciones
        aplicables, incluida la Ley Nacional de Juegos de Azar y cualquier
        legislación provincial relacionada, en caso de que decidan crear y
        organizar pronósticos deportivos. 3. Responsabilidad del Usuario a) Los
        Usuarios que decidan crear y organizar pronósticos deportivos asumen la
        responsabilidad total y exclusiva de cumplir con todas las leyes y
        regulaciones aplicables, incluidas las relacionadas con el juego de
        azar. La Plataforma no se hace responsable por las actividades de los
        Usuarios en relación con la creación y organización de pronósticos
        deportivos. b) Los Usuarios garantizan que poseen todos los derechos
        necesarios para crear y publicar los pronósticos deportivos en la
        Plataforma, y que no infringen los derechos de terceros. 4. Privacidad y
        Protección de Datos a) La Plataforma recopila y procesa datos personales
        de acuerdo con la legislación vigente en materia de protección de datos.
        Consulta nuestra Política de Privacidad para obtener información
        detallada sobre cómo se recopilan, utilizan y protegen tus datos
        personales. 5. Modificaciones y Terminación a) Nos reservamos el derecho
        de realizar modificaciones en estos Términos en cualquier momento. Los
        cambios entrarán en vigencia a partir de su publicación en la
        Plataforma. Se recomienda a los Usuarios revisar periódicamente los
        Términos actualizados. b) Nos reservamos el derecho de suspender,
        modificar o interrumpir la Plataforma en cualquier momento y sin previo
        aviso. 6. Ley Aplicable y Jurisdicción Estos Términos se regirán e
        interpretarán de acuerdo con las leyes de la República Argentina.
        Cualquier disputa que surja en relación con los Términos estará sujeta a
        la jurisdicción exclusiva de los tribunales competentes de la República
        Argentina. 7. Exención de Responsabilidad a) Los Usuarios reconocen y
        aceptan que la Plataforma no es responsable de las acciones, pronósticos
        o decisiones individuales de los Usuarios. b) La Plataforma no garantiza
        la exactitud, integridad o confiabilidad de los pronósticos deportivos
        creados por los Usuarios. Cada Usuario es responsable de realizar sus
        propias investigaciones y tomar decisiones basadas en su propio
        criterio. c) En ningún caso la Plataforma será responsable por cualquier
        pérdida, daño o perjuicio directo, indirecto, incidental, consecuente o
        especial que pueda surgir como resultado del uso de la Plataforma o de
        la participación en los pronósticos deportivos. d) Los Usuarios
        reconocen y aceptan que la Plataforma no ofrece asesoramiento
        financiero, legal o profesional de ningún tipo, y que cualquier decisión
        tomada basada en la información o contenido proporcionado en la
        Plataforma es responsabilidad exclusiva del Usuario. e) La exención de
        responsabilidad se aplicará en la máxima medida permitida por la ley
        aplicable. En caso de que alguna disposición de esta exención de
        responsabilidad sea considerada inválida o inaplicable, las demás
        disposiciones seguirán siendo válidas y aplicables 8. Contrato de
        Licencia a) El uso de la Plataforma está sujeto a un contrato de
        licencia separado. Al utilizar la Plataforma, aceptas los términos y
        condiciones establecidos en el contrato de licencia adjunto como Anexo
        A, que forma parte integral de estos Términos. b) Puedes acceder al
        contrato de licencia completo en el siguiente{' '}
        <a
          target="_blank"
          href="https://drive.google.com/file/d/1mhrFqZfGAY0IWlPx0jW3NG9fJg7RSUKf/view?usp=sharing"
          rel="noreferrer"
        >
          enlace
        </a>
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
