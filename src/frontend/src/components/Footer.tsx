import { SiDiscord } from 'react-icons/si';

export default function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-sm text-muted-foreground">
          <p className="mb-2">
            <strong>By Aura MC</strong>
          </p>
          <p className="flex items-center justify-center gap-2">
            <SiDiscord className="h-4 w-4" />
            For support, join our{' '}
            <a
              href="https://discord.gg/P8ZVVXYJAf"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:text-foreground"
            >
              Discord server
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
