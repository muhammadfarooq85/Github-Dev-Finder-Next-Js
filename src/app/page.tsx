"use client";

import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";

export interface GitHubUser {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string | null;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;

  name: string | null;
  company: string | null;
  blog: string;
  location: string | null;
  email: string | null;
  hireable: boolean | null;
  bio: string | null;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

export default function Home() {
  const [query, setQuery] = useState<string>("");
  const [userData, setUserData] = useState<GitHubUser>({} as GitHubUser);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      const userData = await fetch(
        `${
          query
            ? `https://api.github.com/users/${query}`
            : "https://api.github.com/users/muhammadfarooq85"
        }`
      );
      if (!userData.ok) {
        throw new Error("There is a network error. Please try again!");
      }
      const data = await userData.json();
      setUserData(data);
      setQuery("");
    } catch (error) {
      console.log("Error fetching user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-3xl bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 space-y-6">
        <Navbar />
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search GitHub username..."
            className="flex-grow"
          />
          <Button onClick={fetchUserData} className="w-full sm:w-auto">
            Search
          </Button>
        </div>
        {userData && (
          <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-inner transition-colors space-y-4">
            <div className="flex items-start gap-6">
              <Image
                src={userData.avatar_url}
                alt={userData.name ?? ""}
                width={80}
                height={80}
                className="rounded-full border border-gray-300 dark:border-gray-600"
              />
              <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {userData.name ?? "No name"}
                </h2>
                <p className="text-blue-600 dark:text-blue-400">
                  @{userData.login}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {userData.bio ?? "No bio available"}
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 bg-white dark:bg-gray-800 p-4 rounded-md text-center">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Repos
                </p>
                <p className="text-lg font-semibold text-gray-800 dark:text-white">
                  {userData.public_repos}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Followers
                </p>
                <p className="text-lg font-semibold text-gray-800 dark:text-white">
                  {userData.followers}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Following
                </p>
                <p className="text-lg font-semibold text-gray-800 dark:text-white">
                  {userData.following}
                </p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300">
              <div className="flex items-center gap-2">
                📍 {userData.location ?? "Not available"}
              </div>
              <div className="flex items-center gap-2">
                🏢 {userData.company ?? "Not available"}
              </div>
              <div className="flex items-center gap-2">
                🌐{" "}
                {userData.blog ? (
                  <a
                    href={
                      userData.blog.startsWith("http")
                        ? userData.blog
                        : `https://${userData.blog}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {userData.blog}
                  </a>
                ) : (
                  "Not available"
                )}
              </div>
              <div className="flex items-center gap-2">
                🐦{" "}
                {userData.twitter_username ? (
                  <a
                    href={`https://twitter.com/${userData.twitter_username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    @{userData.twitter_username}
                  </a>
                ) : (
                  "Not available"
                )}
              </div>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-gray-300 dark:border-gray-600">
              <a
                href={userData.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                View GitHub Profile →
              </a>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Joined {new Date(userData.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
