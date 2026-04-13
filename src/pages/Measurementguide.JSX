import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ruler, ChevronDown, ChevronUp } from 'lucide-react';

const tools = [
  { name: "Soft Tape Measure", description: "A flexible tailor's tape — available at any pharmacy for under R30.", icon: "📏" },
  { name: "A Friend", description: "Most measurements are impossible to take accurately on yourself.", icon: "🤝" },
  { name: "Fitted Clothing", description: "Wear form-fitting clothes or measure directly on skin.", icon: "👕" },
  { name: "Good Posture", description: "Stand naturally — feet hip-width apart, shoulders relaxed.", icon: "🧍" },
];

const measurements = [
  { id: "chest", label: "Chest", unit: "cm", category: "upper", tip: "The most important measurement for jacket fit.", how: "Wrap the tape around the fullest part of your chest — usually across the nipple line. Keep the tape horizontal and parallel to the floor. Take a normal breath and measure at the exhale. Do not pull tight.", landmark: "Fullest part of chest" },
  { id: "waist", label: "Waist", unit: "cm", category: "upper", tip: "Taken at your natural waist, not your trouser waistband.", how: "Find your natural waist by bending sideways — where your torso creases is your natural waist. Wrap the tape around this point, keeping it horizontal. The tape should be snug but not tight — you should be able to slip two fingers underneath.", landmark: "Natural bend point of torso" },
  { id: "shoulder_width", label: "Shoulder Width", unit: "cm", category: "upper", tip: "Critical for jacket shoulder seam placement.", how: "Measure from the tip of one shoulder (the bony point where your shoulder ends) across your upper back to the tip of the other shoulder. Keep the tape straight across — do not follow the curve of the neck. This is best done from behind.", landmark: "Tip to tip across upper back" },
  { id: "neck", label: "Neck", unit: "cm", category: "upper", tip: "Determines your shirt collar size.", how: "Wrap the tape around the base of your neck where your collar would sit. You should be able to slip one finger comfortably beneath the tape. This is where your shirt collar button sits when fastened.", landmark: "Base of neck at collar line" },
  { id: "sleeve_length", label: "Sleeve Length", unit: "cm", category: "arms", tip: "Measured with arm slightly bent for natural drape.", how: "Start at the centre back of your neck (the prominent bone at the top of your spine). Measure across the shoulder and down the outside of the arm to your wrist bone. Keep a slight bend at the elbow — this gives the sleeve room to move naturally.", landmark: "Centre back neck → shoulder → wrist" },
  { id: "jacket_length", label: "Jacket Length", unit: "cm", category: "arms", tip: "Traditional length covers the seat of your trousers.", how: "Measure from the highest point of your shoulder (at the neck) straight down the back to where you want the jacket to end — typically level with your knuckles when your arms hang naturally at your sides.", landmark: "Shoulder top → jacket hem" },
  { id: "hips", label: "Hips", unit: "cm", category: "lower", tip: "Taken at the widest point — often 20–23cm below the waist.", how: "Find the widest point of your hips and seat. Stand with feet together, wrap the tape around the fullest part — usually across the top of the thighs and the fullest part of the seat. Keep the tape level and do not pull tight.", landmark: "Widest point of hips/seat" },
  { id: "inseam", label: "Inseam", unit: "cm", category: "lower", tip: "The measurement most people get wrong — always measure from groin, not belt.", how: "Stand straight with feet slightly apart. Measure from the top of the inner thigh (at the crotch seam) straight down the inside of the leg to your ankle bone. For accuracy, measure a pair of well-fitting trousers you already own — lay them flat and measure the inner leg seam.", landmark: "Crotch seam → ankle bone (inner leg)" },
  { id: "outseam", label: "Outseam", unit: "cm", category: "lower", tip: "Always longer than the inseam — measures the full outer leg.", how: "Measure from your natural waist straight down the outside of your leg to your ankle bone. Stand naturally — do not stretch or point your toes. This measurement determines the total trouser length including the rise.", landmark: "Natural waist → ankle bone (outer leg)" },
  { id: "thigh", label: "Thigh", unit: "cm", category: "lower", tip: "Ensures comfortable trouser fit without bagginess.", how: "Wrap the tape around the fullest part of your thigh — typically about 2.5cm below the crotch. Keep the tape horizontal and snug but not tight. Measure both legs and use the larger measurement.", landmark: "Fullest part of upper thigh" },
  { id: "height", label: "Height", unit: "cm", category: "general", tip: "Stand against a wall without shoes.", how: "Stand barefoot with your back, shoulders, and heels touching a wall. Place a flat book on top of your head parallel to the floor. Mark the wall at the book's lower edge and measure from the floor to the mark.", landmark: "Floor → top of head (no shoes)" },
  { id: "weight", label: "Weight", unit: "kg", category: "general", tip: "Used alongside height to understand your build proportions.", how: "Weigh yourself first thing in the morning, without clothes, using a bathroom scale. This gives your tailor context to interpret your other measurements and anticipate fit adjustments.", landmark: "Morning weight, no clothing" },
];

