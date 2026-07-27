import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useAuthstore } from '../store/user.authstore'


export const Login = () => {

    const login = useAuthstore((state) => state.login);
    const loading = useAuthstore((state) => state.loading);

    const navigate = useNavigate();

    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validation = () => {

        const { email, password } = formData;

        const newErrors = {};

        // email validation
        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(email)) {
            newErrors.email = 'Email is invalid';
        }

        // password validation
        const passwordRegex = /^.{8,}$/;
        if (!password) {
            newErrors.password = 'Password is required';
        } else if (!passwordRegex.test(password)) {
            newErrors.password = 'Password must be at least 8 characters long';
        }

        return newErrors;

    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validation();

        if (Object.keys(validationErrors).length === 0) {
            setErrors({});

            const result = await login(formData)

            if (result.success) {
                navigate('/')
                toast.success(result.message)
            }else{
                toast.error(result.message)
            }

        } else {
            setErrors(validationErrors);
        }
    }


    return (
        <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden p-5">

            <div className="w-full max-w-sm p-4 space-y-2 backdrop-blur-[2px] rounded-lg shadow-xl bg-white/40 border border-gray-200   ">

                <h2 className="text-2xl font-bold text-center">SIGN IN</h2>

                <form className="space-y-2" onSubmit={handleSubmit}>

                    {/* email */}
                    <div>
                        <label className="block text-md font-semibold ">
                            Email</label>

                        <input
                            type="email"
                            className={`mt-1 w-full px-2 py-1 border ${errors.email ? 'border-red-500' : 'border-gray-700'} text-black font-semibold
                            rounded shadow-sm focus:outline-none `}
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                        />

                        {errors.email && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.email}</p>}
                    </div>

                    {/* password */}
                    <div>
                        <label className="block text-md font-semibold ">
                            Password</label>

                        <input
                            type="password"
                            className={`mt-1 w-full px-2 py-1 border ${errors.password ? 'border-red-500' : 'border-gray-700'} text-black font-semibold
                            rounded shadow-sm focus:outline-none`}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                        />
                        {errors.password && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.password}</p>}
                        <Link className="text-xs inline text-blue-600 hover:underline mt-1 font-semibold">
                            Forgot Password?
                        </Link>
                    </div>


                    <div className="flex items-center flex-col justify-between w-full gap-2">
                        <button

                            disabled={loading}
                            type="submit"
                            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none  cursor-pointer transition-all font-semibold"
                        >
                            {loading ? "logging in..." : "login"}
                        </button>

                        <p className="text-sm text-gray-600 font-semibold">
                            Don't have an account? <Link to="/register" className="text-blue-600 hover:underline">
                                Sign Up
                            </Link>
                        </p>
                    </div>

                </form>

                {/* icons */}
                <div className="flex justify-center items-center gap-4 mt-2 lg:mt-3">
                    <button
                        className="p-2 rounded-lg hover:scale-105 transition transform duration-300 shadow-lg cursor-pointer"
                    >
                        <img
                            className="w-5 h-5 cur"
                            loading="lazy"
                            src="https://ucarecdn.com/8f25a2ba-bdcf-4ff1-b596-088f330416ef/"
                            alt="Google"
                        />
                    </button>

                    <button
                        className="p-2 rounded-lg hover:scale-105 transition transform duration-300 shadow-lg cursor-pointer"
                    >
                        <img
                            className="w-5 h-5"
                            loading="lazy"
                            src="https://seekicon.com/free-icon-download/github_24.png"
                            alt="GitHub"
                        />
                    </button>
                    <button
                        className="p-2 rounded-lg hover:scale-105 transition transform duration-300 shadow-lg cursor-pointer"
                    >
                        <img
                            className="w-5 h-5"
                            loading="lazy"
                            src="https://ucarecdn.com/6f56c0f1-c9c0-4d72-b44d-51a79ff38ea9/"
                            alt="Facebook"
                        />
                    </button>

                </div>
            </div>



        </div>
    )
}
