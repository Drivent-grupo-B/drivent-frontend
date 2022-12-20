import { useContext } from 'react';
import styled from 'styled-components';
import RoomCard from '../../../components/Hotel/RoomCard';
import HotelContext from '../../../contexts/HotelContext';

export default function Rooms() {
  const { selectedHotel } = useContext(HotelContext);
  if (!selectedHotel.id) return '';

  return (
    <RoomsContainer>
      <h4>Ótima pedida! Agora escolha seu quarto:</h4>
      <div>
        {selectedHotel.Rooms.map((room) => (
          <RoomCard key={room.id} room={room}/>
        ))}
      </div>
    </RoomsContainer>
  );
}

const RoomsContainer = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 52px;

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
    margin-bottom: 200px;
  }
`;
