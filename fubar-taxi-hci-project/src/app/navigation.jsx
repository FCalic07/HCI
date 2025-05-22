// components/Navigation.jsx
'use client'

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-violet-950 bg-opacity-80 z-50 py-4 px-8">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">FUBAR</div>
        <div className="flex space-x-6">
          <a href="#hero" className="text-white hover:text-red-300 transition-colors">Home</a>
          <a href="#about" className="text-white hover:text-red-300 transition-colors">About Us</a>
          <a href="#fubar" className="text-white hover:text-red-300 transition-colors">FUBAR</a>
          <a href="#cards" className="text-white hover:text-red-300 transition-colors">Services</a>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
