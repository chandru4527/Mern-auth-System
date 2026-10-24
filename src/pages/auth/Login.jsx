import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

// icons
import { MdEmail, MdLock, MdArrowForward, MdSecurity, } from "react-icons/md";
import { toastify } from '../../utils/toastify'

// google
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../config/firebase";

// components
import Input from "../../components/forms/Input";
import Button from "../../components/Button";
import Image from "../../components/media/Image";

// hooks
import { useLogin, useGoogleLogin } from '../../hooks/useAuth';

const Login = () => {
  const navigate = useNavigate();

  const { mutate, isPending } = useLogin();
  const { mutate: googleLogin, isPending: isGoogleLoading } = useGoogleLogin();

  const { register, handleSubmit, formState: { errors, isSubmitting }, } = useForm({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = (data) => {
    mutate(data, {
      onSuccess: (res) => {
        toastify.success("Login successful!");

        const role = res?.results?.user?.role;
        navigate(role === "admin" ? "/admin" : "/");
      },
      onError: (error) => {
        toastify.error(
          error.response?.data?.message || "Login failed"
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
          toastify.success("Login successful!");

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
    <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4 sm:px-6">
      <div className="animate-auth-card grid w-full max-w-5xl overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg lg:grid-cols-[50%_50%]">

        {/* Left Image */}
        <section className="relative hidden min-h-120 overflow-hidden lg:block">
          <Image
            src="https://res.cloudinary.com/dyiuqcqg2/image/upload/v1790512235/login_page_uzzu09.png"
            alt="Authify secure authentication"
            className="animate-auth-image absolute inset-0 h-full w-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-linear-to-br from-green-950/90 via-green-900/65 to-green-800/30" />

          {/* Glowing Bubbles */}
          <div className="pointer-events-none absolute left-[8%] top-[15%] h-20 w-20 rounded-full bg-green-400/15 blur-2xl animate-pulse" />
          <div className="pointer-events-none absolute right-[12%] top-[10%] h-32 w-32 rounded-full bg-emerald-300/10 blur-3xl animate-pulse [animation-delay:700ms]" />
          <div className="pointer-events-none absolute left-[42%] top-[8%] h-8 w-8 rounded-full bg-green-300/20 blur-xl animate-pulse [animation-delay:300ms]" />
          <div className="pointer-events-none absolute right-[5%] top-[42%] h-16 w-16 rounded-full bg-green-400/15 blur-2xl animate-pulse [animation-delay:1000ms]" />
          <div className="pointer-events-none absolute left-[5%] bottom-[25%] h-28 w-28 rounded-full bg-emerald-300/10 blur-3xl animate-pulse [animation-delay:500ms]" />
          <div className="pointer-events-none absolute right-[28%] bottom-[12%] h-12 w-12 rounded-full bg-green-300/15 blur-xl animate-pulse [animation-delay:1200ms]" />

          {/* Small Glowing Dots */}
          <div className="pointer-events-none absolute left-[20%] top-[28%] h-2 w-2 rounded-full bg-green-200/50 shadow-[0_0_15px_rgba(134,239,172,0.8)] animate-pulse" />
          <div className="pointer-events-none absolute right-[20%] top-[32%] h-3 w-3 rounded-full bg-green-300/40 shadow-[0_0_18px_rgba(134,239,172,0.8)] animate-pulse [animation-delay:800ms]" />
          <div className="pointer-events-none absolute left-[30%] bottom-[25%] h-2.5 w-2.5 rounded-full bg-emerald-200/40 shadow-[0_0_15px_rgba(167,243,208,0.8)] animate-pulse [animation-delay:400ms]" />
          <div className="pointer-events-none absolute right-[8%] bottom-[30%] h-2 w-2 rounded-full bg-green-200/50 shadow-[0_0_15px_rgba(134,239,172,0.8)] animate-pulse [animation-delay:1500ms]" />

          {/* Content */}
          <div className="relative z-10 flex h-full flex-col justify-between p-7">

            {/* Logo */}
            <Link
              to="/"
              className="flex w-fit rounded-md bg-white shadow-md transition-transform duration-200 hover:scale-105"
            >
              <Image
                src="https://res.cloudinary.com/dyiuqcqg2/image/upload/v1790512102/mainlogo_qndlrt.png"
                alt="Authify"
                className="h-10 w-auto object-contain"
              />
            </Link>

            {/* Center Content */}
            <div className="animate-auth-content max-w-sm">

              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-bold tracking-widest text-white backdrop-blur-sm">
                <MdSecurity size={13} />
                SECURE AUTHENTICATION
              </div>

              <h2 className="text-3xl font-extrabold leading-tight text-white">
                Welcome back to{" "}
                <span className="text-green-500">Authify.</span>
              </h2>

              <p className="mt-3 text-sm leading-6 text-white/90">
                Securely access your account and manage everything from one simple
                place.
              </p>

              {/* Authify Features */}
              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-[10px] font-medium text-white/80 backdrop-blur-sm">
                  JWT Authentication
                </span>

                <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-[10px] font-medium text-white/80 backdrop-blur-sm">
                  Google Login
                </span>

                <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-[10px] font-medium text-white/80 backdrop-blur-sm">
                  Secure Cookies
                </span>

                <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-[10px] font-medium text-white/80 backdrop-blur-sm">
                  Protected Routes
                </span>
              </div>

              {/* Technologies */}
              <div className="mt-4 flex items-center gap-2 text-[10px] text-white/90">
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
              <p className="text-xs text-white/80">
                © {new Date().getFullYear()} Authify
              </p>

              <div className="flex items-center gap-2 text-[10px] text-white/70">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.9)]" />
                Secure & Protected
              </div>
            </div>
          </div>
        </section>

        {/* Right Form */}
        <section className="flex items-center justify-center px-5 py-6 sm:px-9 lg:px-10">
          <div className="animate-auth-form w-full max-w-md">
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
                SECURE LOGIN
              </span>

              <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-gray-900">
                Welcome back
              </h1>

              <p className="mt-1 text-sm leading-5 text-gray-500">
                Sign in to your Authify account to continue.
              </p>
            </div>

            {/* Google */}
            <Button
              type="button"
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
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">

              {/* Email */}
              <div>
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="you@example.com"
                  // inputClassName="border-green-700"
                  icon={MdEmail}
                  iconPosition="left"
                  iconClassName="text-green-700"
                  {...register("email", {
                    required: "Email address is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email address",
                    },
                  })}
                />

                {errors.email && (
                  <p className="mt-1 text-xs font-medium text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <Input
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                  icon={MdLock}
                  iconPosition="left"
                  iconClassName="text-green-700"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                />

                {errors.password && (
                  <p className="mt-1 text-xs font-medium text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Remember / Forgot */}
              <div className="flex items-center justify-between gap-3">
                <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 accent-green-600"
                    {...register("rememberMe")}
                  />
                  Remember me
                </label>

                <Link
                  // to="/forgot-password"
                  className="text-sm font-semibold text-green-700 transition-colors hover:text-green-800"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Sign In */}
              <Button
                type="submit"
                fullWidth
                variant="themeDark"
                disabled={isPending}
                loading={isPending}
                loadingText="Signing in..."
                className="mt-3! flex items-center justify-center gap-2"
                icon={MdArrowForward}
                iconPosition="end"
                text=" Sign In"
              />

            </form>

            {/* Register */}
            <p className="mt-4 text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-bold text-green-700 transition-colors hover:text-green-800"
              >
                Create an account
              </Link>
            </p>

            {/* Security */}
            <div className="mt-3 flex items-center justify-center gap-2 border-t border-gray-100 pt-3 text-xs text-gray-400">
              <MdSecurity size={14} className="shrink-0 text-green-600" />
              Your account security matters to us.
            </div>

          </div>
        </section>
      </div>
    </main>
  );
};

export default Login;