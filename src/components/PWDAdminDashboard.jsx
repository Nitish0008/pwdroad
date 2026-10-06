import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faRoad, 
  faTriangleExclamation, 
  faShieldHalved, 
  faCamera, 
  faBolt, 
  faChartLine, 
  faCircleCheck,
  faLayerGroup,
  faFilePdf,
  faEye,
  faFilter,
  faArrowsSplitUpAndLeft,
  faRotateRight,
  faWrench,
  faChartPie,
  faChartBar
} from '@fortawesome/free-solid-svg-icons'
import GISMap from './GISMap'
import { systemMetrics } from '../data/mockData'

export default function PWDAdminDashboard({ segments, defects, onSelectDefect, selectedDefectId }) {
  const [filterType, setFilterType] = useState('ALL')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredDefects = defects.filter((d) => {
    const matchType = filterType === 'ALL' || d.type.toLowerCase().includes(filterType.toLowerCase())
    const matchSearch = d.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        d.road.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        d.locationDesc.toLowerCase().includes(searchQuery.toLowerCase())
    return matchType && matchSearch
  })

  // Monthly Trend Data for Graph
  const monthlyTrends = [
    { month: 'May', detected: 85, repaired: 68 },
    { month: 'Jun', detected: 142, repaired: 110 },
    { month: 'Jul (Monsoon)', detected: 260, repaired: 195 },
    { month: 'Aug', detected: 210, repaired: 180 },
    { month: 'Sep', detected: 165, repaired: 152 },
    { month: 'Oct (Current)', detected: 145, repaired: 89 }
  ]

  // Distress type breakdown
  const distressBreakdown = [
    { label: 'Potholes', percent: 45, count: 65, color: '#ef4444' },
    { label: 'Cracks (Long./Trans.)', percent: 28, count: 41, color: '#f59e0b' },
    { label: 'Rutting & Deformation', percent: 18, count: 26, color: '#f97316' },
    { label: 'Edge Spalling', percent: 9, count: 13, color: '#38bdf8' }
  ]

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* KPI Stats Ribbon */}
      <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-2xl flex flex-col justify-between">
          <div className="text-slate-400 text-xs font-medium">Network Scanned</div>
          <div className="text-xl sm:text-2xl font-black text-white mt-1">
            {systemMetrics.totalKmScanned}
          </div>
          <div className="text-[11px] text-emerald-400 mt-2 font-medium flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
            Assam PWD Roads
          </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-2xl flex flex-col justify-between">
          <div className="text-slate-400 text-xs font-medium">Active Defects</div>
          <div className="text-xl sm:text-2xl font-black text-amber-400 mt-1">
            {systemMetrics.activeDefects}
          </div>
          <div className="text-[11px] text-slate-400 mt-2">
            38 Critical Distress
          </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-2xl flex flex-col justify-between">
          <div className="text-slate-400 text-xs font-medium">Avg Road Health (RHI)</div>
          <div className="text-xl sm:text-2xl font-black text-emerald-400 mt-1">
            {systemMetrics.avgHealthScore} <span className="text-xs text-slate-500 font-normal">/ 100</span>
          </div>
          <div className="text-[11px] text-emerald-400 mt-2">
            Fair Overall Condition
          </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-2xl flex flex-col justify-between">
          <div className="text-slate-400 text-xs font-medium">Deduplicated Reports</div>
          <div className="text-xl sm:text-2xl font-black text-cyan-400 mt-1">
            {systemMetrics.citizenReportsMerged}
          </div>
          <div className="text-[11px] text-cyan-400 mt-2 font-medium">
            Reduced Redundancy
          </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-2xl flex flex-col justify-between">
          <div className="text-slate-400 text-xs font-medium">Repairs Verified</div>
          <div className="text-xl sm:text-2xl font-black text-indigo-400 mt-1">
            {systemMetrics.repairsVerifiedThisMonth}
          </div>
          <div className="text-[11px] text-indigo-400 mt-2">
            Post-Survey Validated
          </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-2xl flex flex-col justify-between">
          <div className="text-slate-400 text-xs font-medium">AI Precision</div>
          <div className="text-xl sm:text-2xl font-black text-purple-400 mt-1">
            {systemMetrics.aiModelPrecision}
          </div>
          <div className="text-[11px] text-purple-400 mt-2">
            {systemMetrics.inferenceSpeed} latency
          </div>
        </div>
      </section>

      {/* Analytics Graphs & Distribution Row */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Monthly Trend Graph (8 Cols) */}
        <div className="lg:col-span-8 bg-slate-900/40 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-6 w-6 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs">
                  <FontAwesomeIcon icon={faChartLine} />
                </span>
                <h3 className="text-sm font-bold text-white">
                  Monthly Surface Distress Detection vs. Repair Resolution
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Comparative throughput of survey detections and re-survey verified closures.
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-md bg-cyan-500"></span>
                <span className="text-slate-300 font-medium">AI Detected</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-md bg-emerald-500"></span>
                <span className="text-slate-300 font-medium">Verified Repaired</span>
              </div>
            </div>
          </div>

          {/* SVG Visual Graph */}
          <div className="h-48 w-full pt-4">
            <div className="h-full flex items-end justify-between gap-3 sm:gap-6 px-2">
              {monthlyTrends.map((t, idx) => {
                const maxVal = 280
                const detectedHeight = (t.detected / maxVal) * 100
                const repairedHeight = (t.repaired / maxVal) * 100

                return (
                  <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group">
                    <div className="w-full flex items-end justify-center gap-1 sm:gap-1.5 h-full">
                      {/* Detected Bar */}
                      <div
                        className="w-full max-w-[18px] bg-gradient-to-t from-cyan-600 to-cyan-400 rounded-t-md transition-all group-hover:brightness-110 relative"
                        style={{ height: `${detectedHeight}%` }}
                      >
                        <span className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-slate-900 border border-slate-700 text-[10px] text-cyan-300 px-1.5 py-0.5 rounded shadow whitespace-nowrap transition-opacity pointer-events-none">
                          {t.detected}
                        </span>
                      </div>
                      {/* Repaired Bar */}
                      <div
                        className="w-full max-w-[18px] bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-md transition-all group-hover:brightness-110 relative"
                        style={{ height: `${repairedHeight}%` }}
                      >
                        <span className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-slate-900 border border-slate-700 text-[10px] text-emerald-300 px-1.5 py-0.5 rounded shadow whitespace-nowrap transition-opacity pointer-events-none">
                          {t.repaired}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 text-[10px] font-semibold text-slate-400 text-center truncate w-full">
                      {t.month}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Right: Distress Category Donut / Breakdown (4 Cols) */}
        <div className="lg:col-span-4 bg-slate-900/40 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2">
            <span className="h-6 w-6 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center text-xs">
              <FontAwesomeIcon icon={faChartPie} />
            </span>
            <h3 className="text-sm font-bold text-white">
              Surface Distress Distribution
            </h3>
          </div>

          <div className="space-y-3 pt-2">
            {distressBreakdown.map((item, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-medium">{item.label}</span>
                  <span className="font-bold text-white">{item.percent}% ({item.count})</span>
                </div>
                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${item.percent}%`, backgroundColor: item.color }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400">
            Potholes represent 45% of active alerts, prioritized for rapid cold-mix patching within 48h.
          </div>
        </div>
      </section>

      {/* Interactive GIS Defect Map (Real Leaflet Dark Map) */}
      <section className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span>Geospatial Defect & Health Map (Leaflet / OpenStreetMap)</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-normal">
                PostGIS Layer
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Interactive NH-27 Corridor: Click defect markers to open full Evidence Pack.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400">Highlighted Defect:</span>
            <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 font-bold border border-cyan-800">
              {selectedDefectId || 'Click any pin'}
            </span>
          </div>
        </div>

        <GISMap
          segments={segments}
          defects={defects}
          onSelectDefect={onSelectDefect}
          selectedDefectId={selectedDefectId}
        />
      </section>

      {/* Road Segment Health & Prioritisation Matrix (Section 8 & 9) */}
      <section className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-6 w-6 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center text-xs">
                <FontAwesomeIcon icon={faChartLine} />
              </span>
              <h3 className="text-base font-bold text-white">
                Road Segment Health & Maintenance Prioritisation Matrix
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Authoritative PWD road breakdown with defect density, historical deterioration, and Road Health Index (RHI).
            </p>
          </div>

          <span className="text-xs px-3 py-1 rounded-xl bg-slate-800 text-slate-300 border border-slate-700">
            Formula: PWD Engineering Approved Standard
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 text-slate-400 uppercase text-[11px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3 px-4 font-semibold">Road Segment</th>
                <th className="py-3 px-4 font-semibold">Corridor Stretch</th>
                <th className="py-3 px-4 font-semibold">Length</th>
                <th className="py-3 px-4 font-semibold">Defects</th>
                <th className="py-3 px-4 font-semibold">Road Health Index</th>
                <th className="py-3 px-4 font-semibold">PWD Priority</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {segments.map((seg) => (
                <tr key={seg.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-white">
                    {seg.name}
                  </td>
                  <td className="py-3.5 px-4 text-slate-300 font-medium">
                    {seg.stretch}
                  </td>
                  <td className="py-3.5 px-4 text-slate-400">
                    {seg.lengthKm} km
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-amber-400">{seg.defectsCount} defects</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${seg.healthScore}%`,
                            backgroundColor: seg.color
                          }}
                        />
                      </div>
                      <span className="font-bold" style={{ color: seg.color }}>
                        {seg.healthScore}/100
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${
                        seg.priority === 'Critical'
                          ? 'bg-red-950 text-red-400 border border-red-800'
                          : seg.priority === 'High'
                          ? 'bg-orange-950 text-orange-400 border border-orange-800'
                          : seg.priority === 'Medium'
                          ? 'bg-amber-950 text-amber-400 border border-amber-800'
                          : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                      }`}
                    >
                      {seg.priority} Priority
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-400 text-[11px]">
                    {seg.status}
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => onSelectDefect('PTH-102')}
                      className="cursor-pointer text-cyan-400 hover:text-cyan-300 font-semibold text-xs flex items-center gap-1 hover:underline"
                    >
                      <span>Inspect</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Live AI Detection Stream & Evidence Browser */}
      <section className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <FontAwesomeIcon icon={faCamera} className="text-cyan-400" />
              <span>Continuous AI Detection Stream (PWD Survey Feed)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Live ingest from vehicle dashcams and survey sensors. Deduplicated in real-time.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-2 bg-slate-950/60 p-1 rounded-xl border border-slate-800 text-xs">
            {['ALL', 'Pothole', 'Crack', 'Rutting'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilterType(tab)}
                className={`cursor-pointer px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  filterType === tab ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab === 'ALL' ? 'All Distress' : tab}
              </button>
            ))}
          </div>
        </div>

        {/* Defect Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredDefects.map((defect) => (
            <div
              key={defect.id}
              className={`rounded-2xl border bg-slate-950/70 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-cyan-500/60 hover:shadow-xl ${
                selectedDefectId === defect.id ? 'border-cyan-500 ring-2 ring-cyan-500/30' : 'border-slate-800'
              }`}
            >
              <div className="relative aspect-video overflow-hidden bg-black group cursor-pointer" onClick={() => onSelectDefect(defect.id)}>
                <img
                  src={defect.evidenceImage}
                  alt={defect.type}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md text-white text-[10px] font-bold border border-white/10">
                    {defect.id}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-red-600 text-white text-[10px] font-bold">
                    {defect.aiConfidence}% AI Conf.
                  </span>
                </div>

                {defect.duplicateCount > 0 && (
                  <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-cyan-950/90 text-cyan-300 text-[10px] font-semibold border border-cyan-700/60">
                    +{defect.duplicateCount} Citizen Duplicates
                  </div>
                )}
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-white">{defect.type}</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                        defect.aiSeverity === 'Critical'
                          ? 'bg-red-950 text-red-400'
                          : defect.aiSeverity === 'Medium'
                          ? 'bg-amber-950 text-amber-400'
                          : 'bg-blue-950 text-blue-400'
                      }`}
                    >
                      {defect.aiSeverity}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-1">{defect.locationDesc}</p>
                  <p className="text-[10px] text-slate-500 mt-1">{defect.road}</p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                    {defect.verificationStatus.includes('Verified') ? 'Verified' : 'Pending'}
                  </div>

                  <button
                    onClick={() => onSelectDefect(defect.id)}
                    className="cursor-pointer px-3 py-1.5 rounded-lg bg-cyan-600/20 hover:bg-cyan-600 text-cyan-300 hover:text-white text-xs font-semibold border border-cyan-500/30 transition-all flex items-center gap-1"
                  >
                    <FontAwesomeIcon icon={faEye} />
                    <span>Evidence Pack</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
