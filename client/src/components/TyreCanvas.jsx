import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Torus, Box } from '@react-three/drei';

// 3D Tyre Shape
const Tyre3D = ({ rotate = true, color = '#1a1a2a', rimColor = '#888' }) => {
  const tyreRef = useRef();
  const rimRef = useRef();

  useFrame(() => {
    if (rotate && tyreRef.current) {
      tyreRef.current.rotation.y += 0.008;
    }
    if (rimRef.current) {
      rimRef.current.rotation.z -= 0.012;
    }
  });

  return (
    <group ref={tyreRef} rotation={[0.3, 0, 0]}>
      {/* Main Tyre Body */}
      <Torus args={[1.2, 0.45, 32, 100]} castShadow>
        <meshStandardMaterial
          color={color}
          roughness={0.9}
          metalness={0.05}
        />
      </Torus>

      {/* Tyre Tread Lines */}
      {Array.from({ length: 24 }).map((_, i) => {
        const angle = (i / 24) * Math.PI * 2;
        const x = Math.cos(angle) * 1.2;
        const y = Math.sin(angle) * 1.2;
        return (
          <Box
            key={i}
            args={[0.06, 0.52, 0.12]}
            position={[x, y, 0]}
            rotation={[0, 0, angle + Math.PI / 2]}
          >
            <meshStandardMaterial color="#111" roughness={1} />
          </Box>
        );
      })}

      {/* Rim Center */}
      <group ref={rimRef}>
        {/* Outer Rim Lip & Barrel */}
        <mesh>
          <torusGeometry args={[0.75, 0.05, 16, 64]} />
          <meshStandardMaterial
            color={rimColor}
            metalness={0.92}
            roughness={0.15}
          />
        </mesh>
        <mesh>
          <cylinderGeometry args={[0.72, 0.72, 0.28, 64, 1, true]} />
          <meshStandardMaterial
            color="#141824"
            metalness={0.8}
            roughness={0.3}
            side={2}
          />
        </mesh>

        {/* Brake Rotor & Red Caliper behind rim */}
        <mesh position={[0, 0, -0.06]}>
          <cylinderGeometry args={[0.62, 0.62, 0.02, 32]} />
          <meshStandardMaterial color="#64748b" metalness={0.85} roughness={0.4} />
        </mesh>
        <mesh position={[0.42, 0.25, -0.04]} rotation={[0, 0, 0.4]}>
          <boxGeometry args={[0.22, 0.14, 0.08]} />
          <meshStandardMaterial color="#dc2626" metalness={0.7} roughness={0.2} />
        </mesh>

        {/* Rim Spokes (10-spoke Luxury Alloy Design) */}
        {Array.from({ length: 10 }).map((_, i) => {
          const angle = (i / 10) * Math.PI * 2;
          return (
            <mesh key={i} rotation={[0, 0, angle]} position={[0, 0, 0.02]}>
              <boxGeometry args={[0.07, 0.72, 0.08]} />
              <meshStandardMaterial color={rimColor} metalness={0.95} roughness={0.08} />
            </mesh>
          );
        })}

        {/* Center Hub & Cap */}
        <mesh position={[0, 0, 0.04]}>
          <cylinderGeometry args={[0.22, 0.22, 0.1, 32]} />
          <meshStandardMaterial color="#1a1e28" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0, 0.09]}>
          <cylinderGeometry args={[0.12, 0.12, 0.02, 32]} />
          <meshStandardMaterial color={rimColor} metalness={0.95} roughness={0.05} />
        </mesh>

        {/* 5 Chrome Lug Nuts */}
        {Array.from({ length: 5 }).map((_, i) => {
          const angle = (i / 5) * Math.PI * 2;
          const x = Math.cos(angle) * 0.16;
          const y = Math.sin(angle) * 0.16;
          return (
            <mesh key={i} position={[x, y, 0.1]}>
              <cylinderGeometry args={[0.022, 0.022, 0.02, 6]} />
              <meshStandardMaterial color="#e2e8f0" metalness={1} roughness={0.1} />
            </mesh>
          );
        })}
      </group>
    </group>
  );
};

// Deterministic floating particles outside render for React purity
const STATIC_PARTICLES = Array.from({ length: 30 }, (_, i) => {
  const seed = (i + 1) * 137.5;
  const x = Math.sin(seed) * 4;
  const y = Math.cos(seed * 1.5) * 4;
  const z = Math.sin(seed * 2.3) * 2;
  const scale = 0.02 + Math.abs(Math.sin(seed * 3.7)) * 0.05;
  return { position: [x, y, z], scale };
});

const Particles = () => {
  return (
    <>
      {STATIC_PARTICLES.map((p, i) => (
        <mesh key={i} position={p.position}>
          <sphereGeometry args={[p.scale, 8, 8]} />
          <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={2} />
        </mesh>
      ))}
    </>
  );
};

const TyreCanvas = ({
  height = '400px',
  rimColor = '#c0c0c0',
  rotate = true,
  showParticles = true,
}) => {
  return (
    <div style={{ width: '100%', height, cursor: 'grab' }}>
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        shadows
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.3} />
          <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" castShadow />
          <pointLight position={[-5, -5, -5]} intensity={0.5} color="#FFD700" />
          <pointLight position={[5, -3, 2]} intensity={0.8} color="#00d4ff" />
          <spotLight
            position={[0, 5, 3]}
            intensity={2}
            color="#FFD700"
            angle={0.4}
            penumbra={0.5}
          />

          {/* 3D Tyre */}
          <Tyre3D rotate={rotate} rimColor={rimColor} />

          {/* Particles */}
          {showParticles && <Particles />}

          {/* Environment */}
          <Environment preset="city" />

          {/* Controls */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI * 0.75}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default TyreCanvas;
