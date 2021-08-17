import styled from "styled-components";
import Router from './Router'

// type activeType = {
//   active: boolean;
// };

const FullContainer = styled.div`
  display : flex;
  justify-content : center;
  align-items : center;
  width : 80% auto;
`;

const App = () => {


  return (
      <FullContainer>
        <Router />
      </FullContainer>
  );
};

export default App;
