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
// Storage adapter — uses Claude's window.storage when available, falls back to localStorage
const storage = {
  async get(key) {
    try {
      if (window.storage?.get) {
        const res = await window.storage.get(key, true);
        return res;
      }
      const val = localStorage.getItem(key);
      return val ? { value: val } : null;
    } catch {
      try {
        const val = localStorage.getItem(key);
        return val ? { value: val } : null;
      } catch { return null; }
    }
  },
  async set(key, value) {
    try {
      if (window.storage?.set) {
        await window.storage.set(key, value, true);
        return;
      }
      localStorage.setItem(key, value);
    } catch {
      try { localStorage.setItem(key, value); } catch {}
    }
  }
};

function usePersistedState(key, initialValue, onStatus) {
  const [value, setValue] = useState(initialValue);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await storage.get(key);
        if (res?.value) setValue(JSON.parse(res.value));
      } catch {
        // nothing saved yet — keep the starter mock data
      } finally {
        setLoaded(true);
      }
    })();
  }, [key]);

  useEffect(() => {
    if (!loaded) return;
    onStatus?.("saving");
    storage.set(key, JSON.stringify(value))
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
----------------
