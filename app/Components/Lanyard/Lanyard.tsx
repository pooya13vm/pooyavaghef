// /*
// 	Installed from https://reactbits.dev/ts/tailwind/
// */

// /* eslint-disable react/no-unknown-property */
// "use client";
// import { useEffect, useRef, useState } from "react";
// import { Canvas, extend, useFrame } from "@react-three/fiber";
// import {
//   useGLTF,
//   useTexture,
//   Environment,
//   Lightformer,
// } from "@react-three/drei";
// import {
//   BallCollider,
//   CuboidCollider,
//   Physics,
//   RigidBody,
//   useRopeJoint,
//   useSphericalJoint,
//   RigidBodyProps,
// } from "@react-three/rapier";
// import { MeshLineGeometry, MeshLineMaterial } from "meshline";
// import * as THREE from "three";

// // replace with your own imports, see the usage snippet for details
// const cardGLB = "/lanyard/card.glb";
// const lanyard = "/lanyard/yard.png";

// extend({ MeshLineGeometry, MeshLineMaterial });

// interface LanyardProps {
//   position?: [number, number, number];
//   gravity?: [number, number, number];
//   fov?: number;
//   transparent?: boolean;
// }

// export default function Lanyard({
//   position = [0, 0, 30],
//   gravity = [0, -25, 0],
//   fov = 15,
//   transparent = true,
// }: LanyardProps) {
//   return (
//     <div className="relative z-0 w-full h-screen flex justify-center items-center transform scale-100 origin-center">
//       <Canvas
//         camera={{ position, fov }}
//         gl={{ alpha: transparent }}
//         onCreated={({ gl }) =>
//           gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)
//         }
//       >
//         <ambientLight intensity={Math.PI} />
//         <Physics gravity={gravity} timeStep={1 / 60}>
//           <Band />
//         </Physics>
//         <Environment blur={0.75}>
//           <Lightformer
//             intensity={2}
//             color="white"
//             position={[0, -1, 5]}
//             rotation={[0, 0, Math.PI / 3]}
//             scale={[100, 0.1, 1]}
//           />
//           <Lightformer
//             intensity={3}
//             color="white"
//             position={[-1, -1, 1]}
//             rotation={[0, 0, Math.PI / 3]}
//             scale={[100, 0.1, 1]}
//           />
//           <Lightformer
//             intensity={3}
//             color="white"
//             position={[1, 1, 1]}
//             rotation={[0, 0, Math.PI / 3]}
//             scale={[100, 0.1, 1]}
//           />
//           <Lightformer
//             intensity={10}
//             color="white"
//             position={[-10, 0, 14]}
//             rotation={[0, Math.PI / 2, Math.PI / 3]}
//             scale={[100, 10, 1]}
//           />
//         </Environment>
//       </Canvas>
//     </div>
//   );
// }

// interface BandProps {
//   maxSpeed?: number;
//   minSpeed?: number;
// }

// function Band({ maxSpeed = 50, minSpeed = 0 }: BandProps) {
//   // Using "any" for refs since the exact types depend on Rapier's internals
//   const band = useRef<any>(null);
//   const fixed = useRef<any>(null);
//   const j1 = useRef<any>(null);
//   const j2 = useRef<any>(null);
//   const j3 = useRef<any>(null);
//   const card = useRef<any>(null);

//   const vec = new THREE.Vector3();
//   const ang = new THREE.Vector3();
//   const rot = new THREE.Vector3();
//   const dir = new THREE.Vector3();

//   const segmentProps: any = {
//     type: "dynamic" as RigidBodyProps["type"],
//     canSleep: true,
//     colliders: false,
//     angularDamping: 4,
//     linearDamping: 4,
//   };

//   const { nodes, materials } = useGLTF(cardGLB) as any;
//   const texture = useTexture(lanyard);
//   const [curve] = useState(
//     () =>
//       new THREE.CatmullRomCurve3([
//         new THREE.Vector3(),
//         new THREE.Vector3(),
//         new THREE.Vector3(),
//         new THREE.Vector3(),
//       ])
//   );
//   const [dragged, drag] = useState<false | THREE.Vector3>(false);
//   const [hovered, hover] = useState(false);

