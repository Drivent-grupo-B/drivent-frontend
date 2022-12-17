import { useEffect, useState } from 'react';
import styled from 'styled-components';

export default function HotelCard({ hotel }) {
  const [capacity, setCapacity] = useState(0);

  useEffect(() => {
    let cont = 0;
    hotel.Rooms.map((room) => {
      cont += room.capacity - room._count.Booking;
    } );
    setCapacity(cont);
  }, []);

  return (
    <HotelContainer>
      <img src={hotel.image} alt={hotel.image}/>
      <h2>{hotel.name}</h2>
      <span>Tipos de acomodação:</span>
      <span><h3> descrisão </h3></span>
      <span>vagas disponiveis:</span>
      <span><h3>{capacity}</h3></span>

    </HotelContainer>
  );
}

const HotelContainer = styled.div`
  width: 196px;
  height: 264px;
  border-radius: 10px;
  background-color: #EBEBEB;
  color: #343434;
  padding: 16px 14px;
  display: flex;
  flex-direction: column; 
  justify-content: flex-start;
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

  }
  span{
    font-weight: 700;
    font-size: 12px;
    line-height: 14px;
    h3{
      margin: 0px 0px 10px 0px ;
      font-weight: 400;
    }
  }



`;
