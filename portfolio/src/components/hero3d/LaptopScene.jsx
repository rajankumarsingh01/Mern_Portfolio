import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Center, Bounds } from "@react-three/drei";
import { useRef, useState, useEffect, useMemo } from "react";
import * as THREE from "three";

const FLIP_VERTICAL = true;
const FLIP_HORIZONTAL = false;

const CODE_LINES = [
  { text: "const dev = {", color: "#4ade80" },
  { text: '  name: "Rajan",', color: "#94a3b8" },
  { text: '  stack: "MERN",', color: "#94a3b8" },
  { text: "  ai: true,", color: "#94a3b8" },
  { text: "}", color: "#4ade80" },
  { text: "", color: "#000" },
  { text: "function build() {", color: "#c084fc" },
  { text: "  return magic;", color: "#94a3b8" },
  { text: "}", color: "#c084fc" },
  { text: "", color: "#000" },
  { text: "// shipping daily", color: "#64748b" },
  { text: "export default App;", color: "#60a5fa" },
];

// ── Live-drawn "code editor" texture — HIGH RES + sharp filtering ─────────
function useCodeScreenTexture() {
  const canvasRef = useRef(null);
  const textureRef = useRef(null);
  const scrollRef = useRef(0);

  if (!canvasRef.current) {
    const canvas = document.createElement("canvas");
    // 2x resolution + devicePixelRatio-aware scaling → crisp text, no blur
    const scale = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = 1024 * scale;
    canvas.height = 640 * scale;
    canvasRef.current = canvas;

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = false;
    texture.anisotropy = 4;
    textureRef.current = texture;
    canvasRef.current._scale = scale;
  }

  const draw = (t) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const scale = canvas._scale;
    const W = canvas.width;
    const H = canvas.height;
    const lineHeight = 40 * scale;
    const fontSize = 26 * scale;

    ctx.fillStyle = "#050807";
    ctx.fillRect(0, 0, W, H);

    // fake tab bar
    ctx.fillStyle = "#0d1310";
    ctx.fillRect(0, 0, W, 46 * scale);
    ["#f87171", "#facc15", "#4ade80"].forEach((c, i) => {
      ctx.fillStyle = c;
      ctx.beginPath();
      ctx.arc((30 + i * 32) * scale, 23 * scale, 8 * scale, 0, Math.PI * 2);
      ctx.fill();
    });

    scrollRef.current += 0.5;
    const offset = scrollRef.current % (lineHeight * CODE_LINES.length);

    ctx.font = `${fontSize}px "Courier New", monospace`;
    ctx.textBaseline = "middle";

    for (let rep = 0; rep < 2; rep++) {
      CODE_LINES.forEach((line, i) => {
        const y = 80 * scale + (i + rep * CODE_LINES.length) * lineHeight - offset;
        if (y < 46 * scale || y > H) return;
        ctx.fillStyle = line.color;
        ctx.fillText(line.text, 34 * scale, y);
      });
    }

    if (Math.floor(t * 1.6) % 2 === 0) {
      ctx.fillStyle = "#4ade80";
      ctx.fillRect(34 * scale, H / 2 - 14 * scale, 14 * scale, 26 * scale);
    }

    textureRef.current.needsUpdate = true;
  };

  return { texture: textureRef, draw };
}

// ── Floating glowing code-snippet chips ─────────────────────────────────
const SNIPPETS = ["const", "{ }", "=>", "</>", "npm i", "git"];

function makeSnippetTexture(text, color) {
  const canvas = document.createElement("canvas");
  canvas.width = 320;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");
  ctx.font = "bold 56px monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.shadowColor = color;
  ctx.shadowBlur = 24;
  ctx.fillStyle = color;
  ctx.fillText(text, 160, 64);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function CodeParticles({ count = 8 }) {
  const groupRef = useRef();

  const items = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const color = i % 2 === 0 ? "#4ade80" : "#38bdf8";
      const text = SNIPPETS[i % SNIPPETS.length];
      return {
        texture: makeSnippetTexture(text, color),
        pos: [
          (Math.random() - 0.5) * 4.2,
          (Math.random() - 0.5) * 2.6,
          (Math.random() - 0.5) * 2,
        ],
        speed: 0.15 + Math.random() * 0.25,
        offset: Math.random() * Math.PI * 2,
        scale: 0.32 + Math.random() * 0.14,
      };
    });
  }, [count]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.children.forEach((sprite, i) => {
      const item = items[i];
      sprite.position.y = item.pos[1] + Math.sin(t * item.speed + item.offset) * 0.3;
      sprite.position.x = item.pos[0] + Math.cos(t * item.speed * 0.6 + item.offset) * 0.15;
      sprite.material.opacity = 0.5 + Math.sin(t * item.speed * 2 + item.offset) * 0.25;
    });
  });

  return (
    <group ref={groupRef}>
      {items.map((item, i) => (
        <sprite key={i} position={item.pos} scale={[item.scale * 2.5, item.scale, 1]}>
          <spriteMaterial map={item.texture} transparent opacity={0.65} depthWrite={false} />
        </sprite>
      ))}
    </group>
  );
}

