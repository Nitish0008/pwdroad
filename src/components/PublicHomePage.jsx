import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faRoad, 
  faCamera, 
  faLocationCrosshairs, 
  faArrowsSplitUpAndLeft, 
  faShieldHalved, 
  faWrench, 
  faCheckCircle, 
  faCircleCheck, 
  faArrowRight, 
  faBolt, 
  faCarSide, 
  faBuildingColumns,
  faEye,
  faLayerGroup,
  faUsers,
  faChartLine,
  faChevronLeft,
  faChevronRight,
  faSliders,
  faExpand
} from '@fortawesome/free-solid-svg-icons'
import GISMap from './GISMap'
import { initialRoadSegments, initialDefects } from '../data/mockData'

export default function PublicHomePage({ onOpenAuth, onSelectDefect }) {
  // Hero Right-Side Image Slider State
  const [heroSlide, setHeroSlide] = useState(0)

  const heroSlides = [
    {
      image: '/evidence/pothole_defect.jpg',
      badge: 'Real-Time AI Detection',
      title: 'Pothole Distress Detection',
      defectId: 'PTH-102',
      confidence: '94.2%',
      location: 'NH-27 Segment B, Sonapur (Km 14.8)',
      tag: 'Critical Severity',
      tagColor: 'bg-red-500/20 text-red-300 border-red-500/40',
      hasBox: true,
      boundingBox: { top: '38%', left: '32%', width: '42%', height: '36%' },
      footerNote: 'Geotagged (26.0682° N, 91.8654° E) • 3 Citizen Duplicates Merged'
    },
    {
      image: '/evidence/repaired_patch.jpg',
      badge: 'Section 15 Re-Survey Audit',
      title: 'Certified Post-Repair Asphalt Patch',
      defectId: 'WO-AS-0941',
      confidence: 'Verified Closure',
      location: 'NH-27 Sonapur Overpass Approach',
      tag: 'Repaired ✓',
      tagColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      hasBox: false,
      boundingBox: null,
      footerNote: 'Cold-mix bitumen compaction verified by PWD re-survey vehicle pass'
    },
    {
      image: '/evidence/crack_defect.jpg',
      badge: 'High-Res Line Sensor',
      title: 'Longitudinal Wheel Path Cracking',
      defectId: 'CRK-204',
      confidence: '89.6%',
      location: 'NH-27 Segment C, Jagiroad Outer Corridor',
      tag: 'Scheduled Intervene',
      tagColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      hasBox: true,
      boundingBox: { top: '25%', left: '26%', width: '48%', height: '58%' },
      footerNote: 'Laser sensor scan: 42m continuous surface distress flagged'
    }
  ]

  // Auto-advance Hero Slider
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroSlide((prev) => (prev + 1) % heroSlides.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [heroSlides.length])

  // Before / After Comparison Slider State (0 to 100%)
  const [sliderPosition, setSliderPosition] = useState(50)

  // Feature Carousel State
  const [currentSlide, setCurrentSlide] = useState(0)
  const slides = [
    {
      title: 'Autonomous PWD Vehicle Surveys',
      badge: '4K AI Edge Vision',
      desc: 'Dedicated survey vehicles driving state highways with 60 FPS cameras and laser profilometers for continuous automated defect scanning.',
      tag: 'Continuous Surveillance',
      color: 'from-cyan-500 to-blue-600',
      icon: faCarSide,
      stat: '4,820+ km Scanned'
    },
    {
      title: 'Citizen Reporting with Section 7 Deduplication',
      badge: 'Crowdsourced Hotspots',
      desc: 'Smart spatial deduplication merges citizen complaints within 15 meters into a single canonical record, eliminating paperwork and boosting repair priority.',
      tag: 'Smart Proximity Merge',
      color: 'from-emerald-500 to-teal-600',
      icon: faUsers,
      stat: '318 Duplicates Grouped'
    },
    {
      title: 'Certified Engineering Sign-Off & Re-Survey',
      badge: 'Human Governance',
      desc: 'Assam PWD Executive Engineers verify AI classifications, issue contractor work orders, and certify closure with post-repair validation surveys.',
      tag: 'Verified Closure',
      color: 'from-indigo-500 to-purple-600',
      icon: faShieldHalved,
      stat: '89 Certified Repairs'
    }
  ]

  // Auto-advance secondary carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [slides.length])

  const activeHero = heroSlides[heroSlide]

  return (
    <div className="space-y-16 animate-fadeIn pb-12">
      {/* 1. HERO SECTION (2-Column with attractive image slider on the right) */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/90 via-slate-900/40 to-slate-950 p-6 sm:p-10 lg:p-12 shadow-2xl">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Text & Call to Actions (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-semibold">
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></span>
              Government of Assam • Public Works Roads Department (PWRD)
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              Intelligent Road Health & <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                AI-Powered Maintenance
              </span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
              Assam AI RoadWatch unites continuous departmental survey cameras, citizen reporting with smart deduplication, real GIS geospatial mapping, and certified engineer verifications.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onOpenAuth('citizen')}
                className="cursor-pointer px-5 sm:px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-cyan-500/25 transition-all flex items-center gap-2 active:scale-95"
              >
                <FontAwesomeIcon icon={faCamera} />
                <span>Report Road Damage (Citizen)</span>
              </button>

              <button
                onClick={() => onOpenAuth('official')}
                className="cursor-pointer px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold text-xs sm:text-sm border border-slate-700 hover:border-cyan-500/50 transition-all flex items-center gap-2"
              >
                <FontAwesomeIcon icon={faBuildingColumns} className="text-cyan-400" />
                <span>PWD Departmental Login</span>
              </button>

              <button
                onClick={() => onOpenAuth('quick')}
                className="cursor-pointer px-4 py-3 rounded-xl bg-purple-950/60 hover:bg-purple-900/60 text-purple-300 font-bold text-xs sm:text-sm border border-purple-800/60 transition-all flex items-center gap-1.5"
              >
                <FontAwesomeIcon icon={faBolt} className="text-amber-400" />
                <span>1-Click Demo</span>
              </button>
            </div>

            {/* Quick Metrics Bar */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-400 border-t border-slate-800/80">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                <span>AI Vision: <strong className="text-white">RoadYOLO-v4.2</strong></span>
              </div>
              <span className="text-slate-700">•</span>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-cyan-400"></span>
                <span>Fleet: <strong className="text-white">4 Active Survey Vehicles</strong></span>
              </div>
              <span className="text-slate-700">•</span>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-purple-400"></span>
                <span>Monitored: <strong className="text-white">4,820+ km</strong></span>
              </div>
            </div>
          </div>

          {/* Right Column: Attractive Interactive Hero Image Slider (5 Cols) */}
          <div className="lg:col-span-5 relative group">
            <div className="relative rounded-3xl overflow-hidden border border-cyan-500/40 bg-slate-950 shadow-2xl aspect-[4/3] flex items-center justify-center">
              {/* Active Image */}
              <img
                src={activeHero.image}
                alt={activeHero.title}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent pointer-events-none" />

              {/* Top Badges */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-20">
                <span className="px-2.5 py-1 rounded-xl bg-black/75 backdrop-blur-md text-white text-[11px] font-bold border border-white/20 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping"></span>
                  {activeHero.badge}
                </span>

                <span className={`px-2.5 py-1 rounded-xl text-[10px] font-bold border backdrop-blur-md ${activeHero.tagColor}`}>
                  {activeHero.tag}
                </span>
              </div>

              {/* Simulated AI Bounding Box overlay (if active) */}
              {activeHero.hasBox && activeHero.boundingBox && (
                <div
                  className="absolute border-2 border-red-500 bg-red-500/20 rounded-lg pointer-events-none transition-all duration-500 animate-pulse"
                  style={activeHero.boundingBox}
                >
                  <span className="absolute -top-6 left-0 bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.2 rounded shadow whitespace-nowrap">
                    {activeHero.defectId} • {activeHero.confidence} AI Conf.
                  </span>
                </div>
              )}

              {/* Bottom Metadata Card */}
              <div className="absolute bottom-3 left-3 right-3 bg-slate-950/85 backdrop-blur-md p-3 rounded-2xl border border-slate-700/80 space-y-1.5 z-20">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white text-xs">{activeHero.title}</h4>
                  <span className="font-mono text-[10px] text-cyan-400 font-bold">{activeHero.defectId}</span>
                </div>
                <div className="text-[11px] text-slate-300 font-medium">{activeHero.location}</div>
                <div className="text-[10px] text-slate-400 flex items-center justify-between pt-1 border-t border-slate-800">
                  <span className="truncate">{activeHero.footerNote}</span>
                  <button
                    onClick={() => onSelectDefect('PTH-102')}
                    className="cursor-pointer text-cyan-400 hover:text-cyan-300 font-bold ml-2 shrink-0 flex items-center gap-1"
                  >
                    <span>Inspect</span>
                    <FontAwesomeIcon icon={faExpand} className="text-[9px]" />
                  </button>
                </div>
              </div>

              {/* Slider Prev / Next Controls */}
              <button
                onClick={() => setHeroSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
                className="cursor-pointer absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/20 transition-all opacity-0 group-hover:opacity-100 z-30 text-xs"
                title="Previous Image"
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              <button
                onClick={() => setHeroSlide((prev) => (prev + 1) % heroSlides.length)}
                className="cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/20 transition-all opacity-0 group-hover:opacity-100 z-30 text-xs"
                title="Next Image"
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>

            {/* Slider Thumbnail Dots */}
            <div className="flex items-center justify-center gap-2 mt-3">
              {heroSlides.map((slide, idx) => (
                <button
                  key={idx}
                  onClick={() => setHeroSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    heroSlide === idx ? 'w-8 bg-cyan-400' : 'w-2 bg-slate-700 hover:bg-slate-500'
                  }`}
                  title={slide.title}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Public Live Transparency Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800/80">
          <div className="text-slate-400 text-xs font-medium">Roads Monitored</div>
          <div className="text-3xl font-black text-white mt-1">4,820+ km</div>
          <div className="text-[11px] text-cyan-400 mt-2">Active Assam Network</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800/80">
          <div className="text-slate-400 text-xs font-medium">Repairs Verified This Month</div>
          <div className="text-3xl font-black text-emerald-400 mt-1">89 Repairs</div>
          <div className="text-[11px] text-emerald-400 mt-2">Re-Survey Certified</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800/80">
          <div className="text-slate-400 text-xs font-medium">Citizen Deduplications</div>
          <div className="text-3xl font-black text-amber-400 mt-1">318 Reports</div>
          <div className="text-[11px] text-slate-400 mt-2">Merged by GPS proximity</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800/80">
          <div className="text-slate-400 text-xs font-medium">AI Precision & Speed</div>
          <div className="text-3xl font-black text-purple-400 mt-1">94.2%</div>
          <div className="text-[11px] text-purple-400 mt-2">22ms Edge Latency</div>
        </div>
      </section>

      {/* 3. Interactive Feature Carousel Slider */}
      <section className="relative bg-slate-900/40 border border-slate-800 rounded-3xl p-6 sm:p-8 overflow-hidden shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="h-6 w-6 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs">
              <FontAwesomeIcon icon={faSliders} />
            </span>
            <h3 className="text-base font-bold text-white">
              Platform Pillars & Continuous Capabilities
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
              className="h-8 w-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors cursor-pointer text-xs"
              title="Previous Slide"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <span className="text-xs text-slate-400 font-semibold px-2">
              {currentSlide + 1} / {slides.length}
            </span>
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
              className="h-8 w-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors cursor-pointer text-xs"
              title="Next Slide"
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </div>

        {/* Active Slide Display */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-cyan-400 text-xs font-bold border border-slate-700">
              <span>{slides[currentSlide].badge}</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-300">{slides[currentSlide].tag}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white">
              {slides[currentSlide].title}
            </h2>

            <p className="text-slate-300 text-sm leading-relaxed max-w-2xl">
              {slides[currentSlide].desc}
            </p>

            <div className="pt-2">
              <span className="text-xs px-3 py-1.5 rounded-xl bg-cyan-950 text-cyan-300 font-bold border border-cyan-800">
                Key Metric: {slides[currentSlide].stat}
              </span>
            </div>
          </div>

          <div className="md:col-span-4 flex items-center justify-center">
            <div
              className={`h-40 w-40 sm:h-48 sm:w-48 rounded-3xl bg-gradient-to-tr ${slides[currentSlide].color} flex items-center justify-center text-white text-5xl shadow-2xl transition-all duration-500`}
            >
              <FontAwesomeIcon icon={slides[currentSlide].icon} />
            </div>
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                currentSlide === idx ? 'w-8 bg-cyan-400' : 'w-2 bg-slate-700 hover:bg-slate-600'
              }`}
            />
          ))}
        </div>
      </section>

      {/* 4. Interactive Before / After Repair Comparison Slider */}
      <section className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Interactive Comparison Slider
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              Before & After Repair Verification (Defect #PTH-102)
            </h2>
            <p className="text-xs text-slate-400">
              Drag the interactive slider below to reveal the defect condition before and after certified cold-mix patch compaction.
            </p>
          </div>

          <button
            onClick={() => onSelectDefect('PTH-102')}
            className="cursor-pointer px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faEye} />
            <span>Open Complete Evidence Pack</span>
          </button>
        </div>

        {/* Interactive Image Split Slider */}
        <div className="relative aspect-video rounded-3xl overflow-hidden border border-slate-800 select-none shadow-2xl">
          {/* Base Image (After: Repaired) */}
          <img
            src="/evidence/repaired_patch.jpg"
            alt="After Repair"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 bg-emerald-600/90 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-lg border border-emerald-400/40 backdrop-blur-md">
            AFTER: Certified Cold-Mix Patch ✓
          </div>

          {/* Top Image (Before: Defect) clipped with sliderPosition */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${sliderPosition}%` }}
          >
            <img
              src="/evidence/pothole_defect.jpg"
              alt="Before Defect"
              className="absolute inset-0 w-full h-full object-cover max-w-none"
              style={{ width: '100vw', maxWidth: 'none' }}
            />
            <div className="absolute top-4 left-4 bg-red-600/90 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-lg border border-red-400/40 backdrop-blur-md">
              BEFORE: Deep Pothole Distress (AI Detected)
            </div>
          </div>

          {/* Divider Line */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] pointer-events-none"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-10 w-10 rounded-full bg-white text-slate-900 font-bold flex items-center justify-center text-xs shadow-2xl border-2 border-cyan-500">
              ↔
            </div>
          </div>

          {/* Range input controller over the image */}
          <input
            type="range"
            min="0"
            max="100"
            value={sliderPosition}
            onChange={(e) => setSliderPosition(Number(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
          />
        </div>

        {/* Slider Controls Bar */}
        <div className="flex items-center justify-between text-xs text-slate-400 bg-slate-950 p-3 rounded-2xl border border-slate-800">
          <span>👈 Slide left for Repaired Road</span>
          <span className="font-bold text-white">Slide Position: {sliderPosition}%</span>
          <span>Slide right for Original Pothole 👉</span>
        </div>
      </section>

      {/* 5. Public Real-Time GIS Map (Assam NH-27 Corridor) - Watermark Free */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Live Network Transparency
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              Public Assam Highway Corridor Map (Real Leaflet / OpenStreetMap)
            </h2>
            <p className="text-xs text-slate-400">
              Explore monitored segments from Jalukbari through Khanapara, Jorabat, Sonapur, Jagiroad to Nagaon.
            </p>
          </div>

          <button
            onClick={() => onOpenAuth('admin')}
            className="cursor-pointer text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5"
          >
            <span>Open Full Engineering GIS Dashboard</span>
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>

        {/* Real Leaflet Map - Completely Watermark Free */}
        <GISMap
          segments={initialRoadSegments}
          defects={initialDefects}
          onSelectDefect={onSelectDefect}
        />
      </section>

      {/* 6. Bottom Call to Action */}
      <section className="rounded-3xl border border-cyan-800/50 bg-gradient-to-r from-cyan-950/60 via-slate-900 to-blue-950/60 p-8 sm:p-12 text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-black text-white">
          Experience the Assam AI RoadWatch Platform
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
          Log in with your designated role or launch the 1-click interactive demo to experience the complete PWD intelligence system.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => onOpenAuth('quick')}
            className="cursor-pointer px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-lg transition-all"
          >
            Launch 1-Click Persona Demo
          </button>
          <button
            onClick={() => onOpenAuth('citizen')}
            className="cursor-pointer px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-xs border border-slate-700 transition-all"
          >
            Citizen Sign In / Register
          </button>
        </div>
      </section>
    </div>
  )
}
