import { toast } from 'react-toastify';
import styled from 'styled-components';
import Button from '../../../components/Form/Button';
import useCreateTicket from '../../../hooks/api/useCreateTicket';

export default function TicketSummaryMessage({ selectedOption, ticketTypeId, setIsReserved }) {
  const { postCreatedTicket } = useCreateTicket();

  const formattedPrice = (selectedOption.price / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  async function reserveTicket() {
    try {
      postCreatedTicket({ ticketTypeId });
      setIsReserved(true);
      toast('Ticket reservado com sucesso!');
    } catch (error) {
      toast('Não foi possível reservar seu ticket!');
    }
  }

  return (
    <Summary>
      <h2>
        Fechado! O total ficou em <strong>{formattedPrice}</strong>. Agora é só confirmar:
      </h2>
      <Button onClick={reserveTicket}>Reservar Ingresso</Button>
    </Summary>
  );
}

const Summary = styled.footer`
  margin-top: 44px;

  h2 {
    font-size: 20px;
    color: #8e8e8e;
    margin-bottom: 10px;
  }
`;
