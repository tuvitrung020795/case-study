import "./App.scss";
import { BrowserRouter } from "react-router-dom";
import Wrapper from "./components/wrapper";
import RouterSwitch from "./components/RouterSwitch";

function App() {
  return (
    <BrowserRouter>
      <Wrapper>
        <RouterSwitch />
      </Wrapper>
    </BrowserRouter>
  );
}

export default App;
