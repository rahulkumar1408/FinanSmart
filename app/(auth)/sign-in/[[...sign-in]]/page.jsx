"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth, SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.replace("/dashboard"); // Redirect to dashboard if already signed in
    }
  }, [isSignedIn, isLoaded, router]);

  if (!isLoaded) {
    return <p>Loading...</p>; // Prevent flickering
  }

  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        {/* Left Section with Background Image */}
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt="Sign In Background"
            src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />
        </section>

        {/* Right Section with Sign-in Form */}
        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              Welcome to Expense Tracker 🦑
            </h1>
            <p className="mt-4 leading-relaxed text-gray-500">
              Track your expenses easily and efficiently.
            </p>

            {/* Clerk Sign-in Component with Redirect */}
            <SignIn
              afterSignInUrl="/dashboard"  // ✅ Redirects after successful sign-in
              afterSignUpUrl="/dashboard"
            />
          </div>
        </main>
      </div>
    </section>
  );
}
