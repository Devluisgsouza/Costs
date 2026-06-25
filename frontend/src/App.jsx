import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { SessionProvider, useUserSession } from './context/SessionContext'
import { ToastProvider } from './context/ToastContext'

import Navbar from './components/layout/Navbar'
import BottomNav from './components/layout/BottomNav'
import Footer from './components/layout/Footer'
import Container from './components/layout/Container'
import ScrollTop from './components/layout/ScrollTop'

import LoginScreen from './pages/LoginScreen'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Project from './pages/Project'
import NewProject from './pages/NewProject'
import Company from './pages/Company'
import Contact from './pages/Contact'

function AuthenticatedApp() {
  return (
    <Router>
      <ScrollTop />
      <div className="app-shell">
        <Navbar />
        <Container customClass="min-height">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/project/:id" element={<Project />} />
            <Route path="/newproject" element={<NewProject />} />
            <Route path="/company" element={<Company />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Container>
        <Footer />
        <BottomNav />
      </div>
    </Router>
  )
}

function Root() {
  const { isAuthenticated } = useUserSession()
  return isAuthenticated ? <AuthenticatedApp /> : <LoginScreen />
}

function App() {
  return (
    <SessionProvider>
      <ToastProvider>
        <Root />
      </ToastProvider>
    </SessionProvider>
  )
}

export default App
