import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiShoppingCart, FiPhone, FiChevronDown, FiArrowRight, FiLock } from 'react-icons/fi';
import './Navbar.css';

/* ── Australia State Outline Icon Helper ── */
const AusStateIcon = ({ state, color = '#ffd700' }) => (
  <svg viewBox="0 0 64 54" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 34, height: 30 }}>
    <path d="M12 18 C14 12 22 10 28 14 C32 12 36 8 42 12 C46 10 52 14 54 22 C52 30 50 38 46 44 C42 46 36 44 32 46 C26 48 20 46 16 42 C12 36 10 26 12 18 Z" stroke="rgba(255,255,255,0.4)" fill="rgba(255,255,255,0.04)" />
    {state === 'WA' && <path d="M12 18 C14 12 22 10 26 13 L26 45 C20 46 16 42 12 36 Z" fill={color} stroke={color} strokeWidth="2" />}
    {state === 'NT' && <path d="M26 13 C32 12 36 8 40 12 L40 28 L26 28 Z" fill={color} stroke={color} strokeWidth="2" />}
    {state === 'QLD' && <path d="M40 12 C46 10 52 14 54 22 L40 32 Z" fill={color} stroke={color} strokeWidth="2" />}
    {state === 'NSW' && <path d="M40 32 L54 34 L50 42 L40 42 Z" fill={color} stroke={color} strokeWidth="2" />}
    {state === 'VIC' && <path d="M38 42 L48 42 L44 48 L36 48 Z" fill={color} stroke={color} strokeWidth="2" />}
    {state === 'ACT' && <circle cx="44" cy="38" r="4" fill={color} stroke="#fff" strokeWidth="1.5" />}
  </svg>
);

/* ── 1. Tyres Categories (12 items) ── */
const tyreCategories = [
  {
    id: 'car',
    label: 'Car Tyres',
    desc: 'Bridgestone, Pirelli, Michelin, Dunlop & more',
    category: 'Sedan',
    color: '#00d4ff',
    icon: (
      <svg viewBox="0 0 64 36" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M4 26 L10 14 C11 11 14 10 17 10 L47 10 C50 10 53 11 54 14 L60 26 Z" />
        <path d="M2 26 L62 26 C63 26 64 27 64 28 L64 30 C64 32 62 33 60 33 L48 33 C48 29 45 26 41 26 C37 26 34 29 34 33 L30 33 C30 29 27 26 23 26 C19 26 16 29 16 33 L4 33 C2 33 0 32 0 30 L0 28 C0 27 1 26 2 26 Z" />
        <circle cx="23" cy="33" r="4.5" />
        <circle cx="41" cy="33" r="4.5" />
      </svg>
    ),
  },
  {
    id: '4x4',
    label: '4x4 Tyres',
    desc: 'BFGoodrich, Monsta, General Tires, Toyo & more',
    category: 'SUV',
    color: '#ffd700',
    icon: (
      <svg viewBox="0 0 72 40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <rect x="4" y="12" width="64" height="20" rx="4" />
        <path d="M14 12 L10 4 L62 4 L58 12" />
        <circle cx="18" cy="34" r="5.5" />
        <circle cx="54" cy="34" r="5.5" />
      </svg>
    ),
  },
  {
    id: 'allterrain',
    label: 'All Terrain Tyres',
    desc: 'Toyo, Nitto, Falken, Goodyear, BFGoodrich & more',
    category: '4WD',
    color: '#ff6b35',
    icon: (
      <svg viewBox="0 0 72 44" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <rect x="4" y="10" width="64" height="22" rx="4" />
        <path d="M12 10 L8 2 L64 2 L60 10" />
        <circle cx="18" cy="36" r="6" />
        <circle cx="54" cy="36" r="6" />
      </svg>
    ),
  },
  {
    id: 'mudterrain',
    label: 'Mud Terrain Tyres',
    desc: 'Goodyear, Hankook, Federal, Monsta & more',
    category: 'MudTerrain',
    color: '#a3722a',
    icon: (
      <svg viewBox="0 0 72 44" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <rect x="4" y="10" width="64" height="22" rx="4" />
        <circle cx="18" cy="36" r="6" />
        <circle cx="54" cy="36" r="6" />
      </svg>
    ),
  },
  {
    id: 'highway',
    label: 'Highway Tyres',
    desc: 'Continental, Pirelli, Michelin, Dunlop & more',
    category: 'Highway',
    color: '#00e676',
    icon: (
      <svg viewBox="0 0 72 36" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M4 26 L10 14 C11 11 14 10 17 10 L55 10 C58 10 61 11 62 14 L68 26 Z" />
        <circle cx="25" cy="33" r="4.5" />
        <circle cx="47" cy="33" r="4.5" />
      </svg>
    ),
  },
  {
    id: 'lighttruck',
    label: 'Light Truck Tyres',
    desc: 'Michelin, Accelera, Hankook, Goodride & more',
    category: 'LightTruck',
    color: '#ba68c8',
    icon: (
      <svg viewBox="0 0 80 40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <rect x="2" y="10" width="52" height="20" rx="3" />
        <path d="M54 14 L66 14 L74 20 L74 30 L54 30 Z" />
        <circle cx="16" cy="34" r="5" />
        <circle cx="46" cy="34" r="5" />
        <circle cx="68" cy="34" r="5" />
      </svg>
    ),
  },
  {
    id: 'truck',
    label: 'Truck Tyres',
    desc: 'Bridgestone, Michelin, Hankook, Goodride & more',
    category: 'Truck',
    color: '#ef5350',
    icon: (
      <svg viewBox="0 0 88 42" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <rect x="2" y="8" width="56" height="24" rx="3" />
        <path d="M58 14 L72 14 L80 22 L80 32 L58 32 Z" />
        <circle cx="14" cy="36" r="5.5" />
        <circle cx="36" cy="36" r="5.5" />
        <circle cx="58" cy="36" r="5.5" />
        <circle cx="74" cy="36" r="5.5" />
      </svg>
    ),
  },
  {
    id: 'motorcycle',
    label: 'Motorcycle Tyres',
    desc: 'Pirelli, Bridgestone, Metzeler, Dunlop & more',
    category: 'Motorcycle',
    color: '#ff4081',
    icon: (
      <svg viewBox="0 0 72 44" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="16" cy="30" r="11" />
        <circle cx="56" cy="30" r="11" />
        <path d="M27 30 L45 30" />
        <path d="M34 10 L38 6 L50 6 L54 12" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: 'agriculture',
    label: 'Agriculture Tyres',
    desc: 'Bridgestone, Michelin and many more',
    category: 'Agriculture',
    color: '#8bc34a',
    icon: (
      <svg viewBox="0 0 72 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="52" cy="32" r="14" />
        <circle cx="20" cy="38" r="8" />
        <path d="M20 30 L20 10 L44 18 L52 18" />
      </svg>
    ),
  },
  {
    id: 'guides',
    label: 'Tyre Guides',
    desc: 'Find the right tyre size for your vehicle',
    category: 'RunFlat',
    color: '#ffd700',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="32" cy="32" r="24" />
        <circle cx="32" cy="32" r="14" />
        <text x="26" y="12" fontSize="8" fill="currentColor" stroke="none" fontFamily="monospace" fontWeight="bold">265</text>
      </svg>
    ),
  },
  {
    id: 'vehicle',
    label: 'Vehicle',
    desc: 'Find the right tyres for your specific vehicle',
    category: 'Sedan',
    color: '#00d4ff',
    icon: (
      <svg viewBox="0 0 64 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M8 30 L14 18 C15 15 18 14 21 14 L43 14 C46 14 49 15 50 18 L56 30 Z" />
        <circle cx="25" cy="40" r="5" />
        <circle cx="39" cy="40" r="5" />
      </svg>
    ),
  },
  {
    id: 'protect',
    label: 'Tyre Protect',
    desc: 'Get Tyre Coverage For Your Vehicle',
    category: 'RunFlat',
    color: '#00e676',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="32" cy="32" r="22" />
        <path d="M22 8 L32 4 L42 8 L42 24 C42 32 32 38 32 38 C32 38 22 32 22 24 Z" strokeWidth="2" />
      </svg>
    ),
  },
];

