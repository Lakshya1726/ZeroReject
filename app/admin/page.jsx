import React from "react";
import { db } from "../../utils/db";
import { Users } from "../../utils/schema";
import { currentUser } from "@clerk/nextjs/server";
import { desc } from "drizzle-orm";
import Header from "../dashboard/_components/Header";
import { Users as UsersIcon, Clock, ArrowLeft, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

async function AdminDashboard() {
  const user = await currentUser();
  const email = user?.primaryEmailAddress?.emailAddress;

  // IMPORTANT: The admin email should be configured in your .env.local file
  // as NEXT_PUBLIC_ADMIN_EMAIL=your_email@example.com
  const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || process.env.ADMIN_EMAIL;

  if (!email || email !== ADMIN_EMAIL) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center text-white px-4">
        <ShieldCheck className="w-16 h-16 text-red-500 mb-4" />
        <h1 className="text-3xl font-bold text-red-500 mb-2">Access Denied</h1>
        <p className="text-gray-400 text-center max-w-md">
          You do not have permission to view this page. This area is strictly for administrators.
        </p>
        <Link href="/">
          <button className="mt-6 flex items-center gap-2 px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-all text-white border border-white/20">
            <ArrowLeft className="w-4 h-4" />
            Return to Home
          </button>
        </Link>
      </div>
    );
  }

  const allUsers = await db.select().from(Users).orderBy(desc(Users.id));
  
  // Calculate stats
  const totalUsers = allUsers.length;
  // Count users from today (simple check based on date string format DD-MM-YYYY)
  const today = new Date();
  const todayStr = `${String(today.getDate()).padStart(2, '0')}-${String(today.getMonth() + 1).padStart(2, '0')}-${today.getFullYear()}`;
  const recentSignups = allUsers.filter(u => u.createdAt.startsWith(todayStr)).length;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="max-w-6xl mx-auto px-4 pt-32 pb-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <ShieldCheck className="text-purple-500 w-8 h-8" />
              Admin Dashboard
            </h1>
            <p className="text-gray-400 mt-1">Track your platform's growth and user base.</p>
          </div>
          <div className="text-sm px-4 py-2 bg-purple-500/10 border border-purple-500/30 text-purple-400 rounded-full flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
            Live Data
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-black/40 border border-cyan-500/30 rounded-2xl p-6 shadow-[0_0_30px_rgba(6,182,212,0.1)]">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-xl bg-cyan-500/20 text-cyan-400">
                <UsersIcon className="w-8 h-8" />
              </div>
              <div>
                <p className="text-gray-400 text-sm font-medium">Total Registered Users</p>
                <h2 className="text-4xl font-extrabold text-white">{totalUsers}</h2>
              </div>
            </div>
          </div>

          <div className="bg-black/40 border border-emerald-500/30 rounded-2xl p-6 shadow-[0_0_30px_rgba(16,185,129,0.1)]">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-xl bg-emerald-500/20 text-emerald-400">
                <Clock className="w-8 h-8" />
              </div>
              <div>
                <p className="text-gray-400 text-sm font-medium">New Signups (Today)</p>
                <h2 className="text-4xl font-extrabold text-white">{recentSignups}</h2>
              </div>
            </div>
          </div>
        </div>

        {/* User Table */}
        <div className="bg-black/40 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md">
          <div className="p-6 border-b border-white/10">
            <h2 className="text-xl font-bold text-white">User Directory</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-white/5 text-gray-400 text-sm">
                <tr>
                  <th className="px-6 py-4 font-medium">User Profile</th>
                  <th className="px-6 py-4 font-medium">Email</th>
                  <th className="px-6 py-4 font-medium">Sign Up Date</th>
                  <th className="px-6 py-4 font-medium">Last Login</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {allUsers.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-10 text-center text-gray-500">
                      No users found. Wait for someone to sign up!
                    </td>
                  </tr>
                ) : (
                  allUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {u.imageUrl ? (
                            <Image
                              src={u.imageUrl}
                              alt={u.name}
                              width={40}
                              height={40}
                              className="rounded-full border border-white/10"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-500 flex items-center justify-center text-white font-bold">
                              {u.name.charAt(0).toUpperCase()}
                            </div>
                          )}
                          <span className="text-white font-medium">{u.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-400">{u.email}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300">
                          {u.createdAt}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs text-cyan-300">
                          {u.lastLoginAt}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
