import { Link } from '@tanstack/react-router';
import { ShoppingCart, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { categories } from '../data/products';
import { useCartStore } from '../state/cart';

export default function HomePage() {
  const totalItems = useCartStore((state) => state.getTotalItems());

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-accent/20 to-background">
        <div className="absolute inset-0 opacity-30">
          <img
            src="/assets/generated/aura-mc-hero-banner.dim_1600x600.png"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div className="container relative mx-auto px-4 py-24 text-center">
          <img
            src="/assets/generated/aura-mc-logo.dim_512x512.png"
            alt="Aura MC"
            className="mx-auto mb-8 h-32 w-32"
          />
          <h1 className="mb-4 text-5xl font-bold tracking-tight md:text-6xl">
            Aura MC Store
          </h1>
          <p className="mb-2 text-2xl font-semibold text-muted-foreground">
            Happy Gaming
          </p>
          <p className="mb-8 text-2xl font-semibold text-muted-foreground">
            Happy Shopping
          </p>
          
          <div className="mx-auto mb-8 max-w-2xl space-y-4">
            <div className="rounded-lg border bg-card p-4">
              <p className="mb-2 text-sm font-medium text-muted-foreground">
                Server IP
              </p>
              <p className="text-xl font-mono font-bold">play.auramc.xyz</p>
            </div>
            
            <Button asChild size="lg" className="gap-2">
              <a
                href="https://discord.gg/P8ZVVXYJAf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Users className="h-5 w-5" />
                Join Our Discord Server
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="mb-8 text-center text-3xl font-bold">
          Choose Your Game Mode
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              to="/category/$categoryId"
              params={{ categoryId: category.id }}
            >
              <Card className="group cursor-pointer transition-all hover:scale-105 hover:shadow-lg">
                <CardContent className="flex h-40 items-center justify-center p-6">
                  <h3 className="text-2xl font-bold group-hover:text-primary">
                    {category.name}
                  </h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Cart CTA */}
      {totalItems > 0 && (
        <div className="fixed bottom-8 right-8 z-50">
          <Button asChild size="lg" className="gap-2 shadow-lg">
            <Link to="/cart">
              <ShoppingCart className="h-5 w-5" />
              View Cart ({totalItems})
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