/* ── 2. Wheels Categories ── */
const wheelsCategories = [
  {
    id: 'car-wheels',
    label: 'Car wheels',
    desc: 'Discover Advanti, Enkei, Konig, Lowenhart, Marriba and many more',
    path: '/wheels',
    color: '#ffd700',
    icon: (
      <svg viewBox="0 0 64 36" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M4 26 L10 14 C11 11 14 10 17 10 L47 10 C50 10 53 11 54 14 L60 26 Z" />
        <path d="M2 26 L62 26 C63 26 64 27 64 28 L64 30 C64 32 62 33 60 33 L48 33 C48 29 45 26 41 26 C37 26 34 29 34 33 L30 33 C30 29 27 26 23 26 C19 26 16 29 16 33 L4 33 C2 33 0 32 0 30 L0 28 C0 27 1 26 2 26 Z" />
        <circle cx="23" cy="33" r="5" stroke="#ffd700" strokeWidth="2.5" />
        <circle cx="41" cy="33" r="5" stroke="#ffd700" strokeWidth="2.5" />
      </svg>
    ),
  },
  {
    id: '4x4-wheels',
    label: '4x4 & SUV Rims',
    desc: 'Heavy duty off-road rims from Fuel, KMC, Method & King Wheels',
    path: '/wheels?type=4x4',
    color: '#ff6b35',
    icon: (
      <svg viewBox="0 0 72 40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <rect x="4" y="12" width="64" height="20" rx="4" />
        <path d="M14 12 L10 4 L62 4 L58 12" />
        <circle cx="18" cy="34" r="6" stroke="#ff6b35" strokeWidth="2.5" />
        <circle cx="54" cy="34" r="6" stroke="#ff6b35" strokeWidth="2.5" />
      </svg>
    ),
  },
  {
    id: 'alloy-wheels',
    label: 'Alloy Wheels',
    desc: 'Lightweight performance alloys engineered for strength & style',
    path: '/wheels?type=alloy',
    color: '#00d4ff',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="32" cy="32" r="26" />
        <circle cx="32" cy="32" r="10" />
        <line x1="32" y1="6" x2="32" y2="22" strokeWidth="2.5" />
        <line x1="32" y1="42" x2="32" y2="58" strokeWidth="2.5" />
        <line x1="6" y1="32" x2="22" y2="32" strokeWidth="2.5" />
        <line x1="42" y1="32" x2="58" y2="32" strokeWidth="2.5" />
      </svg>
    ),
  },
  {
    id: 'steel-wheels',
    label: 'Steel Wheels',
    desc: 'Rugged & durable steelies built for demanding Australian conditions',
    path: '/wheels?type=steel',
    color: '#00e676',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="32" cy="32" r="26" />
        <circle cx="32" cy="32" r="15" strokeDasharray="4 3" />
        <circle cx="32" cy="32" r="6" fill="currentColor" />
      </svg>
    ),
  },
];

/* ── 3. Services / Repairs Categories ── */
const servicesCategories = [
  {
    id: 'car-services',
    label: 'Car services',
    desc: 'Logbook services & Basic general services',
    path: '/car-services',
    color: '#ffd700',
    icon: (
      <svg viewBox="0 0 64 40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M6 28 L12 16 C13 13 16 12 19 12 L45 12 C48 12 51 13 52 16 L58 28 Z" />
        <path d="M4 28 L60 28 C61 28 62 29 62 30 L62 32 C62 34 60 35 58 35 L48 35 C48 31 45 28 41 28 C37 28 34 31 34 35 L30 35 C30 31 27 28 23 28 C19 28 16 31 16 35 L6 35 C4 35 2 34 2 32 L2 30 C2 29 3 28 4 28 Z" />
        <circle cx="23" cy="35" r="4.5" />
        <circle cx="41" cy="35" r="4.5" />
        <path d="M30 4 L34 8 L32 10 L28 6 Z" stroke="#ffd700" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: 'repairs',
    label: 'Car repairs',
    desc: 'Battery replacement, Alternator repair, spark plug replacement & more',
    path: '/car-repairs',
    color: '#00d4ff',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="32" cy="32" r="18" strokeDasharray="4 2" />
        <circle cx="32" cy="32" r="8" />
        <path d="M22 14 L14 6 M42 14 L50 6 M22 50 L14 58 M42 50 L50 58" strokeWidth="2.5" />
      </svg>
    ),
  },
  {
    id: 'inspections',
    label: 'Inspections',
    desc: 'Pre-purchase, Insurance coverage, Emission, Road Trip inspections & more',
    path: '/car-services',
    color: '#00e676',
    icon: (
      <svg viewBox="0 0 64 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M8 32 L14 20 C15 17 18 16 21 16 L43 16 C46 16 49 17 50 20 L56 32 Z" />
        <circle cx="25" cy="40" r="5" />
        <circle cx="41" cy="40" r="5" />
        <circle cx="46" cy="18" r="8" stroke="#00e676" strokeWidth="2.5" />
        <line x1="52" y1="24" x2="60" y2="32" stroke="#00e676" strokeWidth="3" />
      </svg>
    ),
  },
];

