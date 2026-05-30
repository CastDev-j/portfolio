import * as THREE from "three";
import React, {
  useRef,
  Suspense,
  useEffect,
  useState,
  useCallback,
} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import { useStore } from "@nanostores/react";
import { ScopedLoader } from "../shared/experience/ScopedLoader";
import { currentCoin } from "@/store";

type Coin1GLTFResult = {
  nodes: {
    GreasePencil003: THREE.Mesh;
    GreasePencil003_1: THREE.Mesh;
    GreasePencil003_2: THREE.Mesh;
  };
  materials: {
    "Material.004": THREE.MeshStandardMaterial;
    "Material.002": THREE.MeshStandardMaterial;
    "coin-corners": THREE.MeshStandardMaterial;
  };
};

type Coin2GLTFResult = {
  nodes: {
    Cylinder: THREE.Mesh;
    Cylinder_1: THREE.Mesh;
    Cylinder_2: THREE.Mesh;
  };
  materials: {
    "coin-corners": THREE.MeshStandardMaterial;
    "Material.001": THREE.MeshStandardMaterial;
    "threejs-color": THREE.MeshStandardMaterial;
  };
};

function Coin1({ active, isMobile }: { active: boolean; isMobile: boolean }) {
  const groupRef = useRef<THREE.Group>(null!);
  const { nodes, materials } = useGLTF(
    "/models/coin-1.glb",
  ) as unknown as Coin1GLTFResult;

  const targetPos = active
    ? new THREE.Vector3(0, -0.05, 3.75)
    : new THREE.Vector3(isMobile ? -3.5 : -6, -2.5, 0);
  const targetScale = active ? 0.3 : 0.1;

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.position.lerp(targetPos, 0.08);
    groupRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.08,
    );
    if (active) {
      groupRef.current.rotation.y += 0.008;
    }
  });

  return (
    <group ref={groupRef} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.GreasePencil003.geometry}
        material={materials["Material.004"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.GreasePencil003_1.geometry}
        material={materials["Material.002"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.GreasePencil003_2.geometry}
        material={materials["coin-corners"]}
      />
    </group>
  );
}

function Coin2({ active, isMobile }: { active: boolean; isMobile: boolean }) {
  const groupRef = useRef<THREE.Group>(null!);
  const { nodes, materials } = useGLTF(
    "/models/coin-2.glb",
  ) as unknown as Coin2GLTFResult;

  const targetPos = active
    ? new THREE.Vector3(0, -0.25, 3.65)
    : new THREE.Vector3(isMobile ? 3.5 : 6, -2.5, 0);
  const targetScale = active ? 0.3 : 0.1;

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.position.lerp(targetPos, 0.08);
    groupRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.08,
    );
    if (active) {
      groupRef.current.rotation.y += 0.008;
    }
  });

  return (
    <group ref={groupRef} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder.geometry}
        material={materials["coin-corners"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder_1.geometry}
        material={materials["Material.001"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder_2.geometry}
        material={materials["threejs-color"]}
      />
    </group>
  );
}

function SceneContent({
  isMobile,
  $currentCoin,
}: {
  isMobile: boolean;
  $currentCoin: string;
}) {
  return (
    <>
      <ambientLight intensity={isMobile ? 1.2 : 0.6} />
      <spotLight
        position={isMobile ? [5, 5, 5] : [10, 10, 10]}
        angle={0.15}
        penumbra={1}
        decay={0}
        intensity={Math.PI}
      />
      <pointLight
        position={isMobile ? [-5, -5, -5] : [-10, -10, -10]}
        decay={0}
        intensity={Math.PI * 0.5}
        color="#8bbdba"
      />
      <pointLight
        position={isMobile ? [0, 3, -3] : [0, 5, -5]}
        decay={0}
        intensity={1.5}
        color="#b7d8d5"
      />
      <Environment preset="city" />

      <Coin1 active={$currentCoin === "coin-1"} isMobile={isMobile} />
      <Coin2 active={$currentCoin === "coin-2"} isMobile={isMobile} />
    </>
  );
}

const CertificatesExperience: React.FC = () => {
  const $currentCoin = useStore(currentCoin);
  const [isMobile, setIsMobile] = useState(false);
  const [canvasKey, setCanvasKey] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const prevMobileRef = useRef(false);

  const handleResize = useCallback(() => {
    const mobile = window.innerWidth < 1024;
    setIsMobile(mobile);
    if (mobile !== prevMobileRef.current) {
      prevMobileRef.current = mobile;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCanvasKey((k) => k + 1), 150);
    }
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [handleResize]);

  return (
    <article
      className="w-full h-74 sm:h-114 relative"
      style={{ minWidth: 0, maxWidth: "100%" }}
    >
      <ScopedLoader />
      <Canvas
        key={canvasKey}
        camera={{
          position: [0, 0, 4.5],
          fov: 45,
        }}
        gl={{
          antialias: true,
          depth: true,
          powerPreference: "high-performance",
          preserveDrawingBuffer: false,
          stencil: false,
        }}
        shadows
        style={{ width: "100%", height: "100%", display: "block" }}
      >
        <Suspense fallback={null}>
          <SceneContent isMobile={isMobile} $currentCoin={$currentCoin} />
        </Suspense>
      </Canvas>
    </article>
  );
};

useGLTF.preload("/models/coin-1.glb");
useGLTF.preload("/models/coin-2.glb");

export default CertificatesExperience;
