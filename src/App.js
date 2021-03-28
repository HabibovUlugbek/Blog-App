import { useSelector } from 'react-redux';
import Blogs from './components/Blogs';
import Homepage from './components/Homepage';
import Navbar from './components/Navbar';
import { selectSignedIn } from './features/userSlice';
import './styling/app.css'

function App() {
  const isSignedIn = useSelector(selectSignedIn)
  return (
    <div className="App">
      <Navbar />
      <Homepage />
      {isSignedIn && <Blogs />}
    </div>
  );
}

export default App;