/* ── 4. Deals Categories ── */
const dealsCategories = [
  {
    id: 'promotions',
    label: 'Promotions',
    desc: 'Our latest tyre sales and specials!',
    path: '/deals',
    color: '#ffd700',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="32" cy="32" r="24" />
        <circle cx="25" cy="25" r="4" fill="currentColor" />
        <circle cx="39" cy="39" r="4" fill="currentColor" />
        <line x1="42" y1="22" x2="22" y2="42" strokeWidth="3" />
      </svg>
    ),
  },
  {
    id: 'gift-cards',
    label: 'Gift Cards',
    desc: 'Give the gift of safety',
    path: '/deals',
    color: '#ff6b35',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="10" y="24" width="44" height="30" rx="3" />
        <rect x="6" y="16" width="52" height="8" rx="2" />
        <line x1="32" y1="16" x2="32" y2="54" strokeWidth="2.5" />
      </svg>
    ),
  },
  {
    id: 'free-shipping',
    label: 'Free Shipping',
    desc: 'Tyroola offers free shipping and delivery to selected metro areas',
    path: '/how-it-works',
    color: '#00e676',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M32 8 L54 20 L32 32 L10 20 Z" />
        <path d="M10 20 L10 44 L32 56 L32 32" />
        <path d="M54 20 L54 44 L32 56" />
      </svg>
    ),
  },
  {
    id: 'tyre-deals-39',
    label: 'Tyre deals from $39',
    desc: 'At Tyroola you can fit out your whole car under $160',
    path: '/deals',
    color: '#00d4ff',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M16 12 L38 12 L54 28 L32 50 L16 34 Z" />
        <circle cx="26" cy="22" r="3.5" fill="currentColor" />
        <text x="36" y="36" fontSize="14" fill="currentColor" fontWeight="bold">$</text>
      </svg>
    ),
  },
  {
    id: 'afterpay',
    label: 'Afterpay',
    desc: 'Buy now. Pay for it later - in four equal instalments. Interest free.',
    path: '/deals',
    color: '#b2fce4',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="18" y="10" width="28" height="44" rx="6" />
        <path d="M26 26 L32 20 L38 26 M38 34 L32 40 L26 34" stroke="#b2fce4" strokeWidth="2.5" />
      </svg>
    ),
  },
  {
    id: 'zippay',
    label: 'Zippay',
    desc: 'Discover our interest free finance options. Simply pay in instalments.',
    path: '/deals',
    color: '#b388ff',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="8" y="14" width="48" height="36" rx="6" />
        <path d="M22 24 L42 24 L24 40 L42 40" stroke="#b388ff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'paypal',
    label: 'PayPal Pay in 4',
    desc: "Split your new tyre payments in 4! It's interest free from PayPal",
    path: '/deals',
    color: '#2979ff',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="8" y="16" width="48" height="32" rx="5" />
        <text x="24" y="39" fontSize="13" fill="#2979ff" fontWeight="bold">P</text>
      </svg>
    ),
  },
  {
    id: 'buy-4-pay-3',
    label: 'Buy 4 Pay 3',
    desc: 'Find the latest "Buy 4 and pay 3" deals',
    path: '/deals',
    color: '#ff4081',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 36 C12 26 20 20 32 20 C44 20 52 26 52 36 C52 44 46 48 38 50 L38 54 L32 54 L32 50 C24 50 16 46 12 36 Z" />
        <circle cx="32" cy="14" r="5" stroke="#ff4081" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: 'see-all-deals',
    label: 'See all deals',
    desc: 'Explore all current promotions, seasonal clearances & cashback offers',
    path: '/deals',
    color: '#ffd700',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M24 54 L40 54 L36 22 L28 22 Z" />
        <rect x="26" y="14" width="12" height="8" rx="2" />
        <path d="M32 6 L32 14" strokeWidth="2.5" />
        <line x1="16" y1="18" x2="24" y2="18" stroke="#ffd700" strokeWidth="2" />
        <line x1="40" y1="18" x2="48" y2="18" stroke="#ffd700" strokeWidth="2" />
      </svg>
    ),
  },
];

/* ── 5. Fitting & Delivery Categories (Screenshot 1) ── */
const fittingCategories = [
  {
    id: 'nsw',
    label: 'NSW',
    desc: 'Sydney & Suburbs, Central Coast, South Coast, North Coast',
    path: '/how-it-works',
    color: '#ffd700',
    icon: <AusStateIcon state="NSW" color="#ffd700" />,
  },
  {
    id: 'qld',
    label: 'QLD',
    desc: 'Brisbane, Central Coast, Sunshine Coast, Gold Coast',
    path: '/how-it-works',
    color: '#ffd700',
    icon: <AusStateIcon state="QLD" color="#ffd700" />,
  },
  {
    id: 'wa',
    label: 'WA',
    desc: 'Perth',
    path: '/how-it-works',
    color: '#ffd700',
    icon: <AusStateIcon state="WA" color="#ffd700" />,
  },
  {
    id: 'vic',
    label: 'VIC',
    desc: 'Melbourne, South West Vic, South East Vic',
    path: '/how-it-works',
    color: '#ffd700',
    icon: <AusStateIcon state="VIC" color="#ffd700" />,
  },
  {
    id: 'act',
    label: 'ACT',
    desc: 'Canberra',
    path: '/how-it-works',
    color: '#ffd700',
    icon: <AusStateIcon state="ACT" color="#ffd700" />,
  },
  {
    id: 'nt',
    label: 'NT',
    desc: 'Darwin',
    path: '/how-it-works',
    color: '#ffd700',
    icon: <AusStateIcon state="NT" color="#ffd700" />,
  },
  {
    id: 'mobile-fitter',
    label: 'Mobile Fitter',
    desc: "We'll come to you - at home, work or even while you shop",
    path: '/how-it-works',
    color: '#00d4ff',
    icon: (
      <svg viewBox="0 0 64 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M6 32 L12 20 C13 17 16 16 19 16 L45 16 C48 16 51 17 52 20 L58 32 Z" />
        <circle cx="23" cy="38" r="5" stroke="#00d4ff" strokeWidth="2" />
        <circle cx="41" cy="38" r="5" stroke="#00d4ff" strokeWidth="2" />
        <circle cx="46" cy="14" r="8" stroke="#ffd700" strokeWidth="2" fill="rgba(255,215,0,0.15)" />
      </svg>
    ),
  },
  {
    id: 'show-stations',
    label: 'Show all stations',
    desc: 'Find all 800+ fitting stations near you across Australia',
    path: '/how-it-works',
    color: '#00e676',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M24 54 L40 54 L36 22 L28 22 Z" />
        <rect x="26" y="14" width="12" height="8" rx="2" />
        <path d="M32 6 L32 14" strokeWidth="2.5" />
        <line x1="16" y1="18" x2="24" y2="18" stroke="#00e676" strokeWidth="2" />
        <line x1="40" y1="18" x2="48" y2="18" stroke="#00e676" strokeWidth="2" />
      </svg>
    ),
  },
];

