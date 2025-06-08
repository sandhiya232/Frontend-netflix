import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://backend-netflix-c7nx.onrender.com/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) navigate("/");
      else setError(data.message);
    } catch {
      setError("Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form onSubmit={handleSignup} className="bg-gray-800 p-8 rounded w-96 space-y-4">
        <h1 className="text-3xl font-bold mb-4">Sign Up</h1>
        {error && <p className="text-red-500">{error}</p>}
        <input type="email" placeholder="Email" className="w-full p-2 bg-gray-700 rounded" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className="w-full p-2 bg-gray-700 rounded" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="w-full bg-red-600 p-2 rounded hover:bg-red-700">Sign Up</button>
        <p className="text-center text-sm">
          Already have an account? <Link to="/" className="text-red-400">Sign in</Link>
        </p>
      </form>
    </div>
  );
}
