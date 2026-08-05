import React, { useState, useEffect, useMemo } from "react";
import {
  Droplets, Wrench, MapPin, Users, Headphones, Sparkles, BarChart2, Bell,
  Shield, Settings, Menu, Sun, Calendar, Clock, Phone, Home,
  Activity, AlertTriangle, Plus, Send, Check, Play, Pause, Search,
  Mail, UserPlus, Save, Pencil, X, Loader2, Wallet, Lock, ShieldAlert
} from "lucide-react";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid
} from "recharts";

/* ---------------------------------------------------------------
   Design tokens
----------------------------------------------------------------*/

const c = {
  bg: "#0B1C2C", card: "#122A40", cardAlt: "#0F2538", line: "#1E3A52",
  text: "#EAF2F8", soft: "#7C93A6",
  blue: "#3BA0FF", green: "#1FAE6B", red: "#E0473E", amber: "#E0A23B",
  purple: "#8B6BD8", cyan: "#29B6C9",
};

const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&family=JetBrains+Mono:wght@500;600&display=swap');`;

/* ---------------------------------------------------------------
   Mock data
----------------------------------------------------------------*/

const initialStations = [
  { id: "ST-001", name: "رافع أبو سكين", center: "الحامول", category: "رافع", type: "water", capacityText: "400ل/ث", flow: 0, status: "online", quality: "-" },
  { id: "ST-002", name: "رافع العاقوله", center: "بلطيم", category: "رافع", type: "water", capacityText: "180ل/ث", flow: 0, status: "online", quality: "-" },
  { id: "ST-003", name: "رافع البرج", center: "بلطيم", category: "رافع", type: "water", capacityText: "180ل/ث", flow: 0, status: "online", quality: "-" },
  { id: "ST-004", name: "رافع مسطروه", center: "بلطيم", category: "رافع", type: "water", capacityText: "180ل/ث", flow: 0, status: "online", quality: "-" },
  { id: "ST-005", name: "رافع المصيف", center: "بلطيم", category: "رافع", type: "water", capacityText: "75ل/ث", flow: 0, status: "online", quality: "-" },
  { id: "ST-006", name: "رافع المعديه", center: "بلطيم", category: "رافع", type: "water", capacityText: "75ل/ث", flow: 0, status: "online", quality: "-" },
  { id: "ST-007", name: "رافع الملاوح", center: "مطوبس", category: "رافع", type: "water", capacityText: "100ل/ث", flow: 0, status: "online", quality: "-" },
  { id: "ST-008", name: "رافع مغيزل", center: "مطوبس", category: "رافع", type: "water", capacityText: "100ل/ث", flow: 0, status: "online", quality: "-" },
  { id: "ST-009", name: "رافع القصابي", center: "سيدي سالم", category: "رافع", type: "water", capacityText: "75ل/ث", flow: 0, status: "online", quality: "-" },
  { id: "ST-010", name: "محطة كفر الشيخ 1", center: "كفر الشيخ", category: "كبرى", type: "water", designCapacity: 86400, flow: 96783, year: "1973", status: "online", quality: "جيدة" },
  { id: "ST-011", name: "محطة كفر الشيخ 2", center: "كفر الشيخ", category: "كبرى", type: "water", designCapacity: 25920, flow: 21546, year: "1932", status: "online", quality: "جيدة" },
  { id: "ST-012", name: "محطة كفر الشيخ 3  المدمجة", center: "كفر الشيخ", category: "كبرى", type: "water", designCapacity: 19008, flow: 20425, year: "2009", status: "online", quality: "جيدة" },
  { id: "ST-013", name: "محطة صندلا", center: "كفر الشيخ", category: "كبرى", type: "water", designCapacity: 17280, flow: 16015, year: "1990", status: "online", quality: "جيدة" },
  { id: "ST-014", name: "محطة دسوق القديمة ،النقالي 3،2،1", center: "دسوق", category: "كبرى", type: "water", designCapacity: 30240, flow: 15979, year: "1928", status: "online", quality: "جيدة" },
  { id: "ST-015", name: "محطة محلة أبو علي وأبو علي الجديدة", center: "دسوق", category: "كبرى", type: "water", designCapacity: 107136, flow: 89118, year: "1973", status: "online", quality: "جيدة" },
  { id: "ST-016", name: "محطة الكشلة", center: "دسوق", category: "كبرى", type: "water", designCapacity: 86400, flow: 52507, year: "2016", status: "online", quality: "جيدة" },
  { id: "ST-017", name: "محطة الحامول", center: "الحامول", category: "كبرى", type: "water", designCapacity: 103680, flow: 95177, year: "1992-2009", status: "online", quality: "جيدة" },
  { id: "ST-018", name: "محطة أبو عرفة", center: "الحامول", category: "كبرى", type: "water", designCapacity: 17280, flow: 10714, year: "2008", status: "online", quality: "جيدة" },
  { id: "ST-019", name: "محطة إبشان", center: "بيلا", category: "كبرى", type: "water", designCapacity: 69120, flow: 84774, year: "1973", status: "online", quality: "جيدة" },
  { id: "ST-020", name: "محطة الجرايدة  3 , الجرايدة الجديدة", center: "بيلا", category: "كبرى", type: "water", designCapacity: 20736, flow: 19010, year: "2003-2008", status: "online", quality: "جيدة" },
  { id: "ST-021", name: "محطة قلين الجديدة (عزيز)", center: "قلين", category: "كبرى", type: "water", designCapacity: 34560, flow: 22510, year: "2007", status: "online", quality: "جيدة" },
  { id: "ST-022", name: "محطة قلين القديمة", center: "قلين", category: "كبرى", type: "water", designCapacity: 19008, flow: 16654, year: "2008-2009", status: "online", quality: "جيدة" },
  { id: "ST-023", name: "محطة المفتى", center: "سيدي سالم", category: "كبرى", type: "water", designCapacity: 69120, flow: 62968, year: "2013", status: "online", quality: "جيدة", notes: "الاعمال المدنية ((معالجة نقاط الترشيح بجدارن الخزانات و المرشحات  - تغير هاندرلات من الجي ار بي لزوم المرشحات الزلطية والرملية والمروبات - عزل اسطح عنبر الطلمبات - رفع كفاءة المبني الإداري - الوسط الترشيحى - منظومة الترشيح بالمرشح رقم 7 -  مراشمة وعمل سافيتو  للمرشحات - رخام لزوم الهددارات + ضبط الميول ))", funding: 30 },
  { id: "ST-024", name: "محطة كحيلو", center: "سيدي سالم", category: "كبرى", type: "water", designCapacity: 20736, flow: 20208, year: "2008", status: "online", quality: "جيدة", notes: "الاعمال المدنية ((مراشمة وعمل سافيتو  للمرشحات  - تغير هاندرلات من الجي ار بي لزوم المرشحات الزلطية والرملية والمروبات - عزل اسطح عنبر الطلمبات - تغير هوايات الخزان الارضى من البلاستيك   واغطية الخزان  - الوسط الترشيحى  ))", funding: 10 },
  { id: "ST-025", name: "محطة تل ام جعفر", center: "الرياض", category: "كبرى", type: "water", designCapacity: 23328, flow: 25374, year: "2008", status: "online", quality: "جيدة" },
  { id: "ST-026", name: "محطة الحاج على", center: "الرياض", category: "كبرى", type: "water", designCapacity: 30240, flow: 26456, year: "2008-2010", status: "online", quality: "جيدة" },
  { id: "ST-027", name: "محطة مطوبس الجديدة", center: "مطوبس", category: "كبرى", type: "water", designCapacity: 86400, flow: 63970, year: "2009", status: "online", quality: "جيدة" },
  { id: "ST-028", name: "محطة الخريجين بشمال مطوبس", center: "مطوبس", category: "كبرى", type: "water", designCapacity: 31104, flow: 18253, year: "2010", status: "online", quality: "جيدة" },
  { id: "ST-029", name: "محطة الخاشعة", center: "بلطيم", category: "كبرى", type: "water", designCapacity: 51840, flow: 41802, year: "2010", status: "online", quality: "جيدة" },
  { id: "ST-030", name: "محطة بلطيم", center: "بلطيم", category: "كبرى", type: "water", designCapacity: 20736, flow: 17309, year: "2008", status: "online", quality: "جيدة" },
  { id: "ST-031", name: "محطة فوة", center: "فوة", category: "كبرى", type: "water", designCapacity: 129600, flow: 80740, year: "1980", status: "online", quality: "جيدة" },
  { id: "ST-032", name: "محطة مسير 1", center: "كفر الشيخ", category: "صغرى", type: "water", designCapacity: 6912, flow: 4528, year: "1990", status: "online", quality: "جيدة" },
  { id: "ST-033", name: "محطة مسير 2", center: "كفر الشيخ", category: "صغرى", type: "water", designCapacity: 7776, flow: 6522, year: "1990", status: "online", quality: "جيدة" },
  { id: "ST-034", name: "محطة سيدى غازي", center: "كفر الشيخ", category: "صغرى", type: "water", designCapacity: 8640, flow: 7504, year: "1990", status: "online", quality: "جيدة" },
  { id: "ST-035", name: "محطة محلة موسى", center: "كفر الشيخ", category: "صغرى", type: "water", designCapacity: 6912, flow: 5938, year: "2007", status: "online", quality: "جيدة" },
  { id: "ST-036", name: "محطة منشة الشرقية", center: "كفر الشيخ", category: "صغرى", type: "water", designCapacity: 5184, flow: 4918, year: "2007", status: "online", quality: "جيدة" },
  { id: "ST-037", name: "محطة دقميرة", center: "كفر الشيخ", category: "صغرى", type: "water", designCapacity: 10368, flow: 0, year: "2025", status: "offline", quality: "-" },
  { id: "ST-038", name: "محطة المندورة", center: "دسوق", category: "صغرى", type: "water", designCapacity: 5184, flow: 4296, year: "2008", status: "online", quality: "جيدة" },
  { id: "ST-039", name: "محطة البياض", center: "دسوق", category: "صغرى", type: "water", designCapacity: 5184, flow: 3727, year: "2008", status: "online", quality: "جيدة" },
  { id: "ST-040", name: "محطة النوايجة", center: "دسوق", category: "صغرى", type: "water", designCapacity: 5184, flow: 4044, year: "2008", status: "online", quality: "جيدة" },
  { id: "ST-041", name: "محطة شباس الملح", center: "دسوق", category: "صغرى", type: "water", designCapacity: 6912, flow: 5560, year: "2008", status: "online", quality: "جيدة" },
  { id: "ST-042", name: "محطة محلة دياي", center: "دسوق", category: "صغرى", type: "water", designCapacity: 6912, flow: 4446, year: "2012", status: "online", quality: "جيدة" },
  { id: "ST-043", name: "محطة الحفير شهاب الدين", center: "الحامول", category: "صغرى", type: "water", designCapacity: 15552, flow: 13902, year: "2008", status: "online", quality: "جيدة" },
  { id: "ST-044", name: "محطة الزعفران", center: "الحامول", category: "صغرى", type: "water", designCapacity: 12960, flow: 8338, year: "2007", status: "online", quality: "جيدة" },
  { id: "ST-045", name: "محطة الجرايدة 2 الشهيدى", center: "بيلا", category: "صغرى", type: "water", designCapacity: 6912, flow: 6128, year: "2008", status: "online", quality: "جيدة" },
  { id: "ST-046", name: "محطة الجرن", center: "بيلا", category: "صغرى", type: "water", designCapacity: 8640, flow: 8255, year: "2003", status: "online", quality: "جيدة" },
  { id: "ST-047", name: "محطة صروة", center: "قلين", category: "صغرى", type: "water", designCapacity: 10368, flow: 9068, year: "1990", status: "online", quality: "جيدة" },
  { id: "ST-048", name: "محطة ميت الديبة", center: "قلين", category: "صغرى", type: "water", designCapacity: 6912, flow: 4280, year: "1990", status: "online", quality: "جيدة" },
  { id: "ST-049", name: "محطة عزيز", center: "قلين", category: "صغرى", type: "water", designCapacity: 10368, flow: 5665, year: "2007", status: "online", quality: "جيدة" },
  { id: "ST-050", name: "محطة أبو إسماعيل", center: "مطوبس", category: "صغرى", type: "water", designCapacity: 6912, flow: 4269, year: "2008", status: "online", quality: "جيدة" },
  { id: "ST-051", name: "محطة البحث العلمي", center: "مطوبس", category: "صغرى", type: "water", designCapacity: 8640, flow: 5256, year: "2017", status: "online", quality: "جيدة" },
  { id: "ST-052", name: "محطة منية المرشد", center: "مطوبس", category: "صغرى", type: "water", designCapacity: 12960, flow: 6126, year: "2008", status: "online", quality: "جيدة" },
  { id: "ST-053", name: "محطة بنى بكار", center: "مطوبس", category: "صغرى", type: "water", designCapacity: 6912, flow: 4653, year: "2008", status: "online", quality: "جيدة" },
  { id: "ST-054", name: "محطة عبد الرحمن", center: "سيدي سالم", category: "صغرى", type: "water", designCapacity: 6912, flow: 4289, year: "1985", status: "online", quality: "جيدة", notes: "المحطة فى حاجة ماسة لانشاء ( عنبر كلور - عنبر شبة - عنبر طلمبات مرشحة ) - زيادة حجم الخزان الارضى - رفع كفاءة المبانى القائمة من عنابر و سور المحطة مع تعلية السور القائم ) - الوسط الترشيحى", funding: 20 },
  { id: "ST-055", name: "محطة دمرو", center: "سيدي سالم", category: "صغرى", type: "water", designCapacity: 10368, flow: 12344, year: "2008", status: "online", quality: "جيدة", notes: "الاعمال المدنية ( تغير هاندرلات من الجي ار بي لزوم المرشحات الزلطية والرملية والمروبات - عزل اسطح عنابر المحطة  والمبني الإداري  )", funding: 2.5 },
  { id: "ST-056", name: "محطة كوزو", center: "سيدي سالم", category: "صغرى", type: "water", designCapacity: 10368, flow: 7411, year: "1985", status: "online", quality: "جيدة", notes: "الاعمال المدنية ( - تغير هاندرلات من الجي ار بي لزوم المرشحات الزلطية والرملية والمروبات - إنشاء مبني إداري و معمل )", funding: 5 },
  { id: "ST-057", name: "محطة أبو غنيمة", center: "سيدي سالم", category: "صغرى", type: "water", designCapacity: 6912, flow: 5868, year: "2008", status: "online", quality: "جيدة", notes: "الاعمال المدنية ( تغير هاندرلات من الجي ار بي لزوم المرشحات الزلطية والرملية والمروبات - عزل اسطح عنابر المحطة  والمبني الإداري  )", funding: 7 },
  { id: "ST-058", name: "محطة عبد الباعث", center: "سيدي سالم", category: "صغرى", type: "water", designCapacity: 6912, flow: 8666, year: "2008", status: "online", quality: "جيدة", notes: "الاعمال المدنية ( تغير هاندرلات من الجي ار بي لزوم المرشحات الزلطية والرملية والمروبات - عزل اسطح عنابر المحطة  والمبني الإداري  )", funding: 8 },
  { id: "ST-059", name: "محطة الحدادى", center: "سيدي سالم", category: "صغرى", type: "water", designCapacity: 8640, flow: 5536, year: "2007", status: "online", quality: "جيدة", notes: "الاعمال المدنية (  عزل اسطح عنابر المحطة  والمبني الإداري  )", funding: 5 },
  { id: "ST-060", name: "محطة النمساوى", center: "سيدي سالم", category: "صغرى", type: "water", designCapacity: 10368, flow: 10572, year: "2011", status: "online", quality: "جيدة", notes: "الاعمال المدنية ((مراشمة وعمل سافيتو عنابر الكلور و الشبة  - تغير هاندرلات من الجي ار بي لزوم المرشحات الزلطية والرملية والمروبات - عزل اسطح عنبر الطلمبات - رفع كفاءة المبني الإداري - إنشاء عنبرلطلمبات المرشحة - إنشاء خزان أرضى  - الوسط الترشيحى  ))", funding: 15 },
  { id: "ST-061", name: "محطة الرياض الجديدة", center: "الرياض", category: "صغرى", type: "water", designCapacity: 8640, flow: 6753, year: "1990", status: "online", quality: "جيدة" },
  { id: "ST-062", name: "محطة بقلولة", center: "الرياض", category: "صغرى", type: "water", designCapacity: 10368, flow: 8203, year: "1990", status: "online", quality: "جيدة" },
  { id: "ST-063", name: "محطة العمدان", center: "الرياض", category: "صغرى", type: "water", designCapacity: 2592, flow: 2039, year: "1995", status: "online", quality: "جيدة" },
  { id: "ST-064", name: "محطة بصيص", center: "الرياض", category: "صغرى", type: "water", designCapacity: 13824, flow: 10821, year: "2009", status: "online", quality: "جيدة" },
  { id: "ST-065", name: "محطة 8 أغسطس ( 69 )", center: "الرياض", category: "صغرى", type: "water", designCapacity: 8640, flow: 6601, year: "2015", status: "online", quality: "جيدة" },
  { id: "ST-066", name: "محطة معالجة سيدي سالم", center: "سيدي سالم", category: "صرف صحي", type: "sewage", flow: 31000, status: "online", quality: "جيدة" },
  { id: "ST-067", name: "محطة معالجة كفر الشيخ", center: "كفر الشيخ", category: "صرف صحي", type: "sewage", flow: 0, status: "offline", quality: "-" },
];

