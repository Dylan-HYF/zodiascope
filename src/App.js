import './App.scss'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { Header } from './routes/Header'

import { Login } from './routes/Login'
import { Bot } from './routes/Bot'
import { Home } from './routes/Home'
import { ZodiacPreview } from './routes/ZodiacPreview'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="bot" element={<Bot />} />
          <Route path="preview" element={<ZodiacPreview />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
