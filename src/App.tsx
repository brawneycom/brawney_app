import { BrowserRouter, Routes, Route } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// import "./sentry";

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
import { OnboardPage } from "./pages/onboard";
import { LoginScreen, SignUpScreen } from "./pages/auth";
import { Notifications } from "./components/notifications";
import { BrawneyErrorBoundary, ForbiddenError } from "./components/error";

import "./App.css";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30 * 60 * 1000,
      refetchOnWindowFocus: false,
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
              <MainMenuProvider>
                <Notifications />
                <Routes>
                  <Route
                    path="/"
                    element={
                      <SearchProvider>
                        <HomeScreen />
                      </SearchProvider>
                    }
                  />
                  <Route
                    path="/capture"
                    element={
                      <SearchProvider>
                        <CaptureScreen />
                      </SearchProvider>
                    }
                  />

                  <Route path="/onboard" element={<OnboardPage />} />
                  <Route path="/welcome" element={<WelcomeScreen />} />
                  <Route path="/profile" element={<ProfileScreen />} />
                  <Route path="/settings" element={<SettingsScreen />} />

                  <Route path="/login" element={<LoginScreen />} />
                  <Route path="/signup" element={<SignUpScreen />} />
                  <Route path="/forbidden" element={<ForbiddenError />} />
                </Routes>
              </MainMenuProvider>
            </AuthProvider>
          </NotificationsProvider>

        </QueryClientProvider>
      </BrowserRouter>
    </BrawneyErrorBoundary>
  );
}

export default App;
