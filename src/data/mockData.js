export const initialRoadSegments = [
  {
    id: 'SEG-NH27-A',
    name: 'NH-27 Segment A',
    stretch: 'Guwahati Bypass (Khanapara - Jalukbari)',
    lengthKm: 18.4,
    defectsCount: 5,
    healthScore: 86,
    priority: 'Low',
    color: '#10b981',
    status: 'Satisfactory',
    lastSurvey: '2026-10-02 08:30 AM',
    circle: 'Guwahati Circle',
    division: 'Kamrup Metro PWD'
  },
  {
    id: 'SEG-NH27-B',
    name: 'NH-27 Segment B',
    stretch: 'Jorabat Corridor - Sonapur Bypass',
    lengthKm: 24.2,
    defectsCount: 21,
    healthScore: 61,
    priority: 'Medium',
    color: '#f59e0b',
    status: 'Fair - Scheduled Inspection',
    lastSurvey: '2026-10-03 11:15 AM',
    circle: 'Guwahati Circle',
    division: 'Kamrup Rural PWD'
  },
  {
    id: 'SEG-NH27-C',
    name: 'NH-27 Segment C',
    stretch: 'Sonapur - Jagiroad Highway Corridor',
    lengthKm: 32.8,
    defectsCount: 48,
    healthScore: 32,
    priority: 'High',
    color: '#f97316',
    status: 'Poor - Intervention Required',
    lastSurvey: '2026-10-04 09:40 AM',
    circle: 'Morigaon Circle',
    division: 'Morigaon PWD'
  },
  {
    id: 'SEG-NH27-D',
    name: 'NH-27 Segment D',
    stretch: 'Jagiroad - Nagaon Industrial Highway',
    lengthKm: 41.5,
    defectsCount: 71,
    healthScore: 18,
    priority: 'Critical',
    color: '#ef4444',
    status: 'Critical - Immediate Repair',
    lastSurvey: '2026-10-04 02:10 PM',
    circle: 'Nagaon Circle',
    division: 'Nagaon Central PWD'
  }
];

