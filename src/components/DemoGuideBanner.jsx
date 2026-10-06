import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faCircleCheck, 
  faArrowRight, 
  faEye, 
  faChevronDown, 
  faChevronUp,
  faLayerGroup,
  faBolt
} from '@fortawesome/free-solid-svg-icons'

export default function DemoGuideBanner({ onSelectDefect, onSwitchPortal }) {
  const [expanded, setExpanded] = useState(true)

  const steps = [
    {
      num: '1',
      title: 'GIS & Route Health',
      actionText: 'View NH-27 GIS Map',
      action: () => onSwitchPortal('admin'),
      desc: 'Inspect color-coded road health (Segments A-D) on the Assam corridor.'
    },
    {
      num: '2',
      title: 'Inspect Defect PTH-102',
      actionText: 'Open Evidence Pack',
      action: () => {
        onSwitchPortal('admin')
        onSelectDefect('PTH-102')
      },
      desc: 'See 94.2% AI bounding box, 3 merged citizen duplicates, and before/after repair proof.'
    },
    {
      num: '3',
      title: 'Engineer Verification',
      actionText: 'Go to Field Queue',
      action: () => onSwitchPortal('engineer'),
      desc: 'PWD engineer verifies AI severity, enters remarks, and confirms official maintenance.'
    },
    {
      num: '4',
      title: 'Citizen Duplicate Test',
      actionText: 'Simulate Citizen Report',
      action: () => onSwitchPortal('citizen'),
      desc: 'Simulate citizen GPS upload and see real-time proximity deduplication alert.'
    }
  ]

  return (
    <div className="bg-gradient-to-r from-slate-900 via-slate-900/95 to-cyan-950/90 border-b border-cyan-800/40 px-4 sm:px-6 py-3 shadow-lg">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-400 text-xs">
              <FontAwesomeIcon icon={faBolt} />
            </span>
            <span className="text-xs sm:text-sm font-bold text-white tracking-wide">
              Official Demo Walkthrough (Assam PWD Concept Scope)
            </span>
            <span className="hidden md:inline-block text-[11px] text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded-full border border-cyan-800/60">
              Interactive Prototype
            </span>
          </div>

          <button
            onClick={() => setExpanded(!expanded)}
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>{expanded ? 'Hide Guide' : 'Show Walkthrough Guide'}</span>
            <FontAwesomeIcon icon={expanded ? faChevronUp : faChevronDown} className="text-[10px]" />
          </button>
        </div>

        {expanded && (
          <div className="mt-3 pt-3 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {steps.map((step) => (
              <div
                key={step.num}
                className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3 flex flex-col justify-between hover:border-cyan-500/50 transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="flex items-center justify-center h-5 w-5 rounded-full bg-cyan-500/20 text-cyan-400 text-[11px] font-bold">
                      {step.num}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-300">
                      {step.title}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-snug mb-3">
                    {step.desc}
                  </p>
                </div>

                <button
                  onClick={step.action}
                  className="w-full cursor-pointer text-[11px] font-medium py-1.5 px-2.5 rounded-lg bg-slate-800 hover:bg-cyan-600 text-cyan-300 hover:text-white flex items-center justify-center gap-1.5 transition-colors border border-slate-700 hover:border-cyan-500"
                >
                  <span>{step.actionText}</span>
                  <FontAwesomeIcon icon={faArrowRight} className="text-[9px]" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
