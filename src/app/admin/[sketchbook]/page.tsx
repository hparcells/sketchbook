async function AdminSketchbook({ params }: { params: Promise<{ sketchbook: string }> }) {
  const sketchbook = (await params).sketchbook;

  return <p>{sketchbook}</p>;
}

export default AdminSketchbook;
