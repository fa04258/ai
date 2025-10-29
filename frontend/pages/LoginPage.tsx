import React, { useState } from "react";
import { register, login } from "../services/authService";

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [registeredPassword, setRegisteredPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Email validation function
  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Password validation (minimum 6 characters, must include special symbol)
  const validatePassword = (password: string) =>
    password.length >= 6 && /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email || !password) {
      setError("Please fill in both fields.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!validatePassword(password)) {
      setError("Password must be at least 6 characters long and include a special symbol.");
      return;
    }

    if (isRegistering) {
      // Registration mode
      setRegisteredEmail(email);
      setRegisteredPassword(password);
      setMessage("Registration successful! You can now sign in.");
      setIsRegistering(false);
      setEmail("");
      setPassword("");
    } else {
      // Login mode
      if (email === registeredEmail && password === registeredPassword) {
        setMessage("Login successful!");
        onLogin(); // Proceed to the main app
      } else {
        setError("Your credentials are incorrect. Please try again or register.");
      }
    }
  };

  const handleForgotPassword = () => {
    if (!registeredEmail) {
      setError("No user registered yet. Please sign up first.");
    } else if (email === registeredEmail) {
      setMessage("Password reset link sent to your email (simulation).");
      setError("");
    } else {
      setError("Please enter your registered email address to reset password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-green-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
        <div>
          <div className="flex justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-teal-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>

          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isRegistering ? "Create an account" : "Sign in to your account"}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {isRegistering
              ? "to access the AI Skin Analyzer"
              : "to access the AI Skin Analyzer"}
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && <p className="text-sm text-red-600 text-center">{error}</p>}
          {message && <p className="text-sm text-green-600 text-center">{message}</p>}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              {isRegistering ? "Sign Up" : "Sign In"}
            </button>
          </div>

          {!isRegistering && (
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-teal-600 hover:text-teal-700"
              >
                Forgot your password?
              </button>
            </div>
          )}
        </form>

        <div className="text-center text-sm text-gray-600">
          {isRegistering ? (
            <p>
              Already have an account?{" "}
              <button
                onClick={() => {
                  setIsRegistering(false);
                  setError("");
                  setMessage("");
                }}
                className="text-teal-600 hover:text-teal-700 font-medium"
              >
                Sign In
              </button>
            </p>
          ) : (
            <p>
              Don’t have an account?{" "}
              <button
                onClick={() => {
                  setIsRegistering(true);
                  setError("");
                  setMessage("");
                }}
                className="text-teal-600 hover:text-teal-700 font-medium"
              >
                Sign Up
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
