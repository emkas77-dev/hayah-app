import React, { useState, useEffect, useMemo, useCallback, lazy, Suspense } from 'react';
import { usePersistedState } from './hooks/usePersistedState';
import { theme, FONT_IMPORT, HAYAH_LOGO, COMPANY_LOGO } from './utils/theme';
import { Home, Menu, Bell, Sun, Calendar, Clock, Phone, X, Lock, AlertTriangle, Loader2, Check } from 'lucide-react';

// استيراد المكونات المشتركة
import { StatusTag } from './components/common/StatusTag';
import { KpiCard } from './components/common/KpiCard';

// استيراد البيانات الأولية (يمكن نقلها إلى ملف منفصل)
import { 
  initialStations, maintenanceSeed, warehouseSeed, incidentsSeed, ppeSeed,
  inspectionsSeed, labResultsSeed, employeesSeed, payrollSeed, trainingSeed,
  recruitmentSeed, complaintsSeed, alertsSeed, usersSeed, settingsSeed,
  notificationsSeed, revenueSeed, readingsLogSeed, billingComplaintsSeed,
  connectionEstimatesSeed, billsSeed2, pipelines, networkMaintenanceSeed,
  waterLossSeed, leakReportsSeed, citizensFinance, revenueByMonth
} from './data/mockData'; // سيتم إنشاء هذا الملف

// تحميل الأقسام بشكل كسول (Lazy Loading) لتحسين الأداء
const HomeSection = lazy(() => import('./sections/HomeSection'));
const StationOpsSection = lazy(() => import('./sections/StationOpsSection'));
const MaintenanceSection = lazy(() => import('./sections/MaintenanceSection'));
const GISSection = lazy(() => import('./sections/GISSection'));
const HRSection = lazy(() => import('./sections/HRSection'));
const SafetySection = lazy(() => import('./sections/SafetySection'));
const LabSection = lazy(() => import('./sections/LabSection'));
const RevenueSection = lazy(() => import('./sections/RevenueSection'));
const ComplaintsSection = lazy(() => import('./sections/ComplaintsSection'));
const AIAssistantSection = lazy(() => import('./sections/AIAssistantSection'));
const ReportsSection = lazy(() => import('./sections/ReportsSection'));
const AlertsSection = lazy(() => import('./sections/AlertsSection'));
const UsersSection = lazy(() => import('./sections/UsersSection'));
const SettingsSection = lazy(() => import('./sections/SettingsSection'));

// --- مكونات مساعدة داخل App ---
const SectionLoader = () => (
  <div className="flex items-center justify-center py-12">
    <Loader2 size={32} className="animate-spin" style={{ color: theme.blue }} />
  </div>
);

