import React, { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faMapLocationDot, 
  faLayerGroup, 
  faCarSide, 
  faTriangleExclamation, 
  faEye,
  faCircleDot
} from '@fortawesome/free-solid-svg-icons'

export default function GISMap({ segments, defects, onSelectDefect, selectedDefectId }) {
  const mapContainerRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const layersRef = useRef({
    markers: null,
    vehicles: null,
    polylines: null
  })

  const [activeLayers, setActiveLayers] = useState({
    defects: true,
    vehicles: true,
    healthCorridor: true
  })

  // Real highway coordinates for Assam NH-27 Corridor
  const segmentRoutes = [
    {
      id: 'SEG-NH27-A',
      name: 'NH-27 Segment A (Guwahati Bypass)',
      coords: [
        [26.155, 91.675],
        [26.145, 91.715],
        [26.128, 91.765],
        [26.118, 91.815]
      ],
      color: '#10b981', // Good (86 RHI)
      health: 86
    },
    {
      id: 'SEG-NH27-B',
      name: 'NH-27 Segment B (Jorabat - Sonapur)',
      coords: [
        [26.118, 91.815],
        [26.068, 91.865],
        [26.082, 91.925],
        [26.115, 91.980]
      ],
      color: '#f59e0b', // Fair (61 RHI)
      health: 61
    },
    {
      id: 'SEG-NH27-C',
      name: 'NH-27 Segment C (Sonapur - Jagiroad)',
      coords: [
        [26.115, 91.980],
        [26.1154, 92.1432],
        [26.135, 92.215],
        [26.160, 92.320]
      ],
      color: '#f97316', // Poor (32 RHI)
      health: 32
    },
    {
      id: 'SEG-NH27-D',
      name: 'NH-27 Segment D (Jagiroad - Nagaon)',
      coords: [
        [26.160, 92.320],
        [26.205, 92.420],
        [26.2421, 92.5482],
        [26.3475, 92.6840]
      ],
      color: '#ef4444', // Critical (18 RHI)
      health: 18
    }
  ]

  const vehiclesData = [
    { id: 'PWD-SURVEY-04', label: 'Survey #04 (4K Cam)', lat: 26.0682, lng: 91.8654, speed: '36 km/h', status: 'Live 60 FPS' },
    { id: 'PWD-SURVEY-02', label: 'Survey #02 (Line Sensor)', lat: 26.1154, lng: 92.1432, speed: '48 km/h', status: 'Live 60 FPS' },
    { id: 'PWD-SURVEY-01', label: 'Survey #01 (Laser Profiler)', lat: 26.2421, lng: 92.5482, speed: '42 km/h', status: 'Live 60 FPS' }
  ]

  useEffect(() => {
    if (!mapContainerRef.current) return

    // Clean up if already initialized
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove()
    }

    // Initialize Leaflet map centered on Assam NH-27 Corridor
    const map = L.map(mapContainerRef.current, {
      center: [26.14, 92.10],
      zoom: 10,
      zoomControl: false,
      attributionControl: false
    })

    // Clean Dark Basemap without any API keys or watermarks (Esri World Dark Gray)
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 16
    }).addTo(map)

    L.control.zoom({ position: 'bottomright' }).addTo(map)

    mapInstanceRef.current = map

    // Layer groups
    const markersLayer = L.layerGroup().addTo(map)
    const vehiclesLayer = L.layerGroup().addTo(map)
    const polylinesLayer = L.layerGroup().addTo(map)

    layersRef.current = {
      markers: markersLayer,
      vehicles: vehiclesLayer,
      polylines: polylinesLayer
    }

    return () => {
      map.remove()
      mapInstanceRef.current = null
    }
  }, [])

  // Update polylines
  useEffect(() => {
    if (!mapInstanceRef.current || !layersRef.current.polylines) return
    const { polylines } = layersRef.current
    polylines.clearLayers()

    if (activeLayers.healthCorridor) {
      segmentRoutes.forEach((seg) => {
        // Outer glow
        L.polyline(seg.coords, {
          color: seg.color,
          weight: 8,
          opacity: 0.35,
          lineCap: 'round',
          lineJoin: 'round'
        }).addTo(polylines)

        // Main colored highway line
        const line = L.polyline(seg.coords, {
          color: seg.color,
          weight: 4,
          opacity: 0.95,
          dashArray: '8, 8'
        }).addTo(polylines)

        line.bindTooltip(
          `<div class="text-xs font-bold">${seg.name}</div><div class="text-[10px] text-slate-300">Road Health Index: ${seg.health}/100</div>`,
          { sticky: true }
        )
      })
    }
  }, [activeLayers.healthCorridor])

  // Update vehicles
  useEffect(() => {
    if (!mapInstanceRef.current || !layersRef.current.vehicles) return
    const { vehicles } = layersRef.current
    vehicles.clearLayers()

    if (activeLayers.vehicles) {
      vehiclesData.forEach((v) => {
        const vehicleIcon = L.divIcon({
          className: 'custom-vehicle-marker',
          html: `
            <div style="position: relative; display: flex; flex-direction: column; align-items: center;">
              <div style="position: absolute; width: 28px; height: 28px; border-radius: 9999px; background-color: rgba(56, 189, 248, 0.3); animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
              <div style="width: 22px; height: 22px; border-radius: 9999px; background: linear-gradient(135deg, #0284c7, #0369a1); border: 2px solid #ffffff; display: flex; align-items: center; justify-content: center; color: white; font-size: 10px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.5);">
                🚗
              </div>
              <div style="background: rgba(15, 23, 42, 0.9); border: 1px solid #0284c7; border-radius: 6px; padding: 2px 6px; margin-top: 4px; font-size: 9px; font-weight: bold; color: #38bdf8; white-space: nowrap; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.5);">
                ${v.id} (${v.speed})
              </div>
            </div>
          `,
          iconSize: [80, 40],
          iconAnchor: [40, 11]
        })

        L.marker([v.lat, v.lng], { icon: vehicleIcon })
          .addTo(vehicles)
          .bindPopup(
            `<div class="p-2 space-y-1 text-xs">
              <strong class="text-cyan-400">${v.label}</strong>
              <div class="text-[11px] text-slate-300">Live Speed: ${v.speed}</div>
              <div class="text-[10px] text-emerald-400 font-semibold">${v.status} Active Dashcam Feed</div>
            </div>`
          )
      })
    }
  }, [activeLayers.vehicles])

  // Update defect pins
  useEffect(() => {
    if (!mapInstanceRef.current || !layersRef.current.markers) return
    const { markers } = layersRef.current
    markers.clearLayers()

    if (activeLayers.defects) {
      defects.forEach((d) => {
        const isSelected = selectedDefectId === d.id
        const pinColor = d.aiSeverity === 'Critical' ? '#ef4444' : d.aiSeverity === 'High' ? '#f97316' : '#38bdf8'

        const defectIcon = L.divIcon({
          className: 'custom-defect-marker',
          html: `
            <div style="display: flex; flex-direction: column; align-items: center; cursor: pointer;">
              ${isSelected ? `<div style="position: absolute; width: 34px; height: 34px; border-radius: 9999px; background: ${pinColor}; opacity: 0.4; animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>` : ''}
              <div style="width: ${isSelected ? '26px' : '20px'}; height: ${isSelected ? '26px' : '20px'}; border-radius: 9999px; background: ${pinColor}; border: 2px solid #ffffff; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 10px; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.7);">
                ⚠️
              </div>
              <div style="background: ${isSelected ? '#ffffff' : '#0f172a'}; border: 1.5px solid ${pinColor}; border-radius: 6px; padding: 2px 6px; margin-top: 3px; font-size: 9px; font-weight: bold; color: ${isSelected ? '#0f172a' : '#ffffff'}; white-space: nowrap; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.5);">
                ${d.id} (${d.aiConfidence}%)
              </div>
            </div>
          `,
          iconSize: [60, 45],
          iconAnchor: [30, 10]
        })

        const marker = L.marker([d.gps.lat, d.gps.lng], { icon: defectIcon })
          .addTo(markers)

        marker.on('click', () => {
          onSelectDefect(d.id)
        })

        // Popup with Quick Inspection
        const popupContent = document.createElement('div')
        popupContent.className = 'p-2 space-y-2 text-xs'
        popupContent.innerHTML = `
          <div class="flex items-center justify-between gap-2 border-b border-slate-700 pb-1">
            <span class="font-bold text-red-400 text-sm">${d.id}</span>
            <span class="text-[10px] px-2 py-0.5 rounded bg-red-950 text-red-300 font-bold">${d.aiSeverity}</span>
          </div>
          <div>
            <div class="font-semibold text-white">${d.type}</div>
            <div class="text-[11px] text-slate-400">${d.road} • ${d.locationDesc}</div>
            <div class="text-[11px] text-emerald-400 font-semibold mt-1">AI Confidence: ${d.aiConfidence}%</div>
          </div>
          ${d.duplicateCount > 0 ? `<div class="text-[10px] text-cyan-300 bg-cyan-950/80 p-1 rounded font-semibold border border-cyan-800">+${d.duplicateCount} Citizen Duplicates Merged</div>` : ''}
          <button id="btn-popup-${d.id}" class="w-full mt-2 cursor-pointer py-1.5 px-3 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow transition-colors flex items-center justify-center gap-1.5">
            <span>Open Complete Evidence Pack</span>
          </button>
        `

        popupContent.querySelector(`#btn-popup-${d.id}`)?.addEventListener('click', () => {
          onSelectDefect(d.id)
        })

        marker.bindPopup(popupContent)
      })
    }
  }, [activeLayers.defects, defects, selectedDefectId, onSelectDefect])

  return (
    <div className="relative rounded-3xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl flex flex-col h-[520px]">
      {/* Top Map Toolbar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        <div className="bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-slate-700/80 shadow-lg pointer-events-auto flex items-center gap-3">
          <div className="h-8 w-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-sm font-bold">
            <FontAwesomeIcon icon={faMapLocationDot} />
          </div>
          <div>
            <div className="text-xs font-bold text-white flex items-center gap-2">
              <span>Assam Real-Time GIS Map (PostGIS / CartoDB)</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                Live OpenStreetMap Engine
              </span>
            </div>
            <div className="text-[10px] text-slate-400">
              Corridor: Jalukbari ➔ Khanapara ➔ Jorabat ➔ Sonapur ➔ Jagiroad ➔ Nagaon
            </div>
          </div>
        </div>

        {/* Layer Toggles */}
        <div className="bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-slate-700/80 shadow-lg pointer-events-auto flex items-center gap-2 text-xs">
          <button
            onClick={() => setActiveLayers((p) => ({ ...p, defects: !p.defects }))}
            className={`cursor-pointer px-2.5 py-1 rounded-xl transition-all ${
              activeLayers.defects ? 'bg-red-500/20 text-red-300 border border-red-500/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            <FontAwesomeIcon icon={faTriangleExclamation} className="mr-1" />
            Defects ({defects.length})
          </button>

          <button
            onClick={() => setActiveLayers((p) => ({ ...p, vehicles: !p.vehicles }))}
            className={`cursor-pointer px-2.5 py-1 rounded-xl transition-all ${
              activeLayers.vehicles ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            <FontAwesomeIcon icon={faCarSide} className="mr-1" />
            PWD Survey Fleet
          </button>

          <button
            onClick={() => setActiveLayers((p) => ({ ...p, healthCorridor: !p.healthCorridor }))}
            className={`cursor-pointer px-2.5 py-1 rounded-xl transition-all ${
              activeLayers.healthCorridor ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            <FontAwesomeIcon icon={faLayerGroup} className="mr-1" />
            RHI Health Corridors
          </button>
        </div>
      </div>

      {/* Real Leaflet Map Container */}
      <div ref={mapContainerRef} className="w-full h-full z-10" />

      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 z-20 bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-slate-700/80 shadow-lg flex items-center gap-4 text-xs pointer-events-auto">
        <span className="text-slate-400 font-semibold text-[11px]">Road Health Index (RHI):</span>
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
          <span className="text-slate-300 text-[11px]">80-100 (Good)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-amber-500"></span>
          <span className="text-slate-300 text-[11px]">60-79 (Fair)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-orange-500"></span>
          <span className="text-slate-300 text-[11px]">30-59 (Poor)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500"></span>
          <span className="text-slate-300 text-[11px]">&lt;30 (Critical)</span>
        </div>
      </div>
    </div>
  )
}
