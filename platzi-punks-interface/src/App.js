import { Route, Routes } from "react-router-dom";
import Home from "./views/home";
import Punks from "./views/punks";
import Punk from "./views/punk";
import MainLayout from "./layouts/main";

function App() { 
  return (
    <MainLayout>
      <Routes>
        <Route path="/" exact element={<Home/>} />
        <Route path="/punks" exact element={<Punks/>} />
        <Route path="/punks/:tokenId" exact element={<Punk/>} />
      </Routes>
    </MainLayout>
  );
}

export default App;

