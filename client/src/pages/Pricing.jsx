"use client";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ModeToggle } from "@/components/theme/ModeToggle";
import { Code2, Check, X, ChevronDown, Menu } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";

const pricingPlans = [
  {
    name: "Starter",
    monthlyPrice: "$0",
    yearlyPrice: "$0",
    description: "For individuals and small projects",
    features: [
      "Up to 3 projects",
      "Basic component library",
      "Community support",
      "1 team member",
    ],
    cta: "Start for Free",
    highlighted: false,
  },
  {
    name: "Pro",
    monthlyPrice: "$29",
    yearlyPrice: "$290",
    description: "For professional developers and growing teams",
    features: [
      "Unlimited projects",
      "Advanced component library",
      "Priority email support",
      "Up to 5 team members",
      "Custom theming",
      "API access",
    ],
    cta: "Upgrade to Pro",
    highlighted: true,
  },
  {
    name: "Enterprise",
    monthlyPrice: "Custom",
    yearlyPrice: "Custom",
    description: "For large teams and organizations",
    features: [
      "Unlimited projects",
      "Full component library",
      "24/7 phone & email support",
      "Unlimited team members",
      "Advanced security features",
      "Dedicated account manager",
      "Custom integrations",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

const comparisonFeatures = [
  "Projects",
  "Team members",
  "Component library",
  "Support",
  "Custom theming",
  "API access",
  "Security features",
  "Integrations",
];

const faqs = [
  {
    question: "What forms of payment do you accept?",
    answer:
      "We accept all major credit cards, PayPal, and bank transfers for annual plans.",
  },
  {
    question: "Can I change my plan later?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.",
  },
  {
    question: "Is there a long-term contract?",
    answer:
      "No, our services are provided on a month-to-month basis. You can cancel anytime without penalty.",
  },
  {
    question: "Do you offer a free trial?",
    answer:
      "Yes, we offer a 14-day free trial on our Pro plan. No credit card required.",
  },
];

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="px-8 flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Code2 className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">ReactBuilder</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/features"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </Link>
            <Link
              to="/docs"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Documentation
            </Link>
            <Link to="/pricing" className="text-sm font-medium text-foreground">
              Pricing
            </Link>
            <ModeToggle />
          </nav>
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <ScrollArea className="h-full w-full">
                <div className="flex flex-col space-y-4 py-4">
                  <Link
                    to="/features"
                    className="text-sm font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Features
                  </Link>
                  <Link
                    to="/docs"
                    className="text-sm font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Documentation
                  </Link>
                  <Link
                    to="/pricing"
                    className="text-sm font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Pricing
                  </Link>
                  <Link
                    to="/blog"
                    className="text-sm font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Blog
                  </Link>
                  <ModeToggle />
                </div>
              </ScrollArea>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="px-8  md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                Choose the Right Plan for You
              </h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Whether you're a solo developer or part of a large team, we have
                a plan that fits your needs.
              </p>
              <div className="flex items-center space-x-2">
                <Label htmlFor="yearly-pricing">Monthly</Label>
                <Switch
                  id="yearly-pricing"
                  checked={isYearly}
                  onCheckedChange={setIsYearly}
                />
                <Label htmlFor="yearly-pricing">Yearly (Save 20%)</Label>
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-12">
              {pricingPlans.map((plan, index) => (
                <div key={index}>
                  <Card
                    className={`flex flex-col h-full ${plan.highlighted ? "border-primary shadow-lg" : ""}`}
                  >
                    <CardHeader>
                      <CardTitle>{plan.name}</CardTitle>
                      <CardDescription>{plan.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <div className="text-4xl font-bold mb-4">
                        {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        {plan.monthlyPrice === "Custom"
                          ? "per month"
                          : `per user/${isYearly ? "year" : "month"}`}
                      </p>
                      <ul className="space-y-2 mb-4">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center">
                            <Check className="h-5 w-5 text-primary mr-2" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className="w-full"
                        variant={plan.highlighted ? "default" : "outline"}
                      >
                        {plan.cta}
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="px-8 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter text-center mb-8">
              Compare Plans
            </h2>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Feature</TableHead>
                    {pricingPlans.map((plan, index) => (
                      <TableHead key={index} className="text-center">
                        {plan.name}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {comparisonFeatures.map((feature, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{feature}</TableCell>
                      {pricingPlans.map((plan, planIndex) => (
                        <TableCell key={planIndex} className="text-center">
                          {plan.features.includes(feature) ? (
                            <Check className="h-5 w-5 text-primary mx-auto" />
                          ) : (
                            <X className="h-5 w-5 text-muted-foreground mx-auto" />
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className=" px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter text-center mb-8">
              Frequently Asked Questions
            </h2>
            <Accordion
              type="single"
              collapsible
              className="w-full max-w-3xl mx-auto"
            >
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 ">
          <div className="px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Ready to Get Started?
              </h2>
              <p className="max-w-[600px]  md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join thousands of developers who are already using ReactBuilder
                to create amazing projects.
              </p>
              <Button size="lg" variant="secondary">
                Start Your Free Trial
              </Button>
            </div>
          </div>
        </section>
      </main>

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
