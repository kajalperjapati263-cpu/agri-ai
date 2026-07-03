import Link from "next/link";
import { Leaf } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Leaf className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">AgriAI</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Empowering farmers with AI-driven insights for smarter, more profitable, and sustainable agriculture.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Platform</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/chat" className="hover:text-primary transition-colors">AI Chatbot</Link></li>
              <li><Link href="/scanner" className="hover:text-primary transition-colors">Crop Scanner</Link></li>
              <li><Link href="/weather" className="hover:text-primary transition-colors">Weather Dashboard</Link></li>
              <li><Link href="/recommendation" className="hover:text-primary transition-colors">Crop Recommendation</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/marketplace" className="hover:text-primary transition-colors">Marketplace</Link></li>
              <li><Link href="/market-prices" className="hover:text-primary transition-colors">Live Mandi Prices</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>support@agriai.com</li>
              <li>+91 1800 123 4567</li>
              <li className="pt-4">
                <Link href="/dashboard" className="text-primary hover:underline">Go to Dashboard &rarr;</Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} AgriAI. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
