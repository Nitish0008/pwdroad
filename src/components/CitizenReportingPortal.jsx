import React, { useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faCamera, 
  faLocationCrosshairs, 
  faArrowsSplitUpAndLeft, 
  faCheckCircle, 
  faCircleCheck, 
  faRotateRight, 
  faUpload, 
  faFileLines, 
  faRoad, 
  faTriangleExclamation,
  faEye,
  faUser,
  faClock,
  faChartLine,
  faImage,
  faCloudArrowUp,
  faFolderOpen
} from '@fortawesome/free-solid-svg-icons'
import { initialCitizenTickets } from '../data/mockData'

export default function CitizenReportingPortal({ currentUser, onSelectDefect }) {
  const [tickets, setTickets] = useState(initialCitizenTickets)
  const [activeTab, setActiveTab] = useState('newReport') // 'newReport' | 'myTickets'
  
  // Photo Upload State
  const fileInputRef = useRef(null)
  const [uploadedImage, setUploadedImage] = useState('/evidence/pothole_defect.jpg')
  const [imageFileName, setImageFileName] = useState('pothole_evidence_sonapur.jpg')
  const [imageFileSize, setImageFileSize] = useState('2.4 MB')
  const [isDragOver, setIsDragOver] = useState(false)

  // Form State
  const [defectType, setDefectType] = useState('Pothole')
  const [corridor, setCorridor] = useState('NH-27 Segment B (Sonapur - Jorabat)')
  const [landmark, setLandmark] = useState('Near Sonapur Overpass, Km 14.8')
  const [description, setDescription] = useState('Deep water-filled pothole on left lane, hazardous for two-wheelers.')
  const [submitting, setSubmitting] = useState(false)
  const [submissionResult, setSubmissionResult] = useState(null)

  // Handle local file selection
  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0]
    if (file) {
      processSelectedFile(file)
    }
  }

  const processSelectedFile = (file) => {
    setImageFileName(file.name)
    const sizeInMb = (file.size / (1024 * 1024)).toFixed(1)
    setImageFileSize(`${sizeInMb} MB`)
    const objectUrl = URL.createObjectURL(file)
    setUploadedImage(objectUrl)
  }

  // Handle drag and drop
  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragOver(false)
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processSelectedFile(e.dataTransfer.files[0])
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitting(true)

    setTimeout(() => {
      setSubmitting(false)
      const newTicketId = `CIT-AS-2026-${Math.floor(1000 + Math.random() * 9000)}`
      const resultObj = {
        ticketId: newTicketId,
        date: 'Just now',
        defectType: defectType,
        location: `${corridor} • ${landmark}`,
        status: 'Merged & Prioritised',
        statusCode: 'merged',
        photo: uploadedImage,
        canonicalDefectId: 'PTH-102',
        repairedPhoto: null,
        engineerRemarks: 'Auto-grouped with Defect #PTH-102 due to GPS proximity match (3.8m away).',
        dedupNote: 'Smart Deduplication: 3 other citizens previously flagged this spot. Your report increased priority!'
      }

      setSubmissionResult(resultObj)
      setTickets((prev) => [resultObj, ...prev])
    }, 1500)
  }

  const handleResetForm = () => {
    setSubmissionResult(null)
    setDescription('')
  }

  const displayName = currentUser?.name || 'Nitish Hashim'

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Citizen Web Application Console Header */}
      <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-3xl flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3.5">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white text-xl shadow-lg shadow-cyan-500/20">
            <FontAwesomeIcon icon={faCamera} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white">
                Citizen Road Grievance & Reporting Console
              </h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800 font-semibold">
                Web Application View
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Welcome, <strong className="text-slate-200">{displayName}</strong> ({currentUser?.division || 'Kamrup Metro (Guwahati)'}) • Verified Citizen Reporter
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center bg-slate-950 p-1 rounded-2xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('newReport')}
            className={`cursor-pointer px-4 py-2 rounded-xl font-semibold transition-all ${
              activeTab === 'newReport'
                ? 'bg-cyan-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FontAwesomeIcon icon={faCamera} className="mr-1.5" />
            Submit Damage Report
          </button>
          <button
            onClick={() => setActiveTab('myTickets')}
            className={`cursor-pointer px-4 py-2 rounded-xl font-semibold transition-all ${
              activeTab === 'myTickets'
                ? 'bg-cyan-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FontAwesomeIcon icon={faFileLines} className="mr-1.5" />
            My Tracked Grievances ({tickets.length})
          </button>
        </div>
      </div>

      {/* Citizen Impact Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-900/40 border border-slate-800 p-4 rounded-2xl">
          <div className="text-slate-400 text-xs">Reports Logged</div>
          <div className="text-2xl font-black text-white mt-1">{tickets.length}</div>
          <div className="text-[11px] text-cyan-400 mt-1">Verified with GPS</div>
        </div>

        <div className="bg-slate-900/40 border border-slate-800 p-4 rounded-2xl">
          <div className="text-slate-400 text-xs">Repairs Completed</div>
          <div className="text-2xl font-black text-emerald-400 mt-1">1 Resolved</div>
          <div className="text-[11px] text-emerald-400 mt-1">Re-Survey Certified</div>
        </div>

        <div className="bg-slate-900/40 border border-slate-800 p-4 rounded-2xl">
          <div className="text-slate-400 text-xs">Community Safety Points</div>
          <div className="text-2xl font-black text-amber-400 mt-1">1,240 XP</div>
          <div className="text-[11px] text-amber-400 mt-1">Gold Citizen Tier</div>
        </div>

        <div className="bg-slate-900/40 border border-slate-800 p-4 rounded-2xl">
          <div className="text-slate-400 text-xs">Assam Division</div>
          <div className="text-base font-bold text-slate-200 mt-1.5">Kamrup Metro</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Dispur Circle</div>
        </div>
      </div>

      {/* Main View: Submit New Report (Full Web Application View) */}
      {activeTab === 'newReport' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Form: 7 Cols */}
          <div className="lg:col-span-7 bg-slate-900/40 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white">
                Road Distress Submission Form
              </h3>
              <span className="text-[11px] text-cyan-400 font-semibold bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                Direct Sync with PWD Queue
              </span>
            </div>

            {!submissionResult ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* 1. Working File Upload (Drag & Drop or Select Local File) */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-semibold text-slate-300">
                      1. Road Damage Photo Evidence (Upload from Local Device)
                    </label>
                    <span className="text-[11px] text-cyan-400">JPG, PNG, HEIC up to 25MB</span>
                  </div>

                  {/* Hidden file input */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  {/* Drag and Drop Zone */}
                  <div
                    onDragOver={(e) => { e.preventDefault(); setIsDragOver(true) }}
                    onDragLeave={() => setIsDragOver(false)}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`relative aspect-video rounded-2xl overflow-hidden border-2 border-dashed cursor-pointer transition-all flex flex-col items-center justify-center group ${
                      isDragOver
                        ? 'border-cyan-400 bg-cyan-950/40 scale-[1.01]'
                        : 'border-cyan-500/50 hover:border-cyan-400 bg-slate-950'
                    }`}
                  >
                    {uploadedImage ? (
                      <>
                        <img
                          src={uploadedImage}
                          alt="Uploaded road defect"
                          className="w-full h-full object-cover group-hover:brightness-90 transition-all"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                          <button
                            type="button"
                            className="px-4 py-2 rounded-xl bg-cyan-600 text-white font-bold text-xs shadow-lg flex items-center gap-2"
                          >
                            <FontAwesomeIcon icon={faFolderOpen} />
                            <span>Click to Change / Browse Local File</span>
                          </button>
                          <span className="text-[11px] text-slate-200">or Drag & Drop a new image here</span>
                        </div>
                        {/* File Badge */}
                        <div className="absolute bottom-2 left-2 bg-slate-950/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700 text-xs text-slate-200 flex items-center gap-2">
                          <FontAwesomeIcon icon={faCheckCircle} className="text-emerald-400" />
                          <span className="font-semibold line-clamp-1">{imageFileName}</span>
                          <span className="text-slate-400">({imageFileSize})</span>
                        </div>
                      </>
                    ) : (
                      <div className="p-8 text-center space-y-2">
                        <div className="h-12 w-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xl mx-auto">
                          <FontAwesomeIcon icon={faCloudArrowUp} />
                        </div>
                        <div className="text-xs font-bold text-white">Click to Select Local Image from your Computer</div>
                        <div className="text-[11px] text-slate-400">or Drag & Drop photo here</div>
                      </div>
                    )}
                  </div>

                  {/* Preset Sample Images for quick testing */}
                  <div className="mt-2.5 flex flex-wrap items-center gap-2 text-xs">
                    <span className="text-slate-400 text-[11px]">Or select sample:</span>
                    <button
                      type="button"
                      onClick={() => {
                        setUploadedImage('/evidence/pothole_defect.jpg')
                        setImageFileName('pothole_defect.jpg')
                        setDefectType('Pothole')
                      }}
                      className="cursor-pointer px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] transition-colors border border-slate-700"
                    >
                      Pothole Defect Sample
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setUploadedImage('/evidence/crack_defect.jpg')
                        setImageFileName('crack_defect.jpg')
                        setDefectType('Cracks')
                      }}
                      className="cursor-pointer px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] transition-colors border border-slate-700"
                    >
                      Highway Crack Sample
                    </button>
                  </div>
                </div>

                {/* 2. Defect Type Selector */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">
                    2. Select Defect Category
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {['Pothole', 'Cracks', 'Rutting', 'Edge Spalling'].map((type) => (
                      <button
                        type="button"
                        key={type}
                        onClick={() => setDefectType(type)}
                        className={`cursor-pointer py-2 rounded-xl text-xs font-bold border transition-all ${
                          defectType === type
                            ? 'bg-cyan-600 text-white border-cyan-500 shadow-md shadow-cyan-500/25'
                            : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Location & GPS Geotag */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Assam Highway Corridor
                    </label>
                    <select
                      value={corridor}
                      onChange={(e) => setCorridor(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-cyan-500"
                    >
                      <option>NH-27 Segment B (Sonapur - Jorabat)</option>
                      <option>NH-27 Segment A (Guwahati Bypass)</option>
                      <option>NH-27 Segment C (Sonapur - Jagiroad)</option>
                      <option>NH-27 Segment D (Jagiroad - Nagaon)</option>
                      <option>SH-3 Barpeta Highway Corridor</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Nearest Landmark / Milestone
                    </label>
                    <input
                      type="text"
                      value={landmark}
                      onChange={(e) => setLandmark(e.target.value)}
                      placeholder="e.g. Near Sonapur Overpass, Km 14.8"
                      className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                {/* Live GPS Bar */}
                <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-slate-300">
                    <FontAwesomeIcon icon={faLocationCrosshairs} className="text-cyan-400" />
                    <span>Device GPS Geotag: <strong>26.0683° N, 91.8656° E</strong> (Sonapur, Assam)</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800 font-bold">
                    GPS Accurate (±3m)
                  </span>
                </div>

                {/* 4. Description */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Hazard Description & Notes
                  </label>
                  <textarea
                    rows="2"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe size, depth, or traffic risk..."
                    className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl p-3 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full cursor-pointer py-3.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center gap-2"
                >
                  <FontAwesomeIcon icon={faUpload} />
                  <span>
                    {submitting
                      ? 'Analyzing Image with AI & Querying Deduplication Radius...'
                      : 'Submit Road Distress Report'}
                  </span>
                </button>
              </form>
            ) : (
              /* Success / Deduplication Result View */
              <div className="space-y-4 animate-fadeIn">
                <div className="p-5 rounded-2xl bg-cyan-950/40 border border-cyan-800/80 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                      <FontAwesomeIcon icon={faArrowsSplitUpAndLeft} />
                      <span>Smart Deduplication Success!</span>
                    </div>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold">
                      Ticket #{submissionResult.ticketId}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {submissionResult.dedupNote}
                  </p>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-2">
                    <div className="flex justify-between py-1 border-b border-slate-800/80">
                      <span className="text-slate-400">Canonical Defect Record:</span>
                      <strong className="text-cyan-400">#{submissionResult.canonicalDefectId}</strong>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-800/80">
                      <span className="text-slate-400">Road Corridor:</span>
                      <span className="text-slate-200">{submissionResult.location}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-800/80">
                      <span className="text-slate-400">AI Pre-Scan Result:</span>
                      <span className="text-emerald-400 font-semibold">Pothole (91.4% Confidence)</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-400">Next Action:</span>
                      <span className="text-amber-400 font-semibold">PWD Executive Engineer Verification</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleResetForm}
                    className="flex-1 cursor-pointer py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    <FontAwesomeIcon icon={faRotateRight} />
                    <span>Report Another Defect</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('myTickets')}
                    className="flex-1 cursor-pointer py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    <FontAwesomeIcon icon={faFileLines} />
                    <span>View In My Reports</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Info: 5 Cols (How Deduplication Works & Live Status) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-3xl space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                <FontAwesomeIcon icon={faArrowsSplitUpAndLeft} />
                <span>How Section 7 Deduplication Helps You</span>
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                When you submit a report, Assam AI RoadWatch checks if other citizens or PWD survey vehicles have already detected this pothole within <strong>15 meters</strong>.
              </p>
              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-xs text-slate-400 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                  <FontAwesomeIcon icon={faCircleCheck} />
                  <span>No duplicate paperwork for engineers</span>
                </div>
                <div className="flex items-center gap-2 text-cyan-400 font-semibold">
                  <FontAwesomeIcon icon={faCircleCheck} />
                  <span>Higher priority score for multi-reported defects</span>
                </div>
                <div className="flex items-center gap-2 text-amber-400 font-semibold">
                  <FontAwesomeIcon icon={faCircleCheck} />
                  <span>You receive post-repair photos once fixed!</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-3xl space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                PWD Grievance Redressal SLA
              </h4>
              <div className="text-xs text-slate-400 space-y-2">
                <div>Emergency Pothole Patching: <strong>Within 48 Hours</strong></div>
                <div>Executive Engineer Office: <strong>Kamrup Rural Circle, Dispur</strong></div>
                <div>Assam PWD Road Grievance Cell: <strong>1800-345-XXXX</strong></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main View: My Tracked Reports (Desktop Grid / Table View) */}
      {activeTab === 'myTickets' && (
        <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">
              My Submitted Reports & Resolution Tracking
            </h3>
            <span className="text-xs text-slate-400">
              Showing {tickets.length} reports submitted by {displayName}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tickets.map((t) => (
              <div
                key={t.id}
                className="bg-slate-950 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-white text-xs font-mono">{t.id}</span>
                    <span
                      className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold ${
                        t.statusCode === 'closed'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          : 'bg-amber-950 text-amber-400 border border-amber-800'
                      }`}
                    >
                      {t.status}
                    </span>
                  </div>

                  <div className="text-xs text-cyan-300 font-semibold">{t.defectType}</div>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-1">{t.location}</p>

                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <div className="aspect-video rounded-xl overflow-hidden border border-slate-800 relative">
                      <img src={t.photo} alt="Reported" className="w-full h-full object-cover" />
                      <span className="absolute bottom-1 left-1 bg-black/70 text-[9px] text-white px-1.5 py-0.2 rounded">
                        Before
                      </span>
                    </div>

                    <div className="aspect-video rounded-xl overflow-hidden border border-slate-800 relative bg-slate-900 flex items-center justify-center">
                      {t.repairedPhoto ? (
                        <>
                          <img src={t.repairedPhoto} alt="Repaired" className="w-full h-full object-cover" />
                          <span className="absolute bottom-1 left-1 bg-emerald-700 text-[9px] text-white px-1.5 py-0.2 rounded">
                            Repaired ✓
                          </span>
                        </>
                      ) : (
                        <span className="text-[10px] text-slate-500 text-center px-2">
                          Repair in progress...
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 space-y-1">
                  <div><strong>PWD Remark:</strong> {t.engineerRemarks}</div>
                  <div className="text-[10px] text-cyan-400">{t.dedupNote}</div>
                  <div className="text-[10px] text-slate-500 pt-1">{t.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
