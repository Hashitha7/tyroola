import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Torus } from '@react-three/drei';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import './GetTyresNowBanner.css';

// 3D Rotating Stack of Tyres in Warehouse
const WarehouseTyreStack = () => {
  const stackRef = useRef();

  useFrame((state, delta) => {
    if (stackRef.current) {
      stackRef.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <group ref={stackRef} position={[0, -0.4, 0]}>
      {/* Tyre 1 (Bottom) */}
      <group position={[0, -0.7, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <Torus args={[1.1, 0.4, 30, 80]}>
          <meshStandardMaterial color="#141416" roughness={0.92} metalness={0.08} />
        </Torus>
        <mesh>
          <cylinderGeometry args={[0.7, 0.7, 0.25, 32]} />
          <meshStandardMaterial color="#333842" metalness={0.9} roughness={0.15} />
        </mesh>
      </group>

      {/* Tyre 2 (Middle) */}
      <group position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <Torus args={[1.1, 0.4, 30, 80]}>
          <meshStandardMaterial color="#1a1a1e" roughness={0.92} metalness={0.08} />
        </Torus>
        <mesh>
          <cylinderGeometry args={[0.7, 0.7, 0.25, 32]} />
          <meshStandardMaterial color="#404652" metalness={0.9} roughness={0.15} />
        </mesh>
      </group>

      {/* Tyre 3 (Top) */}
      <group position={[0, 0.7, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <Torus args={[1.1, 0.4, 30, 80]}>
          <meshStandardMaterial color="#141416" roughness={0.92} metalness={0.08} />
        </Torus>
        <mesh>
          <cylinderGeometry args={[0.7, 0.7, 0.25, 32]} />
          <meshStandardMaterial color="#ffd700" metalness={0.85} roughness={0.2} />
        </mesh>
      </group>
    </group>
  );
};

const GetTyresNowBanner = () => {
  return (
    <section className="get-tyres-banner">
      {/* Background Warehouse Racks Texture & Overlay */}
      <div className="warehouse-backdrop" />
      <div className="warehouse-overlay" />

      <div className="container get-tyres-container">
        <div className="get-tyres-content">
          <h2 className="get-tyres-title">Get tyres now</h2>
          <p className="get-tyres-subtitle">
            Start by entering your tyres size. Compare tyres and read reviews. Get fast delivery and fitting.
          </p>
          <Link to="/tyres" className="btn btn-primary get-tyres-btn">
            Find tyres <FiArrowRight />
          </Link>
        </div>

        {/* 3D Warehouse Tyre Canvas */}
        <div className="get-tyres-canvas">
          <Canvas camera={{ position: [0, 0, 3.8], fov: 45 }} gl={{ antialias: true, alpha: true }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.4} />
              <directionalLight position={[4, 5, 4]} intensity={2.2} color="#ffffff" />
              <directionalLight position={[-3, -2, 2]} intensity={1.5} color="#ffd700" />
              <pointLight position={[2, 0, 3]} intensity={1.8} color="#00d4ff" />
              <WarehouseTyreStack />
            </Suspense>
          </Canvas>
          <div className="canvas-badge-hint">Live 3D Tyre Stack</div>
        </div>
      </div>
    </section>
  );
};

export default GetTyresNowBanner;

