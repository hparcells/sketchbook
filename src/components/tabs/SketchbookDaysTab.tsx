import { FullSketchbook } from '@/types/types';

function SketchbookDaysTab({ sketchbook }: { sketchbook: FullSketchbook }) {
  return <p>{JSON.stringify(sketchbook.days)}</p>;
}

export default SketchbookDaysTab;
