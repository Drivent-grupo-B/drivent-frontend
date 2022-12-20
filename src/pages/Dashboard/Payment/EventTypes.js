import OptionBoxStyle from '../../../components/Payment/OptionBoxStyle';
import TicketTypeContainer from '../../../components/Payment/TicketTypeContainer';

export default function EventTypes({ ticketTypes, selectedType, setSelectedType, setTicketTypeId }) {
  return (
    <TicketTypeContainer>
      <h2>Primeiro, escolha sua modalidade de ingresso</h2>
      <div>
        {ticketTypes
          .filter((type) => !type.includesHotel)
          .map((type) => (
            <OptionBox
              type={type}
              key={type.id}
              setSelectedType={setSelectedType}
              selectedType={selectedType}
              setTicketTypeId={setTicketTypeId}
            />
          ))}
      </div>
    </TicketTypeContainer>
  );
}

function OptionBox({ type, setSelectedType, setTicketTypeId, selectedType }) {
  function handleOption() {
    setSelectedType({ name: type.name, price: type.price });
    setTicketTypeId(type.id);
  }
  
  return (
    <OptionBoxStyle selectedType={selectedType.name ? selectedType.name : ''} name={type.name} onClick={handleOption}>
      <h3>{type.name}</h3>
      <span>R$ {type.price / 100}</span>
    </OptionBoxStyle>
  );
}