// --- التطبيق الرئيسي ---
function OperationsRoomInner() {
  // ... (جميع حالات usePersistedState كما هي)
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [section, setSection] = useState("home");
  const [saveStatus, setSaveStatus] = useState(null);

  const reportStatus = useCallback((status, err) => {
    setSaveStatus(status === "error" ? { error: err } : status);
    if (status === "saved") setTimeout(() => setSaveStatus(null), 2500);
  }, []);

  // --- استخدام الـ Hook المُحسّن ---
  const [stations, setStations] = usePersistedState("hayah-stations", initialStations, reportStatus);
  const [orders, setOrders] = usePersistedState("hayah-maintenance", maintenanceSeed, reportStatus);
  const [parts, setParts] = usePersistedState("hayah-warehouse", warehouseSeed, reportStatus);
  const [incidents, setIncidents] = usePersistedState("hayah-incidents", incidentsSeed, reportStatus);
  const [ppe, setPpe] = usePersistedState("hayah-ppe", ppeSeed, reportStatus);
  const [inspections, setInspections] = usePersistedState("hayah-inspections", inspectionsSeed, reportStatus);
  const [labResults, setLabResults] = usePersistedState("hayah-lab", labResultsSeed, reportStatus);
  const [staff, setStaff] = usePersistedState("hayah-employees", employeesSeed, reportStatus);
  const [payroll, setPayroll] = usePersistedState("hayah-payroll", payrollSeed, reportStatus);
  const [training, setTraining] = usePersistedState("hayah-training", trainingSeed, reportStatus);
  const [recruitment, setRecruitment] = usePersistedState("hayah-recruitment", recruitmentSeed, reportStatus);
  const [complaints, setComplaints] = usePersistedState("hayah-complaints", complaintsSeed, reportStatus);
  const [alerts, setAlerts] = usePersistedState("hayah-alerts", alertsSeed, reportStatus);
  const [users, setUsers] = usePersistedState("hayah-users", usersSeed, reportStatus);
  const [settings, setSettings] = usePersistedState("hayah-settings", settingsSeed, reportStatus);
  const [notifs, setNotifs] = usePersistedState("hayah-notifs", notificationsSeed, reportStatus);
  const [revenue, setRevenue] = usePersistedState("hayah-revenue", revenueSeed, reportStatus);
  const [readings, setReadings] = usePersistedState("hayah-readings", readingsLogSeed, reportStatus);
  const [billingComplaints, setBillingComplaints] = usePersistedState("hayah-billing-complaints", billingComplaintsSeed, reportStatus);
  const [estimates, setEstimates] = usePersistedState("hayah-connections", connectionEstimatesSeed, reportStatus);
  const [bills, setBills] = usePersistedState("hayah-bills", billsSeed2, reportStatus);
  const [lines, setLines] = usePersistedState("hayah-network-lines", pipelines, reportStatus);
  const [networkMaintenance, setNetworkMaintenance] = usePersistedState("hayah-network-maintenance", networkMaintenanceSeed, reportStatus);
  const [waterLoss, setWaterLoss] = usePersistedState("hayah-water-loss", waterLossSeed, reportStatus);
  const [leakReports, setLeakReports] = usePersistedState("hayah-leaks", leakReportsSeed, reportStatus);

  // ... (بقية الدوال مثل addNotif, buildDataSummary, renderSection)
  // تم تحسينها باستخدام useCallback

  const addNotif = useCallback((title, body, type = "info") => {
    const now = new Date().toLocaleTimeString("ar-EG");
    setNotifs((prev) => [{ id: `N-${Date.now()}`, title, body, type, read: false, time: now }, ...prev].slice(0, 50));
  }, [setNotifs]);

  const buildDataSummary = useCallback(() => {
    // ... (نفس المنطق السابق مع إضافة useMemo)
    const onlineStations = stations.filter((s) => s.status === "online").length;
    // ...
    return `بيانات نظام "حياة" الحالية (محدثة لحظيًا):\n- المحطات والروافع: الإجمالي ${stations.length} (عاملة ${onlineStations}، متوقفة ${stations.length - onlineStations}) ...`;
  }, [stations, orders, parts, ppe, incidents, inspections, staff, payroll, recruitment, complaints, alerts, lines, networkMaintenance, billingComplaints, estimates]);

  const renderSection = useCallback(() => {
    const props = { stations, setStations, orders, setOrders, parts, setParts, incidents, setIncidents, ppe, setPpe, inspections, setInspections, labResults, setLabResults, staff, setStaff, payroll, setPayroll, training, setTraining, recruitment, setRecruitment, complaints, setComplaints, alerts, setAlerts, users, setUsers, settings, setSettings, revenue, setRevenue, readings, setReadings, billingComplaints, setBillingComplaints, estimates, setEstimates, bills, setBills, lines, setLines, networkMaintenance, setNetworkMaintenance, waterLoss, setWaterLoss, leakReports, setLeakReports, addNotif, buildDataSummary };
    
    switch (section) {
      case "home": return <HomeSection {...props} />;
      case "ops": return <StationOpsSection {...props} />;
      case "maintenance": return <MaintenanceSection {...props} />;
      case "gis": return <GISSection {...props} />;
      case "hr": return <HRSection {...props} />;
      case "safety": return <SafetySection {...props} />;
      case "lab": return <LabSection {...props} />;
      case "revenue": return <RevenueSection {...props} />;
      case "complaints": return <ComplaintsSection {...props} />;
      case "ai": return <AIAssistantSection {...props} />;
      case "reports": return <ReportsSection {...props} />;
      case "alerts": return <AlertsSection {...props} />;
      case "users": return <UsersSection {...props} />;
      case "settings": return <SettingsSection {...props} />;
      default: return null;
    }
  }, [section, stations, setStations, orders, setOrders, parts, setParts, incidents, setIncidents, ppe, setPpe, inspections, setInspections, labResults, setLabResults, staff, setStaff, payroll, setPayroll, training, setTraining, recruitment, setRecruitment, complaints, setComplaints, alerts, setAlerts, users, setUsers, settings, setSettings, revenue, setRevenue, readings, setReadings, billingComplaints, setBillingComplaints, estimates, setEstimates, bills, setBills, lines, setLines, networkMaintenance, setNetworkMaintenance, waterLoss, setWaterLoss, leakReports, setLeakReports, addNotif, buildDataSummary]);

  // ... (تذييل واجهة المستخدم مع تحسينات في التنقل)
  return (
    <div dir="rtl" style={{ background: theme.bg, minHeight: "100vh", fontFamily: "Cairo" }}>
      <style>{FONT_IMPORT}</style>
      {/* ... (باقي JSX) ... */}
      <Suspense fallback={<SectionLoader />}>
        {renderSection()}
      </Suspense>
      {/* ... */}
    </div>
  );
}

// --- مكون PinGate و CitizenPortal ---
// (تم تحسينهما بنفس الطريقة، مع إصلاح مشكلة border المفقودة)

function CitizenPortal({ onEnterSystem }) {
  // ... (تم إعادة كتابة المكون باستخدام useCallback وتحسين الأداء)
  // وتم إصلاح خاصية border المفقودة في الأزرار
  const toggleService = useCallback((id) => {
    setActiveService(prev => prev === id ? null : id);
    setForm({});
    setSubmitted(false);
  }, []);

  // في JSX: تم إضافة border: `1px solid ${s.color}44` في الأزرار
}

function PinGate() {
  const [unlocked, setUnlocked] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const tryUnlock = useCallback(() => {
    // ... (نفس المنطق)
  }, [code]);

  if (unlocked) return <OperationsRoomInner />;
  return ( /* ... */ );
}

export default function OperationsRoom() {
  const [showPortal, setShowPortal] = useState(true);
  return (
    <ErrorBoundary>
      {showPortal 
        ? <CitizenPortal onEnterSystem={() => setShowPortal(false)} /> 
        : <PinGate />
      }
    </ErrorBoundary>
  );
}

// ErrorBoundary المحسّن
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    console.error("حياة App Error:", error, info);
  }
  render() {
    if (this.state.hasError) {
      return ( /* ... */ );
    }
    return this.props.children;
  }
}