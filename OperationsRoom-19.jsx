-- =====================================================
-- HAYAH Enterprise V2.0
-- Database Creation Script
-- PostgreSQL
-- =====================================================

CREATE DATABASE hayah_enterprise
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'C'
    LC_CTYPE = 'C'
    TEMPLATE = template0;

-- الاتصال بقاعدة البيانات
\c hayah_enterprise;

-- إنشاء Schema
CREATE SCHEMA IF NOT EXISTS core;
CREATE SCHEMA IF NOT EXISTS assets;
CREATE SCHEMA IF NOT EXISTS maintenance;
CREATE SCHEMA IF NOT EXISTS laboratory;
CREATE SCHEMA IF NOT EXISTS customers;
CREATE SCHEMA IF NOT EXISTS inventory;
CREATE SCHEMA IF NOT EXISTS hr;
CREATE SCHEMA IF NOT EXISTS reports;
CREATE SCHEMA IF NOT EXISTS ai;
CREATE SCHEMA IF NOT EXISTS gis;

-- امتدادات PostgreSQL
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS postgis;CREATE TABLE core.users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    full_name VARCHAR(200),
    email VARCHAR(200),
    phone VARCHAR(20),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW()
);CREATE TABLE core.roles (
    id SERIAL PRIMARY KEY,
    role_name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT
);CREATE TABLE core.permissions (
    id SERIAL PRIMARY KEY,
    permission_name VARCHAR(150) UNIQUE NOT NULL
);CREATE TABLE core.permissions (
    id SERIAL PRIMARY KEY,
    permission_name VARCHAR(150) UNIQUE NOT NULL
);CREATE TABLE core.user_roles (
    user_id UUID REFERENCES core.users(id) ON DELETE CASCADE,
    role_id INT REFERENCES core.roles(id) ON DELETE CASCADE,
    PRIMARY KEY(user_id, role_id)
);-- ==========================================
-- Organization Structure
-- HAYAH Enterprise V2.0
-- ==========================================

