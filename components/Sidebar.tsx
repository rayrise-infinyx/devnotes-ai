"use client";

import Link from "next/link";
import { Home, Settings, LogIn, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import {
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";

export function Sidebar() {
  const { isSignedIn } = useUser();

  return (
    <aside className="hidden md:flex w-64 h-screen flex-col border-r bg-background">
      {/* Header */}
      <div className="h-16 flex items-center px-6 border-b">
        <span className="text-lg font-semibold">DevNotes</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        <Link href="/">
          <Button variant="secondary" className="w-full justify-start gap-2">
            <Home className="w-4 h-4" />
            Dashboard
          </Button>
        </Link>

        <Button variant="ghost" className="w-full justify-start gap-2">
          <Settings className="w-4 h-4" />
          Settings
        </Button>
      </nav>

      <Separator />

      {/* Auth Section */}
      <div className="p-4 space-y-3">
        {!isSignedIn && (
          <>
            <SignInButton mode="modal">
              <Button className="w-full gap-2">
                <LogIn className="w-4 h-4" />
                Sign In
              </Button>
            </SignInButton>

            <SignUpButton mode="modal">
              <Button variant="outline" className="w-full gap-2">
                <UserPlus className="w-4 h-4" />
                Sign Up
              </Button>
            </SignUpButton>
          </>
        )}

        {isSignedIn && (
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">My Account</p>
              <p className="text-xs text-muted-foreground">
                Manage profile
              </p>
            </div>

            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-9 h-9",
                },
              }}
            />
          </div>
        )}
      </div>
    </aside>
  );
}