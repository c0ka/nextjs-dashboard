
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="@container">
      <div className="mx-auto grid @lg:grid-cols-2 gap-12 items-center py-20 px-4 @md:px-6 @md:py-32">
      <div className="flex flex-col gap-6 items-start">
        <h1 className="text-4xl font-extrabold tracking-tight @lg:text-5xl @xl:text-6xl text-balance">
          Manage your invoices with
          <span className="text-primary"> Acme Dashboard</span>
        </h1>
        <p className="text-lg text-muted-foreground @md:text-xl text-balance max-w-[600px]">
          The complete platform for small businesses to manage customers, invoices, and payments. Simple, fast, and secure.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link href="/login">
            <Button size="lg" className="w-full sm:w-auto gap-2 text-base h-12 px-8">
              Start for free <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="#features">
            <Button variant="outline" size="lg" className="w-full sm:w-auto text-base h-12 px-8">
              Learn more
            </Button>
          </Link>
        </div>
        <p className="text-sm text-muted-foreground">
          No credit card required · 14-day free trial
        </p>
      </div>
      <div className="flex justify-center @lg:justify-end relative">
         <div className="relative rounded-lg border bg-background p-2 shadow-2xl">
            <div className="rounded-md bg-muted overflow-hidden relative">
                <Image
                    src="/hero-desktop.png"
                    width={1000}
                    height={760}
                    className="hidden @md:block w-full h-auto object-cover rounded-md"
                    alt="Screenshots of the dashboard project showing desktop version"
                    priority
                />
                <Image
                    src="/hero-mobile.png"
                    width={560}
                    height={620}
                    className="block @md:hidden w-full h-auto object-cover rounded-md"
                    alt="Screenshots of the dashboard project showing mobile version"
                />
            </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute -z-10 top-0 right-0 w-72 h-72 bg-primary/20 rounded-full blur-3xl opacity-50" />
        <div className="absolute -z-10 bottom-0 left-0 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl opacity-50" />
      </div>
     </div>
    </section>
  );
}
