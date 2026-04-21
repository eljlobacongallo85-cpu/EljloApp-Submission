import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import AuthNav from './Auth.Nav';
import MainNav from './MainNav';

const Navigation = () => {
  const { data } = useSelector(state => state.auth);
  const isLoggedIn = !!data;

  return (
    <NavigationContainer>
      {isLoggedIn ? <MainNav /> : <AuthNav />}
    </NavigationContainer>
  );
};

export default Navigation;
