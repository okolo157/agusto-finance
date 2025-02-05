"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false); 

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true); // Start loading on form submit

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      router.push("/dashboard"); // Redirect only if authenticated
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setLoading(false); //Stop loading after response
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 text-black">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter your email"
              required
              disabled={loading} //Disable input when loading
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter your password"
              required
              disabled={loading} //Disable input when loading
            />
          </div>
          <button
            type="submit"
            className={`w-full p-2 rounded-md transition duration-300 flex justify-center items-center ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-cyan-700 hover:bg-cyan-600 text-white"
            }`}
            disabled={loading} //Disable button when loading
          >
            {loading ? (
              <div className="w-5 h-5 border-4 border-gray-300 border-t-cyan-600 rounded-full animate-spin"></div>
            ) : (
              "Login"
            )}
          </button>
        </form>
        <p className="mt-4 text-center">
          Don&apos;t have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={() => router.push("/auth/register")}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}
