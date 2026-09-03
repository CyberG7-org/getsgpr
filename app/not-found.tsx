import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container-x py-24">
      <h1>Page not found</h1>
      <p className="lead mt-4">
        The page you asked for is not here. Try the <Link href="/">home page</Link> or{" "}
        <Link href="/contact">contact us</Link>.
      </p>
    </main>
  );
}