//   const [isSmall, setIsSmall] = useState<boolean>(() => {
//     if (typeof window !== "undefined") {
//       return window.innerWidth < 1024;
//     }
//     return false;
//   });

//   useEffect(() => {
//     const handleResize = (): void => {
//       setIsSmall(window.innerWidth < 1024);
//     };

//     window.addEventListener("resize", handleResize);
//     return (): void => window.removeEventListener("resize", handleResize);
//   }, []);

//   useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
//   useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
//   useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
//   useSphericalJoint(j3, card, [
//     [0, 0, 0],
//     [0, 1.45, 0],
//   ]);

//   useEffect(() => {
//     if (hovered) {
//       document.body.style.cursor = dragged ? "grabbing" : "grab";
//       return () => {
//         document.body.style.cursor = "auto";
//       };
//     }
//   }, [hovered, dragged]);

//   useFrame((state, delta) => {
//     if (dragged && typeof dragged !== "boolean") {
//       vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
//       dir.copy(vec).sub(state.camera.position).normalize();
//       vec.add(dir.multiplyScalar(state.camera.position.length()));
//       [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
//       card.current?.setNextKinematicTranslation({
//         x: vec.x - dragged.x,
//         y: vec.y - dragged.y,
//         z: vec.z - dragged.z,
//       });
//     }
//     if (fixed.current) {
//       [j1, j2].forEach((ref) => {
//         if (!ref.current.lerped)
//           ref.current.lerped = new THREE.Vector3().copy(
//             ref.current.translation()
//           );
//         const clampedDistance = Math.max(
//           0.1,
//           Math.min(1, ref.current.lerped.distanceTo(ref.current.translation()))
//         );
//         ref.current.lerped.lerp(
//           ref.current.translation(),
//           delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
//         );
//       });
//       curve.points[0].copy(j3.current.translation());
//       curve.points[1].copy(j2.current.lerped);
//       curve.points[2].copy(j1.current.lerped);
//       curve.points[3].copy(fixed.current.translation());
//       band.current.geometry.setPoints(curve.getPoints(32));
//       ang.copy(card.current.angvel());
//       rot.copy(card.current.rotation());
//       card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
//     }
//   });

//   curve.curveType = "chordal";
//   texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
//   const offsetX = isSmall ? 0 : -1.8;
//   const offsetY = isSmall ? 1.7 : 0.5;
//   const cardScale = isSmall ? 2 : 2.25;

