"use client";
import { useActiveAccount } from "thirdweb/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { LoadingSpinner } from "./ui/loading-spinner";

export function withAuth<P extends object>(Component: React.ComponentType<P>) {
  return function AuthenticatedComponent(props: P) {
    const account = useActiveAccount();
    const router = useRouter();

    useEffect(() => {
      if (!account) {
        router.push("/");
      }
    }, [account, router]);

    if (!account) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
          <div className="text-center">
            <LoadingSpinner size="lg" className="mx-auto mb-4" />
            <p className="text-[#f4a623] animate-pulse">Loading...</p>
          </div>
        </div>
      );
    }

    return <Component {...props} />;
  };
}
