import { useParams, Link } from '@tanstack/react-router';
import { ArrowLeft, ShoppingCart, Plus, Crown, Coins, Banknote, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getCategoryById } from '../data/products';
import { useCartStore } from '../state/cart';
import { formatINR } from '../utils/inr';
import { toast } from 'sonner';
import { useState } from 'react';

export default function CategoryPage() {
  const { categoryId } = useParams({ from: '/category/$categoryId' });
  const category = getCategoryById(categoryId);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const addItem = useCartStore((state) => state.addItem);
  const totalItems = useCartStore((state) => state.getTotalItems());

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="mb-4 text-2xl font-bold">Category not found</h1>
        <Button asChild>
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>
    );
  }

  const handleAddToCart = (productId: string, productName: string, price: number, subcategoryName: string) => {
    addItem({
      id: productId,
      name: productName,
      category: category.name,
      subcategory: subcategoryName,
      price,
    });
    toast.success(`${productName} added to cart!`);
  };

  const subcategoryIcons: Record<string, React.ReactNode> = {
    'ranks': <Crown className="mr-2 h-5 w-5 text-amber-500" />,
    'coins': <Coins className="mr-2 h-5 w-5 text-yellow-500" />,
    'money': <Banknote className="mr-2 h-5 w-5 text-green-500" />,
    'special': <Gift className="mr-2 h-5 w-5 text-pink-500" />,
  };

  // Special handling for Bundle category - show products directly
  if (categoryId === 'bundle') {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button asChild variant="outline" size="icon">
                <Link to="/">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
              <h1 className="text-3xl font-bold">{category.name}</h1>
            </div>
            {totalItems > 0 && (
              <Button asChild className="gap-2">
                <Link to="/cart">
                  <ShoppingCart className="h-4 w-4" />
                  Cart ({totalItems})
                </Link>
              </Button>
            )}
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {category.subcategories[0]?.products.map((product) => (
              <Card key={product.id} className="flex flex-col border-2 border-primary/20 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Gift className="h-6 w-6 text-pink-500" />
                    {product.name}
                  </CardTitle>
                  <CardDescription className="text-3xl font-bold text-primary">
                    {formatINR(product.price)}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  {product.bundleRewards && (
                    <div className="space-y-3">
                      <p className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                        Includes:
                      </p>
                      <ul className="space-y-2">
                        {product.bundleRewards.map((reward, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-primary mt-1">✓</span>
                            <span className="text-base font-medium">{reward}</span>
                          </li>
                        ))}
                      </ul>
                      {product.bundleNote && (
                        <div className="mt-4 rounded-lg bg-accent/50 p-3">
                          <p className="text-sm font-semibold text-accent-foreground">
                            ℹ️ {product.bundleNote}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full gap-2"
                    size="lg"
                    onClick={() =>
                      handleAddToCart(
                        product.id,
                        product.name,
                        product.price,
                        category.subcategories[0].name
                      )
                    }
                  >
                    <Plus className="h-4 w-4" />
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button asChild variant="outline" size="icon">
              <Link to="/">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="text-3xl font-bold">{category.name}</h1>
          </div>
          {totalItems > 0 && (
            <Button asChild className="gap-2">
              <Link to="/cart">
                <ShoppingCart className="h-4 w-4" />
                Cart ({totalItems})
              </Link>
            </Button>
          )}
        </div>

        {!selectedSubcategory ? (
          <div>
            <h2 className="mb-6 text-xl font-semibold">Select a Category</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {category.subcategories.map((subcategory) => (
                <Card
                  key={subcategory.id}
                  className="group cursor-pointer transition-all hover:scale-105 hover:shadow-lg"
                  onClick={() => setSelectedSubcategory(subcategory.id)}
                >
                  <CardContent className="flex h-32 items-center justify-center p-6">
                    <h3 className="flex items-center text-xl font-bold group-hover:text-primary">
                      {subcategoryIcons[subcategory.id]}
                      {subcategory.name}
                    </h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6 flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedSubcategory(null)}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <h2 className="flex items-center text-2xl font-semibold">
                {subcategoryIcons[selectedSubcategory]}
                {category.subcategories.find((s) => s.id === selectedSubcategory)?.name}
              </h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {category.subcategories
                .find((s) => s.id === selectedSubcategory)
                ?.products.map((product) => (
                  <Card key={product.id} className="flex flex-col">
                    <CardHeader>
                      <CardTitle className="text-lg">{product.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <Badge variant="secondary" className="text-lg font-bold">
                        {formatINR(product.price)}
                      </Badge>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className="w-full gap-2"
                        onClick={() =>
                          handleAddToCart(
                            product.id,
                            product.name,
                            product.price,
                            category.subcategories.find((s) => s.id === selectedSubcategory)?.name || ''
                          )
                        }
                      >
                        <Plus className="h-4 w-4" />
                        Add to Cart
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
