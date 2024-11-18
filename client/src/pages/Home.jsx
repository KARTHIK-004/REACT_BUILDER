import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/theme/ModeToggle";
import {
  ArrowRight,
  CheckCircle,
  Code2,
  Copy,
  Github,
  Linkedin,
  Menu,
  Twitter,
  Zap,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useTheme } from "@/components/theme/theme-provider";
const UiDark = "/Dark.png";
const UiLight = "/Light.png";

const components = [
  {
    title: "Button",
    description: "Interactive button component with various styles.",
    icon: <Zap className="w-6 h-6" />,
    content: `<Button variant="default">Click me</Button>`,
  },
  {
    title: "Card",
    description: "Versatile card component for displaying content.",
    icon: <Code2 className="w-6 h-6" />,
    content: `<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Card content goes here.</p>
  </CardContent>
</Card>`,
  },
  {
    title: "Input",
    description: "Text input field for user data entry.",
    icon: <ArrowRight className="w-6 h-6" />,
    content: `<input
  type="text"
  placeholder="Enter text..."
  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
/>
`,
  },
  {
    title: "Badge",
    description: "Small status descriptor for UI elements.",
    icon: <CheckCircle className="w-6 h-6" />,
    content: `<span class="inline-block px-3 py-1 text-xs font-semibold text-gray-700 bg-gray-200 rounded-full">
  New
</span>
`,
  },
];

export default function Home() {
  const [selectedComponent, setSelectedComponent] = useState(components[0]);
  const [editedCode, setEditedCode] = useState(selectedComponent.content);
  const [copied, setCopied] = useState(false);
  const { theme } = useTheme();

  const handleComponentSelect = (component) => {
    setSelectedComponent(component);
    setEditedCode(component.content);
    setCopied(false);
  };

  const handleCodeChange = (code) => {
    setEditedCode(code);
    setCopied(false);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(editedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className=" mx-auto px-2 md:px-6 lg:px-8 flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Code2 className="h-6 w-6 text-primary text-xl" />
            <span className="text-xl hidden font-bold sm:inline-block">
              ReactBuilder
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/features"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </Link>
            <Link
              to="/pricing"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
            </Link>
            <Link
              to="/docs"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Docs
            </Link>
            <ModeToggle />
            <Button variant="ghost" asChild>
              <Link to="/sign-in">Sign In</Link>
            </Button>
            <Button asChild>
              <Link to="/sign-up">Sign Up</Link>
            </Button>
          </nav>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription>
                  Navigate through ReactBuilder
                </SheetDescription>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-4">
                <Link to="/features" className="text-sm font-medium">
                  Features
                </Link>
                <Link to="/pricing" className="text-sm font-medium">
                  Pricing
                </Link>
                <Link to="/docs" className="text-sm font-medium">
                  Docs
                </Link>
                <Link to="/sign-in" className="text-sm font-medium">
                  Sign In
                </Link>
                <Link to="/sign-up" className="text-sm font-medium">
                  Sign Up
                </Link>
                <ModeToggle />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main className="flex-grow">
        <section className="relative overflow-hidden py-20 sm:py-32">
          <div className=" mx-auto px-2 md:px-6 lg:px-8 flex flex-col items-center text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl animate-fade-in">
              Build React UIs
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-blue-400 to-blue-300 py-4 [text-shadow:0_0_rgba(0,0,0,0.1)]">
                Faster Than Ever
              </span>
            </h1>
            <p className="mt-6 max-w-[42rem] text-lg text-muted-foreground sm:text-xl animate-fade-in-up">
              ReactBuilder empowers developers to create stunning, responsive
              React components with ease. Streamline your workflow and bring
              your ideas to life.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button size="lg" className="animate-pulse" asChild>
                <Link to="/sign-up">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/docs">View Documentation</Link>
              </Button>
            </div>
            <div className="mt-16 w-full max-w-4xl animate-fade-in-up">
              <div className="relative overflow-hidden rounded-xl border bg-background shadow-2xl">
                <img
                  src={theme === "light" ? UiLight : UiDark}
                  alt="Dashboard"
                  className="w-full h-auto"
                  width={1280}
                  height={720}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        <Separator className="my-12 md:my-20" />

        <section className="py-20">
          <div className="mx-auto px-2 md:px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-12 text-center animate-fade-in">
              Component Library
            </h2>
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="space-y-4 animate-fade-in-left">
                {components.map((component, index) => (
                  <Card
                    key={index}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedComponent.title === component.title
                        ? "border-primary shadow-md"
                        : ""
                    }`}
                    onClick={() => handleComponentSelect(component)}
                  >
                    <CardContent className="flex items-center p-4">
                      <div className="w-10 h-10 rounded bg-primary/10 text-primary flex items-center justify-center mr-4">
                        {component.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold">{component.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {component.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="lg:col-span-2 animate-fade-in-right">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>{selectedComponent.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="preview" className="h-full">
                      <TabsList className="mb-4">
                        <TabsTrigger value="preview">Preview</TabsTrigger>
                        <TabsTrigger value="code">Code</TabsTrigger>
                      </TabsList>
                      <TabsContent value="preview" className="h-[300px]">
                        <div className="border rounded-lg p-4 h-full flex items-center justify-center bg-muted overflow-auto">
                          <LiveProvider
                            code={editedCode}
                            scope={{
                              Button,
                              Card,
                              CardHeader,
                              CardTitle,
                              CardContent,
                            }}
                          >
                            <LivePreview />
                            <LiveError />
                          </LiveProvider>
                        </div>
                      </TabsContent>
                      <TabsContent value="code" className="h-[300px]">
                        <div className="relative h-full">
                          <Label htmlFor="code-editor" className="sr-only">
                            Edit Component Code
                          </Label>
                          <LiveProvider
                            code={editedCode}
                            scope={{
                              Button,
                              Card,
                              CardHeader,
                              CardTitle,
                              CardContent,
                            }}
                          >
                            <LiveEditor
                              onChange={handleCodeChange}
                              className="h-full rounded-md border bg-muted p-4 font-mono text-sm"
                            />
                          </LiveProvider>
                          <Button
                            size="sm"
                            variant="outline"
                            className="absolute top-2 right-2"
                            onClick={handleCopyCode}
                          >
                            {copied ? (
                              <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                            ) : (
                              <Copy className="w-4 h-4 mr-2" />
                            )}
                            {copied ? "Copied!" : "Copy"}
                          </Button>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <Separator className="my-12 md:my-20" />

        <section className="py-20 ">
          <div className="mx-auto px-2 md:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6 animate-fade-in">
              Start Building Today
            </h2>
            <p className="mx-auto max-w-[700px] text-lg mb-8 animate-fade-in-up">
              Join thousands of developers who are already using ReactBuilder to
              create amazing user interfaces. Sign up now and experience the
              power of efficient UI development.
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="animate-pulse"
              asChild
            >
              <Link to="/sign-up">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t py-12 bg-background">
        <div className="mx-auto px-2 md:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <Link to="/" className="flex items-center space-x-2 mb-4">
                <Code2 className="h-6 w-6 text-primary" />
                <span className="font-bold text-xl">ReactBuilder</span>
              </Link>
              <p className="text-sm text-muted-foreground">
                Empowering developers to build beautiful React UIs faster.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/features"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    to="/pricing"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    to="/docs"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Documentation
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Connect</h3>
              <div className="flex space-x-4">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
