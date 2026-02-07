import { useParams, Link } from '@tanstack/react-router';
import { CheckCircle, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetOrderById } from '../hooks/useQueries';
import { formatINR } from '../utils/inr';

export default function OrderConfirmationPage() {
  const { orderId } = useParams({ from: '/order/$orderId' });
  const { data: order, isLoading, isError } = useGetOrderById(BigInt(orderId));

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Card className="mx-auto max-w-2xl">
          <CardHeader>
            <Skeleton className="h-8 w-64" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="mb-4 text-3xl font-bold">Order Not Found</h1>
        <p className="mb-8 text-muted-foreground">
          The order you're looking for doesn't exist or you don't have permission to view it.
        </p>
        <Button asChild size="lg">
          <Link to="/">
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>
    );
  }

  const orderDate = new Date(Number(order.timestamp) / 1000000);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 text-center">
            <CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-500" />
            <h1 className="mb-2 text-3xl font-bold">Order Confirmed!</h1>
            <p className="text-muted-foreground">
              Thank you for your purchase. Your order has been received.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Order ID</p>
                  <p className="font-mono font-semibold">#{order.id.toString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Date</p>
                  <p className="font-semibold">{orderDate.toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Minecraft Username
                  </p>
                  <p className="font-semibold">{order.buyer}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    UPI Reference
                  </p>
                  <p className="font-mono font-semibold">{order.upiRef}</p>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="mb-4 font-semibold">Items Purchased</h3>
                <div className="space-y-3">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-lg border p-3"
                    >
                      <div>
                        <p className="font-medium">{item.product}</p>
                        <p className="text-sm text-muted-foreground">
                          Quantity: {item.quantity.toString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">
                          {formatINR(Number(item.unitPriceINR))}
                        </p>
                        <p className="text-sm text-muted-foreground">per item</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="flex justify-between text-xl font-bold">
                <span>Total Paid</span>
                <span>{formatINR(Number(order.totalINR))}</span>
              </div>

              <div className="rounded-lg bg-muted/50 p-4">
                <p className="text-sm text-muted-foreground">
                  Your items will be delivered to your Minecraft account shortly. If you
                  have any questions, please contact our support team on Discord.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <Button asChild size="lg">
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
