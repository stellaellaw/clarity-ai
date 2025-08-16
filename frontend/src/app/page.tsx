"use client";
import React, { useState, useEffect } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [greeting, setGreeting] = useState("");
  const [error, setError] = useState("");
  const [greetings, setGreetings] = useState<string[]>([]);

  // Fetch all greetings from backend
  const fetchGreetings = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/greetings");
      const data = await res.json();
      setGreetings(data.greetings || []);
    } catch (err) {
      setError("Failed to load greetings.");
    }
  };

  useEffect(() => {
    fetchGreetings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setGreeting("");
    try {
      const res = await fetch("http://localhost:5000/api/greeting", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Error");
      } else {
        setGreeting(data.message);
        setName("");
        fetchGreetings(); // Refresh greetings list
      }
    } catch (err) {
      setError("Network error");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Enter your name"
          className="border p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Get Greeting
        </button>
      </form>
      {greeting && <p className="mt-4 text-green-700">{greeting}</p>}
      {error && <p className="mt-4 text-red-700">{error}</p>}

      <hr className="my-8" />
      <h2 className="text-xl font-bold mb-2">All Greetings</h2>
      {greetings.length === 0 ? (
        <p className="text-gray-600">No greetings yet.</p>
      ) : (
        <ul className="list-disc pl-5">
          {greetings.map((g, idx) => (
            <li key={idx}>{g}</li>
          ))}
        </ul>
      )}
    </div>
  );
}