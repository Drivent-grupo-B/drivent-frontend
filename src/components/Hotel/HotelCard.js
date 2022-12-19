import styled from 'styled-components';
import useHotelRooms from '../../hooks/api/useHotelRooms';

export default function HotelCard({ hotel }) {
  const { rooms } = useHotelRooms(hotel.id);
  let vacancies = 0;
  const roomTypesAvailable = {
    1: 0,
    2: 0,
    3: 0,
  };
  
  if (rooms) {
    rooms.Rooms.forEach(room => {
      vacancies += room.capacity;
      roomTypesAvailable[room.capacity] += 1;
    });
  }

  function renderRoomTypes() {
    if (roomTypesAvailable[1] && roomTypesAvailable[2] && roomTypesAvailable[3]) {
      return 'Single, Double e Triple';
    }

    if (roomTypesAvailable[1] && roomTypesAvailable[2]) {
      return 'Single e Double';
    }

    if (roomTypesAvailable[1] && roomTypesAvailable[3]) {
      return 'Single e Triple';
    }

    if (roomTypesAvailable[2] && roomTypesAvailable[3]) {
      return 'Double e Triple';
    }
    
    if (roomTypesAvailable[1]) return 'Single';
    
    if (roomTypesAvailable[2]) return 'Double';

    return 'Triple';
  }

  return (
    <HotelContainer>
      <img src={hotel.image} alt={hotel.image}/>
      <h2>{hotel.name}</h2>
      <h3>Tipos de acomodação:</h3>
      <p>{ renderRoomTypes() }</p>
      <h3>Vagas disponíveis:</h3>
      <p>{ vacancies }</p>
    </HotelContainer>
  );
}

const HotelContainer = styled.div`
  width: 196px;
  height: 264px;
  border-radius: 10px;
  background-color: #EBEBEB;
  font-size: 12px;
  color: #343434;
  padding: 16px 14px;
  display: flex;
  flex-direction: column; 
  align-items: flex-start;
  margin-right: 19px;
  img{
    width: 168px;
    height: 109px;
    border-radius: 5px;
    margin-bottom: 10px;
  }
  h2{
    font-size: 20px;
    margin-bottom: 10px;
  }
  h3{
    font-weight: 700;
  }
`;
