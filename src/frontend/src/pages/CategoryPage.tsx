import { useParams, Link } from '@tanstack/react-router';
import { ArrowLeft, ShoppingCart, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
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
                    <h3 className="text-xl font-bold group-hover:text-primary">
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
              <h2 className="text-2xl font-semibold">
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
