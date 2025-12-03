import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { MainLayout } from './components/layout'

// Auth pages
import Login from './pages/auth/Login'
import ForgotPassword from './pages/auth/ForgotPassword'

// Main pages
import Dashboard from './pages/dashboard/Dashboard'
import Clients from './pages/clients/Clients'
import Appointments from './pages/appointments/Appointments'
import Finance from './pages/finance/Finance'
import Settings from './pages/settings/Settings'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <MainLayout>
              <Dashboard />
            </MainLayout>
          }
        />
        <Route
          path="/clients"
          element={
            <MainLayout>
              <Clients />
            </MainLayout>
          }
        />
        <Route
          path="/appointments"
          element={
            <MainLayout>
              <Appointments />
            </MainLayout>
          }
        />
        <Route
          path="/finance"
          element={
            <MainLayout>
              <Finance />
            </MainLayout>
          }
        />
        <Route
          path="/settings"
          element={
            <MainLayout>
              <Settings />
            </MainLayout>
          }
        />

        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
