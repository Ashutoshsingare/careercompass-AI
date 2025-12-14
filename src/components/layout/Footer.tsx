export default function Footer() {
  return (
    <footer className="w-full border-t border-border/40">
      <div className="container flex items-center justify-center py-4">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} CareerCompass AI. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
