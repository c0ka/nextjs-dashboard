import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Zap, Shield, BarChart3, Users, Globe, Clock } from "lucide-react";

const features = [
  {
    title: "Fast & Reliable",
    description: "Built on Next.js for incredible speed and reliability.",
    icon: Zap,
  },
  {
    title: "Secure by Default",
    description: "Enterprise-grade security to protect your data.",
    icon: Shield,
  },
  {
    title: "Real-time Analytics",
    description: "Track your revenue and customer growth in real-time.",
    icon: BarChart3,
  },
  {
    title: "Multi-user Access",
    description: "Collaborate with your team with role-based access.",
    icon: Users,
  },
  {
    title: "Global Compliance",
    description: "Compliant with international accounting standards.",
    icon: Globe,
  },
  {
    title: "24/7 Support",
    description: "Our dedicated support team is always here to help.",
    icon: Clock,
  },
];

export function Features() {
  return (
    <section id="features" className="@container py-20 bg-muted/50">
      <div className="mx-auto px-4 @md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight @md:text-4xl mb-4">
            Everything you need
          </h2>
          <p className="text-xl text-muted-foreground max-w-[800px] mx-auto">
            Powerful features to help you manage your business efficiently.
          </p>
        </div>
        <div className="grid grid-cols-1 @md:grid-cols-2 @lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="bg-background border-none shadow-sm hover:shadow-md transition-shadow"
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
                    <Icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
