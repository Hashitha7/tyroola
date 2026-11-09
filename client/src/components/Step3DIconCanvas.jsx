import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Torus, Box } from '@react-three/drei';

// ===== 1. 3D TYRE WITH MEASUREMENT ORBIT (Step 1) =====
const TyreModel = ({ color = '#12141c', rimColor = '#FFD700' }) => {
  const groupRef = useRef();
  const rimRef = useRef();
  const orbitRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.55;
      groupRef.current.position.y = Math.sin(t * 1.5) * 0.07;
    }
    if (rimRef.current) {
      rimRef.current.rotation.z = -t * 0.8;
    }
    if (orbitRef.current) {
      orbitRef.current.rotation.z = t * 0.7;
    }
  });

  return (
    <group ref={groupRef} rotation={[0.25, 0, 0]}>
      {/* Outer Tyre Body */}
      <Torus args={[1.15, 0.42, 32, 64]}>
        <meshStandardMaterial color={color} roughness={0.88} metalness={0.08} />
      </Torus>

      {/* Sidewall Embossed Accent Rings */}
      <Torus args={[1.05, 0.05, 16, 48]} position={[0, 0, 0.32]}>
        <meshStandardMaterial color="#2d2f3d" roughness={0.6} />
      </Torus>
      <Torus args={[1.05, 0.05, 16, 48]} position={[0, 0, -0.32]}>
        <meshStandardMaterial color="#2d2f3d" roughness={0.6} />
      </Torus>

      {/* Tyre Tread Blocks */}
      {Array.from({ length: 20 }).map((_, i) => {
        const angle = (i / 20) * Math.PI * 2;
        const x = Math.cos(angle) * 1.15;
        const y = Math.sin(angle) * 1.15;
        return (
          <Box
            key={i}
            args={[0.06, 0.48, 0.12]}
            position={[x, y, 0]}
            rotation={[0, 0, angle + Math.PI / 2]}
          >
            <meshStandardMaterial color="#08090d" roughness={1} />
          </Box>
        );
      })}

      {/* Metallic Rim Center */}
      <group ref={rimRef}>
        <mesh>
          <cylinderGeometry args={[0.72, 0.72, 0.28, 48]} />
          <meshStandardMaterial color={rimColor} metalness={0.92} roughness={0.12} />
        </mesh>

        {/* 5 Rim Sport Spokes */}
        {Array.from({ length: 5 }).map((_, i) => {
          const angle = (i / 5) * Math.PI * 2;
          return (
            <mesh key={i} rotation={[0, 0, angle]}>
              <boxGeometry args={[0.08, 0.58, 0.24]} />
              <meshStandardMaterial color={rimColor} metalness={0.95} roughness={0.08} />
            </mesh>
          );
        })}

        {/* Center Cap */}
        <mesh>
          <cylinderGeometry args={[0.18, 0.18, 0.35, 32]} />
          <meshStandardMaterial color="#ffffff" metalness={0.98} roughness={0.05} />
        </mesh>
      </group>

      {/* Orbiting Measurement Rings & Measurement Dots */}
      <group ref={orbitRef}>
        <Torus args={[1.65, 0.02, 16, 64]} rotation={[Math.PI / 2.5, 0, 0]}>
          <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={1.5} transparent opacity={0.65} />
        </Torus>
        {[0, Math.PI * 0.66, Math.PI * 1.33].map((ang, idx) => (
          <mesh key={idx} position={[Math.cos(ang) * 1.65, 0, Math.sin(ang) * 1.65]}>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={3} />
          </mesh>
        ))}
      </group>
    </group>
  );
};

