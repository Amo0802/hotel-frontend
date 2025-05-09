import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import LanguageSelection from './pages/LanguageSelection';
import Login from './pages/Login';
import CheckIn from './pages/CheckIn';
import Home from './pages/Home';
import FoodDining from './pages/FoodDining';
import RoomService from './pages/RoomService';
import Amenities from './pages/Amenities';
import HotelMap from './pages/HotelMap';
import LocalAttractions from './pages/LocalAttractions';
import CleanRoom from './pages/CleanRoom';
import Maintenance from './pages/Maintenance';
import LostFound from './pages/LostFound';
import Feedback from './pages/Feedback';
import Chatbot from './pages/Chatbot';
import CheckOut from './pages/CheckOut';
import './styles/global.css';

const App: React.FC = () => {
  const { isLoggedIn, isCheckedIn } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LanguageSelection />} />
        <Route path="/login" element={<Login />} />
        
        {/* Protected routes that require authentication */}
        <Route path="/check-in" element={<CheckIn />}/>
          {/* isLoggedIn ? (isCheckedIn ? <Navigate to="/home" /> : <CheckIn />) : <Navigate to="/login" />
        } /> */}
        
        {/* Protected routes that require both login and check-in */}
        <Route path="/home" element={<Home />}/>
          {/* isLoggedIn && isCheckedIn ? <Home /> : <Navigate to={isLoggedIn ? "/check-in" : "/login"} />
        } /> */}
        <Route path="/food-dining" element={<FoodDining />}/>
          {/* isLoggedIn && isCheckedIn ? <FoodDining /> : <Navigate to={isLoggedIn ? "/check-in" : "/login"} />
        } /> */}
        <Route path="/room-service" element={<RoomService />}/>
          {/* isLoggedIn && isCheckedIn ? <RoomService /> : <Navigate to={isLoggedIn ? "/check-in" : "/login"} />
        } /> */}
        <Route path="/amenities" element={<Amenities />}/>
          {/* isLoggedIn && isCheckedIn ? <Amenities /> : <Navigate to={isLoggedIn ? "/check-in" : "/login"} />
        } /> */}
        <Route path="/hotel-map" element={<HotelMap />}/>
          {/* isLoggedIn && isCheckedIn ? <HotelMap /> : <Navigate to={isLoggedIn ? "/check-in" : "/login"} />
        } /> */}
        <Route path="/local-attractions" element={<LocalAttractions />}/>
          {/* isLoggedIn && isCheckedIn ? <LocalAttractions /> : <Navigate to={isLoggedIn ? "/check-in" : "/login"} />
        } /> */}
        <Route path="/clean-room" element={<CleanRoom />}/>
          {/* isLoggedIn && isCheckedIn ? <CleanRoom /> : <Navigate to={isLoggedIn ? "/check-in" : "/login"} />
        } /> */}
        <Route path="/maintenance" element={<Maintenance />}/>
          {/* isLoggedIn && isCheckedIn ? <Maintenance /> : <Navigate to={isLoggedIn ? "/check-in" : "/login"} />
        } /> */}
        <Route path="/lost-found" element={<LostFound />}/>
          {/* isLoggedIn && isCheckedIn ? <LostFound /> : <Navigate to={isLoggedIn ? "/check-in" : "/login"} />
        } /> */}
        <Route path="/feedback" element={<Feedback />}/>
          {/* isLoggedIn && isCheckedIn ? <Feedback /> : <Navigate to={isLoggedIn ? "/check-in" : "/login"} />
        } /> */}
        <Route path="/chatbot" element={<Chatbot />}/>
          {/* isLoggedIn && isCheckedIn ? <Chatbot /> : <Navigate to={isLoggedIn ? "/check-in" : "/login"} />
        } /> */}
        <Route path="/check-out" element={<CheckOut />}/>
          {/* isLoggedIn && isCheckedIn ? <CheckOut /> : <Navigate to={isLoggedIn ? "/check-in" : "/login"} />
        } /> */}
      </Routes>
    </Router>
  );
};

export default App;
