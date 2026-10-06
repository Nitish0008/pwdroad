import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faXmark, 
  faShieldHalved, 
  faBuildingColumns, 
  faUser, 
  faSliders, 
  faLock, 
  faPhone, 
  faEnvelope, 
  faArrowRight, 
  faBolt,
  faCircleCheck,
  faIdCard
} from '@fortawesome/free-solid-svg-icons'
import { demoUsers } from '../data/mockData'

export default function AuthModal({ isOpen, onClose, onLogin, initialTab = 'citizen' }) {
  if (!isOpen) return null

  const [authTab, setAuthTab] = useState(initialTab) // 'citizen' | 'official' | 'quick'
  const [citizenMode, setCitizenMode] = useState('login') // 'login' | 'register'
  
  // Citizen Form state
  const [citizenName, setCitizenName] = useState('Nitish Hashim')
  const [citizenPhone, setCitizenPhone] = useState('+91 94351-88210')
  const [citizenDistrict, setCitizenDistrict] = useState('Kamrup Metro (Guwahati)')
  
  // Official Role selection
  const [selectedOfficialRole, setSelectedOfficialRole] = useState('admin') // 'admin' | 'engineer' | 'superadmin'

  const handleCitizenSubmit = (e) => {
    e.preventDefault()
    const user = {
      id: citizenMode === 'register' ? `usr-cit-${Date.now()}` : 'usr-citizen',
      name: citizenName || 'Citizen User',
      role: 'citizen',
      roleLabel: 'Registered Citizen',
      designation: `Resident, ${citizenDistrict}`,
      email: `${citizenName.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
      phone: citizenPhone,
      division: citizenDistrict,
      avatar: citizenName.slice(0, 2).toUpperCase()
    }
    onLogin(user)
    onClose()
  }

  const handleOfficialLogin = (roleKey) => {
    const user = demoUsers.find((u) => u.role === roleKey) || demoUsers[0]
    onLogin(user)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-lg">
              <FontAwesomeIcon icon={faLock} />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Assam AI RoadWatch Authentication
              </h3>
              <p className="text-xs text-slate-400">
                Role-based access control (RBAC) portal
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="cursor-pointer h-8 w-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        {/* Tab switchers */}
        <div className="px-6 pt-4 pb-2 border-b border-slate-800/80 bg-slate-900/50 flex space-x-2">
          <button
            type="button"
            onClick={() => setAuthTab('citizen')}
            className={`cursor-pointer px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              authTab === 'citizen'
                ? 'bg-cyan-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <FontAwesomeIcon icon={faUser} />
            <span>Citizen Access</span>
          </button>

          <button
            type="button"
            onClick={() => setAuthTab('official')}
            className={`cursor-pointer px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              authTab === 'official'
                ? 'bg-cyan-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <FontAwesomeIcon icon={faBuildingColumns} />
            <span>PWD Departmental Login</span>
          </button>

          <button
            type="button"
            onClick={() => setAuthTab('quick')}
            className={`cursor-pointer px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              authTab === 'quick'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-purple-400 hover:text-purple-300 hover:bg-purple-950/40'
            }`}
          >
            <FontAwesomeIcon icon={faBolt} />
            <span>1-Click Demo</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6">
          {/* TAB 1: CITIZEN (LOGIN / REGISTER) */}
          {authTab === 'citizen' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
                <button
                  type="button"
                  onClick={() => setCitizenMode('login')}
                  className={`cursor-pointer flex-1 py-1.5 rounded-lg font-semibold transition-colors ${
                    citizenMode === 'login' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Citizen Login
                </button>
                <button
                  type="button"
                  onClick={() => setCitizenMode('register')}
                  className={`cursor-pointer flex-1 py-1.5 rounded-lg font-semibold transition-colors ${
                    citizenMode === 'register' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Register New Citizen Account
                </button>
              </div>

              <form onSubmit={handleCitizenSubmit} className="space-y-3">
                {citizenMode === 'register' && (
                  <div>
                    <label className="block text-xs text-slate-300 font-medium mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={citizenName}
                      onChange={(e) => setCitizenName(e.target.value)}
                      placeholder="e.g. Abhinav Das"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs text-slate-300 font-medium mb-1">
                    Mobile Number (for OTP & SMS Updates)
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={citizenPhone}
                      onChange={(e) => setCitizenPhone(e.target.value)}
                      placeholder="+91 94351-XXXXX"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 pl-8 text-xs text-white focus:outline-none focus:border-cyan-500"
                    />
                    <FontAwesomeIcon icon={faPhone} className="absolute left-3 top-2.5 text-slate-500 text-xs" />
                  </div>
                </div>

                {citizenMode === 'register' && (
                  <div>
                    <label className="block text-xs text-slate-300 font-medium mb-1">
                      Assam District / Region
                    </label>
                    <select
                      value={citizenDistrict}
                      onChange={(e) => setCitizenDistrict(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                    >
                      <option>Kamrup Metro (Guwahati)</option>
                      <option>Kamrup Rural</option>
                      <option>Nagaon</option>
                      <option>Morigaon</option>
                      <option>Dibrugarh</option>
                      <option>Cachar (Silchar)</option>
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-xs text-slate-300 font-medium mb-1">
                    Password / OTP
                  </label>
                  <input
                    type="password"
                    defaultValue="citizen123"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                  <div className="text-[10px] text-slate-500 mt-1">
                    Pre-filled demo credentials for prototype testing.
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full cursor-pointer mt-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/25 transition-all"
                >
                  {citizenMode === 'register' ? 'Register & Open Citizen Portal' : 'Login as Citizen'}
                </button>
              </form>
            </div>
          )}

          {/* TAB 2: PWD OFFICIAL LOGIN */}
          {authTab === 'official' && (
            <div className="space-y-4">
              <div className="bg-slate-950/70 p-3 rounded-2xl border border-slate-800 text-xs text-slate-400">
                Select your official PWD Departmental Role to enter the designated operational terminal:
              </div>

              <div className="space-y-2">
                {[
                  {
                    roleKey: 'admin',
                    name: 'Er. Sanjib Sarma',
                    title: 'PWD Executive / Chief Engineer',
                    desc: 'Full GIS Network Health, Segment Prioritization & Analytics'
                  },
                  {
                    roleKey: 'engineer',
                    name: 'Er. B. Barua',
                    title: 'PWD Field Inspection Engineer',
                    desc: 'Official Defect Severity Verification, Field Remarks & Work Orders'
                  },
                  {
                    roleKey: 'superadmin',
                    name: 'Dr. M. K. Deka',
                    title: 'Super Admin & AI Operations',
                    desc: 'AI Vision Model Thresholds, Deduplication Radius & System Config'
                  }
                ].map((item) => (
                  <div
                    key={item.roleKey}
                    onClick={() => setSelectedOfficialRole(item.roleKey)}
                    className={`cursor-pointer p-3.5 rounded-2xl border transition-all ${
                      selectedOfficialRole === item.roleKey
                        ? 'bg-slate-800/80 border-cyan-500 shadow-md shadow-cyan-500/10'
                        : 'bg-slate-950 border-slate-800/80 hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-white text-xs">{item.title}</span>
                      <span className="text-[10px] text-cyan-400 font-semibold">{item.name}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">{item.desc}</p>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => handleOfficialLogin(selectedOfficialRole)}
                className="w-full cursor-pointer py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/25 transition-all flex items-center justify-center gap-2"
              >
                <FontAwesomeIcon icon={faShieldHalved} />
                <span>Enter Official Departmental Portal</span>
              </button>
            </div>
          )}

          {/* TAB 3: 1-CLICK DEMO LAUNCHER (PERFECT FOR CLIENT DEMO) */}
          {authTab === 'quick' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-400">
                Instantly switch persona to present different user perspectives to the client:
              </p>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleOfficialLogin('admin')}
                  className="cursor-pointer text-left p-3 rounded-2xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 hover:border-cyan-500 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="text-xs font-bold text-cyan-300">1. PWD Admin</div>
                    <div className="text-[10px] text-slate-400 mt-1">GIS Map & Priorities</div>
                  </div>
                  <span className="mt-3 text-[10px] font-semibold text-cyan-400 flex items-center gap-1">
                    Launch <FontAwesomeIcon icon={faArrowRight} />
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handleOfficialLogin('engineer')}
                  className="cursor-pointer text-left p-3 rounded-2xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 hover:border-indigo-500 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="text-xs font-bold text-indigo-300">2. Field Engineer</div>
                    <div className="text-[10px] text-slate-400 mt-1">Verification Queue</div>
                  </div>
                  <span className="mt-3 text-[10px] font-semibold text-indigo-400 flex items-center gap-1">
                    Launch <FontAwesomeIcon icon={faArrowRight} />
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handleOfficialLogin('citizen')}
                  className="cursor-pointer text-left p-3 rounded-2xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 hover:border-emerald-500 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="text-xs font-bold text-emerald-300">3. Citizen User</div>
                    <div className="text-[10px] text-slate-400 mt-1">Report & Deduplication</div>
                  </div>
                  <span className="mt-3 text-[10px] font-semibold text-emerald-400 flex items-center gap-1">
                    Launch <FontAwesomeIcon icon={faArrowRight} />
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handleOfficialLogin('superadmin')}
                  className="cursor-pointer text-left p-3 rounded-2xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 hover:border-purple-500 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="text-xs font-bold text-purple-300">4. Super Admin</div>
                    <div className="text-[10px] text-slate-400 mt-1">AI Models & Settings</div>
                  </div>
                  <span className="mt-3 text-[10px] font-semibold text-purple-400 flex items-center gap-1">
                    Launch <FontAwesomeIcon icon={faArrowRight} />
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
