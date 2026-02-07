import { Link } from '@tanstack/react-router';
import { ShoppingCart, Users, Sword, Coins, Crown, Zap, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { categories } from '../data/products';
import { useCartStore } from '../state/cart';

export default function HomePage() {
  const totalItems = useCartStore((state) => state.getTotalItems());

  const categoryIcons: Record<string, React.ReactNode> = {
    'lifesteal': <Sword className="mr-2 h-6 w-6 text-red-500" />,
    'tokensmp': <Coins className="mr-2 h-6 w-6 text-amber-500" />,
    'aurasmp': <Zap className="mr-2 h-6 w-6 text-purple-500" />,
    'boxpvp': <Crown className="mr-2 h-6 w-6 text-blue-500" />,
    'bundle': <Gift className="mr-2 h-6 w-6 text-pink-500" />,
  };

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
            className="mx-auto mb-8 h-32 w-32 animate-float"
          />
          <h1 className="mb-2 text-5xl font-bold tracking-tight md:text-6xl animate-glow">
            Aura MC Store
          </h1>
          <p className="mb-6 text-3xl font-extrabold tracking-wide text-primary animate-shimmer bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto]">
            Farm the Aura
          </p>
          <p className="mb-2 text-2xl font-semibold text-muted-foreground">
            🎮 Happy Gaming
          </p>
          <p className="mb-8 text-2xl font-semibold text-muted-foreground">
            🛒 Happy Shopping
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
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {categories.map((category) => (
            <Link
              key={category.id}
              to="/category/$categoryId"
              params={{ categoryId: category.id }}
            >
              <Card className="group cursor-pointer transition-all hover:scale-105 hover:shadow-lg">
                <CardContent className="flex h-40 items-center justify-center p-6">
                  <h3 className="flex items-center text-xl font-bold group-hover:text-primary text-center">
                    {categoryIcons[category.id]}
                    {category.name}
                  </h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="overflow-hidden border-2 border-dashed border-muted-foreground/30">
          <div className="relative">
            <img
              src="/assets/generated/auramc-coming-soon-banner.dim_1600x500.png"
              alt="Mini Game Store Coming Soon"
              className="h-48 w-full object-cover opacity-50"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm">
              <div className="text-center">
                <h3 className="mb-2 text-3xl font-bold">🎯 Mini Game Store</h3>
                <p className="text-xl font-semibold text-muted-foreground">Coming Soon!</p>
              </div>
            </div>
          </div>
        </Card>
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
