import Link from "next/link";
import AcmeLogo from "@/components/ui/acme-logo";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="@container sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-16 items-center px-4 @md:px-6">
        <Link className="mr-6 flex items-center space-x-2" href="/">
          <div className="w-min text-primary">
            <AcmeLogo />
          </div>
        </Link>
        <nav className="hidden @md:flex items-center gap-6 text-sm font-medium">
          <Link
            className="transition-colors hover:text-foreground/80 text-foreground/60"
            href="#features"
          >
            Features
          </Link>
          <Link
            className="transition-colors hover:text-foreground/80 text-foreground/60"
            href="/news"
          >
            News
          </Link>
          <Link
            className="transition-colors hover:text-foreground/80 text-foreground/60"
            href="/docs"
          >
            Docs
          </Link>
          <Link
            className="transition-colors hover:text-foreground/80 text-foreground/60"
            href="#pricing"
          >
            Pricing
          </Link>

          <Link
            className="transition-colors hover:text-foreground/80 text-foreground/60"
            href="#about"
          >
            About
          </Link>
        </nav>
        <div className="ml-auto flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost" size="sm">
              Log in
            </Button>
          </Link>
          <Link href="/signup">
            <Button size="sm">Sign up</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