// ===== 2. 3D WALLET WITH FLOATING GOLD COINS (Step 2) =====
const WalletModel = ({ color = '#0d2238', accentColor = '#00d4ff' }) => {
  const groupRef = useRef();
  const coin1Ref = useRef();
  const coin2Ref = useRef();
  const coin3Ref = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 1.6) * 0.08;
      groupRef.current.rotation.y = Math.sin(t * 0.8) * 0.3 + 0.1;
      groupRef.current.rotation.x = 0.2 + Math.cos(t * 1.2) * 0.05;
    }
    if (coin1Ref.current) {
      coin1Ref.current.rotation.y = t * 2.2;
      coin1Ref.current.position.y = 0.65 + Math.sin(t * 2.5) * 0.1;
    }
    if (coin2Ref.current) {
      coin2Ref.current.rotation.y = -t * 1.8;
      coin2Ref.current.rotation.z = Math.sin(t) * 0.2;
      coin2Ref.current.position.y = 0.85 + Math.cos(t * 2.1) * 0.08;
    }
    if (coin3Ref.current) {
      coin3Ref.current.rotation.y = t * 1.5;
    }
  });

  return (
    <group ref={groupRef} rotation={[0.2, 0, 0]}>
      {/* Wallet Back Layer */}
      <Box args={[1.5, 1.05, 0.22]} position={[0, -0.05, -0.04]}>
        <meshStandardMaterial color="#081422" roughness={0.4} metalness={0.2} />
      </Box>

      {/* Wallet Front Flap */}
      <Box args={[1.48, 0.95, 0.18]} position={[0, -0.1, 0.1]}>
        <meshStandardMaterial color={color} roughness={0.35} metalness={0.3} />
      </Box>

      {/* Stitching / Top Neon Edge Accent */}
      <Box args={[1.52, 0.04, 0.24]} position={[0, 0.42, 0]}>
        <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.6} />
      </Box>

      {/* Gold Clasp & Buckle */}
      <mesh position={[0.55, -0.1, 0.22]}>
        <boxGeometry args={[0.25, 0.16, 0.08]} />
        <meshStandardMaterial color="#FFD700" metalness={0.95} roughness={0.1} />
      </mesh>
      <mesh position={[0.55, -0.1, 0.25]}>
        <cylinderGeometry args={[0.04, 0.04, 0.05, 16]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#ffffff" metalness={1} roughness={0} />
      </mesh>

      {/* Credit Cards Peeking Out */}
      <mesh position={[-0.2, 0.38, 0.02]} rotation={[0, 0, 0.08]}>
        <boxGeometry args={[0.9, 0.55, 0.03]} />
        <meshStandardMaterial color="#00d4ff" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0.25, 0.32, -0.02]} rotation={[0, 0, -0.05]}>
        <boxGeometry args={[0.85, 0.5, 0.03]} />
        <meshStandardMaterial color="#FFD700" metalness={0.85} roughness={0.15} />
      </mesh>

      {/* Floating 3D Gold Coins */}
      <group ref={coin1Ref} position={[-0.45, 0.65, 0.2]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.26, 0.26, 0.06, 32]} />
          <meshStandardMaterial color="#FFD700" metalness={0.95} roughness={0.1} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.2, 0.02, 16, 32]} />
          <meshStandardMaterial color="#fff275" metalness={0.95} roughness={0.1} />
        </mesh>
      </group>

      <group ref={coin2Ref} position={[0.35, 0.85, 0.15]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.22, 0.22, 0.05, 32]} />
          <meshStandardMaterial color="#FFD700" metalness={0.95} roughness={0.1} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.16, 0.02, 16, 32]} />
          <meshStandardMaterial color="#fff275" metalness={0.95} roughness={0.1} />
        </mesh>
      </group>

      <group ref={coin3Ref} position={[0, 0.42, 0.12]} rotation={[0.3, 0.4, 0]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.24, 0.24, 0.05, 32]} />
          <meshStandardMaterial color="#FFD700" metalness={0.95} roughness={0.1} />
        </mesh>
      </group>

      {/* Floating Sparkles */}
      {[-0.6, 0, 0.6].map((x, i) => (
        <mesh key={i} position={[x, 0.7 + i * 0.15, (i % 2 === 0 ? 0.3 : -0.2)]}>
          <sphereGeometry args={[0.035, 12, 12]} />
          <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={2.5} />
        </mesh>
      ))}
    </group>
  );
};

