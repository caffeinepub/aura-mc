import { useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useCartStore } from '../state/cart';
import { useCreateOrder } from '../hooks/useQueries';
import { formatINR } from '../utils/inr';
import { toast } from 'sonner';
import type { OrderItem } from '../backend';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const items = useCartStore((state) => state.items);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice());
  const clearCart = useCartStore((state) => state.clearCart);
  const { mutate: createOrder, isPending } = useCreateOrder();

  const [minecraftUsername, setMinecraftUsername] = useState('');
  const [discordName, setDiscordName] = useState('');
  const [upiReference, setUpiReference] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!minecraftUsername.trim()) {
      toast.error('Please enter your Minecraft username');
      return;
    }

    if (!discordName.trim()) {
      toast.error('Please enter your Discord name');
      return;
    }

    if (!upiReference.trim()) {
      toast.error('Please enter your UPI transaction reference');
      return;
    }

    const orderItems: OrderItem[] = items.map((item) => ({
      product: item.name,
      unitPriceINR: BigInt(item.price),
      quantity: BigInt(item.quantity),
    }));

    createOrder(
      {
        buyer: minecraftUsername,
        discordName: discordName,
        upiRef: upiReference,
        items: orderItems,
      },
      {
        onSuccess: (orderId) => {
          clearCart();
          toast.success('Order placed successfully!');
          navigate({ to: '/order/$orderId', params: { orderId: orderId.toString() } });
        },
        onError: (error) => {
          toast.error(`Failed to create order: ${error.message}`);
        },
      }
    );
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="mb-4 text-3xl font-bold">No Items in Cart</h1>
        <p className="mb-8 text-muted-foreground">
          Please add items to your cart before checking out.
        </p>
        <Button asChild size="lg">
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Continue Shopping
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center gap-4">
          <Button asChild variant="outline" size="icon">
            <Link to="/cart">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Checkout</h1>
        </div>

        <div className="mx-auto max-w-4xl">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-8 lg:grid-cols-2">
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="minecraft-username">
                        Minecraft Username *
                      </Label>
                      <Input
                        id="minecraft-username"
                        placeholder="Enter your Minecraft username"
                        value={minecraftUsername}
                        onChange={(e) => setMinecraftUsername(e.target.value)}
                        required
                      />
                      <p className="text-xs text-muted-foreground">
                        Please enter your name exactly as it appears in Minecraft
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="discord-name">
                        Discord Name *
                      </Label>
                      <Input
                        id="discord-name"
                        placeholder="Enter your Discord name"
                        value={discordName}
                        onChange={(e) => setDiscordName(e.target.value)}
                        required
                      />
                      <p className="text-xs text-muted-foreground">
                        Please enter your name exactly as it appears in Discord
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="upi-reference">
                        UPI Transaction Reference (UTR) *
                      </Label>
                      <Input
                        id="upi-reference"
                        placeholder="Enter UPI transaction reference"
                        value={upiReference}
                        onChange={(e) => setUpiReference(e.target.value)}
                        required
                      />
                      <p className="text-xs text-muted-foreground">
                        Complete your UPI payment and enter the transaction reference number here
                      </p>
                    </div>

                    <div className="rounded-lg border bg-muted/50 p-4">
                      <h4 className="mb-2 font-semibold">UPI Payment Instructions</h4>
                      <ol className="list-inside list-decimal space-y-1 text-sm text-muted-foreground">
                        <li>Complete payment via your UPI app</li>
                        <li>Note down the transaction reference (UTR)</li>
                        <li>Enter the UTR above and submit</li>
                      </ol>
                    </div>

                    <div className="rounded-lg border border-amber-500/50 bg-amber-500/10 p-4">
                      <p className="text-sm text-amber-900 dark:text-amber-200">
                        ⏱️ <strong>Please note:</strong> Delivery may take time after payment confirmation. 
                        Your items will be delivered to your in-game account.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      {items.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            {item.name} × {item.quantity}
                          </span>
                          <span>{formatINR(item.price * item.quantity)}</span>
                        </div>
                      ))}
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>{formatINR(getTotalPrice)}</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      type="submit"
                      className="w-full"
                      size="lg"
                      disabled={isPending}
                    >
                      {isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        'Place Order'
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
