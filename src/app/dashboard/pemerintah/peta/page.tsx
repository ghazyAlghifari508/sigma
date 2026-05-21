import PetaClient from "./peta-client";

export default function PetaPemerintahPage() {
  // Data di-fetch client-side via API route (GeoJSON terlalu besar untuk SSR)
  return <PetaClient />;
}
