// ============================================================
// 2. App.jsx - التطبيق الرئيسي المُحسّن
// ============================================================
import React, { useState, useEffect, useMemo, useCallback, lazy, Suspense } from 'react';
import { 
  Home, Droplets, Wrench, MapPin, Users, Headphones, Sparkles, 
  BarChart2, Bell, Shield, Settings, Menu, Sun, Calendar, Clock, 
  Phone, LogOut, ChevronLeft, ChevronRight, LayoutDashboard,
  Wallet, AlertTriangle, FlaskConical, ShieldAlert, UserPlus,
  Search, X, Loader2, Lock, Check, Copy, Plus, Play, Pause,
  Activity, Gauge, Zap, Droplet, Server, HardDrive, Cpu
} from 'lucide-react';

import { theme, FONT_IMPORT, HAYAH_LOGO, COMPANY_LOGO } from './utils/theme';
import { usePersistedState } from './hooks/usePersistedState';
import { StatusTag, KpiCard, SectionCard, PageHeader } from './components/common';
import { initialData } from './data/mockData';

// تحميل الأقسام بشكل كسول
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

// ============================================================
// 3. شريط جانبي محسّن مع أيقونات وتأثيرات
// ============================================================
const SIDEBAR_ITEMS = [
  { key: "home", icon: LayoutDashboard, label: "لوحة التحكم", badge: 0 },
  { key: "ops", icon: Droplets, label: "تشغيل المحطات" },
  { key: "revenue", icon: Wallet, label: "الإيرادات" },
  { key: "maintenance", icon: Wrench, label: "الصيانة" },
  { key: "gis", icon: MapPin, label: "GIS والشبكات" },
  { key: "hr", icon: Users, label: "الموارد البشرية" },
  { key: "safety", icon: ShieldAlert, label: "السلامة" },
  { key: "lab", icon: FlaskConical, label: "الجودة والمعامل" },
  { key: "complaints", icon: Headphones, label: "خدمة العملاء" },
  { key: "ai", icon: Sparkles, label: "المساعد الذكي" },
  { key: "reports", icon: BarChart2, label: "التقارير" },
  { key: "alerts", icon: Bell, label: "الإنذارات", badge: 12 },
  { key: "users", icon: Shield, label: "المستخدمين" },
  { key: "settings", icon: Settings, label: "الإعدادات" },
];

function Sidebar({ section, setSection, sidebarOpen, setSidebarOpen }) {
  const [collapsed, setCollapsed] = useState(false);
  
  return (
    <aside
      className={`fixed lg:static top-0 right-0 h-screen z-30 flex flex-col transition-all duration-300 ${
        sidebarOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
      } ${collapsed ? "w-20" : "w-64"}`}
      style={{ background: theme.card, borderLeft: `1px solid ${theme.line}` }}
    >
      {/* Logo */}
      <div className={`flex items-center gap-3 px-4 py-5 ${collapsed ? "justify-center" : ""}`}>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: theme.gradients.primary, boxShadow: theme.shadows.glow }}>
          <Droplets size={24} color="#fff" />
        </div>
        {!collapsed && (
          <div>
            <p className="font-extrabold text-lg leading-tight" style={{ color: theme.text }}>حياة</p>
            <p className="text-[10px]" style={{ color: theme.textMuted }}>منصة كفر الشيخ الذكية</p>
          </div>
        )}
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="hidden lg:flex items-center justify-center w-8 h-8 rounded-full mx-auto mb-2"
        style={{ background: theme.cardAlt, border: `1px solid ${theme.line}` }}
      >
        {collapsed ? <ChevronLeft size={16} color={theme.text} /> : <ChevronRight size={16} color={theme.text} />}
      </button>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-2 py-2 space-y-1">
        {SIDEBAR_ITEMS.map((item) => {
          const isActive = section === item.key;
          return (
            <button
              key={item.key}
              onClick={() => { setSection(item.key); setSidebarOpen(false); }}
              className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive ? "shadow-lg" : "hover:bg-white/5"
              }`}
              style={{
                background: isActive ? theme.gradients.primary : "transparent",
                color: isActive ? "#fff" : theme.textMuted,
                transform: isActive ? "scale(1.02)" : "scale(1)",
              }}
            >
              <item.icon size={collapsed ? 22 : 20} className="shrink-0" />
              {!collapsed && (
                <>
                  <span className="flex-1 text-right">{item.label}</span>
                  {item.badge > 0 && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: theme.danger, color: "#fff" }}>
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </button>
          );
        })}
      </nav>

      {/* Support Button */}
      <div className="p-3">
        <button
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all hover:scale-[1.02] ${
            collapsed ? "justify-center" : ""
          }`}
          style={{ background: theme.gradients.primary, color: "#fff", boxShadow: theme.shadows.glow }}
        >
          <Phone size={collapsed ? 20 : 18} />
          {!collapsed && "الدعم الفني"}
        </button>
      </div>
      
      <p className={`text-center text-[10px] py-3 ${collapsed ? "hidden" : ""}`} style={{ color: theme.textMuted }}>
        الإصدار 2.0.0
      </p>
    </aside>
  );
}

