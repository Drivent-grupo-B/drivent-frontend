import { useState } from 'react';
import styled from 'styled-components';
import OptionBoxStyle from '../../../components/Payment/OptionBoxStyle';
import TicketTypeContainer from '../../../components/Payment/TicketTypeContainer';
import TicketSummaryMessage from './TicketSummaryMessage';

export default function HotelsOptions({ ticketTypes, selectedType, setTicketTypeId, ticketTypeId,  setIsReserved }) {
  const [hotelType, setHotelType] = useState({});
  if (Object.keys(selectedType).length === 0) return '';
  
  return (
    <HotelOptionsContainer>
      <h2>Ótimo! Agora escolha sua modalidade de hospedagem</h2>
      <div>
        {ticketTypes
          .filter((type) => type.name === 'Presencial')
          .map((type) => (
            <IncludesHotelBox
              type={type}
              name={type.includesHotel ? 'Com Hotel' : 'Sem Hotel'}
              key={type.id}
              setTicketTypeId={setTicketTypeId}
              hotelType={hotelType}
              setHotelType={setHotelType}
            />
          ))}
      </div>
      {hotelType.name ? (
        <TicketSummaryMessage selectedOption={hotelType} ticketTypeId={ticketTypeId}  setIsReserved={setIsReserved}/>
      ) : (
        ''            
      )}
    </HotelOptionsContainer>
  );
}

function IncludesHotelBox({ type, name, setTicketTypeId, setHotelType, hotelType }) {
  function handleHotelOption() {
    setTicketTypeId(type.id);
    setHotelType({ name, price: type.price });
  }
  
  return (
    <HotelBoxStyle hotelType={hotelType.name ? hotelType.name : ''} name={name} onClick={handleHotelOption}>
      <h3>{name}</h3>
      <span>+ R$ {type.price / 100 - 250}</span>
    </HotelBoxStyle>
  );
}

const HotelOptionsContainer = styled(TicketTypeContainer)`
  margin-top: 44px;
`;

const HotelBoxStyle = styled(OptionBoxStyle)`
  border: ${(props) => (props.name === props.hotelType ? 'none' : '1px solid #cecece')};
  background-color: ${(props) => (props.name === props.hotelType ? '#FFEED2' : '#ffffff')};
`;
