import { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import HotelContext from '../../contexts/HotelContext';
import useBooking from '../../hooks/api/useBooking';

export default function HotelCard({ hotel, newBooking }) {
  const { setSelectedHotel, selectedHotel } = useContext(HotelContext);
  const [capacity, setCapacity] = useState(0);
  const [roomTypes, setRoomTypes] = useState('');
  const roomTypeCorrespondence = {
    1: 'Single',
    2: 'Double',
    3: 'Triple',
  };

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

  function renderRoomTypes() {
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

    if (roomTypes[3]) return 'Triple';

    return 'Sem quartos registrados';
  }

  function Reserved(reserved) {
    let header = 'Tipos de acomodação:';
    let renderRoom = renderRoomTypes();
    let secondHeader = 'Vagas disponíveis:';
    let cont = capacity;    
    const { booking } = useBooking();

    if(reserved && booking) {      
      const roomName = booking.Room.name;
      const roomType = roomTypeCorrespondence[booking.Room.capacity];

      const roomBookings = hotel.Rooms.filter(room => room.id === booking.Room.id || room.id === newBooking?.Room.id)[0]._count.Booking;
      const roomOccupants = newBooking ? roomBookings : roomBookings - 1;
      cont = defineRoomOccupation(roomOccupants);

      header = 'Quarto reservado';
      renderRoom = `${ roomName } (${ roomType })`;
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

  function defineRoomOccupation(occupants) {
    if (occupants === 0) return 'Somente você';

    return `Você e mais ${occupants} pessoas`;
  }

  function showRooms({ hotel }) {
    if(!hotel.reserved) {
      setSelectedHotel(hotel);
    }
  }

  return (
    <HotelContainer 
      reserved={selectedHotel.id ? selectedHotel.id : false} 
      id={hotel.id} 
      onClick={() => showRooms({ hotel })}>
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
  background-color: ${props => props.reserved ===  props.id ? '#FFEED2': '#EBEBEB'};
  font-size: 12px;
  color: #343434;
  padding: 16px 14px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right: 19px;
  img {
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
  h3 {
    font-weight: 700;
  }

  &:hover{
    filter: brightness(0.95);
    cursor: pointer;
  }
`;