CREATE TABLE core.companies (
    company_id SERIAL PRIMARY KEY,
    company_code VARCHAR(20) UNIQUE NOT NULL,
    company_name VARCHAR(200) NOT NULL,
    governorate VARCHAR(100),
    address TEXT,
    phone VARCHAR(30),
    email VARCHAR(100),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE core.sectors (
    sector_id SERIAL PRIMARY KEY,
    company_id INT NOT NULL REFERENCES core.companies(company_id),
    sector_code VARCHAR(20),
    sector_name VARCHAR(200) NOT NULL
);

CREATE TABLE core.regions (
    region_id SERIAL PRIMARY KEY,
    sector_id INT NOT NULL REFERENCES core.sectors(sector_id),
    region_code VARCHAR(20),
    region_name VARCHAR(200) NOT NULL
);

CREATE TABLE core.station_types (
    station_type_id SERIAL PRIMARY KEY,
    type_name VARCHAR(100) NOT NULL,
    description TEXT
);

CREATE TABLE core.stations (
    station_id SERIAL PRIMARY KEY,
    region_id INT NOT NULL REFERENCES core.regions(region_id),
    station_type_id INT REFERENCES core.station_types(station_type_id),
    station_code VARCHAR(30) UNIQUE NOT NULL,
    station_name VARCHAR(200) NOT NULL,
    latitude NUMERIC(10,7),
    longitude NUMERIC(10,7),
    design_capacity NUMERIC(12,2),
    actual_capacity NUMERIC(12,2),
    status VARCHAR(30) DEFAULT 'ACTIVE',
    commission_date DATE,
    notes TEXT
);-- ==========================================
-- Assets Management
-- HAYAH Enterprise V2.0
-- ==========================================

CREATE TABLE assets.assets (
    asset_id SERIAL PRIMARY KEY,
    station_id INT NOT NULL REFERENCES core.stations(station_id),
    asset_code VARCHAR(50) UNIQUE NOT NULL,
    asset_name VARCHAR(200) NOT NULL,
    asset_type VARCHAR(100) NOT NULL,
    manufacturer VARCHAR(100),
    model VARCHAR(100),
    serial_number VARCHAR(100),
    installation_date DATE,
    warranty_expiry DATE,
    expected_life_years INT,
    purchase_cost NUMERIC(14,2),
    current_status VARCHAR(30) DEFAULT 'ACTIVE',
    qr_code VARCHAR(255),
    barcode VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE assets.pumps (
    pump_id SERIAL PRIMARY KEY,
    asset_id INT UNIQUE REFERENCES assets.assets(asset_id),
    flow_rate NUMERIC(10,2),
    head NUMERIC(10,2),
    power_kw NUMERIC(10,2),
    rpm INT,
    efficiency NUMERIC(5,2)
);

CREATE TABLE assets.motors (
    motor_id SERIAL PRIMARY KEY,
    asset_id INT UNIQUE REFERENCES assets.assets(asset_id),
    power_kw NUMERIC(10,2),
    voltage INT,
    current_amp NUMERIC(10,2),
    frequency NUMERIC(5,2),
    rpm INT
);

CREATE TABLE assets.generators (
    generator_id SERIAL PRIMARY KEY,
    asset_id INT UNIQUE REFERENCES assets.assets(asset_id),
    rated_power_kva NUMERIC(10,2),
    fuel_type VARCHAR(50),
    fuel_tank_capacity NUMERIC(10,2),
    running_hours NUMERIC(12,2)
);

CREATE TABLE assets.transformers (
    transformer_id SERIAL PRIMARY KEY,
    asset_id INT UNIQUE REFERENCES assets.assets(asset_id),
    rated_capacity_kva NUMERIC(10,2),
    primary_voltage INT,
    secondary_voltage INT
);

CREATE TABLE assets.reservoirs (
    reservoir_id SERIAL PRIMARY KEY,
    asset_id INT UNIQUE REFERENCES assets.assets(asset_id),
    capacity_m3 NUMERIC(12,2),
    water_level NUMERIC(8,2)
);-- ==========================================
-- Maintenance Management
-- HAYAH Enterprise V2.0
-- ==========================================

CREATE TABLE maintenance.maintenance_types (
    maintenance_type_id SERIAL PRIMARY KEY,
    type_name VARCHAR(100) NOT NULL,
    description TEXT
);

CREATE TABLE maintenance.work_orders (
    work_order_id SERIAL PRIMARY KEY,
    asset_id INT NOT NULL REFERENCES assets.assets(asset_id),
    maintenance_type_id INT REFERENCES maintenance.maintenance_types(maintenance_type_id),
    work_order_no VARCHAR(50) UNIQUE NOT NULL,
    priority VARCHAR(20) DEFAULT 'MEDIUM',
    status VARCHAR(30) DEFAULT 'OPEN',
    reported_by UUID REFERENCES core.users(id),
    assigned_to UUID REFERENCES core.users(id),
    problem_description TEXT,
    action_taken TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    started_at TIMESTAMP,
    completed_at TIMESTAMP
);

CREATE TABLE maintenance.failure_history (
    failure_id SERIAL PRIMARY KEY,
    asset_id INT NOT NULL REFERENCES assets.assets(asset_id),
    work_order_id INT REFERENCES maintenance.work_orders(work_order_id),
    failure_date TIMESTAMP NOT NULL,
    failure_type VARCHAR(100),
    root_cause TEXT,
    downtime_hours NUMERIC(10,2),
    repair_cost NUMERIC(14,2)
);

CREATE TABLE maintenance.preventive_schedule (
    schedule_id SERIAL PRIMARY KEY,
    asset_id INT NOT NULL REFERENCES assets.assets(asset_id),
    frequency_days INT NOT NULL,
    last_maintenance DATE,
    next_maintenance DATE,
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE maintenance.work_order_spare_parts (
    id SERIAL PRIMARY KEY,
    work_order_id INT REFERENCES maintenance.work_orders(work_order_id),
    item_id INT,
    quantity NUMERIC(10,2)
);-- ==========================================
-- Maintenance Management
-- HAYAH Enterprise V2.0
-- ==========================================

CREATE TABLE maintenance.maintenance_types (
    maintenance_type_id SERIAL PRIMARY KEY,
    type_name VARCHAR(100) NOT NULL,
    description TEXT
);

CREATE TABLE maintenance.work_orders (
    work_order_id SERIAL PRIMARY KEY,
    asset_id INT NOT NULL REFERENCES assets.assets(asset_id),
    maintenance_type_id INT REFERENCES maintenance.maintenance_types(maintenance_type_id),
    work_order_no VARCHAR(50) UNIQUE NOT NULL,
    priority VARCHAR(20) DEFAULT 'MEDIUM',
    status VARCHAR(30) DEFAULT 'OPEN',
    reported_by UUID REFERENCES core.users(id),
    assigned_to UUID REFERENCES core.users(id),
    problem_description TEXT,
    action_taken TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    started_at TIMESTAMP,
    completed_at TIMESTAMP
);

CREATE TABLE maintenance.failure_history (
    failure_id SERIAL PRIMARY KEY,
    asset_id INT NOT NULL REFERENCES assets.assets(asset_id),
    work_order_id INT REFERENCES maintenance.work_orders(work_order_id),
    failure_date TIMESTAMP NOT NULL,
    failure_type VARCHAR(100),
    root_cause TEXT,
    downtime_hours NUMERIC(10,2),
    repair_cost NUMERIC(14,2)
);

CREATE TABLE maintenance.preventive_schedule (
    schedule_id SERIAL PRIMARY KEY,
    asset_id INT NOT NULL REFERENCES assets.assets(asset_id),
    frequency_days INT NOT NULL,
    last_maintenance DATE,
    next_maintenance DATE,
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE maintenance.work_order_spare_parts (
    id SERIAL PRIMARY KEY,
    work_order_id INT REFERENCES maintenance.work_orders(work_order_id),
    item_id INT,
    quantity NUMERIC(10,2)
);-- ==========================================
-- Laboratory & Water Quality
-- HAYAH Enterprise V2.0
-- ==========================================

CREATE TABLE laboratory.sample_types (
    sample_type_id SERIAL PRIMARY KEY,
    sample_type_name VARCHAR(100) NOT NULL
);

CREATE TABLE laboratory.samples (
    sample_id SERIAL PRIMARY KEY,
    station_id INT REFERENCES core.stations(station_id),
    sample_type_id INT REFERENCES laboratory.sample_types(sample_type_id),
    sample_number VARCHAR(50) UNIQUE,
    sample_date TIMESTAMP NOT NULL,
    collected_by UUID REFERENCES core.users(id),
    location_description TEXT,
    status VARCHAR(20) DEFAULT 'PENDING'
);

CREATE TABLE laboratory.parameters (
    parameter_id SERIAL PRIMARY KEY,
    parameter_name VARCHAR(100),
    unit VARCHAR(20),
    min_value NUMERIC(10,2),
    max_value NUMERIC(10,2)
);

CREATE TABLE laboratory.sample_results (
    result_id SERIAL PRIMARY KEY,
    sample_id INT REFERENCES laboratory.samples(sample_id),
    parameter_id INT REFERENCES laboratory.parameters(parameter_id),
    result_value NUMERIC(10,2),
    is_compliant BOOLEAN,
    notes TEXT
);

CREATE TABLE laboratory.devices (
    device_id SERIAL PRIMARY KEY,
    device_name VARCHAR(150),
    serial_number VARCHAR(100),
    calibration_date DATE,
    next_calibration DATE,
    station_id INT REFERENCES core.stations(station_id)
);-- ==========================================
-- Customers & Billing
-- ==========================================

CREATE TABLE customers.customers (
    customer_id SERIAL PRIMARY KEY,
    customer_code VARCHAR(30) UNIQUE,
    national_id VARCHAR(20),
    full_name VARCHAR(200),
    phone VARCHAR(20),
    address TEXT,
    region_id INT REFERENCES core.regions(region_id),
    customer_status VARCHAR(20) DEFAULT 'ACTIVE'
);

CREATE TABLE customers.meters (
    meter_id SERIAL PRIMARY KEY,
    customer_id INT REFERENCES customers.customers(customer_id),
    serial_number VARCHAR(100),
    meter_size VARCHAR(20),
    installation_date DATE,
    status VARCHAR(20)
);

CREATE TABLE customers.meter_readings (
    reading_id SERIAL PRIMARY KEY,
    meter_id INT REFERENCES customers.meters(meter_id),
    reading_date DATE,
    previous_reading NUMERIC(12,2),
    current_reading NUMERIC(12,2),
    consumption NUMERIC(12,2),
    reader_id UUID REFERENCES core.users(id)
);

CREATE TABLE customers.complaints (
    complaint_id SERIAL PRIMARY KEY,
    customer_id INT REFERENCES customers.customers(customer_id),
    complaint_type VARCHAR(100),
    complaint_text TEXT,
    status VARCHAR(30),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    closed_at TIMESTAMP
);-- ==========================================
-- Water & Wastewater Networks
-- HAYAH Enterprise V2.0
-- ==========================================

CREATE TABLE networks.dma (
    dma_id SERIAL PRIMARY KEY,
    dma_code VARCHAR(30) UNIQUE,
    dma_name VARCHAR(200),
    region_id INT REFERENCES core.regions(region_id),
    population INT,
    length_km NUMERIC(10,2),
    status VARCHAR(20) DEFAULT 'ACTIVE'
);

CREATE TABLE networks.pipelines (
    pipeline_id SERIAL PRIMARY KEY,
    dma_id INT REFERENCES networks.dma(dma_id),
    pipe_code VARCHAR(30),
    diameter_mm NUMERIC(10,2),
    material VARCHAR(50),
    length_m NUMERIC(12,2),
    installation_date DATE,
    pressure_class VARCHAR(20)
);

CREATE TABLE networks.valves (
    valve_id SERIAL PRIMARY KEY,
    pipeline_id INT REFERENCES networks.pipelines(pipeline_id),
    valve_code VARCHAR(30),
    valve_type VARCHAR(50),
    diameter_mm NUMERIC(10,2),
    gps_lat NUMERIC(10,7),
    gps_lng NUMERIC(10,7),
    status VARCHAR(20)
);

CREATE TABLE networks.breakdowns (
    breakdown_id SERIAL PRIMARY KEY,
    pipeline_id INT REFERENCES networks.pipelines(pipeline_id),
    report_date TIMESTAMP,
    repair_date TIMESTAMP,
    cause TEXT,
    water_loss_m3 NUMERIC(12,2),
    repair_cost NUMERIC(12,2)
);-- ==========================================
-- Inventory Management
-- ==========================================

CREATE TABLE inventory.warehouses (
    warehouse_id SERIAL PRIMARY KEY,
    warehouse_name VARCHAR(200),
    station_id INT REFERENCES core.stations(station_id)
);

CREATE TABLE inventory.items (
    item_id SERIAL PRIMARY KEY,
    item_code VARCHAR(50) UNIQUE,
    item_name VARCHAR(200),
    unit VARCHAR(20),
    minimum_stock NUMERIC(10,2),
    current_stock NUMERIC(10,2)
);

CREATE TABLE inventory.stock_transactions (
    transaction_id SERIAL PRIMARY KEY,
    item_id INT REFERENCES inventory.items(item_id),
    warehouse_id INT REFERENCES inventory.warehouses(warehouse_id),
    transaction_type VARCHAR(20),
    quantity NUMERIC(10,2),
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);-- ==========================================
-- Inventory Management
-- ==========================================

CREATE TABLE inventory.warehouses (
    warehouse_id SERIAL PRIMARY KEY,
    warehouse_name VARCHAR(200),
    station_id INT REFERENCES core.stations(station_id)
);

CREATE TABLE inventory.items (
    item_id SERIAL PRIMARY KEY,
    item_code VARCHAR(50) UNIQUE,
    item_name VARCHAR(200),
    unit VARCHAR(20),
    minimum_stock NUMERIC(10,2),
    current_stock NUMERIC(10,2)
);

CREATE TABLE inventory.stock_transactions (
    transaction_id SERIAL PRIMARY KEY,
    item_id INT REFERENCES inventory.items(item_id),
    warehouse_id INT REFERENCES inventory.warehouses(warehouse_id),
    transaction_type VARCHAR(20),
    quantity NUMERIC(10,2),
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);POST   /api/auth/login
POST   /api/auth/logout

GET    /api/stations
POST   /api/stations

GET    /api/assets
POST   /api/assets

GET    /api/work-orders
POST   /api/work-orders

GET    /api/laboratory/samples
POST   /api/laboratory/samples

GET    /api/customers
POST   /api/customersDashboard
│
├── Executive Dashboard
├── Operations Room
├── Stations
├── Assets
├── Maintenance
├── Laboratory
├── Inventory
├── Customers
├── GIS
├── AI Assistant
└── Settingssrc/
│
├── app/
│   ├── App.jsx
│   ├── routes.jsx
│   └── providers.jsx
│
├── assets/
│   ├── images/
│   ├── icons/
│   └── styles/
│
├── components/
│   ├── common/
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Modal.jsx
│   │   ├── Table.jsx
│   │   └── Loading.jsx
│   │
│   ├── layout/
│   │   ├── Sidebar.jsx
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   └── MainLayout.jsx
│   │
│   └── dashboard/
│       ├── KPIWidget.jsx
│       ├── AlertCard.jsx
│       ├── StationStatus.jsx
│       └── QuickActions.jsx
│
├── contexts/
│   ├── AuthContext.jsx
│   ├── ThemeContext.jsx
│   └── NotificationContext.jsx
│
├── hooks/
│   ├── useAuth.js
│   ├── useApi.js
│   └── usePermissions.js
│
├── layouts/
│   └── DashboardLayout.jsx
│
├── pages/
│   ├── Dashboard/
│   ├── Stations/
│   ├── Assets/
│   ├── Maintenance/
│   ├── Laboratory/
│   ├── Customers/
│   ├── Networks/
│   ├── Inventory/
│   ├── HR/
│   ├── Reports/
│   ├── GIS/
│   ├── AI/
│   ├── Settings/
│   ├── Login/
│   └── NotFound/
│
├── services/
│   ├── api.js
│   ├── authService.js
│   ├── stationService.js
│   ├── maintenanceService.js
│   ├── laboratoryService.js
│   └── customerService.js
│
├── store/
│   ├── index.js
│   ├── authStore.js
│   ├── stationStore.js
│   └── dashboardStore.js
│
├── utils/
│   ├── constants.js
│   ├── helpers.js
│   ├── permissions.js
│   └── formatters.js
│
├── main.jsx
└── vite-env.d.tspages/Dashboard/
│
├── DashboardPage.jsx
├── ExecutiveSummary.jsx
├── WaterProductionCard.jsx
├── WaterQualityCard.jsx
├── EnergyCard.jsx
├── MaintenanceCard.jsx
├── InventoryCard.jsx
├── NRWCard.jsx
├── EmergencyCard.jsx
├── WeatherCard.jsx
└── NotificationsCard.jsx