//   return (
//     <>
//       <group position={[0, 4, 0]}>
//         <RigidBody
//           ref={fixed}
//           {...segmentProps}
//           type={"fixed" as RigidBodyProps["type"]}
//           position={[offsetX, offsetY, 0]}
//         />
//         <RigidBody
//           position={[offsetX + 0.5, offsetY, 0]}
//           ref={j1}
//           {...segmentProps}
//           type={"dynamic" as RigidBodyProps["type"]}
//         >
//           <BallCollider args={[0.1]} />
//         </RigidBody>
//         <RigidBody
//           position={[1, 0, 0]}
//           ref={j2}
//           {...segmentProps}
//           type={"dynamic" as RigidBodyProps["type"]}
//         >
//           <BallCollider args={[0.1]} />
//         </RigidBody>
//         <RigidBody
//           position={[1.5, 0, 0]}
//           ref={j3}
//           {...segmentProps}
//           type={"dynamic" as RigidBodyProps["type"]}
//         >
//           <BallCollider args={[0.1]} />
//         </RigidBody>
//         <RigidBody
//           position={[2, 0, 0]}
//           ref={card}
//           {...segmentProps}
//           type={
//             dragged
//               ? ("kinematicPosition" as RigidBodyProps["type"])
//               : ("dynamic" as RigidBodyProps["type"])
//           }
//         >
//           <CuboidCollider args={[0.8, 1.125, 0.01]} />
//           <group
//             scale={cardScale}
//             position={[0, -1.2, -0.05]}
//             onPointerOver={() => hover(true)}
//             onPointerOut={() => hover(false)}
//             onPointerUp={(e: any) => {
//               e.target.releasePointerCapture(e.pointerId);
//               drag(false);
//             }}
//             onPointerDown={(e: any) => {
//               e.target.setPointerCapture(e.pointerId);
//               drag(
//                 new THREE.Vector3()
//                   .copy(e.point)
//                   .sub(vec.copy(card.current.translation()))
//               );
//             }}
//           >
//             <mesh geometry={nodes.card.geometry}>
//               <meshPhysicalMaterial
//                 map={materials.base.map}
//                 map-anisotropy={16}
//                 clearcoat={1}
//                 clearcoatRoughness={0.15}
//                 roughness={0.9}
//                 metalness={0.8}
//               />
//             </mesh>
//             <mesh
//               geometry={nodes.clip.geometry}
//               material={materials.metal}
//               material-roughness={0.3}
//             />
//             <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
//           </group>
//         </RigidBody>
//       </group>
//       <mesh ref={band}>
//         <meshLineGeometry />
//         <meshLineMaterial
//           color="white"
//           depthTest={true}
//           resolution={isSmall ? [1000, 2000] : [1000, 1000]}
//           useMap
//           map={texture}
//           repeat={[-4, 1]}
//           lineWidth={1}
//         />
//       </mesh>
//     </>
//   );
// }
/*
  Installed from https://reactbits.dev/ts/tailwind/
*/

/* eslint-disable react/no-unknown-property */
/*
  Installed from https://reactbits.dev/ts/tailwind/
*/

/* eslint-disable react/no-unknown-property */
"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import {
  useGLTF,
  useTexture,
  Environment,
  Lightformer,
} from "@react-three/drei";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
  RigidBodyProps,
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import * as THREE from "three";

const cardGLB = "/lanyard/card.glb";
const lanyard = "/lanyard/yard.png";

extend({ MeshLineGeometry, MeshLineMaterial });

type LanyardProps = {
  position?: [number, number, number];
  gravity?: [number, number, number];
  fov?: number;
  transparent?: boolean;
};

