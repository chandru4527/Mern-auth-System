import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAuthstore } from '../store/user.authstore'

export const Register = () => {

    const navigate = useNavigate();

    const rigister  = useAuthstore((state) => state.register)
    const loading = useAuthstore((state) => state.loading)

    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        name: '',
        userName: '',
        email: '',
        password: '',
        agreeTerms: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const validation = () => {

        const { name, userName, email, password, agreeTerms } = formData;
        let newErrors = {};

        // 1 name validation
        if (!name) {
            newErrors.name = 'Name is required';
        } else if (name.length < 3) {
            newErrors.name = 'Name must be at least 3 characters';
        }

        // 2 username validation
        const usernameRegex = /^[a-zA-Z0-9_]{3,15}$/;
        if (!userName) {
            newErrors.userName = 'Username is required';
        } if (!usernameRegex.test(userName)) {
            newErrors.userName = 'Username can only contain letters, numbers, and underscores';
        }

        // 3 email validation
        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(email)) {
            newErrors.email = 'Invalid email format';
        }

        // 4 password validation
        const passwordRegex = /^.{8,}$/;
        if (!password) {
            newErrors.password = 'Password is required';
        } else if (!passwordRegex.test(password)) {
            newErrors.password = 'Password must be at least 8 characters long';
        }

        // 5 terms validation
        if (!agreeTerms) {
            newErrors.agreeTerms = 'You must agree to the terms and conditions';
        }

        return newErrors;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validation();

        if (Object.keys(validationErrors).length === 0) {
            setErrors({});

            const result = await rigister(formData)

            if (result.success) {
                toast.success(result.message)
                navigate('/');
            }else{
                toast.error(result.message)
            }

        } else {
            setErrors(validationErrors);
        }
    };


    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6">
            <div
                className="w-full max-w-sm sm:max-w-sm p-4 sm:p-5 rounded-lg shadow-lg bg-white/40 backdrop-blur-[2px]
                            border border-gray-200" >

                {/* heading */}
                <h2 className="text-xl sm:text-2xl font-bold text-center">
                    SIGN UP
                </h2>

                {/* form */}
                <form className="space-y-2" onSubmit={handleSubmit}>

                    {/* name */}
                    <div>
                        <label className="block text-md font-semibold ">
                            Name</label>

                        <input
                            type="text"
                            className={`mt-1 w-full px-2 py-1 border ${errors.name ? 'border-red-500' : 'border-gray-700'} text-black font-semibold
                            rounded shadow-sm focus:outline-none `}
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                        />
                        {errors.name && <p className="text-xs text-red-600 mt-1 font-semibold">{errors.name}</p>}
                    </div>

                    {/* username */}
                    <div>
                        <label className="block text-md font-semibold ">
                            Username</label>

                        <input
                            type="text"
                            className={`mt-1 w-full px-2 py-1 border ${errors.userName ? 'border-red-500' : 'border-gray-700'} text-black font-semibold
                            rounded shadow-sm focus:outline-none `}
                            name="userName"
                            value={formData.userName}
                            onChange={handleChange}
                            placeholder="Enter your username"
                        />
                        {errors.userName && <p className="text-xs text-red-600 mt-1 font-semibold">{errors.userName}</p>}
                    </div>

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
                        {errors.email && <p className="text-xs text-red-600 mt-1 font-semibold">{errors.email}</p>}
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
                        {errors.password && <p className="text-xs text-red-600 mt-1 font-semibold">{errors.password}</p>}

                    </div>

                    {/* terms and conditions */}
                    <div className="">
                        <label className="flex text-xs lg:text-sm font-semibold">

                            <input type="checkbox" className="mr-2" name="agreeTerms" onChange={handleChange} />
                            I agree to the <Link to="/terms" className="text-blue-600 hover:underline">Terms & Conditions</Link>
                        </label>
                        {errors.agreeTerms && <p className="text-xs text-red-600 mt-1 font-semibold">{errors.agreeTerms}</p>}
                    </div>

                    {/* submit button */}
                    <div className="flex items-center flex-col justify-between w-full gap-2">

                        <button
                            type="submit"
                            className=" w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none  cursor-pointer transition-all font-semibold"
                        >
                            {loading ? "wait..." : "register"}
                        </button>

                        {/* already have account */}
                        <p className="text-sm text-gray-600 font-semibold">
                            Already have an account? <Link to="/login" className="text-blue-600 hover:underline">
                                Sign In
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
