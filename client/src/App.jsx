import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import {
  SignedIn,
  SignedOut,
  SignIn,
  SignUp
} from "@clerk/clerk-react";

import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* SIGN IN */}
        <Route
          path="/"
          element={
            <>
              <SignedOut>

                <div className="flex justify-center items-center min-h-screen bg-gray-100">

                  <SignIn
                    routing="path"
                    path="/"
                    signUpUrl="/signup"
                    afterSignInUrl="/dashboard"
                  />

                </div>

              </SignedOut>

              <SignedIn>
                <Navigate to="/dashboard" />
              </SignedIn>
            </>
          }
        />

        {/* SIGN UP */}
        <Route
          path="/signup"
          element={
            <>
              <SignedOut>

                <div className="flex justify-center items-center min-h-screen bg-gray-100">

                  <SignUp
                    routing="path"
                    path="/signup"
                    signInUrl="/"
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

        {/* DASHBOARD */}
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        {/* FALLBACK */}
        <Route
          path="*"
          element={<Navigate to="/" />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;