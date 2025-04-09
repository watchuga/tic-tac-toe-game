import { useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/submit-name", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    const result = await response.json();

    if (response.ok) {
      // Store name locally (optional)
      localStorage.setItem("playerName", name);
      // Redirect to game page
      router.push("/game");
    } else {
      setMessage(result.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Welcome to Tic Tac Toe!</h1>
        <form onSubmit={handleSubmit} className="mt-4">
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 p-2 rounded"
          />
          <button type="submit" className="ml-2 p-2 bg-blue-500 text-white rounded">
            Submit
          </button>
        </form>
        {message && <p className="mt-4 text-red-500">{message}</p>}
      </div>
    </div>
  );
}