/* ── 6. Tyre Guide Categories (Screenshot 2) ── */
const guideCategories = [
  {
    id: 'choose-tyres',
    label: 'How to choose the right tyres for my car?',
    desc: "A beginner's guide to the basics of tyres",
    path: '/how-it-works',
    color: '#ffd700',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="30" cy="30" r="20" />
        <circle cx="30" cy="30" r="12" />
        <circle cx="44" cy="44" r="8" stroke="#ffd700" strokeWidth="2.5" fill="rgba(255,215,0,0.2)" />
        <line x1="50" y1="50" x2="58" y2="58" stroke="#ffd700" strokeWidth="3" />
      </svg>
    ),
  },
  {
    id: 'when-to-replace',
    label: 'When to replace tyres?',
    desc: 'Learn about all replacement indicators and how to maximise the lifespan of your tyres',
    path: '/how-it-works',
    color: '#00d4ff',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="32" cy="32" r="22" />
        <circle cx="32" cy="32" r="12" />
        <path d="M40 14 L48 10 L56 14 L56 26 C56 32 48 38 48 38 C48 38 40 32 40 26 Z" stroke="#00d4ff" strokeWidth="2" fill="rgba(0,212,255,0.2)" />
        <path d="M44 24 L47 27 L53 20" stroke="#fff" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: 'tyre-pressure',
    label: 'Tyre pressure',
    desc: 'The tyre pressure needs to be checked regularly. Learn more about how it works',
    path: '/how-it-works',
    color: '#00e676',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="32" cy="32" r="22" />
        <circle cx="32" cy="32" r="12" />
        <circle cx="48" cy="18" r="9" stroke="#00e676" strokeWidth="2" fill="rgba(0,230,118,0.2)" />
        <path d="M44 18 L47 21 L52 15" stroke="#fff" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: 'load-speed-rating',
    label: 'Load Rating & Tyre Speed Rating',
    desc: 'Learn about the maximum load a tyre can carry',
    path: '/how-it-works',
    color: '#ff6b35',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="32" cy="32" r="22" />
        <path d="M18 42 C18 42 22 22 32 22 C42 22 46 42 46 42" stroke="#ff6b35" strokeWidth="2.5" />
        <line x1="32" y1="36" x2="40" y2="28" stroke="#ffd700" strokeWidth="3" />
        <circle cx="32" cy="36" r="3" fill="#ff6b35" />
      </svg>
    ),
  },
  {
    id: 'tyre-number-meaning',
    label: 'Tyre Number Meaning',
    desc: 'Learn about the meaning and significance of tyre number',
    path: '/how-it-works',
    color: '#ffd700',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="32" cy="32" r="22" strokeDasharray="4 2" />
        <circle cx="32" cy="32" r="14" />
        <circle cx="32" cy="32" r="6" fill="#ffd700" />
      </svg>
    ),
  },
  {
    id: 'run-flat-tyres',
    label: 'Run-Flat Tyres',
    desc: 'Things you need to know about Run-Flat tyres',
    path: '/how-it-works',
    color: '#b388ff',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="32" cy="32" r="22" />
        <circle cx="32" cy="32" r="14" strokeWidth="3" />
        <circle cx="32" cy="32" r="5" fill="#b388ff" />
      </svg>
    ),
  },
  {
    id: 'oem-tyres',
    label: 'Original Equipment Manufacturer (OEM) Tyres',
    desc: "Check out Tyroola's ultimate OEM tyre guide and find out all you need to know about them",
    path: '/how-it-works',
    color: '#ffd700',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="32" cy="32" r="22" fill="rgba(255,215,0,0.12)" stroke="#ffd700" strokeWidth="2.5" />
        <circle cx="32" cy="32" r="12" stroke="#ffd700" strokeWidth="1.8" />
        <circle cx="32" cy="32" r="4" fill="#ffd700" />
      </svg>
    ),
  },
  {
    id: 'show-all-topics',
    label: 'Show all topics',
    desc: 'Browse complete comprehensive tyre & auto maintenance guides',
    path: '/how-it-works',
    color: '#00e676',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M24 54 L40 54 L36 22 L28 22 Z" />
        <rect x="26" y="14" width="12" height="8" rx="2" />
        <path d="M32 6 L32 14" strokeWidth="2.5" />
        <line x1="16" y1="18" x2="24" y2="18" stroke="#00e676" strokeWidth="2" />
        <line x1="40" y1="18" x2="48" y2="18" stroke="#00e676" strokeWidth="2" />
      </svg>
    ),
  },
];

