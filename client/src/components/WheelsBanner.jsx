import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Torus } from '@react-three/drei';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import './WheelsBanner.css';

// 3D Rim and Mag Wheel Model
const MagWheel3D = () => {
  const wheelRef = useRef();

  useFrame((state, delta) => {
    if (wheelRef.current) {
      wheelRef.current.rotation.z += delta * 0.35;
    }
  });

  return (
    <group ref={wheelRef} rotation={[0.4, 0, 0]} scale={1.8}>
      {/* Outer Lip / Barrel */}
      <mesh>
        <cylinderGeometry args={[1.5, 1.5, 0.5, 64, 1, true]} />
        <meshStandardMaterial
          color="#22252a"
          metalness={0.95}
          roughness={0.15}
          wireframe={false}
        />
      </mesh>

      {/* Outer Bevel Ring */}
      <Torus args={[1.48, 0.08, 24, 64]} position={[0, 0, 0.25]}>
        <meshStandardMaterial color="#c0c5cc" metalness={0.98} roughness={0.08} />
      </Torus>

      {/* Spokes - Multi-spoke sports rim design */}
      {Array.from({ length: 10 }).map((_, i) => {
        const angle = (i / 10) * Math.PI * 2;
        return (
          <group key={i} rotation={[0, 0, angle]}>
            {/* Split Spoke Left */}
            <mesh position={[0.07, 0.75, 0.15]} rotation={[0, 0.15, 0.05]}>
              <boxGeometry args={[0.06, 1.35, 0.08]} />
              <meshStandardMaterial color="#88929e" metalness={0.92} roughness={0.12} />
            </mesh>
            {/* Split Spoke Right */}
            <mesh position={[-0.07, 0.75, 0.15]} rotation={[0, -0.15, -0.05]}>
              <boxGeometry args={[0.06, 1.35, 0.08]} />
              <meshStandardMaterial color="#88929e" metalness={0.92} roughness={0.12} />
            </mesh>
          </group>
        );
      })}

      {/* Center Cap & Hub */}
      <mesh position={[0, 0, 0.18]}>
        <cylinderGeometry args={[0.45, 0.45, 0.15, 32]} />
        <meshStandardMaterial color="#1a1c20" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Center Badge */}
      <mesh position={[0, 0, 0.26]}>
        <cylinderGeometry args={[0.22, 0.22, 0.05, 32]} />
        <meshStandardMaterial color="#ffd700" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Lug Nuts */}
      {Array.from({ length: 5 }).map((_, i) => {
        const nutAngle = (i / 5) * Math.PI * 2;
        const x = Math.cos(nutAngle) * 0.32;
        const y = Math.sin(nutAngle) * 0.32;
        return (
          <mesh key={i} position={[x, y, 0.22]}>
            <cylinderGeometry args={[0.035, 0.035, 0.1, 16]} />
            <meshStandardMaterial color="#e0e0e0" metalness={0.98} roughness={0.05} />
          </mesh>
        );
      })}

      {/* Brake Rotor Disc Behind Rim */}
      <mesh position={[0, 0, -0.1]}>
        <cylinderGeometry args={[1.3, 1.3, 0.04, 48]} />
        <meshStandardMaterial color="#666" metalness={0.8} roughness={0.3} />
      </mesh>
    </group>
  );
};

const WheelsBanner = () => {
  return (
    <section className="wheels-banner-section">
      <div className="wheels-banner-bg" />

      <div className="container wheels-banner-container">
        <div className="wheels-content">
          <h2 className="wheels-title">Rims, Mags & Wheels Online</h2>
          <p className="wheels-subtitle">Get the best wheels for your car in just a few clicks.</p>
          <Link to="/tyres" className="btn btn-primary wheels-cta-btn">
            Shop Wheels Now <FiArrowRight />
          </Link>
        </div>

        {/* 3D Wheel Interactive Canvas */}
        <div className="wheels-canvas-wrapper">
          <Canvas
            camera={{ position: [0, -0.2, 3.8], fov: 45 }}
            gl={{ antialias: true, alpha: true }}
          >
            <Suspense fallback={null}>
              <ambientLight intensity={0.4} />
              <directionalLight position={[4, 5, 4]} intensity={2.2} color="#ffffff" />
              <directionalLight position={[-4, 2, 2]} intensity={1.5} color="#ffd700" />
              <pointLight position={[0, -2, 2]} intensity={1.2} color="#00d4ff" />
              <spotLight position={[0, 4, 3]} intensity={2.5} angle={0.6} penumbra={0.8} color="#ffffff" />
              
              <MagWheel3D />
              
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                minPolarAngle={Math.PI / 3}
                maxPolarAngle={Math.PI * 0.65}
              />
            </Suspense>
          </Canvas>
          <div className="wheels-canvas-hint">Drag 3D Rim to rotate</div>
        </div>
      </div>
    </section>
  );
};

export default WheelsBanner;

