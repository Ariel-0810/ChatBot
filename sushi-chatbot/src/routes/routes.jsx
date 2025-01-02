import { Suspense, lazy } from "react";
import { Route, Routes as RouterRoutes } from "react-router-dom";
import { Routes } from "./index.js";

const LandingPage = lazy(() => import("../components/LandingPage.jsx"));
const LogIn = lazy(() =>
  import("../modules/auth/components/form/LogInForm.jsx")
);
const SignUp = lazy(() =>
  import("../modules/auth/components/form/signUpForm.jsx")
);
const ChatInterface = lazy(() => import("../components/ChatInterface.jsx"));


export default function Navigator() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterRoutes>
        <Route path={Routes.landing} element={<LandingPage />} />
        <Route path={Routes.logIn} element={<LogIn />} />
        <Route path={Routes.signUp} element={<SignUp />} />
        <Route path={Routes.chat} element={<ChatInterface />} />
      </RouterRoutes>
    </Suspense>
  );
}
