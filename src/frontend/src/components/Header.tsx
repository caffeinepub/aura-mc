import { Link } from '@tanstack/react-router';
import { ShoppingCart, LogIn, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useCartStore } from '../state/cart';
import { useQueryClient } from '@tanstack/react-query';
import { useGetCallerUserProfile } from '../hooks/useQueries';
import { formatINR } from '../utils/inr';

export default function Header() {
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const { data: userProfile } = useGetCallerUserProfile();
  const queryClient = useQueryClient();
  const totalItems = useCartStore((state) => state.getTotalItems());
  const totalPrice = useCartStore((state) => state.getTotalPrice());

  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
    } else {
      try {
        await login();
      } catch (error: any) {
        console.error('Login error:', error);
        if (error.message === 'User is already authenticated') {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/assets/generated/aura-mc-logo.dim_512x512.png"
            alt="Aura MC"
            className="h-10 w-10 animate-float"
          />
          <span className="text-xl font-bold animate-glow">Aura MC</span>
        </Link>

        <nav className="flex items-center gap-4">
          {isAuthenticated && userProfile && (
            <div className="flex items-center gap-2 text-sm">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">{userProfile.name}</span>
            </div>
          )}
          
          <Button asChild variant="outline" size="sm" className="relative gap-2">
            <Link to="/cart">
              <ShoppingCart className="h-4 w-4" />
              {totalItems > 0 && (
                <>
                  <span className="hidden sm:inline">{formatINR(totalPrice)}</span>
                  <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                    {totalItems}
                  </span>
                </>
              )}
            </Link>
          </Button>

          <Button
            onClick={handleAuth}
            disabled={isLoggingIn}
            size="sm"
            variant={isAuthenticated ? 'outline' : 'default'}
          >
            {isLoggingIn ? (
              'Logging in...'
            ) : isAuthenticated ? (
              <>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </>
            ) : (
              <>
                <LogIn className="mr-2 h-4 w-4" />
                Login
              </>
            )}
          </Button>
        </nav>
      </div>
    </header>
  );
}
