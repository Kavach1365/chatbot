import {Routes,Route,BrowserRouter} from 'react-router-dom'
import './App.css';
import Landing from './components/Landing/Landing';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path = '/' Component={Landing}/>
        <Route exact path = '/home' Component={Home}/>
        <Route exact path = '/login' Component={Login}/>
        <Route exact path = '/signup' Component={SignUp}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
