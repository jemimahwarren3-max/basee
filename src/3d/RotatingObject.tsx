import { Environment, OrbitControls } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import type { Mesh } from 'three'

function Spinner() {
  const mesh = useRef<Mesh>(null)

  useFrame((_, delta) => {
    if (!mesh.current) return
    mesh.current.rotation.x += delta * 0.3
    mesh.current.rotation.y += delta * 0.5
  })

  return (
    <mesh ref={mesh}>
      <torusKnotGeometry args={[0.8, 0.25, 128, 32]} />
      <meshStandardMaterial color="#d4af37" roughness={0.25} metalness={0.9} />
    </mesh>
  )
}

interface RotatingObjectProps {
  className?: string
}

/**
 * Minimal, reusable R3F scene: a lit, rotating object with orbit controls and an HDRI
 * environment. Swap `Spinner`'s geometry/material or the environment preset per client brief —
 * this exists to prove the 3D pipeline renders, not as a finished product scene.
 */
export function RotatingObject({ className }: RotatingObjectProps) {
  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[3, 3, 3]} intensity={1.2} />
        <Spinner />
        <Environment preset="city" />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  )
}
