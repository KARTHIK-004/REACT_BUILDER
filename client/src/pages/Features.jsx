import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ModeToggle } from "@/components/theme/ModeToggle";
import {
  Code2,
  Layers,
  Zap,
  Palette,
  Globe,
  Lock,
  BarChart,
  GitBranch,
  Cloud,
  Terminal,
  Puzzle,
  Workflow,
  Smartphone,
} from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: Layers,
      title: "Extensive Component Library",
      description:
        "Access a vast collection of pre-built, customizable React components to accelerate your development process.",
    },
    {
      icon: Zap,
      title: "Rapid Prototyping",
      description:
        "Build and iterate quickly with our intuitive drag-and-drop interface, allowing for fast ideation and development.",
    },
    {
      icon: Palette,
      title: "Advanced Theming & Styling",
      description:
        "Easily customize the look and feel of your application with powerful theming options and CSS-in-JS support.",
    },
    {
      icon: Globe,
      title: "Responsive Design Tools",
      description:
        "Create applications that look great on any device with built-in responsive design tools and testing features.",
    },
    {
      icon: Lock,
      title: "Integrated State Management",
      description:
        "Manage your application state effortlessly with integrated state management solutions, including Redux and MobX support.",
    },
    {
      icon: BarChart,
      title: "Performance Optimization",
      description:
        "Build lightning-fast applications with our performance optimization tools, including code splitting and lazy loading.",
    },
    {
      icon: GitBranch,
      title: "Version Control Integration",
      description:
        "Seamlessly integrate with Git for efficient team collaboration and code management.",
    },
    {
      icon: Cloud,
      title: "Cloud Deployment",
      description:
        "Deploy your React applications to the cloud with one-click deployment to popular hosting platforms.",
    },
    {
      icon: Terminal,
      title: "CLI Support",
      description:
        "Boost productivity with a powerful Command Line Interface for advanced users and automation.",
    },
    {
      icon: Puzzle,
      title: "Plugin Ecosystem",
      description:
        "Extend ReactBuilder's functionality with a rich ecosystem of plugins and integrations.",
    },
    {
      icon: Workflow,
      title: "CI/CD Pipeline Integration",
      description:
        "Streamline your development workflow with built-in Continuous Integration and Continuous Deployment support.",
    },
    {
      icon: Smartphone,
      title: "Progressive Web App Support",
      description:
        "Create installable, offline-capable Progressive Web Apps with built-in service worker management.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="px-8 flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Code2 className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">ReactBuilder</span>
          </Link>
          <nav className="flex items-center space-x-6">
            <Link
              to="/features"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Features
            </Link>
            <Link
              to="/docs"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Documentation
            </Link>
            <Link
              to="/pricing"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Pricing
            </Link>
            <ModeToggle />
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className=" px-8 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                Powerful Features for Modern React Development
              </h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Discover the tools and capabilities that make ReactBuilder the
                ultimate platform for creating stunning React applications.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-12">
              {features.map((feature, index) => (
                <Card key={index} className="flex flex-col h-full">
                  <CardHeader>
                    <feature.icon className="h-10 w-10 text-primary mb-2" />
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-6 md:py-0">
        <div className="px-8 flex flex-col md:flex-row items-center justify-between gap-4 md:h-16">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} ReactBuilder. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              to="/privacy"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
