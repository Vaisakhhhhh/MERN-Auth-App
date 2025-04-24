import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearError, loginFailure, loginStart, loginSuccess } from "../../redux/admin/adminSlice";

const Login = () => {
  const { currentAdmin, loading, error } = useSelector((state) => state.admin);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);
  
  useEffect(() => {
    if(currentAdmin) {
      navigate("/admin-dashboard", { replace: true });
    }
  }, [currentAdmin, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    return newErrors;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if(Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      dispatch(loginStart());

      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success === false) {
        dispatch(loginFailure(data));
        return;
      }
      dispatch(loginSuccess(data));
      navigate('/admin-dashboard');
    } catch (error) {
      dispatch(loginFailure(error));
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-full max-w-md px-8 py-10 bg-white rounded-lg">
        <h2 className="text-3xl font-semibold text-center mb-6">Admin Login</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <input
              type="email"
              placeholder="Email"
              id="email"
              onChange={handleChange}
              
              className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
            {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
          </div>
          <div>
            <input
              type="text"
              placeholder="Password"
              id="password"
              onChange={handleChange}
              
              className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
            {errors.password && <p className="text-red-600 text-sm">{errors.password}</p>}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition duration-200"
          >
            {loading ? 'Loading...' : 'Sign In'}
          </button>
        </form>
        <p className="text-red-700 mt-5">
          {error ? error.message || "Something went wrong!" : ""}
        </p>
      </div>
    </div>
  );
};

export default Login;