// ===== 3. 3D DELIVERY PARCEL WITH CHECKMARK BADGE (Step 3) =====
const DeliveryBoxModel = ({ color = '#c8864d', accentColor = '#8b5cf6' }) => {
  const groupRef = useRef();
  const badgeRef = useRef();
  const speedRingRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 1.5) * 0.08;
      groupRef.current.rotation.y = t * 0.45;
      groupRef.current.rotation.x = 0.25 + Math.sin(t * 1.2) * 0.05;
    }
    if (badgeRef.current) {
      badgeRef.current.rotation.y = -t * 0.8;
      badgeRef.current.scale.setScalar(1 + Math.sin(t * 3) * 0.06);
    }
    if (speedRingRef.current) {
      speedRingRef.current.rotation.z = -t * 0.9;
    }
  });

  return (
    <group ref={groupRef} rotation={[0.25, 0, 0]}>
      {/* Main Cardboard Box */}
      <Box args={[1.25, 1.1, 1.25]} castShadow>
        <meshStandardMaterial color={color} roughness={0.78} metalness={0.05} />
      </Box>

      {/* Box Cross Tape 1 */}
      <Box args={[0.24, 1.11, 1.27]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#9c6435" roughness={0.5} />
      </Box>

      {/* Box Cross Tape 2 */}
      <Box args={[1.27, 1.11, 0.24]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#9c6435" roughness={0.5} />
      </Box>

      {/* Top Tape Center Seam */}
      <Box args={[0.04, 1.12, 1.28]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#704420" roughness={0.6} />
      </Box>

      {/* Shipping Label on Front */}
      <mesh position={[0, 0.05, 0.635]}>
        <planeGeometry args={[0.45, 0.35]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.3} />
      </mesh>
      {/* Barcode Lines on Label */}
      {[-0.1, 0, 0.1].map((x, idx) => (
        <mesh key={idx} position={[x, -0.04, 0.64]}>
          <planeGeometry args={[0.03, 0.12]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
      ))}

      {/* Checkmark Floating Badge */}
      <group ref={badgeRef} position={[0.65, 0.55, 0.65]}>
        <mesh>
          <cylinderGeometry args={[0.28, 0.28, 0.06, 32]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.8} roughness={0.2} metalness={0.5} />
        </mesh>
        {/* White Checkmark stem 1 */}
        <mesh position={[-0.05, -0.04, 0.04]} rotation={[0, 0, -Math.PI / 4]}>
          <boxGeometry args={[0.05, 0.15, 0.03]} />
          <meshStandardMaterial color="#ffffff" roughness={0.1} />
        </mesh>
        {/* White Checkmark stem 2 */}
        <mesh position={[0.07, 0.02, 0.04]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.05, 0.26, 0.03]} />
          <meshStandardMaterial color="#ffffff" roughness={0.1} />
        </mesh>
      </group>

      {/* Dynamic Delivery Speed Orbit Ring */}
      <group ref={speedRingRef}>
        <Torus args={[1.55, 0.02, 16, 64]} rotation={[Math.PI / 3, 0, 0]}>
          <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={1.8} transparent opacity={0.65} />
        </Torus>
        <mesh position={[1.55, 0, 0]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial color="#a78bfa" emissive="#a78bfa" emissiveIntensity={3} />
        </mesh>
        <mesh position={[-1.55, 0, 0]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshStandardMaterial color="#a78bfa" emissive="#a78bfa" emissiveIntensity={2.5} />
        </mesh>
      </group>
    </group>
  );
};

// Main Canvas Wrapper for any Step Icon
const Step3DIconCanvas = ({ type = 'tyre', color = '#FFD700', height = '180px' }) => {
  return (
    <div style={{ width: '100%', height, cursor: 'grab', position: 'relative' }}>
      <Canvas
        camera={{ position: [0, 0, 4.4], fov: 48 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 6, 5]} intensity={1.8} color="#ffffff" />
          <pointLight position={[-4, -3, -3]} intensity={0.6} color={color} />
          <pointLight position={[3, -2, 3]} intensity={1.2} color={color} />
          <spotLight position={[0, 5, 4]} intensity={1.5} color="#ffffff" angle={0.4} />

          {type === 'tyre' && <TyreModel rimColor={color} />}
          {type === 'wallet' && <WalletModel accentColor={color} />}
          {type === 'delivery' && <DeliveryBoxModel accentColor={color} />}

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI * 0.75}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Step3DIconCanvas;

