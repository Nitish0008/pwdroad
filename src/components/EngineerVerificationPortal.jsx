import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faShieldHalved, 
  faCheck, 
  faXmark, 
  faTriangleExclamation, 
  faCamera, 
  faRoad, 
  faSliders, 
  faCircleCheck,
  faWrench,
  faFileContract,
  faEye,
  faChartLine,
  faChartBar,
  faClock
} from '@fortawesome/free-solid-svg-icons'

export default function EngineerVerificationPortal({ defects, onUpdateDefect, onSelectDefect }) {
  const [selectedId, setSelectedId] = useState(defects[1]?.id || defects[0]?.id)
  const currentDefect = defects.find((d) => d.id === selectedId) || defects[0]

  const [severityChoice, setSeverityChoice] = useState(currentDefect?.aiSeverity || 'Medium')
  const [remarks, setRemarks] = useState('')
  const [contractor, setContractor] = useState('M/S Brahmaputra Highway Infra')
  const [successNotice, setSuccessNotice] = useState(null)

  const handleVerify = (action) => {
    if (action === 'approve') {
      onUpdateDefect(currentDefect.id, {
        verifiedSeverity: severityChoice,
        verificationStatus: 'Verified by Engineer',
        verifiedBy: 'Er. B. Barua (Executive Engineer, PWD Assam)',
        maintenanceStatus: 'Work Order Dispatched'
      })
      setSuccessNotice(`Defect ${currentDefect.id} verified and work order dispatched!`)
    } else {
      onUpdateDefect(currentDefect.id, {
        verificationStatus: 'Rejected (False Positive)',
        maintenanceStatus: 'Closed - No Repair Needed'
      })
      setSuccessNotice(`Defect ${currentDefect.id} marked as False Positive.`)
    }

    setTimeout(() => {
      setSuccessNotice(null)
    }, 3500)
  }

  // Engineer performance metrics
  const engineerMetrics = [
    { label: 'Weekly Verifications', value: '42 Signed', color: '#10b981' },
    { label: 'Avg Turnaround Time', value: '3.4 Hours', color: '#38bdf8' },
    { label: 'SLA Repair Compliance', value: '92.4%', color: '#a855f7' },
    { label: 'Pending in Queue', value: `${defects.length} Items`, color: '#f59e0b' }
  ]

  // Weekly Inspection Activity Bar Graph Data
  const weeklyDays = [
    { day: 'Mon', count: 8 },
    { day: 'Tue', count: 12 },
    { day: 'Wed', count: 15 },
    { day: 'Thu', count: 9 },
    { day: 'Fri', count: 14 },
    { day: 'Sat', count: 6 }
  ]

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/40 border border-slate-800 p-6 rounded-3xl shadow-xl">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-cyan-500 flex items-center justify-center text-white text-xl shadow-lg shadow-indigo-500/20">
            <FontAwesomeIcon icon={faShieldHalved} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span>PWD Field Engineer Verification Desk</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 font-semibold">
                Official Sign-Off Mode
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Departmental governance: Validate AI detection distress, confirm severity, and issue maintenance work orders.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs bg-slate-950 px-4 py-2 rounded-2xl border border-slate-800">
          <span className="text-slate-400">Inspecting Officer:</span>
          <strong className="text-white">Er. B. Barua</strong>
          <span className="text-slate-600">•</span>
          <span className="text-cyan-400">Kamrup Rural Division</span>
        </div>
      </div>

      {/* Engineer Performance Ribbon & Activity Graph */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {engineerMetrics.map((m, i) => (
            <div key={i} className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 flex flex-col justify-between">
              <span className="text-slate-400 text-xs">{m.label}</span>
              <div className="text-xl font-black mt-2" style={{ color: m.color }}>
                {m.value}
              </div>
            </div>
          ))}
        </div>

        <div className="md:col-span-4 p-4 rounded-2xl bg-slate-900/50 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-white flex items-center gap-1.5">
              <FontAwesomeIcon icon={faChartBar} className="text-indigo-400" />
              <span>Inspection Velocity</span>
            </span>
            <span className="text-[10px] text-slate-400">This Week</span>
          </div>

          <div className="h-16 flex items-end justify-between gap-2 pt-2 px-1">
            {weeklyDays.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                <div
                  className="w-full bg-indigo-500/70 hover:bg-indigo-400 rounded-t transition-all"
                  style={{ height: `${(d.count / 16) * 100}%` }}
                />
                <span className="text-[9px] text-slate-400">{d.day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {successNotice && (
        <div className="bg-emerald-950/80 border border-emerald-500/50 p-4 rounded-2xl text-emerald-200 text-xs flex items-center gap-3 animate-fadeIn">
          <FontAwesomeIcon icon={faCircleCheck} className="text-lg text-emerald-400" />
          <span className="font-semibold">{successNotice}</span>
        </div>
      )}

      {/* Main Verification Split Screen */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Defect Queue */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
            <span>Pending Inspection Queue</span>
            <span className="text-cyan-400 font-semibold">{defects.length} Items</span>
          </h3>

          <div className="space-y-2.5">
            {defects.map((d) => (
              <div
                key={d.id}
                onClick={() => {
                  setSelectedId(d.id)
                  setSeverityChoice(d.aiSeverity)
                }}
                className={`cursor-pointer p-4 rounded-2xl border transition-all duration-200 ${
                  selectedId === d.id
                    ? 'bg-slate-800/90 border-cyan-500 shadow-lg shadow-cyan-500/10'
                    : 'bg-slate-900/40 border-slate-800 hover:bg-slate-900 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-xs">{d.id}</span>
                    <span className="text-[10px] px-2 py-0.2 rounded bg-slate-950 text-slate-400 border border-slate-800">
                      {d.type}
                    </span>
                  </div>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                      d.aiSeverity === 'Critical'
                        ? 'bg-red-950 text-red-400'
                        : d.aiSeverity === 'Medium'
                        ? 'bg-amber-950 text-amber-400'
                        : 'bg-blue-950 text-blue-400'
                    }`}
                  >
                    AI: {d.aiSeverity}
                  </span>
                </div>

                <div className="text-[11px] text-slate-300 font-medium line-clamp-1">
                  {d.locationDesc}
                </div>
                <div className="text-[10px] text-slate-500 mt-1 flex items-center justify-between">
                  <span>{d.road}</span>
                  <span className="text-emerald-400 font-semibold">{d.aiConfidence}% Conf.</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Detailed Inspection & Sign-off Panel */}
        <div className="lg:col-span-8 bg-slate-900/40 border border-slate-800 rounded-3xl p-6 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white">{currentDefect.id}</span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs text-cyan-300 font-semibold">{currentDefect.road}</span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{currentDefect.locationDesc}</p>
            </div>

            <button
              onClick={() => onSelectDefect(currentDefect.id)}
              className="cursor-pointer px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 flex items-center gap-1.5 transition-colors"
            >
              <FontAwesomeIcon icon={faEye} />
              <span>Full Evidence Pack</span>
            </button>
          </div>

          {/* Evidence Frame Preview */}
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-800 bg-black">
            <img
              src={currentDefect.evidenceImage}
              alt={currentDefect.type}
              className="w-full h-full object-cover"
            />
            {/* AI Bounding Box Overlay */}
            <div
              className="absolute border-2 border-red-500 bg-red-500/20 rounded-lg pointer-events-none"
              style={{
                top: currentDefect.boundingBox.y,
                left: currentDefect.boundingBox.x,
                width: currentDefect.boundingBox.width,
                height: currentDefect.boundingBox.height
              }}
            >
              <span className="absolute -top-6 left-0 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                {currentDefect.type} • {currentDefect.aiConfidence}% AI Detection
              </span>
            </div>

            <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-lg text-white text-xs border border-white/10">
              Sensor: {currentDefect.source}
            </div>
          </div>

          {/* Engineering Verification Form */}
          <div className="space-y-4 pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Departmental Engineering Decisions
            </h4>

            {/* Severity Confirmation */}
            <div>
              <label className="block text-xs text-slate-300 font-semibold mb-2">
                Confirmed Severity (Overrides AI Suggestion if Needed):
              </label>
              <div className="grid grid-cols-4 gap-2">
                {['Low', 'Medium', 'High', 'Critical'].map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setSeverityChoice(level)}
                    className={`cursor-pointer py-2 rounded-xl text-xs font-bold border transition-all ${
                      severityChoice === level
                        ? level === 'Critical'
                          ? 'bg-red-600 text-white border-red-500 shadow-md shadow-red-500/30'
                          : level === 'High'
                          ? 'bg-orange-600 text-white border-orange-500'
                          : level === 'Medium'
                          ? 'bg-amber-600 text-white border-amber-500'
                          : 'bg-emerald-600 text-white border-emerald-500'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white hover:bg-slate-900'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Contractor Dispatch */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-300 font-semibold mb-1">
                  Assign Maintenance Agency / Contractor:
                </label>
                <select
                  value={contractor}
                  onChange={(e) => setContractor(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-cyan-500"
                >
                  <option>M/S Brahmaputra Highway Infra</option>
                  <option>Assam State PWD Maintenance Division II</option>
                  <option>Nagaon Fast-Track Road Maintenance Unit</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-slate-300 font-semibold mb-1">
                  Target Repair SLA:
                </label>
                <input
                  type="text"
                  readOnly
                  value="48 Hours (Rapid Bitumen Patching)"
                  className="w-full bg-slate-950/60 border border-slate-800 text-slate-400 text-xs rounded-xl px-3 py-2 cursor-not-allowed"
                />
              </div>
            </div>

            {/* Engineer Remarks */}
            <div>
              <label className="block text-xs text-slate-300 font-semibold mb-1">
                Official Engineering Inspection Remarks:
              </label>
              <textarea
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Enter field assessment remarks (e.g. Sub-base intact, cold-mix compaction advised)..."
                rows="2"
                className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl p-3 focus:outline-none focus:border-cyan-500 placeholder:text-slate-600"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => handleVerify('reject')}
                className="cursor-pointer px-4 py-2.5 rounded-xl bg-slate-950 hover:bg-red-950/50 text-red-400 hover:text-red-300 text-xs font-semibold border border-red-900/40 transition-colors flex items-center gap-1.5"
              >
                <FontAwesomeIcon icon={faXmark} />
                <span>Reject (False Detection)</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleVerify('approve')}
                  className="cursor-pointer px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/25 transition-all flex items-center gap-2"
                >
                  <FontAwesomeIcon icon={faCheck} />
                  <span>Verify Severity & Issue Work Order</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