const maintenanceSeed = [
  { id: "WO-118", asset: "طلمبة #3 - المفتي", station: "المفتي", assignee: "حسن طارق", status: "inProgress" },
  { id: "WO-115", asset: "صمام - سيدي سالم", station: "سيدي سالم شرق", assignee: "—", status: "open" },
  { id: "WO-112", asset: "لوحة كهرباء - الرياض", station: "الرياض", assignee: "—", status: "open" },
  { id: "WO-109", asset: "فلتر - كفر الشيخ", station: "محطة كفر الشيخ", assignee: "منى رشاد", status: "closed" },
  { id: "WO-104", asset: "مولد احتياطي", station: "سيدي سالم غرب", assignee: "حسن طارق", status: "closed" },
];

const warehouseSeed = [
  { id: "SP-01", name: "مواسير PVC 200 مم", sku: "PVC-200", quantity: 85, unit: "متر", minThreshold: 50 },
  { id: "SP-02", name: "صمام تحكم 6 بوصة", sku: "VLV-006", quantity: 6, unit: "قطعة", minThreshold: 8 },
  { id: "SP-03", name: "طلمبة غاطسة 5 حصان", sku: "PMP-005", quantity: 3, unit: "قطعة", minThreshold: 2 },
  { id: "SP-04", name: "كلور سائل", sku: "CHL-LIQ", quantity: 220, unit: "لتر", minThreshold: 100 },
  { id: "SP-05", name: "كابل كهرباء 16 مم", sku: "CBL-016", quantity: 12, unit: "متر", minThreshold: 30 },
];

const incidentsSeed = [
  { id: "IN-01", date: "2026-06-12", station: "المفتي", desc: "سقوط عامل أثناء صيانة طلمبة", severity: "high", status: "closed" },
  { id: "IN-02", date: "2026-06-20", station: "سيدي سالم شرق", desc: "استنشاق أبخرة كلور بدون كمامة", severity: "med", status: "inProgress" },
  { id: "IN-03", date: "2026-06-24", station: "كفر الشيخ", desc: "جرح طفيف أثناء تركيب صمام", severity: "low", status: "open" },
];

const ppeSeed = [
  { id: "PPE-01", name: "كمامات تصفية كيميائية", quantity: 40, unit: "قطعة", minThreshold: 30 },
  { id: "PPE-02", name: "خوذة أمان", quantity: 18, unit: "قطعة", minThreshold: 15 },
  { id: "PPE-03", name: "قفازات مطاطية", quantity: 60, unit: "زوج", minThreshold: 40 },
  { id: "PPE-04", name: "حذاء أمان عازل", quantity: 9, unit: "زوج", minThreshold: 12 },
];

const inspectionsSeed = [
  { id: "SI-01", station: "المفتي", date: "2026-06-05", inspector: "إيمان فتحي", result: "pass" },
  { id: "SI-02", station: "سيدي سالم غرب", date: "2026-06-15", inspector: "كريم عادل", result: "fail" },
  { id: "SI-03", station: "كفر الشيخ", date: "2026-06-22", inspector: "إيمان فتحي", result: "pending" },
];

const employeesSeed = [
  { id: "EM-01", name: "حسن طارق", age: 34, role: "فني صيانة", department: "الصيانة", station: "المفتي", shift: "06:00 - 14:00" },
  { id: "EM-02", name: "منى رشاد", age: 29, role: "فنية معامل", department: "المعامل", station: "كفر الشيخ", shift: "14:00 - 22:00" },
  { id: "EM-03", name: "كريم عادل", age: 41, role: "مشغل محطة", department: "التشغيل", station: "سيدي سالم شرق", shift: "06:00 - 14:00" },
  { id: "EM-04", name: "إيمان فتحي", age: 37, role: "خدمة عملاء", department: "خدمة العملاء", station: "—", shift: "09:00 - 17:00" },
];

const payrollSeed = [
  { id: "PR-01", employee: "حسن طارق", salary: 6500, incentives: 800, disbursement: 300, allowance: 400, deduction: 150 },
  { id: "PR-02", employee: "منى رشاد", salary: 5800, incentives: 600, disbursement: 250, allowance: 350, deduction: 0 },
  { id: "PR-03", employee: "كريم عادل", salary: 7200, incentives: 900, disbursement: 400, allowance: 500, deduction: 200 },
  { id: "PR-04", employee: "إيمان فتحي", salary: 5200, incentives: 500, disbursement: 200, allowance: 300, deduction: 100 },
];

const trainingSeed = [
  { id: "TR-01", course: "السلامة المهنية في المحطات", date: "2026-06-10", trainees: 12, status: "closed" },
  { id: "TR-02", course: "صيانة الطلمبات الكهربائية", date: "2026-06-25", trainees: 8, status: "inProgress" },
  { id: "TR-03", course: "خدمة العملاء والتعامل مع الشكاوى", date: "2026-07-05", trainees: 15, status: "open" },
];

const recruitmentSeed = [
  { id: "RC-01", position: "فني كهرباء", department: "الصيانة", count: 2, status: "open" },
  { id: "RC-02", position: "محلل معامل", department: "المعامل", count: 1, status: "inProgress" },
  { id: "RC-03", position: "مندوب خدمة عملاء", department: "خدمة العملاء", count: 3, status: "closed" },
];

const pipelines = [
  { id: "PL-01", zone: "فوة", length: "4.2 كم", diameter: "300 مم", material: "PVC", status: "active" },
  { id: "PL-02", zone: "قلين", length: "2.8 كم", diameter: "250 مم", material: "حديد دكتايل", status: "active" },
  { id: "PL-03", zone: "دسوق", length: "1.5 كم", diameter: "200 مم", material: "PVC", status: "leaking" },
  { id: "PL-04", zone: "مطوبس", length: "3.1 كم", diameter: "300 مم", material: "خرساني", status: "maintenance" },
];

const usersSeed = [
  { name: "م. محمد كامل", email: "m.kamel@hayah.gov.eg", role: "ADMIN" },
  { name: "حسن طارق", email: "h.tarek@hayah.gov.eg", role: "EMPLOYEE" },
  { name: "منى رشاد", email: "m.rashad@hayah.gov.eg", role: "EMPLOYEE" },
  { name: "أحمد سيد", email: "ahmed.s@example.com", role: "CITIZEN" },
];

const complaintsSeed = [
  { id: "C-441", customer: "محمد كامل", type: "تسرب مياه", priority: "high", status: "open" },
  { id: "C-439", customer: "سارة أحمد", type: "ضعف ضغط", priority: "med", status: "inProgress" },
  { id: "C-432", customer: "يارا محمود", type: "صرف صحي", priority: "low", status: "closed" },
  { id: "C-428", customer: "عمر سامي", type: "انقطاع مياه", priority: "high", status: "inProgress" },
];

const alertsSeed = [
  { id: 1, time: "10:15 ص", text: "ارتفاع منسوب بيارة محطة معالجة كفر الشيخ", level: "high", station: "محطة كفر الشيخ", ack: false },
  { id: 2, time: "09:50 ص", text: "انخفاض ضغط المياه في منطقة سيدي سالم شرق", level: "med", station: "سيدي سالم شرق", ack: false },
  { id: 3, time: "09:30 ص", text: "توقف طلمبة رقم (2) بمحطة المفتي", level: "high", station: "المفتي", ack: false },
  { id: 4, time: "09:10 ص", text: "زيادة استهلاك الكهرباء بمركز سيدي سالم", level: "med", station: "سيدي سالم", ack: true },
  { id: 5, time: "08:40 ص", text: "نتيجة تحليل كلور خارج المعدل - الرياض", level: "low", station: "الرياض", ack: true },
];

const settingsSeed = { orgName: "شركة مياه الشرب والصرف الصحي - حياه", lang: "العربية", alertsEnabled: true };

const revenueSeed = [
  { id: "RV-101", date: "2026-06-01", source: "فواتير مياه - المفتي", amount: 184500 },
  { id: "RV-102", date: "2026-06-03", source: "فواتير مياه - سيدي سالم شرق", amount: 96200 },
  { id: "RV-103", date: "2026-06-10", source: "فواتير صرف صحي", amount: 54300 },
  { id: "RV-104", date: "2026-06-15", source: "فواتير مياه - سيدي سالم غرب", amount: 71800 },
  { id: "RV-105", date: "2026-06-20", source: "غرامات تأخير", amount: 8200 },
];

const readingsLogSeed = [
  { id: "RD-301", customer: "أحمد سيد", account: "AC-100234", date: "2026-06-01", previous: 1514, current: 1542 },
  { id: "RD-302", customer: "سارة أحمد", account: "AC-100871", date: "2026-06-01", previous: 959, current: 980 },
  { id: "RD-303", customer: "محمد كامل", account: "AC-100456", date: "2026-06-02", previous: 2210, current: 2256 },
];

const billingComplaintsSeed = [
  { id: "BC-501", customer: "محمد كامل", type: "خطأ في الفاتورة", status: "open" },
  { id: "BC-502", customer: "سارة أحمد", type: "زيادة غير مبررة في القراءة", status: "inProgress" },
  { id: "BC-503", customer: "يارا محمود", type: "طلب مراجعة رسوم توصيل", status: "closed" },
];

const connectionEstimatesSeed = [
  { id: "CN-701", applicant: "كريم عادل", address: "فوة - شارع المحطة", type: "مياه", distance: "45 م", cost: 3200, status: "open" },
  { id: "CN-702", applicant: "إيمان فتحي", address: "قلين - حي الجمهورية", type: "صرف صحي", distance: "60 م", cost: 5400, status: "inProgress" },
  { id: "CN-703", applicant: "حسن طارق", address: "دسوق - المنطقة الصناعية", type: "مياه", distance: "30 م", cost: 2100, status: "closed" },
];

const revenueByMonth = [
  { m: "يناير", v: 138000000 }, { m: "فبراير", v: 142000000 }, { m: "مارس", v: 148000000 },
  { m: "أبريل", v: 155000000 }, { m: "مايو", v: 152000000 }, { m: "يونيو", v: 165000000 },
];

const citizensFinance = [
  {
    id: "CU-1001", name: "أحمد سيد", account: "AC-100234", zone: "فوة",
    consumption: [
      { m: "يناير", v: 18 }, { m: "فبراير", v: 22 }, { m: "مارس", v: 19 },
      { m: "أبريل", v: 26 }, { m: "مايو", v: 24 }, { m: "يونيو", v: 28 },
    ],
    readings: [
      { date: "2026-06-01", value: 1542 }, { date: "2026-05-01", value: 1514 }, { date: "2026-04-01", value: 1488 },
    ],
    fees: [
      { label: "رسوم توصيل عداد", amount: 350 }, { label: "رسوم صيانة دورية", amount: 120 },
    ],
    record: [
      { date: "2026-06-05", desc: "فاتورة استهلاك يونيو", amount: 184.5, status: "unpaid" },
      { date: "2026-05-05", desc: "فاتورة استهلاك مايو", amount: 162.0, status: "paid" },
      { date: "2026-04-05", desc: "فاتورة استهلاك أبريل", amount: 171.25, status: "paid" },
    ],
  },
  {
    id: "CU-1002", name: "سارة أحمد", account: "AC-100871", zone: "قلين",
    consumption: [
      { m: "يناير", v: 15 }, { m: "فبراير", v: 17 }, { m: "مارس", v: 16 },
      { m: "أبريل", v: 20 }, { m: "مايو", v: 19 }, { m: "يونيو", v: 21 },
    ],
    readings: [
      { date: "2026-06-01", value: 980 }, { date: "2026-05-01", value: 959 },
    ],
    fees: [{ label: "غرامة تأخير سداد", amount: 50 }],
    record: [
      { date: "2026-06-05", desc: "فاتورة استهلاك يونيو", amount: 121.0, status: "paid" },
      { date: "2026-05-05", desc: "فاتورة استهلاك مايو", amount: 109.5, status: "paid" },
    ],
  },
];

const complaintsBreakdown = [
  { name: "ضعف مياه", value: 9, color: c.blue },
  { name: "انقطاع مياه", value: 6, color: c.green },
  { name: "صرف صحي", value: 5, color: c.purple },
  { name: "أخرى", value: 3, color: c.amber },
];

const productionData = Array.from({ length: 7 }, (_, i) => ({
  h: `${String(i * 4).padStart(2, "0")}:00`,
  actual: 28000 + Math.sin(i) * 9000 + i * 1200,
  design: 60000,
}));

const energyData = Array.from({ length: 7 }, (_, i) => ({
  h: `${String(i * 4).padStart(2, "0")}:00`,
  v: 12000 + i * 8500 + (i % 2 === 0 ? 3000 : -1500),
}));

const aiChatMock = [
  { from: "user", text: "ما هي المحطات الأكثر استهلاكًا للطاقة هذا الأسبوع؟" },
  { from: "ai", text: "محطة المفتي وسيدي سالم شرق هما الأعلى استهلاكًا، بزيادة 12% عن المتوسط. أقترح مراجعة كفاءة الطلمبات بمحطة المفتي." },
];

/* ---------------------------------------------------------------
   Shared building blocks
----------------------------------------------------------------*/

function SectionCard({ children, className = "" }) {
  return (
    <div className={`rounded-xl p-4 ${className}`} style={{ background: c.card, border: `1px solid ${c.line}` }}>
      {children}
    </div>
  );
}

function PageHeader({ title, action }) {
  return (
    <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
      <h2 className="font-bold text-lg" style={{ color: c.text }}>{title}</h2>
      {action}
    </div>
  );
}

function KpiCard({ label, value, sub, color, icon: Icon }) {
  return (
    <div className="rounded-xl px-4 py-3 flex flex-col gap-1 min-w-[150px] shrink-0" style={{ background: c.card, border: `1px solid ${color}33` }}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold" style={{ color: c.soft }}>{label}</span>
        <Icon size={20} color={color} />
      </div>
      <div className="flex items-baseline gap-2">
        <span className="font-mono font-extrabold text-2xl" style={{ color }}>{value}</span>
        {sub && <span className="text-[11px]" style={{ color: c.soft }}>{sub}</span>}
      </div>
    </div>
  );
}

function StatusTag({ status }) {
  const map = {
    online: { bg: "#173C2A", fg: c.green, label: "عاملة" },
    offline: { bg: "#3C1C1C", fg: c.red, label: "متوقفة" },
    open: { bg: "#3C1C1C", fg: c.red, label: "مفتوح" },
    inProgress: { bg: "#3C2F12", fg: c.amber, label: "جاري العمل" },
    closed: { bg: "#173C2A", fg: c.green, label: "مغلق" },
    active: { bg: "#173C2A", fg: c.green, label: "نشط" },
    leaking: { bg: "#3C1C1C", fg: c.red, label: "تسريب" },
    maintenance: { bg: "#3C2F12", fg: c.amber, label: "صيانة" },
    paid: { bg: "#173C2A", fg: c.green, label: "مدفوعة" },
    unpaid: { bg: "#3C1C1C", fg: c.red, label: "غير مدفوعة" },
    pass: { bg: "#173C2A", fg: c.green, label: "ناجح" },
    fail: { bg: "#3C1C1C", fg: c.red, label: "فاشل" },
    pending: { bg: "#3C2F12", fg: c.amber, label: "قيد الفحص" },
  };
  const s = map[status] || map.open;
  return <span className="px-2.5 py-1 rounded-md text-[11px] font-bold whitespace-nowrap" style={{ background: s.bg, color: s.fg }}>{s.label}</span>;
}

