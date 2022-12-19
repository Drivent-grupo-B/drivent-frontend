import styled from 'styled-components';
import RoomCard from '../../../components/Hotel/RoomCard';
import useHotelRooms from '../../../hooks/api/useHotelRooms';

export default function Hotels({ selectedHotelId }) {
  if (!selectedHotelId) return '';
  const { rooms } = useHotelRooms(selectedHotelId);

  return (
    <RoomsContainer>
      <h2>Ótima pedida! Agora escolha seu quarto:</h2>
      <div>
        {rooms.map((room) => (
          <RoomCard room={room} key={room.id} />
        ))}
      </div>
    </RoomsContainer>
  );
}

const RoomsContainer = styled.section`
  display: flex;
  flex-direction: column;

  h2{
    font-size: 20px;
    color: #8e8e8e;
    margin-bottom: 33px;
  }

  >div{
    display: flex;
    flex-wrap: wrap;
    row-gap: 17px;
    column-gap: 8px;
  }
`;
