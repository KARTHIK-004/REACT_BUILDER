import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Code2 } from "lucide-react";

export default function PrivacyPolicy() {
  const sections = [
    {
      title: "Introduction",
      content:
        "This Privacy Policy explains how ReactBuilder ('we', 'us', or 'our') collects, uses, and protects your personal information when you use our website and services. We are committed to ensuring that your privacy is protected. Should we ask you to provide certain information by which you can be identified when using this website, you can be assured that it will only be used in accordance with this privacy statement.",
    },
    {
      title: "Information We Collect",
      content:
        "We may collect the following information: Name, contact information including email address, demographic information such as postcode, preferences and interests, and other information relevant to customer surveys and/or offers. Additionally, we may collect information about your use of our services, including projects created, components used, and interaction with our platform.",
    },
    {
      title: "How We Use Your Information",
      content:
        "We use this information to understand your needs and provide you with a better service, and in particular for the following reasons: Internal record keeping, improving our products and services, sending promotional emails about new products, special offers or other information which we think you may find interesting, and conducting market research.",
    },
    {
      title: "Security",
      content:
        "We are committed to ensuring that your information is secure. In order to prevent unauthorized access or disclosure, we have put in place suitable physical, electronic and managerial procedures to safeguard and secure the information we collect online.",
    },
    {
      title: "Cookies",
      content:
        "A cookie is a small file which asks permission to be placed on your computer's hard drive. Once you agree, the file is added and the cookie helps analyze web traffic or lets you know when you visit a particular site. We use traffic log cookies to identify which pages are being used. This helps us analyze data about webpage traffic and improve our website in order to tailor it to customer needs.",
    },
    {
      title: "Third-Party Services",
      content:
        "Our website may contain links to other websites of interest. However, once you have used these links to leave our site, you should note that we do not have any control over that other website. Therefore, we cannot be responsible for the protection and privacy of any information which you provide whilst visiting such sites.",
    },
    {
      title: "Your Rights",
      content:
        "You have the right to request access to the personal information we hold about you. You can also request corrections, deletions, or updates to this information. To exercise these rights, please contact us using the information provided at the end of this policy.",
    },
    {
      title: "Changes to This Policy",
      content:
        "We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.",
    },
    {
      title: "Contact Us",
      content:
        "If you have any questions about this Privacy Policy, please contact us at privacy@reactbuilder.com or by mail at: ReactBuilder, 123 Web Dev Street, Codeville, CV 12345, United States.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="px-8 flex h-16 items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Code2 className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">ReactBuilder</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 px-8 py-6 md:py-12">
        <div className="flex flex-col gap-8 md:flex-row md:gap-12">
          <aside className="md:w-1/4">
            <Card>
              <CardHeader>
                <CardTitle>Table of Contents</CardTitle>
              </CardHeader>
              <CardContent>
                <nav>
                  <ul className="space-y-2">
                    {sections.map((section, index) => (
                      <li key={index}>
                        <Link
                          to={`#section-${index}`}
                          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {section.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </CardContent>
            </Card>
          </aside>

          <ScrollArea className="flex-1 h-[calc(100vh-6rem)]">
            <div className="space-y-8 pr-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">
                  Privacy Policy
                </h1>
                <p className="text-muted-foreground mt-2">
                  Last updated: {new Date().toLocaleDateString()}
                </p>
              </div>

              {sections.map((section, index) => (
                <section key={index} id={`section-${index}`}>
                  <h2 className="text-2xl font-semibold mb-4">
                    {section.title}
                  </h2>
                  <p className="text-muted-foreground">{section.content}</p>
                  {index < sections.length - 1 && (
                    <Separator className="my-8" />
                  )}
                </section>
              ))}
            </div>
          </ScrollArea>
        </div>
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
