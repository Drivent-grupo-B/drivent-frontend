import styled from 'styled-components';

export default function HotelCard({ hotel }) {
  return (
    <HotelContainer>
      <img src={hotel.image} alt={hotel.image}/>
      <h2>{hotel.name}</h2>
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
    font-size: 20px;
  }

`;
