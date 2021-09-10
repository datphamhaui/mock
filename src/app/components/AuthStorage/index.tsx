/**
 *
 * AuthStorage
 *
 */
import jwt from 'jsonwebtoken';
import { useHistory } from 'react-router-dom';

import AuthStorageContext from 'utils/AuthStorageContext';

export default function AuthStorage(props) {
  //======================== Hook ========================
  const history = useHistory();
  //======================== Callback ========================
  const get = () => {
    try {
      if (localStorage.getItem('auth')) {
        let decoded = jwt.verify(localStorage.getItem('auth'), 'shhhhh');
        return decoded;
      }
      return null;
    } catch (err) {
      localStorage.clear();
      history.push('/');
    }
  };

  const set = (data, redirect) => {
    let auth = {
      token: data.token,
      email: data.email,
      image: data.image,
      username: data.username,
      bio: data.bio,
    };
    jwt.sign(auth, 'shhhhh', (err, token) => {
      if (!err) {
        localStorage.setItem('auth', token);
        history.push(redirect);
      }
    });
  };
  //======================== Render ========================
  return <AuthStorageContext.Provider value={{ get, set }}>{props.children}</AuthStorageContext.Provider>;
}
