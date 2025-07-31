import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './page/HomePage'
import './App.css';
import Entrepots from './page/Entrepots';
import Garage from './page/Garage';
import Quotas from './page/Quotas';
import EntrepotsSecret from './components/EntrepotsSecret';

function App() {
  return (
<BrowserRouter>
<Routes>
  <Route path="/" element={<HomePage/>}/>
  <Route path="/entrepots" element={<Entrepots/>}/>
  <Route path="/garage" element={<Garage/>}/>
  <Route path='/quotas' element={<Quotas/>}/>
  <Route path='/secret' element={<EntrepotsSecret/>}/>
</Routes>
</BrowserRouter>
  );
}

export default App;
