import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faXmark, 
  faRoad, 
  faTriangleExclamation, 
  faShieldHalved, 
  faLocationCrosshairs, 
  faCamera, 
  faClock, 
  faUsers, 
  faDownload, 
  faCheckCircle,
  faLayerGroup,
  faWrench,
  faRotateRight,
  faFilePdf,
  faEye
} from '@fortawesome/free-solid-svg-icons'

export default function EvidencePackModal({ defect, onClose, onUpdateStatus }) {
  if (!defect) return null

  const [activeTab, setActiveTab] = useState('evidence') // 'evidence' | 'duplicates' | 'audit' | 'resurvey'
  const [showBoundingBox, setShowBoundingBox] = useState(true)
  const [viewMode, setViewMode] = useState('original') // 'original' | 'repaired' | 'split'
  const [downloading, setDownloading] = useState(false)

  const handleDownload = () => {
    setDownloading(true)
    setTimeout(() => {
      setDownloading(false)
      alert(`Evidence Pack for ${defect.id} generated and exported successfully (PDF format).`)
    }, 1200)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-xl bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold tracking-wider">
              {defect.id}
            </span>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span>{defect.type}</span>
                <span className="text-xs font-normal text-slate-400">({defect.category})</span>
              </h2>
              <p className="text-xs text-slate-400">
                {defect.road} • {defect.locationDesc}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="cursor-pointer hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
            >
              <FontAwesomeIcon icon={faDownload} className="text-cyan-400" />
              <span>{downloading ? 'Exporting...' : 'Export Evidence Pack (PDF)'}</span>
            </button>
            <button
              onClick={onClose}
              className="cursor-pointer h-9 w-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
        </div>

        {/* Modal Tabs */}
        <div className="px-6 py-2 border-b border-slate-800/80 bg-slate-900/50 flex items-center space-x-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('evidence')}
            className={`cursor-pointer px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'evidence'
                ? 'bg-cyan-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <FontAwesomeIcon icon={faCamera} />
            <span>AI Evidence & Visuals</span>
          </button>

          <button
            onClick={() => setActiveTab('duplicates')}
            className={`cursor-pointer px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'duplicates'
                ? 'bg-cyan-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <FontAwesomeIcon icon={faUsers} />
            <span>Citizen Deduplication ({defect.duplicateCount})</span>
          </button>

          <button
            onClick={() => setActiveTab('resurvey')}
            className={`cursor-pointer px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'resurvey'
                ? 'bg-cyan-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <FontAwesomeIcon icon={faWrench} />
            <span>Repair & Re-Survey Lifecycle</span>
          </button>

          <button
            onClick={() => setActiveTab('audit')}
            className={`cursor-pointer px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'audit'
                ? 'bg-cyan-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <FontAwesomeIcon icon={faClock} />
            <span>Audit & Verification Trail</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'evidence' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Evidence Photo Container */}
              <div className="lg:col-span-8 flex flex-col gap-3">
                <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-black aspect-video flex items-center justify-center group">
                  <img
                    src={viewMode === 'repaired' && defect.repairedImage ? defect.repairedImage : defect.evidenceImage}
                    alt={defect.type}
                    className="w-full h-full object-cover"
                  />

                  {/* AI Bounding Box Overlay */}
                  {showBoundingBox && viewMode === 'original' && (
                    <div
                      className="absolute border-2 border-red-500 bg-red-500/20 rounded-lg pointer-events-none transition-all duration-300 animate-pulse"
                      style={{
                        top: defect.boundingBox.y,
                        left: defect.boundingBox.x,
                        width: defect.boundingBox.width,
                        height: defect.boundingBox.height
                      }}
                    >
                      <span className="absolute -top-7 left-0 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                        {defect.type} • {defect.aiConfidence}% AI Conf.
                      </span>
                    </div>
                  )}

                  {/* Watermark Details */}
                  <div className="absolute bottom-3 left-3 bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-[11px] text-white space-y-0.5">
                    <div>GPS: {defect.gps.lat.toFixed(4)}° N, {defect.gps.lng.toFixed(4)}° E (±2.1m)</div>
                    <div className="text-slate-400 text-[10px]">{defect.detectedAt} • {defect.source}</div>
                  </div>
                </div>

                {/* Photo Controls */}
                <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950/40 p-3 rounded-xl border border-slate-800">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowBoundingBox(!showBoundingBox)}
                      className={`cursor-pointer px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                        showBoundingBox
                          ? 'bg-red-500/20 text-red-300 border-red-500/40'
                          : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}
                    >
                      <FontAwesomeIcon icon={faEye} className="mr-1.5" />
                      {showBoundingBox ? 'Hide AI Bounding Box' : 'Show AI Bounding Box'}
                    </button>

                    {defect.repairedImage && (
                      <div className="flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700 text-xs">
                        <button
                          onClick={() => setViewMode('original')}
                          className={`cursor-pointer px-2.5 py-1 rounded-md transition-colors ${
                            viewMode === 'original' ? 'bg-cyan-600 text-white' : 'text-slate-400'
                          }`}
                        >
                          Defect Detection
                        </button>
                        <button
                          onClick={() => setViewMode('repaired')}
                          className={`cursor-pointer px-2.5 py-1 rounded-md transition-colors ${
                            viewMode === 'repaired' ? 'bg-emerald-600 text-white' : 'text-slate-400'
                          }`}
                        >
                          Post-Repair Re-Survey
                        </button>
                      </div>
                    )}
                  </div>

                  <span className="text-[11px] text-slate-400">
                    Model: <strong className="text-slate-200">{defect.model}</strong>
                  </span>
                </div>
              </div>

              {/* Side Metadata Card */}
              <div className="lg:col-span-4 space-y-4">
                <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Defect Intelligence Summary
                  </h3>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-slate-800/80">
                      <span className="text-slate-400">Defect Code:</span>
                      <span className="font-semibold text-white">{defect.id}</span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-slate-800/80">
                      <span className="text-slate-400">Road Corridor:</span>
                      <span className="font-semibold text-cyan-300">{defect.road}</span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-slate-800/80">
                      <span className="text-slate-400">AI Confidence:</span>
                      <span className="font-bold text-emerald-400">{defect.aiConfidence}%</span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-slate-800/80">
                      <span className="text-slate-400">AI Severity Rating:</span>
                      <span className="px-2 py-0.5 rounded font-semibold bg-red-950 text-red-400 border border-red-800">
                        {defect.aiSeverity}
                      </span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-slate-800/80">
                      <span className="text-slate-400">Verified Severity:</span>
                      <span className="px-2 py-0.5 rounded font-semibold bg-amber-950 text-amber-400 border border-amber-800">
                        {defect.verifiedSeverity}
                      </span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-slate-800/80">
                      <span className="text-slate-400">Verification Status:</span>
                      <span className="text-emerald-400 font-medium">{defect.verificationStatus}</span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-slate-800/80">
                      <span className="text-slate-400">Verified By:</span>
                      <span className="text-slate-200 text-right">{defect.verifiedBy}</span>
                    </div>

                    <div className="flex justify-between py-1">
                      <span className="text-slate-400">Maintenance:</span>
                      <span className="text-cyan-400 font-semibold">{defect.maintenanceStatus}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-tr from-cyan-950/40 to-slate-900/60 p-4 rounded-2xl border border-cyan-800/30 text-xs text-slate-300 space-y-2">
                  <div className="font-bold text-cyan-400 flex items-center gap-1.5">
                    <FontAwesomeIcon icon={faShieldHalved} />
                    <span>Section 17 Governance Compliance</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    AI models serve as decision-support signals. Official severity grading and closure are certified by PWD Executive Engineers.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'duplicates' && (
            <div className="space-y-4">
              <div className="bg-cyan-950/30 border border-cyan-800/50 p-4 rounded-2xl flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-cyan-300">
                    Smart Deduplication & Proximity Grouping
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Assam AI RoadWatch auto-grouped {defect.duplicateCount} citizen reports to {defect.id} using GPS proximity (&lt;15m) and image similarity.
                  </p>
                </div>
                <span className="px-3 py-1 rounded-xl bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-500/30">
                  {defect.duplicateCount} Associated Citizen Inputs
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {defect.citizenReports.length > 0 ? (
                  defect.citizenReports.map((report) => (
                    <div
                      key={report.id}
                      className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white">{report.id}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                            {report.distance}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 font-medium">"{report.note}"</p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 space-y-0.5">
                        <div className="text-slate-300 font-semibold">{report.reporter}</div>
                        <div className="text-slate-500">{report.time} • {report.phone}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-3 text-center py-8 text-slate-500 text-xs">
                    No duplicate citizen reports logged for this specific section.
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'resurvey' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-red-400">Step 1: Original Detection</span>
                    <span className="text-[10px] text-slate-400">{defect.detectedAt}</span>
                  </div>
                  <div className="aspect-video rounded-xl overflow-hidden border border-slate-800">
                    <img src={defect.evidenceImage} alt="Defect" className="w-full h-full object-cover" />
                  </div>
                  <p className="text-xs text-slate-400">
                    Initial defect discovered during scheduled route inspection by {defect.source}.
                  </p>
                </div>

                <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-400">Step 2: Post-Repair Re-Survey</span>
                    <span className="text-[10px] text-emerald-400 font-semibold">Verified Closure</span>
                  </div>
                  <div className="aspect-video rounded-xl overflow-hidden border border-emerald-800/40">
                    {defect.repairedImage ? (
                      <img src={defect.repairedImage} alt="Repaired" className="w-full h-full object-cover" />
                    ) : (
                      <div className="h-full flex items-center justify-center text-slate-500 text-xs">
                        Repair in progress. Re-survey queued.
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-slate-400">
                    {defect.repairedImage
                      ? 'Re-survey vehicle pass confirmed defect elimination and road surface leveling.'
                      : 'Pending contractor repair completion.'}
                  </p>
                </div>
              </div>

              {/* Maintenance Lifecycle progress */}
              <div className="bg-slate-950/40 p-5 rounded-2xl border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Full Defect Lifecycle (Section 7 Specification)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center text-xs">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-emerald-400 font-bold mb-1">1. First Detection</div>
                    <div className="text-[10px] text-slate-400">AI Edge Flagged</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-cyan-400 font-bold mb-1">2. Verification</div>
                    <div className="text-[10px] text-slate-400">Er. B. Barua Approved</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-amber-400 font-bold mb-1">3. Maintenance</div>
                    <div className="text-[10px] text-slate-400">{defect.workOrder}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-emerald-500/50 bg-emerald-950/20">
                    <div className="text-emerald-300 font-bold mb-1">4. Re-Survey Verified</div>
                    <div className="text-[10px] text-emerald-400">Closed in System</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'audit' && (
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Departmental Audit Trail & Chain of Custody
              </h4>
              <div className="relative border-l-2 border-slate-800 ml-4 space-y-6 py-2">
                {defect.auditHistory.map((item, index) => (
                  <div key={index} className="relative pl-6">
                    <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-cyan-500 border-4 border-slate-900"></div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-white">{item.stage}</span>
                      <span className="text-[10px] text-slate-500">{item.time}</span>
                    </div>
                    <div className="text-xs text-cyan-400 font-medium mt-0.5">{item.actor}</div>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">{item.note}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-xs">
          <span className="text-slate-400">
            Authoritative Department Data • Assam PWD Roads Division
          </span>
          <button
            onClick={onClose}
            className="cursor-pointer px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition-colors"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  )
}
