import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ModeToggle } from "@/components/theme/ModeToggle";
import {
  ArrowRight,
  ChevronDown,
  Code2,
  Menu,
  Search,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";

const sidebarItems = [
  {
    title: "Getting Started",
    items: ["Introduction", "Quick Start"],
  },
  {
    title: "Core Concepts",
    items: ["Components", "Styling", "State Management"],
  },
  {
    title: "Advanced Topics",
    items: ["Performance Optimization", "Server-Side Rendering", "Testing"],
  },
];

const contentData = {
  Introduction: {
    content: (
      <>
        <h1 className="text-4xl font-bold mb-4">
          Introduction to ReactBuilder
        </h1>
        <p className="lead mb-4">
          Welcome to ReactBuilder, the powerful tool for creating stunning React
          UIs with ease.
        </p>
        <h2 className="text-2xl font-semibold mb-2">What is ReactBuilder?</h2>
        <p className="mb-4">
          ReactBuilder is a comprehensive platform designed to streamline the
          process of building React applications. It provides a rich set of
          pre-built components, intuitive drag-and-drop interfaces, and powerful
          customization options to help developers create beautiful, responsive,
          and performant user interfaces.
        </p>
        <h2 className="text-2xl font-semibold mb-2">Key Features</h2>
        <ul className="list-disc pl-6 mb-4">
          <li>Extensive library of customizable React components</li>
          <li>Visual drag-and-drop interface for rapid prototyping</li>
          <li>Real-time preview and code generation</li>
          <li>Built-in state management solutions</li>
          <li>Responsive design tools</li>
          <li>Performance optimization features</li>
        </ul>
        <h2 className="text-2xl font-semibold mb-2">Getting Started</h2>
        <p>
          To begin your journey with ReactBuilder, head over to the Quick Start
          guide. There, you'll find step-by-step instructions on how to set up
          your first project and start building amazing UIs.
        </p>
      </>
    ),
    lastUpdated: "2023-06-15",
  },
  "Quick Start": {
    content: (
      <>
        <h1 className="text-4xl font-bold mb-4">Quick Start Guide</h1>
        <p className="mb-4">
          Get up and running with ReactBuilder in just a few steps:
        </p>
        <ol className="list-decimal pl-6 mb-4">
          <li className="mb-2">
            Sign up for a ReactBuilder account on our website
          </li>
          <li className="mb-2">
            Create a new project by clicking the "New Project" button on your
            dashboard
          </li>
          <li className="mb-2">
            Choose a template or start with a blank canvas
          </li>
          <li className="mb-2">
            Use the drag-and-drop interface to add components to your layout
          </li>
          <li className="mb-2">
            Customize your components using the properties panel
          </li>
          <li className="mb-2">Preview your project in real-time</li>
          <li className="mb-2">
            Export your project as React code or deploy directly from
            ReactBuilder
          </li>
        </ol>
        <p>For more detailed instructions, check out our Tutorials section.</p>
      </>
    ),
    lastUpdated: "2023-06-20",
  },
  Components: {
    content: (
      <>
        <h1 className="text-4xl font-bold mb-4">ReactBuilder Components</h1>
        <p className="mb-4">
          ReactBuilder offers a wide range of pre-built, customizable components
          to accelerate your development process. Here are some of our most
          popular components:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li className="mb-2">
            <strong>Button:</strong> Customizable buttons with various styles
            and states
          </li>
          <li className="mb-2">
            <strong>Input:</strong> Text input fields with validation and
            masking options
          </li>
          <li className="mb-2">
            <strong>Card:</strong> Versatile container for displaying content
            and actions
          </li>
          <li className="mb-2">
            <strong>Modal:</strong> Customizable modal dialogs for displaying
            important information
          </li>
          <li className="mb-2">
            <strong>Navbar:</strong> Responsive navigation bar with customizable
            menu items
          </li>
        </ul>
        <p>
          Explore our full{" "}
          <Link
            to="/docs/component-library"
            className="text-primary hover:underline"
          >
            Component Library
          </Link>{" "}
          to see all available components and their usage examples.
        </p>
      </>
    ),
    lastUpdated: "2023-06-18",
  },
  Styling: {
    content: (
      <>
        <h1 className="text-4xl font-bold mb-4">Styling in ReactBuilder</h1>
        <p className="mb-4">
          ReactBuilder provides powerful styling options to help you create
          visually appealing and consistent user interfaces:
        </p>
        <h2 className="text-2xl font-semibold mb-2">Global Themes</h2>
        <p className="mb-4">
          Define color schemes, typography, and spacing that can be applied
          across your entire application.
        </p>
        <h2 className="text-2xl font-semibold mb-2">Component-Level Styling</h2>
        <p className="mb-4">
          Customize individual components with specific styles without affecting
          others.
        </p>
        <h2 className="text-2xl font-semibold mb-2">CSS-in-JS Support</h2>
        <p className="mb-4">
          Use popular CSS-in-JS libraries like styled-components or Emotion for
          more dynamic styling capabilities.
        </p>
        <h2 className="text-2xl font-semibold mb-2">Responsive Design Tools</h2>
        <p className="mb-4">
          Built-in responsive design features to ensure your UI looks great on
          all device sizes.
        </p>
        <p>
          Learn more about our styling options in the{" "}
          <Link
            to="/docs/styling-guide"
            className="text-primary hover:underline"
          >
            Styling Guide
          </Link>
          .
        </p>
      </>
    ),
    lastUpdated: "2023-06-22",
  },
  "State Management": {
    content: (
      <>
        <h1 className="text-4xl font-bold mb-4">
          State Management in ReactBuilder
        </h1>
        <p className="mb-4">
          ReactBuilder offers flexible state management solutions to handle the
          complexity of your application:
        </p>
        <h2 className="text-2xl font-semibold mb-2">
          Built-in State Management
        </h2>
        <p className="mb-4">
          Use React's useState and useContext hooks for simple state management
          needs.
        </p>
        <h2 className="text-2xl font-semibold mb-2">Redux Integration</h2>
        <p className="mb-4">
          Seamlessly integrate Redux for more complex state management
          requirements.
        </p>
        <h2 className="text-2xl font-semibold mb-2">MobX Support</h2>
        <p className="mb-4">
          Utilize MobX for reactive state management in your ReactBuilder
          projects.
        </p>
        <h2 className="text-2xl font-semibold mb-2">Custom Solutions</h2>
        <p className="mb-4">
          Implement your own state management solution or integrate other
          libraries as needed.
        </p>
        <p>
          Dive deeper into state management techniques in our{" "}
          <Link
            to="/docs/state-management-guide"
            className="text-primary hover:underline"
          >
            State Management Guide
          </Link>
          .
        </p>
      </>
    ),
    lastUpdated: "2023-06-25",
  },
  "Performance Optimization": {
    content: (
      <>
        <h1 className="text-4xl font-bold mb-4">Performance Optimization</h1>
        <p className="mb-4">
          ReactBuilder provides tools and best practices to ensure your
          applications perform optimally:
        </p>
        <h2 className="text-2xl font-semibold mb-2">Code Splitting</h2>
        <p className="mb-4">
          Automatically split your code into smaller chunks for faster loading
          times.
        </p>
        <h2 className="text-2xl font-semibold mb-2">Lazy Loading</h2>
        <p className="mb-4">
          Load components and resources on-demand to improve initial load time.
        </p>
        <h2 className="text-2xl font-semibold mb-2">Memoization</h2>
        <p className="mb-4">
          Use React.memo and useMemo to prevent unnecessary re-renders.
        </p>
        <h2 className="text-2xl font-semibold mb-2">Performance Profiler</h2>
        <p className="mb-4">
          Analyze your application's performance and identify bottlenecks.
        </p>
        <p>
          Learn more about optimizing your ReactBuilder applications in our{" "}
          <Link
            to="/docs/performance-guide"
            className="text-primary hover:underline"
          >
            Performance Optimization Guide
          </Link>
          .
        </p>
      </>
    ),
    lastUpdated: "2023-06-28",
  },
  "Server-Side Rendering": {
    content: (
      <>
        <h1 className="text-4xl font-bold mb-4">Server-Side Rendering (SSR)</h1>
        <p className="mb-4">
          ReactBuilder supports server-side rendering to improve performance and
          SEO:
        </p>
        <h2 className="text-2xl font-semibold mb-2">Built-in SSR Support</h2>
        <p className="mb-4">
          Enable server-side rendering with a simple configuration option.
        </p>
        <h2 className="text-2xl font-semibold mb-2">Next.js Integration</h2>
        <p className="mb-4">
          Seamlessly use ReactBuilder components with Next.js for advanced SSR
          capabilities.
        </p>
        <h2 className="text-2xl font-semibold mb-2">Static Site Generation</h2>
        <p className="mb-4">
          Generate static HTML files for even faster loading and improved SEO.
        </p>
        <h2 className="text-2xl font-semibold mb-2">Hybrid Rendering</h2>
        <p className="mb-4">
          Combine server-side rendering with client-side hydration for optimal
          performance.
        </p>
        <p>
          Explore our{" "}
          <Link to="/docs/ssr-guide" className="text-primary hover:underline">
            Server-Side Rendering Guide
          </Link>{" "}
          to learn how to implement SSR in your ReactBuilder projects.
        </p>
      </>
    ),
    lastUpdated: "2023-07-01",
  },
  Testing: {
    content: (
      <>
        <h1 className="text-4xl font-bold mb-4">Testing in ReactBuilder</h1>
        <p className="mb-4">
          ReactBuilder provides comprehensive testing tools to ensure the
          quality and reliability of your applications:
        </p>
        <h2 className="text-2xl font-semibold mb-2">Unit Testing</h2>
        <p className="mb-4">
          Use Jest and React Testing Library for component and function-level
          tests.
        </p>
        <h2 className="text-2xl font-semibold mb-2">Integration Testing</h2>
        <p className="mb-4">
          Test how different parts of your application work together using
          Cypress.
        </p>
        <h2 className="text-2xl font-semibold mb-2">End-to-End Testing</h2>
        <p className="mb-4">
          Automate user scenarios and test full user flows with Playwright.
        </p>
        <h2 className="text-2xl font-semibold mb-2">
          Visual Regression Testing
        </h2>
        <p className="mb-4">
          Catch unexpected visual changes with built-in screenshot comparison
          tools.
        </p>
        <p>
          Learn more about implementing a robust testing strategy in our{" "}
          <Link
            to="/docs/testing-guide"
            className="text-primary hover:underline"
          >
            Testing Guide
          </Link>
          .
        </p>
      </>
    ),
    lastUpdated: "2023-07-05",
  },
};

export default function Docs() {
  const [activeItem, setActiveItem] = useState("Introduction");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState(sidebarItems);
  const [feedback, setFeedback] = useState({ [activeItem]: null });

  useEffect(() => {
    const filtered = sidebarItems
      .map((section) => ({
        ...section,
        items: section.items.filter((item) =>
          item.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      }))
      .filter((section) => section.items.length > 0);
    setFilteredItems(filtered);
  }, [searchQuery]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFeedback = (item, isPositive) => {
    setFeedback((prev) => ({ ...prev, [item]: isPositive }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className=" px-8 flex h-16 items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Code2 className="h-6 w-6 text-primary" />
            <span className="font-bold">ReactBuilder</span>
          </Link>
          <div className="flex items-center ml-auto space-x-4">
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
              Docs
            </Link>
            <Link
              to="/pricing"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Pricing
            </Link>
            <form className="hidden md:block">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search docs..."
                  className="pl-8 w-[200px] lg:w-[300px]"
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>
            </form>
            <ModeToggle />
          </div>
        </div>
      </header>

      <ScrollArea className="flex-1 p-8">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="md:w-64 shrink-0">
            <nav className="hidden md:block sticky top-20">
              <ScrollArea className="h-[calc(100vh-5rem)]">
                <div className="space-y-1">
                  {filteredItems.map((section, index) => (
                    <div key={index} className="mb-4">
                      <h4 className="font-semibold mb-2 text-sm">
                        {section.title}
                      </h4>
                      {section.items.map((item, itemIndex) => (
                        <Button
                          key={itemIndex}
                          variant="ghost"
                          className={`w-full justify-start ${activeItem === item ? "bg-muted" : ""}`}
                          onClick={() => setActiveItem(item)}
                        >
                          {item}
                        </Button>
                      ))}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </nav>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full md:hidden mb-4">
                  <Menu className="mr-2 h-4 w-4" />
                  Menu
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Documentation</SheetTitle>
                </SheetHeader>
                <ScrollArea className="h-[calc(100vh-8rem)] mt-4">
                  <div className="space-y-1">
                    {filteredItems.map((section, index) => (
                      <div key={index} className="mb-4">
                        <h4 className="font-semibold mb-2 text-sm">
                          {section.title}
                        </h4>
                        {section.items.map((item, itemIndex) => (
                          <Button
                            key={itemIndex}
                            variant="ghost"
                            className={`w-full justify-start ${activeItem === item ? "bg-muted" : ""}`}
                            onClick={() => {
                              setActiveItem(item);
                              document.body.classList.remove("overflow-hidden");
                            }}
                          >
                            {item}
                          </Button>
                        ))}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </SheetContent>
            </Sheet>
          </aside>
          <main className="flex-1">
            <article className="prose dark:prose-invert max-w-none">
              {contentData[activeItem].content}
              <div className="mt-8 flex items-center justify-between">
                <Badge variant="outline">
                  Last updated: {contentData[activeItem].lastUpdated}
                </Badge>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">
                    Was this helpful?
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleFeedback(activeItem, true)}
                    className={
                      feedback[activeItem] === true
                        ? "bg-green-100 dark:bg-green-900"
                        : ""
                    }
                  >
                    <ThumbsUp className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleFeedback(activeItem, false)}
                    className={
                      feedback[activeItem] === false
                        ? "bg-red-100 dark:bg-red-900"
                        : ""
                    }
                  >
                    <ThumbsDown className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </article>
          </main>
        </div>
      </ScrollArea>

      <footer className="border-t md:py-0">
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
