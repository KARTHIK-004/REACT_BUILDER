import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import Projects from "./pages/Projects.jsx";
import Favorites from "./pages/Favorites.jsx";
import Settings from "./pages/Settings.jsx";
import MainContent from "./components/dashboard/MainContent.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import EditorPage from "./pages/EditorPage.jsx";
import Profile from "./pages/Profile.jsx";
import ComponentPage from "./pages/ComponentPage.jsx";
import ComponentsPage from "./pages/Components.jsx";
import Docs from "./pages/Docs.jsx";
import Features from "./pages/Features.jsx";
import Pricing from "./pages/Pricing.jsx";
import PrivacyPolicy from "./pages/Privacy.jsx";
import Terms from "./pages/Terms.jsx";

export default function App() {
  return (
    <div className="bg-background text-foreground">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/features" element={<Features />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<MainContent />} />
            <Route path="/dashboard/projects" element={<Projects />} />
            <Route path="/dashboard/components" element={<ComponentsPage />} />
            <Route path="/dashboard/favorites" element={<Favorites />} />
            <Route path="/dashboard/settings" element={<Settings />} />
            <Route path="/dashboard/profile" element={<Profile />} />
            <Route
              path="/dashboard/projects/:projectId"
              element={<ComponentPage />}
            />
            <Route
              path="/dashboard/projects/:projectId/component/:componentId"
              element={<EditorPage />}
            />
            <Route
              path="/dashboard/projects/:projectId/new"
              element={<EditorPage />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
