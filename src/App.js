import { Routes, Route, Navigate } from 'react-router-dom';
import Teachers from './posts/pages/Teachers';
import TeacherDetail from './posts/pages/TeacherDetail';
import Auth from './user/pages/Auth';
import Post from './user/pages/Post';
import Profile from './user/pages/Profile';
import Layout from './shared/components/layout/Layout';
import AuthContext from './shared/context/auth-context';
import { useContext } from 'react';

const App = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <Layout>
      <Routes>
        {isLoggedIn && <Route path="/user/post" element={<Post />} />}
        {isLoggedIn && <Route path="/user/profile" element={<Profile />} />}
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<Teachers />} />
        <Route path="/:id" element={<TeacherDetail />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Layout>
  );
};

export default App;
