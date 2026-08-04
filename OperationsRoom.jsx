import React, { useState, useEffect, useMemo } from "react";
import {
  Droplets, Wrench, MapPin, Users, Headphones, Sparkles, BarChart2, Bell,
  Shield, Settings, Menu, Sun, Calendar, Clock, Phone, Home,
  Activity, AlertTriangle, Plus, Send, Check, Play, Pause, Search,
  Mail, UserPlus, Save, Pencil, X, Loader2, Wallet, Lock, ShieldAlert, Copy, Gauge, Zap, FlaskConical
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
  { id: "ST-067", name: "محطة معالجة كفر الشيخ", center: "كفر الشيخ", category: "صرف صحي", type: "sewage", flow: 28500, status: "offline", quality: "-" },
  { id: "ST-068", name: "محطة معالجة دسوق", center: "دسوق", category: "صرف صحي", type: "sewage", flow: 19200, status: "online", quality: "جيدة" },
  { id: "ST-069", name: "محطة معالجة فوة", center: "فوة", category: "صرف صحي", type: "sewage", flow: 14800, status: "online", quality: "جيدة" },
  { id: "ST-070", name: "محطة معالجة مطوبس", center: "مطوبس", category: "صرف صحي", type: "sewage", flow: 12600, status: "online", quality: "جيدة" },
  { id: "ST-071", name: "محطة معالجة بلطيم", center: "بلطيم", category: "صرف صحي", type: "sewage", flow: 16400, status: "online", quality: "جيدة" },
  { id: "ST-072", name: "محطة معالجة الحامول", center: "الحامول", category: "صرف صحي", type: "sewage", flow: 13100, status: "online", quality: "جيدة" },
  { id: "ST-073", name: "محطة معالجة بيلا", center: "بيلا", category: "صرف صحي", type: "sewage", flow: 11700, status: "online", quality: "جيدة" },
  { id: "ST-074", name: "محطة معالجة قلين", center: "قلين", category: "صرف صحي", type: "sewage", flow: 15300, status: "online", quality: "جيدة" },
  { id: "ST-075", name: "محطة معالجة الرياض", center: "الرياض", category: "صرف صحي", type: "sewage", flow: 9800, status: "online", quality: "جيدة" },
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

const labResultsSeed = [
  { id: "LB-01", station: "المفتي", type: "chemical", date: "2026-06-28", turbidity: 0.3, pH: 7.2, chlorine: 0.5, iron: 0.05, nitrate: 8, status: "pass" },
  { id: "LB-02", station: "سيدي سالم شرق", type: "chemical", date: "2026-06-27", turbidity: 0.8, pH: 7.5, chlorine: 0.4, iron: 0.12, nitrate: 12, status: "pass" },
  { id: "LB-03", station: "كفر الشيخ", type: "bacteriological", date: "2026-06-26", turbidity: 2.1, pH: 7.8, chlorine: 0.2, iron: 0.18, nitrate: 22, status: "fail" },
  { id: "LB-04", station: "دسوق", type: "chemical", date: "2026-06-25", turbidity: 0.5, pH: 7.1, chlorine: 0.6, iron: 0.08, nitrate: 10, status: "pass" },
  { id: "LB-05", station: "فوة", type: "bacteriological", date: "2026-06-24", turbidity: 0.4, pH: 7.3, chlorine: 0.5, iron: 0.06, nitrate: 9, status: "pass" },
  { id: "LB-06", station: "مطوبس", type: "chemical", date: "2026-06-23", turbidity: 1.2, pH: 8.1, chlorine: 0.3, iron: 0.15, nitrate: 18, status: "warning" },
];

const employeesSeed = [
  { id: "EM-2594", name: "حسن احمد سعد فرو", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-2504", name: "عبدالرحيم على على الصالحى", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-4510", name: "عماد عبدالبارى بدر سليمان", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-8098", name: "ايمن عبدالفتاح على محمد", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-2581", name: "سمير مصطفى محمد سلامه", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-7775", name: "محمد جابر فهمى احمد شلبى", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-4486", name: "سوراج ابوزيد ابراهيم ابوزيد", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-8089", name: "وليد صبرى سليمان الحداد", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-7388", name: "امين محمد محمد السترى", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-3165", name: "عبدالمنعم السعيد موسى موسى", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-9773", name: "محمد محمد السيد الحسينى", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-8844", name: "علاء شوقى مصطفى عطيه القادوم", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-7866", name: "محمد عبداللطيف ابراهيم سعيد", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-8046", name: "سونه محمد حسن رجب", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-3106", name: "احمد ابوالعينين محمد ابوالعينين", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-8600", name: "احمد محمود طه اسماعيل", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-3151", name: "سمير على على ابوفوده", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-4643", name: "محمد عبدالحميد احمد نصار", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-10154", name: "مصطفى محمود اسماعيل تراب", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-10884", name: "محمود محمد احمد عبدالله احمد", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-8073", name: "محمد على عبدالحى حسن", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-8625", name: "محمد سمير ابوزيد محمد", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-2601", name: "عبدالعزيز مصطفى الشاملى شلبى", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-4475", name: "محمد على سليمان عيسى", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-8096", name: "محمود فتحى عبدالغفار عبدالقادر", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-2625", name: "خالد عبدالباسط محمود الريس", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-8203", name: "عبدالله محمد عبدالله السيد", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-4507", name: "محمد حمدى احمد عبدالقادر", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-4468", name: "على صالح متولى محمد", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-7326", name: "ايمن ابراهيم حسن احمد الراعى", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-3174", name: "ياسر عبدالله عبدالحميد ريحان", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-8429", name: "احمد محمد عبدالحميد عميره", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-8234", name: "علاء لطفى عبدالحميد سعيد", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-7915", name: "اسامه محمود طه اسماعيل", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-25", name: "وائل محمد موسى ابوعيطه", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-30038", name: "محمود احمد عبدالعزيز ابراهيم ابوالعزم", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-9317", name: "ماهر يوسف حامد احمد", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-9051", name: "محمد مصطفى ابوالمعاطى حامد", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-10170", name: "محمد طارق محمد قطب شكر", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-4492", name: "ناصر مصطفى حلمى موته", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-6095", name: "هشام محمد سليمان داوود", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-2090", name: "هانى بسيونى الشرنوبى بيومى", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-9400", name: "محمد عبدربه جابر السيد", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-45", name: "خالد حسنى محمود محمود عبدالله", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-9327", name: "محمد احمد صابر حمد", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-7873", name: "السيد بدير عبدالحميد خضر", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-7933", name: "احمد عبدالعزيز محمد المسيري", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-8091", name: "احمد على على ابوفوده", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-20059", name: "نور شعبان ابوالعنين احمد كميشه", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-10157", name: "رنا احمد على محمد الاطير", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-7183", name: "عمادالدين محمد ابوالفتوح مرسى", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-9624", name: "هانى عبداللطيف عبدالعاطى مندور", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-4484", name: "عبدالحميد بسيونى عبدالحميد غازى", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-9761", name: "محمد مسعود محمد خليفه ابوسمره", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-9705", name: "رزق مرسى احمد محمود الاسطى", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-8816", name: "غاده محمد عبدالبديع شرف", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-2587", name: "عبدالحميد توفيق السيد عبدربه", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-8242", name: "نورا على عبدالوهاب عبدالعزيز", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-10177", name: "محمد مصطفى محمد السيد عبده", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-10158", name: "مروه محمد محمد عبدالله محمد", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-9453", name: "اسماعيل اسماعيل عباس الضوه", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-8409", name: "محمد بركات عبدالهادى جادو", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-9003", name: "محمود السيد ابوشعيشع محمد", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-3069", name: "سهير عبداللطيف ابواليزيد شمس الدين", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-8537", name: "السيد مصطفى السيد الزنفلى", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-5790", name: "جمعه البيلى محمد على المسلمانى", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-9700", name: "ياسر محمد عبدالمولي عوض", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-8350", name: "هدى مصطفى السيد سالم", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-7441", name: "عمرو محمد عبدالرؤف الحشاش", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-10176", name: "حسام كمال محمد عبدالعزيز", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-2494", name: "شهيد محمد حسن عبدالله دراز", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-4538", name: "صابر صابر محمد احمد", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-5797", name: "احمد رجب الغريب السيد", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-9300", name: "احمد وجدى على نورالدين", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-9321", name: "هانى على البهى داود", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-7600", name: "محمد احمد ابواليزيد ناصف", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-4539", name: "على ابراهيم على عبدالعاطى", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-4521", name: "اكرم عبدالله على شعيب", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-8474", name: "عطيه على عطيه ابراهيم", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-43", name: "عبدالسميع محمد حسن عبدالعال", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-9018", name: "ممدوح محمد ابراهيم متولي", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-8399", name: "ايهاب سمير احمد عويضه", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-9173", name: "محمود عبدالرؤف محمد عبدالرؤف حطب", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-5541", name: "محمد غازى محمد غازى", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-2555", name: "محمد ابراهيم احمد السبعاوى", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-7182", name: "حسين ابراهيم حسينى رزق", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-3193", name: "محمد هشام السعيد احمد الدسوقى", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-8417", name: "احمد محمد احمد الشراكى", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-9690", name: "رضا ابراهيم سيف ابراهيم", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-8100", name: "مروان عزت عبدالبارى مصطفى", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-8857", name: "مجدى سامى عطيه خضر", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-8122", name: "لبنى احمد محمد ابراهيم", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-2543", name: "شريف عبدالمنعم عبدالغفار خفاجى", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-6825", name: "محمود عبدالواحد مغازى إسماعيل صديق", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-7413", name: "سمير محمد رزق عبدالخالق", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-6724", name: "وجيه حسين حسين سلام", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-8632", name: "عمرو فيصل عبدالعزيز الشراكى", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-4210", name: "حامد عبدالحميد احمد نصار", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-7328", name: "ناديه محمد رمزى سلطان", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-6570", name: "رامى محمد سالم مصطفى سالم", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-7262", name: "السيد محمد عبدالله سلام", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-7420", name: "طارق محمد سعد ابوزرد", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-1467", name: "عبدالهادى السعيد عبدالهادى جامع", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-8229", name: "هبه محمد محمد عبده مقلد", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-4537", name: "سليمان قطب يوسف سليمان", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-5791", name: "محمد حسن ابراهيم طعيمه", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-2499", name: "بسيونى ابراهيم محمد المستكاوى", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-4660", name: "شعبان اسماعيل حماده عثمان", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-4662", name: "حمدين عبدالعزيز محمد حموده", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-10848", name: "اسماء محمد انيس عمار", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-7818", name: "محمد عبدالعاطى عرجاوى دردير", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-1575", name: "صلاح سيد احمد عبدالعال جمعه", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-8048", name: "شعبان عبدالجيد المشالى حسن المشالى", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-8028", name: "حمدى اسماعيل محمد الجمل", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-8827", name: "طلعت مدحت محمد احمد", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-1498", name: "على عبدالحميد عزيزى ياسين", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-7944", name: "رامى منصور عوض القاضى", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-9137", name: "شريف محمد عبدالكريم قطب", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-8583", name: "الشحات محمود السيد احمد عليمى", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-9638", name: "عبدالخالق سعد السيد عبدالخالق", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-8214", name: "محمود يوسف رفعت الشيخ", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-5532", name: "اسامه مصطفى عبدالغنى السيسى", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-9175", name: "سامح فتحى مصطفى مصطفى", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-5816", name: "عبدالحميد بدوى عبدالمجيد عبدالسلام", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-7461", name: "عماد مسعود محمد خليفه ابوسمره", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-9450", name: "محمود محمد العشماوى محمد", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-4545", name: "محمد محى الدين محمد ابراهيم", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-1581", name: "كاسر سميح محمد مرشدى", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-3191", name: "داليا طلعت الجوهرى بدر", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-9304", name: "محمد السعيد محمد البسيونى", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-9366", name: "محمود صالح جلال صالح", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-4504", name: "ابراهيم رشاد حامد اللواتى", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-10174", name: "مكرم فتحى مكرم عبدالوهاب", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-9619", name: "حسام السيد مامون السيد", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-5476", name: "السعيد حلمى احمد محمد", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-1591", name: "حسام فهمى عبدالغنى الفار", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-7777", name: "عماد فؤاد عيد شريف", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-4523", name: "عصام بسيونى بيومى البنا", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-7786", name: "سعد عبدالمجيد محمد نعيم", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-6818", name: "طاهر ابراهيم محمد ابراهيم", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-8898", name: "احمد رجب ابراهيم على عبدالعاطى", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-8111", name: "مروه عصام الدين محمود", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-8793", name: "نجوى ابراهيم اسعد عوض", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-8049", name: "شيرين زغلول عطيه احمد", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-10019", name: "سامى السيد عبدالمنعم عبده", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-7712", name: "احمد عبدالواجد محمد عبدالواجد", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-6830", name: "فايزه محمد محمود كريم", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-5439", name: "سامح سعد محمد هشهش", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-5768", name: "عمرو عثمان محمد غريب", age: null, role: "", department: "", station: "—", shift: "—" },
  { id: "EM-9607", name: "رضا محمد عبدالحميد عبدالرسول", age: null, role: "", department: "", station: "—", shift: "—" },
];

const payrollSeed = [
  { id: "PR-2594", employee: "حسن احمد سعد فرو", salary: 54150, incentives: 0, disbursement: 0, allowance: 0, deduction: 13992 },
  { id: "PR-2504", employee: "عبدالرحيم على على الصالحى", salary: 37568.87, incentives: 0, disbursement: 0, allowance: 0, deduction: 9153.87 },
  { id: "PR-4510", employee: "عماد عبدالبارى بدر سليمان", salary: 37662.19, incentives: 0, disbursement: 0, allowance: 0, deduction: 9451.19 },
  { id: "PR-8098", employee: "ايمن عبدالفتاح على محمد", salary: 37382.78, incentives: 0, disbursement: 0, allowance: 0, deduction: 9919.78 },
  { id: "PR-2581", employee: "سمير مصطفى محمد سلامه", salary: 35440.92, incentives: 0, disbursement: 0, allowance: 0, deduction: 8539.92 },
  { id: "PR-7775", employee: "محمد جابر فهمى احمد شلبى", salary: 35071.84, incentives: 0, disbursement: 0, allowance: 0, deduction: 8865.84 },
  { id: "PR-4486", employee: "سوراج ابوزيد ابراهيم ابوزيد", salary: 34716.35, incentives: 0, disbursement: 0, allowance: 0, deduction: 8596.35 },
  { id: "PR-8089", employee: "وليد صبرى سليمان الحداد", salary: 34776.31, incentives: 0, disbursement: 0, allowance: 0, deduction: 9264.31 },
  { id: "PR-7388", employee: "امين محمد محمد السترى", salary: 34483.23, incentives: 0, disbursement: 0, allowance: 0, deduction: 9351.23 },
  { id: "PR-3165", employee: "عبدالمنعم السعيد موسى موسى", salary: 32979.2, incentives: 0, disbursement: 0, allowance: 0, deduction: 8397.2 },
  { id: "PR-9773", employee: "محمد محمد السيد الحسينى", salary: 31565.62, incentives: 0, disbursement: 0, allowance: 0, deduction: 7805.62 },
  { id: "PR-8844", employee: "علاء شوقى مصطفى عطيه القادوم", salary: 31814.27, incentives: 0, disbursement: 0, allowance: 0, deduction: 8681.27 },
  { id: "PR-7866", employee: "محمد عبداللطيف ابراهيم سعيد", salary: 30699.15, incentives: 0, disbursement: 0, allowance: 0, deduction: 8287.67 },
  { id: "PR-8046", employee: "سونه محمد حسن رجب", salary: 30631.28, incentives: 0, disbursement: 0, allowance: 0, deduction: 8243.28 },
  { id: "PR-3106", employee: "احمد ابوالعينين محمد ابوالعينين", salary: 29138.15, incentives: 0, disbursement: 0, allowance: 0, deduction: 6969.15 },
  { id: "PR-8600", employee: "احمد محمود طه اسماعيل", salary: 29746.98, incentives: 0, disbursement: 0, allowance: 0, deduction: 8177.98 },
  { id: "PR-3151", employee: "سمير على على ابوفوده", salary: 27980.21, incentives: 0, disbursement: 0, allowance: 0, deduction: 6472.21 },
  { id: "PR-4643", employee: "محمد عبدالحميد احمد نصار", salary: 29465.91, incentives: 0, disbursement: 0, allowance: 0, deduction: 8031.91 },
  { id: "PR-10154", employee: "مصطفى محمود اسماعيل تراب", salary: 29788, incentives: 0, disbursement: 0, allowance: 0, deduction: 8355.83 },
  { id: "PR-10884", employee: "محمود محمد احمد عبدالله احمد", salary: 29693.09, incentives: 0, disbursement: 0, allowance: 0, deduction: 8325.07 },
  { id: "PR-8073", employee: "محمد على عبدالحى حسن", salary: 28873.33, incentives: 0, disbursement: 0, allowance: 0, deduction: 7721.33 },
  { id: "PR-8625", employee: "محمد سمير ابوزيد محمد", salary: 28851.82, incentives: 0, disbursement: 0, allowance: 0, deduction: 7793.82 },
  { id: "PR-2601", employee: "عبدالعزيز مصطفى الشاملى شلبى", salary: 27313.14, incentives: 0, disbursement: 0, allowance: 0, deduction: 6979.14 },
  { id: "PR-4475", employee: "محمد على سليمان عيسى", salary: 26949.04, incentives: 0, disbursement: 0, allowance: 0, deduction: 6652.04 },
  { id: "PR-8096", employee: "محمود فتحى عبدالغفار عبدالقادر", salary: 25924.6, incentives: 0, disbursement: 0, allowance: 0, deduction: 7214.43 },
  { id: "PR-2625", employee: "خالد عبدالباسط محمود الريس", salary: 23647.63, incentives: 0, disbursement: 0, allowance: 0, deduction: 5289.63 },
  { id: "PR-8203", employee: "عبدالله محمد عبدالله السيد", salary: 25112.73, incentives: 0, disbursement: 0, allowance: 0, deduction: 6969.73 },
  { id: "PR-4507", employee: "محمد حمدى احمد عبدالقادر", salary: 23453.78, incentives: 0, disbursement: 0, allowance: 0, deduction: 5369.78 },
  { id: "PR-4468", employee: "على صالح متولى محمد", salary: 23685.34, incentives: 0, disbursement: 0, allowance: 0, deduction: 6207.34 },
  { id: "PR-7326", employee: "ايمن ابراهيم حسن احمد الراعى", salary: 23493, incentives: 0, disbursement: 0, allowance: 0, deduction: 6473 },
  { id: "PR-3174", employee: "ياسر عبدالله عبدالحميد ريحان", salary: 22243.14, incentives: 0, disbursement: 0, allowance: 0, deduction: 5224.14 },
  { id: "PR-8429", employee: "احمد محمد عبدالحميد عميره", salary: 23439.52, incentives: 0, disbursement: 0, allowance: 0, deduction: 6592.52 },
  { id: "PR-8234", employee: "علاء لطفى عبدالحميد سعيد", salary: 23036.54, incentives: 0, disbursement: 0, allowance: 0, deduction: 6427.54 },
  { id: "PR-7915", employee: "اسامه محمود طه اسماعيل", salary: 23387.42, incentives: 0, disbursement: 0, allowance: 0, deduction: 6798.42 },
  { id: "PR-25", employee: "وائل محمد موسى ابوعيطه", salary: 18000, incentives: 0, disbursement: 0, allowance: 0, deduction: 1809 },
  { id: "PR-30038", employee: "محمود احمد عبدالعزيز ابراهيم ابوالعزم", salary: 18000, incentives: 0, disbursement: 0, allowance: 0, deduction: 1809 },
  { id: "PR-9317", employee: "ماهر يوسف حامد احمد", salary: 22358.74, incentives: 0, disbursement: 0, allowance: 0, deduction: 6242.74 },
  { id: "PR-9051", employee: "محمد مصطفى ابوالمعاطى حامد", salary: 21941.61, incentives: 0, disbursement: 0, allowance: 0, deduction: 6256.61 },
  { id: "PR-10170", employee: "محمد طارق محمد قطب شكر", salary: 22228.36, incentives: 0, disbursement: 0, allowance: 0, deduction: 6687.94 },
  { id: "PR-4492", employee: "ناصر مصطفى حلمى موته", salary: 21020.81, incentives: 0, disbursement: 0, allowance: 0, deduction: 5493.81 },
  { id: "PR-6095", employee: "هشام محمد سليمان داوود", salary: 20105.7, incentives: 0, disbursement: 0, allowance: 0, deduction: 4633.84 },
  { id: "PR-2090", employee: "هانى بسيونى الشرنوبى بيومى", salary: 21104.62, incentives: 0, disbursement: 0, allowance: 0, deduction: 6000.62 },
  { id: "PR-9400", employee: "محمد عبدربه جابر السيد", salary: 20975.89, incentives: 0, disbursement: 0, allowance: 0, deduction: 6065.89 },
  { id: "PR-45", employee: "خالد حسنى محمود محمود عبدالله", salary: 16850.17, incentives: 0, disbursement: 0, allowance: 0, deduction: 1964.06 },
  { id: "PR-9327", employee: "محمد احمد صابر حمد", salary: 20571.63, incentives: 0, disbursement: 0, allowance: 0, deduction: 5747.63 },
  { id: "PR-7873", employee: "السيد بدير عبدالحميد خضر", salary: 21068.69, incentives: 0, disbursement: 0, allowance: 0, deduction: 6302.69 },
  { id: "PR-7933", employee: "احمد عبدالعزيز محمد المسيري", salary: 20463.64, incentives: 0, disbursement: 0, allowance: 0, deduction: 5776.64 },
  { id: "PR-8091", employee: "احمد على على ابوفوده", salary: 19647.9, incentives: 0, disbursement: 0, allowance: 0, deduction: 4977.9 },
  { id: "PR-20059", employee: "نور شعبان ابوالعنين احمد كميشه", salary: 19206.69, incentives: 0, disbursement: 0, allowance: 0, deduction: 4642.46 },
  { id: "PR-10157", employee: "رنا احمد على محمد الاطير", salary: 20602.11, incentives: 0, disbursement: 0, allowance: 0, deduction: 6324.09 },
  { id: "PR-7183", employee: "عمادالدين محمد ابوالفتوح مرسى", salary: 19883.48, incentives: 0, disbursement: 0, allowance: 0, deduction: 5761.48 },
  { id: "PR-9624", employee: "هانى عبداللطيف عبدالعاطى مندور", salary: 20096.78, incentives: 0, disbursement: 0, allowance: 0, deduction: 6033.78 },
  { id: "PR-4484", employee: "عبدالحميد بسيونى عبدالحميد غازى", salary: 18757.41, incentives: 0, disbursement: 0, allowance: 0, deduction: 4757.41 },
  { id: "PR-9761", employee: "محمد مسعود محمد خليفه ابوسمره", salary: 19940.39, incentives: 0, disbursement: 0, allowance: 0, deduction: 6046.39 },
  { id: "PR-9705", employee: "رزق مرسى احمد محمود الاسطى", salary: 19837.93, incentives: 0, disbursement: 0, allowance: 0, deduction: 5947.93 },
  { id: "PR-8816", employee: "غاده محمد عبدالبديع شرف", salary: 19746.19, incentives: 0, disbursement: 0, allowance: 0, deduction: 5926.19 },
  { id: "PR-2587", employee: "عبدالحميد توفيق السيد عبدربه", salary: 18888.5, incentives: 0, disbursement: 0, allowance: 0, deduction: 5098.5 },
  { id: "PR-8242", employee: "نورا على عبدالوهاب عبدالعزيز", salary: 19560.32, incentives: 0, disbursement: 0, allowance: 0, deduction: 5798.32 },
  { id: "PR-10177", employee: "محمد مصطفى محمد السيد عبده", salary: 19822.19, incentives: 0, disbursement: 0, allowance: 0, deduction: 6144.61 },
  { id: "PR-10158", employee: "مروه محمد محمد عبدالله محمد", salary: 19817.44, incentives: 0, disbursement: 0, allowance: 0, deduction: 6145.35 },
  { id: "PR-9453", employee: "اسماعيل اسماعيل عباس الضوه", salary: 19470.32, incentives: 0, disbursement: 0, allowance: 0, deduction: 5921.32 },
  { id: "PR-8409", employee: "محمد بركات عبدالهادى جادو", salary: 19155.22, incentives: 0, disbursement: 0, allowance: 0, deduction: 5705.22 },
  { id: "PR-9003", employee: "محمود السيد ابوشعيشع محمد", salary: 19130.87, incentives: 0, disbursement: 0, allowance: 0, deduction: 5784.87 },
  { id: "PR-3069", employee: "سهير عبداللطيف ابواليزيد شمس الدين", salary: 17053.04, incentives: 0, disbursement: 0, allowance: 0, deduction: 3871.04 },
  { id: "PR-8537", employee: "السيد مصطفى السيد الزنفلى", salary: 18776.47, incentives: 0, disbursement: 0, allowance: 0, deduction: 5693.47 },
  { id: "PR-5790", employee: "جمعه البيلى محمد على المسلمانى", salary: 18716.73, incentives: 0, disbursement: 0, allowance: 0, deduction: 5892.53 },
  { id: "PR-9700", employee: "ياسر محمد عبدالمولي عوض", salary: 18603.6, incentives: 0, disbursement: 0, allowance: 0, deduction: 5808.6 },
  { id: "PR-8350", employee: "هدى مصطفى السيد سالم", salary: 17994.02, incentives: 0, disbursement: 0, allowance: 0, deduction: 5212.02 },
  { id: "PR-7441", employee: "عمرو محمد عبدالرؤف الحشاش", salary: 18400.37, incentives: 0, disbursement: 0, allowance: 0, deduction: 5706.37 },
  { id: "PR-10176", employee: "حسام كمال محمد عبدالعزيز", salary: 18531.3, incentives: 0, disbursement: 0, allowance: 0, deduction: 5844.93 },
  { id: "PR-2494", employee: "شهيد محمد حسن عبدالله دراز", salary: 17387.27, incentives: 0, disbursement: 0, allowance: 0, deduction: 4805.27 },
  { id: "PR-4538", employee: "صابر صابر محمد احمد", salary: 16871.51, incentives: 0, disbursement: 0, allowance: 0, deduction: 4430.51 },
  { id: "PR-5797", employee: "احمد رجب الغريب السيد", salary: 18083.58, incentives: 0, disbursement: 0, allowance: 0, deduction: 5749.89 },
  { id: "PR-9300", employee: "احمد وجدى على نورالدين", salary: 17799.82, incentives: 0, disbursement: 0, allowance: 0, deduction: 5605.82 },
  { id: "PR-9321", employee: "هانى على البهى داود", salary: 17636.77, incentives: 0, disbursement: 0, allowance: 0, deduction: 5530.77 },
  { id: "PR-7600", employee: "محمد احمد ابواليزيد ناصف", salary: 17431.8, incentives: 0, disbursement: 0, allowance: 0, deduction: 5446.84 },
  { id: "PR-4539", employee: "على ابراهيم على عبدالعاطى", salary: 16017.23, incentives: 0, disbursement: 0, allowance: 0, deduction: 4064.23 },
  { id: "PR-4521", employee: "اكرم عبدالله على شعيب", salary: 15624.41, incentives: 0, disbursement: 0, allowance: 0, deduction: 3725.41 },
  { id: "PR-8474", employee: "عطيه على عطيه ابراهيم", salary: 17198.93, incentives: 0, disbursement: 0, allowance: 0, deduction: 5372.93 },
  { id: "PR-43", employee: "عبدالسميع محمد حسن عبدالعال", salary: 14922.54, incentives: 0, disbursement: 0, allowance: 0, deduction: 3138.69 },
  { id: "PR-9018", employee: "ممدوح محمد ابراهيم متولي", salary: 17012.83, incentives: 0, disbursement: 0, allowance: 0, deduction: 5398.83 },
  { id: "PR-8399", employee: "ايهاب سمير احمد عويضه", salary: 16726.55, incentives: 0, disbursement: 0, allowance: 0, deduction: 5129.78 },
  { id: "PR-9173", employee: "محمود عبدالرؤف محمد عبدالرؤف حطب", salary: 16583.52, incentives: 0, disbursement: 0, allowance: 0, deduction: 4988.52 },
  { id: "PR-5541", employee: "محمد غازى محمد غازى", salary: 16886.05, incentives: 0, disbursement: 0, allowance: 0, deduction: 5336.05 },
  { id: "PR-2555", employee: "محمد ابراهيم احمد السبعاوى", salary: 15904.27, incentives: 0, disbursement: 0, allowance: 0, deduction: 4368.27 },
  { id: "PR-7182", employee: "حسين ابراهيم حسينى رزق", salary: 16673.08, incentives: 0, disbursement: 0, allowance: 0, deduction: 5239.08 },
  { id: "PR-3193", employee: "محمد هشام السعيد احمد الدسوقى", salary: 15503.78, incentives: 0, disbursement: 0, allowance: 0, deduction: 4122.78 },
  { id: "PR-8417", employee: "احمد محمد احمد الشراكى", salary: 15777.55, incentives: 0, disbursement: 0, allowance: 0, deduction: 4483.55 },
  { id: "PR-9690", employee: "رضا ابراهيم سيف ابراهيم", salary: 16629.38, incentives: 0, disbursement: 0, allowance: 0, deduction: 5341.38 },
  { id: "PR-8100", employee: "مروان عزت عبدالبارى مصطفى", salary: 16290.62, incentives: 0, disbursement: 0, allowance: 0, deduction: 5068.62 },
  { id: "PR-8857", employee: "مجدى سامى عطيه خضر", salary: 16208.7, incentives: 0, disbursement: 0, allowance: 0, deduction: 5115.7 },
  { id: "PR-8122", employee: "لبنى احمد محمد ابراهيم", salary: 16176.13, incentives: 0, disbursement: 0, allowance: 0, deduction: 5144.13 },
  { id: "PR-2543", employee: "شريف عبدالمنعم عبدالغفار خفاجى", salary: 15464.84, incentives: 0, disbursement: 0, allowance: 0, deduction: 4442.84 },
  { id: "PR-6825", employee: "محمود عبدالواحد مغازى إسماعيل صديق", salary: 16217.26, incentives: 0, disbursement: 0, allowance: 0, deduction: 5198.7 },
  { id: "PR-7413", employee: "سمير محمد رزق عبدالخالق", salary: 15940, incentives: 0, disbursement: 0, allowance: 0, deduction: 5188.65 },
  { id: "PR-6724", employee: "وجيه حسين حسين سلام", salary: 15753.84, incentives: 0, disbursement: 0, allowance: 0, deduction: 5099.84 },
  { id: "PR-8632", employee: "عمرو فيصل عبدالعزيز الشراكى", salary: 15343.3, incentives: 0, disbursement: 0, allowance: 0, deduction: 4714.3 },
  { id: "PR-4210", employee: "حامد عبدالحميد احمد نصار", salary: 14647.03, incentives: 0, disbursement: 0, allowance: 0, deduction: 4072.03 },
  { id: "PR-7328", employee: "ناديه محمد رمزى سلطان", salary: 15598.57, incentives: 0, disbursement: 0, allowance: 0, deduction: 5032.57 },
  { id: "PR-6570", employee: "رامى محمد سالم مصطفى سالم", salary: 15398.96, incentives: 0, disbursement: 0, allowance: 0, deduction: 4842.96 },
  { id: "PR-7262", employee: "السيد محمد عبدالله سلام", salary: 15663.38, incentives: 0, disbursement: 0, allowance: 0, deduction: 5121.38 },
  { id: "PR-7420", employee: "طارق محمد سعد ابوزرد", salary: 15615.97, incentives: 0, disbursement: 0, allowance: 0, deduction: 5104.97 },
  { id: "PR-1467", employee: "عبدالهادى السعيد عبدالهادى جامع", salary: 13624.68, incentives: 0, disbursement: 0, allowance: 0, deduction: 3161.27 },
  { id: "PR-8229", employee: "هبه محمد محمد عبده مقلد", salary: 15166.97, incentives: 0, disbursement: 0, allowance: 0, deduction: 4773.97 },
  { id: "PR-4537", employee: "سليمان قطب يوسف سليمان", salary: 14693, incentives: 0, disbursement: 0, allowance: 0, deduction: 4334 },
  { id: "PR-5791", employee: "محمد حسن ابراهيم طعيمه", salary: 15553.63, incentives: 0, disbursement: 0, allowance: 0, deduction: 5240.28 },
  { id: "PR-2499", employee: "بسيونى ابراهيم محمد المستكاوى", salary: 14511.39, incentives: 0, disbursement: 0, allowance: 0, deduction: 4226.39 },
  { id: "PR-4660", employee: "شعبان اسماعيل حماده عثمان", salary: 15044.73, incentives: 0, disbursement: 0, allowance: 0, deduction: 4903.73 },
  { id: "PR-4662", employee: "حمدين عبدالعزيز محمد حموده", salary: 15073.32, incentives: 0, disbursement: 0, allowance: 0, deduction: 4936.32 },
  { id: "PR-10848", employee: "اسماء محمد انيس عمار", salary: 15239.89, incentives: 0, disbursement: 0, allowance: 0, deduction: 5211.2 },
  { id: "PR-7818", employee: "محمد عبدالعاطى عرجاوى دردير", salary: 15003.72, incentives: 0, disbursement: 0, allowance: 0, deduction: 5126.87 },
  { id: "PR-1575", employee: "صلاح سيد احمد عبدالعال جمعه", salary: 13974.67, incentives: 0, disbursement: 0, allowance: 0, deduction: 4103.67 },
  { id: "PR-8048", employee: "شعبان عبدالجيد المشالى حسن المشالى", salary: 14126.7, incentives: 0, disbursement: 0, allowance: 0, deduction: 4382.7 },
  { id: "PR-8028", employee: "حمدى اسماعيل محمد الجمل", salary: 14401.61, incentives: 0, disbursement: 0, allowance: 0, deduction: 4665.61 },
  { id: "PR-8827", employee: "طلعت مدحت محمد احمد", salary: 14561.05, incentives: 0, disbursement: 0, allowance: 0, deduction: 4854.05 },
  { id: "PR-1498", employee: "على عبدالحميد عزيزى ياسين", salary: 13291.16, incentives: 0, disbursement: 0, allowance: 0, deduction: 3631.16 },
  { id: "PR-7944", employee: "رامى منصور عوض القاضى", salary: 14516.72, incentives: 0, disbursement: 0, allowance: 0, deduction: 4868.72 },
  { id: "PR-9137", employee: "شريف محمد عبدالكريم قطب", salary: 14422.46, incentives: 0, disbursement: 0, allowance: 0, deduction: 4795.46 },
  { id: "PR-8583", employee: "الشحات محمود السيد احمد عليمى", salary: 14305.38, incentives: 0, disbursement: 0, allowance: 0, deduction: 4719.38 },
  { id: "PR-9638", employee: "عبدالخالق سعد السيد عبدالخالق", salary: 14326.24, incentives: 0, disbursement: 0, allowance: 0, deduction: 4853.24 },
  { id: "PR-8214", employee: "محمود يوسف رفعت الشيخ", salary: 14051.43, incentives: 0, disbursement: 0, allowance: 0, deduction: 4583.43 },
  { id: "PR-5532", employee: "اسامه مصطفى عبدالغنى السيسى", salary: 14090.15, incentives: 0, disbursement: 0, allowance: 0, deduction: 4659.15 },
  { id: "PR-9175", employee: "سامح فتحى مصطفى مصطفى", salary: 12958.25, incentives: 0, disbursement: 0, allowance: 0, deduction: 3528.25 },
  { id: "PR-5816", employee: "عبدالحميد بدوى عبدالمجيد عبدالسلام", salary: 14440.68, incentives: 0, disbursement: 0, allowance: 0, deduction: 5017.05 },
  { id: "PR-7461", employee: "عماد مسعود محمد خليفه ابوسمره", salary: 14091.7, incentives: 0, disbursement: 0, allowance: 0, deduction: 4708.7 },
  { id: "PR-9450", employee: "محمود محمد العشماوى محمد", salary: 14099.85, incentives: 0, disbursement: 0, allowance: 0, deduction: 4729.85 },
  { id: "PR-4545", employee: "محمد محى الدين محمد ابراهيم", salary: 13247.29, incentives: 0, disbursement: 0, allowance: 0, deduction: 3926.29 },
  { id: "PR-1581", employee: "كاسر سميح محمد مرشدى", salary: 13934.32, incentives: 0, disbursement: 0, allowance: 0, deduction: 4617.32 },
  { id: "PR-3191", employee: "داليا طلعت الجوهرى بدر", salary: 12115.35, incentives: 0, disbursement: 0, allowance: 0, deduction: 2809.35 },
  { id: "PR-9304", employee: "محمد السعيد محمد البسيونى", salary: 13846.82, incentives: 0, disbursement: 0, allowance: 0, deduction: 4561.82 },
  { id: "PR-9366", employee: "محمود صالح جلال صالح", salary: 13822.75, incentives: 0, disbursement: 0, allowance: 0, deduction: 4603.75 },
  { id: "PR-4504", employee: "ابراهيم رشاد حامد اللواتى", salary: 12052.61, incentives: 0, disbursement: 0, allowance: 0, deduction: 2834.61 },
  { id: "PR-10174", employee: "مكرم فتحى مكرم عبدالوهاب", salary: 14087.83, incentives: 0, disbursement: 0, allowance: 0, deduction: 4874.4 },
  { id: "PR-9619", employee: "حسام السيد مامون السيد", salary: 13961.07, incentives: 0, disbursement: 0, allowance: 0, deduction: 4768.07 },
  { id: "PR-5476", employee: "السعيد حلمى احمد محمد", salary: 12912.07, incentives: 0, disbursement: 0, allowance: 0, deduction: 3724.07 },
  { id: "PR-1591", employee: "حسام فهمى عبدالغنى الفار", salary: 13937.93, incentives: 0, disbursement: 0, allowance: 0, deduction: 4767.93 },
  { id: "PR-7777", employee: "عماد فؤاد عيد شريف", salary: 13848.68, incentives: 0, disbursement: 0, allowance: 0, deduction: 4718.19 },
  { id: "PR-4523", employee: "عصام بسيونى بيومى البنا", salary: 12977.78, incentives: 0, disbursement: 0, allowance: 0, deduction: 3882.78 },
  { id: "PR-7786", employee: "سعد عبدالمجيد محمد نعيم", salary: 13747.13, incentives: 0, disbursement: 0, allowance: 0, deduction: 4657.13 },
  { id: "PR-6818", employee: "طاهر ابراهيم محمد ابراهيم", salary: 13839.28, incentives: 0, disbursement: 0, allowance: 0, deduction: 4753.28 },
  { id: "PR-8898", employee: "احمد رجب ابراهيم على عبدالعاطى", salary: 13682.18, incentives: 0, disbursement: 0, allowance: 0, deduction: 4644.18 },
  { id: "PR-8111", employee: "مروه عصام الدين محمود", salary: 13533.41, incentives: 0, disbursement: 0, allowance: 0, deduction: 4501.41 },
  { id: "PR-8793", employee: "نجوى ابراهيم اسعد عوض", salary: 13673, incentives: 0, disbursement: 0, allowance: 0, deduction: 4648 },
  { id: "PR-8049", employee: "شيرين زغلول عطيه احمد", salary: 13626.02, incentives: 0, disbursement: 0, allowance: 0, deduction: 4610.02 },
  { id: "PR-10019", employee: "سامى السيد عبدالمنعم عبده", salary: 13665.43, incentives: 0, disbursement: 0, allowance: 0, deduction: 4668.92 },
  { id: "PR-7712", employee: "احمد عبدالواجد محمد عبدالواجد", salary: 13831.28, incentives: 0, disbursement: 0, allowance: 0, deduction: 4849.05 },
  { id: "PR-6830", employee: "فايزه محمد محمود كريم", salary: 13589.12, incentives: 0, disbursement: 0, allowance: 0, deduction: 4621.12 },
  { id: "PR-5439", employee: "سامح سعد محمد هشهش", salary: 12404.27, incentives: 0, disbursement: 0, allowance: 0, deduction: 3453.27 },
  { id: "PR-5768", employee: "عمرو عثمان محمد غريب", salary: 13703.42, incentives: 0, disbursement: 0, allowance: 0, deduction: 4804.15 },
  { id: "PR-9607", employee: "رضا محمد عبدالحميد عبدالرسول", salary: 13583.26, incentives: 0, disbursement: 0, allowance: 0, deduction: 4698.26 },
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
  { id: "PL-01", zone: "فوة", from: "فوة", to: "كفر الشيخ", length: "4.2 كم", diameter: "300 مم", material: "PVC", status: "active" },
  { id: "PL-02", zone: "قلين", from: "قلين", to: "كفر الشيخ", length: "2.8 كم", diameter: "250 مم", material: "حديد دكتايل", status: "active" },
  { id: "PL-03", zone: "دسوق", from: "دسوق", to: "كفر الشيخ", length: "1.5 كم", diameter: "200 مم", material: "PVC", status: "leaking" },
  { id: "PL-04", zone: "مطوبس", from: "مطوبس", to: "فوة", length: "3.1 كم", diameter: "300 مم", material: "خرساني", status: "maintenance" },
  { id: "PL-05", zone: "سيدي سالم", from: "سيدي سالم", to: "كفر الشيخ", length: "5.4 كم", diameter: "350 مم", material: "حديد دكتايل", status: "active" },
  { id: "PL-06", zone: "بلطيم", from: "بلطيم", to: "الحامول", length: "6.0 كم", diameter: "300 مم", material: "PVC", status: "active" },
];

const networkMaintenanceSeed = [
  { id: "NW-01", pipeline: "PL-03", issue: "تسريب في خط دسوق", assignee: "حسن طارق", status: "inProgress" },
  { id: "NW-02", pipeline: "PL-04", issue: "صيانة دورية لخط مطوبس - فوة", assignee: "كريم عادل", status: "open" },
];

const usersSeed = [
  { id: "U-001", name: "م. محمد كامل", email: "m.kamel@hayah.gov.eg", role: "ADMIN", status: "active", phone: "01098138383",
    permissions: { home:true, ops:true, revenue:true, maintenance:true, gis:true, hr:true, safety:true, lab:true, complaints:true, ai:true, reports:true, alerts:true, users:true, settings:true } },
  { id: "U-002", name: "حسن طارق", email: "h.tarek@hayah.gov.eg", role: "EMPLOYEE", status: "active", phone: "0100000001",
    permissions: { home:true, ops:true, revenue:false, maintenance:true, gis:false, hr:false, safety:true, lab:false, complaints:false, ai:true, reports:false, alerts:true, users:false, settings:false } },
  { id: "U-003", name: "منى رشاد", email: "m.rashad@hayah.gov.eg", role: "EMPLOYEE", status: "active", phone: "0100000002",
    permissions: { home:true, ops:false, revenue:false, maintenance:false, gis:false, hr:false, safety:true, lab:true, complaints:true, ai:true, reports:true, alerts:true, users:false, settings:false } },
  { id: "U-004", name: "أحمد سيد", email: "ahmed.s@example.com", role: "CITIZEN", status: "active", phone: "0100000003",
    permissions: { home:true, ops:false, revenue:false, maintenance:false, gis:false, hr:false, safety:false, lab:false, complaints:true, ai:true, reports:false, alerts:false, users:false, settings:false } },
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

const notificationsSeed = [
  { id: "N-01", title: "إنذار عاجل", body: "ارتفاع منسوب بيارة محطة معالجة كفر الشيخ", type: "alert", read: false, time: "10:15 ص" },
  { id: "N-02", title: "شكوى جديدة", body: "شكوى تسرب مياه من محمد كامل — C-441", type: "complaint", read: false, time: "09:45 ص" },
  { id: "N-03", title: "أمر صيانة", body: "تم إنشاء أمر عمل WO-118 لطلمبة المفتي", type: "maintenance", read: true, time: "09:20 ص" },
  { id: "N-04", title: "نتيجة تحليل", body: "نتيجة تحليل محطة كفر الشيخ: فاشل — يتطلب مراجعة", type: "lab", read: false, time: "08:50 ص" },
  { id: "N-05", title: "موظف جديد", body: "تم إضافة موظف جديد لقسم الصيانة", type: "hr", read: true, time: "08:00 ص" },
];

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

function ContactRow({ icon: Icon, label, value, href }) {
  const [copied, setCopied] = useState(false);
  const inputRef = React.useRef(null);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard API blocked — fall back to manual select so the user can copy themselves
      if (inputRef.current) {
        inputRef.current.removeAttribute("readonly");
        inputRef.current.focus();
        inputRef.current.select();
      }
    }
  };

  return (
    <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg" style={{ background: c.cardAlt, border: `1px solid ${c.line}` }}>
      <a href={href} className="flex items-center gap-3 flex-1 min-w-0">
        <Icon size={20} color={c.blue} />
        <div className="min-w-0">
          <p className="text-xs" style={{ color: c.soft }}>{label}</p>
          <input
            ref={inputRef} value={value} readOnly
            className="font-mono font-bold text-sm bg-transparent border-none p-0 w-full"
            style={{ color: c.text, outline: "none" }}
            onClick={(e) => e.preventDefault()}
          />
        </div>
      </a>
      <button
        type="button" onClick={copy}
        className="shrink-0 px-2.5 py-1.5 rounded-lg text-[11px] font-bold flex items-center gap-1"
        style={{ background: copied ? "#173C2A" : c.card, color: copied ? c.green : c.blue, border: `1px solid ${c.line}` }}
      >
        {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? "تم النسخ" : "نسخ"}
      </button>
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
    warning: { bg: "#3C2F12", fg: c.amber, label: "تحذير" },
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

function useLiveValues(baseValues, intervalMs = 5000) {
  const [values, setValues] = useState(baseValues);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setValues(() => {
        const updated = {};
        for (const [k, v] of Object.entries(baseValues)) {
          const change = 1 + (Math.random() * 0.2 - 0.1); // ±10%
          updated[k] = Math.round(v * change);
        }
        return updated;
      });
      setTick((t) => t + 1);
    }, intervalMs);
    return () => clearInterval(id);
  }, []);

  return { values, tick };
}

