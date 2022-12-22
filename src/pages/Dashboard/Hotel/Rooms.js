import Button from '../../../components/Form/Button.js';
import { useContext, useState } from 'react';
import styled from 'styled-components';
import RoomCard from '../../../components/Hotel/RoomCard';
import HotelContext from '../../../contexts/HotelContext';
import useUpsertBooking from '../../../hooks/api/useUpsertBooking.js';
import { toast } from 'react-toastify';

export default function Rooms({ setIsClicked, isClicked, setNewBooking }) {
  const [selectedRoom, setSelectedRoom] = useState({});
  const { selectedHotel, setSelectedHotel } = useContext(HotelContext);
  const { postNewBooking } = useUpsertBooking(); 
  if (!selectedHotel.id || isClicked) return '';  
  async function bookRoom() {
    try {
      const newBooking = await postNewBooking({ roomId: selectedRoom.id });
      setNewBooking(newBooking);
      setIsClicked(true);
      setSelectedHotel({});
      toast('Quarto reservado com sucesso!');
    } catch (error) {
      toast('Ocorreu um erro com sua reserva!');
    }
  }

  return (
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
      {selectedRoom.hotelId === selectedHotel.id ? <Button onClick={bookRoom}>Reservar Quarto</Button> : ''}
    </RoomsContainer>
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
    font-size: 14px;
  }
`;
