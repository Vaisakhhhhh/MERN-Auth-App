
const About = () => {
  return (
    <div className="min-h-fit bg-white py-12 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
          About MERN Auth App
        </h2>
        <p className="text-slate-600 mb-6">
          MERN Auth App is a full-stack authentication system built with the MERN stack.
          It offers secure login, JWT-based authentication, protected routes, and more.
        </p>
        <div className="text-left space-y-4 mt-10">
          <h3 className="text-xl font-semibold text-slate-700">✨ Features:</h3>
          <ul className="list-disc list-inside text-slate-600">
            <li>Sign up, Sign in, and Sign out</li>
            <li>Protected Profile Route</li>
            <li>Password hashing with bcrypt</li>
            <li>JWT-based auth with HttpOnly cookies</li>
            <li>Cloudinary Image Upload</li>
          </ul>

          <h3 className="text-xl font-semibold text-slate-700 mt-6">🛠 Tech Stack:</h3>
          <ul className="list-disc list-inside text-slate-600">
            <li>MongoDB + Mongoose</li>
            <li>Express.js & Node.js</li>
            <li>React + Redux Toolkit</li>
            <li>Tailwind CSS</li>
          </ul>

          <h3 className="text-xl font-semibold text-slate-700 mt-6">🚀 What's next?</h3>
          <p className="text-slate-600">
            We’re planning to add Google OAuth, email verification, and a dashboard. Stay tuned!
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
