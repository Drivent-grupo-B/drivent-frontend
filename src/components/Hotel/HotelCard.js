import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useHotelRooms from '../../hooks/api/useHotelRooms';

export default function HotelCard({ hotel }) {
  const [capacity, setCapacity] = useState(0);
  const [roomTypes, setRoomTypes] = useState('');

  useEffect(() => {
    let cont = 0;
    const roomTypesAvailable = {
      1: 0,
      2: 0,
      3: 0,
    };
    hotel.Rooms.forEach((room) => {
      cont += room.capacity - room._count.Booking;
      if (room.capacity - room._count.Booking > 0) roomTypesAvailable[room.capacity] += 1;
    });
    setCapacity(cont);
    setRoomTypes(roomTypesAvailable);
  }, []);
  const { rooms } = useHotelRooms(hotel.id);

  let vacancies =0;
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

  function Reserved(reserved) {
    let header = 'Tipos de acomodação:';
    let renderRoom = renderRoomTypes();
    let secondHeader = 'Vagas disponíveis:';
    const cont = capacity;

    if(reserved) {
      header = 'Quarto reservado';
      renderRoom = `${ cont } (${ renderRoomTypes() })`;
      secondHeader = 'Pessoas no seu quarto';
    }

    return(
      <>
        <h3>{ header }</h3>
        <p>{ renderRoom }</p>
        <h3>{ secondHeader }</h3>
        <p>{ cont }</p>
      </>
    );
  }

  function renderRoomTypes() {
    if (!roomTypes) return '';
    if (roomTypes[1] && roomTypes[2] && roomTypes[3]) {
      return 'Single, Double e Triple';
    }

    if (roomTypes[1] && roomTypes[2]) {
      return 'Single e Double';
    }

    if (roomTypes[1] && roomTypes[3]) {
      return 'Single e Triple';
    }

    if (roomTypes[2] && roomTypes[3]) {
      return 'Double e Triple';
    }
    
    if (roomTypes[1]) return 'Single';
    
    if (roomTypes[2]) return 'Double';

    return 'Triple';
  }

  return (
    <HotelContainer reserved={hotel.reserved}>
      <img src={hotel.image} alt={hotel.image}/>
      <h2>{hotel.name}</h2>
      {Reserved(hotel.reserved)}
    </HotelContainer>
  );
}

const HotelContainer = styled.div`
  width: 196px;
  height: 264px;
  border-radius: 10px;
  background-color: ${props => props.reserved ? '#FFEED2': '#EBEBEB'};
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
    margin: 0px 0px 10px 0px ;
    font-size: 20px;
    margin-bottom: 10px;
  }
  h3{
    font-weight: 700;
  }
`;