function PriorityDot({ level }) {
  const color = level === "high" ? c.red : level === "med" ? c.amber : c.green;
  const label = level === "high" ? "عالية" : level === "med" ? "متوسطة" : "منخفضة";
  return <span className="inline-flex items-center gap-1.5 text-xs" style={{ color: c.text }}><span className="w-2 h-2 rounded-full" style={{ background: color }} /> {label}</span>;
}

function RoleBadge({ role }) {
  const map = {
    ADMIN: { bg: "#2C2150", fg: c.purple, label: "مسؤول" },
    EMPLOYEE: { bg: "#173C2A", fg: c.green, label: "موظف" },
    CITIZEN: { bg: "#16314A", fg: c.blue, label: "مواطن" },
  };
  const r = map[role];
  return <span className="px-2.5 py-1 rounded-md text-[11px] font-bold" style={{ background: r.bg, color: r.fg }}>{r.label}</span>;
}

function PerformanceGauge({ percent = 86 }) {
  const size = 180, r = 78, cx = size / 2, cy = size / 2 + 6;
  const toRad = (deg) => (deg * Math.PI) / 180;
  const arcPath = (s, e) => {
    const sx = cx + r * Math.cos(toRad(s)), sy = cy + r * Math.sin(toRad(s));
    const ex = cx + r * Math.cos(toRad(e)), ey = cy + r * Math.sin(toRad(e));
    return `M ${sx} ${sy} A ${r} ${r} 0 0 1 ${ex} ${ey}`;
  };
  const needleDeg = 180 + (percent / 100) * 180;
  const nx = cx + (r - 14) * Math.cos(toRad(needleDeg)), ny = cy + (r - 14) * Math.sin(toRad(needleDeg));
  const label = percent >= 80 ? "جيد جدًا" : percent >= 60 ? "جيد" : percent >= 40 ? "متوسط" : "ضعيف";
  const labelColor = percent >= 80 ? c.green : percent >= 60 ? c.cyan : percent >= 40 ? c.amber : c.red;
  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size / 2 + 26} viewBox={`0 0 ${size} ${size / 2 + 26}`}>
        <path d={arcPath(180, 240)} stroke={c.red} strokeWidth={14} fill="none" strokeLinecap="round" />
        <path d={arcPath(240, 300)} stroke={c.amber} strokeWidth={14} fill="none" />
        <path d={arcPath(300, 360)} stroke={c.green} strokeWidth={14} fill="none" strokeLinecap="round" />
        <line x1={cx} y1={cy} x2={nx} y2={ny} stroke={c.text} strokeWidth={3} strokeLinecap="round" />
        <circle cx={cx} cy={cy} r={5} fill={c.text} />
        <text x={cx} y={cy - 24} textAnchor="middle" fontSize="26" fontWeight="800" fill={c.text} fontFamily="JetBrains Mono">{percent}%</text>
      </svg>
      <div className="flex justify-between w-full text-[10px] px-2" style={{ color: c.soft }}><span>0%</span><span>100%</span></div>
      <span className="text-sm font-bold mt-1" style={{ color: labelColor }}>{label}</span>
      <span className="text-[11px]" style={{ color: c.soft }}>نسبة الأداء الإجمالية</span>
    </div>
  );
}

function normalizeDigits(str) {
  if (str == null) return str;
  const map = { "٠": "0", "١": "1", "٢": "2", "٣": "3", "٤": "4", "٥": "5", "٦": "6", "٧": "7", "٨": "8", "٩": "9" };
  return String(str).replace(/[٠-٩]/g, (d) => map[d]).replace(/[^0-9.]/g, "");
}

function StationFormModal({ initial, onClose, onSave }) {
  const [form, setForm] = useState(
    initial || { name: "", type: "water", pressure: "", flow: "", quality: "جيدة", status: "online" }
  );
  const isEdit = Boolean(initial?.id);

  const handleSubmit = () => {
    onSave({
      ...form,
      id: initial?.id || `ST-${Math.floor(100 + Math.random() * 900)}`,
      pressure: form.pressure === "" ? null : Number(normalizeDigits(form.pressure)),
      flow: Number(normalizeDigits(form.flow)) || 0,
    });
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center px-4" style={{ background: "rgba(0,0,0,0.55)" }}>
      <div className="w-full max-w-md rounded-xl p-5 relative" style={{ background: c.card, border: `1px solid ${c.line}` }}>
        <button onClick={onClose} className="absolute top-4 left-4"><X size={24} color={c.soft} /></button>
        <p className="font-bold mb-4" style={{ color: c.text }}>{isEdit ? "تعديل بيانات المحطة" : "إضافة محطة جديدة"}</p>
        <div className="flex flex-col gap-3">
          <input required placeholder="اسم المحطة" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="px-3 py-2 rounded-lg text-sm" style={inputStyle} />
          <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="px-3 py-2 rounded-lg text-sm" style={inputStyle}>
            <option value="water">محطة مياه</option>
            <option value="sewage">محطة صرف صحي</option>
          </select>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text" inputMode="decimal" placeholder="الضغط (بار)" value={form.pressure}
              onChange={(e) => setForm({ ...form, pressure: normalizeDigits(e.target.value) })}
              className="px-3 py-2 rounded-lg text-sm" style={inputStyle}
            />
            <input
              type="text" inputMode="numeric" placeholder="التصرف (م³)" value={form.flow}
              onChange={(e) => setForm({ ...form, flow: normalizeDigits(e.target.value) })}
              className="px-3 py-2 rounded-lg text-sm" style={inputStyle}
            />
          </div>
          <select value={form.quality} onChange={(e) => setForm({ ...form, quality: e.target.value })} className="px-3 py-2 rounded-lg text-sm" style={inputStyle}>
            <option value="جيدة">جودة المياه: جيدة</option>
            <option value="متوسطة">جودة المياه: متوسطة</option>
            <option value="-">غير متاحة</option>
          </select>
          <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="px-3 py-2 rounded-lg text-sm" style={inputStyle}>
            <option value="online">عاملة</option>
            <option value="offline">متوقفة</option>
          </select>
          <div className="flex gap-2 mt-1">
            <button type="button" onClick={handleSubmit} disabled={!form.name} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold" style={{ background: c.blue, color: c.bg, opacity: form.name ? 1 : 0.6 }}>
              <Save size={20} /> حفظ
            </button>
            <button type="button" onClick={onClose} className="px-4 py-2.5 rounded-lg text-sm font-bold" style={{ background: c.cardAlt, color: c.text, border: `1px solid ${c.line}` }}>
              إلغاء
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const inputStyle = { background: c.cardAlt, border: `1px solid ${c.line}`, color: c.text };

/* Generic persistence: loads once from window.storage, then saves on every change. */
function usePersistedState(key, initialValue, onStatus) {
  const [value, setValue] = useState(initialValue);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await window.storage.get(key, true);
        if (res?.value) setValue(JSON.parse(res.value));
      } catch {
        // nothing saved yet — keep the starter mock data
      } finally {
        setLoaded(true);
      }
    })();
  }, [key]);

  useEffect(() => {
    if (!loaded) return; // don't overwrite saved data with the initial mock on first render
    onStatus?.("saving");
    window.storage.set(key, JSON.stringify(value), true)
      .then(() => onStatus?.("saved"))
      .catch((err) => onStatus?.("error", err?.message || "فشل الحفظ"));
  }, [value, loaded]);

  return [value, setValue, loaded];
}

/* Reusable add/edit form built from a field config — used by Maintenance, HR, Users */
function FormModal({ title, fields, initial, onClose, onSave }) {
  const [form, setForm] = useState(() => initial || Object.fromEntries(fields.map((f) => [f.key, f.default ?? ""])));

  const handleSubmit = () => {
    onSave({ ...form, id: initial?.id || `${Date.now()}` });
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center px-4" style={{ background: "rgba(0,0,0,0.55)" }}>
      <div className="w-full max-w-md rounded-xl p-5 relative" style={{ background: c.card, border: `1px solid ${c.line}` }}>
        <button onClick={onClose} className="absolute top-4 left-4"><X size={24} color={c.soft} /></button>
        <p className="font-bold mb-4" style={{ color: c.text }}>{title}</p>
        <div className="flex flex-col gap-3">
          {fields.map((f) =>
            f.type === "select" ? (
              <select key={f.key} value={form[f.key]} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} className="px-3 py-2 rounded-lg text-sm" style={inputStyle}>
                {f.options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            ) : (
              <input
                key={f.key} required={f.required} type={f.type || "text"} placeholder={f.label}
                value={form[f.key]} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                onKeyDown={(e) => { if (e.key === "Enter") handleSubmit(); }}
                className="px-3 py-2 rounded-lg text-sm" style={inputStyle}
              />
            )
          )}
          <div className="flex gap-2 mt-1">
            <button type="button" onClick={handleSubmit} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold" style={{ background: c.blue, color: c.bg }}>
              <Save size={20} /> حفظ
            </button>
            <button type="button" onClick={onClose} className="px-4 py-2.5 rounded-lg text-sm font-bold" style={{ background: c.cardAlt, color: c.text, border: `1px solid ${c.line}` }}>
              إلغاء
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   Section: Home (overview)
----------------------------------------------------------------*/

function HomeSection({ stations, alerts }) {
  const totalComplaints = useMemo(() => complaintsBreakdown.reduce((s, x) => s + x.value, 0), []);
  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-3 overflow-x-auto pb-1">
        <KpiCard label="إجمالي محطات ورافع المياه" value="65" sub="محطة/رافع" color={c.blue} icon={Droplets} />
        <KpiCard label="محطات عاملة" value="64" sub="98.5%" color={c.green} icon={Shield} />
        <KpiCard label="محطات متوقفة" value="1" sub="1.5%" color={c.red} icon={AlertTriangle} />
        <KpiCard label="محطات الصرف" value="2" sub="محطة" color={c.cyan} icon={Droplets} />
        <KpiCard label="أعطال حالية" value="9" sub="عطل" color={c.amber} icon={Wrench} />
        <KpiCard label="شكاوى مفتوحة" value="31" sub="شكوى" color={c.purple} icon={Headphones} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 flex flex-col gap-5">
          <SectionCard>
            <p className="font-bold text-sm mb-1" style={{ color: c.text }}>حالة المحطات بشكل لحظي</p>
            <p className="text-[11px] mb-3" style={{ color: c.soft }}>أحدث 8 من إجمالي {stations.length} محطة ورافع — التفاصيل الكاملة في "تشغيل المحطات"</p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr style={{ color: c.soft, borderBottom: `1px solid ${c.line}` }}>
                    <th className="text-start py-2 font-medium">المحطة</th>
                    <th className="text-start py-2 font-medium">الحالة</th>
                    <th className="text-start py-2 font-medium">التصرف (م³)</th>
                    <th className="text-start py-2 font-medium">الضغط</th>
                    <th className="text-start py-2 font-medium">جودة المياه</th>
                  </tr>
                </thead>
                <tbody>
                  {stations.slice(0, 8).map((s) => (
                    <tr key={s.id} style={{ borderBottom: `1px solid ${c.line}` }}>
                      <td className="py-2.5 font-semibold" style={{ color: c.text }}>{s.name}</td>
                      <td className="py-2.5"><StatusTag status={s.status} /></td>
                      <td className="py-2.5 font-mono" style={{ color: c.text }}>{s.capacityText || (s.flow || 0).toLocaleString()}</td>
                      <td className="py-2.5 font-mono" style={{ color: c.text }}>{s.pressure ?? "-"}</td>
                      <td className="py-2.5" style={{ color: c.text }}>{s.quality}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionCard>

          <SectionCard>
            <p className="font-bold text-sm mb-3" style={{ color: c.text }}>خريطة المحطات والشبكات</p>
            <KafrElSheikhMap height={224} stations={stations} />
          </SectionCard>
        </div>

        <div className="flex flex-col gap-5">
          <SectionCard>
            <p className="font-bold text-sm mb-3" style={{ color: c.text }}>الإنذارات العاجلة</p>
            <div className="flex flex-col gap-2.5">
              {alerts.slice(0, 4).map((a) => (
                <div key={a.id} className="flex items-start gap-2.5">
                  <AlertTriangle size={19} color={a.level === "high" ? c.red : c.amber} className="mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <p className="text-xs" style={{ color: c.text }}>{a.text}</p>
                    <p className="text-[10px]" style={{ color: c.soft }}>{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard>
            <p className="font-bold text-sm mb-2" style={{ color: c.text }}>الشكاوى المفتوحة</p>
            <div className="flex items-center gap-3">
              <div className="relative w-28 h-28 shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={complaintsBreakdown} dataKey="value" innerRadius={32} outerRadius={50} paddingAngle={3}>
                      {complaintsBreakdown.map((d, i) => <Cell key={i} fill={d.color} stroke="none" />)}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-mono font-extrabold text-lg" style={{ color: c.text }}>{totalComplaints}</span>
                  <span className="text-[9px]" style={{ color: c.soft }}>شكوى</span>
                </div>
              </div>
              <div className="flex flex-col gap-1.5 text-[11px]">
                {complaintsBreakdown.map((d, i) => (
                  <span key={i} className="flex items-center gap-1.5" style={{ color: c.text }}><span className="w-2 h-2 rounded-full" style={{ background: d.color }} /> {d.name} · {d.value}</span>
                ))}
              </div>
            </div>
          </SectionCard>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <SectionCard>
          <p className="font-bold text-sm mb-3" style={{ color: c.text }}>إنتاج المياه اليومي (م³)</p>
          <ResponsiveContainer width="100%" height={160}>
            <LineChart data={productionData}>
              <CartesianGrid stroke={c.line} vertical={false} />
              <XAxis dataKey="h" tick={{ fontSize: 10, fill: c.soft }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: c.soft }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: c.cardAlt, border: `1px solid ${c.line}`, fontSize: 11 }} />
              <Line type="monotone" dataKey="actual" stroke={c.blue} strokeWidth={2.5} dot={false} />
              <Line type="monotone" dataKey="design" stroke={c.green} strokeWidth={1.5} strokeDasharray="5 5" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </SectionCard>
        <SectionCard>
          <p className="font-bold text-sm mb-3" style={{ color: c.text }}>استهلاك الكهرباء اليومي (ك.و.س)</p>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={energyData}>
              <CartesianGrid stroke={c.line} vertical={false} />
              <XAxis dataKey="h" tick={{ fontSize: 10, fill: c.soft }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: c.soft }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: c.cardAlt, border: `1px solid ${c.line}`, fontSize: 11 }} />
              <Bar dataKey="v" fill={c.blue} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </SectionCard>
        <SectionCard className="flex items-center justify-center">
          <PerformanceGauge percent={86} />
        </SectionCard>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   Section: Station Operations
----------------------------------------------------------------*/

function StationOpsSection({ stations, setStations }) {
  const [running, setRunning] = useState(() => Object.fromEntries(stations.map((s) => [s.id, s.status === "online"])));
  const [modal, setModal] = useState(null); // null | {} (new) | station (edit)
  const [confirmingReset, setConfirmingReset] = useState(false);
  const [q, setQ] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const handleSave = (station) => {
    setStations((prev) => {
      const exists = prev.some((s) => s.id === station.id);
      return exists ? prev.map((s) => (s.id === station.id ? station : s)) : [...prev, station];
    });
    setRunning((r) => ({ ...r, [station.id]: station.status === "online" }));
    setModal(null);
  };

  const restoreDefaults = () => {
    setStations(initialStations);
    setRunning(Object.fromEntries(initialStations.map((s) => [s.id, s.status === "online"])));
    setConfirmingReset(false);
  };

  const categories = ["all", ...Array.from(new Set(stations.map((s) => s.category).filter(Boolean)))];
  const filtered = stations.filter((s) => {
    const matchesQ = !q || s.name.includes(q) || (s.center || "").includes(q);
    const matchesCat = categoryFilter === "all" || s.category === categoryFilter;
    return matchesQ && matchesCat;
  });

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="تشغيل المحطات"
        action={
          <div className="flex gap-2">
            {confirmingReset ? (
              <>
                <button onClick={restoreDefaults} className="px-3 py-1.5 rounded-lg text-xs font-bold" style={{ background: c.red, color: "#fff" }}>
                  تأكيد الاستبدال
                </button>
                <button onClick={() => setConfirmingReset(false)} className="px-3 py-1.5 rounded-lg text-xs font-bold" style={{ background: c.cardAlt, color: c.soft, border: `1px solid ${c.line}` }}>
                  إلغاء
                </button>
              </>
            ) : (
              <button onClick={() => setConfirmingReset(true)} className="px-3 py-1.5 rounded-lg text-xs font-bold" style={{ background: c.cardAlt, color: c.soft, border: `1px solid ${c.line}` }}>
                استعادة القيم الافتراضية
              </button>
            )}
            <button onClick={() => setModal({})} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold" style={{ background: c.blue, color: c.bg }}>
              <Plus size={19} /> إضافة محطة
            </button>
          </div>
        }
      />

      <div className="flex flex-wrap gap-2 items-center">
        <div className="relative max-w-xs">
          <Search size={16} className="absolute top-1/2 -translate-y-1/2 right-3" color={c.soft} />
          <input
            value={q} onChange={(e) => setQ(e.target.value)} placeholder="بحث بالاسم أو المركز..."
            className="w-full pr-10 pl-3 py-2 rounded-lg text-xs" style={inputStyle}
          />
        </div>
        {categories.map((cat) => (
          <button
            key={cat} onClick={() => setCategoryFilter(cat)}
            className="px-3 py-1.5 rounded-lg text-xs font-bold"
            style={{ background: categoryFilter === cat ? c.blue : c.card, color: categoryFilter === cat ? c.bg : c.soft, border: `1px solid ${c.line}` }}
          >
            {cat === "all" ? "الكل" : cat}
          </button>
        ))}
        <span className="text-xs" style={{ color: c.soft }}>{filtered.length} محطة</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((s) => (
          <SectionCard key={s.id}>
            <div className="flex items-center justify-between mb-2">
              <p className="font-bold text-sm" style={{ color: c.text }}>{s.name}</p>
              <StatusTag status={running[s.id] ? "online" : "offline"} />
            </div>
            <p className="text-xs mb-3" style={{ color: c.soft }}>
              {s.category || (s.type === "water" ? "محطة مياه" : "محطة صرف صحي")}
              {s.center ? ` · ${s.center}` : ""} · {s.id}
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs mb-3">
              <div>
                <span style={{ color: c.soft }}>التصرف: </span>
                <span className="font-mono" style={{ color: c.text }}>
                  {s.capacityText || `${(s.flow || 0).toLocaleString()} م³`}
                </span>
              </div>
              <div><span style={{ color: c.soft }}>الضغط: </span><span className="font-mono" style={{ color: c.text }}>{s.pressure ?? "-"}</span></div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setRunning((r) => ({ ...r, [s.id]: !r[s.id] }))}
                className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold"
                style={{ background: running[s.id] ? "#3C1C1C" : "#173C2A", color: running[s.id] ? c.red : c.green }}
              >
                {running[s.id] ? <Pause size={17} /> : <Play size={17} />} {running[s.id] ? "إيقاف التشغيل" : "بدء التشغيل"}
              </button>
              <button
                onClick={() => setModal(s)}
                className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold"
                style={{ background: c.cardAlt, color: c.text, border: `1px solid ${c.line}` }}
              >
                <Pencil size={17} /> تعديل
              </button>
            </div>
          </SectionCard>
        ))}
      </div>

      {modal && (
        <StationFormModal initial={modal.id ? modal : null} onClose={() => setModal(null)} onSave={handleSave} />
      )}
    </div>
  );
}

/* ---------------------------------------------------------------
   Section: Maintenance (kanban)
----------------------------------------------------------------*/

function WorkOrdersTab({ orders, setOrders, stations }) {
  const [modal, setModal] = useState(false);
  const columns = [
    { key: "open", label: "مفتوحة", next: "inProgress" },
    { key: "inProgress", label: "جاري العمل", next: "closed" },
    { key: "closed", label: "مغلقة", next: null },
  ];

  const addOrder = (data) => {
    setOrders((prev) => [...prev, { ...data, status: "open" }]);
    setModal(false);
  };

  const advance = (id, next) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: next } : o)));
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <button onClick={() => setModal(true)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold" style={{ background: c.blue, color: c.bg }}>
          <Plus size={19} /> أمر عمل جديد
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {columns.map((col) => (
          <div key={col.key} className="flex flex-col gap-3">
            <p className="text-xs font-bold" style={{ color: c.soft }}>{col.label} · {orders.filter((o) => o.status === col.key).length}</p>
            {orders.filter((o) => o.status === col.key).map((o) => (
              <SectionCard key={o.id}>
                <p className="font-semibold text-sm" style={{ color: c.text }}>{o.asset}</p>
                <p className="text-xs mt-1" style={{ color: c.soft }}>{o.station} · {o.id}</p>
                <p className="text-xs mt-2 mb-2" style={{ color: c.text }}>مكلّف: {o.assignee}</p>
                {col.next && (
                  <button
                    onClick={() => advance(o.id, col.next)}
                    className="w-full py-1.5 rounded-lg text-[11px] font-bold"
                    style={{ background: c.cardAlt, color: c.blue, border: `1px solid ${c.line}` }}
                  >
                    نقل إلى {columns.find((x) => x.key === col.next)?.label}
                  </button>
                )}
              </SectionCard>
            ))}
          </div>
        ))}
      </div>

      {modal && (
        <FormModal
          title="أمر عمل جديد"
          fields={[
            { key: "asset", label: "الأصل / الوصف", required: true },
            { key: "station", label: "المحطة", type: "select", options: stations.map((s) => ({ value: s.name, label: s.name })) },
            { key: "assignee", label: "مكلّف إلى", default: "—" },
          ]}
          onClose={() => setModal(false)}
          onSave={addOrder}
        />
      )}
    </div>
  );
}

