import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faRoad, 
  faMapLocationDot, 
  faShieldHalved, 
  faMobileScreen, 
  faSliders,
  faCircleCheck,
  faBolt,
  faBuildingColumns,
  faUserGear,
  faRightToBracket,
  faRightFromBracket,
  faUser,
  faHouse
} from '@fortawesome/free-solid-svg-icons'
import { demoUsers } from '../data/mockData'

export default function Navbar({ 
  currentUser, 
  onOpenAuth, 
  onLogout, 
  onSelectUser,
  activeView, 
  setActiveView 
}) {
  const [showRoleDropdown, setShowRoleDropdown] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl">
      {/* Top Ministerial / Department Ribbon */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-cyan-950 px-4 sm:px-6 py-1 text-[11px] text-slate-300 border-b border-slate-800/60 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-semibold text-emerald-400">Government of Assam</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-300">Public Works Roads Department (PWRD)</span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-[11px]">
          <span className="flex items-center gap-1.5 text-slate-400">
            <FontAwesomeIcon icon={faBolt} className="text-amber-400" />
            AI Vision Engine: <strong className="text-slate-200">RoadYOLO-v4.2-Assam (94.2% mAP)</strong>
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-cyan-400 font-medium">4 Survey Vehicles Active</span>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div 
            onClick={() => setActiveView('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="h-11 w-11 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-xl shadow-cyan-500/25 border border-cyan-400/30 group-hover:scale-105 transition-transform">
              <FontAwesomeIcon icon={faRoad} className="text-2xl" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-cyan-200 bg-clip-text text-transparent">
                  ASSAM AI ROADWATCH
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300">
                  PWRD
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">
                AI-Based Road Health & Maintenance Prioritisation Platform
              </p>
            </div>
          </div>

          {/* Navigation Links & User Authentication Controls */}
          <div className="flex items-center gap-3">
            {/* Home link */}
            <button
              onClick={() => setActiveView('home')}
              className={`cursor-pointer px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                activeView === 'home'
                  ? 'bg-slate-800 text-cyan-400 border border-slate-700'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FontAwesomeIcon icon={faHouse} />
              <span>Public Home</span>
            </button>

            {/* If NOT logged in */}
            {!currentUser ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenAuth('citizen')}
                  className="cursor-pointer px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-400 hover:text-cyan-300 border border-slate-700/80 text-xs font-semibold transition-all flex items-center gap-1.5"
                >
                  <FontAwesomeIcon icon={faUser} />
                  <span>Citizen Login / Register</span>
                </button>

                <button
                  onClick={() => onOpenAuth('official')}
                  className="cursor-pointer px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-bold shadow-lg shadow-cyan-500/25 transition-all flex items-center gap-1.5"
                >
                  <FontAwesomeIcon icon={faRightToBracket} />
                  <span>Official PWD Login</span>
                </button>

                <button
                  onClick={() => onOpenAuth('quick')}
                  className="cursor-pointer hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-purple-950/60 hover:bg-purple-900/60 text-purple-300 border border-purple-800/60 text-xs font-bold transition-all"
                  title="Quick Demo Persona Switcher"
                >
                  <FontAwesomeIcon icon={faBolt} className="text-amber-400" />
                  <span>1-Click Demo</span>
                </button>
              </div>
            ) : (
              /* If logged in */
              <div className="flex items-center gap-3">
                {/* Role Specific Workspace link */}
                <button
                  onClick={() => setActiveView('dashboard')}
                  className={`cursor-pointer px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                    activeView === 'dashboard'
                      ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-500/25'
                      : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <span>
                    {currentUser.role === 'citizen' && 'Citizen Console'}
                    {currentUser.role === 'engineer' && 'Engineer Verification Queue'}
                    {currentUser.role === 'admin' && 'PWD Admin GIS Terminal'}
                    {currentUser.role === 'superadmin' && 'Super Admin Console'}
                  </span>
                </button>

                {/* User Profile Badge */}
                <div className="relative">
                  <div
                    onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                    className="cursor-pointer flex items-center gap-2.5 bg-slate-900/90 border border-slate-700/80 px-3 py-1.5 rounded-xl hover:border-cyan-500 transition-all"
                  >
                    <div className="h-7 w-7 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white text-xs font-bold shadow">
                      {currentUser.avatar}
                    </div>
                    <div className="text-left hidden sm:block">
                      <div className="text-xs font-bold text-slate-200 line-clamp-1">{currentUser.name}</div>
                      <div className="text-[10px] text-cyan-400 font-semibold">{currentUser.roleLabel}</div>
                    </div>
                  </div>

                  {/* Switch Persona Dropdown for Client Demo */}
                  {showRoleDropdown && (
                    <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-2 z-50 animate-fadeIn space-y-1">
                      <div className="px-3 py-2 text-[10px] uppercase font-bold tracking-wider text-slate-400 border-b border-slate-800">
                        Switch Role (Client Presentation)
                      </div>
                      {demoUsers.map((u) => (
                        <button
                          key={u.id}
                          onClick={() => {
                            onSelectUser(u)
                            setShowRoleDropdown(false)
                            setActiveView('dashboard')
                          }}
                          className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors ${
                            currentUser.role === u.role
                              ? 'bg-cyan-600/20 text-cyan-300 font-bold border border-cyan-500/40'
                              : 'text-slate-300 hover:bg-slate-800'
                          }`}
                        >
                          <div>
                            <div>{u.name}</div>
                            <div className="text-[10px] text-slate-400">{u.roleLabel}</div>
                          </div>
                          {currentUser.role === u.role && (
                            <FontAwesomeIcon icon={faCircleCheck} className="text-cyan-400" />
                          )}
                        </button>
                      ))}

                      <div className="pt-1 border-t border-slate-800">
                        <button
                          onClick={() => {
                            onLogout()
                            setShowRoleDropdown(false)
                          }}
                          className="w-full text-left px-3 py-2 rounded-xl text-xs text-red-400 hover:bg-red-950/40 font-semibold flex items-center gap-2 transition-colors"
                        >
                          <FontAwesomeIcon icon={faRightFromBracket} />
                          <span>Sign Out to Public View</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Sign out */}
                <button
                  onClick={onLogout}
                  className="cursor-pointer text-slate-400 hover:text-red-400 p-2 text-xs transition-colors"
                  title="Sign Out"
                >
                  <FontAwesomeIcon icon={faRightFromBracket} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
