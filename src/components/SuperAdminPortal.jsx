import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faSliders, 
  faBolt, 
  faBuildingColumns, 
  faShieldHalved, 
  faCircleCheck,
  faLayerGroup,
  faRotateRight,
  faUserGear,
  faDatabase,
  faChartLine,
  faMicrochip,
  faChartBar
} from '@fortawesome/free-solid-svg-icons'

export default function SuperAdminPortal() {
  const [dedupRadius, setDedupRadius] = useState(15)
  const [confidenceThreshold, setConfidenceThreshold] = useState(80)
  const [autoEscalate, setAutoEscalate] = useState(true)
  const [savedNotice, setSavedNotice] = useState(false)

  const handleSave = () => {
    setSavedNotice(true)
    setTimeout(() => setSavedNotice(false), 2500)
  }

  const aiModels = [
    {
      name: 'RoadYOLO-v4.2-Assam',
      tag: 'Active Production Model',
      mAP: '94.2%',
      latency: '22ms (Edge TensorRT)',
      trainedOn: 'Assam Highway Monsoons & State Roads Dataset (142,000 annotated frames)',
      status: 'Active'
    },
    {
      name: 'SegFormer-B3-AssamPavement',
      tag: 'Shadow Evaluation Model',
      mAP: '91.8%',
      latency: '45ms (Cloud Inference)',
      trainedOn: 'Alligator Crack & Rutting Depth Estimation Dataset',
      status: 'Benchmarking'
    }
  ]

  const circles = [
    { name: 'Guwahati Circle', divisions: ['Kamrup Metro PWD', 'Kamrup Rural PWD'], activeVehicles: 2, totalKm: '1,240 km' },
    { name: 'Nagaon Circle', divisions: ['Nagaon Central PWD', 'Kaliabor PWD'], activeVehicles: 1, totalKm: '1,580 km' },
    { name: 'Morigaon Circle', divisions: ['Morigaon PWD', 'Mayong PWD'], activeVehicles: 1, totalKm: '960 km' },
    { name: 'Silchar Circle', divisions: ['Cachar Highway Division', 'Karimganj PWD'], activeVehicles: 1, totalKm: '1,040 km' }
  ]

  // Model benchmark accuracy progression data
  const modelProgression = [
    { version: 'v3.2 (MobileNet)', map: 76.4 },
    { version: 'v3.8 (YOLOv8s)', map: 85.2 },
    { version: 'v4.0 (YOLOv11)', map: 91.5 },
    { version: 'v4.2 (RoadYOLO-Assam)', map: 94.2 }
  ]

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-3xl flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white text-xl shadow-lg shadow-purple-600/20">
            <FontAwesomeIcon icon={faSliders} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span>Super Admin & AI Model Management</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-950 text-purple-400 border border-purple-800 font-semibold">
                Section 12 System Ops
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Configure AI vision thresholds, spatial deduplication parameters, edge telemetry, and departmental hierarchy.
            </p>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="cursor-pointer px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-bold shadow-lg shadow-cyan-500/25 transition-all"
        >
          {savedNotice ? '✓ Configuration Saved' : 'Save System Parameters'}
        </button>
      </div>

      {/* AI Performance & Telemetry Analytics Row */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Model Accuracy Progression Graph (6 Cols) */}
        <div className="md:col-span-6 bg-slate-900/40 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-6 w-6 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center text-xs">
                <FontAwesomeIcon icon={faChartLine} />
              </span>
              <h3 className="text-sm font-bold text-white">
                Deep Learning Model Accuracy (mAP@0.5)
              </h3>
            </div>
            <span className="text-xs text-emerald-400 font-bold">+17.8% Gain</span>
          </div>

          <p className="text-xs text-slate-400">
            Trained on Assam-specific monsoon asphalt, heavy pothole cavities, and highway lighting variations.
          </p>

          <div className="h-36 flex items-end justify-between gap-4 pt-4 px-2">
            {modelProgression.map((item, idx) => {
              const heightPct = ((item.map - 60) / 40) * 100
              const isCurrent = idx === modelProgression.length - 1

              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                  <span className={`text-[10px] font-bold ${isCurrent ? 'text-emerald-400' : 'text-slate-400'}`}>
                    {item.map}%
                  </span>
                  <div
                    className={`w-full rounded-t-lg transition-all ${
                      isCurrent
                        ? 'bg-gradient-to-t from-emerald-600 to-teal-400 shadow-lg shadow-emerald-500/20'
                        : 'bg-slate-800 hover:bg-slate-700'
                    }`}
                    style={{ height: `${heightPct}%` }}
                  />
                  <span className="text-[9px] text-slate-400 font-semibold truncate w-full text-center">
                    {item.version}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Edge Hardware & Spatial Deduplication Efficiency (6 Cols) */}
        <div className="md:col-span-6 bg-slate-900/40 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2">
            <span className="h-6 w-6 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs">
              <FontAwesomeIcon icon={faMicrochip} />
            </span>
            <h3 className="text-sm font-bold text-white">
              Edge AI Telemetry & Spatial Deduplication
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
              <div className="text-[11px] text-slate-400">Vehicle Edge GPU Latency</div>
              <div className="text-xl font-black text-cyan-400 mt-1">22 ms</div>
              <div className="text-[10px] text-emerald-400 mt-0.5">Real-time 60 FPS Stream</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
              <div className="text-[11px] text-slate-400">Deduplication Ratio</div>
              <div className="text-xl font-black text-purple-400 mt-1">76.4%</div>
              <div className="text-[10px] text-slate-400 mt-0.5">318 redundant tickets pruned</div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-300">PostGIS Spatial Index Query Speed:</span>
              <span className="text-emerald-400">4.2 ms (Indexed R-Tree)</span>
            </div>
            <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full w-[94%]" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: AI & Spatial Parameters */}
        <div className="lg:col-span-6 bg-slate-900/40 border border-slate-800 p-6 rounded-3xl space-y-6">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <FontAwesomeIcon icon={faBolt} className="text-amber-400" />
            <span>AI Model & Spatial Deduplication Settings</span>
          </h3>

          {/* Deduplication Distance */}
          <div className="space-y-2 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-semibold">Deduplication Proximity Radius:</span>
              <span className="font-bold text-cyan-400">{dedupRadius} Meters</span>
            </div>
            <input
              type="range"
              min="5"
              max="50"
              value={dedupRadius}
              onChange={(e) => setDedupRadius(Number(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />
            <p className="text-[11px] text-slate-500">
              Reports logged within this radius on the same road segment are merged into a single canonical defect.
            </p>
          </div>

          {/* Confidence Threshold */}
          <div className="space-y-2 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-semibold">AI Defect Alert Trigger Confidence:</span>
              <span className="font-bold text-emerald-400">{confidenceThreshold}%</span>
            </div>
            <input
              type="range"
              min="50"
              max="95"
              value={confidenceThreshold}
              onChange={(e) => setConfidenceThreshold(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <p className="text-[11px] text-slate-500">
              Only detections exceeding this threshold are flagged automatically for priority engineer verification.
            </p>
          </div>

          {/* Toggle Auto Escalate */}
          <div className="flex items-center justify-between bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
            <div>
              <div className="text-xs font-semibold text-slate-200">
                Critical Distress Auto-Escalation
              </div>
              <p className="text-[11px] text-slate-500">
                Send immediate SMS/Email alert to Executive Engineer if pothole depth &gt; 35mm.
              </p>
            </div>
            <input
              type="checkbox"
              checked={autoEscalate}
              onChange={(e) => setAutoEscalate(e.target.checked)}
              className="h-5 w-5 accent-cyan-500 cursor-pointer rounded"
            />
          </div>

          {/* AI Models Registry */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Registered Deep Learning Vision Models
            </h4>
            {aiModels.map((m, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-xs">{m.name}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-semibold">
                    {m.status}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400">{m.trainedOn}</div>
                <div className="flex items-center gap-4 text-[11px] text-slate-500 pt-1">
                  <span>Accuracy: <strong className="text-cyan-400">{m.mAP}</strong></span>
                  <span>Latency: <strong className="text-purple-400">{m.latency}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Department Hierarchy & Infrastructure */}
        <div className="lg:col-span-6 bg-slate-900/40 border border-slate-800 p-6 rounded-3xl space-y-6">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <FontAwesomeIcon icon={faBuildingColumns} className="text-cyan-400" />
            <span>Assam PWD Administrative Circles & Divisions</span>
          </h3>

          <div className="space-y-3">
            {circles.map((c, i) => (
              <div key={i} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-xs">{c.name}</span>
                  <span className="text-[11px] text-cyan-400 font-medium">
                    {c.activeVehicles} Survey Vehicles Active
                  </span>
                </div>
                <div className="text-[11px] text-slate-400">
                  Divisions: {c.divisions.join(' • ')}
                </div>
                <div className="text-[10px] text-slate-500">
                  Monitored Network: {c.totalKm}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <FontAwesomeIcon icon={faDatabase} className="text-cyan-400" />
              <span>Database & GIS Stack Status</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800/80">
                <div className="text-slate-400">Spatial Database</div>
                <div className="text-emerald-400 font-bold mt-0.5">PostgreSQL 16 + PostGIS 3.4</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800/80">
                <div className="text-slate-400">Evidence Storage</div>
                <div className="text-cyan-400 font-bold mt-0.5">S3-Compatible Object Store</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