function WarehouseTab({ parts, setParts }) {
  const [modal, setModal] = useState(false);

  const addPart = (data) => {
    setParts((prev) => [...prev, {
      ...data,
      quantity: Number(data.quantity) || 0,
      minThreshold: Number(data.minThreshold) || 0,
    }]);
    setModal(false);
  };

  const adjust = (id, delta) => {
    setParts((prev) => prev.map((p) => (p.id === id ? { ...p, quantity: Math.max(0, p.quantity + delta) } : p)));
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <button onClick={() => setModal(true)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold" style={{ background: c.blue, color: c.bg }}>
          <Plus size={19} /> إضافة قطعة
        </button>
      </div>
      <SectionCard>
        <p className="text-[11px] mb-3" style={{ color: c.soft }}>القطع باللون الأحمر وصلت لحد الطلب الأدنى أو أقل</p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr style={{ color: c.soft, borderBottom: `1px solid ${c.line}` }}>
                <th className="text-start py-2 font-medium">القطعة</th>
                <th className="text-start py-2 font-medium">الكود</th>
                <th className="text-start py-2 font-medium">الكمية المتوفرة</th>
                <th className="text-start py-2 font-medium">حد الطلب الأدنى</th>
                <th className="text-start py-2 font-medium">تعديل</th>
              </tr>
            </thead>
            <tbody>
              {parts.map((p) => {
                const low = p.quantity <= p.minThreshold;
                return (
                  <tr key={p.id} style={{ borderBottom: `1px solid ${c.line}` }}>
                    <td className="py-2.5 font-semibold" style={{ color: c.text }}>{p.name}</td>
                    <td className="py-2.5 font-mono" style={{ color: c.soft }}>{p.sku}</td>
                    <td className="py-2.5 font-mono font-bold" style={{ color: low ? c.red : c.text }}>{p.quantity} {p.unit}</td>
                    <td className="py-2.5 font-mono" style={{ color: c.soft }}>{p.minThreshold} {p.unit}</td>
                    <td className="py-2.5">
                      <div className="flex gap-1">
                        <button onClick={() => adjust(p.id, -1)} className="w-6 h-6 rounded flex items-center justify-center font-bold" style={{ background: c.cardAlt, color: c.text, border: `1px solid ${c.line}` }}>-</button>
                        <button onClick={() => adjust(p.id, 1)} className="w-6 h-6 rounded flex items-center justify-center font-bold" style={{ background: c.cardAlt, color: c.text, border: `1px solid ${c.line}` }}>+</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </SectionCard>

      {modal && (
        <FormModal
          title="إضافة قطعة غيار"
          fields={[
            { key: "name", label: "اسم القطعة", required: true },
            { key: "sku", label: "الكود (SKU)", required: true },
            { key: "quantity", label: "الكمية", required: true },
            { key: "unit", label: "الوحدة (قطعة/متر/لتر)", default: "قطعة" },
            { key: "minThreshold", label: "حد الطلب الأدنى", default: "0" },
          ]}
          onClose={() => setModal(false)}
          onSave={addPart}
        />
      )}
    </div>
  );
}

function MaintenanceSection({ orders, setOrders, stations, parts, setParts }) {
  const [tab, setTab] = useState("orders");
  const tabs = [
    ["orders", "أوامر الصيانة"],
    ["warehouse", "المخازن"],
  ];

  return (
    <div className="flex flex-col gap-4">
      <PageHeader title="الصيانة" />
      <div className="flex gap-2 flex-wrap">
        {tabs.map(([k, l]) => (
          <button
            key={k} onClick={() => setTab(k)}
            className="px-3 py-1.5 rounded-lg text-xs font-bold"
            style={{ background: tab === k ? c.blue : c.card, color: tab === k ? c.bg : c.soft, border: `1px solid ${c.line}` }}
          >
            {l}
          </button>
        ))}
      </div>
      {tab === "orders" && <WorkOrdersTab orders={orders} setOrders={setOrders} stations={stations} />}
      {tab === "warehouse" && <WarehouseTab parts={parts} setParts={setParts} />}
    </div>
  );
}

/* ---------------------------------------------------------------
   Section: GIS & Network
----------------------------------------------------------------*/

// Approximate coordinates for Kafr El-Sheikh governorate's markaz (district) centers
const MARKAZ_COORDS = {
  "كفر الشيخ": { lat: 31.1107, lon: 30.9388 },
  "دسوق": { lat: 31.1325, lon: 30.6500 },
  "فوة": { lat: 31.2167, lon: 30.7167 },
  "مطوبس": { lat: 31.3667, lon: 30.7500 },
  "بلطيم": { lat: 31.5833, lon: 31.0833 },
  "الحامول": { lat: 31.3500, lon: 31.0833 },
  "بيلا": { lat: 31.2167, lon: 31.0500 },
  "قلين": { lat: 31.1500, lon: 30.9667 },
  "سيدي سالم": { lat: 31.2333, lon: 30.7833 },
  "الرياض": { lat: 31.4167, lon: 31.0167 },
};

// bbox covering the whole governorate: [minLon, minLat, maxLon, maxLat]
const MAP_BBOX = { minLon: 30.60, minLat: 31.00, maxLon: 31.15, maxLat: 31.65 };

function latLonToPercent({ lat, lon }) {
  const left = ((lon - MAP_BBOX.minLon) / (MAP_BBOX.maxLon - MAP_BBOX.minLon)) * 100;
  const top = ((MAP_BBOX.maxLat - lat) / (MAP_BBOX.maxLat - MAP_BBOX.minLat)) * 100;
  return { left: `${Math.min(96, Math.max(2, left))}%`, top: `${Math.min(96, Math.max(2, top))}%` };
}

// Markaz currently reporting weak water pressure (illustrative — based on recent alerts/complaints)
const weakWaterAreas = ["سيدي سالم", "مطوبس", "الحامول"];

function MapMarker({ pos, color, label, count, pulse }) {
  return (
    <div
      className="absolute flex flex-col items-center"
      style={{ left: pos.left, top: pos.top, transform: "translate(-50%, -100%)" }}
      title={label}
    >
      <div className="relative">
        {pulse && (
          <span
            className="absolute inset-0 rounded-full animate-ping"
            style={{ background: color, opacity: 0.5 }}
          />
        )}
        <div
          className="relative flex items-center justify-center rounded-full font-bold"
          style={{
            width: count ? 26 : 14, height: count ? 26 : 14,
            background: color, color: "#fff", fontSize: 10,
            border: "2px solid rgba(255,255,255,0.85)",
          }}
        >
          {count || ""}
        </div>
      </div>
      <span
        className="mt-1 text-[9px] font-bold px-1.5 py-0.5 rounded whitespace-nowrap"
        style={{ background: c.card, color: c.text, border: `1px solid ${c.line}` }}
      >
        {label}
      </span>
    </div>
  );
}

function KafrElSheikhMap({ height = 288, stations = [] }) {
  const countsByCenter = {};
  stations.forEach((s) => {
    const key = s.center;
    if (key && MARKAZ_COORDS[key]) countsByCenter[key] = (countsByCenter[key] || 0) + 1;
  });

  return (
    <div className="flex flex-col gap-3">
      <div className="relative rounded-lg overflow-hidden" style={{ height, border: `1px solid ${c.line}` }}>
        <iframe
          title="خريطة كفر الشيخ"
          src={`https://www.openstreetmap.org/export/embed.html?bbox=${MAP_BBOX.minLon}%2C${MAP_BBOX.minLat}%2C${MAP_BBOX.maxLon}%2C${MAP_BBOX.maxLat}&layer=mapnik`}
          width="100%"
          height="100%"
          style={{ border: 0, filter: "invert(0.92) hue-rotate(180deg) brightness(1.05) contrast(0.9)" }}
          loading="lazy"
        />

        {Object.entries(countsByCenter).map(([name, count]) => (
          <MapMarker key={name} pos={latLonToPercent(MARKAZ_COORDS[name])} color={c.blue} label={name} count={count} />
        ))}
        {weakWaterAreas.map((name) =>
          MARKAZ_COORDS[name] ? (
            <MapMarker key={`weak-${name}`} pos={latLonToPercent(MARKAZ_COORDS[name])} color={c.red} label={`⚠ ${name}`} pulse />
          ) : null
        )}

        <span
          className="absolute bottom-2 right-2 text-[10px] font-bold px-2 py-1 rounded"
          style={{ background: c.card, color: c.text, border: `1px solid ${c.line}` }}
        >
          محافظة كفر الشيخ
        </span>
      </div>

      <div className="flex flex-wrap gap-4 text-[11px]" style={{ color: c.soft }}>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full" style={{ background: c.blue }} /> عدد المحطات بكل مركز</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full" style={{ background: c.red }} /> مناطق تعاني ضعف ضغط المياه</span>
      </div>
    </div>
  );
}

function GISSection({ stations }) {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader title="GIS والشبكات" />
      <SectionCard>
        <p className="font-bold text-sm mb-3" style={{ color: c.text }}>خريطة محافظة كفر الشيخ</p>
        <KafrElSheikhMap stations={stations} />
      </SectionCard>
      <SectionCard>
        <p className="font-bold text-sm mb-3" style={{ color: c.text }}>خطوط الشبكة</p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr style={{ color: c.soft, borderBottom: `1px solid ${c.line}` }}>
                <th className="text-start py-2 font-medium">الكود</th>
                <th className="text-start py-2 font-medium">المنطقة</th>
                <th className="text-start py-2 font-medium">الطول</th>
                <th className="text-start py-2 font-medium">القطر</th>
                <th className="text-start py-2 font-medium">الخامة</th>
                <th className="text-start py-2 font-medium">الحالة</th>
              </tr>
            </thead>
            <tbody>
              {pipelines.map((p) => (
                <tr key={p.id} style={{ borderBottom: `1px solid ${c.line}` }}>
                  <td className="py-2.5 font-semibold" style={{ color: c.text }}>{p.id}</td>
                  <td className="py-2.5" style={{ color: c.text }}>{p.zone}</td>
                  <td className="py-2.5 font-mono" style={{ color: c.text }}>{p.length}</td>
                  <td className="py-2.5 font-mono" style={{ color: c.text }}>{p.diameter}</td>
                  <td className="py-2.5" style={{ color: c.text }}>{p.material}</td>
                  <td className="py-2.5"><StatusTag status={p.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}

/* ---------------------------------------------------------------
   Section: HR
----------------------------------------------------------------*/

function OrgStructureTab({ employees, setEmployees, stations }) {
  const [modal, setModal] = useState(false);
  const addEmployee = (data) => {
    setEmployees((prev) => [...prev, { ...data, age: Number(data.age) || 0 }]);
    setModal(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <button onClick={() => setModal(true)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold" style={{ background: c.blue, color: c.bg }}>
          <UserPlus size={19} /> إضافة موظف
        </button>
      </div>
      <SectionCard>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr style={{ color: c.soft, borderBottom: `1px solid ${c.line}` }}>
                <th className="text-start py-2 font-medium">الاسم</th>
                <th className="text-start py-2 font-medium">السن</th>
                <th className="text-start py-2 font-medium">الوظيفة</th>
                <th className="text-start py-2 font-medium">القسم</th>
                <th className="text-start py-2 font-medium">المحطة</th>
                <th className="text-start py-2 font-medium">الوردية</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((e, i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${c.line}` }}>
                  <td className="py-2.5 font-semibold" style={{ color: c.text }}>{e.name}</td>
                  <td className="py-2.5 font-mono" style={{ color: c.text }}>{e.age || "—"}</td>
                  <td className="py-2.5" style={{ color: c.text }}>{e.role}</td>
                  <td className="py-2.5" style={{ color: c.soft }}>{e.department}</td>
                  <td className="py-2.5" style={{ color: c.text }}>{e.station}</td>
                  <td className="py-2.5 font-mono" style={{ color: c.text }}>{e.shift}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      {modal && (
        <FormModal
          title="إضافة موظف"
          fields={[
            { key: "name", label: "الاسم", required: true },
            { key: "age", label: "السن", required: true },
            { key: "role", label: "الوظيفة", required: true },
            { key: "department", label: "القسم" },
            { key: "station", label: "المحطة", type: "select", options: [{ value: "—", label: "—" }, ...stations.map((s) => ({ value: s.name, label: s.name }))] },
            { key: "shift", label: "الوردية (مثال: 06:00 - 14:00)" },
          ]}
          onClose={() => setModal(false)}
          onSave={addEmployee}
        />
      )}
    </div>
  );
}

function EntitlementsTab({ payroll, setPayroll }) {
  const [modal, setModal] = useState(false);
  const addRow = (data) => {
    setPayroll((prev) => [...prev, {
      ...data,
      salary: Number(data.salary) || 0,
      incentives: Number(data.incentives) || 0,
      disbursement: Number(data.disbursement) || 0,
      allowance: Number(data.allowance) || 0,
      deduction: Number(data.deduction) || 0,
    }]);
    setModal(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <button onClick={() => setModal(true)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold" style={{ background: c.blue, color: c.bg }}>
          <Plus size={19} /> إضافة استحقاق
        </button>
      </div>
      <SectionCard>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr style={{ color: c.soft, borderBottom: `1px solid ${c.line}` }}>
                <th className="text-start py-2 font-medium">الموظف</th>
                <th className="text-start py-2 font-medium">المرتب</th>
                <th className="text-start py-2 font-medium">الحوافز</th>
                <th className="text-start py-2 font-medium">الصرفية</th>
                <th className="text-start py-2 font-medium">بدلات إضافية</th>
                <th className="text-start py-2 font-medium">خصم</th>
                <th className="text-start py-2 font-medium">الصافي</th>
              </tr>
            </thead>
            <tbody>
              {payroll.map((p) => {
                const net = p.salary + p.incentives + p.disbursement + p.allowance - p.deduction;
                return (
                  <tr key={p.id} style={{ borderBottom: `1px solid ${c.line}` }}>
                    <td className="py-2.5 font-semibold" style={{ color: c.text }}>{p.employee}</td>
                    <td className="py-2.5 font-mono" style={{ color: c.text }}>{p.salary.toLocaleString()}</td>
                    <td className="py-2.5 font-mono" style={{ color: c.green }}>{p.incentives.toLocaleString()}</td>
                    <td className="py-2.5 font-mono" style={{ color: c.text }}>{p.disbursement.toLocaleString()}</td>
                    <td className="py-2.5 font-mono" style={{ color: c.text }}>{p.allowance.toLocaleString()}</td>
                    <td className="py-2.5 font-mono" style={{ color: c.red }}>{p.deduction.toLocaleString()}</td>
                    <td className="py-2.5 font-mono font-bold" style={{ color: c.blue }}>{net.toLocaleString()} ج.م</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </SectionCard>

      {modal && (
        <FormModal
          title="إضافة استحقاق موظف"
          fields={[
            { key: "employee", label: "اسم الموظف", required: true },
            { key: "salary", label: "المرتب", required: true },
            { key: "incentives", label: "الحوافز", default: "0" },
            { key: "disbursement", label: "الصرفية", default: "0" },
            { key: "allowance", label: "بدلات إضافية", default: "0" },
            { key: "deduction", label: "خصم", default: "0" },
          ]}
          onClose={() => setModal(false)}
          onSave={addRow}
        />
      )}
    </div>
  );
}

function TrainingRecruitmentTab({ training, setTraining, recruitment, setRecruitment }) {
  const [modal, setModal] = useState(null); // null | "training" | "recruitment"

  const cycle = (setter, id) => {
    const order = ["open", "inProgress", "closed"];
    setter((prev) => prev.map((x) => (x.id === id ? { ...x, status: order[(order.indexOf(x.status) + 1) % order.length] } : x)));
  };

  const addTraining = (data) => {
    setTraining((prev) => [...prev, { ...data, trainees: Number(data.trainees) || 0, status: "open" }]);
    setModal(null);
  };
  const addRecruitment = (data) => {
    setRecruitment((prev) => [...prev, { ...data, count: Number(data.count) || 0, status: "open" }]);
    setModal(null);
  };

  return (
    <div className="flex flex-col gap-5">
      <SectionCard>
        <div className="flex items-center justify-between mb-3">
          <p className="font-bold text-sm" style={{ color: c.text }}>الدورات التدريبية</p>
          <button onClick={() => setModal("training")} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold" style={{ background: c.blue, color: c.bg }}>
            <Plus size={17} /> دورة جديدة
          </button>
        </div>
        <p className="text-[11px] mb-2" style={{ color: c.soft }}>اضغط على الحالة لتحديثها</p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr style={{ color: c.soft, borderBottom: `1px solid ${c.line}` }}>
                <th className="text-start py-2 font-medium">الدورة</th>
                <th className="text-start py-2 font-medium">التاريخ</th>
                <th className="text-start py-2 font-medium">عدد المتدربين</th>
                <th className="text-start py-2 font-medium">الحالة</th>
              </tr>
            </thead>
            <tbody>
              {training.map((t) => (
                <tr key={t.id} style={{ borderBottom: `1px solid ${c.line}` }}>
                  <td className="py-2.5 font-semibold" style={{ color: c.text }}>{t.course}</td>
                  <td className="py-2.5 font-mono" style={{ color: c.text }}>{t.date}</td>
                  <td className="py-2.5 font-mono" style={{ color: c.text }}>{t.trainees}</td>
                  <td className="py-2.5"><button onClick={() => cycle(setTraining, t.id)}><StatusTag status={t.status} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      <SectionCard>
        <div className="flex items-center justify-between mb-3">
          <p className="font-bold text-sm" style={{ color: c.text }}>الوظائف الشاغرة (التوظيف)</p>
          <button onClick={() => setModal("recruitment")} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold" style={{ background: c.blue, color: c.bg }}>
            <Plus size={17} /> وظيفة جديدة
          </button>
        </div>
        <p className="text-[11px] mb-2" style={{ color: c.soft }}>اضغط على الحالة لتحديثها</p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr style={{ color: c.soft, borderBottom: `1px solid ${c.line}` }}>
                <th className="text-start py-2 font-medium">الوظيفة</th>
                <th className="text-start py-2 font-medium">القسم</th>
                <th className="text-start py-2 font-medium">العدد المطلوب</th>
                <th className="text-start py-2 font-medium">الحالة</th>
              </tr>
            </thead>
            <tbody>
              {recruitment.map((r) => (
                <tr key={r.id} style={{ borderBottom: `1px solid ${c.line}` }}>
                  <td className="py-2.5 font-semibold" style={{ color: c.text }}>{r.position}</td>
                  <td className="py-2.5" style={{ color: c.soft }}>{r.department}</td>
                  <td className="py-2.5 font-mono" style={{ color: c.text }}>{r.count}</td>
                  <td className="py-2.5"><button onClick={() => cycle(setRecruitment, r.id)}><StatusTag status={r.status} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      {modal === "training" && (
        <FormModal
          title="دورة تدريبية جديدة"
          fields={[
            { key: "course", label: "اسم الدورة", required: true },
            { key: "date", label: "التاريخ", type: "date", required: true },
            { key: "trainees", label: "عدد المتدربين", required: true },
          ]}
          onClose={() => setModal(null)}
          onSave={addTraining}
        />
      )}
      {modal === "recruitment" && (
        <FormModal
          title="وظيفة شاغرة جديدة"
          fields={[
            { key: "position", label: "اسم الوظيفة", required: true },
            { key: "department", label: "القسم", required: true },
            { key: "count", label: "العدد المطلوب", required: true },
          ]}
          onClose={() => setModal(null)}
          onSave={addRecruitment}
        />
      )}
    </div>
  );
}

function HRSection({ employees, setEmployees, stations, payroll, setPayroll, training, setTraining, recruitment, setRecruitment }) {
  const [tab, setTab] = useState("org");
  const tabs = [
    ["org", "الهيكل الإداري"],
    ["entitlements", "الاستحقاقات"],
    ["training", "التدريب والتوظيف"],
  ];

  return (
    <div className="flex flex-col gap-4">
      <PageHeader title="الموارد البشرية" />
      <div className="flex gap-2 flex-wrap">
        {tabs.map(([k, l]) => (
          <button
            key={k} onClick={() => setTab(k)}
            className="px-3 py-1.5 rounded-lg text-xs font-bold"
            style={{ background: tab === k ? c.blue : c.card, color: tab === k ? c.bg : c.soft, border: `1px solid ${c.line}` }}
          >
            {l}
          </button>
        ))}
      </div>

      {tab === "org" && <OrgStructureTab employees={employees} setEmployees={setEmployees} stations={stations} />}
      {tab === "entitlements" && <EntitlementsTab payroll={payroll} setPayroll={setPayroll} />}
      {tab === "training" && <TrainingRecruitmentTab training={training} setTraining={setTraining} recruitment={recruitment} setRecruitment={setRecruitment} />}
    </div>
  );
}

/* ---------------------------------------------------------------
   Section: Safety & Occupational Health
----------------------------------------------------------------*/

function IncidentsTab({ incidents, setIncidents, stations }) {
  const [modal, setModal] = useState(false);
  const cycle = (id) => {
    const order = ["open", "inProgress", "closed"];
    setIncidents((prev) => prev.map((x) => (x.id === id ? { ...x, status: order[(order.indexOf(x.status) + 1) % order.length] } : x)));
  };
  const addIncident = (data) => {
    setIncidents((prev) => [...prev, { ...data, status: "open" }]);
    setModal(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <button onClick={() => setModal(true)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold" style={{ background: c.blue, color: c.bg }}>
          <Plus size={19} /> تسجيل حادث
        </button>
      </div>
      <SectionCard>
        <p className="text-[11px] mb-3" style={{ color: c.soft }}>اضغط على الحالة لتحديثها</p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr style={{ color: c.soft, borderBottom: `1px solid ${c.line}` }}>
                <th className="text-start py-2 font-medium">التاريخ</th>
                <th className="text-start py-2 font-medium">المحطة</th>
                <th className="text-start py-2 font-medium">الوصف</th>
                <th className="text-start py-2 font-medium">الخطورة</th>
                <th className="text-start py-2 font-medium">الحالة</th>
              </tr>
            </thead>
            <tbody>
              {incidents.map((i) => (
                <tr key={i.id} style={{ borderBottom: `1px solid ${c.line}` }}>
                  <td className="py-2.5 font-mono" style={{ color: c.text }}>{i.date}</td>
                  <td className="py-2.5" style={{ color: c.text }}>{i.station}</td>
                  <td className="py-2.5" style={{ color: c.text }}>{i.desc}</td>
                  <td className="py-2.5"><PriorityDot level={i.severity} /></td>
                  <td className="py-2.5"><button onClick={() => cycle(i.id)}><StatusTag status={i.status} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      {modal && (
        <FormModal
          title="تسجيل حادث عمل"
          fields={[
            { key: "date", label: "التاريخ", type: "date", required: true },
            { key: "station", label: "المحطة", type: "select", options: stations.map((s) => ({ value: s.name, label: s.name })) },
            { key: "desc", label: "وصف الحادث", required: true },
            { key: "severity", label: "الخطورة", type: "select", default: "med", options: [
              { value: "high", label: "عالية" }, { value: "med", label: "متوسطة" }, { value: "low", label: "منخفضة" },
            ] },
          ]}
          onClose={() => setModal(false)}
          onSave={addIncident}
        />
      )}
    </div>
  );
}

function PPETab({ items, setItems }) {
  const [modal, setModal] = useState(false);
  const addItem = (data) => {
    setItems((prev) => [...prev, { ...data, quantity: Number(data.quantity) || 0, minThreshold: Number(data.minThreshold) || 0 }]);
    setModal(false);
  };
  const adjust = (id, delta) => {
    setItems((prev) => prev.map((p) => (p.id === id ? { ...p, quantity: Math.max(0, p.quantity + delta) } : p)));
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <button onClick={() => setModal(true)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold" style={{ background: c.blue, color: c.bg }}>
          <Plus size={19} /> إضافة معدّة
        </button>
      </div>
      <SectionCard>
        <p className="text-[11px] mb-3" style={{ color: c.soft }}>باللون الأحمر: وصلت لحد الطلب الأدنى</p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr style={{ color: c.soft, borderBottom: `1px solid ${c.line}` }}>
                <th className="text-start py-2 font-medium">المعدّة</th>
                <th className="text-start py-2 font-medium">الكمية المتوفرة</th>
                <th className="text-start py-2 font-medium">حد الطلب الأدنى</th>
                <th className="text-start py-2 font-medium">تعديل</th>
              </tr>
            </thead>
            <tbody>
              {items.map((p) => {
                const low = p.quantity <= p.minThreshold;
                return (
                  <tr key={p.id} style={{ borderBottom: `1px solid ${c.line}` }}>
                    <td className="py-2.5 font-semibold" style={{ color: c.text }}>{p.name}</td>
                    <td className="py-2.5 font-mono font-bold" style={{ color: low ? c.red : c.text }}>{p.quantity} {p.unit}</td>
                    <td className="py-2.5 font-mono" style={{ color: c.soft }}>{p.minThreshold} {p.unit}</td>
                    <td className="py-2.5">
                      <div className="flex gap-1">
                        <button onClick={() => adjust(p.id, -1)} className="w-6 h-6 rounded flex items-center justify-center font-bold" style={{ background: c.cardAlt, color: c.text, border: `1px solid ${c.line}` }}>-</button>
                        <button onClick={() => adjust(p.id, 1)} className="w-6 h-6 rounded flex items-center justify-center font-bold" style={{ background: c.cardAlt, color: c.text, border: `1px solid ${c.line}` }}>+</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </SectionCard>

      {modal && (
        <FormModal
          title="إضافة معدّة حماية شخصية"
          fields={[
            { key: "name", label: "اسم المعدّة", required: true },
            { key: "quantity", label: "الكمية", required: true },
            { key: "unit", label: "الوحدة (قطعة/زوج)", default: "قطعة" },
            { key: "minThreshold", label: "حد الطلب الأدنى", default: "0" },
          ]}
          onClose={() => setModal(false)}
          onSave={addItem}
        />
      )}
    </div>
  );
}

function InspectionsTab({ inspections, setInspections, stations }) {
  const [modal, setModal] = useState(false);
  const cycleResult = (id) => {
    const order = ["pending", "pass", "fail"];
    setInspections((prev) => prev.map((x) => (x.id === id ? { ...x, result: order[(order.indexOf(x.result) + 1) % order.length] } : x)));
  };
  const addInspection = (data) => {
    setInspections((prev) => [...prev, { ...data, result: "pending" }]);
    setModal(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <button onClick={() => setModal(true)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold" style={{ background: c.blue, color: c.bg }}>
          <Plus size={19} /> فحص جديد
        </button>
      </div>
      <SectionCard>
        <p className="text-[11px] mb-3" style={{ color: c.soft }}>اضغط على النتيجة لتحديثها</p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr style={{ color: c.soft, borderBottom: `1px solid ${c.line}` }}>
                <th className="text-start py-2 font-medium">المحطة</th>
                <th className="text-start py-2 font-medium">التاريخ</th>
                <th className="text-start py-2 font-medium">المفتّش</th>
                <th className="text-start py-2 font-medium">النتيجة</th>
              </tr>
            </thead>
            <tbody>
              {inspections.map((i) => (
                <tr key={i.id} style={{ borderBottom: `1px solid ${c.line}` }}>
                  <td className="py-2.5 font-semibold" style={{ color: c.text }}>{i.station}</td>
                  <td className="py-2.5 font-mono" style={{ color: c.text }}>{i.date}</td>
                  <td className="py-2.5" style={{ color: c.text }}>{i.inspector}</td>
                  <td className="py-2.5"><button onClick={() => cycleResult(i.id)}><StatusTag status={i.result} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      {modal && (
        <FormModal
          title="فحص سلامة جديد"
          fields={[
            { key: "station", label: "المحطة", type: "select", options: stations.map((s) => ({ value: s.name, label: s.name })) },
            { key: "date", label: "التاريخ", type: "date", required: true },
            { key: "inspector", label: "اسم المفتّش", required: true },
          ]}
          onClose={() => setModal(false)}
          onSave={addInspection}
        />
      )}
    </div>
  );
}

function SafetySection({ incidents, setIncidents, ppe, setPpe, inspections, setInspections, stations }) {
  const [tab, setTab] = useState("incidents");
  const tabs = [
    ["incidents", "حوادث العمل"],
    ["ppe", "معدات الحماية"],
    ["inspections", "الفحص الدوري"],
  ];

  return (
    <div className="flex flex-col gap-4">
      <PageHeader title="السلامة والصحة المهنية" />
      <div className="flex gap-2 flex-wrap">
        {tabs.map(([k, l]) => (
          <button
            key={k} onClick={() => setTab(k)}
            className="px-3 py-1.5 rounded-lg text-xs font-bold"
            style={{ background: tab === k ? c.blue : c.card, color: tab === k ? c.bg : c.soft, border: `1px solid ${c.line}` }}
          >
            {l}
          </button>
        ))}
      </div>
      {tab === "incidents" && <IncidentsTab incidents={incidents} setIncidents={setIncidents} stations={stations} />}
      {tab === "ppe" && <PPETab items={ppe} setItems={setPpe} />}
      {tab === "inspections" && <InspectionsTab inspections={inspections} setInspections={setInspections} stations={stations} />}
    </div>
  );
}

function CitizenFinanceCard({ citizen }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      <div className="rounded-lg p-4" style={{ background: c.cardAlt, border: `1px solid ${c.line}` }}>
        <p className="font-bold text-xs mb-3" style={{ color: c.text }}>السجل المالي</p>
        <div className="flex flex-col gap-2">
          {citizen.record.map((r, i) => (
            <div key={i} className="flex items-center justify-between text-xs">
              <div>
                <p style={{ color: c.text }}>{r.desc}</p>
                <p className="font-mono" style={{ color: c.soft }}>{r.date}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold" style={{ color: c.text }}>{r.amount} ج.م</span>
                <StatusTag status={r.status} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg p-4" style={{ background: c.cardAlt, border: `1px solid ${c.line}` }}>
        <p className="font-bold text-xs mb-3" style={{ color: c.text }}>القراءات</p>
        <div className="flex flex-col gap-2">
          {citizen.readings.map((r, i) => (
            <div key={i} className="flex items-center justify-between text-xs">
              <span className="font-mono" style={{ color: c.soft }}>{r.date}</span>
              <span className="font-mono font-bold" style={{ color: c.text }}>{r.value.toLocaleString()} م³</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg p-4" style={{ background: c.cardAlt, border: `1px solid ${c.line}` }}>
        <p className="font-bold text-xs mb-3" style={{ color: c.text }}>الرسوم</p>
        <div className="flex flex-col gap-2">
          {citizen.fees.length === 0 ? (
            <p className="text-xs" style={{ color: c.soft }}>لا توجد رسوم مسجّلة</p>
          ) : citizen.fees.map((f, i) => (
            <div key={i} className="flex items-center justify-between text-xs">
              <span style={{ color: c.text }}>{f.label}</span>
              <span className="font-mono font-bold" style={{ color: c.amber }}>{f.amount} ج.م</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg p-4" style={{ background: c.cardAlt, border: `1px solid ${c.line}` }}>
        <p className="font-bold text-xs mb-3" style={{ color: c.text }}>الاستهلاك (آخر 6 أشهر)</p>
        <ResponsiveContainer width="100%" height={110}>
          <BarChart data={citizen.consumption}>
            <XAxis dataKey="m" tick={{ fontSize: 9, fill: c.soft }} axisLine={false} tickLine={false} />
            <YAxis hide />
            <Bar dataKey="v" fill={c.blue} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function CitizenFinanceLookup() {
  const [q, setQ] = useState("");
  const [selectedId, setSelectedId] = useState(citizensFinance[0].id);
  const filtered = citizensFinance.filter((cz) => cz.name.includes(q) || cz.account.includes(q));
  const selected = citizensFinance.find((cz) => cz.id === selectedId);

  return (
    <SectionCard>
      <p className="font-bold text-sm mb-3" style={{ color: c.text }}>ملف المواطن المالي</p>
      <div className="relative max-w-xs mb-3">
        <Search size={18} className="absolute top-1/2 -translate-y-1/2 right-3" color={c.soft} />
        <input
          value={q} onChange={(e) => setQ(e.target.value)} placeholder="بحث بالاسم أو رقم الحساب..."
          className="w-full pr-10 pl-3 py-2 rounded-lg text-xs" style={inputStyle}
        />
      </div>
      <div className="flex gap-2 flex-wrap mb-2">
        {filtered.map((cz) => (
          <button
            key={cz.id} onClick={() => setSelectedId(cz.id)}
            className="px-3 py-1.5 rounded-lg text-xs font-bold"
            style={{ background: selectedId === cz.id ? c.blue : c.cardAlt, color: selectedId === cz.id ? c.bg : c.soft, border: `1px solid ${c.line}` }}
          >
            {cz.name} · {cz.account}
          </button>
        ))}
      </div>
      {selected && <CitizenFinanceCard citizen={selected} />}
    </SectionCard>
  );
}

function CollectionTab({ entries, setEntries }) {
  const [modal, setModal] = useState(false);
  const total = entries.reduce((s, e) => s + e.amount, 0);
  const thisMonth = revenueByMonth[revenueByMonth.length - 1].v;
  const avgMonthly = Math.round(revenueByMonth.reduce((s, m) => s + m.v, 0) / revenueByMonth.length);

  const addEntry = (data) => {
    setEntries((prev) => [...prev, { ...data, amount: Number(data.amount) || 0 }]);
    setModal(false);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-end">
        <button onClick={() => setModal(true)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold" style={{ background: c.blue, color: c.bg }}>
          <Plus size={19} /> إضافة إيراد
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <KpiCard label="إجمالي إيرادات الشهر" value={thisMonth.toLocaleString()} sub="ج.م" color={c.green} icon={Wallet} />
        <KpiCard label="إجمالي السجلات المسجّلة" value={total.toLocaleString()} sub="ج.م" color={c.blue} icon={Wallet} />
        <KpiCard label="متوسط شهري (6 أشهر)" value={avgMonthly.toLocaleString()} sub="ج.م" color={c.amber} icon={Wallet} />
      </div>

      <SectionCard>
        <p className="font-bold text-sm mb-3" style={{ color: c.text }}>الإيرادات الشهرية</p>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={revenueByMonth}>
            <CartesianGrid stroke={c.line} vertical={false} />
            <XAxis dataKey="m" tick={{ fontSize: 11, fill: c.soft }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: c.soft }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: c.cardAlt, border: `1px solid ${c.line}`, fontSize: 11 }} />
            <Bar dataKey="v" fill={c.green} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </SectionCard>

      <SectionCard>
        <p className="font-bold text-sm mb-3" style={{ color: c.text }}>سجل الإيرادات</p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr style={{ color: c.soft, borderBottom: `1px solid ${c.line}` }}>
                <th className="text-start py-2 font-medium">التاريخ</th>
                <th className="text-start py-2 font-medium">المصدر</th>
                <th className="text-start py-2 font-medium">المبلغ</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((e) => (
                <tr key={e.id} style={{ borderBottom: `1px solid ${c.line}` }}>
                  <td className="py-2.5 font-mono" style={{ color: c.text }}>{e.date}</td>
                  <td className="py-2.5" style={{ color: c.text }}>{e.source}</td>
                  <td className="py-2.5 font-mono font-bold" style={{ color: c.green }}>{e.amount.toLocaleString()} ج.م</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      <CitizenFinanceLookup />

      {modal && (
        <FormModal
          title="إضافة إيراد"
          fields={[
            { key: "date", label: "التاريخ", type: "date", required: true },
            { key: "source", label: "المصدر (مثال: فواتير مياه - المفتي)", required: true },
            { key: "amount", label: "المبلغ (ج.م)", required: true },
          ]}
          onClose={() => setModal(false)}
          onSave={addEntry}
        />
      )}
    </div>
  );
}

function ReadingsTab({ readings, setReadings }) {
  const [modal, setModal] = useState(false);
  const addReading = (data) => {
    setReadings((prev) => [...prev, { ...data, previous: Number(data.previous) || 0, current: Number(data.current) || 0 }]);
    setModal(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <button onClick={() => setModal(true)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold" style={{ background: c.blue, color: c.bg }}>
          <Plus size={19} /> إضافة قراءة
        </button>
      </div>
      <SectionCard>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr style={{ color: c.soft, borderBottom: `1px solid ${c.line}` }}>
                <th className="text-start py-2 font-medium">المواطن</th>
                <th className="text-start py-2 font-medium">رقم الحساب</th>
                <th className="text-start py-2 font-medium">التاريخ</th>
                <th className="text-start py-2 font-medium">القراءة السابقة</th>
                <th className="text-start py-2 font-medium">القراءة الحالية</th>
                <th className="text-start py-2 font-medium">الاستهلاك</th>
              </tr>
            </thead>
            <tbody>
              {readings.map((r) => (
                <tr key={r.id} style={{ borderBottom: `1px solid ${c.line}` }}>
                  <td className="py-2.5 font-semibold" style={{ color: c.text }}>{r.customer}</td>
                  <td className="py-2.5 font-mono" style={{ color: c.soft }}>{r.account}</td>
                  <td className="py-2.5 font-mono" style={{ color: c.text }}>{r.date}</td>
                  <td className="py-2.5 font-mono" style={{ color: c.text }}>{r.previous.toLocaleString()}</td>
                  <td className="py-2.5 font-mono" style={{ color: c.text }}>{r.current.toLocaleString()}</td>
                  <td className="py-2.5 font-mono font-bold" style={{ color: c.blue }}>{(r.current - r.previous).toLocaleString()} م³</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      {modal && (
        <FormModal
          title="إضافة قراءة"
          fields={[
            { key: "customer", label: "اسم المواطن", required: true },
            { key: "account", label: "رقم الحساب", required: true },
            { key: "date", label: "التاريخ", type: "date", required: true },
            { key: "previous", label: "القراءة السابقة", required: true },
            { key: "current", label: "القراءة الحالية", required: true },
          ]}
          onClose={() => setModal(false)}
          onSave={addReading}
        />
      )}
    </div>
  );
}

function BillingComplaintsTab({ complaints, setComplaints }) {
  const [modal, setModal] = useState(false);
  const cycleStatus = (id) => {
    const order = ["open", "inProgress", "closed"];
    setComplaints((prev) => prev.map((cm) => (cm.id === id ? { ...cm, status: order[(order.indexOf(cm.status) + 1) % order.length] } : cm)));
  };
  const addComplaint = (data) => {
    setComplaints((prev) => [...prev, { ...data, status: "open" }]);
    setModal(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <button onClick={() => setModal(true)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold" style={{ background: c.blue, color: c.bg }}>
          <Plus size={19} /> تسجيل شكوى
        </button>
      </div>
      <SectionCard>
        <p className="text-[11px] mb-3" style={{ color: c.soft }}>اضغط على الحالة لتحديثها للمرحلة التالية</p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr style={{ color: c.soft, borderBottom: `1px solid ${c.line}` }}>
                <th className="text-start py-2 font-medium">المواطن</th>
                <th className="text-start py-2 font-medium">النوع</th>
                <th className="text-start py-2 font-medium">الحالة</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((cm) => (
                <tr key={cm.id} style={{ borderBottom: `1px solid ${c.line}` }}>
                  <td className="py-2.5 font-semibold" style={{ color: c.text }}>{cm.customer}</td>
                  <td className="py-2.5" style={{ color: c.text }}>{cm.type}</td>
                  <td className="py-2.5"><button onClick={() => cycleStatus(cm.id)}><StatusTag status={cm.status} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      {modal && (
        <FormModal
          title="تسجيل شكوى متعلقة بالفواتير"
          fields={[
            { key: "customer", label: "اسم المواطن", required: true },
            { key: "type", label: "نوع الشكوى (مثال: خطأ في الفاتورة)", required: true },
          ]}
          onClose={() => setModal(false)}
          onSave={addComplaint}
        />
      )}
    </div>
  );
}

function ConnectionEstimatesTab({ estimates, setEstimates }) {
  const [modal, setModal] = useState(false);
  const cycleStatus = (id) => {
    const order = ["open", "inProgress", "closed"];
    setEstimates((prev) => prev.map((e) => (e.id === id ? { ...e, status: order[(order.indexOf(e.status) + 1) % order.length] } : e)));
  };
  const addEstimate = (data) => {
    setEstimates((prev) => [...prev, { ...data, cost: Number(data.cost) || 0, status: "open" }]);
    setModal(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <button onClick={() => setModal(true)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold" style={{ background: c.blue, color: c.bg }}>
          <Plus size={19} /> مقايسة جديدة
        </button>
      </div>
      <SectionCard>
        <p className="text-[11px] mb-3" style={{ color: c.soft }}>اضغط على الحالة لتحديثها للمرحلة التالية</p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr style={{ color: c.soft, borderBottom: `1px solid ${c.line}` }}>
                <th className="text-start py-2 font-medium">مقدّم الطلب</th>
                <th className="text-start py-2 font-medium">العنوان</th>
                <th className="text-start py-2 font-medium">النوع</th>
                <th className="text-start py-2 font-medium">المسافة</th>
                <th className="text-start py-2 font-medium">التكلفة المقدّرة</th>
                <th className="text-start py-2 font-medium">الحالة</th>
              </tr>
            </thead>
            <tbody>
              {estimates.map((e) => (
                <tr key={e.id} style={{ borderBottom: `1px solid ${c.line}` }}>
                  <td className="py-2.5 font-semibold" style={{ color: c.text }}>{e.applicant}</td>
                  <td className="py-2.5" style={{ color: c.text }}>{e.address}</td>
                  <td className="py-2.5" style={{ color: c.soft }}>{e.type}</td>
                  <td className="py-2.5 font-mono" style={{ color: c.text }}>{e.distance}</td>
                  <td className="py-2.5 font-mono font-bold" style={{ color: c.amber }}>{e.cost.toLocaleString()} ج.م</td>
                  <td className="py-2.5"><button onClick={() => cycleStatus(e.id)}><StatusTag status={e.status} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      {modal && (
        <FormModal
          title="مقايسة توصيل جديدة"
          fields={[
            { key: "applicant", label: "اسم مقدّم الطلب", required: true },
            { key: "address", label: "العنوان", required: true },
            { key: "type", label: "نوع التوصيل", type: "select", default: "مياه", options: [{ value: "مياه", label: "مياه" }, { value: "صرف صحي", label: "صرف صحي" }] },
            { key: "distance", label: "المسافة (مثال: 45 م)" },
            { key: "cost", label: "التكلفة المقدّرة (ج.م)", required: true },
          ]}
          onClose={() => setModal(false)}
          onSave={addEstimate}
        />
      )}
    </div>
  );
}

function RevenueSection({ entries, setEntries, readings, setReadings, billingComplaints, setBillingComplaints, estimates, setEstimates }) {
  const [tab, setTab] = useState("collection");
  const tabs = [
    ["collection", "تحصيل"],
    ["readings", "قراءات"],
    ["complaints", "شكوى"],
    ["connections", "مقايسات توصيل"],
  ];

  return (
    <div className="flex flex-col gap-4">
      <PageHeader title="الإيرادات" />
      <div className="flex gap-2 flex-wrap">
        {tabs.map(([k, l]) => (
          <button
            key={k} onClick={() => setTab(k)}
            className="px-3 py-1.5 rounded-lg text-xs font-bold"
            style={{ background: tab === k ? c.blue : c.card, color: tab === k ? c.bg : c.soft, border: `1px solid ${c.line}` }}
          >
            {l}
          </button>
        ))}
      </div>

      {tab === "collection" && <CollectionTab entries={entries} setEntries={setEntries} />}
      {tab === "readings" && <ReadingsTab readings={readings} setReadings={setReadings} />}
      {tab === "complaints" && <BillingComplaintsTab complaints={billingComplaints} setComplaints={setBillingComplaints} />}
      {tab === "connections" && <ConnectionEstimatesTab estimates={estimates} setEstimates={setEstimates} />}
    </div>
  );
}

/* ---------------------------------------------------------------
   Section: Customer service & complaints
----------------------------------------------------------------*/

function ComplaintsSection({ complaints, setComplaints }) {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? complaints : complaints.filter((x) => x.status === filter);

  const cycleStatus = (id) => {
    const order = ["open", "inProgress", "closed"];
    setComplaints((prev) =>
      prev.map((cm) => (cm.id === id ? { ...cm, status: order[(order.indexOf(cm.status) + 1) % order.length] } : cm))
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <PageHeader title="خدمة العملاء والشكاوى" />
      <div className="flex gap-2">
        {[["all", "الكل"], ["open", "مفتوحة"], ["inProgress", "جاري العمل"], ["closed", "مغلقة"]].map(([k, l]) => (
          <button key={k} onClick={() => setFilter(k)} className="px-3 py-1.5 rounded-lg text-xs font-bold"
            style={{ background: filter === k ? c.blue : c.card, color: filter === k ? c.bg : c.soft, border: `1px solid ${c.line}` }}>
            {l}
          </button>
        ))}
      </div>
      <SectionCard>
        <p className="text-[11px] mb-3" style={{ color: c.soft }}>اضغط على حالة أي شكوى لتحديثها للمرحلة التالية</p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr style={{ color: c.soft, borderBottom: `1px solid ${c.line}` }}>
                <th className="text-start py-2 font-medium">المواطن</th>
                <th className="text-start py-2 font-medium">النوع</th>
                <th className="text-start py-2 font-medium">الأولوية</th>
                <th className="text-start py-2 font-medium">الحالة</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((cm) => (
                <tr key={cm.id} style={{ borderBottom: `1px solid ${c.line}` }}>
                  <td className="py-2.5 font-semibold" style={{ color: c.text }}>{cm.customer}</td>
                  <td className="py-2.5" style={{ color: c.text }}>{cm.type}</td>
                  <td className="py-2.5"><PriorityDot level={cm.priority} /></td>
                  <td className="py-2.5">
                    <button onClick={() => cycleStatus(cm.id)}><StatusTag status={cm.status} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}

/* ---------------------------------------------------------------
   Section: AI Assistant
----------------------------------------------------------------*/

function AIAssistantSection({ dataSummary, complaints, setComplaints }) {
  const [mode, setMode] = useState("staff"); // "staff" | "citizen"
  const [messages, setMessages] = useState([
    { from: "ai", text: "أهلًا بك! أنا المساعد الذكي لمنظومة حياة، وأرد كذلك على استفسارات الخط الساخن 125. اختر هل تتحدث كموظف/مسؤول أم كمواطن، واسألني أي سؤال — وكمواطن يمكنني تسجيل شكواك مباشرة.", seed: true },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const staffPrompts = ["اعمل تحليل شامل لوضع التشغيل والإيرادات", "ما أكثر الأقسام التي تحتاج متابعة عاجلة؟", "حالة المخازن والصيانة دلوقتي؟"];
  const citizenPrompts = ["عندي تسرب مياه في شارعي سجله شكوى", "في انقطاع مياه في منطقتي من الصبح", "عايز أسجل شكوى ضعف ضغط في المنطقة"];

  const complaintTool = {
    name: "log_complaint",
    description: "تسجيل شكوى جديدة من مواطن في نظام خدمة العملاء والشكاوى الفعلي بالشركة. استخدم هذه الأداة فورًا عندما يطلب المواطن تسجيل شكوى أو يصف مشكلة تحتاج تسجيل رسمي (تسرب، انقطاع مياه، ضعف ضغط، مشكلة صرف صحي).",
    input_schema: {
      type: "object",
      properties: {
        type: { type: "string", enum: ["leakage", "noWater", "lowPressure", "sewage"], description: "نوع الشكوى" },
        customer: { type: "string", description: "اسم المواطن إن ذكره، وإلا اكتب 'متصل الخط الساخن'" },
        location: { type: "string", description: "الموقع أو المنطقة أو الحي المذكور" },
        priority: { type: "string", enum: ["high", "med", "low"], description: "تقييمك لمدى إلحاحية الشكوى" },
      },
      required: ["type", "customer", "priority"],
    },
  };

  const typeLabels = { leakage: "تسرب مياه", noWater: "انقطاع مياه", lowPressure: "ضعف ضغط", sewage: "مشكلة صرف صحي" };

  const executeTool = (toolUse) => {
    if (toolUse.name !== "log_complaint") return null;
    const input = toolUse.input || {};
    const newComplaint = {
      id: `C-${Math.floor(400 + Math.random() * 599)}`,
      customer: input.customer || "متصل الخط الساخن",
      type: input.type || "leakage",
      priority: input.priority || "med",
      status: "open",
    };
    setComplaints((prev) => [...prev, newComplaint]);
    return `✅ تم تسجيل شكواك رسميًا برقم ${newComplaint.id} (${typeLabels[newComplaint.type] || newComplaint.type})${input.location ? ` في ${input.location}` : ""}، وستتم متابعتها من فريق خدمة العملاء قريبًا.`;
  };

  const systemPrompt = `أنت المساعد الذكي لمنظومة "حياة" التابعة لشركة مياه الشرب والصرف الصحي بمحافظة كفر الشيخ، وتمثل أيضًا خط الرد على المكالمات عبر الخط الساخن رقم 125.

تتعامل مع نوعين من المستخدمين:
1) موظفو وإدارة الشركة: تقدّم لهم تحليلًا تشغيليًا وإداريًا شاملاً يغطي المحطات والتشغيل، الصيانة والمخازن، السلامة والصحة المهنية، الموارد البشرية، الإيرادات والتحصيل، وخدمة العملاء — بالاعتماد على البيانات الفعلية أدناه.
2) المواطنون المتصلون بالخط الساخن 125: ترد عليهم بأسلوب ودود ومهني، ولو وصف المواطن مشكلة تستدعي شكوى رسمية (تسرب، انقطاع مياه، ضعف ضغط، مشكلة صرف صحي) أو طلب صريحًا تسجيل شكوى، استخدم أداة log_complaint فورًا لتسجيلها فعليًا في نظام خدمة العملاء بدل الاقتصار على الرد النصي.

الوضع الحالي للمحادثة: ${mode === "staff" ? "موظف/مسؤول يسأل عن التحليل التشغيلي الداخلي" : "مواطن يتصل عبر الخط الساخن 125"}.

${dataSummary}
شكاوى خدمة العملاء المسجلة حاليًا: ${complaints.length} (مفتوحة: ${complaints.filter((x) => x.status !== "closed").length}).

رد دائمًا بالعربية، بإيجاز وبأسلوب مؤسسي واضح، واستشهد بأرقام محددة من البيانات أعلاه عند الحاجة. لا تخترع بيانات غير موجودة أعلاه.`;

  const send = async (text) => {
    const userText = (text ?? input).trim();
    if (!userText || loading) return;
    const newMessages = [...messages, { from: "user", text: userText }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    setError("");
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          system: systemPrompt,
          tools: [complaintTool],
          messages: newMessages.filter((m) => !m.seed).map((m) => ({ role: m.from === "user" ? "user" : "assistant", content: m.text })),
        }),
      });
      const data = await response.json();
      if (data.error) {
        setError(`خطأ من الخادم: ${data.error.message || data.error.type || JSON.stringify(data.error)}`);
        setLoading(false);
        return;
      }
      const blocks = data.content || [];
      let replyText = blocks.filter((b) => b.type === "text" && b.text).map((b) => b.text).join("\n");
      const toolBlocks = blocks.filter((b) => b.type === "tool_use");
      for (const tb of toolBlocks) {
        const confirmation = executeTool(tb);
        if (confirmation) replyText = replyText ? `${replyText}\n\n${confirmation}` : confirmation;
      }
      if (!replyText) replyText = "تعذّر الحصول على رد، حاول مرة أخرى.";
      setMessages((m) => [...m, { from: "ai", text: replyText }]);
    } catch (err) {
      setError(`تعذّر الاتصال بالمساعد الذكي: ${err?.message || "خطأ غير معروف"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      <PageHeader title="المساعد الذكي · الخط الساخن 125" />

      <div className="flex gap-2">
        <button
          onClick={() => setMode("staff")}
          className="px-3 py-1.5 rounded-lg text-xs font-bold"
          style={{ background: mode === "staff" ? c.blue : c.card, color: mode === "staff" ? c.bg : c.soft, border: `1px solid ${c.line}` }}
        >
          موظف / تحليل تشغيلي
        </button>
        <button
          onClick={() => setMode("citizen")}
          className="px-3 py-1.5 rounded-lg text-xs font-bold"
          style={{ background: mode === "citizen" ? c.blue : c.card, color: mode === "citizen" ? c.bg : c.soft, border: `1px solid ${c.line}` }}
        >
          مواطن / الخط الساخن 125
        </button>
      </div>
      {mode === "citizen" && (
        <p className="text-[11px]" style={{ color: c.soft }}>
          أي شكوى يسجلها المساعد هنا تظهر فعليًا في قسم "خدمة العملاء والشكاوى".
        </p>
      )}

      <SectionCard className="flex flex-col gap-3 flex-1 min-h-[420px]">
        <div className="flex-1 flex flex-col gap-3 overflow-y-auto">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`max-w-[85%] px-3 py-2 rounded-xl text-sm whitespace-pre-wrap ${m.from === "user" ? "self-end" : "self-start"}`}
              style={{ background: m.from === "user" ? c.blue : c.cardAlt, color: m.from === "user" ? c.bg : c.text }}
            >
              {m.text}
            </div>
          ))}
          {loading && (
            <div className="self-start flex items-center gap-2 px-3 py-2 rounded-xl text-sm" style={{ background: c.cardAlt, color: c.soft }}>
              <Loader2 size={15} className="animate-spin" /> جاري التحليل...
            </div>
          )}
        </div>

        {error && <ErrorBoxAI message={error} />}

        <div className="flex gap-2 flex-wrap">
          {(mode === "staff" ? staffPrompts : citizenPrompts).map((p, i) => (
            <button
              key={i} onClick={() => send(p)}
              className="px-2.5 py-1 rounded-full text-[11px] font-semibold"
              style={{ background: c.cardAlt, color: c.blue, border: `1px solid ${c.line}` }}
            >
              {p}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder={mode === "staff" ? "اسأل عن أداء أي قسم..." : "اكتب استفسارك..."}
            className="flex-1 px-3 py-2 rounded-lg text-sm" style={inputStyle}
          />
          <button type="button" onClick={() => send()} disabled={loading} className="px-4 py-2 rounded-lg flex items-center gap-1.5 text-xs font-bold" style={{ background: c.blue, color: c.bg, opacity: loading ? 0.6 : 1 }}>
            <Send size={19} /> إرسال
          </button>
        </div>
      </SectionCard>
    </div>
  );
}

function ErrorBoxAI({ message }) {
  return (
    <div className="flex items-center gap-2 text-xs" style={{ color: c.red }}>
      <AlertTriangle size={14} /> {message}
    </div>
  );
}

/* ---------------------------------------------------------------
   Section: Reports
----------------------------------------------------------------*/

function ReportsSection() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader title="التقارير والإحصائيات" action={<button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold" style={{ background: c.blue, color: c.bg }}><BarChart2 size={19} /> تصدير تقرير</button>} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SectionCard>
          <p className="font-bold text-sm mb-3" style={{ color: c.text }}>إنتاج المياه (آخر 24 ساعة)</p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={productionData}>
              <CartesianGrid stroke={c.line} vertical={false} />
              <XAxis dataKey="h" tick={{ fontSize: 10, fill: c.soft }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: c.soft }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: c.cardAlt, border: `1px solid ${c.line}`, fontSize: 11 }} />
              <Line type="monotone" dataKey="actual" stroke={c.blue} strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </SectionCard>
        <SectionCard>
          <p className="font-bold text-sm mb-3" style={{ color: c.text }}>توزيع الشكاوى</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={complaintsBreakdown}>
              <CartesianGrid stroke={c.line} vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: c.soft }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: c.soft }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: c.cardAlt, border: `1px solid ${c.line}`, fontSize: 11 }} />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {complaintsBreakdown.map((d, i) => <Cell key={i} fill={d.color} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </SectionCard>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   Section: Alerts (full)
----------------------------------------------------------------*/

function AlertsSection({ alerts, setAlerts }) {
  const ack = (id) => setAlerts((ls) => ls.map((a) => (a.id === id ? { ...a, ack: true } : a)));
  return (
    <div className="flex flex-col gap-4">
      <PageHeader title="الإنذارات" />
      <div className="flex flex-col gap-3">
        {alerts.map((a) => (
          <SectionCard key={a.id} className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-start gap-3">
              <AlertTriangle size={21} color={a.level === "high" ? c.red : a.level === "med" ? c.amber : c.green} className="mt-0.5" />
              <div>
                <p className="text-sm" style={{ color: c.text }}>{a.text}</p>
                <p className="text-[11px]" style={{ color: c.soft }}>{a.station} · {a.time}</p>
              </div>
            </div>
            {a.ack ? (
              <span className="flex items-center gap-1 text-xs font-bold" style={{ color: c.green }}><Check size={17} /> تم الاطلاع</span>
            ) : (
              <button onClick={() => ack(a.id)} className="px-3 py-1.5 rounded-lg text-xs font-bold" style={{ background: c.blue, color: c.bg }}>تأكيد الاطلاع</button>
            )}
          </SectionCard>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   Section: User management
----------------------------------------------------------------*/

function UsersSection({ users, setUsers }) {
  const [q, setQ] = useState("");
  const [modal, setModal] = useState(false);
  const filtered = users.filter((u) => u.name.includes(q) || u.email.includes(q));

  const addUser = (data) => {
    setUsers((prev) => [...prev, data]);
    setModal(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="إدارة المستخدمين"
        action={
          <button onClick={() => setModal(true)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold" style={{ background: c.blue, color: c.bg }}>
            <UserPlus size={19} /> إضافة مستخدم
          </button>
        }
      />
      <div className="relative max-w-xs">
        <Search size={19} className="absolute top-1/2 -translate-y-1/2 right-3" color={c.soft} />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="بحث بالاسم أو البريد..." className="w-full pr-9 pl-3 py-2 rounded-lg text-xs" style={inputStyle} />
      </div>
      <SectionCard>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr style={{ color: c.soft, borderBottom: `1px solid ${c.line}` }}>
                <th className="text-start py-2 font-medium">الاسم</th>
                <th className="text-start py-2 font-medium">البريد الإلكتروني</th>
                <th className="text-start py-2 font-medium">الدور</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u, i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${c.line}` }}>
                  <td className="py-2.5 font-semibold" style={{ color: c.text }}>{u.name}</td>
                  <td className="py-2.5 flex items-center gap-1.5" style={{ color: c.soft }}><Mail size={16} /> {u.email}</td>
                  <td className="py-2.5"><RoleBadge role={u.role} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      {modal && (
        <FormModal
          title="إضافة مستخدم"
          fields={[
            { key: "name", label: "الاسم", required: true },
            { key: "email", label: "البريد الإلكتروني", type: "email", required: true },
            { key: "role", label: "الدور", type: "select", default: "EMPLOYEE", options: [
              { value: "ADMIN", label: "مسؤول" }, { value: "EMPLOYEE", label: "موظف" }, { value: "CITIZEN", label: "مواطن" },
            ] },
          ]}
          onClose={() => setModal(false)}
          onSave={addUser}
        />
      )}
    </div>
  );
}

/* ---------------------------------------------------------------
   Section: Settings
----------------------------------------------------------------*/

function SettingsSection({ settings, setSettings }) {
  const [form, setForm] = useState(settings);
  const [saved, setSaved] = useState(false);

  const save = () => {
    setSettings(form);
    setSaved(true);
  };

  return (
    <div className="flex flex-col gap-4 max-w-lg">
      <PageHeader title="الإعدادات" />
      <div>
        <SectionCard className="flex flex-col gap-3">
          <label className="text-xs font-semibold" style={{ color: c.soft }}>اسم الجهة</label>
          <input value={form.orgName} onChange={(e) => { setForm({ ...form, orgName: e.target.value }); setSaved(false); }} className="px-3 py-2 rounded-lg text-sm" style={inputStyle} />
          <label className="text-xs font-semibold mt-2" style={{ color: c.soft }}>اللغة الافتراضية</label>
          <select value={form.lang} onChange={(e) => { setForm({ ...form, lang: e.target.value }); setSaved(false); }} className="px-3 py-2 rounded-lg text-sm" style={inputStyle}>
            <option>العربية</option>
            <option>English</option>
          </select>
          <label className="flex items-center gap-2 text-sm mt-2" style={{ color: c.text }}>
            <input type="checkbox" checked={form.alertsEnabled} onChange={(e) => { setForm({ ...form, alertsEnabled: e.target.checked }); setSaved(false); }} />
            تفعيل إشعارات الإنذارات العاجلة
          </label>
          <button type="button" onClick={save} className="self-start flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold mt-2" style={{ background: c.blue, color: c.bg }}>
            <Save size={19} /> حفظ التغييرات
          </button>
          {saved && <p className="text-xs" style={{ color: c.green }}>تم الحفظ بنجاح ✓</p>}
        </SectionCard>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   Sidebar config + main app
----------------------------------------------------------------*/

const SIDEBAR_ITEMS = [
  { key: "home", icon: Home, label: "الرئيسية" },
  { key: "ops", icon: Droplets, label: "تشغيل المحطات" },
  { key: "maintenance", icon: Wrench, label: "الصيانة" },
  { key: "gis", icon: MapPin, label: "GIS والشبكات" },
  { key: "hr", icon: Users, label: "الموارد البشرية" },
  { key: "revenue", icon: Wallet, label: "الإيرادات" },
  { key: "safety", icon: ShieldAlert, label: "السلامة والصحة المهنية" },
  { key: "complaints", icon: Headphones, label: "خدمة العملاء والشكاوى" },
  { key: "ai", icon: Sparkles, label: "المساعد الذكي" },
  { key: "reports", icon: BarChart2, label: "التقارير والإحصائيات" },
  { key: "alerts", icon: Bell, label: "الإنذارات", badge: 12 },
  { key: "users", icon: Shield, label: "إدارة المستخدمين" },
  { key: "settings", icon: Settings, label: "الإعدادات" },
];

const SECTION_TITLES = {
  home: "غرفة العمليات الذكية", ops: "تشغيل المحطات", maintenance: "أوامر الصيانة",
  gis: "GIS والشبكات", hr: "الموارد البشرية", revenue: "الإيرادات", safety: "السلامة والصحة المهنية", complaints: "خدمة العملاء والشكاوى",
  ai: "المساعد الذكي", reports: "التقارير والإحصائيات", alerts: "الإنذارات",
  users: "إدارة المستخدمين", settings: "الإعدادات",
};

function OperationsRoomInner() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [section, setSection] = useState("home");
  const [saveStatus, setSaveStatus] = useState(null); // null | "saving" | "saved" | { error }
  const reportStatus = (status, err) => {
    setSaveStatus(status === "error" ? { error: err } : status);
    if (status === "saved") setTimeout(() => setSaveStatus((s) => (s === "saved" ? null : s)), 2000);
  };
  const [stations, setStations] = usePersistedState("hayah-stations", initialStations, reportStatus);
  const [orders, setOrders] = usePersistedState("hayah-maintenance", maintenanceSeed, reportStatus);
  const [parts, setParts] = usePersistedState("hayah-warehouse", warehouseSeed, reportStatus);
  const [incidents, setIncidents] = usePersistedState("hayah-incidents", incidentsSeed, reportStatus);
  const [ppe, setPpe] = usePersistedState("hayah-ppe", ppeSeed, reportStatus);
  const [inspections, setInspections] = usePersistedState("hayah-inspections", inspectionsSeed, reportStatus);
  const [staff, setStaff] = usePersistedState("hayah-employees", employeesSeed, reportStatus);
  const [payroll, setPayroll] = usePersistedState("hayah-payroll", payrollSeed, reportStatus);
  const [training, setTraining] = usePersistedState("hayah-training", trainingSeed, reportStatus);
  const [recruitment, setRecruitment] = usePersistedState("hayah-recruitment", recruitmentSeed, reportStatus);
  const [complaints, setComplaints] = usePersistedState("hayah-complaints", complaintsSeed, reportStatus);
  const [alerts, setAlerts] = usePersistedState("hayah-alerts", alertsSeed, reportStatus);
  const [users, setUsers] = usePersistedState("hayah-users", usersSeed, reportStatus);
  const [settings, setSettings] = usePersistedState("hayah-settings", settingsSeed, reportStatus);
  const [revenue, setRevenue] = usePersistedState("hayah-revenue", revenueSeed, reportStatus);
  const [readings, setReadings] = usePersistedState("hayah-readings", readingsLogSeed, reportStatus);
  const [billingComplaints, setBillingComplaints] = usePersistedState("hayah-billing-complaints", billingComplaintsSeed, reportStatus);
  const [estimates, setEstimates] = usePersistedState("hayah-connections", connectionEstimatesSeed, reportStatus);

  const buildDataSummary = () => {
    const onlineStations = stations.filter((s) => s.status === "online").length;
    const offlineStations = stations.filter((s) => s.status === "offline").length;
    const totalFlow = stations.reduce((sum, s) => sum + (s.flow || 0), 0);
    const openOrders = orders.filter((o) => o.status !== "closed").length;
    const lowStockParts = parts.filter((p) => p.quantity <= p.minThreshold).map((p) => p.name);
    const lowStockPpe = ppe.filter((p) => p.quantity <= p.minThreshold).map((p) => p.name);
    const openIncidents = incidents.filter((i) => i.status !== "closed").length;
    const failedInspections = inspections.filter((i) => i.result === "fail").length;
    const totalSalaryBudget = payroll.reduce((s, p) => s + p.salary + p.incentives + p.disbursement + p.allowance - p.deduction, 0);
    const openHiring = recruitment.filter((r) => r.status !== "closed").reduce((s, r) => s + r.count, 0);
    const thisMonthRevenue = revenueByMonth[revenueByMonth.length - 1]?.v || 0;
    const avgMonthlyRevenue = Math.round(revenueByMonth.reduce((s, m) => s + m.v, 0) / revenueByMonth.length);
    const openBillingComplaints = billingComplaints.filter((c) => c.status !== "closed").length;
    const openConnectionRequests = estimates.filter((e) => e.status !== "closed").length;
    const openComplaints = complaints.filter((c) => c.status !== "closed").length;
    const unackedAlerts = alerts.filter((a) => !a.ack).length;

    return `
بيانات نظام "حياة" الحالية (محدثة لحظيًا):
- المحطات والروافع: الإجمالي ${stations.length} (عاملة ${onlineStations}، متوقفة ${offlineStations})، إجمالي التصرف اليومي التقريبي ${totalFlow.toLocaleString()} م³.
- الصيانة: ${openOrders} أمر عمل مفتوح أو جاري التنفيذ. قطع غيار تحت حد الطلب الأدنى: ${lowStockParts.join("، ") || "لا يوجد"}.
- السلامة والصحة المهنية: ${openIncidents} حادث عمل لم يُغلق بعد. ${failedInspections} فحص سلامة دوري بنتيجة "فاشل". معدات حماية تحت الحد الأدنى: ${lowStockPpe.join("، ") || "لا يوجد"}.
- الموارد البشرية: ${staff.length} موظف مسجّل. إجمالي صافي الاستحقاقات الشهرية التقريبي ${totalSalaryBudget.toLocaleString()} ج.م. وظائف شاغرة قيد التوظيف: ${openHiring}.
- الإيرادات: إيراد الشهر الحالي ${thisMonthRevenue.toLocaleString()} ج.م، بمتوسط شهري (6 أشهر) ${avgMonthlyRevenue.toLocaleString()} ج.م. شكاوى متعلقة بالفواتير مفتوحة: ${openBillingComplaints}. طلبات مقايسات توصيل مياه/صرف لم تُنفذ: ${openConnectionRequests}.
- خدمة العملاء: ${openComplaints} شكوى عامة مفتوحة من المواطنين (تسرب/انقطاع/ضعف ضغط/صرف صحي).
- الإنذارات: ${unackedAlerts} إنذار عاجل لم يتم تأكيد الاطلاع عليه.
`.trim();
  };
  const now = new Date();

  const renderSection = () => {
    switch (section) {
      case "home": return <HomeSection stations={stations} alerts={alerts} />;
      case "ops": return <StationOpsSection stations={stations} setStations={setStations} />;
      case "maintenance": return <MaintenanceSection orders={orders} setOrders={setOrders} stations={stations} parts={parts} setParts={setParts} />;
      case "safety": return (
        <SafetySection
          incidents={incidents} setIncidents={setIncidents}
          ppe={ppe} setPpe={setPpe}
          inspections={inspections} setInspections={setInspections}
          stations={stations}
        />
      );
      case "gis": return <GISSection stations={stations} />;
      case "hr": return (
        <HRSection
          employees={staff} setEmployees={setStaff} stations={stations}
          payroll={payroll} setPayroll={setPayroll}
          training={training} setTraining={setTraining}
          recruitment={recruitment} setRecruitment={setRecruitment}
        />
      );
      case "revenue": return (
        <RevenueSection
          entries={revenue} setEntries={setRevenue}
          readings={readings} setReadings={setReadings}
          billingComplaints={billingComplaints} setBillingComplaints={setBillingComplaints}
          estimates={estimates} setEstimates={setEstimates}
        />
      );
      case "complaints": return <ComplaintsSection complaints={complaints} setComplaints={setComplaints} />;
      case "ai": return <AIAssistantSection dataSummary={buildDataSummary()} complaints={complaints} setComplaints={setComplaints} />;
      case "reports": return <ReportsSection />;
      case "alerts": return <AlertsSection alerts={alerts} setAlerts={setAlerts} />;
      case "users": return <UsersSection users={users} setUsers={setUsers} />;
      case "settings": return <SettingsSection settings={settings} setSettings={setSettings} />;
      default: return null;
    }
  };

  return (
    <div dir="rtl" style={{ background: c.bg, minHeight: "100vh", fontFamily: "Cairo" }}>
      <style>{FONT_IMPORT}{`
        html { font-size: 134%; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        * { font-family: 'Cairo', sans-serif; }
      `}</style>

      <div
        className="w-full text-center py-2 text-sm font-extrabold"
        style={{ background: c.blue, color: c.bg, letterSpacing: "0.5px" }}
      >
        حياة - منصة مياه كفر الشيخ الذكية
      </div>
      <div className="flex">
        <aside
          className={`fixed lg:static top-0 right-0 h-screen w-64 shrink-0 z-30 flex flex-col py-5 px-3 transition-transform
          ${sidebarOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"}`}
          style={{ background: c.card, borderLeft: `1px solid ${c.line}` }}
        >
          <div className="flex items-center gap-2 px-2 mb-6">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: c.blue }}>
              <Droplets size={27} color={c.bg} />
            </div>
            <div>
              <p className="font-bold text-base leading-tight" style={{ color: c.text }}>حياة</p>
              <p className="text-[11px]" style={{ color: c.soft }}>منصة مياه كفر الشيخ الذكية</p>
            </div>
          </div>
          <nav className="flex flex-col gap-1 overflow-y-auto">
            {SIDEBAR_ITEMS.map((item) => (
              <button
                key={item.key}
                onClick={() => { setSection(item.key); setSidebarOpen(false); }}
                className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-sm font-medium"
                style={{ background: section === item.key ? c.blue : "transparent", color: section === item.key ? c.bg : c.soft }}
              >
                <span className="flex items-center gap-3"><item.icon size={23} /> {item.label}</span>
                {item.badge && <span className="text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center" style={{ background: c.red, color: "#fff" }}>{item.badge}</span>}
              </button>
            ))}
          </nav>
          <button className="mt-auto flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold" style={{ background: c.blue, color: c.bg }}>
            <Phone size={20} /> اتصل بالدعم الفني
          </button>
          <p className="text-center text-[10px] mt-3" style={{ color: c.soft }}>الإصدار 1.0.0</p>
        </aside>

        <div className="flex-1 min-h-screen flex flex-col">
          <header className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3 sticky top-0 z-20 flex-wrap" style={{ background: c.card, borderBottom: `1px solid ${c.line}` }}>
            <div className="flex items-center gap-3">
              <button className="lg:hidden" onClick={() => setSidebarOpen((v) => !v)}><Menu size={27} color={c.text} /></button>
              <h1 className="font-bold text-base sm:text-lg" style={{ color: c.text }}>{SECTION_TITLES[section]}</h1>
              {saveStatus === "saving" && (
                <span className="flex items-center gap-1 text-[11px] font-semibold" style={{ color: c.soft }}>
                  <Loader2 size={16} className="animate-spin" /> جاري الحفظ...
                </span>
              )}
              {saveStatus === "saved" && (
                <span className="flex items-center gap-1 text-[11px] font-semibold" style={{ color: c.green }}>
                  <Check size={16} /> تم الحفظ
                </span>
              )}
              {saveStatus?.error && (
                <span className="flex items-center gap-1 text-[11px] font-semibold" style={{ color: c.red }}>
                  <AlertTriangle size={16} /> فشل الحفظ: {saveStatus.error}
                </span>
              )}
            </div>
            <div className="flex items-center gap-4 text-xs" style={{ color: c.soft }}>
              <span className="flex items-center gap-1"><Sun size={19} color={c.amber} /> 28°C</span>
              <span className="hidden sm:flex items-center gap-1"><Calendar size={19} /> {now.toLocaleDateString("ar-EG")}</span>
              <span className="hidden sm:flex items-center gap-1"><Clock size={19} /> {now.toLocaleTimeString("ar-EG")}</span>
              <button onClick={() => setSection("alerts")} className="relative">
                <Bell size={23} color={c.text} />
                <span className="absolute -top-1.5 -left-1.5 text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center" style={{ background: c.red, color: "#fff" }}>12</span>
              </button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs" style={{ background: c.blue, color: c.bg }}>م.</div>
                <div className="hidden sm:block">
                  <p className="text-xs font-bold" style={{ color: c.text }}>م. محمد كامل</p>
                  <p className="text-[10px]" style={{ color: c.soft }}>مدير المنطقة · متصل</p>
                </div>
              </div>
            </div>
          </header>

          <main className="p-4 sm:p-6 flex-1">{renderSection()}</main>

          <footer className="text-center text-[11px] py-4" style={{ color: c.soft }}>
            جميع الحقوق محفوظة © 2026 حياة - منصة مياه كفر الشيخ الذكية
          </footer>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   Access PIN gate — wraps the whole app
----------------------------------------------------------------*/

const ACCESS_CODE = "emkas7";

function PinGate() {
  const [unlocked, setUnlocked] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const toWesternDigits = (str) => {
    const map = { "٠": "0", "١": "1", "٢": "2", "٣": "3", "٤": "4", "٥": "5", "٦": "6", "٧": "7", "٨": "8", "٩": "9" };
    return String(str).replace(/[٠-٩]/g, (d) => map[d]);
  };

  const tryUnlock = () => {
    const cleaned = toWesternDigits(code).trim().toLowerCase().replace(/\s+/g, "");
    if (cleaned === ACCESS_CODE) {
      setUnlocked(true);
      setError("");
    } else {
      setError("الرقم السري غير صحيح");
    }
  };

  if (unlocked) return <OperationsRoomInner />;

  return (
    <div dir="rtl" className="min-h-screen flex flex-col items-center justify-center px-6" style={{ background: c.bg, fontFamily: "Cairo" }}>
      <style>{FONT_IMPORT}{`html { font-size: 134%; } * { font-family: 'Cairo', sans-serif; }`}</style>
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4" style={{ background: c.blue }}>
        <Lock size={28} color={c.bg} />
      </div>
      <p className="font-extrabold text-xl mb-1" style={{ color: c.text }}>حياة</p>
      <p className="text-xs mb-1" style={{ color: c.soft }}>منصة مياه كفر الشيخ الذكية</p>
      <p className="text-xs mb-6" style={{ color: c.soft }}>أدخل الرقم السري للدخول</p>
      <div className="w-full max-w-xs flex flex-col gap-3">
        <input
          type="password"
          value={code}
          onChange={(e) => { setCode(e.target.value); setError(""); }}
          onKeyDown={(e) => { if (e.key === "Enter") tryUnlock(); }}
          placeholder="الرقم السري"
          className="px-3 py-2.5 rounded-lg text-sm text-center"
          style={{ background: c.card, border: `1px solid ${c.line}`, color: c.text }}
          autoFocus
        />
        {error && <p className="text-xs text-center" style={{ color: c.red }}>{error}</p>}
        <button type="button" onClick={tryUnlock} className="py-2.5 rounded-lg text-sm font-bold" style={{ background: c.blue, color: c.bg }}>
          دخول
        </button>
      </div>
    </div>
  );
}

export default function OperationsRoom() {
  return <PinGate />;
}