/* ── 7. Help Categories (Screenshot 3) ── */
const helpCategories = [
  {
    id: 'vehicle-configurator',
    label: 'Vehicle Configurator',
    desc: 'Find tyre sizes recommended specifically for your car make & model',
    path: '/tyres',
    color: '#ffd700',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="30" cy="30" r="18" />
        <circle cx="30" cy="30" r="10" />
        <circle cx="44" cy="44" r="8" stroke="#ffd700" strokeWidth="2" fill="rgba(255,215,0,0.15)" />
        <text x="25" y="15" fontSize="7" fill="currentColor">265</text>
      </svg>
    ),
  },
  {
    id: 'rego-lookup',
    label: 'Rego Lookup',
    desc: 'Enter your Australian registration plate to automatically match tyres',
    path: '/tyres',
    color: '#00d4ff',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="32" cy="32" r="20" />
        <rect x="18" y="24" width="28" height="16" rx="3" stroke="#00d4ff" strokeWidth="2" fill="rgba(0,212,255,0.15)" />
        <text x="32" y="36" fontSize="8" fill="#fff" fontWeight="bold" textAnchor="middle">REGO</text>
      </svg>
    ),
  },
  {
    id: 'find-tyre-size',
    label: 'Where can I find my tyre size?',
    desc: 'Check your tyre sidewall or door jamb placard for exact numbers',
    path: '/how-it-works',
    color: '#00e676',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="32" cy="32" r="22" />
        <circle cx="32" cy="32" r="12" />
        <circle cx="46" cy="18" r="8" stroke="#00e676" strokeWidth="2" fill="rgba(0,230,118,0.15)" />
        <text x="46" y="22" fontSize="10" fill="#00e676" fontWeight="bold" textAnchor="middle">?</text>
      </svg>
    ),
  },
  {
    id: 'delivery-time',
    label: 'How long does delivery take?',
    desc: 'Metro delivery in 1-3 business days, regional 3-5 business days',
    path: '/how-it-works',
    color: '#ff6b35',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22 L32 10 L52 22 L32 34 Z" />
        <path d="M12 22 L12 44 L32 56 L32 34" />
        <path d="M52 22 L52 44 L32 56" />
        <circle cx="48" cy="18" r="8" stroke="#ff6b35" strokeWidth="2" fill="rgba(255,107,53,0.2)" />
        <polyline points="48,14 48,18 51,18" stroke="#fff" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    id: 'shipping-charges',
    label: 'What are the shipping charges to my area?',
    desc: 'Free delivery to selected metro areas and low rates nationwide',
    path: '/how-it-works',
    color: '#ffd700',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22 L32 10 L52 22 L32 34 Z" />
        <path d="M12 22 L12 44 L32 56 L32 34" />
        <path d="M52 22 L52 44 L32 56" />
        <circle cx="48" cy="18" r="8" stroke="#ffd700" strokeWidth="2" fill="rgba(255,215,0,0.2)" />
        <text x="48" y="23" fontSize="10" fill="#ffd700" fontWeight="bold" textAnchor="middle">$</text>
      </svg>
    ),
  },
  {
    id: 'same-day-delivery',
    label: 'Same day delivery?',
    desc: 'Same day dispatch available for in-stock metro orders placed early',
    path: '/how-it-works',
    color: '#00d4ff',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="8" y="20" width="36" height="22" rx="3" />
        <path d="M44 26 L54 26 L60 33 L60 42 L44 42 Z" />
        <circle cx="20" cy="44" r="5" stroke="#00d4ff" strokeWidth="2" />
        <circle cx="50" cy="44" r="5" stroke="#00d4ff" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: 'how-fitting-works',
    label: 'How fitting works?',
    desc: 'Ship to your local partner fitting station and book an appointment',
    path: '/how-it-works',
    color: '#00e676',
    icon: (
      <svg viewBox="0 0 64 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M6 30 L12 18 C13 15 16 14 19 14 L45 14 C48 14 51 15 52 18 L58 30 Z" />
        <circle cx="23" cy="36" r="4.5" stroke="#00e676" strokeWidth="2" />
        <circle cx="41" cy="36" r="4.5" stroke="#00e676" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: 'who-contacts-me',
    label: 'Who will contact me for fitment?',
    desc: 'Your chosen fitting centre will call as soon as tyres arrive',
    path: '/how-it-works',
    color: '#b388ff',
    icon: (
      <svg viewBox="0 0 64 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M6 30 L12 18 C13 15 16 14 19 14 L45 14 C48 14 51 15 52 18 L58 30 Z" />
        <circle cx="23" cy="36" r="4.5" />
        <circle cx="41" cy="36" r="4.5" />
        <circle cx="46" cy="14" r="8" stroke="#b388ff" strokeWidth="2" fill="rgba(179,136,255,0.2)" />
      </svg>
    ),
  },
  {
    id: 'fitting-partners-location',
    label: 'Where are our fitting partners?',
    desc: 'Over 800+ independent certified tyre fitters across every state',
    path: '/how-it-works',
    color: '#ffd700',
    icon: (
      <svg viewBox="0 0 64 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M6 30 L12 18 C13 15 16 14 19 14 L45 14 C48 14 51 15 52 18 L58 30 Z" />
        <circle cx="23" cy="36" r="4.5" />
        <circle cx="41" cy="36" r="4.5" />
        <circle cx="46" cy="14" r="8" stroke="#ffd700" strokeWidth="2" fill="rgba(255,215,0,0.15)" />
        <circle cx="46" cy="13" r="2.5" fill="#ffd700" />
      </svg>
    ),
  },
  {
    id: 'need-more-help',
    label: 'Need more help?',
    desc: 'Speak directly with our Australian tyre experts via chat or phone',
    path: '/contact',
    color: '#ef5350',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M24 54 L40 54 L36 22 L28 22 Z" />
        <rect x="26" y="14" width="12" height="8" rx="2" />
        <path d="M32 6 L32 14" strokeWidth="2.5" />
        <line x1="16" y1="18" x2="24" y2="18" stroke="#ef5350" strokeWidth="2" />
        <line x1="40" y1="18" x2="48" y2="18" stroke="#ef5350" strokeWidth="2" />
      </svg>
    ),
  },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null); // 'tyres' | 'wheels' | 'services' | 'deals' | 'fitting' | 'guide' | 'help' | null
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('tyroola_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const navRef = useRef(null);
  const timeoutRef = useRef(null);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const cartCount = cartItems.reduce((acc, it) => acc + (it.qty || 1), 0);

  useEffect(() => {
    const handleCartUpdate = () => {
      try {
        const saved = localStorage.getItem('tyroola_cart');
        setCartItems(saved ? JSON.parse(saved) : []);
      } catch {
        setCartItems([]);
      }
    };
    const handleOpenCart = () => setCartModalOpen(true);

    window.addEventListener('storage', handleCartUpdate);
    window.addEventListener('tyroola_cart_change', handleCartUpdate);
    window.addEventListener('tyroola_open_cart', handleOpenCart);
    return () => {
      window.removeEventListener('storage', handleCartUpdate);
      window.removeEventListener('tyroola_cart_change', handleCartUpdate);
      window.removeEventListener('tyroola_open_cart', handleOpenCart);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* Close dropdown when clicking outside */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  /* Close on route change or ESC key */
  useEffect(() => {
    setActiveMenu(null);
    setMenuOpen(false);
    setCartModalOpen(false);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveMenu(null);
        setCartModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pathname]);

  const handleMenuEnter = (menuName) => {
    clearTimeout(timeoutRef.current);
    setActiveMenu(menuName);
  };

  const handleMenuLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveMenu(null), 180);
  };

  return (
    <>
      {/* Top Banner */}
      <div className="nav-banner">
        <span>🎁 Up to <strong>$700 Gift Card</strong> on 4 selected Michelin tyres</span>
      </div>

      {/* Mega Menu Blurred Backdrop */}
      <div
        className={`mega-backdrop ${activeMenu !== null ? 'active' : ''}`}
        onClick={() => setActiveMenu(null)}
      />

      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} ref={navRef}>
        <div className="nav-inner">
          {/* Logo & Left Navigation Group */}
          <div className="nav-left-cluster">
            <Link to="/" className="nav-logo">
              <span className="logo-text">TYROOLA</span>
              <div className="logo-dot" />
            </Link>

            {/* Desktop Left Nav Links */}
            <ul className="nav-links nav-left-links">
              {/* ── 1. Tyres Dropdown ── */}
              <li
                className="nav-item-dropdown"
                onMouseEnter={() => handleMenuEnter('tyres')}
                onMouseLeave={handleMenuLeave}
              >
                <button
                  className={`nav-link mega-trigger ${pathname === '/tyres' ? 'active' : ''} ${activeMenu === 'tyres' ? 'dropdown-active' : ''}`}
                  onClick={() => {
                    if (activeMenu === 'tyres') navigate('/tyres');
                    else setActiveMenu('tyres');
                  }}
                  aria-expanded={activeMenu === 'tyres'}
                >
                  Tyres
                  <FiChevronDown className={`mega-chevron ${activeMenu === 'tyres' ? 'rotated' : ''}`} />
                  <span className="nav-link-line" />
                </button>

                {/* Tyres Mega Dropdown */}
                <div
                  className={`mega-dropdown ${activeMenu === 'tyres' ? 'open' : ''}`}
                  onMouseEnter={() => handleMenuEnter('tyres')}
                  onMouseLeave={handleMenuLeave}
                >
                  <div className="mega-dropdown-inner">
                    <div className="mega-header">
                      <span className="mega-header-title">Shop Tyres by Type</span>
                      <Link to="/tyres" className="mega-header-cta" onClick={() => setActiveMenu(null)}>
                        View All Tyres <FiArrowRight />
                      </Link>
                    </div>

                    <div className="mega-grid mega-grid-4">
                      {tyreCategories.map((cat, i) => (
                        <Link
                          key={cat.id}
                          to={`/tyres?category=${cat.category}`}
                          className="mega-item"
                          style={{ '--item-color': cat.color, animationDelay: `${i * 0.02}s` }}
                          onClick={() => setActiveMenu(null)}
                        >
                          <div className="mega-item-icon" style={{ color: cat.color }}>
                            {cat.icon}
                          </div>
                          <div className="mega-item-info">
                            <span className="mega-item-label">{cat.label}</span>
                            <span className="mega-item-desc">{cat.desc}</span>
                          </div>
                          <div className="mega-item-arrow">
                            <FiArrowRight size={14} />
                          </div>
                          <div className="mega-item-glow" style={{ background: `radial-gradient(circle at 20% 50%, ${cat.color}22, transparent 70%)` }} />
                        </Link>
                      ))}
                    </div>

                    <div className="mega-dropdown-footer">
                      <span className="mega-dropdown-footer-text">🏆 Australia's #1 Online Tyre Store · 800+ Fitting Locations</span>
                    </div>
                  </div>
                </div>
              </li>

              {/* ── 2. Wheels Dropdown ── */}
              <li
                className="nav-item-dropdown"
                onMouseEnter={() => handleMenuEnter('wheels')}
                onMouseLeave={handleMenuLeave}
              >
                <button
                  className={`nav-link mega-trigger ${activeMenu === 'wheels' ? 'dropdown-active' : ''}`}
                  onClick={() => {
                    navigate('/wheels');
                    setActiveMenu(null);
                  }}
                  aria-expanded={activeMenu === 'wheels'}
                >
                  Wheels
                  <FiChevronDown className={`mega-chevron ${activeMenu === 'wheels' ? 'rotated' : ''}`} />
                  <span className="nav-link-line" />
                </button>

                {/* Wheels Mega Dropdown */}
                <div
                  className={`mega-dropdown ${activeMenu === 'wheels' ? 'open' : ''}`}
                  onMouseEnter={() => handleMenuEnter('wheels')}
                  onMouseLeave={handleMenuLeave}
                >
                  <div className="mega-dropdown-inner">
                    <div className="mega-header">
                      <span className="mega-header-title">Rims, Mags & Wheels Online</span>
                      <Link to="/wheels" className="mega-header-cta" onClick={() => setActiveMenu(null)}>
                        Shop All Wheels <FiArrowRight />
                      </Link>
                    </div>

                    <div className="mega-grid mega-grid-4">
                      {wheelsCategories.map((w, i) => (
                        <Link
                          key={w.id}
                          to={w.path}
                          className="mega-item"
                          style={{ '--item-color': w.color, animationDelay: `${i * 0.03}s` }}
                          onClick={() => setActiveMenu(null)}
                        >
                          <div className="mega-item-icon" style={{ color: w.color }}>
                            {w.icon}
                          </div>
                          <div className="mega-item-info">
                            <span className="mega-item-label">{w.label}</span>
                            <span className="mega-item-desc">{w.desc}</span>
                          </div>
                          <div className="mega-item-arrow">
                            <FiArrowRight size={14} />
                          </div>
                          <div className="mega-item-glow" style={{ background: `radial-gradient(circle at 20% 50%, ${w.color}22, transparent 70%)` }} />
                        </Link>
                      ))}
                    </div>

                    <div className="mega-dropdown-footer">
                      <span className="mega-dropdown-footer-text">⚙️ Top Wheel Brands: Advanti, Enkei, Konig, KMC, Fuel, King Wheels & Marriba</span>
                    </div>
                  </div>
                </div>
              </li>

              {/* ── 3. Services / Repairs Dropdown ── */}
              <li
                className="nav-item-dropdown"
                onMouseEnter={() => handleMenuEnter('services')}
                onMouseLeave={handleMenuLeave}
              >
                <button
                  className={`nav-link mega-trigger ${activeMenu === 'services' ? 'dropdown-active' : ''}`}
                  onClick={() => {
                    navigate('/car-services');
                    setActiveMenu(null);
                  }}
                  aria-expanded={activeMenu === 'services'}
                >
                  Services/Repairs
                  <FiChevronDown className={`mega-chevron ${activeMenu === 'services' ? 'rotated' : ''}`} />
                  <span className="nav-link-line" />
                </button>

                {/* Services Mega Dropdown */}
                <div
                  className={`mega-dropdown ${activeMenu === 'services' ? 'open' : ''}`}
                  onMouseEnter={() => handleMenuEnter('services')}
                  onMouseLeave={handleMenuLeave}
                >
                  <div className="mega-dropdown-inner">
                    <div className="mega-header">
                      <span className="mega-header-title">Mechanic & Auto Services</span>
                      <Link to="/car-services" className="mega-header-cta" onClick={() => setActiveMenu(null)}>
                        Book Auto Service <FiArrowRight />
                      </Link>
                    </div>

                    <div className="mega-grid mega-grid-3">
                      {servicesCategories.map((svc, i) => (
                        <Link
                          key={svc.id}
                          to={svc.path}
                          className="mega-item"
                          style={{ '--item-color': svc.color, animationDelay: `${i * 0.04}s` }}
                          onClick={() => setActiveMenu(null)}
                        >
                          <div className="mega-item-icon" style={{ color: svc.color }}>
                            {svc.icon}
                          </div>
                          <div className="mega-item-info">
                            <span className="mega-item-label">{svc.label}</span>
                            <span className="mega-item-desc">{svc.desc}</span>
                          </div>
                          <div className="mega-item-arrow">
                            <FiArrowRight size={14} />
                          </div>
                          <div className="mega-item-glow" style={{ background: `radial-gradient(circle at 20% 50%, ${svc.color}22, transparent 70%)` }} />
                        </Link>
                      ))}
                    </div>

                    <div className="mega-dropdown-footer">
                      <span className="mega-dropdown-footer-text">🔧 Professional Qualified Mechanics · Nationwide Warranty & Certified Service</span>
                    </div>
                  </div>
                </div>
              </li>

              {/* ── 4. Deals Dropdown ── */}
              <li
                className="nav-item-dropdown"
                onMouseEnter={() => handleMenuEnter('deals')}
                onMouseLeave={handleMenuLeave}
              >
                <button
                  className={`nav-link mega-trigger ${pathname === '/deals' ? 'active' : ''} ${activeMenu === 'deals' ? 'dropdown-active' : ''}`}
                  onClick={() => {
                    if (activeMenu === 'deals') navigate('/deals');
                    else setActiveMenu('deals');
                  }}
                  aria-expanded={activeMenu === 'deals'}
                >
                  Deals
                  <FiChevronDown className={`mega-chevron ${activeMenu === 'deals' ? 'rotated' : ''}`} />
                  <span className="nav-link-line" />
                </button>

                {/* Deals Mega Dropdown */}
                <div
                  className={`mega-dropdown ${activeMenu === 'deals' ? 'open' : ''}`}
                  onMouseEnter={() => handleMenuEnter('deals')}
                  onMouseLeave={handleMenuLeave}
                >
                  <div className="mega-dropdown-inner">
                    <div className="mega-header">
                      <span className="mega-header-title">Hot Deals & Special Offers</span>
                      <Link to="/deals" className="mega-header-cta" onClick={() => setActiveMenu(null)}>
                        Explore All Deals <FiArrowRight />
                      </Link>
                    </div>

                    <div className="mega-grid mega-grid-deals">
                      {dealsCategories.map((deal, i) => (
                        <Link
                          key={deal.id}
                          to={deal.path}
                          className={`mega-item ${deal.id === 'see-all-deals' ? 'mega-item-highlight' : ''}`}
                          style={{ '--item-color': deal.color, animationDelay: `${i * 0.02}s` }}
                          onClick={() => setActiveMenu(null)}
                        >
                          <div className="mega-item-icon" style={{ color: deal.color }}>
                            {deal.icon}
                          </div>
                          <div className="mega-item-info">
                            <span className="mega-item-label">{deal.label}</span>
                            <span className="mega-item-desc">{deal.desc}</span>
                          </div>
                          <div className="mega-item-arrow">
                            <FiArrowRight size={14} />
                          </div>
                          <div className="mega-item-glow" style={{ background: `radial-gradient(circle at 20% 50%, ${deal.color}22, transparent 70%)` }} />
                        </Link>
                      ))}
                    </div>

                    <div className="mega-dropdown-footer">
                      <span className="mega-dropdown-footer-text">⚡ Buy Now Pay Later: Afterpay, Zip, PayPal · 0% Interest Available</span>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          {/* Right Navigation Group: Fitting & Delivery, Tyre Guide, Help, Cart */}
          <div className="nav-right-cluster">
            <ul className="nav-links nav-right-links">
              {/* ── 5. Fitting & Delivery Dropdown ── */}
              <li
                className="nav-item-dropdown"
                onMouseEnter={() => handleMenuEnter('fitting')}
                onMouseLeave={handleMenuLeave}
              >
                <button
                  className={`nav-link mega-trigger ${activeMenu === 'fitting' ? 'dropdown-active' : ''}`}
                  onClick={() => {
                    if (activeMenu === 'fitting') navigate('/how-it-works');
                    else setActiveMenu('fitting');
                  }}
                  aria-expanded={activeMenu === 'fitting'}
                >
                  Fitting & Delivery
                  <FiChevronDown className={`mega-chevron ${activeMenu === 'fitting' ? 'rotated' : ''}`} />
                  <span className="nav-link-line" />
                </button>

                {/* Fitting & Delivery Mega Dropdown */}
                <div
                  className={`mega-dropdown ${activeMenu === 'fitting' ? 'open' : ''}`}
                  onMouseEnter={() => handleMenuEnter('fitting')}
                  onMouseLeave={handleMenuLeave}
                >
                  <div className="mega-dropdown-inner">
                    <div className="mega-header">
                      <span className="mega-header-title">Fitting Stations & Delivery Across Australia</span>
                      <Link to="/how-it-works" className="mega-header-cta" onClick={() => setActiveMenu(null)}>
                        Find Local Fitters <FiArrowRight />
                      </Link>
                    </div>

                    <div className="mega-grid mega-grid-4">
                      {fittingCategories.map((item, i) => (
                        <Link
                          key={item.id}
                          to={item.path}
                          className="mega-item"
                          style={{ '--item-color': item.color, animationDelay: `${i * 0.02}s` }}
                          onClick={() => setActiveMenu(null)}
                        >
                          <div className="mega-item-icon" style={{ color: item.color }}>
                            {item.icon}
                          </div>
                          <div className="mega-item-info">
                            <span className="mega-item-label">{item.label}</span>
                            <span className="mega-item-desc">{item.desc}</span>
                          </div>
                          <div className="mega-item-arrow">
                            <FiArrowRight size={14} />
                          </div>
                          <div className="mega-item-glow" style={{ background: `radial-gradient(circle at 20% 50%, ${item.color}22, transparent 70%)` }} />
                        </Link>
                      ))}
                    </div>

                    <div className="mega-dropdown-footer">
                      <span className="mega-dropdown-footer-text">🚚 Free Metro Shipping & 800+ Certified Independent Fitting Stations Australia-Wide</span>
                    </div>
                  </div>
                </div>
              </li>

              {/* ── 6. Tyre Guide Dropdown ── */}
              <li
                className="nav-item-dropdown"
                onMouseEnter={() => handleMenuEnter('guide')}
                onMouseLeave={handleMenuLeave}
              >
                <button
                  className={`nav-link mega-trigger ${activeMenu === 'guide' ? 'dropdown-active' : ''}`}
                  onClick={() => {
                    if (activeMenu === 'guide') navigate('/how-it-works');
                    else setActiveMenu('guide');
                  }}
                  aria-expanded={activeMenu === 'guide'}
                >
                  Tyre Guide
                  <FiChevronDown className={`mega-chevron ${activeMenu === 'guide' ? 'rotated' : ''}`} />
                  <span className="nav-link-line" />
                </button>

                {/* Tyre Guide Mega Dropdown */}
                <div
                  className={`mega-dropdown ${activeMenu === 'guide' ? 'open' : ''}`}
                  onMouseEnter={() => handleMenuEnter('guide')}
                  onMouseLeave={handleMenuLeave}
                >
                  <div className="mega-dropdown-inner">
                    <div className="mega-header">
                      <span className="mega-header-title">Tyre Guides & Advice</span>
                      <Link to="/how-it-works" className="mega-header-cta" onClick={() => setActiveMenu(null)}>
                        All Guides & Tips <FiArrowRight />
                      </Link>
                    </div>

                    <div className="mega-grid mega-grid-4">
                      {guideCategories.map((item, i) => (
                        <Link
                          key={item.id}
                          to={item.path}
                          className="mega-item"
                          style={{ '--item-color': item.color, animationDelay: `${i * 0.02}s` }}
                          onClick={() => setActiveMenu(null)}
                        >
                          <div className="mega-item-icon" style={{ color: item.color }}>
                            {item.icon}
                          </div>
                          <div className="mega-item-info">
                            <span className="mega-item-label">{item.label}</span>
                            <span className="mega-item-desc">{item.desc}</span>
                          </div>
                          <div className="mega-item-arrow">
                            <FiArrowRight size={14} />
                          </div>
                          <div className="mega-item-glow" style={{ background: `radial-gradient(circle at 20% 50%, ${item.color}22, transparent 70%)` }} />
                        </Link>
                      ))}
                    </div>

                    <div className="mega-dropdown-footer">
                      <span className="mega-dropdown-footer-text">📖 Expert Advice on Tread Depth, Inflation, Speed Ratings, OEM & Maintenance</span>
                    </div>
                  </div>
                </div>
              </li>

              {/* ── 7. Help Dropdown ── */}
              <li
                className="nav-item-dropdown"
                onMouseEnter={() => handleMenuEnter('help')}
                onMouseLeave={handleMenuLeave}
              >
                <button
                  className={`nav-link mega-trigger ${activeMenu === 'help' ? 'dropdown-active' : ''}`}
                  onClick={() => {
                    if (activeMenu === 'help') navigate('/contact');
                    else setActiveMenu('help');
                  }}
                  aria-expanded={activeMenu === 'help'}
                >
                  Help
                  <FiChevronDown className={`mega-chevron ${activeMenu === 'help' ? 'rotated' : ''}`} />
                  <span className="nav-link-line" />
                </button>

                {/* Help Mega Dropdown */}
                <div
                  className={`mega-dropdown ${activeMenu === 'help' ? 'open' : ''}`}
                  onMouseEnter={() => handleMenuEnter('help')}
                  onMouseLeave={handleMenuLeave}
                >
                  <div className="mega-dropdown-inner">
                    <div className="mega-header">
                      <span className="mega-header-title">Customer Help & Support Center</span>
                      <Link to="/contact" className="mega-header-cta" onClick={() => setActiveMenu(null)}>
                        Contact Support <FiArrowRight />
                      </Link>
                    </div>

                    <div className="mega-grid mega-grid-4">
                      {helpCategories.map((item, i) => (
                        <Link
                          key={item.id}
                          to={item.path}
                          className="mega-item"
                          style={{ '--item-color': item.color, animationDelay: `${i * 0.02}s` }}
                          onClick={() => setActiveMenu(null)}
                        >
                          <div className="mega-item-icon" style={{ color: item.color }}>
                            {item.icon}
                          </div>
                          <div className="mega-item-info">
                            <span className="mega-item-label">{item.label}</span>
                            <span className="mega-item-desc">{item.desc}</span>
                          </div>
                          <div className="mega-item-arrow">
                            <FiArrowRight size={14} />
                          </div>
                          <div className="mega-item-glow" style={{ background: `radial-gradient(circle at 20% 50%, ${item.color}22, transparent 70%)` }} />
                        </Link>
                      ))}
                    </div>

                    <div className="mega-dropdown-footer">
                      <span className="mega-dropdown-footer-text">💬 Australian Support Team Available Mon-Fri · 1800 000 000</span>
                    </div>
                  </div>
                </div>
              </li>
            </ul>

            {/* Cart Icon & Actions */}
            <div className="nav-actions">
              <button
                type="button"
                className="nav-cart"
                onClick={() => {
                  setActiveMenu(null);
                  setCartModalOpen(true);
                }}
                aria-label="Shopping Cart"
              >
                <FiShoppingCart size={20} />
                <span className="cart-badge">{cartCount}</span>
              </button>
            </div>
          </div>

          {/* Mobile Toggle */}
          <button className="nav-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
          <Link to="/tyres" className="mobile-link" onClick={() => setMenuOpen(false)}>Tyres</Link>
          <Link to="/wheels" className="mobile-link" onClick={() => setMenuOpen(false)}>Wheels</Link>
          <Link to="/car-services" className="mobile-link" onClick={() => setMenuOpen(false)}>Services/Repairs</Link>
          <Link to="/deals" className="mobile-link" onClick={() => setMenuOpen(false)}>Deals</Link>
          <Link to="/how-it-works" className="mobile-link" onClick={() => setMenuOpen(false)}>Fitting & Delivery</Link>
          <Link to="/how-it-works" className="mobile-link" onClick={() => setMenuOpen(false)}>Tyre Guide</Link>
          <Link to="/contact" className="mobile-link" onClick={() => setMenuOpen(false)}>Help</Link>
          <button
            type="button"
            className="mobile-link"
            style={{ textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
            onClick={() => {
              setMenuOpen(false);
              setCartModalOpen(true);
            }}
          >
            🛒 Cart ({cartCount})
          </button>
          <Link
            to="/tyres"
            className="btn btn-primary"
            style={{ marginTop: '1rem' }}
            onClick={() => setMenuOpen(false)}
          >
            Shop Tyres
          </Link>
        </div>
      </nav>

      {/* ── Cart Quick View Modal & Blurred Backdrop (Screenshot matching) ── */}
      {cartModalOpen && (
        <div
          className="cart-modal-backdrop"
          onClick={() => setCartModalOpen(false)}
        >
          <div
            className="cart-quickview-card"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="cart-quickview-header">
              <span className="cart-quickview-title">Cart Quick View</span>
              <button
                type="button"
                className="cart-quickview-close"
                onClick={() => setCartModalOpen(false)}
                aria-label="Close"
              >
                <FiX size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="cart-quickview-body">
              {cartCount > 0 ? (
                <div style={{ marginBottom: '1rem', padding: '0.75rem', background: '#f5f5f7', borderRadius: '8px', textAlign: 'left' }}>
                  <div style={{ fontSize: '0.82rem', color: '#111', fontWeight: '700', marginBottom: '0.4rem' }}>
                    🛒 {cartCount} item{cartCount > 1 ? 's' : ''} in your cart
                  </div>
                  <div style={{ maxHeight: '110px', overflowY: 'auto', fontSize: '0.76rem', color: '#555', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                    {cartItems.map((item, idx) => (
                      <div key={item._id || idx} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '0.2rem' }}>
                        <span>{item.brand} {item.model}</span>
                        <strong>{item.qty || 1}x ${item.price}</strong>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: '0.5rem', display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: '800', color: '#000' }}>
                    <span>Total:</span>
                    <span style={{ color: '#d97706' }}>${cartItems.reduce((acc, it) => acc + (it.price * (it.qty || 1)), 0).toFixed(2)}</span>
                  </div>
                </div>
              ) : (
                <div style={{ fontSize: '0.85rem', color: '#777', margin: '0.5rem 0 1rem' }}>
                  Your shopping cart is currently empty.
                </div>
              )}

              <button
                type="button"
                className="btn-quickview-cart"
                onClick={() => {
                  setCartModalOpen(false);
                  navigate('/tyres');
                }}
              >
                Shopping Cart
              </button>

              <button
                type="button"
                className="btn-quickview-checkout"
                onClick={() => {
                  setCartModalOpen(false);
                  navigate('/tyres');
                }}
              >
                <FiLock className="checkout-lock-icon" size={16} />
                <span>Secure Checkout</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
