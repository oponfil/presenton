/** Minimal process declaration for Next.js (client inlines NEXT_PUBLIC_*; server uses env/cwd) */
declare const process: {
  env: Record<string, string | undefined>;
  cwd: () => string;
};

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
