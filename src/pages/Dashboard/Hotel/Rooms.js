import Button from '../../../components/Form/Button.js';
import { useContext, useState } from 'react';
import styled from 'styled-components';
import RoomCard from '../../../components/Hotel/RoomCard';
import HotelContext from '../../../contexts/HotelContext';
import useUpsertBooking from '../../../hooks/api/useUpsertBooking.js';
import { toast } from 'react-toastify';
import useBooking from '../../../hooks/api/useBooking.js';

export default function Rooms() {
  const [selectedRoom, setSelectedRoom] = useState(0);
  const { selectedHotel } = useContext(HotelContext);
  const { postNewBooking } = useUpsertBooking();  
  let { booking } = useBooking();  
  
  function bookRoom() {
    try {
      postNewBooking({ roomId: selectedRoom });
      toast('Quarto reservado com sucesso!');
    } catch (error) {
      toast('Ocorreu um erro com sua reserva!');
    }
  }

  return (
    booking ? 
      <Button onClick={() => booking = false}>Trocar de Quarto</Button>
      :
      selectedHotel.id ?
        <RoomsContainer>
          <h4>Ótima pedida! Agora escolha seu quarto:</h4>
          <div>
            {selectedHotel.Rooms.map((room) => (
              <RoomCard 
                key={room.id} 
                room={room} 
                selectedRoom={selectedRoom} 
                setSelectedRoom={setSelectedRoom} />
            ))}
          </div>
          {selectedRoom ? <Button onClick={bookRoom}>Reservar Quarto</Button> : ''}
        </RoomsContainer>
        : 
        ''
  );
}

const RoomsContainer = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 52px;
  padding-bottom: 100px;

  h4 {
    font-size: 20px;
    color: #8e8e8e;
    margin-bottom: 33px;
  }

  > div {
    display: flex;
    flex-wrap: wrap;
    row-gap: 8px;
    column-gap: 17px;
    margin-bottom: 46px;
  }

  > button {
    width: 182px;
    height: 37px;
  }
`;
