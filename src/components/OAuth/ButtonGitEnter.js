import styled from 'styled-components';
import Button from '../../components/Form/Button';
 
export default styled(Button)`
  margin-top: 8px !important;
  height: 36.5px ;
  background: linear-gradient(to right,#FA4098,#FFD77F);
  :hover{
    background: linear-gradient(to right,#fc3293,#fcce68);
  }
  span{
    width: 70%;
    justify-content: space-around ;
    margin: 0px 35px 0px 0px ;
  }
  
  h1{
    text-align: center ;
    font-size: 14px;
    margin: 0px 0px 0px 0px ;
  }
  
  img{
    filter: drop-shadow(0px 0px 0px #ededed) invert(100%) ;
    height: 36.5px ;
  }
`;
