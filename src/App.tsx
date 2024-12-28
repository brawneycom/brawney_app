import { BrowserRouter, Routes, Route } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./sentry";

import {
  AuthProvider,
  MainMenuProvider,
  SearchProvider,
  NotificationsProvider,
} from "./contexts";

import { CaptureScreen } from "./pages/capture";
import { HomeScreen } from "./pages/home";
import { WelcomeScreen } from "./pages/welcome";
import { ProfileScreen } from "./pages/profile";
import { SettingsScreen } from "./pages/settings";

import { LoginScreen, SignUpScreen } from "./pages/auth";
import { Notifications } from "./components/notifications";
import { BrawneyErrorBoundary, ForbiddenError } from "./components/error";

import "./App.css";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      refetchOnWindowFocus: true,
    },
  },
});

function App() {
  return (
    <BrawneyErrorBoundary>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <NotificationsProvider>
            <AuthProvider>
              <Notifications />
              <Routes>
                <Route
                  path="/"
                  element={
                    <MainMenuProvider mode="visualization">
                      <SearchProvider>
                        <HomeScreen />
                      </SearchProvider>
                    </MainMenuProvider>
                  }
                />
                <Route path="/welcome" element={<WelcomeScreen />} />
                <Route
                  path="/capture"
                  element={
                    <MainMenuProvider mode="capture">
                      <SearchProvider>
                        <CaptureScreen />
                      </SearchProvider>
                    </MainMenuProvider>
                  }
                />
                <Route path="/profile" element={<ProfileScreen />} />
                <Route path="/settings" element={<SettingsScreen />} />

                <Route path="/login" element={<LoginScreen />} />
                <Route path="/signup" element={<SignUpScreen />} />
                <Route path="/forbidden" element={<ForbiddenError />} />
              </Routes>
            </AuthProvider>
          </NotificationsProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </BrawneyErrorBoundary>
  );
}

export default App;
