import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

// icons
import { MdPerson, MdEmail, MdLock, MdArrowForward, MdSecurity, } from "react-icons/md";
import { toastify } from '../../utils/toastify'

// google
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../config/firebase";

// components
import Input from "../../components/forms/Input";
import Button from "../../components/Button";
import Image from "../../components/media/Image";

// hooks
import { useRegister, useGoogleLogin } from '../../hooks/useAuth'

const Register = () => {
  const navigate = useNavigate();

  const { mutate, isPending, } = useRegister();
  const { mutate: googleLogin, isPending: isGoogleLoading } = useGoogleLogin();


  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      termsAccepted: false,
    },
  });
  const password = watch("password");

  const onSubmit = (data) => {
    mutate(data, {
      onSuccess: (res) => {
        toastify.success(res?.message || "Registration successful!");

        const role = res?.results?.user?.role;
        navigate(role === "admin" ? "/admin" : "/");
      },
      onError: (error) => {
        toastify.error(
          error.response?.data?.message || "Registration failed"
        );
      },
    });
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);

      const firebaseToken = await result?.user?.getIdToken();

      googleLogin(firebaseToken, {
        onSuccess: (res) => {
          toastify.success(
            res?.message || "Google login successful!"
          );

          const role = res?.results?.user?.role;

          navigate(role === "admin" ? "/admin" : "/");
        },
        onError: (error) => {
          toastify.error(
            error.response?.data?.message || "Google login failed"
          );
        },
      });
    } catch (error) {
      console.error("Google login failed:", error);

      toastify.error(
        error?.code === "auth/popup-closed-by-user"
          ? "Google login was cancelled"
          : "Google login failed"
      );
    }
  };

  return (

    <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-4 sm:px-6">
      <div className="animate-auth-card grid w-full max-w-5xl overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg lg:grid-cols-[42%_58%]">


        {/* Left Side */}
        <section className="relative hidden min-h-105 overflow-hidden lg:block">
          <Image
            src="https://res.cloudinary.com/dyiuqcqg2/image/upload/v1790512237/register_qgpc3k.png"
            alt="Authify secure authentication"
            className="animate-auth-image absolute inset-0 h-full w-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-linear-to-br from-green-950/80 via-green-900/50 to-green-800/20" />

          {/* Glowing Cores */}
          <div className="pointer-events-none absolute left-[12%] top-[20%] h-4 w-4 rounded-full bg-green-200/80 shadow-[0_0_25px_8px_rgba(134,239,172,0.45)] animate-pulse" />

          <div className="pointer-events-none absolute right-[18%] top-[18%] h-3 w-3 rounded-full bg-emerald-200/80 shadow-[0_0_25px_8px_rgba(167,243,208,0.45)] animate-pulse [animation-delay:700ms]" />

          <div className="pointer-events-none absolute left-[28%] bottom-[22%] h-3 w-3 rounded-full bg-green-200/80 shadow-[0_0_25px_8px_rgba(134,239,172,0.4)] animate-pulse [animation-delay:400ms]" />

          <div className="pointer-events-none absolute right-[8%] bottom-[28%] h-4 w-4 rounded-full bg-green-200/80 shadow-[0_0_30px_10px_rgba(134,239,172,0.45)] animate-pulse [animation-delay:1000ms]" />

          {/* Large Glowing Bubbles */}
          <div className="pointer-events-none absolute -left-10 top-[8%] h-40 w-40 rounded-full bg-green-300/25 blur-3xl animate-pulse" />

          <div className="pointer-events-none absolute -right-7.5 top-[5%] h-52 w-52 rounded-full bg-emerald-300/20 blur-3xl animate-pulse [animation-delay:700ms]" />

          <div className="pointer-events-none absolute left-[35%] -top-7.5 h-28 w-28 rounded-full bg-green-400/25 blur-2xl animate-pulse [animation-delay:300ms]" />

          <div className="pointer-events-none absolute -right-8 top-[38%] h-36 w-36 rounded-full bg-green-300/25 blur-3xl animate-pulse [animation-delay:1000ms]" />

          <div className="pointer-events-none absolute -left-12 bottom-[8%] h-48 w-48 rounded-full bg-emerald-300/20 blur-3xl animate-pulse [animation-delay:500ms]" />

          <div className="pointer-events-none absolute right-[20%] -bottom-7.5 h-32 w-32 rounded-full bg-green-400/25 blur-2xl animate-pulse [animation-delay:1200ms]" />

          {/* Content */}
          <div className="relative z-10 flex h-full flex-col justify-between p-6">
            {/* Logo */}
            <Link
              to="/"
              className="flex w-fit rounded-md bg-white shadow-md transition-transform duration-200 hover:scale-105"
            >
              <Image
                src="https://res.cloudinary.com/dyiuqcqg2/image/upload/v1790512102/mainlogo_qndlrt.png"
                alt="Authify"
                className="h-9 w-auto object-contain"
              />
            </Link>

            {/* Center Content */}
            <div className="animate-auth-content max-w-sm">
              <div className="mb-2.5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-bold tracking-widest text-white backdrop-blur-sm">
                <MdSecurity size={13} />
                SECURE AUTHENTICATION
              </div>

              <h2 className="text-3xl font-extrabold leading-tight text-white">
                Create your{" "}
                <span className="text-green-500">Authify</span> account.
              </h2>

              <p className="mt-2 text-sm leading-5 text-white/90">
                Join Authify and manage your account with a secure and simple
                authentication experience.
              </p>

              {/* Features */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                <span className="rounded-full border border-white/10 bg-white/10 px-2.5 py-1 text-[10px] font-medium text-white/80 backdrop-blur-sm">
                  JWT Authentication
                </span>

                <span className="rounded-full border border-white/10 bg-white/10 px-2.5 py-1 text-[10px] font-medium text-white/80 backdrop-blur-sm">
                  Google Login
                </span>

                <span className="rounded-full border border-white/10 bg-white/10 px-2.5 py-1 text-[10px] font-medium text-white/80 backdrop-blur-sm">
                  Secure Cookies
                </span>

                <span className="rounded-full border border-white/10 bg-white/10 px-2.5 py-1 text-[10px] font-medium text-white/80 backdrop-blur-sm">
                  Protected Routes
                </span>
              </div>

              {/* Technologies */}
              <div className="mt-3 flex flex-wrap items-center gap-1.5 text-[10px] text-white/90">
                <span>MERN Stack</span>
                <span>•</span>
                <span>MongoDB</span>
                <span>•</span>
                <span>Express</span>
                <span>•</span>
                <span>React</span>
                <span>•</span>
                <span>Node.js</span>
                <span>•</span>
                <span>Tailwind</span>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between gap-4">
              <p className="text-xs text-white/70">
                © {new Date().getFullYear()} Authify
              </p>

              <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] text-white/70 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.9)]" />
                All systems secure
              </div>
            </div>
          </div>
        </section>

        {/* Right Side */}
        <section className="flex items-center justify-center px-5 py-4">
          <div className="animate-auth-form w-full">
            {/* Mobile Logo */}
            <Link to="/" className="mb-4 flex lg:hidden">
              <Image
                src="https://res.cloudinary.com/dyiuqcqg2/image/upload/v1790512102/mainlogo_qndlrt.png"
                alt="Authify"
                className="h-9 w-auto object-contain"
              />
            </Link>

            {/* Heading */}
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-[10px] font-bold tracking-widest text-green-700">
                <MdSecurity size={13} />
                CREATE ACCOUNT
              </span>

              <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-gray-900">
                Create your account
              </h1>

              <p className="mt-1 text-sm leading-5 text-gray-500">
                Create your Authify account and get started.
              </p>
            </div>

            {/* Google */}
            <Button
              type="button"
              disabled={isGoogleLoading}
              loading={isGoogleLoading}
              onClick={handleGoogleLogin}
              className="mt-4 flex h-10 w-full items-center justify-center gap-2.5 border border-gray-200 bg-white px-4 text-sm font-semibold text-gray-700 transition-all duration-200 hover:border-green-300 hover:bg-green-50/90 hover:shadow-sm active:scale-[0.99]"
            >
              <svg
                viewBox="0 0 48 48"
                className="h-4 w-4 shrink-0"
                aria-hidden="true"
              >
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 3.06 13.22l7.98 6.19C12.77 13.72 17.88 9.5 24 9.5Z"
                />
                <path
                  fill="#4285F4"
                  d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.76 7.18l7.73 6C44.42 37.95 46.98 31.75 46.98 24.55Z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.04 28.59A14.4 14.4 0 0 1 9.25 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.52 2.56 10.78l7.48-6.19Z"
                />
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.15 1.45-4.89 2.3-8.18 2.3-6.12 0-11.23-4.22-12.96-9.91l-7.98 6.19C6.51 43.62 14.62 48 24 48Z"
                />
              </svg>

              Continue with Google
            </Button>

            {/* Divider */}
            <div className="my-3.5 flex items-center gap-3">
              <div className="h-px flex-1 bg-gray-100" />
              <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                Or
              </span>
              <div className="h-px flex-1 bg-gray-100" />
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-4 grid grid-cols-1 gap-x-3 gap-y-2.5 sm:grid-cols-2"
            >
              {/* Name */}
              <div>
                <Input
                  label="Full Name"
                  type="text"
                  placeholder="Enter your full name"
                  icon={MdPerson}
                  iconPosition="left"
                  iconClassName="text-green-600"
                  {...register("name", {
                    required: "Full name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters",
                    },
                  })}
                />

                {errors.name && (
                  <p className="mt-0.5 text-xs font-medium text-red-500">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="you@example.com"
                  icon={MdEmail}
                  iconPosition="left"
                  iconClassName="text-green-600"
                  {...register("email", {
                    required: "Email address is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email address",
                    },
                  })}
                />

                {errors.email && (
                  <p className="mt-0.5 text-xs font-medium text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <Input
                  label="Password"
                  type="password"
                  placeholder="Create a password"
                  icon={MdLock}
                  iconPosition="left"
                  iconClassName="text-green-600"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                />

                {errors.password && (
                  <p className="mt-0.5 text-xs font-medium text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <Input
                  label="Confirm Password"
                  type="password"
                  placeholder="Confirm your password"
                  icon={MdLock}
                  iconPosition="left"
                  iconClassName="text-green-600"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                />

                {errors.confirmPassword && (
                  <p className="mt-0.5 text-xs font-medium text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Terms */}
              <div className="sm:col-span-2 pt-0.5">
                <label className="flex cursor-pointer items-start gap-2 text-xs leading-4.5 text-gray-500">
                  <input
                    type="checkbox"
                    className="mt-0.5 h-4 w-4 shrink-0 rounded border-gray-300 accent-green-600"
                    {...register("termsAccepted", {
                      required: "You must agree to the terms",
                    })}
                  />

                  <span>
                    I agree to the{" "}
                    <Link
                      to="/terms"
                      className="font-semibold text-green-700 hover:text-green-800"
                    >
                      Terms & Conditions
                    </Link>{" "}
                    and{" "}
                    <Link
                      to="/privacy"
                      className="font-semibold text-green-700 hover:text-green-800"
                    >
                      Privacy Policy
                    </Link>
                  </span>
                </label>

                {errors.agreeTerms && (
                  <p className="mt-0.5 text-xs font-medium text-red-500">
                    {errors.agreeTerms.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <div className="sm:col-span-2">
                <Button
                  type="submit"
                  fullWidth
                  variant="success"
                  loading={isPending}
                  loadingText="Creating account..."
                  className="flex items-center justify-center gap-2"
                  icon={MdArrowForward}
                  text=" Create Account"
                  iconPosition="end"
                />

              </div>
            </form>

            {/* Login */}
            <p className="mt-3 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-bold text-green-700 transition-colors hover:text-green-800"
              >
                Sign in
              </Link>
            </p>

            {/* Security */}
            <div className="mt-2 flex items-center justify-center gap-2 border-t border-gray-100 pt-2 text-xs text-gray-400">
              <MdSecurity size={14} className="shrink-0 text-green-600" />
              Your account security matters to us.
            </div>
          </div>
        </section>
      </div>
    </main>

  );
};

export default Register;