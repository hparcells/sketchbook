import { FullSketchbook } from '@/types/types';

function SketchbookDays({ sketchbook }: { sketchbook: FullSketchbook }) {
  return <p>{JSON.stringify(sketchbook.days)}</p>;
}

export default SketchbookDays;