const categoryLabels = {
  upper: 'Upper Body',
  arms: 'Arms & Length',
  lower: 'Lower Body',
  general: 'General Info',
};

// Inline responsive styles injected once
const ResponsiveStyles = () => (
  <style>{`
    .mg-tools-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
      margin-bottom: 40px;
    }
    .mg-body-map-grid {
      display: grid;
      grid-template-columns: 320px 1fr;
      gap: 52px;
      align-items: start;
    }
    .mg-card-steps {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
    }
    .mg-hero {
      text-align: center;
      max-width: 620px;
      margin: 0 auto 48px;
    }
    .mg-section-pad {
      padding: 0 32px;
    }
    .mg-body-map-panel {
      padding: 36px 40px;
    }
    @media (max-width: 860px) {
      .mg-body-map-grid {
        grid-template-columns: 1fr;
        gap: 32px;
      }
      .mg-body-map-panel {
        padding: 28px 24px;
      }
    }
    @media (max-width: 640px) {
      .mg-tools-grid {
        grid-template-columns: repeat(2, 1fr);
      }
      .mg-card-steps {
        grid-template-columns: 1fr;
      }
      .mg-hero {
        margin-bottom: 32px;
      }
      .mg-section-pad {
        padding: 0 16px;
      }
      .mg-body-map-panel {
        padding: 24px 16px;
      }
    }
    @media (max-width: 380px) {
      .mg-tools-grid {
        grid-template-columns: 1fr;
      }
    }
  `}</style>
);