// ============================================================
// 4. هيدر محسّن مع بحث وإشعارات
// ============================================================
function Header({ section, sidebarOpen, setSidebarOpen, notifs, unreadCount, setNotifOpen, notifOpen, setNotifs }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const now = new Date();

  return (
    <header
      className="sticky top-0 z-20 flex items-center justify-between gap-3 px-4 py-3 flex-wrap"
      style={{ background: theme.card, borderBottom: `1px solid ${theme.line}` }}
    >
      <div className="flex items-center gap-3">
        <button className="lg:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <Menu size={24} color={theme.text} />
        </button>
        
        {/* Breadcrumb */}
        <div>
          <h1 className="font-bold text-lg" style={{ color: theme.text }}>
            {SIDEBAR_ITEMS.find(i => i.key === section)?.label || "لوحة التحكم"}
          </h1>
          <p className="text-[11px]" style={{ color: theme.textMuted }}>
            {now.toLocaleDateString("ar-EG", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Search */}
        <div className="relative">
          {searchOpen ? (
            <div className="flex items-center gap-2">
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="بحث..."
                className="px-3 py-1.5 rounded-lg text-sm w-40 lg:w-60"
                style={{ background: theme.cardAlt, border: `1px solid ${theme.line}`, color: theme.text }}
                autoFocus
              />
              <button onClick={() => { setSearchOpen(false); setSearchQuery(""); }}>
                <X size={18} color={theme.textMuted} />
              </button>
            </div>
          ) : (
            <button onClick={() => setSearchOpen(true)} className="p-2 rounded-lg hover:bg-white/5 transition">
              <Search size={20} color={theme.textMuted} />
            </button>
          )}
        </div>

        {/* Weather */}
        <div className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-lg" style={{ background: theme.cardAlt }}>
          <Sun size={16} color={theme.warning} />
          <span className="text-sm font-semibold" style={{ color: theme.text }}>28°C</span>
        </div>

        {/* Notifications */}
        <div className="relative">
          <button onClick={() => setNotifOpen(!notifOpen)} className="p-2 rounded-lg hover:bg-white/5 transition relative">
            <Bell size={20} color={theme.text} />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center" style={{ background: theme.danger, color: "#fff" }}>
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {notifOpen && (
            <div className="absolute left-0 top-full mt-2 w-80 rounded-xl shadow-2xl overflow-hidden" style={{ background: theme.card, border: `1px solid ${theme.line}` }}>
              <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: `1px solid ${theme.line}` }}>
                <p className="font-bold text-sm" style={{ color: theme.text }}>الإشعارات</p>
                <div className="flex gap-2">
                  <button onClick={() => setNotifs(prev => prev.map(n => ({ ...n, read: true })))}
                    className="text-[11px] font-semibold" style={{ color: theme.primary }}>
                    قراءة الكل
                  </button>
                  <button onClick={() => setNotifOpen(false)}><X size={16} color={theme.textMuted} /></button>
                </div>
              </div>
              <div className="overflow-y-auto max-h-80">
                {notifs.length === 0 ? (
                  <p className="text-xs text-center py-8" style={{ color: theme.textMuted }}>لا توجد إشعارات</p>
                ) : notifs.slice(0, 5).map((n) => (
                  <div key={n.id} className="flex items-start gap-3 px-4 py-3 hover:bg-white/5 cursor-pointer transition"
                    style={{ borderBottom: `1px solid ${theme.line}`, background: n.read ? "transparent" : `${theme.primary}11` }}
                    onClick={() => setNotifs(prev => prev.map(x => x.id === n.id ? { ...x, read: true } : x))}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ background: `${theme.primary}22` }}>
                      <Bell size={14} color={theme.primary} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold truncate" style={{ color: theme.text }}>{n.title}</p>
                      <p className="text-[11px] mt-0.5 leading-snug" style={{ color: theme.textMuted }}>{n.body}</p>
                      <p className="text-[10px] mt-1" style={{ color: theme.textMuted }}>{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm" style={{ background: theme.gradients.primary, color: "#fff" }}>
            م.ك
          </div>
          <div className="hidden md:block">
            <p className="text-xs font-bold" style={{ color: theme.text }}>م. محمد كامل</p>
            <p className="text-[10px]" style={{ color: theme.textMuted }}>مدير المنطقة</p>
          </div>
        </div>
      </div>
    </header>
  );
}

// ============================================================
// 5. مكون التطبيق الرئيسي
// ============================================================
function OperationsRoomInner() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [section, setSection] = useState("home");
  const [saveStatus, setSaveStatus] = useState(null);

  const reportStatus = useCallback((status, err) => {
    setSaveStatus(status === "error" ? { error: err } : status);
    if (status === "saved") setTimeout(() => setSaveStatus(null), 2500);
  }, []);

  // جميع حالات usePersistedState
  const [stations, setStations] = usePersistedState("hayah-stations", initialData.stations, reportStatus);
  const [orders, setOrders] = usePersistedState("hayah-maintenance", initialData.maintenance, reportStatus);
  const [parts, setParts] = usePersistedState("hayah-warehouse", initialData.warehouse, reportStatus);
  const [incidents, setIncidents] = usePersistedState("hayah-incidents", initialData.incidents, reportStatus);
  const [ppe, setPpe] = usePersistedState("hayah-ppe", initialData.ppe, reportStatus);
  const [inspections, setInspections] = usePersistedState("hayah-inspections", initialData.inspections, reportStatus);
  const [labResults, setLabResults] = usePersistedState("hayah-lab", initialData.labResults, reportStatus);
  const [staff, setStaff] = usePersistedState("hayah-employees", initialData.employees, reportStatus);
  const [payroll, setPayroll] = usePersistedState("hayah-payroll", initialData.payroll, reportStatus);
  const [training, setTraining] = usePersistedState("hayah-training", initialData.training, reportStatus);
  const [recruitment, setRecruitment] = usePersistedState("hayah-recruitment", initialData.recruitment, reportStatus);
  const [complaints, setComplaints] = usePersistedState("hayah-complaints", initialData.complaints, reportStatus);
  const [alerts, setAlerts] = usePersistedState("hayah-alerts", initialData.alerts, reportStatus);
  const [users, setUsers] = usePersistedState("hayah-users", initialData.users, reportStatus);
  const [settings, setSettings] = usePersistedState("hayah-settings", initialData.settings, reportStatus);
  const [notifs, setNotifs] = usePersistedState("hayah-notifs", initialData.notifications, reportStatus);
  const [revenue, setRevenue] = usePersistedState("hayah-revenue", initialData.revenue, reportStatus);
  const [readings, setReadings] = usePersistedState("hayah-readings", initialData.readings, reportStatus);
  const [billingComplaints, setBillingComplaints] = usePersistedState("hayah-billing-complaints", initialData.billingComplaints, reportStatus);
  const [estimates, setEstimates] = usePersistedState("hayah-connections", initialData.estimates, reportStatus);
  const [bills, setBills] = usePersistedState("hayah-bills", initialData.bills, reportStatus);
  const [lines, setLines] = usePersistedState("hayah-network-lines", initialData.pipelines, reportStatus);
  const [networkMaintenance, setNetworkMaintenance] = usePersistedState("hayah-network-maintenance", initialData.networkMaintenance, reportStatus);
  const [waterLoss, setWaterLoss] = usePersistedState("hayah-water-loss", initialData.waterLoss, reportStatus);
  const [leakReports, setLeakReports] = usePersistedState("hayah-leaks", initialData.leakReports, reportStatus);

  const unreadCount = notifs.filter(n => !n.read).length;

  const addNotif = useCallback((title, body, type = "info") => {
    const now = new Date().toLocaleTimeString("ar-EG");
    setNotifs(prev => [{ id: `N-${Date.now()}`, title, body, type, read: false, time: now }, ...prev].slice(0, 50));
  }, [setNotifs]);

  const buildDataSummary = useCallback(() => {
    const online = stations.filter(s => s.status === "online").length;
    return `بيانات نظام "حياة" الحالية:\n- المحطات: ${stations.length} (عاملة ${online})`;
  }, [stations]);

  const renderSection = useCallback(() => {
    const props = {
      stations, setStations, orders, setOrders, parts, setParts,
      incidents, setIncidents, ppe, setPpe, inspections, setInspections,
      labResults, setLabResults, staff, setStaff, payroll, setPayroll,
      training, setTraining, recruitment, setRecruitment,
      complaints, setComplaints, alerts, setAlerts, users, setUsers,
      settings, setSettings, revenue, setRevenue, readings, setReadings,
      billingComplaints, setBillingComplaints, estimates, setEstimates,
      bills, setBills, lines, setLines, networkMaintenance, setNetworkMaintenance,
      waterLoss, setWaterLoss, leakReports, setLeakReports,
      addNotif, buildDataSummary
    };

    const sections = {
      home: HomeSection,
      ops: StationOpsSection,
      maintenance: MaintenanceSection,
      gis: GISSection,
      hr: HRSection,
      safety: SafetySection,
      lab: LabSection,
      revenue: RevenueSection,
      complaints: ComplaintsSection,
      ai: AIAssistantSection,
      reports: ReportsSection,
      alerts: AlertsSection,
      users: UsersSection,
      settings: SettingsSection,
    };

    const Component = sections[section];
    return Component ? <Component {...props} /> : null;
  }, [section, stations, setStations, orders, setOrders, parts, setParts, incidents, setIncidents, ppe, setPpe, inspections, setInspections, labResults, setLabResults, staff, setStaff, payroll, setPayroll, training, setTraining, recruitment, setRecruitment, complaints, setComplaints, alerts, setAlerts, users, setUsers, settings, setSettings, revenue, setRevenue, readings, setReadings, billingComplaints, setBillingComplaints, estimates, setEstimates, bills, setBills, lines, setLines, networkMaintenance, setNetworkMaintenance, waterLoss, setWaterLoss, leakReports, setLeakReports, addNotif, buildDataSummary]);

  return (
    <div dir="rtl" style={{ background: theme.bg, minHeight: "100vh", fontFamily: theme.fonts.arabic }}>
      <style>{FONT_IMPORT}</style>
      
      <div className="flex">
        <Sidebar section={section} setSection={setSection} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        
        <div className="flex-1 min-h-screen flex flex-col">
          <Header
            section={section}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            notifs={notifs}
            unreadCount={unreadCount}
            notifOpen={notifOpen}
            setNotifOpen={setNotifOpen}
            setNotifs={setNotifs}
          />

          <main className="flex-1 p-4 lg:p-6">
            <Suspense fallback={<div className="flex items-center justify-center py-12"><Loader2 size={32} className="animate-spin" style={{ color: theme.primary }} /></div>}>
              {renderSection()}
            </Suspense>
          </main>

          <footer className="text-center text-[11px] py-4" style={{ color: theme.textMuted }}>
            جميع الحقوق محفوظة © 2026 حياة - منصة مياه كفر الشيخ الذكية
          </footer>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// 6. بوابة المواطن المُحسّنة
// ============================================================
function CitizenPortal({ onEnterSystem }) {
  const [activeService, setActiveService] = useState(null);
  const [form, setForm] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState("services");

  const services = [
    { id: "reading", icon: Activity, title: "رفع قراءة", desc: "سجّل قراءة عدادك", color: theme.primary,
      fields: [{key:"account",ph:"رقم الحساب"},{key:"reading",ph:"القراءة الحالية"},{key:"phone",ph:"رقم هاتفك"}]},
    { id: "connect", icon: Wrench, title: "طلب توصيل", desc: "مياه أو صرف صحي", color: theme.secondary,
      fields: [{key:"name",ph:"اسمك الكامل"},{key:"address",ph:"عنوانك"},{key:"phone",ph:"رقم هاتفك"}]},
    { id: "pay", icon: Wallet, title: "سداد فاتورة", desc: "ادفع إلكترونياً", color: theme.warning,
      fields: [{key:"account",ph:"رقم الحساب"},{key:"amount",ph:"المبلغ (ج.م)"},{key:"phone",ph:"رقم هاتفك"}]},
    { id: "complaint", icon: Headphones, title: "شكوى", desc: "أبلغ عن مشكلة", color: theme.purple,
      fields: [{key:"name",ph:"اسمك"},{key:"address",ph:"المنطقة"},{key:"phone",ph:"رقم هاتفك"}]},
  ];

  const toggleService = useCallback((id) => {
    setActiveService(prev => prev === id ? null : id);
    setForm({});
    setSubmitted(false);
  }, []);

  const handleSubmit = useCallback(() => {
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setActiveService(null); setForm({}); }, 3000);
  }, []);

  return (
    <div dir="rtl" style={{ background: theme.bg, minHeight: "100vh", fontFamily: theme.fonts.arabic }}>
      <style>{FONT_IMPORT}</style>
      
      {/* Header */}
      <div style={{ background: "rgba(255,255,255,0.04)", borderBottom: `1px solid ${theme.line}`, padding: "12px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <img src={COMPANY_LOGO} alt="شعار" style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover" }} />
          <div>
            <p style={{ color: theme.text, fontSize: 14, fontWeight: 800, margin: 0, lineHeight: 1.2 }}>شركة مياه الشرب</p>
            <p style={{ color: theme.textMuted, fontSize: 10, margin: 0 }}>والصرف الصحي — كفر الشيخ</p>
          </div>
        </div>
        <button onClick={onEnterSystem} style={{ background: theme.gradients.primary, color: "#fff", border: "none", borderRadius: 12, padding: "8px 16px", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>
          🔐 دخول الموظفين
        </button>
      </div>

      {/* Hero */}
      <div style={{ padding: "20px", textAlign: "center", background: theme.gradients.dark }}>
        <img src={HAYAH_LOGO} alt="حياة" style={{ width: 80, height: 80, objectFit: "contain", marginBottom: 8 }} />
        <h1 style={{ color: theme.text, fontWeight: 900, fontSize: 22, margin: 0 }}>في خدمتكم</h1>
        <p style={{ color: theme.textMuted, fontSize: 13, margin: "4px 0 12px" }}>منصة مياه الشرب والصرف الصحي — كفر الشيخ</p>
        <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
          <a href="tel:125" style={{ background: "rgba(95,214,143,0.15)", color: theme.secondary, border: `1px solid ${theme.secondary}44`, borderRadius: 20, padding: "6px 14px", fontSize: 11, fontWeight: 700, textDecoration: "none" }}>📞 125</a>
          <a href="https://wa.me/201098138383" target="_blank" style={{ background: "rgba(37,211,102,0.15)", color: "#25D366", border: "1px solid #25D36644", borderRadius: 20, padding: "6px 14px", fontSize: 11, fontWeight: 700, textDecoration: "none" }}>💬 واتساب</a>
          <a href="tel:01098138383" style={{ background: "rgba(59,160,255,0.15)", color: theme.primary, border: `1px solid ${theme.primary}44`, borderRadius: 20, padding: "6px 14px", fontSize: 11, fontWeight: 700, textDecoration: "none" }}>📱 01098138383</a>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", padding: "8px 16px", gap: 6, background: theme.cardAlt }}>
        {[
          ["services", "الخدمات", LayoutDashboard],
          ["about", "عن الشركة", Building2],
          ["contact", "تواصل", Phone],
        ].map(([k, l, Icon]) => (
          <button key={k} onClick={() => setActiveTab(k)}
            style={{ flex: 1, padding: "8px 4px", borderRadius: 10, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 700,
              background: activeTab === k ? theme.primary : "transparent", color: activeTab === k ? "#fff" : theme.textMuted,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
            <Icon size={16} /> {l}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ padding: "16px", maxWidth: 600, margin: "0 auto" }}>
        {activeTab === "services" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {services.map((s) => (
              <div key={s.id} style={{ background: theme.card, borderRadius: 16, border: `1px solid ${theme.line}`, overflow: "hidden" }}>
                <button onClick={() => toggleService(s.id)}
                  style={{ width: "100%", padding: "16px 12px", background: "transparent", border: "none", cursor: "pointer", textAlign: "center" }}>
                  <div style={{ width: 48, height: 48, borderRadius: "50%", margin: "0 auto 8px", display: "flex", alignItems: "center", justifyContent: "center", background: `${s.color}22` }}>
                    <s.icon size={22} color={s.color} />
                  </div>
                  <p style={{ color: theme.text, fontWeight: 700, fontSize: 13, margin: 0 }}>{s.title}</p>
                  <p style={{ color: theme.textMuted, fontSize: 11, margin: "4px 0 0" }}>{s.desc}</p>
                </button>

                {activeService === s.id && !submitted && (
                  <div style={{ padding: "12px", borderTop: `1px solid ${theme.line}`, display: "flex", flexDirection: "column", gap: 8 }}>
                    {s.fields.map((f) => (
                      <input key={f.key} placeholder={f.ph} value={form[f.key] || ""} onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                        style={{ background: theme.cardAlt, border: `1px solid ${theme.line}`, borderRadius: 8, padding: "8px 12px", color: theme.text, fontSize: 12, width: "100%", outline: "none" }} />
                    ))}
                    {s.id === "connect" && (
                      <select value={form.type || "water"} onChange={e => setForm({ ...form, type: e.target.value })}
                        style={{ background: theme.cardAlt, border: `1px solid ${theme.line}`, borderRadius: 8, padding: "8px 12px", color: theme.text, fontSize: 12 }}>
                        <option value="water">مياه شرب</option>
                        <option value="sewage">صرف صحي</option>
                      </select>
                    )}
                    {s.id === "complaint" && (
                      <select value={form.ctype || "lowPressure"} onChange={e => setForm({ ...form, ctype: e.target.value })}
                        style={{ background: theme.cardAlt, border: `1px solid ${theme.line}`, borderRadius: 8, padding: "8px 12px", color: theme.text, fontSize: 12 }}>
                        <option value="lowPressure">ضعف ضغط</option>
                        <option value="noWater">انقطاع مياه</option>
                        <option value="leakage">تسريب</option>
                        <option value="sewage">صرف صحي</option>
                        <option value="billing">فاتورة</option>
                      </select>
                    )}
                    <button onClick={handleSubmit} style={{ background: s.color, color: "#fff", border: "none", borderRadius: 8, padding: "10px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
                      إرسال ✉️
                    </button>
                  </div>
                )}

                {activeService === s.id && submitted && (
                  <div style={{ padding: "12px", borderTop: `1px solid ${theme.line}`, textAlign: "center" }}>
                    <p style={{ color: theme.secondary, fontWeight: 700, fontSize: 13, margin: "0 0 8px" }}>✅ تم الإرسال!</p>
                    <a href={`https://wa.me/201098138383?text=مرحباً، أود متابعة طلبي (${s.title})`} target="_blank"
                      style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#25D366", color: "#fff", borderRadius: 8, padding: "8px 16px", fontSize: 12, fontWeight: 700, textDecoration: "none" }}>
                      💬 تابع عبر WhatsApp
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === "about" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, background: theme.card, borderRadius: 16, padding: 16 }}>
              <img src={COMPANY_LOGO} alt="شعار" style={{ width: 56, height: 56, borderRadius: "50%", objectFit: "cover" }} />
              <div>
                <p style={{ color: theme.primary, fontWeight: 700, fontSize: 14, margin: "0 0 2px" }}>شركة مياه الشرب والصرف الصحي</p>
                <p style={{ color: theme.textMuted, fontSize: 12, margin: 0 }}>محافظة كفر الشيخ</p>
              </div>
            </div>
            <p style={{ color: theme.text, fontSize: 13, lineHeight: 1.8, margin: 0, background: theme.card, borderRadius: 16, padding: 16 }}>
              إحدى شركات قطاع الإسكان والمرافق العامة التابعة لوزارة الإسكان. تتولى تشغيل وصيانة منظومة مياه الشرب وشبكات الصرف الصحي في 10 مراكز بمحافظة كفر الشيخ، وتخدم أكثر من 3 مليون مواطن.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {[{v:"75+",l:"محطة ورافع",i:"💧"},{v:"10",l:"محطات صرف",i:"🔵"},{v:"4,450+",l:"موظف متخصص",i:"👷"},{v:"3M+",l:"مواطن مخدوم",i:"👥"}].map((s, i) => (
                <div key={i} style={{ background: theme.card, borderRadius: 12, padding: "12px", textAlign: "center" }}>
                  <p style={{ fontSize: 20, margin: "0 0 2px" }}>{s.i}</p>
                  <p style={{ color: theme.primary, fontWeight: 800, fontSize: 16, margin: "0 0 2px" }}>{s.v}</p>
                  <p style={{ color: theme.textMuted, fontSize: 11, margin: 0 }}>{s.l}</p>
                </div>
              ))}
            </div>
            <div style={{ background: `${theme.primary}11`, border: `1px solid ${theme.primary}33`, borderRadius: 16, padding: 16 }}>
              <p style={{ color: theme.primary, fontWeight: 700, fontSize: 13, margin: "0 0 8px" }}>💡 نصائح ترشيد المياه</p>
              {["أغلق الصنبور أثناء غسيل الأسنان", "أصلح التسريب فوراً — القطرة تهدر 20 لتر يومياً", "استخدم الغسالة عند الحمل الكامل"].map((t, i) => (
                <p key={i} style={{ color: theme.textMuted, fontSize: 12, margin: "4px 0", display: "flex", gap: 8 }}>
                  <span style={{ color: theme.primary }}>✦</span>{t}
                </p>
              ))}
            </div>
          </div>
        )}

        {activeTab === "contact" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { href: "tel:125", icon: "🔊", label: "الخط الساخن", value: "125", color: theme.secondary },
              { href: "tel:01098138383", icon: "📱", label: "موبايل الدعم الفني", value: "01098138383", color: theme.primary },
              { href: "https://wa.me/201098138383", icon: "💬", label: "واتساب", value: "تواصل معنا مباشرة", color: "#25D366" },
              { href: "mailto:emkas77@gmail.com", icon: "📧", label: "البريد الإلكتروني", value: "emkas77@gmail.com", color: theme.purple },
            ].map((ct, i) => (
              <a key={i} href={ct.href} target={ct.href.startsWith("http") ? "_blank" : undefined}
                style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", background: theme.card, borderRadius: 16, textDecoration: "none", border: `1px solid ${theme.line}` }}>
                <span style={{ fontSize: 24 }}>{ct.icon}</span>
                <div>
                  <p style={{ color: theme.textMuted, fontSize: 11, margin: 0 }}>{ct.label}</p>
                  <p style={{ color: ct.color, fontWeight: 700, fontSize: 14, margin: 0 }}>{ct.value}</p>
                </div>
              </a>
            ))}
          </div>
        )}

        <p style={{ textAlign: "center", color: theme.textMuted, fontSize: 11, marginTop: 16 }}>© 2026 شركة مياه الشرب والصرف الصحي — كفر الشيخ</p>
      </div>
    </div>
  );
}

// ============================================================
// 7. بوابة الدخول (PIN)
// ============================================================
const ACCESS_CODE = "emkas7";

function PinGate() {
  const [unlocked, setUnlocked] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const toWesternDigits = (str) => {
    const map = { "٠": "0", "١": "1", "٢": "2", "٣": "3", "٤": "4", "٥": "5", "٦": "6", "٧": "7", "٨": "8", "٩": "9" };
    return String(str).replace(/[٠-٩]/g, (d) => map[d]);
  };

  const tryUnlock = useCallback(() => {
    const cleaned = toWesternDigits(code).trim().toLowerCase().replace(/\s+/g, "");
    if (cleaned === ACCESS_CODE) {
      setUnlocked(true);
      setError("");
    } else {
      setError("الرقم السري غير صحيح");
    }
  }, [code]);

  if (unlocked) return <OperationsRoomInner />;

  return (
    <div dir="rtl" style={{ background: theme.bg, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", fontFamily: theme.fonts.arabic }}>
      <style>{FONT_IMPORT}</style>
      <div style={{ background: theme.card, borderRadius: 24, padding: "40px 32px", maxWidth: 400, width: "100%", textAlign: "center", border: `1px solid ${theme.line}` }}>
        <div style={{ width: 64, height: 64, borderRadius: "50%", margin: "0 auto 16px", display: "flex", alignItems: "center", justifyContent: "center", background: theme.gradients.primary, boxShadow: theme.shadows.glow }}>
          <Lock size={28} color="#fff" />
        </div>
        <h2 style={{ color: theme.text, fontWeight: 800, fontSize: 22, margin: "0 0 4px" }}>حياة</h2>
        <p style={{ color: theme.textMuted, fontSize: 13, margin: "0 0 8px" }}>منصة مياه كفر الشيخ الذكية</p>
        <p style={{ color: theme.textMuted, fontSize: 12, margin: "0 0 24px" }}>أدخل الرقم السري للدخول</p>
        <input
          type="password"
          value={code}
          onChange={(e) => { setCode(e.target.value); setError(""); }}
          onKeyDown={(e) => { if (e.key === "Enter") tryUnlock(); }}
          placeholder="الرقم السري"
          style={{ background: theme.cardAlt, border: `1px solid ${theme.line}`, borderRadius: 12, padding: "12px 16px", color: theme.text, fontSize: 14, width: "100%", textAlign: "center", outline: "none" }}
          autoFocus
        />
        {error && <p style={{ color: theme.danger, fontSize: 12, marginTop: 8 }}>{error}</p>}
        <button onClick={tryUnlock} style={{ marginTop: 20, background: theme.gradients.primary, color: "#fff", border: "none", borderRadius: 12, padding: "12px 24px", fontSize: 14, fontWeight: 700, cursor: "pointer", width: "100%" }}>
          دخول
        </button>
      </div>
    </div>
  );
}

// ============================================================
// 8. مكون ErrorBoundary المُحسّن
// ============================================================
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
      return (
        <div dir="rtl" style={{ background: theme.bg, minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, fontFamily: theme.fonts.arabic, color: theme.text }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>حدث خطأ في التطبيق</h2>
          <p style={{ fontSize: 14, color: theme.textMuted, marginBottom: 8, textAlign: "center" }}>
            {this.state.error?.message || "خطأ غير معروف"}
          </p>
          <button onClick={() => window.location.reload()} style={{ background: theme.gradients.primary, color: "#fff", border: "none", borderRadius: 12, padding: "12px 24px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
            إعادة تحميل التطبيق
          </button>
          <p style={{ fontSize: 12, color: theme.textMuted, marginTop: 16 }}>للدعم الفني: 01098138383</p>
        </div>
      );
    }
    return this.props.children;
  }
}

// ============================================================
// 9. التصدير الرئيسي
// ============================================================
export default function OperationsRoom() {
  const [showPortal, setShowPortal] = useState(true);
  return (
    <ErrorBoundary>
      {showPortal ? <CitizenPortal onEnterSystem={() => setShowPortal(false)} /> : <PinGate />}
    </ErrorBoundary>
  );
}