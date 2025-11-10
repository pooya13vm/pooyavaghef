// meshline.d.ts
import * as THREE from "three";
import type { Object3DNode } from "@react-three/fiber";

declare module "meshline" {
  export class MeshLineGeometry extends THREE.BufferGeometry {
    setPoints(points: THREE.Vector3[]): void;
  }

  export interface MeshLineMaterialParameters
    extends THREE.ShaderMaterialParameters {
    color?: THREE.ColorRepresentation;
    lineWidth?: number;
    map?: THREE.Texture;
    repeat?: [number, number];
    useMap?: boolean;
    resolution?: [number, number];
    depthTest?: boolean;
  }

  export class MeshLineMaterial extends THREE.ShaderMaterial {
    constructor(parameters?: MeshLineMaterialParameters);

    color: THREE.Color;
    lineWidth: number;
    map?: THREE.Texture;
    repeat?: [number, number];
    useMap?: boolean;
    resolution?: [number, number];
    depthTest?: boolean;
  }
}

// حالا JSX تگ‌های مخصوص meshline رو به React Three Fiber معرفی می‌کنیم
declare module "@react-three/fiber" {
  interface ThreeElements {
    meshLineGeometry: Object3DNode<
      import("meshline").MeshLineGeometry,
      typeof import("meshline").MeshLineGeometry
    >;
    meshLineMaterial: Object3DNode<
      import("meshline").MeshLineMaterial,
      typeof import("meshline").MeshLineMaterial
    >;
  }
}