function BodyDiagram({ activeId, onSelect }) {
  const spots = [
    { id: 'neck',           cx: 100, cy: 46,  label: 'Neck' },
    { id: 'shoulder_width', cx: 100, cy: 60,  label: 'Shoulder' },
    { id: 'chest',          cx: 100, cy: 78,  label: 'Chest' },
    { id: 'sleeve_length',  cx: 140, cy: 92,  label: 'Sleeve' },
    { id: 'jacket_length',  cx: 128, cy: 120, label: 'Length' },
    { id: 'waist',          cx: 100, cy: 102, label: 'Waist' },
    { id: 'hips',           cx: 100, cy: 126, label: 'Hips' },
    { id: 'thigh',          cx: 87,  cy: 150, label: 'Thigh' },
    { id: 'inseam',         cx: 87,  cy: 174, label: 'Inseam' },
    { id: 'outseam',        cx: 114, cy: 164, label: 'Outseam' },
    { id: 'height',         cx: 66,  cy: 100, label: 'Height' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <svg viewBox="0 0 200 245" style={{ width: '100%', maxWidth: 320, display: 'block', margin: '0 auto' }}>
        <g fill="#0E2A47" opacity="0.1">
          <ellipse cx="100" cy="28" rx="16" ry="18" />
          <rect x="94" y="44" width="12" height="12" rx="3" />
          <path d="M68,56 Q56,60 54,85 Q52,110 56,128 Q68,134 100,136 Q132,134 144,128 Q148,110 146,85 Q144,60 132,56 Q116,50 100,50 Q84,50 68,56Z" />
          <path d="M68,58 Q56,64 48,90 Q44,108 46,120 Q52,124 58,120 Q60,102 66,84 Q70,68 72,60Z" />
          <path d="M132,58 Q144,64 152,90 Q156,108 154,120 Q148,124 142,120 Q140,102 134,84 Q130,68 128,60Z" />
          <path d="M76,132 Q68,142 66,168 Q64,194 66,218 Q68,228 76,230 Q84,228 88,218 Q90,194 92,168 Q94,148 96,134Z" />
          <path d="M124,132 Q132,142 134,168 Q136,194 134,218 Q132,228 124,230 Q116,228 112,218 Q110,194 108,168 Q106,148 104,134Z" />
        </g>
        <line x1="56" y1="78"  x2="144" y2="78"  stroke="#A88D4B" strokeWidth="0.5" strokeDasharray="3,3" opacity="0.3" />
        <line x1="56" y1="102" x2="144" y2="102" stroke="#A88D4B" strokeWidth="0.5" strokeDasharray="3,3" opacity="0.3" />
        <line x1="56" y1="126" x2="144" y2="126" stroke="#A88D4B" strokeWidth="0.5" strokeDasharray="3,3" opacity="0.3" />
        <line x1="87"  y1="134" x2="87"  y2="232" stroke="#A88D4B" strokeWidth="0.5" strokeDasharray="3,3" opacity="0.2" />
        <line x1="114" y1="102" x2="114" y2="232" stroke="#0E2A47" strokeWidth="0.5" strokeDasharray="3,3" opacity="0.15" />
        {spots.map(spot => {
          const isActive = activeId === spot.id;
          return (
            <g key={spot.id} onClick={() => onSelect(spot.id)} style={{ cursor: 'pointer' }}>
              {isActive && (
                <circle cx={spot.cx} cy={spot.cy} r={19} fill="none" stroke="#A88D4B" strokeWidth="1" opacity="0.25" />
              )}
              <circle
                cx={spot.cx} cy={spot.cy}
                r={isActive ? 13 : 9}
                fill={isActive ? '#A88D4B' : '#0E2A47'}
                opacity={isActive ? 1 : 0.65}
                style={{ transition: 'all 0.2s' }}
              />
              <text
                x={spot.cx} y={spot.cy + 1}
                textAnchor="middle" dominantBaseline="middle"
                fill="white"
                fontSize={isActive ? '6.2' : '5.2'}
                fontWeight="700"
                style={{ pointerEvents: 'none', userSelect: 'none' }}
              >
                {spot.label}
              </text>
            </g>
          );
        })}
      </svg>
      <p style={{ fontFamily: 'sans-serif', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#A88D4B', marginTop: 10, textAlign: 'center' }}>
        Tap a point to jump to that measurement
      </p>
    </div>
  );
}

function MeasurementCard({ measurement, isOpen, onToggle }) {
  return (
    <div
      id={`card-${measurement.id}`}
      style={{
        border: `1px solid ${isOpen ? 'rgba(168,141,75,0.45)' : '#EBE4D8'}`,
        background: '#fff',
        marginBottom: 8,
        overflow: 'hidden',
        transition: 'border-color 0.2s',
      }}
    >
      <button
        onClick={onToggle}
        style={{
          width: '100%', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', padding: '14px 18px',
          textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer',
          gap: 12,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, minWidth: 0 }}>
          <div style={{
            width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'sans-serif', fontSize: 10, fontWeight: 700, flexShrink: 0,
            background: isOpen ? '#A88D4B' : '#EBE4D8',
            color: isOpen ? '#fff' : '#0E2A47',
            transition: 'background 0.2s, color 0.2s',
          }}>
            {measurement.unit}
          </div>
          <div style={{ minWidth: 0 }}>
            <p style={{ fontFamily: 'Georgia, serif', fontSize: 15, color: '#0E2A47', margin: 0, lineHeight: 1.3 }}>
              {measurement.label}
            </p>
            <p style={{ fontFamily: 'sans-serif', fontSize: 11, color: '#2B2B2B', opacity: 0.5, margin: '2px 0 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {measurement.landmark}
            </p>
          </div>
        </div>
        <div style={{ flexShrink: 0 }}>
          {isOpen
            ? <ChevronUp size={16} color="#A88D4B" />
            : <ChevronDown size={16} color="rgba(43,43,43,0.35)" />}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ padding: '0 18px 20px', borderTop: '1px solid #EBE4D8' }}>
              <div style={{
                display: 'flex', gap: 8, alignItems: 'flex-start',
                background: 'rgba(168,141,75,0.07)', border: '1px solid rgba(168,141,75,0.2)',
                padding: '10px 12px', margin: '14px 0 12px',
              }}>
                <span style={{ color: '#A88D4B', fontSize: 12, lineHeight: '1.6', flexShrink: 0 }}>✦</span>
                <p style={{ fontFamily: 'sans-serif', fontSize: 13, color: '#A88D4B', fontWeight: 600, margin: 0, lineHeight: 1.5 }}>
                  {measurement.tip}
                </p>
              </div>

              <p style={{ fontFamily: 'sans-serif', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#0E2A47', opacity: 0.4, marginBottom: 6 }}>
                How to measure
              </p>
              <p style={{ fontFamily: 'sans-serif', fontSize: 13, color: '#2B2B2B', opacity: 0.72, lineHeight: 1.7, marginBottom: 14 }}>
                {measurement.how}
              </p>

              <div className="mg-card-steps">
                {[
                  "Stand naturally in fitted clothing or on bare skin",
                  "Use a soft flexible tape — never a metal one",
                  measurement.landmark,
                ].map((step, i) => (
                  <div key={i} style={{ background: '#F5F1E8', padding: '10px 12px' }}>
                    <div style={{
                      width: 20, height: 20, borderRadius: '50%', display: 'flex', alignItems: 'center',
                      justifyContent: 'center', fontFamily: 'sans-serif', fontSize: 10, fontWeight: 700,
                      color: '#fff', marginBottom: 6, flexShrink: 0,
                      background: i === 2 ? '#A88D4B' : '#0E2A47',
                    }}>
                      {i + 1}
                    </div>
                    <p style={{ fontFamily: 'sans-serif', fontSize: 11, color: '#2B2B2B', opacity: 0.65, lineHeight: 1.55, margin: 0 }}>
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function MeasurementGuide() {
  const [activeSpot, setActiveSpot] = useState(null);
  const [openCard, setOpenCard] = useState(null);

  const handleSpotSelect = (id) => {
    setActiveSpot(id);
    setOpenCard(id);
    setTimeout(() => {
      document.getElementById(`card-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 160);
  };

  const handleCardToggle = (id) => {
    const next = openCard === id ? null : id;
    setOpenCard(next);
    setActiveSpot(next);
  };

  const grouped = ['upper', 'arms', 'lower', 'general'];

  return (
    <>
      <ResponsiveStyles />
      <div style={{ minHeight: '100vh', background: '#F5F1E8', paddingTop: 120, paddingBottom: 80 }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }} className="mg-section-pad">

          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mg-hero"
          >
            <span style={{ fontFamily: 'sans-serif', fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#A88D4B', display: 'block', marginBottom: 14 }}>
              The Fitting Room
            </span>
            <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(28px, 5vw, 48px)', color: '#0E2A47', marginBottom: 18, lineHeight: 1.2, fontWeight: 400 }}>
              How to <em>Measure</em> Yourself
            </h1>
            <p style={{ fontFamily: 'sans-serif', fontSize: 'clamp(13px, 2vw, 15px)', color: '#2B2B2B', opacity: 0.68, lineHeight: 1.7 }}>
              Accurate measurements are the foundation of a perfect fit. This guide walks you through
              every measurement we need — what it is, where to find it, and how to take it correctly.
            </p>
          </motion.div>

          {/* What you need */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="mg-tools-grid"
          >
            {tools.map((tool, i) => (
              <div key={i} style={{ background: '#fff', border: '1px solid #EBE4D8', padding: '22px 16px', textAlign: 'center' }}>
                <div style={{ fontSize: 26, marginBottom: 10 }}>{tool.icon}</div>
                <p style={{ fontFamily: 'Georgia, serif', fontSize: 13, color: '#0E2A47', marginBottom: 6 }}>{tool.name}</p>
                <p style={{ fontFamily: 'sans-serif', fontSize: 11, color: '#2B2B2B', opacity: 0.55, lineHeight: 1.55 }}>{tool.description}</p>
              </div>
            ))}
          </motion.div>

          {/* Body map panel */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22 }}
            style={{ background: '#fff', border: '1px solid #EBE4D8', marginBottom: 4 }}
            className="mg-body-map-panel"
          >
            <p style={{ fontFamily: 'sans-serif', fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#A88D4B', textAlign: 'center', marginBottom: 32 }}>
              Interactive Body Map
            </p>

            <div className="mg-body-map-grid">
              {/* Diagram */}
              <BodyDiagram activeId={activeSpot} onSelect={handleSpotSelect} />

              {/* Legend + info */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    { color: '#0E2A47', label: 'Tap any point on the diagram' },
                    { color: '#A88D4B', label: 'Active — the card opens below' },
                  ].map(item => (
                    <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 11, height: 11, borderRadius: '50%', background: item.color, flexShrink: 0 }} />
                      <span style={{ fontFamily: 'sans-serif', fontSize: 13, color: '#2B2B2B', opacity: 0.6 }}>{item.label}</span>
                    </div>
                  ))}
                </div>

                <div style={{ background: '#F5F1E8', border: '1px solid #EBE4D8', padding: '20px 22px' }}>
                  <p style={{ fontFamily: 'sans-serif', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#A88D4B', marginBottom: 10 }}>
                    Pro Tip
                  </p>
                  <p style={{ fontFamily: 'sans-serif', fontSize: 13, color: '#2B2B2B', opacity: 0.7, lineHeight: 1.65, margin: 0 }}>
                    Always take measurements over your base layer or directly on skin — never over a thick jacket or jumper. Consistency matters more than perfection.
                  </p>
                </div>

                <div style={{ background: '#0E2A47', padding: '26px 22px', textAlign: 'center' }}>
                  <div style={{
                    width: 46, height: 46, borderRadius: '50%', background: '#A88D4B',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 12px',
                  }}>
                    <span style={{ color: '#fff', fontSize: 17, marginLeft: 3 }}>▶</span>
                  </div>
                  <p style={{ fontFamily: 'Georgia, serif', fontSize: 14, color: 'rgba(255,255,255,0.9)', marginBottom: 6 }}>Video Tutorial</p>
                  <p style={{ fontFamily: 'sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.4)', lineHeight: 1.55 }}>
                    Coming soon — a step-by-step guide with our master tailor
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '44px 0 28px' }}>
            <div style={{ flex: 1, height: 1, background: '#EBE4D8' }} />
            <Ruler size={14} color="#A88D4B" />
            <span style={{ fontFamily: 'sans-serif', fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#A88D4B' }}>
              All Measurements
            </span>
            <Ruler size={14} color="#A88D4B" />
            <div style={{ flex: 1, height: 1, background: '#EBE4D8' }} />
          </div>

          {/* Measurement cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
            {grouped.map(category => {
              const items = measurements.filter(m => m.category === category);
              return (
                <div key={category}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                    <h2 style={{ fontFamily: 'sans-serif', fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#A88D4B', margin: 0, whiteSpace: 'nowrap' }}>
                      {categoryLabels[category]}
                    </h2>
                    <div style={{ flex: 1, height: 1, background: '#EBE4D8' }} />
                  </div>
                  <div>
                    {items.map(m => (
                      <MeasurementCard
                        key={m.id}
                        measurement={m}
                        isOpen={openCard === m.id}
                        onToggle={() => handleCardToggle(m.id)}
                      />
                    ))}
                  </div>
                </div>
              );
            })}

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              style={{ background: '#0E2A47', padding: 'clamp(24px, 4vw, 40px)' }}
            >
              <p style={{ fontFamily: 'sans-serif', fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#A88D4B', marginBottom: 12 }}>
                A Note from Our Tailors
              </p>
              <p style={{ fontFamily: 'sans-serif', fontSize: 'clamp(13px, 2vw, 14px)', color: 'rgba(255,255,255,0.8)', lineHeight: 1.75, marginBottom: 14 }}>
                If you're new to measuring yourself, it might feel a bit tricky at first — but don’t worry, it gets easier with practice. 
                The most important thing is to be consistent and take your time. If you have any doubts, it’s better to take multiple measurements and use the average. 
                Remember, these measurements are the blueprint for your custom garment, so accuracy really helps us achieve the best fit possible.
              </p>
              <p style={{ fontFamily: 'sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.3)', margin: 0 }}>
                All measurements should be in centimetres (cm) unless otherwise stated.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}