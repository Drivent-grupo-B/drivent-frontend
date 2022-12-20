import styled from 'styled-components';

export default function ForbiddenPage({ children }) {
  return (
    <ForbiddenComponent>
      <p>{children}</p>
    </ForbiddenComponent>
  );
}

const ForbiddenComponent = styled.section`
  width: 100%;
  text-align: center;
  height: 80%;
  display: flex;
  align-items: center;
  justify-content: center;

  p {
    width: 500px;
    font-size: 20px;
    color: #8e8e8e;
  }
`;
