import React, { useState } from 'react'
import Navbar from './components/Navbar'
import PublicHomePage from './components/PublicHomePage'
import PWDAdminDashboard from './components/PWDAdminDashboard'
import EngineerVerificationPortal from './components/EngineerVerificationPortal'
import CitizenReportingPortal from './components/CitizenReportingPortal'
import SuperAdminPortal from './components/SuperAdminPortal'
import EvidencePackModal from './components/EvidencePackModal'
import AuthModal from './components/AuthModal'
import { initialDefects, initialRoadSegments, demoUsers } from './data/mockData'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBolt, faArrowRight, faHouse, faShieldHalved, faUser, faBuildingColumns } from '@fortawesome/free-solid-svg-icons'

function App() {
  const [currentUser, setCurrentUser] = useState(null) // null = Public Visitor, or demoUser object
  const [activeView, setActiveView] = useState('home') // 'home' | 'dashboard'
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [authInitialTab, setAuthInitialTab] = useState('citizen')

  const [defects, setDefects] = useState(initialDefects)
  const [segments] = useState(initialRoadSegments)
  const [selectedDefectId, setSelectedDefectId] = useState(null)

  // Handle engineer defect verification updates
  const handleUpdateDefect = (defectId, updates) => {
    setDefects((prev) =>
      prev.map((d) => (d.id === defectId ? { ...d, ...updates } : d))
    )
  }

  const handleOpenAuth = (tab = 'citizen') => {
    setAuthInitialTab(tab)
    setIsAuthOpen(true)
  }

  const handleLogin = (user) => {
    setCurrentUser(user)
    setActiveView('dashboard')
  }

  const handleLogout = () => {
    setCurrentUser(null)
    setActiveView('home')
  }

  const selectedDefect = defects.find((d) => d.id === selectedDefectId)

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-white">
      {/* Official Government of Assam Navbar */}
      <Navbar
        currentUser={currentUser}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
        onSelectUser={(u) => handleLogin(u)}
        activeView={activeView}
        setActiveView={setActiveView}
      />

      {/* Demo Persona Ribbon for Client Presentations */}
      <div className="bg-slate-900/90 border-b border-slate-800 px-4 py-2 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-slate-400">
            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-purple-500/20 text-purple-400 text-[10px]">
              <FontAwesomeIcon icon={faBolt} />
            </span>
            <span className="font-semibold text-slate-300">Client Demo Controller:</span>
            <span>Current State:</span>
            <span className="font-bold text-cyan-400">
              {currentUser ? `${currentUser.name} (${currentUser.roleLabel})` : 'Public Citizen Home Page'}
            </span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto">
            <button
              onClick={() => {
                setCurrentUser(null)
                setActiveView('home')
              }}
              className={`cursor-pointer px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                !currentUser && activeView === 'home'
                  ? 'bg-cyan-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Public Home
            </button>

            <button
              onClick={() => handleLogin(demoUsers.find((u) => u.role === 'citizen'))}
              className={`cursor-pointer px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                currentUser?.role === 'citizen'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-800 text-emerald-400 hover:bg-emerald-950/40'
              }`}
            >
              Citizen View
            </button>

            <button
              onClick={() => handleLogin(demoUsers.find((u) => u.role === 'engineer'))}
              className={`cursor-pointer px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                currentUser?.role === 'engineer'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-800 text-indigo-400 hover:bg-indigo-950/40'
              }`}
            >
              Field Engineer
            </button>

            <button
              onClick={() => handleLogin(demoUsers.find((u) => u.role === 'admin'))}
              className={`cursor-pointer px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                currentUser?.role === 'admin'
                  ? 'bg-cyan-600 text-white'
                  : 'bg-slate-800 text-cyan-400 hover:bg-cyan-950/40'
              }`}
            >
              PWD Admin GIS
            </button>

            <button
              onClick={() => handleLogin(demoUsers.find((u) => u.role === 'superadmin'))}
              className={`cursor-pointer px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                currentUser?.role === 'superadmin'
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-800 text-purple-400 hover:bg-purple-950/40'
              }`}
            >
              Super Admin & AI
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* PUBLIC HOME VIEW */}
        {activeView === 'home' && (
          <PublicHomePage
            onOpenAuth={handleOpenAuth}
            onSelectDefect={(id) => setSelectedDefectId(id)}
          />
        )}

        {/* LOGGED-IN ROLE DASHBOARD VIEWS */}
        {activeView === 'dashboard' && currentUser && (
          <>
            {currentUser.role === 'citizen' && (
              <CitizenReportingPortal
                currentUser={currentUser}
                onSelectDefect={(id) => setSelectedDefectId(id)}
              />
            )}

            {currentUser.role === 'engineer' && (
              <EngineerVerificationPortal
                defects={defects}
                onUpdateDefect={handleUpdateDefect}
                onSelectDefect={(id) => setSelectedDefectId(id)}
              />
            )}

            {currentUser.role === 'admin' && (
              <PWDAdminDashboard
                segments={segments}
                defects={defects}
                selectedDefectId={selectedDefectId}
                onSelectDefect={(id) => setSelectedDefectId(id)}
              />
            )}

            {currentUser.role === 'superadmin' && (
              <SuperAdminPortal />
            )}
          </>
        )}
      </main>

      {/* Defect Evidence Pack Modal */}
      {selectedDefect && (
        <EvidencePackModal
          defect={selectedDefect}
          onClose={() => setSelectedDefectId(null)}
          onUpdateStatus={handleUpdateDefect}
        />
      )}

      {/* Role-Based Authentication & Registration Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLogin={handleLogin}
        initialTab={authInitialTab}
      />

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left space-y-1">
            <div className="text-slate-300 font-semibold">
              ASSAM AI ROADWATCH • Public Works Roads Department (PWRD)
            </div>
            <div className="text-[11px] text-slate-500">
              Government of Assam • AI-Based Road Health & Maintenance Prioritisation Platform
            </div>
          </div>
          <div className="text-right text-[11px] text-slate-500">
            Concept & Technical Architecture Prototype • September 2026
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
