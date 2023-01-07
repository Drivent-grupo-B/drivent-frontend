import styled from 'styled-components';

export default styled.div`
  width: 100%;
  height: 350px;
  padding: 10px 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #d7d7d7;
  overflow: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`;
