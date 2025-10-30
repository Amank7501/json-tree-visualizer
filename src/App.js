import { BrowserRouter, Routes, Route } from "react-router-dom";
import Render from "./components/Render/Render";



function App() { 
  return (
    <BrowserRouter>
     
      <Routes>
        <Route path="/" element={<Render />} />

      </Routes>
    </BrowserRouter>
  );
}
export default App;
