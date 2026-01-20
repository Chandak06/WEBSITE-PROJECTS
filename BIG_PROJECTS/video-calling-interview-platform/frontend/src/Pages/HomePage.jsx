import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  UserButton,
} from "@clerk/clerk-react";
import React from "react";
import toast from "react-hot-toast";

const HomePage = () => {
  return (
    <div>
      <button
        onClick={() => toast.success("This is success toast")}
        className="btn btn-secondary"
      >
        Click Me
      </button>
      <SignedOut>
        <SignInButton>
          <button>Login</button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <SignOutButton />
      </SignedIn>

      <UserButton />
    </div>
  );
};

export default HomePage;