export const initialDefects = [
  {
    id: 'PTH-102',
    type: 'Pothole',
    category: 'Surface Cavity / Deep Distress',
    road: 'NH-27 Segment B',
    locationDesc: 'Km 14.8, Sonapur Overpass Approach, Left Lane',
    gps: { lat: 26.0682, lng: 91.8654 },
    detectedAt: '2026-10-03 11:18 AM',
    source: 'PWD Survey Vehicle #04 (Dashcam 4K)',
    aiConfidence: 94.2,
    model: 'RoadYOLO-v4.2-Assam',
    aiSeverity: 'Critical',
    verifiedSeverity: 'High',
    verificationStatus: 'Verified by Engineer',
    verifiedBy: 'Er. B. Barua (Executive Engineer, Kamrup Rural)',
    maintenanceStatus: 'Repaired (Pending Re-Survey)',
    workOrder: 'WO-AS-2026-0941',
    evidenceImage: '/evidence/pothole_defect.jpg',
    repairedImage: '/evidence/repaired_patch.jpg',
    boundingBox: { x: '35%', y: '42%', width: '38%', height: '35%' },
    duplicateCount: 4,
    citizenReports: [
      { id: 'CIT-892', reporter: 'Pranab Saikia', phone: '+91 94350****1', time: '2026-10-03 01:20 PM', distance: '3.2m match', note: 'Heavy impact on bike tyre, dangerous water puddle inside pothole' },
      { id: 'CIT-904', reporter: 'Anamika Das', phone: '+91 98640****7', time: '2026-10-03 04:45 PM', distance: '1.8m match', note: 'Large pothole on highway near bridge' },
      { id: 'CIT-911', reporter: 'Ranjit Deka (Bus Driver)', phone: '+91 70021****3', time: '2026-10-04 07:15 AM', distance: '4.5m match', note: 'Accident hazard during night time' }
    ],
    auditHistory: [
      { stage: 'AI Detection', time: '2026-10-03 11:18:24', actor: 'PWD Survey Vehicle #04 AI Edge Unit', note: 'Detected Pothole with 94.2% confidence. Geotagged at (26.0682, 91.8654).' },
      { stage: 'Duplicate Grouping', time: '2026-10-03 13:20:10', actor: 'Assam AI RoadWatch Deduplication Engine', note: 'Merged 3 citizen complaints within 10m radius. Severity score escalated.' },
      { stage: 'Engineer Verification', time: '2026-10-03 15:45:00', actor: 'Er. B. Barua (Kamrup Rural PWD)', note: 'Field verified. High severity confirmed. Issued Work Order #WO-AS-2026-0941.' },
      { stage: 'Repair Execution', time: '2026-10-04 10:30:00', actor: 'M/S Brahmaputra Highway Infra Contractors', note: 'Cold mix bitumen patching applied and compacted with pneumatic roller.' },
      { stage: 'Re-Survey Scheduled', time: '2026-10-04 16:00:00', actor: 'PWD Survey Vehicle #02', note: 'Post-repair validation scan queued for automated quality closure.' }
    ]
  },
  {
    id: 'CRK-204',
    type: 'Longitudinal & Alligator Cracks',
    category: 'Structural Fatigue & Subgrade Failure',
    road: 'NH-27 Segment C',
    locationDesc: 'Km 28.3, Jagiroad Outer Corridor',
    gps: { lat: 26.1154, lng: 92.1432 },
    detectedAt: '2026-10-04 09:42 AM',
    source: 'PWD Survey Vehicle #02 (High-Res Line Sensor)',
    aiConfidence: 89.6,
    model: 'RoadYOLO-v4.2-Assam',
    aiSeverity: 'Medium',
    verifiedSeverity: 'Pending Review',
    verificationStatus: 'Awaiting Engineer Sign-off',
    verifiedBy: 'Unassigned (Morigaon Division Queue)',
    maintenanceStatus: 'Under Assessment',
    workOrder: 'Pending',
    evidenceImage: '/evidence/crack_defect.jpg',
    repairedImage: null,
    boundingBox: { x: '28%', y: '30%', width: '45%', height: '55%' },
    duplicateCount: 1,
    citizenReports: [
      { id: 'CIT-920', reporter: 'Deepak Bora', phone: '+91 97060****2', time: '2026-10-04 10:15 AM', distance: '6.1m match', note: 'Road surface is cracking open along the tire tracks' }
    ],
    auditHistory: [
      { stage: 'AI Detection', time: '2026-10-04 09:42:15', actor: 'PWD Survey Vehicle #02', note: 'AI distress model classified 42m stretch of longitudinal cracking.' },
      { stage: 'Citizen Association', time: '2026-10-04 10:15:30', actor: 'Citizen Portal Hook', note: 'Associated citizen report CIT-920 based on GPS proximity.' }
    ]
  },
  {
    id: 'RUT-309',
    type: 'Surface Deformation / Rutting',
    category: 'Heavy Axle Load Depression',
    road: 'NH-27 Segment D',
    locationDesc: 'Km 38.6, Near Nagaon Bypass Toll Gate',
    gps: { lat: 26.2421, lng: 92.5482 },
    detectedAt: '2026-10-04 02:14 PM',
    source: 'PWD Survey Vehicle #01 + Laser Profilometer',
    aiConfidence: 92.1,
    model: 'RoadYOLO-v4.2-Assam',
    aiSeverity: 'Critical',
    verifiedSeverity: 'Critical',
    verificationStatus: 'Verified by Engineer',
    verifiedBy: 'Er. N. Hazarika (SE, Nagaon Circle)',
    maintenanceStatus: 'Work Order Dispatched',
    workOrder: 'WO-AS-2026-0955',
    evidenceImage: '/evidence/crack_defect.jpg',
    repairedImage: null,
    boundingBox: { x: '20%', y: '25%', width: '60%', height: '60%' },
    duplicateCount: 6,
    citizenReports: [
      { id: 'CIT-935', reporter: 'Kabir Ahmed', phone: '+91 88761****9', time: '2026-10-04 02:45 PM', distance: '2.4m match', note: 'Deep wheel rut causing commercial truck skidding' }
    ],
    auditHistory: [
      { stage: 'AI Detection', time: '2026-10-04 02:14:02', actor: 'PWD Survey Vehicle #01', note: 'Rut depth estimated > 45mm. Triggered automated critical safety flag.' },
      { stage: 'Emergency Verified', time: '2026-10-04 03:00:00', actor: 'Er. N. Hazarika', note: 'Approved emergency milling and asphalt overlay schedule.' }
    ]
  },
  {
    id: 'PTH-108',
    type: 'Edge Pothole',
    category: 'Pavement Edge Spalling',
    road: 'NH-27 Segment A',
    locationDesc: 'Km 6.2, Near Jalukbari Junction Flank',
    gps: { lat: 26.1523, lng: 91.7102 },
    detectedAt: '2026-10-02 08:35 AM',
    source: 'PWD Survey Vehicle #03',
    aiConfidence: 88.4,
    model: 'RoadYOLO-v4.2-Assam',
    aiSeverity: 'Low',
    verifiedSeverity: 'Low',
    verificationStatus: 'Verified by Engineer',
    verifiedBy: 'Er. T. Sarma (AE, Kamrup Metro)',
    maintenanceStatus: 'Scheduled Routine Patching',
    workOrder: 'WO-AS-2026-0889',
    evidenceImage: '/evidence/pothole_defect.jpg',
    repairedImage: null,
    boundingBox: { x: '45%', y: '50%', width: '25%', height: '25%' },
    duplicateCount: 0,
    citizenReports: [],
    auditHistory: [
      { stage: 'AI Detection', time: '2026-10-02 08:35:12', actor: 'PWD Survey Vehicle #03', note: 'Edge spalling identified. Low traffic disruption hazard.' }
    ]
  }
];

