import NavbarCentered from "@/components/ui/NavbarCentered";
import { routes } from "@/routes";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <NavbarCentered
        logo="Logo"
        navItems={routes.map((r) => ({ name: r.label, href: r.path }))}
        ctaButton={{ text: "Get Started", href: "#" }}
      />
      <main className="pt-20 flex flex-col items-center justify-center min-h-[80vh] px-4">
        <h1 className="text-4xl font-bold text-foreground mb-4">Welcome</h1>
        <p className="text-lg text-muted-foreground max-w-xl text-center">
          Your website content will appear here.
        </p>
      </main>
    </div>
  );
};

export default HomePage;
