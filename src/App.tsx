import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./components/AuthProvider";
import { LanguageProvider } from "./components/LanguageProvider";

import { Header } from "./components/common/Header";
import { Footer } from "./components/common/Footer";

import { Home } from "./pages/Home";
import { Courses } from "./pages/Courses";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Dashboard } from "./pages/Dashboard";
import { CourseDetail } from "./pages/CourseDetail";
import { Dictionary } from "./pages/Dictionary";
import { Exercises } from "./pages/Exercises";

import { ProtectedRoute } from "./components/common/ProtectedRoute";

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/course/:id"
                  element={
                    <ProtectedRoute>
                      <CourseDetail />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dictionary"
                  element={
                    <ProtectedRoute>
                      <Dictionary />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/exercises"
                  element={
                    <ProtectedRoute>
                      <Exercises />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
