import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Center, Bounds } from "@react-three/drei";
import { useRef, useState, useEffect, useMemo } from "react";
import * as THREE from "three";

// ─── Yaha se video ka orientation control karo (agar galat lage) ───────────
const FLIP_VERTICAL = true;    // video upside-down lage → is value ko toggle karo (true<->false)
const FLIP_HORIZONTAL = false; // video mirror (left-right ulta) lage → is value ko toggle karo

// ─── Floating code particles ──────────────────────────────────────────────
function CodeParticles({ count = 16 }) {
  const groupRef = useRef();

  const items = useMemo(() => {
    return Array.from({ length: count }, () => ({
      pos: [
        (Math.random() - 0.5) * 3.2,
        (Math.random() - 0.5) * 2.2,
        (Math.random() - 0.5) * 1.6,
      ],
      speed: 0.15 + Math.random() * 0.25,
      offset: Math.random() * Math.PI * 2,
      size: 0.02 + Math.random() * 0.025,
      color: Math.random() > 0.5 ? "#4ade80" : "#38bdf8",
    }));
  }, [count]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.children.forEach((mesh, i) => {
      const item = items[i];
      mesh.position.y = item.pos[1] + Math.sin(t * item.speed + item.offset) * 0.25;
      mesh.position.x = item.pos[0] + Math.cos(t * item.speed * 0.6 + item.offset) * 0.12;
      mesh.material.opacity = 0.35 + Math.sin(t * item.speed * 2 + item.offset) * 0.25;
    });
  });

  return (
    <group ref={groupRef}>
      {items.map((item, i) => (
        <mesh key={i} position={item.pos}>
          <planeGeometry args={[item.size * 3, item.size]} />
          <meshBasicMaterial color={item.color} transparent opacity={0.5} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  );
}

// ─── Mesh ke actual vertex-normals ka average nikaal ke uski real "facing
// direction" pata karta hai — bounding-box axis guess karne se zyada reliable ──
function getAverageNormal(geometry) {
  const normalAttr = geometry.getAttribute("normal");
  const avg = new THREE.Vector3();
  if (normalAttr) {
    for (let i = 0; i < normalAttr.count; i++) {
      avg.x += normalAttr.getX(i);
      avg.y += normalAttr.getY(i);
      avg.z += normalAttr.getZ(i);
    }
    avg.divideScalar(normalAttr.count);
  }
  if (avg.lengthSq() < 1e-6) avg.set(0, 0, 1);
  return avg.normalize();
}

// ─── Laptop model ──────────────────────────────────────────────────────────
function LaptopModel({ mountProgress, scrollProgress, tiltRef, ...props }) {
  const { scene } = useGLTF("/models/laptop.glb");
  const groupRef = useRef();
  const screenMeshRef = useRef(null);
  const baseZRotationRef = useRef(0);
  const currentTiltX = useRef(0);
  const currentTiltY = useRef(0);

  useEffect(() => {
    let screenMesh = null;
    scene.traverse((child) => {
      if (child.isMesh && child.material?.name === "LCD_Screen") {
        screenMesh = child;
      }
    });

    if (!screenMesh) {
      console.warn("[LaptopScene] LCD_Screen mesh not found in model.");
      return;
    }

    screenMeshRef.current = screenMesh;
    baseZRotationRef.current = screenMesh.rotation.z;

    screenMesh.material.color = new THREE.Color("#050807");
    screenMesh.material.emissive = new THREE.Color("#050807");
    screenMesh.material.emissiveIntensity = 0;

    // Bounding box → size + center
    screenMesh.geometry.computeBoundingBox();
    const bbox = screenMesh.geometry.boundingBox;
    const size = new THREE.Vector3();
    bbox.getSize(size);
    const center = new THREE.Vector3();
    bbox.getCenter(center);

    // Real face-direction nikaal ke robust orientation banate hain
    // (manual axis-guessing ki jagah — ye kisi bhi model ke liye kaam karega)
    const normal = getAverageNormal(screenMesh.geometry);
    let up = new THREE.Vector3(0, 1, 0).sub(normal.clone().multiplyScalar(normal.y));
    if (up.lengthSq() < 1e-4) up.set(0, 0, 1).sub(normal.clone().multiplyScalar(normal.z));
    up.normalize();
    const right = new THREE.Vector3().crossVectors(up, normal).normalize();
    up.crossVectors(normal, right).normalize();
    const basis = new THREE.Matrix4().makeBasis(right, up, normal);
    const orientQuat = new THREE.Quaternion().setFromRotationMatrix(basis);

    // Width/height: bounding box ke 2 bade dimensions
    const dims = [
      { axis: "x", val: size.x },
      { axis: "y", val: size.y },
      { axis: "z", val: size.z },
    ].sort((a, b) => b.val - a.val);
    const width = dims[0].val || 0.5;
    const height = dims[1].val || 0.3;

    const video = document.createElement("video");
    video.src = "/videos/demo-reel.mp4";
    video.crossOrigin = "anonymous";
    video.loop = true;
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.preload = "auto";

    video.addEventListener("loadeddata", () => {
      console.log("[LaptopScene] demo-reel.mp4 loaded, starting playback");
      video.play().catch((err) => console.warn("[LaptopScene] video.play() blocked:", err));
    });
    video.addEventListener("error", () => {
      console.warn("[LaptopScene] demo-reel.mp4 failed to load — check /public/videos/demo-reel.mp4");
    });

    const texture = new THREE.VideoTexture(video);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;

    const planeGeo = new THREE.PlaneGeometry(width * 0.92, height * 0.9);
    const planeMat = new THREE.MeshBasicMaterial({ map: texture, toneMapped: false });
    const plane = new THREE.Mesh(planeGeo, planeMat);
    plane.name = "ScreenVideoPlane";

    plane.position.copy(center).add(normal.clone().multiplyScalar(0.004));
    plane.quaternion.copy(orientQuat);

    // Flip control — scale-based, texture settings se independent, isliye
    // predictable rehta hai chahe orientation logic kuch bhi calculate kare
    plane.scale.x = FLIP_HORIZONTAL ? -1 : 1;
    plane.scale.y = FLIP_VERTICAL ? -1 : 1;

    screenMesh.add(plane);

    return () => {
      video.pause();
      video.src = "";
      screenMesh.remove(plane);
    };
  }, [scene]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    groupRef.current.rotation.y += delta * 0.15;

    const targetTiltX = tiltRef.current.y * 0.15;
    const targetTiltY = tiltRef.current.x * 0.2;
    currentTiltX.current += (targetTiltX - currentTiltX.current) * 0.06;
    currentTiltY.current += (targetTiltY - currentTiltY.current) * 0.06;
    groupRef.current.rotation.x = 0.35 + currentTiltX.current;

    if (screenMeshRef.current) {
      const closedOffset = 0.9 * (1 - mountProgress.current);
      const scrollCloseOffset = 0.25 * scrollProgress.current;
      screenMeshRef.current.rotation.z = baseZRotationRef.current + closedOffset + scrollCloseOffset;
    }
  });

  return (
    <group ref={groupRef} {...props}>
      <primitive object={scene} rotation={[0, -0.6, 0]} />
    </group>
  );
}

useGLTF.preload("/models/laptop.glb");

function MountAnimator({ mountProgress }) {
  const startTime = useRef(null);
  useFrame(({ clock }) => {
    if (startTime.current === null) startTime.current = clock.elapsedTime;
    const elapsed = clock.elapsedTime - startTime.current;
    mountProgress.current = Math.min(elapsed / 1.4, 1);
  });
  return null;
}

export default function LaptopScene() {
  const [dpr, setDpr] = useState(1);
  const mountProgress = useRef(0);
  const scrollProgress = useRef(0);
  const tiltRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    setDpr(isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 1.5));

    const handlePointerMove = (e) => {
      tiltRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      };
    };
    const handleScroll = () => {
      scrollProgress.current = Math.min(window.scrollY / window.innerHeight, 1);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Canvas
      dpr={dpr}
      camera={{ fov: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      style={{ width: "100%", height: "100%" }}
    >
      <MountAnimator mountProgress={mountProgress} />

      <ambientLight intensity={0.8} />
      <directionalLight position={[3, 5, 4]} intensity={1.4} />
      <directionalLight position={[-4, 1, -3]} intensity={0.5} color="#38bdf8" />
      <directionalLight position={[0, -2, 3]} intensity={0.3} color="#22c55e" />

      <Bounds fit clip observe margin={1.05}>
        <Center>
          <LaptopModel mountProgress={mountProgress} scrollProgress={scrollProgress} tiltRef={tiltRef} />
        </Center>
      </Bounds>

      <CodeParticles count={16} />
    </Canvas>
  );
}