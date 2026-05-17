import * as THREE from "three";
import React, {
  useRef,
  Suspense,
  useEffect,
  useState,
  useCallback,
} from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import {
  useGLTF,
  Environment,
  PresentationControls,
  useProgress,
  useTexture,
} from "@react-three/drei";

type GLTFResult = {
  nodes: {
    laptop003: THREE.Mesh;
    laptop003_1: THREE.Mesh;
    laptop003_2: THREE.Mesh;
    laptop003_3: THREE.Mesh;
    "laptop-screen": THREE.Mesh;
  };
  materials: {
    case: THREE.MeshStandardMaterial;
    key: THREE.MeshStandardMaterial;
    "key-contrast": THREE.MeshStandardMaterial;
    pad: THREE.MeshStandardMaterial;
    screen: THREE.MeshStandardMaterial;
  };
};

function LaptopModel({ isMobile }: { isMobile: boolean }) {
  const groupRef = useRef<THREE.Group>(null!);
  const { nodes, materials } = useGLTF(
    "/models/laptop.glb",
  ) as unknown as GLTFResult;

  const texture = useLoader(THREE.TextureLoader, "/images/github.webp");

  useEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.flipY = false;
    texture.needsUpdate = true;
  }, [texture]);

  return (
    <group
      ref={groupRef}
      dispose={null}
      scale={isMobile ? 0.4 : 0.45}
      rotation={[
        isMobile ? Math.PI / 8 : 0,
        isMobile ? -Math.PI / 2 : -Math.PI / 2,
        0,
      ]}
      position={[
        isMobile ? -0.8 : -1.0,
        isMobile ? -0.5 : -0.8,
        isMobile ? -0.2 : -0.6,
      ]}
    >
      <group rotation={[Math.PI / 2, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.laptop003.geometry}
          material={materials["case"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.laptop003_1.geometry}
          material={materials["key"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.laptop003_2.geometry}
          material={materials["key-contrast"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.laptop003_3.geometry}
          material={materials["pad"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["laptop-screen"].geometry}
          material-map={texture}
        />
      </group>
    </group>
  );
}

function SceneContent({ isMobile }: { isMobile: boolean }) {
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
      <PresentationControls
        enabled={true}
        global={false}
        cursor={true}
        snap={true}
        speed={1.5}
        zoom={0.6}
        rotation={isMobile ? [0, 0, 0] : [0.1, -0.3, 0.05]}
        polar={[0, Math.PI / 3]}
        azimuth={
          isMobile ? [-Math.PI / 4, Math.PI / 4] : [-Math.PI / 2.5, Math.PI / 6]
        }
      >
        <LaptopModel isMobile={isMobile} />
      </PresentationControls>
    </>
  );
}

function ScopedLoader() {
  const { progress, active } = useProgress();
  const [state, setState] = useState<"loading" | "fading" | "hidden">(
    "loading",
  );

  useEffect(() => {
    if (!active && state === "loading") {
      const timer = setTimeout(() => setState("fading"), 300);
      return () => clearTimeout(timer);
    }
  }, [active, state]);

  useEffect(() => {
    if (state === "fading") {
      const timer = setTimeout(() => setState("hidden"), 500);
      return () => clearTimeout(timer);
    }
  }, [state]);

  if (state === "hidden") return null;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
        zIndex: 10,
        pointerEvents: "none",
        opacity: state === "fading" ? 0 : 1,
        transition: "opacity 0.5s ease",
      }}
    >
      <div
        style={{
          width: "240px",
          height: "4px",
          backgroundColor: "#263b3b",
          borderRadius: "9999px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            backgroundColor: "#498382",
            borderRadius: "9999px",
            transition: "width 0.2s ease",
          }}
        />
      </div>
      <span
        style={{
          color: "#498382",
          fontFamily: "monospace",
          fontSize: "13px",
          letterSpacing: "0.08em",
        }}
      >
        {Math.round(progress)}%
      </span>
    </div>
  );
}

const Experience: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [canvasKey, setCanvasKey] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleResize = useCallback(() => {
    const mobile = window.innerWidth < 1024;
    setIsMobile(mobile);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setCanvasKey((k) => k + 1);
    }, 150);
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
      className="w-full h-74 sm:h-164 relative"
      style={{ minWidth: 0, maxWidth: "100%" }}
    >
      <ScopedLoader />
      <Canvas
        key={canvasKey}
        camera={{
          position: isMobile ? [0, 0.8, 4.5] : [1.5, 1.2, 4.2],
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
          <SceneContent isMobile={isMobile} />
        </Suspense>
      </Canvas>
    </article>
  );
};

useGLTF.preload("/models/laptop.glb");

export default Experience;
