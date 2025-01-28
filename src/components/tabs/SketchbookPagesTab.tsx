import { FullSketchbook } from '@/types/types';

function SketchbookPages({ sketchbook }: { sketchbook: FullSketchbook }) {
  return <p>{JSON.stringify(sketchbook.pages)}</p>;
}

export default SketchbookPages;
