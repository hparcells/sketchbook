async function Sketchbook({ params }: { params: Promise<{ sketchbookId: string }> }) {
  const sketchbookId = (await params).sketchbookId;

  return <p>{sketchbookId}</p>;
}

export default Sketchbook;
