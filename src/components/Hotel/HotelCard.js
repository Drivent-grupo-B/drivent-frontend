import styled from 'styled-components';

export default function HotelCard(hotel) {
  return (
    <HotelContainer>
      <img src={hotel.image}/>
      <h2>{hotel.name}</h2>
    </HotelContainer>
  );
}

const HotelContainer = styled.div`
  width: 600px;
  height: 200px;
  background-color: blue;
  color: black;
`;
