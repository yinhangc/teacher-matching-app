import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Teachers from './teachers/pages/Teachers';
import TeacherDetail from './teachers/pages/TeacherDetail';
import Auth from './user/pages/Auth';
import Post from './user/pages/Post';
import Layout from './shared/components/layout/Layout';

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Teachers />} />
          <Route path="/:id" element={<TeacherDetail />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/post" element={<Post />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
