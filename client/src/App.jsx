import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import {
  SignedIn,
  SignedOut,
  SignIn
} from "@clerk/clerk-react";

import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login Route */}
        <Route
          path="/"
          element={
            <>
              <SignedOut>
                <div className="flex justify-center items-center min-h-screen">
                  <SignIn
                    routing="path"
                    path="/"
                    signUpUrl="/"
                    afterSignInUrl="/dashboard"
                    afterSignUpUrl="/dashboard"
                  />
                </div>
              </SignedOut>

              <SignedIn>
                <Navigate to="/dashboard" />
              </SignedIn>
            </>
          }
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;