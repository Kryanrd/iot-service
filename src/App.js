import './App.css';
import Login from './Components/Login/Login';
import Header from './Components/Header/Header';
import DevicesPage from './Components/DevicesPage/DevicesPage';
import Footer from './Components/Footer/Footer';

function App() {
  
  return (
    <div>
      <Header/>
      <DevicesPage/>
      <Footer/>
      {/* <Login/> */}
    </div>
  );
}

export default App;