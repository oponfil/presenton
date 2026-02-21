/** Next.js inlines NEXT_PUBLIC_* at build time; this declaration satisfies TypeScript in client code */
declare const process: { env: Record<string, string | undefined> };

interface ShapeProps {
  id: string;
  type: 'rectangle' | 'circle' | 'line';
  position: { x: number; y: number };
  size: { width: number; height: number };
  // Add other properties as needed
}

interface TextFrameProps {
  id: string;
  content: string;
  position: { x: number; y: number };
  // Add other properties as needed
}