export const surveyVehicles = [
  { id: 'AS-PWD-SURVEY-01', driver: 'M. Gogoi', speed: '42 km/h', lat: 26.242, lng: 92.548, route: 'NH-27 Nagaon Section', status: 'Live Surveying', battery: '92%', fps: 60 },
  { id: 'AS-PWD-SURVEY-02', driver: 'K. Kalita', speed: '48 km/h', lat: 26.115, lng: 92.143, route: 'NH-27 Jagiroad Section', status: 'Live Surveying', battery: '85%', fps: 60 },
  { id: 'AS-PWD-SURVEY-03', driver: 'D. Baishya', speed: '0 km/h', lat: 26.152, lng: 91.710, route: 'Guwahati Depot', status: 'Stationary / Uploading', battery: '100%', fps: 0 },
  { id: 'AS-PWD-SURVEY-04', driver: 'R. Choudhury', speed: '36 km/h', lat: 26.068, lng: 91.865, route: 'Sonapur Corridor', status: 'Live Surveying', battery: '78%', fps: 60 }
];

export const systemMetrics = {
  totalKmScanned: '4,820 km',
  activeDefects: 145,
  criticalPotholes: 38,
  avgHealthScore: 74.2,
  citizenReportsMerged: 318,
  repairsVerifiedThisMonth: 89,
  aiModelPrecision: '94.2%',
  inferenceSpeed: '22ms'
};

export const demoUsers = [
  {
    id: 'usr-pwd-admin',
    name: 'Er. Sanjib Sarma',
    role: 'admin',
    roleLabel: 'PWD Executive / Admin',
    designation: 'Chief Engineer (Roads), Assam PWRD',
    email: 'sanjib.sarma@assam.gov.in',
    division: 'Headquarters, Dispur Guwahati',
    avatar: 'SS'
  },
  {
    id: 'usr-pwd-eng',
    name: 'Er. B. Barua',
    role: 'engineer',
    roleLabel: 'PWD Field Engineer',
    designation: 'Executive Engineer, Kamrup Rural Division',
    email: 'b.barua@pwd.assam.gov.in',
    division: 'Kamrup Rural Circle',
    avatar: 'BB'
  },
  {
    id: 'usr-citizen',
    name: 'Nitish Hashim',
    role: 'citizen',
    roleLabel: 'Registered Citizen',
    designation: 'Resident of Guwahati / Daily NH-27 Commuter',
    email: 'nitish.hashim@gmail.com',
    phone: '+91 94351-88210',
    division: 'Kamrup Metro District',
    avatar: 'NH'
  },
  {
    id: 'usr-superadmin',
    name: 'Dr. M. K. Deka',
    role: 'superadmin',
    roleLabel: 'Super Admin & AI Ops',
    designation: 'Director, Digital Infrastructure & AI Cell',
    email: 'admin.roadwatch@assam.gov.in',
    division: 'Secretariat, Dispur',
    avatar: 'MD'
  }
];

export const initialCitizenTickets = [
  {
    id: 'CIT-AS-2026-892',
    date: '2026-10-03 01:20 PM',
    defectType: 'Pothole',
    location: 'NH-27 Segment B, Km 14.8, Sonapur Overpass',
    status: 'Merged & Repaired',
    statusCode: 'closed',
    photo: '/evidence/pothole_defect.jpg',
    canonicalDefectId: 'PTH-102',
    repairedPhoto: '/evidence/repaired_patch.jpg',
    engineerRemarks: 'High severity pothole verified and repaired by M/S Brahmaputra Highway Infra.',
    dedupNote: 'Auto-merged with 2 other citizen reports within 4m radius.'
  },
  {
    id: 'CIT-AS-2026-920',
    date: '2026-10-04 10:15 AM',
    defectType: 'Cracks & Rutting',
    location: 'NH-27 Segment C, Km 28.3, Jagiroad Outer Corridor',
    status: 'Under Engineer Review',
    statusCode: 'review',
    photo: '/evidence/crack_defect.jpg',
    canonicalDefectId: 'CRK-204',
    repairedPhoto: null,
    engineerRemarks: 'Queued in Morigaon Division engineering queue for on-site inspection.',
    dedupNote: 'Matched with PWD vehicle line sensor detection #CRK-204.'
  }
];

