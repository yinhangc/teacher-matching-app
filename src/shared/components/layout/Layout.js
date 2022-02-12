import MainHeader from '../navigation/MainHeader';

const Layout = (props) => {
  return (
    <>
      <MainHeader />
      <main className="w-[90%] max-w-3xl mx-auto my-12 ">{props.children}</main>
    </>
  );
};

export default Layout;