export default function Lanyard({
  position = [0, 0, 30],
  gravity = [0, -25, 0],
  fov = 15,
  transparent = true,
}: LanyardProps) {
  return (
    <div className="relative z-0 w-full h-screen flex justify-center items-center transform scale-100 origin-center pointer-events-auto">
      <Canvas
        camera={{ position, fov }}
        gl={{ alpha: transparent }}
        onCreated={({ gl }) =>
          gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)
        }
      >
        <ambientLight intensity={Math.PI} />
        <Physics gravity={gravity} timeStep={1 / 60}>
          <Band />
        </Physics>

        <Environment blur={0.75}>
          <Lightformer
            intensity={2}
            color="white"
            position={[0, -1, 5]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[-1, -1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[1, 1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={10}
            color="white"
            position={[-10, 0, 14]}
            rotation={[0, Math.PI / 2, Math.PI / 3]}
            scale={[100, 10, 1]}
          />
        </Environment>
      </Canvas>
    </div>
  );
}

type BandProps = {
  maxSpeed?: number;
  minSpeed?: number;
};

function Band({ maxSpeed = 50, minSpeed = 0 }: BandProps) {
  // Refs
  const band = useRef<any>(null);
  const fixed = useRef<any>(null);
  const j1 = useRef<any>(null);
  const j2 = useRef<any>(null);
  const j3 = useRef<any>(null);
  const card = useRef<any>(null);

  // Drag state (React) → برای کنترل type ریزی‌مونت سالم
  const [drag, setDrag] = useState<THREE.Vector3 | null>(null);

  // ابزارهای موقت
  const tmpVec = useMemo(() => new THREE.Vector3(), []);
  const tmpDir = useMemo(() => new THREE.Vector3(), []);
  const v0 = useMemo(() => new THREE.Vector3(), []);
  const v1 = useMemo(() => new THREE.Vector3(), []);
  const v2 = useMemo(() => new THREE.Vector3(), []);
  const v3p = useMemo(() => new THREE.Vector3(), []);

  // آخرین نقاط سالم طناب برای fallback (Safari)
  const lastGoodPts = useRef<THREE.Vector3[]>(
    new Array(33).fill(0).map((_, i) => new THREE.Vector3(i * 0.01, 0, 0))
  );

  // تنظیمات بادی‌ها
  const segmentProps: Partial<RigidBodyProps> = {
    type: "dynamic",
    canSleep: true,
    colliders: false,
    angularDamping: 4,
    linearDamping: 4,
  };

  const { nodes, materials } = useGLTF(cardGLB) as any;
  const texture = useTexture(lanyard);

  // منحنی طناب (centripetal = پایدارتر)
  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ])
  );
  curve.curveType = "centripetal";

  const [hovered, setHovered] = useState(false);
  const [isSmall, setIsSmall] = useState<boolean>(() => {
    if (typeof window !== "undefined") return window.innerWidth < 1024;
    return false;
  });

  useEffect(() => {
    const onResize = () => setIsSmall(window.innerWidth < 1024);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // اشاره‌گر
  useEffect(() => {
    if (!hovered) return;
    const prev = document.body.style.cursor;
    document.body.style.cursor = drag ? "grabbing" : "grab";
    return () => {
      document.body.style.cursor = prev;
    };
  }, [hovered, drag]);

  // Rope joints
  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.45, 0],
  ]);

  // کمکی‌ها
  const isFiniteV3 = (v: THREE.Vector3) =>
    Number.isFinite(v.x) && Number.isFinite(v.y) && Number.isFinite(v.z);

  const safeCopyFromTranslation = (out: THREE.Vector3, body: any) => {
    if (!body?.translation) return out.set(0, 0, 0);
    const t = body.translation();
    const x = Number(t?.x),
      y = Number(t?.y),
      z = Number(t?.z);
    if (Number.isFinite(x) && Number.isFinite(y) && Number.isFinite(z)) {
      out.set(x, y, z);
    } else {
      out.set(0, 0, 0);
    }
    return out;
  };

  // روی pointerup‌ سراسری هم درگ را جمع کنیم (برای Safari)
  useEffect(() => {
    const handleUp = () => setDrag(null);
    window.addEventListener("pointerup", handleUp);
    return () => window.removeEventListener("pointerup", handleUp);
  }, []);

  // لوپ فریم
  useFrame((state, delta) => {
    // اگر درگ می‌کنیم، کارت (کینماتیک) را به سمت اشاره‌گر ببریم
    if (drag && card.current?.setNextKinematicTranslation) {
      tmpVec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      tmpDir.copy(tmpVec).sub(state.camera.position).normalize();
      tmpVec.add(tmpDir.multiplyScalar(state.camera.position.length()));
      const off = drag;
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp?.());
      card.current.setNextKinematicTranslation({
        x: tmpVec.x - off.x,
        y: tmpVec.y - off.y,
        z: tmpVec.z - off.z,
      });
    }

    // آپدیت طناب و چرخش کارت
    if (
      fixed.current &&
      j1.current &&
      j2.current &&
      j3.current &&
      card.current
    ) {
      // لرپ پایدار
      [j1, j2].forEach((ref) => {
        const tr = safeCopyFromTranslation(v0, ref.current);
        if (!ref.current.lerped) ref.current.lerped = tr.clone();
        const speed =
          minSpeed +
          Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(tr))) *
            (maxSpeed - minSpeed);
        ref.current.lerped.lerp(tr, Math.min(1, delta * speed));
      });

      // نقاط طناب
      safeCopyFromTranslation(v0, j3.current); // پایین
      v1.copy(j2.current.lerped);
      v2.copy(j1.current.lerped);
      safeCopyFromTranslation(v3p, fixed.current); // سقف

      curve.points[0].copy(v0);
      curve.points[1].copy(v1);
      curve.points[2].copy(v2);
      curve.points[3].copy(v3p);

      const pts = curve.getPoints(32);
      const allFinite = pts.every(isFiniteV3);
      const safePts = allFinite ? pts : lastGoodPts.current;

      if (band.current?.geometry?.setPoints && safePts) {
        band.current.geometry.setPoints(safePts);
        // پاس اطمینان برای Safari
        const pos: any = band.current.geometry.getAttribute?.("position");
        if (pos?.array) {
          const arr = pos.array as Float32Array;
          let bad = false;
          for (let i = 0; i < arr.length; i++) {
            if (!Number.isFinite(arr[i])) {
              arr[i] = 0;
              bad = true;
            }
          }
          if (bad) band.current.geometry.attributes.position.needsUpdate = true;
        }
      }
      if (allFinite) {
        lastGoodPts.current = pts.map((p) => p.clone());
      }

      // پایدارسازی چرخش کارت
      const ang = card.current.angvel?.();
      const rot = card.current.rotation?.();
      const ax = Number(ang?.x) || 0;
      const ay = Number(ang?.y) || 0;
      const az = Number(ang?.z) || 0;
      const ry = Number(rot?.y) || 0;
      card.current.setAngvel?.({ x: ax, y: ay - ry * 0.25, z: az }, true);
    }
  });

  // تنظیمات تکسچر بند
  const offsetX = isSmall ? 0 : -1.8;
  const offsetY = isSmall ? 1.7 : 0.5;
  const cardScale = isSmall ? 2 : 2.25;
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody
          ref={fixed}
          {...segmentProps}
          type={"fixed" as RigidBodyProps["type"]}
          position={[offsetX, offsetY, 0]}
        />
        <RigidBody
          ref={j1}
          position={[offsetX + 0.5, offsetY, 0]}
          {...segmentProps}
        >
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody ref={j2} position={[1, 0, 0]} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody ref={j3} position={[1.5, 0, 0]} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>

        {/* نکتهٔ مهم: نوع کارت را با state کنترل می‌کنیم */}
        <RigidBody
          ref={card}
          position={[2, 0, 0]}
          {...segmentProps}
          type={
            (drag ? "kinematicPosition" : "dynamic") as RigidBodyProps["type"]
          }
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={cardScale}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            onPointerDown={(e: any) => {
              // حفظ دریافت رویدادها حتی اگر نشانگر از مش خارج شود
              e.target.setPointerCapture?.(e.pointerId);
              // آفست درگ نسبت به مرکز کارت
              const anchor = new THREE.Vector3(
                Number(card.current?.translation()?.x) || 0,
                Number(card.current?.translation()?.y) || 0,
                Number(card.current?.translation()?.z) || 0
              );
              const click = (e.point as THREE.Vector3) ?? new THREE.Vector3();
              setDrag(click.clone().sub(anchor));
            }}
            onPointerUp={(e: any) => {
              e.target.releasePointerCapture?.(e.pointerId);
              setDrag(null);
              // مهار سرعت‌ها برای جلوگیری از پرش/NaN
              card.current?.setLinvel?.({ x: 0, y: 0, z: 0 }, true);
              card.current?.setAngvel?.({ x: 0, y: 0, z: 0 }, true);
            }}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                map={materials.base.map}
                map-anisotropy={16}
                clearcoat={1}
                clearcoatRoughness={0.15}
                roughness={0.9}
                metalness={0.8}
              />
            </mesh>
            <mesh
              geometry={nodes.clip.geometry}
              material={materials.metal}
              material-roughness={0.3}
            />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>

      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={true}
          resolution={isSmall ? [1000, 2000] : [1000, 1000]}
          useMap
          map={texture}
          repeat={[-4, 1]}
          lineWidth={1}
        />
      </mesh>
    </>
  );
}
