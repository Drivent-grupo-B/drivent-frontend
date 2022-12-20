import styled from 'styled-components';
import { Typography } from '@material-ui/core';

import HotelCard from '../../../components/Hotel/HotelCard.js';
import useBooking from '../../../hooks/api/useBooking.js';
import useHotel from '../../../hooks/api/useHotel.js';

function MapHotels(hotel, header) {
  return(
    <>
      <StyledTypography variant="h6">{ header }</StyledTypography>        
      <CardsContainer>
        {
          hotel ? hotel.map((hotel) => (
            <HotelCard hotel={hotel} key={hotel.id}/>
          )
          )
            :
            'Não tem hotéis cadastrados!'
        }
      </CardsContainer>
    </>
  );
}

function selectHotels() {
  const { booking } = useBooking(); 
  const { hotels } = useHotel();

  let header = 'Primeiro, escolha seu hotel:';  
  if(!hotels) return [];
  
  if(!booking) {
    return MapHotels(hotels, header);
  }
  header = 'Você já escolheu seu quarto:';

  const oneHotel = hotels.filter( (hotel) => booking.Room.hotelId === hotel.id);
  
  oneHotel[0]['reserved']=true;

  oneHotel[0]['selectHotels']=selectHotels;

  return MapHotels(oneHotel, header);
}

export default function Hotels() {
  return(
    <>
      {
        selectHotels()          
      }
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 27px !important;
`;

const CardsContainer = styled.div`
  display: flex ;
  width: 100% ;
`;
