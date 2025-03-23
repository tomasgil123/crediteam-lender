"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getUserByWorldUserId } from "@/services/users";
import { User } from "@/services/users";

export const Profile = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      if (session?.user?.name) {
        const userData = await getUserByWorldUserId(session.user.name);
        setUser(userData);
      }
      setLoading(false);
    }

    fetchUser();
  }, [session]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return (
      <div className="text-center p-4">
        <h2 className="text-xl font-semibold text-gray-700">
          Please login first to start using the app
        </h2>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      {user ? (
        <div className="space-y-2">
          <p>
            <span className="font-semibold">User Type:</span> {user.user_type}
          </p>
          <p>
            <span className="font-semibold">Verification Level:</span>{" "}
            {user.verification_level}
          </p>
          <p>
            <span className="font-semibold">World User ID:</span>{" "}
            {user.world_user_id.slice(0, 10)}...
          </p>
        </div>
      ) : (
        <p>Error loading user data</p>
      )}
    </div>
  );
};
