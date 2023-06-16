import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h1>404 | Page not found</h1>
      <Link href="/">Got to main.</Link>
    </div>
  );
}
