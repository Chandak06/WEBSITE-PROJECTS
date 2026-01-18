import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton } from '@clerk/clerk-react'
import React from 'react'
import "./App.css"
const App = () => {
  return (
    <>
    <div>App</div>
    <SignedOut>
      <SignInButton mode='modal'/>
    </SignedOut>

    <SignedIn>
      <SignOutButton/>
    </SignedIn>

    <UserButton/>
    </>
  )
}

export default App