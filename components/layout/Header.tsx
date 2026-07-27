import Navbar from '../navigation/Navbar';

const Header = () => {
  return (
    <header className='border-border sticky top-0 border-b py-4 backdrop-blur-2xl'>
      <div className='page-wrapper'>
        <Navbar />
      </div>
    </header>
  );
};

export default Header;
