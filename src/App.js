import { Routes, Route, Navigate } from 'react-router-dom';
import React, { useContext, Suspense } from 'react';
import LoadingSpinner from './shared/components/ui/LoadingSpinner';
import AuthContext from './shared/context/auth-context';
import Layout from './shared/components/layout/Layout';
const Teachers = React.lazy(() => import('./posts/pages/Teachers'));
const TeacherDetail = React.lazy(() => import('./posts/pages/TeacherDetail'));
const Auth = React.lazy(() => import('./user/pages/Auth'));
const Profile = React.lazy(() => import('./user/pages/Profile'));
const Post = React.lazy(() => import('./user/pages/Post'));

const App = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <Layout>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {isLoggedIn && <Route path="/user/post" element={<Post />} />}
          {isLoggedIn && <Route path="/user/profile" element={<Profile />} />}
          {!isLoggedIn && <Route path="/auth" element={<Auth />} />}
          <Route path="/" element={<Teachers />} />
          <Route path="/post/:id" element={<TeacherDetail />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </Layout>
  );
};

export default App;