// ── Laptop model ──────────────────────────────────────────────────────────
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

function LaptopModel({ mountProgress, scrollProgress, tiltRef, ...props }) {
  const { scene } = useGLTF("/models/laptop.glb");
  const groupRef = useRef();
  const screenMeshRef = useRef(null);
  const baseZRotationRef = useRef(0);
  const currentTiltX = useRef(0);
  const currentTiltY = useRef(0);
  const { texture: screenTexture, draw: drawScreen } = useCodeScreenTexture();
  const lastDraw = useRef(0);

  useEffect(() => {
    let screenMesh = null;
    scene.traverse((child) => {
      if (child.isMesh && child.material?.name === "LCD_Screen") screenMesh = child;
    });
    if (!screenMesh) {
      console.warn("[LaptopScene] LCD_Screen mesh not found.");
      return;
    }

    screenMeshRef.current = screenMesh;
    baseZRotationRef.current = screenMesh.rotation.z;
    screenMesh.material.color = new THREE.Color("#050807");
    screenMesh.material.emissive = new THREE.Color("#050807");
    screenMesh.material.emissiveIntensity = 0;

    screenMesh.geometry.computeBoundingBox();
    const bbox = screenMesh.geometry.boundingBox;
    const size = new THREE.Vector3();
    bbox.getSize(size);
    const center = new THREE.Vector3();
    bbox.getCenter(center);

    const normal = getAverageNormal(screenMesh.geometry);
    let up = new THREE.Vector3(0, 1, 0).sub(normal.clone().multiplyScalar(normal.y));
    if (up.lengthSq() < 1e-4) up.set(0, 0, 1).sub(normal.clone().multiplyScalar(normal.z));
    up.normalize();
    const right = new THREE.Vector3().crossVectors(up, normal).normalize();
    up.crossVectors(normal, right).normalize();
    const basis = new THREE.Matrix4().makeBasis(right, up, normal);
    const orientQuat = new THREE.Quaternion().setFromRotationMatrix(basis);

    const dims = [
      { axis: "x", val: size.x },
      { axis: "y", val: size.y },
      { axis: "z", val: size.z },
    ].sort((a, b) => b.val - a.val);
    const width = dims[0].val || 0.5;
    const height = dims[1].val || 0.3;

     const planeGeo = new THREE.PlaneGeometry(width * 0.8, height * 0.78);
    const planeMat = new THREE.MeshBasicMaterial({ map: screenTexture.current, toneMapped: false });
    const plane = new THREE.Mesh(planeGeo, planeMat);
    plane.name = "ScreenCanvasPlane";
    plane.position.copy(center).add(normal.clone().multiplyScalar(0.006));
    plane.quaternion.copy(orientQuat);
    plane.scale.x = FLIP_HORIZONTAL ? -1 : 1;
    plane.scale.y = FLIP_VERTICAL ? -1 : 1;

    screenMesh.add(plane);

    return () => {
      screenMesh.remove(plane);
    };
  }, [scene]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    if (state.clock.elapsedTime - lastDraw.current > 0.07) {
      drawScreen(state.clock.elapsedTime);
      lastDraw.current = state.clock.elapsedTime;
    }

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

      <ambientLight intensity={0.85} />
      <directionalLight position={[3, 5, 4]} intensity={1.5} />
      <directionalLight position={[-4, 1, -3]} intensity={0.6} color="#38bdf8" />
      <pointLight position={[-2, 1, -3]} intensity={1.2} color="#4ade80" distance={6} />

        <Bounds fit clip observe margin={1.35}>
        <Center>
          <LaptopModel mountProgress={mountProgress} scrollProgress={scrollProgress} tiltRef={tiltRef} />
        </Center>
      </Bounds>

      <CodeParticles count={8} />
    </Canvas>
  );
}