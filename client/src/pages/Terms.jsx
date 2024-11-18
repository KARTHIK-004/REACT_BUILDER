import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Code2, ArrowLeft } from "lucide-react";

export default function Terms() {
  const sections = [
    {
      title: "Acceptance of Terms",
      content:
        "By accessing or using the ReactBuilder platform ('Service'), you agree to be bound by these Terms of Service ('Terms'). If you disagree with any part of the terms, then you may not access the Service.",
    },
    {
      title: "Description of Service",
      content:
        "ReactBuilder provides a web-based platform for creating, managing, and deploying React applications. Our service includes tools for component development, project management, and collaboration.",
    },
    {
      title: "User Accounts",
      content:
        "When you create an account with us, you must provide accurate, complete, and up-to-date information. You are solely responsible for the activity that occurs on your account, and you must keep your account password secure. You must notify us immediately of any breach of security or unauthorized use of your account.",
    },
    {
      title: "Intellectual Property Rights",
      content:
        "The Service and its original content, features, and functionality are owned by ReactBuilder and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.",
    },
    {
      title: "User-Generated Content",
      content:
        "You retain any and all of your rights to any content you submit, post or display on or through the Service and you are responsible for protecting those rights. We take no responsibility and assume no liability for any content posted by you or any third party.",
    },
    {
      title: "Restrictions on Use",
      content:
        "You may not: (a) use the Service for any illegal purpose or in violation of any laws; (b) violate or infringe other people's intellectual property, privacy, publicity, or other legal rights; (c) transmit anything that is illegal, abusive, harassing, harmful to reputation, pornographic, indecent, profane, obscene, hateful, racist, or otherwise objectionable; (d) send unsolicited or unauthorized advertising or commercial communications; (e) transmit any viruses or other computer instructions that may damage or disrupt computer systems.",
    },
    {
      title: "Termination",
      content:
        "We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.",
    },
    {
      title: "Indemnification",
      content:
        "You agree to defend, indemnify and hold harmless ReactBuilder and its licensee and licensors, and their employees, contractors, agents, officers and directors, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney's fees), resulting from or arising out of a) your use and access of the Service, or b) a breach of these Terms.",
    },
    {
      title: "Limitation of Liability",
      content:
        "In no event shall ReactBuilder, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage, and even if a remedy set forth herein is found to have failed of its essential purpose.",
    },
    {
      title: "Disclaimer",
      content:
        "Your use of the Service is at your sole risk. The Service is provided on an 'AS IS' and 'AS AVAILABLE' basis. The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement or course of performance.",
    },
    {
      title: "Governing Law",
      content:
        "These Terms shall be governed and construed in accordance with the laws of the United States, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.",
    },
    {
      title: "Changes to Terms",
      content:
        "We reserve the right, at our sole discretion, to modify or replace these Terms at any time. What constitutes a material change will be determined at our sole discretion. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.",
    },
    {
      title: "Contact Us",
      content:
        "If you have any questions about these Terms, please contact us at legal@reactbuilder.com.",
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
                  Terms of Service
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
