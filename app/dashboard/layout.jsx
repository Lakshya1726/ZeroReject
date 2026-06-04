import React from "react";
import Header from "./_components/Header";
import { Toaster } from "sonner";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "../../utils/db";
import { Users } from "../../utils/schema";
import moment from "moment";
import { eq } from "drizzle-orm";

async function DashboardLayout({ children }) {
  // Track user login
  const user = await currentUser();

  if (user) {
    const email = user.primaryEmailAddress?.emailAddress;
    const name = user.fullName || user.firstName || "Unknown";
    const imageUrl = user.imageUrl;
    const currentDate = moment().format("DD-MM-YYYY HH:mm:ss");

    if (email) {
      try {
        const existingUser = await db
          .select()
          .from(Users)
          .where(eq(Users.email, email));

        if (existingUser.length === 0) {
          // New user signup
          await db.insert(Users).values({
            email,
            name,
            imageUrl,
            createdAt: currentDate,
            lastLoginAt: currentDate,
          });
        } else {
          // Returning user - update last login
          await db
            .update(Users)
            .set({ lastLoginAt: currentDate, name, imageUrl })
            .where(eq(Users.email, email));
        }
      } catch (error) {
        console.error("Error tracking user:", error);
      }
    }
  }

  return (
    <>
      <div>
        <Header />
        <div className="mx-5 md:mx-20 lg:mx-36 pt-28">
          <Toaster />
          {children}
        </div>
      </div>
    </>
  );
}

export default DashboardLayout;
