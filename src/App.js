import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Authentication/Login';
import SignUp from './components/Authentication/SignUp';
import ForgotPassword from './components/Authentication/ForgotPassword';
import UserProfile from './components/UserProfile/UserProfile';
import RequireAuth from './components/RequireAuth/RequireAuth';
import About from './components/About/About';
import SocialLinks from './components/SocialLinks/SocialLinks';
import Interests from './components/Interests/Interests';
import Home from './components/Home/Home';
import { ProfileContext } from './components/contexts/ProfileContext';
import { useState } from 'react';


function App() {
  const [profile, setProfile] = useState({});
  const [profileId, setProfileId] = useState(null);
  const [userId, setUserId] = useState(0);
  return (
    <div>
      <ProfileContext.Provider value={{
        profile,
        setProfile,
        userId,
        setUserId,
        profileId,
        setProfileId,
      }}>
        <Routes>
          <Route path='/:userId' element={<RequireAuth>
            <Home />
          </RequireAuth>} />
          <Route path='/' element={
            <Login />
          } />
          <Route path='/userProfile/:id' element={<RequireAuth>
            <UserProfile />
          </RequireAuth>}>
            <Route path='about' element={<About />} />
            <Route path='socialLinks' element={<SocialLinks />} />
            <Route path='interests' element={<Interests />} />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/signUp' element={<SignUp />} />
          <Route path='/forgotPassword' element={<ForgotPassword />} />
        </Routes>
      </ProfileContext.Provider>
    </div>
  );
}

export default App;
