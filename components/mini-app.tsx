"use client";

import { useEffect, useState } from "react";

export default function MiniApp() {
  const [user, setUser] = useState<{
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
  } | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.Telegram) {
      // Initialize Telegram Mini App
      window.Telegram.WebApp.ready();

      // Get user data
      const initDataUnsafe = window.Telegram.WebApp.initDataUnsafe;
      if (initDataUnsafe.user) {
        setUser(initDataUnsafe.user);
      }
    }
  }, []);

  const handleSendMessage = () => {
    if (typeof window !== "undefined" && window.Telegram) {
      window.Telegram.WebApp.sendData(
        JSON.stringify({ message: "Hello from Mini App!" })
      );
    }
  };

  const handleClose = () => {
    if (typeof window !== "undefined" && window.Telegram) {
      window.Telegram.WebApp.close();
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Telegram Mini App</h1>
      {user ? (
        <div className="text-center mb-8">
          <p className="text-xl">
            Welcome, {user.first_name} {user.last_name}!
          </p>
          <p>Username: {user.username || "N/A"}</p>
          <p>User ID: {user.id}</p>
        </div>
      ) : (
        <p className="text-xl mb-8">Loading user data...</p>
      )}
      <div className="flex gap-4">
        <button className="border rounded-lg p-2" onClick={handleSendMessage}>
          Send Message
        </button>
        <button className="border rounded-lg p-2" onClick={handleClose}>
          Close App
        </button>
      </div>
    </main>
  );
}