function TrendArrow({ current, prev }) {
  if (prev === null || prev === undefined) return null;
  const up = current > prev;
  return (
    <span className="text-[10px] font-bold" style={{ color: up ? c.green : c.red }}>
      {up ? "▲" : "▼"} {Math.abs(Math.round(((current - prev) / prev) * 100))}%
    </span>
  );
}

function SmartAlert({ msg, level }) {
  const col = level === "critical" ? c.red : level === "warning" ? c.amber : c.green;
  return (
    <div className="flex items-start gap-2 py-1.5" style={{ borderBottom: `1px solid ${c.line}` }}>
      <span className="mt-0.5 shrink-0">
        {level === "ok"
          ? <Check size={15} color={col} />
          : <AlertTriangle size={15} color={col} />}
      </span>
      <p className="text-[11px] leading-snug" style={{ color: c.text }}>{msg}</p>
    </div>
  );
}

function HomeSection({ stations, alerts, complaints, orders, incidents, parts, payroll }) {
  const onlineCount = stations.filter((s) => s.status === "online").length;
  const offlineCount = stations.length - onlineCount;
  const sewageCount = stations.filter((s) => s.type === "sewage").length;

  const baseFlow = { production: 480000, energy: 42000, chlorine: 98, pressure: 32 };
  const prevRef = React.useRef(null);
  const { values: live, tick } = useLiveValues(baseFlow, 5000);
  const prev = prevRef.current;
  useEffect(() => { prevRef.current = live; }, [tick]);

  const openComplaints = complaints.filter((c) => c.status !== "closed").length;
  const openOrders = orders.filter((o) => o.status !== "closed").length;
  const openIncidents = incidents.filter((i) => i.status !== "closed").length;
  const lowStockParts = parts.filter((p) => p.quantity <= p.minThreshold);

  const now = new Date();

  const smartAlerts = [];
  if (offlineCount > 0) smartAlerts.push({ msg: `${offlineCount} محطة متوقفة — يُنصح بمراجعة قسم التشغيل فورًا`, level: "critical" });
  if (openIncidents > 0) smartAlerts.push({ msg: `${openIncidents} حادث عمل لم يُغلق — السلامة المهنية تحتاج متابعة`, level: "critical" });
  if (lowStockParts.length > 0) smartAlerts.push({ msg: `${lowStockParts.length} صنف قطع غيار وصل الحد الأدنى: ${lowStockParts.map((p) => p.name).slice(0,2).join("، ")}`, level: "warning" });
  if (openOrders > 3) smartAlerts.push({ msg: `${openOrders} أمر صيانة مفتوح — تحقق من توزيع الفرق`, level: "warning" });
  if (openComplaints > 5) smartAlerts.push({ msg: `${openComplaints} شكوى مفتوحة — مستوى الخدمة يحتاج تحسين`, level: "warning" });
  if (live.pressure < 28) smartAlerts.push({ msg: `ضغط الشبكة منخفض (${live.pressure} بار)`, level: "warning" });
  if (smartAlerts.length === 0) smartAlerts.push({ msg: "كل المؤشرات ضمن الحدود الطبيعية — النظام يعمل بكفاءة عالية", level: "ok" });

  const complaintsDonut = [
    { name: "ضعف مياه", value: complaints.filter((c) => c.type === "lowPressure" || c.type === "ضعف ضغط").length + 9, color: c.blue },
    { name: "انقطاع مياه", value: complaints.filter((c) => c.type === "noWater" || c.type === "انقطاع مياه").length + 6, color: c.green },
    { name: "صرف صحي", value: complaints.filter((c) => c.type === "sewage" || c.type === "صرف صحي").length + 5, color: c.purple },
    { name: "أخرى", value: 3, color: c.amber },
  ];
  const totalComplaintsDonut = complaintsDonut.reduce((s, x) => s + x.value, 0);

  const productionData2 = Array.from({ length: 9 }, (_, i) => ({
    h: `${String(i * 3).padStart(2, "0")}:00`,
    actual: Math.round(live.production * 0.75 + i * 8000 + Math.sin(i * 0.8) * 15000),
    design: 600000,
  }));

  const energyData2 = Array.from({ length: 9 }, (_, i) => ({
    h: `${String(i * 3).padStart(2, "0")}:00`,
    v: Math.round(live.energy * 0.6 + i * 5500 + Math.cos(i) * 4000),
  }));

  const quickActions = [
    { icon: Gauge, label: "تشغيل قراءة", key: "ops" },
    { icon: AlertTriangle, label: "إبلاغ عطل", key: "maintenance" },
    { icon: Wrench, label: "أمر عمل", key: "maintenance" },
    { icon: Headphones, label: "شكوى جديدة", key: "complaints" },
    { icon: BarChart2, label: "تقارير يومية", key: "reports" },
    { icon: Droplets, label: "بيانات المحطات", key: "ops" },
  ];

  return (
    <div className="flex flex-col gap-4">

      {/* ── شريط العنوان ── */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <p className="font-extrabold text-base" style={{ color: c.text }}>غرفة العمليات الذكية</p>
          <p className="text-[11px]" style={{ color: c.soft }}>
            {now.toLocaleDateString("ar-EG")} · {now.toLocaleTimeString("ar-EG")} ·
            <span className="ms-2 inline-flex items-center gap-1" style={{ color: c.green }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: c.green }} /> بث مباشر
            </span>
          </p>
        </div>
      </div>

      {/* ── KPIs الرئيسية (6 بطاقات تشبه الصورة) ── */}
      <div className="grid grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { label: "إجمالي محطات المياه", value: stations.filter(s=>s.type==="water").length, sub: "محطة", color: c.blue, icon: Droplets },
          { label: "محطات عاملة", value: `${onlineCount}`, sub: `${Math.round(onlineCount/stations.length*100)}%`, color: c.green, icon: Shield },
          { label: "محطات متوقفة", value: offlineCount, sub: "", color: c.red, icon: AlertTriangle },
          { label: "محطات الصرف", value: sewageCount, sub: "محطة", color: c.cyan, icon: Droplets },
          { label: "أعطال حالية", value: openOrders, sub: "عطل", color: c.amber, icon: Wrench },
          { label: "شكاوى مفتوحة", value: openComplaints, sub: "شكوى", color: c.purple, icon: Headphones },
        ].map((k, i) => (
          <div key={i} className="rounded-xl px-3 py-3 flex flex-col gap-1" style={{ background: c.card, border: `1px solid ${k.color}33` }}>
            <div className="flex items-center justify-between mb-1">
              <k.icon size={16} color={k.color} />
            </div>
            <span className="font-mono font-extrabold text-xl leading-none" style={{ color: k.color }}>{k.value}</span>
            {k.sub && <span className="text-[10px] font-bold" style={{ color: k.color }}>{k.sub}</span>}
            <span className="text-[10px] leading-tight mt-1" style={{ color: c.soft }}>{k.label}</span>
          </div>
        ))}
      </div>

      {/* ── المحتوى الرئيسي (3 أعمدة) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* ── العمود الأيمن (جدول المحطات + خريطة) ── */}
        <div className="lg:col-span-2 flex flex-col gap-4">

          {/* جدول المحطات */}
          <SectionCard>
            <div className="flex items-center justify-between mb-3">
              <p className="font-bold text-sm" style={{ color: c.text }}>حالة المحطات بشكل لحظي</p>
              <span className="text-[11px]" style={{ color: c.soft }}>أحدث {Math.min(8, stations.length)} من {stations.length}</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr style={{ color: c.soft, borderBottom: `1px solid ${c.line}` }}>
                    <th className="text-start py-2 font-medium">المحطة</th>
                    <th className="text-start py-2 font-medium">النوع</th>
                    <th className="text-start py-2 font-medium">الحالة</th>
                    <th className="text-start py-2 font-medium">التصرف</th>
                    <th className="text-start py-2 font-medium">الضغط</th>
                    <th className="text-start py-2 font-medium">جودة المياه</th>
                  </tr>
                </thead>
                <tbody>
                  {stations.slice(0, 8).map((s) => (
                    <tr key={s.id} style={{ borderBottom: `1px solid ${c.line}` }}>
                      <td className="py-2.5 font-semibold" style={{ color: c.text }}>{s.name}</td>
                      <td className="py-2.5">
                        <Droplets size={13} color={s.type === "sewage" ? c.cyan : c.blue} />
                      </td>
                      <td className="py-2.5"><StatusTag status={s.status} /></td>
                      <td className="py-2.5 font-mono" style={{ color: c.text }}>{s.capacityText || (s.flow || 0).toLocaleString()}</td>
                      <td className="py-2.5 font-mono" style={{ color: c.text }}>{s.pressure ?? "-"}</td>
                      <td className="py-2.5">
                        {s.quality === "جيدة"
                          ? <span className="flex items-center gap-1 text-[11px]" style={{ color: c.green }}><span className="w-1.5 h-1.5 rounded-full" style={{ background: c.green }} /> جيدة</span>
                          : <span style={{ color: c.soft }}>-</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionCard>

          {/* الخريطة */}
          <SectionCard>
            <p className="font-bold text-sm mb-3" style={{ color: c.text }}>خريطة المحطات والشبكات</p>
            <KafrElSheikhMap height={230} stations={stations} showNetwork />
          </SectionCard>

          {/* رسمان بيانيان جنب بعض */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <SectionCard>
              <div className="flex items-center justify-between mb-2">
                <p className="font-bold text-xs" style={{ color: c.text }}>إنتاج المياه اليومي (م³)</p>
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: "#173C2A", color: c.green }}>Live</span>
              </div>
              <ResponsiveContainer width="100%" height={140}>
                <LineChart data={productionData2}>
                  <CartesianGrid stroke={c.line} vertical={false} />
                  <XAxis dataKey="h" tick={{ fontSize: 9, fill: c.soft }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 9, fill: c.soft }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: c.cardAlt, border: `1px solid ${c.line}`, fontSize: 10 }} />
                  <Line type="monotone" dataKey="actual" stroke={c.blue} strokeWidth={2} dot={false} name="الإنتاج الفعلي" />
                  <Line type="monotone" dataKey="design" stroke={c.green} strokeWidth={1.5} strokeDasharray="4 4" dot={false} name="الطاقة التصميمية" />
                </LineChart>
              </ResponsiveContainer>
            </SectionCard>

            <SectionCard>
              <p className="font-bold text-xs mb-2" style={{ color: c.text }}>استهلاك الكهرباء (ك.و.س)</p>
              <ResponsiveContainer width="100%" height={140}>
                <BarChart data={energyData2}>
                  <CartesianGrid stroke={c.line} vertical={false} />
                  <XAxis dataKey="h" tick={{ fontSize: 9, fill: c.soft }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 9, fill: c.soft }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: c.cardAlt, border: `1px solid ${c.line}`, fontSize: 10 }} />
                  <Bar dataKey="v" fill={c.blue} radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </SectionCard>
          </div>
        </div>

        {/* ── العمود الأيسر (ذكاء + إنذارات + شكاوى + مقياس + إجراءات) ── */}
        <div className="flex flex-col gap-4">

          {/* KPIs لحظية */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "الإنتاج", value: (live.production/1000).toFixed(0)+"K", sub: "م³", color: c.blue, key: "production" },
              { label: "الكهرباء", value: (live.energy/1000).toFixed(0)+"K", sub: "ك.و.س", color: c.amber, key: "energy" },
              { label: "الضغط", value: live.pressure, sub: "بار", color: live.pressure < 28 ? c.red : c.green, key: "pressure" },
              { label: "الكلور", value: live.chlorine+"%", sub: "", color: (live.chlorine > 110 || live.chlorine < 85) ? c.red : c.green, key: "chlorine" },
            ].map((k) => (
              <div key={k.key} className="rounded-lg px-3 py-2" style={{ background: c.cardAlt, border: `1px solid ${k.color}33` }}>
                <p className="text-[10px]" style={{ color: c.soft }}>{k.label}</p>
                <p className="font-mono font-bold text-base" style={{ color: k.color }}>{k.value} <span className="text-[10px] font-normal">{k.sub}</span></p>
                <TrendArrow current={live[k.key]} prev={prev?.[k.key] ?? null} />
              </div>
            ))}
          </div>

          {/* الإنذارات العاجلة */}
          <SectionCard>
            <div className="flex items-center justify-between mb-3">
              <p className="font-bold text-sm" style={{ color: c.red }}>الإنذارات العاجلة</p>
              <span className="text-[11px] font-bold" style={{ color: c.red }}>{alerts.filter((a) => !a.ack).length} غير مؤكد</span>
            </div>
            <div className="flex flex-col gap-2">
              {alerts.slice(0, 4).map((a) => (
                <div key={a.id} className="flex items-start gap-2 py-1" style={{ borderBottom: `1px solid ${c.line}` }}>
                  <AlertTriangle size={14} color={a.level === "high" ? c.red : c.amber} className="mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <p className="text-[11px]" style={{ color: c.text }}>{a.text}</p>
                    <div className="flex items-center justify-between mt-0.5">
                      <p className="text-[9px]" style={{ color: c.soft }}>{a.time}</p>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded" style={{ background: a.level === "high" ? "#3C1C1C" : "#3C2F12", color: a.level === "high" ? c.red : c.amber }}>
                        {a.level === "high" ? "عالي" : "متوسط"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* الشكاوى المفتوحة — دونات */}
          <SectionCard>
            <div className="flex items-center justify-between mb-2">
              <p className="font-bold text-sm" style={{ color: c.text }}>الشكاوى المفتوحة</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative w-24 h-24 shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={complaintsDonut} dataKey="value" innerRadius={28} outerRadius={44} paddingAngle={3}>
                      {complaintsDonut.map((d, i) => <Cell key={i} fill={d.color} stroke="none" />)}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-mono font-bold text-base" style={{ color: c.text }}>{totalComplaintsDonut}</span>
                  <span className="text-[9px]" style={{ color: c.soft }}>شكوى</span>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                {complaintsDonut.map((d, i) => (
                  <span key={i} className="flex items-center gap-1.5 text-[11px]" style={{ color: c.text }}>
                    <span className="w-2 h-2 rounded-full" style={{ background: d.color }} />
                    {d.name} · {d.value}
                  </span>
                ))}
              </div>
            </div>
          </SectionCard>

          {/* التحليل الذكي */}
          <SectionCard>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={16} color={c.blue} />
              <p className="font-bold text-sm" style={{ color: c.text }}>التحليل الذكي</p>
            </div>
            <div className="flex flex-col gap-1">
              {smartAlerts.map((a, i) => <SmartAlert key={i} msg={a.msg} level={a.level} />)}
            </div>
          </SectionCard>

          {/* نسبة الأداء */}
          <SectionCard className="flex items-center justify-center py-2">
            <PerformanceGauge percent={Math.min(100, Math.round((onlineCount / stations.length) * 100))} />
          </SectionCard>

          {/* إجراءات سريعة */}
          <SectionCard>
            <p className="font-bold text-sm mb-3" style={{ color: c.text }}>إجراءات سريعة</p>
            <div className="grid grid-cols-3 gap-2">
              {quickActions.map((a, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5 py-3 rounded-lg cursor-pointer" style={{ background: c.cardAlt }}>
                  <a.icon size={18} color={c.blue} />
                  <span className="text-[10px] text-center" style={{ color: c.text }}>{a.label}</span>
                </div>
              ))}
            </div>
          </SectionCard>

        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   Section: Station Operations
----------------------------------------------------------------*/

function StationsOpsTab({ stations, setStations }) {
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

function StationsReportsTab({ stations }) {
  const total = stations.length;
  const online = stations.filter((s) => s.status === "online").length;
  const offline = total - online;
  const onlineRate = total ? Math.round((online / total) * 100) : 0;

  const totalFlow = stations.reduce((s, x) => s + (x.flow || 0), 0);
  const avgFlow = total ? Math.round(totalFlow / total) : 0;

  const byCategory = Object.entries(
    stations.reduce((acc, s) => {
      const key = s.category || (s.type === "water" ? "مياه" : "صرف صحي");
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value], i) => ({ name, value, color: [c.blue, c.cyan, c.purple, c.amber][i % 4] }));

  const flowByCenter = Object.entries(
    stations.reduce((acc, s) => {
      const key = s.center || "غير محدد";
      acc[key] = (acc[key] || 0) + (s.flow || 0);
      return acc;
    }, {})
  ).map(([m, v]) => ({ m, v })).sort((a, b) => b.v - a.v).slice(0, 8);

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="إجمالي المحطات والروافع" value={total} sub="محطة/رافع" color={c.blue} icon={Droplets} />
        <KpiCard label="نسبة التشغيل" value={`${onlineRate}%`} sub={`${online} عاملة من ${total}`} color={onlineRate >= 90 ? c.green : c.amber} icon={Shield} />
        <KpiCard label="محطات متوقفة" value={offline} sub="تحتاج متابعة" color={c.red} icon={AlertTriangle} />
        <KpiCard label="متوسط التصرف لكل محطة" value={avgFlow.toLocaleString()} sub="م³/اليوم" color={c.cyan} icon={Activity} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SectionCard>
          <p className="font-bold text-sm mb-3" style={{ color: c.text }}>توزيع المحطات حسب الفئة</p>
          <div className="flex items-center gap-4">
            <div className="w-32 h-32 shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={byCategory} dataKey="value" innerRadius={36} outerRadius={56} paddingAngle={3}>
                    {byCategory.map((d, i) => <Cell key={i} fill={d.color} stroke="none" />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col gap-2 text-xs">
              {byCategory.map((d, i) => (
                <span key={i} className="flex items-center gap-2" style={{ color: c.text }}>
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} /> {d.name}: {d.value}
                </span>
              ))}
            </div>
          </div>
        </SectionCard>

        <SectionCard>
          <p className="font-bold text-sm mb-3" style={{ color: c.text }}>إجمالي التصرف اليومي حسب المركز (أعلى 8)</p>
          {flowByCenter.length === 0 ? (
            <p className="text-xs" style={{ color: c.soft }}>لا توجد بيانات بعد</p>
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={flowByCenter}>
                <CartesianGrid stroke={c.line} vertical={false} />
                <XAxis dataKey="m" tick={{ fontSize: 10, fill: c.soft }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: c.soft }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: c.cardAlt, border: `1px solid ${c.line}`, fontSize: 11 }} />
                <Bar dataKey="v" fill={c.blue} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </SectionCard>
      </div>
    </div>
  );
}

function StationOpsSection({ stations, setStations }) {
  const [tab, setTab] = useState("ops");
  const tabs = [
    ["ops", "تشغيل المحطات"],
    ["reports", "التقرير والإحصاء"],
  ];
  return (
    <div className="flex flex-col gap-4">
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
      {tab === "ops" && <StationsOpsTab stations={stations} setStations={setStations} />}
      {tab === "reports" && <StationsReportsTab stations={stations} />}
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

function MaintenanceReportsTab({ orders, parts, stations }) {
  // Illustrative unit cost per work order by issue type — used to estimate total maintenance cost
  const COST_PER_ORDER = { "طلمبة": 4500, "صمام": 1200, "لوحة كهرباء": 3000, "فلتر": 800, "مولد": 6000, "أخرى": 1500 };
  const estimateCost = (asset) => {
    const key = Object.keys(COST_PER_ORDER).find((k) => asset.includes(k));
    return COST_PER_ORDER[key || "أخرى"];
  };

  const totalCost = orders.reduce((sum, o) => sum + estimateCost(o.asset), 0);
  const closedCount = orders.filter((o) => o.status === "closed").length;
  const completionRate = orders.length ? Math.round((closedCount / orders.length) * 100) : 0;

  // "نسبة الإشغال" — share of stations currently under an open/active work order
  const stationsUnderWork = new Set(orders.filter((o) => o.status !== "closed").map((o) => o.station)).size;
  const occupancyRate = stations.length ? Math.round((stationsUnderWork / stations.length) * 100) : 0;

  const lowStockCount = parts.filter((p) => p.quantity <= p.minThreshold).length;
  const stockHealth = parts.length ? Math.round(((parts.length - lowStockCount) / parts.length) * 100) : 100;

  const costByStation = Object.entries(
    orders.reduce((acc, o) => {
      acc[o.station] = (acc[o.station] || 0) + estimateCost(o.asset);
      return acc;
    }, {})
  ).map(([station, cost]) => ({ m: station, v: cost })).slice(0, 8);

  const statusBreakdown = [
    { name: "مفتوحة", value: orders.filter((o) => o.status === "open").length, color: c.red },
    { name: "جاري العمل", value: orders.filter((o) => o.status === "inProgress").length, color: c.amber },
    { name: "مغلقة", value: closedCount, color: c.green },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="إجمالي تكلفة الصيانة (تقديري)" value={totalCost.toLocaleString()} sub="ج.م" color={c.amber} icon={Wallet} />
        <KpiCard label="نسبة إنجاز أوامر العمل" value={`${completionRate}%`} sub={`${closedCount} من ${orders.length}`} color={c.green} icon={Check} />
        <KpiCard label="نسبة إشغال المحطات بالصيانة" value={`${occupancyRate}%`} sub={`${stationsUnderWork} محطة`} color={c.blue} icon={Wrench} />
        <KpiCard label="سلامة مخزون قطع الغيار" value={`${stockHealth}%`} sub={lowStockCount ? `${lowStockCount} صنف منخفض` : "كل الأصناف سليمة"} color={stockHealth >= 80 ? c.green : c.red} icon={Shield} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SectionCard>
          <p className="font-bold text-sm mb-3" style={{ color: c.text }}>تكلفة الصيانة التقديرية حسب المحطة</p>
          {costByStation.length === 0 ? (
            <p className="text-xs" style={{ color: c.soft }}>لا توجد بيانات بعد</p>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={costByStation}>
                <CartesianGrid stroke={c.line} vertical={false} />
                <XAxis dataKey="m" tick={{ fontSize: 10, fill: c.soft }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: c.soft }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: c.cardAlt, border: `1px solid ${c.line}`, fontSize: 11 }} />
                <Bar dataKey="v" fill={c.amber} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </SectionCard>

        <SectionCard>
          <p className="font-bold text-sm mb-3" style={{ color: c.text }}>توزيع أوامر العمل حسب الحالة</p>
          <div className="flex items-center gap-4">
            <div className="w-32 h-32 shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={statusBreakdown} dataKey="value" innerRadius={36} outerRadius={56} paddingAngle={3}>
                    {statusBreakdown.map((d, i) => <Cell key={i} fill={d.color} stroke="none" />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col gap-2 text-xs">
              {statusBreakdown.map((d, i) => (
                <span key={i} className="flex items-center gap-2" style={{ color: c.text }}>
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} /> {d.name}: {d.value}
                </span>
              ))}
            </div>
          </div>
        </SectionCard>
      </div>

      <SectionCard>
        <p className="font-bold text-sm mb-3" style={{ color: c.text }}>استهلاك قطع الغيار (الكمية المتوفرة مقابل الحد الأدنى)</p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr style={{ color: c.soft, borderBottom: `1px solid ${c.line}` }}>
                <th className="text-start py-2 font-medium">القطعة</th>
                <th className="text-start py-2 font-medium">المتوفر</th>
                <th className="text-start py-2 font-medium">الحد الأدنى</th>
                <th className="text-start py-2 font-medium">نسبة الاستهلاك من الحد الآمن</th>
              </tr>
            </thead>
            <tbody>
              {parts.map((p) => {
                const ratio = p.minThreshold ? Math.min(150, Math.round((p.quantity / p.minThreshold) * 100)) : 100;
                const low = p.quantity <= p.minThreshold;
                return (
                  <tr key={p.id} style={{ borderBottom: `1px solid ${c.line}` }}>
                    <td className="py-2.5 font-semibold" style={{ color: c.text }}>{p.name}</td>
                    <td className="py-2.5 font-mono" style={{ color: low ? c.red : c.text }}>{p.quantity} {p.unit}</td>
                    <td className="py-2.5 font-mono" style={{ color: c.soft }}>{p.minThreshold} {p.unit}</td>
                    <td className="py-2.5">
                      <div className="w-24 h-2 rounded-full overflow-hidden" style={{ background: c.cardAlt }}>
                        <div className="h-full" style={{ width: `${Math.min(100, ratio)}%`, background: low ? c.red : c.green }} />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}

function MaintenanceSection({ orders, setOrders, stations, parts, setParts }) {
  const [tab, setTab] = useState("orders");
  const tabs = [
    ["orders", "أوامر الصيانة"],
    ["warehouse", "المخازن"],
    ["reports", "التقرير والإحصاء"],
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
      {tab === "reports" && <MaintenanceReportsTab orders={orders} parts={parts} stations={stations} />}
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

function KafrElSheikhMap({ height = 288, stations = [], showNetwork = false, lines = pipelines }) {
  const countsByCenter = {};
  stations.forEach((s) => {
    const key = s.center;
    if (key && MARKAZ_COORDS[key]) countsByCenter[key] = (countsByCenter[key] || 0) + 1;
  });

  const lineColor = (status) => (status === "leaking" ? c.red : status === "maintenance" ? c.amber : c.green);

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

        {showNetwork && (
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ pointerEvents: "none" }}>
            {lines.map((p) => {
              const from = MARKAZ_COORDS[p.from];
              const to = MARKAZ_COORDS[p.to];
              if (!from || !to) return null;
              const a = latLonToPercent(from);
              const b = latLonToPercent(to);
              return (
                <line
                  key={p.id}
                  x1={parseFloat(a.left)} y1={parseFloat(a.top)}
                  x2={parseFloat(b.left)} y2={parseFloat(b.top)}
                  stroke={lineColor(p.status)} strokeWidth={3}
                  strokeLinecap="round"
                  strokeDasharray={p.status === "maintenance" ? "6,4" : undefined}
                  vectorEffect="non-scaling-stroke"
                />
              );
            })}
          </svg>
        )}

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
        {showNetwork && (
          <>
            <span className="flex items-center gap-1.5"><span className="w-4 h-0.5" style={{ background: c.green }} /> خط شبكة سليم</span>
            <span className="flex items-center gap-1.5"><span className="w-4 h-0.5" style={{ background: c.red }} /> خط به تسريب</span>
            <span className="flex items-center gap-1.5"><span className="w-4 h-0.5" style={{ background: c.amber }} /> خط تحت الصيانة</span>
          </>
        )}
      </div>
    </div>
  );
}

function NetworkMapTab({ stations, lines }) {
  return (
    <SectionCard>
      <p className="font-bold text-sm mb-3" style={{ color: c.text }}>خريطة محافظة كفر الشيخ وخطوط الشبكة</p>
      <KafrElSheikhMap stations={stations} showNetwork lines={lines} />
    </SectionCard>
  );
}

function NetworkLinesTab({ lines, setLines }) {
  const [modal, setModal] = useState(false);
  const zoneOptions = Object.keys(MARKAZ_COORDS).map((z) => ({ value: z, label: z }));

  const addLine = (data) => {
    setLines((prev) => [...prev, { ...data, status: "active" }]);
    setModal(false);
  };
  const cycleStatus = (id) => {
    const order = ["active", "leaking", "maintenance"];
    setLines((prev) => prev.map((p) => (p.id === id ? { ...p, status: order[(order.indexOf(p.status) + 1) % order.length] } : p)));
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <button onClick={() => setModal(true)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold" style={{ background: c.blue, color: c.bg }}>
          <Plus size={19} /> خط شبكة جديد
        </button>
      </div>
      <SectionCard>
        <p className="text-[11px] mb-3" style={{ color: c.soft }}>اضغط على الحالة لتحديثها</p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr style={{ color: c.soft, borderBottom: `1px solid ${c.line}` }}>
                <th className="text-start py-2 font-medium">الكود</th>
                <th className="text-start py-2 font-medium">من</th>
                <th className="text-start py-2 font-medium">إلى</th>
                <th className="text-start py-2 font-medium">الطول</th>
                <th className="text-start py-2 font-medium">القطر</th>
                <th className="text-start py-2 font-medium">الخامة</th>
                <th className="text-start py-2 font-medium">الحالة</th>
              </tr>
            </thead>
            <tbody>
              {lines.map((p) => (
                <tr key={p.id} style={{ borderBottom: `1px solid ${c.line}` }}>
                  <td className="py-2.5 font-semibold" style={{ color: c.text }}>{p.id}</td>
                  <td className="py-2.5" style={{ color: c.text }}>{p.from}</td>
                  <td className="py-2.5" style={{ color: c.text }}>{p.to}</td>
                  <td className="py-2.5 font-mono" style={{ color: c.text }}>{p.length}</td>
                  <td className="py-2.5 font-mono" style={{ color: c.text }}>{p.diameter}</td>
                  <td className="py-2.5" style={{ color: c.text }}>{p.material}</td>
                  <td className="py-2.5"><button onClick={() => cycleStatus(p.id)}><StatusTag status={p.status} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      {modal && (
        <FormModal
          title="خط شبكة جديد"
          fields={[
            { key: "id", label: "كود الخط (مثال: PL-07)", required: true },
            { key: "from", label: "من (مركز)", type: "select", options: zoneOptions },
            { key: "to", label: "إلى (مركز)", type: "select", options: zoneOptions },
            { key: "zone", label: "المنطقة المخدومة", required: true },
            { key: "length", label: "الطول (مثال: 3.0 كم)" },
            { key: "diameter", label: "القطر (مثال: 250 مم)" },
            { key: "material", label: "الخامة", default: "PVC" },
          ]}
          onClose={() => setModal(false)}
          onSave={addLine}
        />
      )}
    </div>
  );
}

function NetworkMaintenanceTab({ records, setRecords, lines }) {
  const [modal, setModal] = useState(false);
  const addRecord = (data) => {
    setRecords((prev) => [...prev, { ...data, status: "open" }]);
    setModal(false);
  };
  const cycleStatus = (id) => {
    const order = ["open", "inProgress", "closed"];
    setRecords((prev) => prev.map((r) => (r.id === id ? { ...r, status: order[(order.indexOf(r.status) + 1) % order.length] } : r)));
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <button onClick={() => setModal(true)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold" style={{ background: c.blue, color: c.bg }}>
          <Plus size={19} /> بلاغ صيانة شبكة
        </button>
      </div>
      <SectionCard>
        <p className="text-[11px] mb-3" style={{ color: c.soft }}>اضغط على الحالة لتحديثها</p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr style={{ color: c.soft, borderBottom: `1px solid ${c.line}` }}>
                <th className="text-start py-2 font-medium">الخط</th>
                <th className="text-start py-2 font-medium">المشكلة</th>
                <th className="text-start py-2 font-medium">الفني المكلّف</th>
                <th className="text-start py-2 font-medium">الحالة</th>
              </tr>
            </thead>
            <tbody>
              {records.map((r) => (
                <tr key={r.id} style={{ borderBottom: `1px solid ${c.line}` }}>
                  <td className="py-2.5 font-semibold" style={{ color: c.text }}>{r.pipeline}</td>
                  <td className="py-2.5" style={{ color: c.text }}>{r.issue}</td>
                  <td className="py-2.5" style={{ color: c.text }}>{r.assignee}</td>
                  <td className="py-2.5"><button onClick={() => cycleStatus(r.id)}><StatusTag status={r.status} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      {modal && (
        <FormModal
          title="بلاغ صيانة شبكة جديد"
          fields={[
            { key: "id", label: "كود البلاغ (مثال: NW-03)", required: true },
            { key: "pipeline", label: "كود الخط", type: "select", options: lines.map((l) => ({ value: l.id, label: `${l.id} (${l.from} - ${l.to})` })) },
            { key: "issue", label: "وصف المشكلة", required: true },
            { key: "assignee", label: "الفني المكلّف", default: "—" },
          ]}
          onClose={() => setModal(false)}
          onSave={addRecord}
        />
      )}
    </div>
  );
}

function GISReportsTab({ lines, networkMaintenance }) {
  const total = lines.length;
  const leaking = lines.filter((l) => l.status === "leaking").length;
  const maintenance = lines.filter((l) => l.status === "maintenance").length;
  const active = total - leaking - maintenance;
  const healthRate = total ? Math.round((active / total) * 100) : 100;

  const openMaintenance = networkMaintenance.filter((n) => n.status !== "closed").length;

  const statusBreakdown = [
    { name: "سليم", value: active, color: c.green },
    { name: "تسريب", value: leaking, color: c.red },
    { name: "تحت الصيانة", value: maintenance, color: c.amber },
  ];

  const lengthByMaterial = Object.entries(
    lines.reduce((acc, l) => {
      const key = l.material || "غير محدد";
      const len = parseFloat(l.length) || 0;
      acc[key] = (acc[key] || 0) + len;
      return acc;
    }, {})
  ).map(([m, v]) => ({ m, v: Math.round(v * 10) / 10 }));

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="إجمالي خطوط الشبكة" value={total} sub="خط" color={c.blue} icon={MapPin} />
        <KpiCard label="نسبة سلامة الشبكة" value={`${healthRate}%`} sub={`${active} خط سليم`} color={healthRate >= 80 ? c.green : c.amber} icon={Shield} />
        <KpiCard label="خطوط بها تسريب" value={leaking} sub="تحتاج تدخل عاجل" color={c.red} icon={AlertTriangle} />
        <KpiCard label="بلاغات صيانة مفتوحة" value={openMaintenance} sub="بلاغ" color={c.amber} icon={Wrench} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SectionCard>
          <p className="font-bold text-sm mb-3" style={{ color: c.text }}>حالة خطوط الشبكة</p>
          <div className="flex items-center gap-4">
            <div className="w-32 h-32 shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={statusBreakdown} dataKey="value" innerRadius={36} outerRadius={56} paddingAngle={3}>
                    {statusBreakdown.map((d, i) => <Cell key={i} fill={d.color} stroke="none" />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col gap-2 text-xs">
              {statusBreakdown.map((d, i) => (
                <span key={i} className="flex items-center gap-2" style={{ color: c.text }}>
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} /> {d.name}: {d.value}
                </span>
              ))}
            </div>
          </div>
        </SectionCard>

        <SectionCard>
          <p className="font-bold text-sm mb-3" style={{ color: c.text }}>إجمالي الأطوال حسب الخامة (كم)</p>
          {lengthByMaterial.length === 0 ? (
            <p className="text-xs" style={{ color: c.soft }}>لا توجد بيانات بعد</p>
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={lengthByMaterial}>
                <CartesianGrid stroke={c.line} vertical={false} />
                <XAxis dataKey="m" tick={{ fontSize: 10, fill: c.soft }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: c.soft }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: c.cardAlt, border: `1px solid ${c.line}`, fontSize: 11 }} />
                <Bar dataKey="v" fill={c.cyan} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </SectionCard>
      </div>
    </div>
  );
}

function GISSection({ stations, lines, setLines, networkMaintenance, setNetworkMaintenance }) {
  const [tab, setTab] = useState("map");
  const tabs = [
    ["map", "الخريطة"],
    ["network", "خطوط الشبكة"],
    ["maintenance", "صيانة الشبكات"],
    ["reports", "التقرير والإحصاء"],
  ];

  return (
    <div className="flex flex-col gap-4">
      <PageHeader title="GIS والشبكات" />
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
      {tab === "map" && <NetworkMapTab stations={stations} lines={lines} />}
      {tab === "network" && <NetworkLinesTab lines={lines} setLines={setLines} />}
      {tab === "maintenance" && <NetworkMaintenanceTab records={networkMaintenance} setRecords={setNetworkMaintenance} lines={lines} />}
      {tab === "reports" && <GISReportsTab lines={lines} networkMaintenance={networkMaintenance} />}
    </div>
  );
}

/* ---------------------------------------------------------------
   Section: HR
----------------------------------------------------------------*/

function OrgStructureTab({ employees, setEmployees, stations }) {
  const [modal, setModal] = useState(false);
  const [q, setQ] = useState("");
  const [visible, setVisible] = useState(50);

  const addEmployee = (data) => {
    setEmployees((prev) => [...prev, { ...data, age: Number(data.age) || 0 }]);
    setModal(false);
  };

  const filtered = q ? employees.filter((e) => e.name.includes(q) || (e.code || "").includes(q)) : employees;
  const shown = filtered.slice(0, visible);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between flex-wrap gap-2">
        <div className="relative max-w-xs">
          <Search size={16} className="absolute top-1/2 -translate-y-1/2 right-3" color={c.soft} />
          <input
            value={q} onChange={(e) => { setQ(e.target.value); setVisible(50); }} placeholder="بحث بالاسم أو الكود..."
            className="w-full pr-10 pl-3 py-2 rounded-lg text-xs" style={inputStyle}
          />
        </div>
        <button onClick={() => setModal(true)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold" style={{ background: c.blue, color: c.bg }}>
          <UserPlus size={19} /> إضافة موظف
        </button>
      </div>
      <p className="text-[11px]" style={{ color: c.soft }}>إجمالي الموظفين: {employees.length} — جاري عرض {shown.length} من {filtered.length}</p>
      <SectionCard>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr style={{ color: c.soft, borderBottom: `1px solid ${c.line}` }}>
                <th className="text-start py-2 font-medium">الاسم</th>
                <th className="text-start py-2 font-medium">الكود</th>
                <th className="text-start py-2 font-medium">السن</th>
                <th className="text-start py-2 font-medium">الوظيفة</th>
                <th className="text-start py-2 font-medium">القسم</th>
                <th className="text-start py-2 font-medium">المحطة</th>
                <th className="text-start py-2 font-medium">الوردية</th>
              </tr>
            </thead>
            <tbody>
              {shown.map((e, i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${c.line}` }}>
                  <td className="py-2.5 font-semibold" style={{ color: c.text }}>{e.name}</td>
                  <td className="py-2.5 font-mono" style={{ color: c.soft }}>{e.code || "—"}</td>
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
        {visible < filtered.length && (
          <button onClick={() => setVisible((v) => v + 50)} className="w-full mt-3 py-2 rounded-lg text-xs font-bold" style={{ background: c.cardAlt, color: c.blue, border: `1px solid ${c.line}` }}>
            تحميل 50 موظف إضافي ({filtered.length - visible} متبقي)
          </button>
        )}
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
  const [q, setQ] = useState("");
  const [visible, setVisible] = useState(50);

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

  const filtered = q ? payroll.filter((p) => p.employee.includes(q)) : payroll;
  const shown = filtered.slice(0, visible);
  const totalNet = payroll.reduce((s, p) => s + p.salary + p.incentives + p.disbursement + p.allowance - p.deduction, 0);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between flex-wrap gap-2">
        <div className="relative max-w-xs">
          <Search size={16} className="absolute top-1/2 -translate-y-1/2 right-3" color={c.soft} />
          <input
            value={q} onChange={(e) => { setQ(e.target.value); setVisible(50); }} placeholder="بحث باسم الموظف..."
            className="w-full pr-10 pl-3 py-2 rounded-lg text-xs" style={inputStyle}
          />
        </div>
        <button onClick={() => setModal(true)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold" style={{ background: c.blue, color: c.bg }}>
          <Plus size={19} /> إضافة استحقاق
        </button>
      </div>
      <KpiCard label="إجمالي صافي الاستحقاقات (كل الموظفين)" value={totalNet.toLocaleString()} sub="ج.م" color={c.blue} icon={Wallet} />
      <p className="text-[11px]" style={{ color: c.soft }}>إجمالي السجلات: {payroll.length} — جاري عرض {shown.length} من {filtered.length}</p>
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
              {shown.map((p) => {
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
        {visible < filtered.length && (
          <button onClick={() => setVisible((v) => v + 50)} className="w-full mt-3 py-2 rounded-lg text-xs font-bold" style={{ background: c.cardAlt, color: c.blue, border: `1px solid ${c.line}` }}>
            تحميل 50 سجل إضافي ({filtered.length - visible} متبقي)
          </button>
        )}
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

function HRReportsTab({ employees, payroll, training, recruitment }) {
  const totalNet = payroll.reduce((s, p) => s + p.salary + p.incentives + p.disbursement + p.allowance - p.deduction, 0);
  const avgNet = payroll.length ? Math.round(totalNet / payroll.length) : 0;
  const totalDeductions = payroll.reduce((s, p) => s + p.deduction, 0);

  const byDept = Object.entries(
    employees.reduce((acc, e) => {
      const key = e.department || "غير محدد";
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value], i) => ({ name, value, color: [c.blue, c.cyan, c.purple, c.amber, c.green][i % 5] }));

  const openTrainingCount = training.filter((t) => t.status !== "closed").length;
  const openHiringSlots = recruitment.filter((r) => r.status !== "closed").reduce((s, r) => s + r.count, 0);

  const topEarners = [...payroll]
    .map((p) => ({ m: p.employee.split(" ")[0], v: p.salary + p.incentives + p.disbursement + p.allowance - p.deduction }))
    .sort((a, b) => b.v - a.v)
    .slice(0, 8);

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="إجمالي عدد الموظفين" value={employees.length} sub="موظف" color={c.blue} icon={Users} />
        <KpiCard label="إجمالي صافي الاستحقاقات" value={totalNet.toLocaleString()} sub="ج.م/شهريًا" color={c.green} icon={Wallet} />
        <KpiCard label="متوسط صافي الموظف" value={avgNet.toLocaleString()} sub="ج.م" color={c.cyan} icon={Wallet} />
        <KpiCard label="إجمالي الخصومات" value={totalDeductions.toLocaleString()} sub="ج.م" color={c.red} icon={AlertTriangle} />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-2 gap-4">
        <KpiCard label="دورات تدريبية قيد التنفيذ" value={openTrainingCount} sub="دورة" color={c.amber} icon={Sparkles} />
        <KpiCard label="وظائف شاغرة مطلوب شغلها" value={openHiringSlots} sub="وظيفة" color={c.purple} icon={UserPlus} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SectionCard>
          <p className="font-bold text-sm mb-3" style={{ color: c.text }}>توزيع الموظفين حسب القسم</p>
          {byDept.length === 0 ? (
            <p className="text-xs" style={{ color: c.soft }}>لا توجد بيانات بعد</p>
          ) : (
            <div className="flex items-center gap-4">
              <div className="w-32 h-32 shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={byDept} dataKey="value" innerRadius={36} outerRadius={56} paddingAngle={3}>
                      {byDept.map((d, i) => <Cell key={i} fill={d.color} stroke="none" />)}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-col gap-2 text-xs">
                {byDept.map((d, i) => (
                  <span key={i} className="flex items-center gap-2" style={{ color: c.text }}>
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} /> {d.name}: {d.value}
                  </span>
                ))}
              </div>
            </div>
          )}
        </SectionCard>

        <SectionCard>
          <p className="font-bold text-sm mb-3" style={{ color: c.text }}>أعلى الموظفين صافي استحقاق</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={topEarners}>
              <CartesianGrid stroke={c.line} vertical={false} />
              <XAxis dataKey="m" tick={{ fontSize: 10, fill: c.soft }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: c.soft }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: c.cardAlt, border: `1px solid ${c.line}`, fontSize: 11 }} />
              <Bar dataKey="v" fill={c.green} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </SectionCard>
      </div>
    </div>
  );
}

function HRSection({ employees, setEmployees, stations, payroll, setPayroll, training, setTraining, recruitment, setRecruitment }) {
  const [tab, setTab] = useState("org");
  const tabs = [
    ["org", "الهيكل الإداري"],
    ["entitlements", "الاستحقاقات"],
    ["training", "التدريب والتوظيف"],
    ["reports", "التقرير والإحصاء"],
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
      {tab === "reports" && <HRReportsTab employees={employees} payroll={payroll} training={training} recruitment={recruitment} />}
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

function SafetyReportsTab({ incidents, ppe, inspections }) {
  const openIncidents = incidents.filter((i) => i.status !== "closed").length;
  const closedIncidents = incidents.length - openIncidents;
  const incidentResolutionRate = incidents.length ? Math.round((closedIncidents / incidents.length) * 100) : 0;

  const severityBreakdown = [
    { name: "عالية", value: incidents.filter((i) => i.severity === "high").length, color: c.red },
    { name: "متوسطة", value: incidents.filter((i) => i.severity === "med").length, color: c.amber },
    { name: "منخفضة", value: incidents.filter((i) => i.severity === "low").length, color: c.green },
  ];

  const passCount = inspections.filter((i) => i.result === "pass").length;
  const failCount = inspections.filter((i) => i.result === "fail").length;
  const pendingCount = inspections.filter((i) => i.result === "pending").length;
  const passRate = inspections.length ? Math.round((passCount / inspections.length) * 100) : 0;

  const lowPpeCount = ppe.filter((p) => p.quantity <= p.minThreshold).length;
  const ppeHealth = ppe.length ? Math.round(((ppe.length - lowPpeCount) / ppe.length) * 100) : 100;

  const incidentsByStation = Object.entries(
    incidents.reduce((acc, i) => {
      acc[i.station] = (acc[i.station] || 0) + 1;
      return acc;
    }, {})
  ).map(([m, v]) => ({ m, v }));

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="إجمالي حوادث العمل" value={incidents.length} sub={`${openIncidents} مفتوح`} color={c.red} icon={AlertTriangle} />
        <KpiCard label="نسبة إغلاق الحوادث" value={`${incidentResolutionRate}%`} sub={`${closedIncidents} من ${incidents.length}`} color={c.green} icon={Check} />
        <KpiCard label="نسبة نجاح فحوصات السلامة" value={`${passRate}%`} sub={`${passCount} ناجح، ${failCount} فاشل`} color={passRate >= 80 ? c.green : c.amber} icon={ShieldAlert} />
        <KpiCard label="سلامة مخزون معدات الحماية" value={`${ppeHealth}%`} sub={lowPpeCount ? `${lowPpeCount} صنف منخفض` : "كل الأصناف سليمة"} color={ppeHealth >= 80 ? c.green : c.red} icon={Shield} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SectionCard>
          <p className="font-bold text-sm mb-3" style={{ color: c.text }}>توزيع الحوادث حسب درجة الخطورة</p>
          <div className="flex items-center gap-4">
            <div className="w-32 h-32 shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={severityBreakdown} dataKey="value" innerRadius={36} outerRadius={56} paddingAngle={3}>
                    {severityBreakdown.map((d, i) => <Cell key={i} fill={d.color} stroke="none" />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col gap-2 text-xs">
              {severityBreakdown.map((d, i) => (
                <span key={i} className="flex items-center gap-2" style={{ color: c.text }}>
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} /> {d.name}: {d.value}
                </span>
              ))}
            </div>
          </div>
        </SectionCard>

        <SectionCard>
          <p className="font-bold text-sm mb-3" style={{ color: c.text }}>عدد الحوادث حسب المحطة</p>
          {incidentsByStation.length === 0 ? (
            <p className="text-xs" style={{ color: c.soft }}>لا توجد بيانات بعد</p>
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={incidentsByStation}>
                <CartesianGrid stroke={c.line} vertical={false} />
                <XAxis dataKey="m" tick={{ fontSize: 10, fill: c.soft }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: c.soft }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: c.cardAlt, border: `1px solid ${c.line}`, fontSize: 11 }} />
                <Bar dataKey="v" fill={c.red} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </SectionCard>
      </div>
    </div>
  );
}

function SafetySection({ incidents, setIncidents, ppe, setPpe, inspections, setInspections, stations }) {
  const [tab, setTab] = useState("incidents");
  const tabs = [
    ["incidents", "حوادث العمل"],
    ["ppe", "معدات الحماية"],
    ["inspections", "الفحص الدوري"],
    ["reports", "التقرير والإحصاء"],
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
      {tab === "reports" && <SafetyReportsTab incidents={incidents} ppe={ppe} inspections={inspections} />}
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

const billsSeed2 = [
  { id: "BL-001", citizen: "أحمد سيد", account: "AC-100234", zone: "فوة", month: "يونيو 2026", amount: 184.5, status: "unpaid", dueDate: "2026-07-05" },
  { id: "BL-002", citizen: "سارة أحمد", account: "AC-100871", zone: "قلين", month: "يونيو 2026", amount: 121.0, status: "paid", dueDate: "2026-07-05" },
  { id: "BL-003", citizen: "محمد كامل", account: "AC-100456", zone: "كفر الشيخ", month: "يونيو 2026", amount: 256.0, status: "unpaid", dueDate: "2026-07-05" },
  { id: "BL-004", citizen: "يارا محمود", account: "AC-100789", zone: "دسوق", month: "يونيو 2026", amount: 98.75, status: "paid", dueDate: "2026-07-05" },
  { id: "BL-005", citizen: "عمر سامي", account: "AC-101023", zone: "فوة", month: "يونيو 2026", amount: 145.0, status: "overdue", dueDate: "2026-06-05" },
  { id: "BL-006", citizen: "منى حسن", account: "AC-101245", zone: "مطوبس", month: "يونيو 2026", amount: 167.5, status: "paid", dueDate: "2026-07-05" },
  { id: "BL-007", citizen: "كريم علي", account: "AC-101567", zone: "بلطيم", month: "يونيو 2026", amount: 89.0, status: "unpaid", dueDate: "2026-07-05" },
  { id: "BL-008", citizen: "هدى محمود", account: "AC-101890", zone: "الحامول", month: "يونيو 2026", amount: 203.25, status: "overdue", dueDate: "2026-06-05" },
];

function BillsTab({ bills, setBills, entries, setEntries }) {
  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [modal, setModal] = useState(false);

  const filtered = bills.filter((b) => {
    const matchQ = !q || b.citizen.includes(q) || b.account.includes(q);
    const matchS = statusFilter === "all" || b.status === statusFilter;
    return matchQ && matchS;
  });

  const totalPaid = bills.filter((b) => b.status === "paid").reduce((s, b) => s + b.amount, 0);
  const totalUnpaid = bills.filter((b) => b.status !== "paid").reduce((s, b) => s + b.amount, 0);
  const collectionRate = bills.length ? Math.round((bills.filter((b) => b.status === "paid").length / bills.length) * 100) : 0;

  const payBill = (id) => {
    const bill = bills.find((b) => b.id === id);
    if (!bill) return;
    setBills((prev) => prev.map((b) => b.id === id ? { ...b, status: "paid" } : b));
    const now = new Date().toISOString().split("T")[0];
    setEntries((prev) => [...prev, {
      id: `RV-${Date.now()}`, date: now,
      source: `فاتورة ${bill.citizen} — ${bill.account}`,
      amount: bill.amount,
    }]);
  };

  const addBill = (data) => {
    setBills((prev) => [...prev, { ...data, amount: Number(data.amount) || 0, status: "unpaid" }]);
    setModal(false);
  };

  const statusMap = {
    paid: { label: "مدفوعة", color: c.green, bg: "#173C2A" },
    unpaid: { label: "غير مدفوعة", color: c.amber, bg: "#3C2F12" },
    overdue: { label: "متأخرة", color: c.red, bg: "#3C1C1C" },
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="إجمالي الفواتير" value={bills.length} sub="فاتورة" color={c.blue} icon={Wallet} />
        <KpiCard label="نسبة التحصيل" value={`${collectionRate}%`} sub={`${bills.filter(b=>b.status==="paid").length} مدفوعة`} color={collectionRate >= 70 ? c.green : c.amber} icon={Check} />
        <KpiCard label="محصّل" value={totalPaid.toLocaleString()} sub="ج.م" color={c.green} icon={Wallet} />
        <KpiCard label="متبقي للتحصيل" value={totalUnpaid.toLocaleString()} sub="ج.م" color={c.red} icon={AlertTriangle} />
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        <div className="relative flex-1 max-w-xs">
          <Search size={16} className="absolute top-1/2 -translate-y-1/2 right-3" color={c.soft} />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="بحث بالاسم أو رقم الحساب..."
            className="w-full pr-9 pl-3 py-2 rounded-lg text-xs" style={inputStyle} />
        </div>
        {["all","paid","unpaid","overdue"].map((s) => (
          <button key={s} onClick={() => setStatusFilter(s)}
            className="px-3 py-1.5 rounded-lg text-xs font-bold"
            style={{ background: statusFilter===s ? c.blue : c.card, color: statusFilter===s ? c.bg : c.soft, border:`1px solid ${c.line}` }}>
            {s==="all" ? "الكل" : statusMap[s]?.label}
          </button>
        ))}
        <button onClick={() => setModal(true)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold ms-auto" style={{ background: c.blue, color: c.bg }}>
          <Plus size={17} /> فاتورة جديدة
        </button>
      </div>

      <SectionCard>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr style={{ color: c.soft, borderBottom: `1px solid ${c.line}` }}>
                <th className="text-start py-2 font-medium">المواطن</th>
                <th className="text-start py-2 font-medium">رقم الحساب</th>
                <th className="text-start py-2 font-medium">المنطقة</th>
                <th className="text-start py-2 font-medium">الشهر</th>
                <th className="text-start py-2 font-medium">المبلغ</th>
                <th className="text-start py-2 font-medium">تاريخ الاستحقاق</th>
                <th className="text-start py-2 font-medium">الحالة</th>
                <th className="text-start py-2 font-medium">إجراء</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((b) => (
                <tr key={b.id} style={{ borderBottom: `1px solid ${c.line}` }}>
                  <td className="py-2.5 font-semibold" style={{ color: c.text }}>{b.citizen}</td>
                  <td className="py-2.5 font-mono" style={{ color: c.soft }}>{b.account}</td>
                  <td className="py-2.5" style={{ color: c.text }}>{b.zone}</td>
                  <td className="py-2.5" style={{ color: c.text }}>{b.month}</td>
                  <td className="py-2.5 font-mono font-bold" style={{ color: c.text }}>{b.amount.toLocaleString()} ج.م</td>
                  <td className="py-2.5 font-mono" style={{ color: b.status==="overdue" ? c.red : c.soft }}>{b.dueDate}</td>
                  <td className="py-2.5">
                    <span className="px-2 py-1 rounded-full text-[11px] font-bold"
                      style={{ background: statusMap[b.status]?.bg, color: statusMap[b.status]?.color }}>
                      {statusMap[b.status]?.label}
                    </span>
                  </td>
                  <td className="py-2.5">
                    {b.status !== "paid" && (
                      <button onClick={() => payBill(b.id)}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-bold"
                        style={{ background: c.green, color: c.bg }}>
                        تسجيل دفع
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      {modal && (
        <FormModal
          title="إضافة فاتورة جديدة"
          fields={[
            { key: "id", label: "كود الفاتورة", required: true },
            { key: "citizen", label: "اسم المواطن", required: true },
            { key: "account", label: "رقم الحساب", required: true },
            { key: "zone", label: "المنطقة", required: true },
            { key: "month", label: "الشهر (مثال: يونيو 2026)", required: true },
            { key: "amount", label: "المبلغ (ج.م)", required: true },
            { key: "dueDate", label: "تاريخ الاستحقاق", type: "date", required: true },
          ]}
          onClose={() => setModal(false)}
          onSave={addBill}
        />
      )}
    </div>
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

/* ---------------------------------------------------------------
   Section: Quality & Lab
----------------------------------------------------------------*/

function LabResultsTab({ results, setResults, stations }) {
  const [modal, setModal] = useState(false);

  const getAutoStatus = (r) => {
    if (r.turbidity > 1.5 || r.chlorine < 0.2 || r.pH < 6.5 || r.pH > 8.5 || r.nitrate > 20) return "fail";
    if (r.turbidity > 1.0 || r.nitrate > 15) return "warning";
    return "pass";
  };

  const addResult = (data) => {
    const row = {
      ...data,
      turbidity: Number(data.turbidity) || 0,
      pH: Number(data.pH) || 7,
      chlorine: Number(data.chlorine) || 0,
      iron: Number(data.iron) || 0,
      nitrate: Number(data.nitrate) || 0,
    };
    row.status = getAutoStatus(row);
    setResults((prev) => [...prev, row]);
    setModal(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <button onClick={() => setModal(true)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold" style={{ background: c.blue, color: c.bg }}>
          <Plus size={19} /> إضافة نتيجة تحليل
        </button>
      </div>
      <SectionCard>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr style={{ color: c.soft, borderBottom: `1px solid ${c.line}` }}>
                <th className="text-start py-2 font-medium">المحطة</th>
                <th className="text-start py-2 font-medium">التاريخ</th>
                <th className="text-start py-2 font-medium">العكارة</th>
                <th className="text-start py-2 font-medium">pH</th>
                <th className="text-start py-2 font-medium">الكلور</th>
                <th className="text-start py-2 font-medium">الحديد</th>
                <th className="text-start py-2 font-medium">النترات</th>
                <th className="text-start py-2 font-medium">النتيجة</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r) => (
                <tr key={r.id} style={{ borderBottom: `1px solid ${c.line}` }}>
                  <td className="py-2.5 font-semibold" style={{ color: c.text }}>{r.station}</td>
                  <td className="py-2.5 font-mono" style={{ color: c.soft }}>{r.date}</td>
                  <td className="py-2.5 font-mono" style={{ color: r.turbidity > 1.5 ? c.red : c.text }}>{r.turbidity}</td>
                  <td className="py-2.5 font-mono" style={{ color: (r.pH < 6.5 || r.pH > 8.5) ? c.red : c.text }}>{r.pH}</td>
                  <td className="py-2.5 font-mono" style={{ color: r.chlorine < 0.2 ? c.red : c.text }}>{r.chlorine}</td>
                  <td className="py-2.5 font-mono" style={{ color: c.text }}>{r.iron}</td>
                  <td className="py-2.5 font-mono" style={{ color: r.nitrate > 20 ? c.red : c.text }}>{r.nitrate}</td>
                  <td className="py-2.5"><StatusTag status={r.status || getAutoStatus(r)} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-wrap gap-4 mt-3 text-[10px]" style={{ color: c.soft }}>
          <span>العكارة: {"<"}1.0 NTU مقبول</span>
          <span>pH: 6.5–8.5</span>
          <span>الكلور: 0.2–1.0 مج/ل</span>
          <span>النترات: {"<"}20 مج/ل</span>
        </div>
      </SectionCard>

      {modal && (
        <FormModal
          title="إضافة نتيجة تحليل"
          fields={[
            { key: "id", label: "كود التحليل", required: true },
            { key: "station", label: "المحطة", type: "select", options: stations.map((s) => ({ value: s.name, label: s.name })) },
            { key: "date", label: "التاريخ", type: "date", required: true },
            { key: "type", label: "نوع التحليل", type: "select", default: "chemical", options: [{ value: "chemical", label: "كيميائي" }, { value: "bacteriological", label: "بكتريولوجي" }] },
            { key: "turbidity", label: "العكارة (NTU)", required: true },
            { key: "pH", label: "pH", required: true },
            { key: "chlorine", label: "الكلور (مج/ل)", required: true },
            { key: "iron", label: "الحديد (مج/ل)", default: "0" },
            { key: "nitrate", label: "النترات (مج/ل)", default: "0" },
          ]}
          onClose={() => setModal(false)}
          onSave={addResult}
        />
      )}
    </div>
  );
}

function LabReportsTab({ results }) {
  const passCount = results.filter((r) => r.status === "pass").length;
  const failCount = results.filter((r) => r.status === "fail").length;
  const warnCount = results.filter((r) => r.status === "warning").length;
  const passRate = results.length ? Math.round((passCount / results.length) * 100) : 100;
  const avgPH = results.length ? (results.reduce((s, r) => s + r.pH, 0) / results.length).toFixed(2) : "-";
  const avgCl = results.length ? (results.reduce((s, r) => s + r.chlorine, 0) / results.length).toFixed(2) : "-";
  const avgTurb = results.length ? (results.reduce((s, r) => s + r.turbidity, 0) / results.length).toFixed(2) : "-";

  const statusBreakdown = [
    { name: "ناجح", value: passCount, color: c.green },
    { name: "تحذير", value: warnCount, color: c.amber },
    { name: "فاشل", value: failCount, color: c.red },
  ];

  const phData = results.map((r) => ({ m: r.station.split(" ")[0], v: r.pH }));

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="نسبة التوافق مع المعايير" value={`${passRate}%`} sub={`${passCount} من ${results.length}`} color={passRate >= 90 ? c.green : c.amber} icon={FlaskConical} />
        <KpiCard label="متوسط pH" value={avgPH} sub="المعدل الآمن 6.5-8.5" color={c.blue} icon={FlaskConical} />
        <KpiCard label="متوسط الكلور (مج/ل)" value={avgCl} sub="المعدل الآمن 0.2-1.0" color={c.cyan} icon={FlaskConical} />
        <KpiCard label="متوسط العكارة (NTU)" value={avgTurb} sub="المعدل الآمن < 1.0" color={Number(avgTurb) < 1 ? c.green : c.red} icon={FlaskConical} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SectionCard>
          <p className="font-bold text-sm mb-3" style={{ color: c.text }}>توزيع نتائج التحاليل</p>
          <div className="flex items-center gap-4">
            <div className="w-32 h-32 shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={statusBreakdown} dataKey="value" innerRadius={36} outerRadius={56} paddingAngle={3}>
                    {statusBreakdown.map((d, i) => <Cell key={i} fill={d.color} stroke="none" />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col gap-2 text-xs">
              {statusBreakdown.map((d, i) => (
                <span key={i} className="flex items-center gap-2" style={{ color: c.text }}>
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} /> {d.name}: {d.value}
                </span>
              ))}
            </div>
          </div>
        </SectionCard>
        <SectionCard>
          <p className="font-bold text-sm mb-3" style={{ color: c.text }}>قيم pH حسب المحطة</p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={phData}>
              <CartesianGrid stroke={c.line} vertical={false} />
              <XAxis dataKey="m" tick={{ fontSize: 10, fill: c.soft }} axisLine={false} tickLine={false} />
              <YAxis domain={[6, 9]} tick={{ fontSize: 10, fill: c.soft }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: c.cardAlt, border: `1px solid ${c.line}`, fontSize: 11 }} />
              <Bar dataKey="v" fill={c.cyan} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </SectionCard>
      </div>
    </div>
  );
}

function LabSection({ results, setResults, stations }) {
  const [tab, setTab] = useState("results");
  const tabs = [["results", "نتائج التحاليل"], ["reports", "التقرير والإحصاء"]];
  return (
    <div className="flex flex-col gap-4">
      <PageHeader title="الجودة والمعامل" />
      <div className="flex gap-2 flex-wrap">
        {tabs.map(([k, l]) => (
          <button key={k} onClick={() => setTab(k)} className="px-3 py-1.5 rounded-lg text-xs font-bold"
            style={{ background: tab === k ? c.blue : c.card, color: tab === k ? c.bg : c.soft, border: `1px solid ${c.line}` }}>
            {l}
          </button>
        ))}
      </div>
      {tab === "results" && <LabResultsTab results={results} setResults={setResults} stations={stations} />}
      {tab === "reports" && <LabReportsTab results={results} />}
    </div>
  );
}


function RevenueSection({ entries, setEntries, readings, setReadings, billingComplaints, setBillingComplaints, estimates, setEstimates, bills, setBills }) {
  const [tab, setTab] = useState("bills");
  const tabs = [
    ["bills", "الفواتير"],
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

      {tab === "bills" && <BillsTab bills={bills} setBills={setBills} entries={entries} setEntries={setEntries} />}
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

function ComplaintsListTab({ complaints, setComplaints }) {
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

function ComplaintsReportsTab({ complaints }) {
  const total = complaints.length;
  const closed = complaints.filter((c) => c.status === "closed").length;
  const open = complaints.filter((c) => c.status === "open").length;
  const inProgress = complaints.filter((c) => c.status === "inProgress").length;
  const resolutionRate = total ? Math.round((closed / total) * 100) : 0;

  const byType = Object.entries(
    complaints.reduce((acc, cm) => {
      acc[cm.type] = (acc[cm.type] || 0) + 1;
      return acc;
    }, {})
  ).map(([m, v]) => ({ m, v }));

  const priorityBreakdown = [
    { name: "عالية", value: complaints.filter((c) => c.priority === "high").length, color: c.red },
    { name: "متوسطة", value: complaints.filter((c) => c.priority === "med").length, color: c.amber },
    { name: "منخفضة", value: complaints.filter((c) => c.priority === "low").length, color: c.green },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="إجمالي الشكاوى" value={total} sub="شكوى" color={c.blue} icon={Headphones} />
        <KpiCard label="نسبة الحل" value={`${resolutionRate}%`} sub={`${closed} من ${total}`} color={c.green} icon={Check} />
        <KpiCard label="مفتوحة" value={open} sub="بانتظار المتابعة" color={c.red} icon={AlertTriangle} />
        <KpiCard label="جاري العمل عليها" value={inProgress} sub="شكوى" color={c.amber} icon={Wrench} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SectionCard>
          <p className="font-bold text-sm mb-3" style={{ color: c.text }}>الشكاوى حسب النوع</p>
          {byType.length === 0 ? (
            <p className="text-xs" style={{ color: c.soft }}>لا توجد بيانات بعد</p>
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={byType}>
                <CartesianGrid stroke={c.line} vertical={false} />
                <XAxis dataKey="m" tick={{ fontSize: 10, fill: c.soft }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: c.soft }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: c.cardAlt, border: `1px solid ${c.line}`, fontSize: 11 }} />
                <Bar dataKey="v" fill={c.purple} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </SectionCard>

        <SectionCard>
          <p className="font-bold text-sm mb-3" style={{ color: c.text }}>التوزيع حسب الأولوية</p>
          <div className="flex items-center gap-4">
            <div className="w-32 h-32 shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={priorityBreakdown} dataKey="value" innerRadius={36} outerRadius={56} paddingAngle={3}>
                    {priorityBreakdown.map((d, i) => <Cell key={i} fill={d.color} stroke="none" />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col gap-2 text-xs">
              {priorityBreakdown.map((d, i) => (
                <span key={i} className="flex items-center gap-2" style={{ color: c.text }}>
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} /> {d.name}: {d.value}
                </span>
              ))}
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

function ComplaintsSection({ complaints, setComplaints }) {
  const [tab, setTab] = useState("list");
  const tabs = [
    ["list", "الشكاوى"],
    ["reports", "التقرير والإحصاء"],
  ];

  return (
    <div className="flex flex-col gap-4">
      <PageHeader title="خدمة العملاء والشكاوى" />
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
      {tab === "list" && <ComplaintsListTab complaints={complaints} setComplaints={setComplaints} />}
      {tab === "reports" && <ComplaintsReportsTab complaints={complaints} />}
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

function ReportsSection({ stations, orders, parts, complaints, incidents, ppe, inspections, labResults, alerts, employees, payroll, entries, labData }) {

  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    ["overview", "نظرة عامة"],
    ["operations", "التشغيل"],
    ["maintenance", "الصيانة"],
    ["quality", "الجودة"],
    ["complaints", "الشكاوى"],
    ["safety", "السلامة"],
    ["hr", "الموارد البشرية"],
    ["revenue", "الإيرادات"],
  ];

  // ── Overview KPIs ──
  const onlineRate = stations.length ? Math.round((stations.filter(s=>s.status==="online").length / stations.length)*100) : 0;
  const maintenanceCompletionRate = orders.length ? Math.round((orders.filter(o=>o.status==="closed").length / orders.length)*100) : 0;
  const complaintsResRate = complaints.length ? Math.round((complaints.filter(c=>c.status==="closed").length / complaints.length)*100) : 0;
  const labPassRate = labResults?.length ? Math.round((labResults.filter(r=>r.status==="pass").length / labResults.length)*100) : 0;
  const safetyRate = incidents.length ? Math.round((incidents.filter(i=>i.status==="closed").length / incidents.length)*100) : 100;
  const overallScore = Math.round((onlineRate + maintenanceCompletionRate + complaintsResRate + labPassRate + safetyRate) / 5);

  // ── Station flow by center ──
  const flowByCenter = Object.entries(
    stations.reduce((acc, s) => { const k = s.center||"غير محدد"; acc[k]=(acc[k]||0)+(s.flow||0); return acc;},{})
  ).map(([m,v])=>({m,v})).sort((a,b)=>b.v-a.v).slice(0,8);

  // ── Complaints trend (simulated) ──
  const complaintsTrend = [
    {m:"يناير",v:18},{m:"فبراير",v:22},{m:"مارس",v:15},{m:"أبريل",v:28},{m:"مايو",v:20},{m:"يونيو",v:complaints.length||14},
  ];

  // ── Revenue trend ──
  const revTrend = revenueByMonth;

  // ── Payroll by department ──
  const payrollByDept = Object.entries(
    payroll.reduce((acc, p) => {
      const emp = employees.find(e=>e.name===p.employee);
      const dept = emp?.department || "غير محدد";
      acc[dept] = (acc[dept]||0) + (p.salary+p.incentives+p.disbursement+p.allowance-p.deduction);
      return acc;
    },{})
  ).map(([m,v])=>({m,v})).slice(0,6);

  const renderTab = () => {
    switch(activeTab) {
      case "overview": return (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            <KpiCard label="نسبة التشغيل" value={`${onlineRate}%`} sub={`${stations.filter(s=>s.status==="online").length} محطة عاملة`} color={onlineRate>=90?c.green:c.amber} icon={Droplets} />
            <KpiCard label="إنجاز الصيانة" value={`${maintenanceCompletionRate}%`} sub={`${orders.filter(o=>o.status==="closed").length} من ${orders.length}`} color={c.amber} icon={Wrench} />
            <KpiCard label="حل الشكاوى" value={`${complaintsResRate}%`} sub="من الشكاوى المسجلة" color={c.purple} icon={Headphones} />
            <KpiCard label="سلامة المياه" value={`${labPassRate}%`} sub="نتائج تحاليل ناجحة" color={labPassRate>=90?c.green:c.red} icon={FlaskConical} />
            <KpiCard label="السلامة المهنية" value={`${safetyRate}%`} sub="حوادث مغلقة" color={c.green} icon={ShieldAlert} />
            <div className="rounded-xl px-4 py-3 flex flex-col items-center justify-center gap-1" style={{ background: c.card, border:`2px solid ${overallScore>=80?c.green:overallScore>=60?c.amber:c.red}` }}>
              <span className="text-[11px]" style={{ color: c.soft }}>الأداء العام للشركة</span>
              <span className="font-mono font-extrabold text-3xl" style={{ color: overallScore>=80?c.green:overallScore>=60?c.amber:c.red }}>{overallScore}%</span>
              <span className="text-[11px] font-bold" style={{ color: overallScore>=80?c.green:overallScore>=60?c.amber:c.red }}>
                {overallScore>=80?"ممتاز":overallScore>=60?"جيد":"يحتاج تحسين"}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <SectionCard>
              <p className="font-bold text-sm mb-3" style={{ color: c.text }}>اتجاه الشكاوى (6 أشهر)</p>
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={complaintsTrend}>
                  <CartesianGrid stroke={c.line} vertical={false} />
                  <XAxis dataKey="m" tick={{ fontSize: 10, fill: c.soft }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: c.soft }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: c.cardAlt, border:`1px solid ${c.line}`, fontSize: 11 }} />
                  <Line type="monotone" dataKey="v" stroke={c.purple} strokeWidth={2.5} dot={{ fill: c.amber, r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </SectionCard>
            <SectionCard>
              <p className="font-bold text-sm mb-3" style={{ color: c.text }}>الإيرادات الشهرية (ج.م)</p>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={revTrend}>
                  <CartesianGrid stroke={c.line} vertical={false} />
                  <XAxis dataKey="m" tick={{ fontSize: 10, fill: c.soft }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: c.soft }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: c.cardAlt, border:`1px solid ${c.line}`, fontSize: 11 }} />
                  <Bar dataKey="v" fill={c.green} radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </SectionCard>
          </div>
        </div>
      );

      case "operations": return (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <KpiCard label="إجمالي المحطات" value={stations.length} sub="محطة ورافع" color={c.blue} icon={Droplets} />
            <KpiCard label="عاملة" value={stations.filter(s=>s.status==="online").length} sub={`${onlineRate}%`} color={c.green} icon={Shield} />
            <KpiCard label="متوقفة" value={stations.filter(s=>s.status==="offline").length} sub="" color={c.red} icon={AlertTriangle} />
            <KpiCard label="صرف صحي" value={stations.filter(s=>s.type==="sewage").length} sub="محطة" color={c.cyan} icon={Droplets} />
          </div>
          <SectionCard>
            <p className="font-bold text-sm mb-3" style={{ color: c.text }}>التصرف اليومي حسب المركز (م³)</p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={flowByCenter}>
                <CartesianGrid stroke={c.line} vertical={false} />
                <XAxis dataKey="m" tick={{ fontSize: 10, fill: c.soft }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: c.soft }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: c.cardAlt, border:`1px solid ${c.line}`, fontSize: 11 }} />
                <Bar dataKey="v" fill={c.blue} radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </SectionCard>
        </div>
      );

      case "maintenance": return (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <KpiCard label="إجمالي أوامر العمل" value={orders.length} sub="" color={c.blue} icon={Wrench} />
            <KpiCard label="مغلقة" value={orders.filter(o=>o.status==="closed").length} sub={`${maintenanceCompletionRate}%`} color={c.green} icon={Check} />
            <KpiCard label="جاري العمل" value={orders.filter(o=>o.status==="inProgress").length} sub="" color={c.amber} icon={Activity} />
            <KpiCard label="قطع غيار منخفضة" value={parts.filter(p=>p.quantity<=p.minThreshold).length} sub="صنف" color={c.red} icon={AlertTriangle} />
          </div>
          <SectionCard>
            <p className="font-bold text-sm mb-3" style={{ color: c.text }}>توزيع أوامر الصيانة حسب المحطة</p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={Object.entries(orders.reduce((acc,o)=>{acc[o.station]=(acc[o.station]||0)+1;return acc},{})).map(([m,v])=>({m,v}))}>
                <CartesianGrid stroke={c.line} vertical={false} />
                <XAxis dataKey="m" tick={{ fontSize: 10, fill: c.soft }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: c.soft }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: c.cardAlt, border:`1px solid ${c.line}`, fontSize: 11 }} />
                <Bar dataKey="v" fill={c.amber} radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </SectionCard>
        </div>
      );

      case "quality": return (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <KpiCard label="إجمالي التحاليل" value={labResults?.length||0} sub="" color={c.blue} icon={FlaskConical} />
            <KpiCard label="ناجحة" value={labResults?.filter(r=>r.status==="pass").length||0} sub={`${labPassRate}%`} color={c.green} icon={Check} />
            <KpiCard label="تحذير" value={labResults?.filter(r=>r.status==="warning").length||0} sub="" color={c.amber} icon={AlertTriangle} />
            <KpiCard label="فاشلة" value={labResults?.filter(r=>r.status==="fail").length||0} sub="" color={c.red} icon={AlertTriangle} />
          </div>
          <SectionCard>
            <p className="font-bold text-sm mb-3" style={{ color: c.text }}>متوسط قيم pH حسب المحطة</p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={labResults?.map(r=>({m:r.station.split(" ")[0], v:r.pH}))||[]}>
                <CartesianGrid stroke={c.line} vertical={false} />
                <XAxis dataKey="m" tick={{ fontSize: 10, fill: c.soft }} axisLine={false} tickLine={false} />
                <YAxis domain={[6,9]} tick={{ fontSize: 10, fill: c.soft }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: c.cardAlt, border:`1px solid ${c.line}`, fontSize: 11 }} />
                <Bar dataKey="v" fill={c.cyan} radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </SectionCard>
        </div>
      );

      case "complaints": return (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <KpiCard label="إجمالي الشكاوى" value={complaints.length} sub="" color={c.purple} icon={Headphones} />
            <KpiCard label="مغلقة" value={complaints.filter(c=>c.status==="closed").length} sub={`${complaintsResRate}%`} color={c.green} icon={Check} />
            <KpiCard label="مفتوحة" value={complaints.filter(c=>c.status==="open").length} sub="" color={c.red} icon={AlertTriangle} />
            <KpiCard label="جاري العمل" value={complaints.filter(c=>c.status==="inProgress").length} sub="" color={c.amber} icon={Activity} />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <SectionCard>
              <p className="font-bold text-sm mb-3" style={{ color: c.text }}>الشكاوى حسب النوع</p>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={Object.entries(complaints.reduce((acc,cm)=>{acc[cm.type]=(acc[cm.type]||0)+1;return acc},{})).map(([m,v])=>({m,v}))}>
                  <CartesianGrid stroke={c.line} vertical={false} />
                  <XAxis dataKey="m" tick={{ fontSize: 10, fill: c.soft }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: c.soft }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: c.cardAlt, border:`1px solid ${c.line}`, fontSize: 11 }} />
                  <Bar dataKey="v" fill={c.purple} radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </SectionCard>
            <SectionCard>
              <p className="font-bold text-sm mb-3" style={{ color: c.text }}>اتجاه الشكاوى (6 أشهر)</p>
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={complaintsTrend}>
                  <CartesianGrid stroke={c.line} vertical={false} />
                  <XAxis dataKey="m" tick={{ fontSize: 10, fill: c.soft }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: c.soft }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: c.cardAlt, border:`1px solid ${c.line}`, fontSize: 11 }} />
                  <Line type="monotone" dataKey="v" stroke={c.purple} strokeWidth={2.5} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </SectionCard>
          </div>
        </div>
      );

      case "safety": return (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <KpiCard label="إجمالي الحوادث" value={incidents.length} sub="" color={c.red} icon={AlertTriangle} />
            <KpiCard label="مغلقة" value={incidents.filter(i=>i.status==="closed").length} sub={`${safetyRate}%`} color={c.green} icon={Check} />
            <KpiCard label="فحوصات ناجحة" value={inspections.filter(i=>i.result==="pass").length} sub="" color={c.green} icon={Shield} />
            <KpiCard label="معدات حماية منخفضة" value={ppe.filter(p=>p.quantity<=p.minThreshold).length} sub="صنف" color={c.amber} icon={ShieldAlert} />
          </div>
          <SectionCard>
            <p className="font-bold text-sm mb-3" style={{ color: c.text }}>الحوادث حسب المحطة</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={Object.entries(incidents.reduce((acc,i)=>{acc[i.station]=(acc[i.station]||0)+1;return acc},{})).map(([m,v])=>({m,v}))}>
                <CartesianGrid stroke={c.line} vertical={false} />
                <XAxis dataKey="m" tick={{ fontSize: 10, fill: c.soft }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: c.soft }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: c.cardAlt, border:`1px solid ${c.line}`, fontSize: 11 }} />
                <Bar dataKey="v" fill={c.red} radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </SectionCard>
        </div>
      );

      case "hr": return (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <KpiCard label="إجمالي الموظفين" value={employees.length} sub="" color={c.blue} icon={Users} />
            <KpiCard label="إجمالي الاستحقاقات" value={payroll.reduce((s,p)=>s+p.salary+p.incentives+p.disbursement+p.allowance-p.deduction,0).toLocaleString()} sub="ج.م" color={c.green} icon={Wallet} />
            <KpiCard label="متوسط الراتب" value={payroll.length?Math.round(payroll.reduce((s,p)=>s+p.salary,0)/payroll.length).toLocaleString():0} sub="ج.م" color={c.cyan} icon={Wallet} />
            <KpiCard label="إجمالي الخصومات" value={payroll.reduce((s,p)=>s+p.deduction,0).toLocaleString()} sub="ج.م" color={c.red} icon={AlertTriangle} />
          </div>
          <SectionCard>
            <p className="font-bold text-sm mb-3" style={{ color: c.text }}>الاستحقاقات حسب القسم</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={payrollByDept}>
                <CartesianGrid stroke={c.line} vertical={false} />
                <XAxis dataKey="m" tick={{ fontSize: 10, fill: c.soft }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: c.soft }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: c.cardAlt, border:`1px solid ${c.line}`, fontSize: 11 }} />
                <Bar dataKey="v" fill={c.green} radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </SectionCard>
        </div>
      );


      default: return null;
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <PageHeader title="التقارير والإحصائيات" />
      <div className="flex gap-2 flex-wrap">
        {tabs.map(([k, l]) => (
          <button key={k} onClick={() => setActiveTab(k)}
            className="px-3 py-1.5 rounded-lg text-xs font-bold"
            style={{ background: activeTab===k ? c.blue : c.card, color: activeTab===k ? c.bg : c.soft, border:`1px solid ${c.line}` }}>
            {l}
          </button>
        ))}
      </div>
      {renderTab()}
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

const ALL_SECTIONS = [
  { key: "home", label: "الرئيسية" },
  { key: "ops", label: "تشغيل المحطات" },
  { key: "revenue", label: "الإيرادات" },
  { key: "maintenance", label: "الصيانة" },
  { key: "gis", label: "GIS والشبكات" },
  { key: "hr", label: "الموارد البشرية" },
  { key: "safety", label: "السلامة والصحة المهنية" },
  { key: "lab", label: "الجودة والمعامل" },
  { key: "complaints", label: "خدمة العملاء والشكاوى" },
  { key: "ai", label: "المساعد الذكي" },
  { key: "reports", label: "التقارير والإحصائيات" },
  { key: "alerts", label: "الإنذارات" },
  { key: "users", label: "إدارة المستخدمين" },
  { key: "settings", label: "الإعدادات" },
];

const DEFAULT_PERMS = (role) => {
  if (role === "ADMIN") return Object.fromEntries(ALL_SECTIONS.map((s) => [s.key, true]));
  if (role === "EMPLOYEE") return Object.fromEntries(ALL_SECTIONS.map((s) => [s.key, ["home","ops","maintenance","safety","lab","complaints","ai","alerts","reports"].includes(s.key)]));
  return Object.fromEntries(ALL_SECTIONS.map((s) => [s.key, ["home","complaints","ai"].includes(s.key)]));
};

function UserFormModal({ initial, onClose, onSave }) {
  const isEdit = Boolean(initial?.id);
  const [form, setForm] = useState(initial || {
    name: "", email: "", phone: "", role: "EMPLOYEE", status: "active",
    permissions: DEFAULT_PERMS("EMPLOYEE"),
  });
  const [tab, setTab] = useState("info");

  const setAllPerms = (val) => setForm((f) => ({ ...f, permissions: Object.fromEntries(ALL_SECTIONS.map((s) => [s.key, val])) }));

  const handleSave = () => {
    onSave({ ...form, id: initial?.id || `U-${Date.now()}` });
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center px-4" style={{ background: "rgba(0,0,0,0.6)" }}>
      <div className="w-full max-w-lg rounded-xl p-5 relative max-h-[90vh] overflow-y-auto" style={{ background: c.card, border: `1px solid ${c.line}` }}>
        <button onClick={onClose} className="absolute top-4 left-4"><X size={22} color={c.soft} /></button>
        <p className="font-bold text-base mb-4" style={{ color: c.text }}>{isEdit ? "تعديل مستخدم" : "إضافة مستخدم جديد"}</p>

        <div className="flex gap-2 mb-4">
          {[["info","البيانات الأساسية"],["perms","الصلاحيات"]].map(([k,l]) => (
            <button key={k} onClick={() => setTab(k)} className="px-3 py-1.5 rounded-lg text-xs font-bold"
              style={{ background: tab===k ? c.blue : c.cardAlt, color: tab===k ? c.bg : c.soft, border:`1px solid ${c.line}` }}>
              {l}
            </button>
          ))}
        </div>

        {tab === "info" && (
          <div className="flex flex-col gap-3">
            <input placeholder="الاسم الكامل" required value={form.name}
              onChange={(e) => setForm({...form, name:e.target.value})}
              className="px-3 py-2 rounded-lg text-sm" style={inputStyle} />
            <input placeholder="البريد الإلكتروني" type="email" value={form.email}
              onChange={(e) => setForm({...form, email:e.target.value})}
              className="px-3 py-2 rounded-lg text-sm" style={inputStyle} />
            <input placeholder="رقم الهاتف" value={form.phone || ""}
              onChange={(e) => setForm({...form, phone:e.target.value})}
              className="px-3 py-2 rounded-lg text-sm" style={inputStyle} />
            <select value={form.role}
              onChange={(e) => setForm({...form, role:e.target.value, permissions: DEFAULT_PERMS(e.target.value)})}
              className="px-3 py-2 rounded-lg text-sm" style={inputStyle}>
              <option value="ADMIN">مسؤول كامل</option>
              <option value="EMPLOYEE">موظف</option>
              <option value="CITIZEN">مواطن</option>
            </select>
            <select value={form.status}
              onChange={(e) => setForm({...form, status:e.target.value})}
              className="px-3 py-2 rounded-lg text-sm" style={inputStyle}>
              <option value="active">نشط</option>
              <option value="inactive">موقوف</option>
            </select>
          </div>
        )}

        {tab === "perms" && (
          <div className="flex flex-col gap-3">
            <div className="flex gap-2 mb-1">
              <button onClick={() => setAllPerms(true)} className="px-3 py-1.5 rounded-lg text-xs font-bold" style={{ background: c.green, color: c.bg }}>
                تفعيل الكل
              </button>
              <button onClick={() => setAllPerms(false)} className="px-3 py-1.5 rounded-lg text-xs font-bold" style={{ background: c.red, color: "#fff" }}>
                إلغاء الكل
              </button>
            </div>
            <p className="text-[11px]" style={{ color: c.soft }}>فعّل أو أوقف كل قسم بشكل منفصل</p>
            <div className="grid grid-cols-2 gap-2">
              {ALL_SECTIONS.map((s) => (
                <label key={s.key} className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer text-xs"
                  style={{ background: c.cardAlt, border:`1px solid ${form.permissions?.[s.key] ? c.blue : c.line}` }}>
                  <div
                    onClick={() => setForm((f) => ({...f, permissions:{...f.permissions, [s.key]: !f.permissions?.[s.key]}}))}
                    className="w-9 h-5 rounded-full relative cursor-pointer shrink-0 transition-colors"
                    style={{ background: form.permissions?.[s.key] ? c.blue : c.line }}
                  >
                    <div className="w-4 h-4 rounded-full absolute top-0.5 transition-all"
                      style={{ background: "#fff", right: form.permissions?.[s.key] ? "2px" : "auto", left: form.permissions?.[s.key] ? "auto" : "2px" }} />
                  </div>
                  <span style={{ color: c.text }}>{s.label}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-2 mt-4">
          <button type="button" onClick={handleSave} disabled={!form.name || !form.email}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold"
            style={{ background: c.blue, color: c.bg, opacity: (!form.name||!form.email)?0.5:1 }}>
            <Save size={18} /> حفظ
          </button>
          <button type="button" onClick={onClose} className="px-4 py-2.5 rounded-lg text-sm font-bold"
            style={{ background: c.cardAlt, color: c.text, border:`1px solid ${c.line}` }}>
            إلغاء
          </button>
        </div>
      </div>
    </div>
  );
}

function UsersSection({ users, setUsers }) {
  const [q, setQ] = useState("");
  const [modal, setModal] = useState(null); // null | {} (new) | user (edit)
  const [confirmDelete, setConfirmDelete] = useState(null);

  const filtered = users.filter((u) => u.name.includes(q) || u.email.includes(q));

  const saveUser = (data) => {
    setUsers((prev) => {
      const exists = prev.some((u) => u.id === data.id);
      return exists ? prev.map((u) => u.id === data.id ? data : u) : [...prev, data];
    });
    setModal(null);
  };

  const deleteUser = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    setConfirmDelete(null);
  };

  const permsCount = (u) => u.permissions ? Object.values(u.permissions).filter(Boolean).length : 0;

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="إدارة المستخدمين والصلاحيات"
        action={
          <button onClick={() => setModal({})} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold"
            style={{ background: c.blue, color: c.bg }}>
            <UserPlus size={19} /> إضافة مستخدم
          </button>
        }
      />

      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative max-w-xs flex-1">
          <Search size={17} className="absolute top-1/2 -translate-y-1/2 right-3" color={c.soft} />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="بحث بالاسم أو البريد..."
            className="w-full pr-9 pl-3 py-2 rounded-lg text-xs" style={inputStyle} />
        </div>
        <span className="text-xs" style={{ color: c.soft }}>{filtered.length} مستخدم</span>
      </div>

      <div className="flex flex-col gap-3">
        {filtered.map((u) => (
          <SectionCard key={u.id}>
            <div className="flex items-start justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0"
                  style={{ background: u.role==="ADMIN" ? c.purple : u.role==="EMPLOYEE" ? c.blue : c.green, color: c.bg }}>
                  {u.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold" style={{ color: c.text }}>{u.name}</p>
                  <p className="text-[11px] flex items-center gap-1" style={{ color: c.soft }}>
                    <Mail size={11} /> {u.email}
                    {u.phone && <><span className="mx-1">·</span><Phone size={11} /> {u.phone}</>}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <RoleBadge role={u.role} />
                <span className="text-[11px] px-2 py-1 rounded-full font-semibold"
                  style={{ background: u.status==="active" ? "#173C2A" : "#3C1C1C", color: u.status==="active" ? c.green : c.red }}>
                  {u.status==="active" ? "نشط" : "موقوف"}
                </span>
                <span className="text-[11px] px-2 py-1 rounded-full font-semibold"
                  style={{ background: c.cardAlt, color: c.soft }}>
                  {permsCount(u)}/{ALL_SECTIONS.length} صلاحية
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1 mt-3">
              {ALL_SECTIONS.map((s) => (
                <span key={s.key} className="text-[10px] px-1.5 py-0.5 rounded"
                  style={{ background: u.permissions?.[s.key] ? "#173C2A" : c.cardAlt, color: u.permissions?.[s.key] ? c.green : c.soft }}>
                  {s.label}
                </span>
              ))}
            </div>

            <div className="flex gap-2 mt-3">
              <button onClick={() => setModal(u)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold"
                style={{ background: c.blue, color: c.bg }}>
                <Pencil size={14} /> تعديل
              </button>
              {u.role !== "ADMIN" && (
                <button onClick={() => setConfirmDelete(u.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold"
                  style={{ background: c.cardAlt, color: c.red, border:`1px solid ${c.red}33` }}>
                  <X size={14} /> حذف
                </button>
              )}
            </div>
          </SectionCard>
        ))}
      </div>

      {modal !== null && (
        <UserFormModal
          initial={modal?.id ? modal : null}
          onClose={() => setModal(null)}
          onSave={saveUser}
        />
      )}

      {confirmDelete && (
        <div className="fixed inset-0 z-40 flex items-center justify-center px-4" style={{ background: "rgba(0,0,0,0.55)" }}>
          <div className="w-full max-w-sm rounded-xl p-5" style={{ background: c.card, border:`1px solid ${c.line}` }}>
            <p className="font-bold mb-2" style={{ color: c.text }}>تأكيد الحذف</p>
            <p className="text-sm mb-4" style={{ color: c.soft }}>هل أنت متأكد من حذف هذا المستخدم؟ لا يمكن التراجع عن هذا الإجراء.</p>
            <div className="flex gap-2">
              <button onClick={() => deleteUser(confirmDelete)} className="flex-1 py-2.5 rounded-lg text-sm font-bold" style={{ background: c.red, color: "#fff" }}>
                تأكيد الحذف
              </button>
              <button onClick={() => setConfirmDelete(null)} className="flex-1 py-2.5 rounded-lg text-sm font-bold" style={{ background: c.cardAlt, color: c.text, border:`1px solid ${c.line}` }}>
                إلغاء
              </button>
            </div>
          </div>
        </div>
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
  { key: "revenue", icon: Wallet, label: "الإيرادات" },
  { key: "maintenance", icon: Wrench, label: "الصيانة" },
  { key: "gis", icon: MapPin, label: "GIS والشبكات" },
  { key: "hr", icon: Users, label: "الموارد البشرية" },
  { key: "safety", icon: ShieldAlert, label: "السلامة والصحة المهنية" },
  { key: "lab", icon: FlaskConical, label: "الجودة والمعامل" },
  { key: "complaints", icon: Headphones, label: "خدمة العملاء والشكاوى" },
  { key: "ai", icon: Sparkles, label: "المساعد الذكي" },
  { key: "reports", icon: BarChart2, label: "التقارير والإحصائيات" },
  { key: "alerts", icon: Bell, label: "الإنذارات", badge: 12 },
  { key: "users", icon: Shield, label: "إدارة المستخدمين" },
  { key: "settings", icon: Settings, label: "الإعدادات" },
];

const SECTION_TITLES = {
  home: "غرفة العمليات الذكية", ops: "تشغيل المحطات", maintenance: "أوامر الصيانة",
  gis: "GIS والشبكات", hr: "الموارد البشرية", revenue: "الإيرادات", safety: "السلامة والصحة المهنية", lab: "الجودة والمعامل", complaints: "خدمة العملاء والشكاوى",
  ai: "المساعد الذكي", reports: "التقارير والإحصائيات", alerts: "الإنذارات",
  users: "إدارة المستخدمين", settings: "الإعدادات",
};

function OperationsRoomInner() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
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

  const addNotif = (title, body, type = "info") => {
    const now = new Date().toLocaleTimeString("ar-EG");
    setNotifs((prev) => [{ id: `N-${Date.now()}`, title, body, type, read: false, time: now }, ...prev].slice(0, 50));
  };

  const unreadCount = notifs.filter((n) => !n.read).length;
  const [revenue, setRevenue] = usePersistedState("hayah-revenue", revenueSeed, reportStatus);
  const [readings, setReadings] = usePersistedState("hayah-readings", readingsLogSeed, reportStatus);
  const [billingComplaints, setBillingComplaints] = usePersistedState("hayah-billing-complaints", billingComplaintsSeed, reportStatus);
  const [estimates, setEstimates] = usePersistedState("hayah-connections", connectionEstimatesSeed, reportStatus);
  const [bills, setBills] = usePersistedState("hayah-bills", billsSeed2, reportStatus);
  const [lines, setLines] = usePersistedState("hayah-network-lines", pipelines, reportStatus);
  const [networkMaintenance, setNetworkMaintenance] = usePersistedState("hayah-network-maintenance", networkMaintenanceSeed, reportStatus);

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
    const leakingLines = lines.filter((l) => l.status === "leaking").length;
    const openNetworkMaintenance = networkMaintenance.filter((n) => n.status !== "closed").length;

    return `
بيانات نظام "حياة" الحالية (محدثة لحظيًا):
- المحطات والروافع: الإجمالي ${stations.length} (عاملة ${onlineStations}، متوقفة ${offlineStations})، إجمالي التصرف اليومي التقريبي ${totalFlow.toLocaleString()} م³.
- الصيانة: ${openOrders} أمر عمل مفتوح أو جاري التنفيذ. قطع غيار تحت حد الطلب الأدنى: ${lowStockParts.join("، ") || "لا يوجد"}.
- السلامة والصحة المهنية: ${openIncidents} حادث عمل لم يُغلق بعد. ${failedInspections} فحص سلامة دوري بنتيجة "فاشل". معدات حماية تحت الحد الأدنى: ${lowStockPpe.join("، ") || "لا يوجد"}.
- الموارد البشرية: ${staff.length} موظف مسجّل. إجمالي صافي الاستحقاقات الشهرية التقريبي ${totalSalaryBudget.toLocaleString()} ج.م. وظائف شاغرة قيد التوظيف: ${openHiring}.
- الإيرادات: إيراد الشهر الحالي ${thisMonthRevenue.toLocaleString()} ج.م، بمتوسط شهري (6 أشهر) ${avgMonthlyRevenue.toLocaleString()} ج.م. شكاوى متعلقة بالفواتير مفتوحة: ${openBillingComplaints}. طلبات مقايسات توصيل مياه/صرف لم تُنفذ: ${openConnectionRequests}.
- خدمة العملاء: ${openComplaints} شكوى عامة مفتوحة من المواطنين (تسرب/انقطاع/ضعف ضغط/صرف صحي).
- الإنذارات: ${unackedAlerts} إنذار عاجل لم يتم تأكيد الاطلاع عليه.
- شبكة الأنابيب: ${leakingLines} خط به تسريب حاليًا، و${openNetworkMaintenance} بلاغ صيانة شبكة مفتوح.
`.trim();
  };
  const now = new Date();

  const renderSection = () => {
    switch (section) {
      case "home": return (
        <HomeSection
          stations={stations} alerts={alerts} complaints={complaints}
          orders={orders} incidents={incidents} parts={parts} payroll={payroll}
        />
      );
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
      case "lab": return <LabSection results={labResults} setResults={setLabResults} stations={stations} />;
      case "gis": return (
        <GISSection
          stations={stations}
          lines={lines} setLines={setLines}
          networkMaintenance={networkMaintenance} setNetworkMaintenance={setNetworkMaintenance}
        />
      );
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
          bills={bills} setBills={setBills}
        />
      );
      case "complaints": return <ComplaintsSection complaints={complaints} setComplaints={setComplaints} />;
      case "ai": return <AIAssistantSection dataSummary={buildDataSummary()} complaints={complaints} setComplaints={setComplaints} />;
      case "reports": return (
        <ReportsSection
          stations={stations} orders={orders} parts={parts}
          complaints={complaints} incidents={incidents} ppe={ppe}
          inspections={inspections} labResults={labResults}
          alerts={alerts} employees={staff} payroll={payroll}
          entries={revenue}
        />
      );
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
          <button onClick={() => setSupportOpen(true)} className="mt-auto flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold" style={{ background: c.blue, color: c.bg }}>
            <Phone size={20} /> اتصل بالدعم الفني
          </button>
          <p className="text-center text-[10px] mt-3" style={{ color: c.soft }}>الإصدار 1.0.0</p>
        </aside>

        {supportOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: "rgba(0,0,0,0.55)" }}>
            <div className="w-full max-w-sm rounded-xl p-5 relative" style={{ background: c.card, border: `1px solid ${c.line}` }}>
              <button onClick={() => setSupportOpen(false)} className="absolute top-4 left-4"><X size={24} color={c.soft} /></button>
              <p className="font-bold mb-4" style={{ color: c.text }}>الدعم الفني</p>
              <div className="flex flex-col gap-3">
                <ContactRow icon={Phone} label="موبايل الدعم الفني" value="01098138383" href="tel:01098138383" />
                <ContactRow icon={Headphones} label="الخط الساخن" value="125" href="tel:125" />
                <ContactRow icon={Mail} label="البريد الإلكتروني" value="emkas77@gmail.com" href="mailto:emkas77@gmail.com" />
              </div>
            </div>
          </div>
        )}

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
              <button onClick={() => setNotifOpen((v) => !v)} className="relative">
                <Bell size={23} color={c.text} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1.5 -left-1.5 text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center" style={{ background: c.red, color: "#fff" }}>
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
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

          {/* ── لوحة الإشعارات ── */}
          {notifOpen && (
            <div className="fixed top-16 left-4 z-50 w-80 rounded-xl shadow-2xl overflow-hidden" style={{ background: c.card, border: `1px solid ${c.line}` }}>
              <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: `1px solid ${c.line}` }}>
                <p className="font-bold text-sm" style={{ color: c.text }}>الإشعارات ({unreadCount} غير مقروء)</p>
                <div className="flex gap-2">
                  <button onClick={() => setNotifs((prev) => prev.map((n) => ({ ...n, read: true })))}
                    className="text-[11px] font-semibold" style={{ color: c.blue }}>
                    قراءة الكل
                  </button>
                  <button onClick={() => setNotifOpen(false)}><X size={16} color={c.soft} /></button>
                </div>
              </div>
              <div className="overflow-y-auto max-h-96">
                {notifs.length === 0 ? (
                  <p className="text-xs text-center py-8" style={{ color: c.soft }}>لا توجد إشعارات</p>
                ) : notifs.map((n) => {
                  const iconColor = n.type === "alert" ? c.red : n.type === "complaint" ? c.purple : n.type === "lab" ? c.cyan : n.type === "maintenance" ? c.amber : c.blue;
                  return (
                    <div key={n.id}
                      onClick={() => setNotifs((prev) => prev.map((x) => x.id === n.id ? { ...x, read: true } : x))}
                      className="flex items-start gap-3 px-4 py-3 cursor-pointer"
                      style={{ borderBottom: `1px solid ${c.line}`, background: n.read ? "transparent" : `${iconColor}11` }}>
                      <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ background: `${iconColor}22` }}>
                        {n.type === "alert" ? <AlertTriangle size={15} color={iconColor} /> :
                         n.type === "complaint" ? <Headphones size={15} color={iconColor} /> :
                         n.type === "lab" ? <FlaskConical size={15} color={iconColor} /> :
                         n.type === "maintenance" ? <Wrench size={15} color={iconColor} /> :
                         <Bell size={15} color={iconColor} />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-xs font-bold truncate" style={{ color: c.text }}>{n.title}</p>
                          {!n.read && <span className="w-2 h-2 rounded-full shrink-0" style={{ background: c.blue }} />}
                        </div>
                        <p className="text-[11px] mt-0.5 leading-snug" style={{ color: c.soft }}>{n.body}</p>
                        <p className="text-[10px] mt-1" style={{ color: c.soft }}>{n.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="px-4 py-2.5" style={{ borderTop: `1px solid ${c.line}` }}>
                <button
                  onClick={() => { setNotifs([]); setNotifOpen(false); }}
                  className="w-full text-[11px] font-semibold py-1.5 rounded-lg"
                  style={{ background: c.cardAlt, color: c.soft }}>
                  مسح كل الإشعارات
                </button>
              </div>
            </div>
          )}

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
