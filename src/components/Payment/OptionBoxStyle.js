import styled from 'styled-components';

export default styled.div`
  width: 145px;
  height: 145px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  border: ${(props) => (props.name === props.selectedType ? 'none' : '1px solid #cecece')};
  border-radius: 20px;
  background-color: ${(props) => (props.name === props.selectedType ? '#FFEED2' : '#ffffff')};
  transition: none;
  h3 {
    font-size: 16px;
    color: #454545;
  }
  span {
    font-size: 14px;
    color: #898989;
  }
  &:hover {
    cursor: pointer;
    filter: brightness(0.96);
  }
`;
