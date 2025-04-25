import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const Home = () => {
  const { currentUser } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const handleGetStarted = () =>{
    navigate('/sign-up');
  } 
  const handleLearnMore = () => {
    navigate('/about');
  }

  return (
    <div className="min-h-[600px] bg-gradient-to-br from-slate-100 to-white flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4 text-center">
        Welcome to MERN Auth App
      </h1>
      <p className="text-lg text-slate-600 text-center max-w-xl mb-6">
        A secure and modern authentication app built with MongoDB, Express, React, and Node.js.
      </p>
      <div className="flex gap-4">
        {!currentUser && 
        <a
          onClick={handleGetStarted}
          className="px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition cursor-pointer"
        >
          Get Started
        </a> }
        <a
          onClick={handleLearnMore}
          className="px-6 py-3 border border-slate-700 text-slate-700 rounded-lg hover:bg-slate-100 transition cursor-pointer"
        >
          Learn More
        </a>
      </div>
    </div>
  );
};

export default Home;
