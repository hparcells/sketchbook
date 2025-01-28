async function Sketchbook({ params }: { params: Promise<{ sketchbook: string }> }) {
  const sketchbook = (await params).sketchbook;

  return <p>{sketchbook}</p>;
}

export default Sketchbook;
