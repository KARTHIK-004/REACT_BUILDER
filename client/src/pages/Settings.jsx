import React from "react";
import { Sun, HelpCircle, Menu, Check, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useTheme } from "@/components/theme/theme-provider";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "@/components/dashboard/Sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
const UiDark = "/Dark.png";
const UiLight = "/Light.png";

const items = [
  {
    id: "radio-18-r1",
    value: "light",
    label: "Light",
    image: UiLight,
  },
  {
    id: "radio-18-r2",
    value: "dark",
    label: "Dark",
    image: UiDark,
  },
];

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-background">
      <header className="border-b">
        <div className="flex h-16 px-4 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64">
                <Sidebar />
              </SheetContent>
            </Sheet>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/dashboard">Dashboard</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="#">Settings</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
      </header>
      <main className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Sun className="mr-2" />
                  Appearance
                </CardTitle>
                <CardDescription>
                  Customize the appearance of the application.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="theme-toggle">Theme</Label>
                </div>

                <fieldset className="space-y-4">
                  <legend className="text-sm font-medium leading-none text-foreground ">
                    Choose a theme
                  </legend>
                  <RadioGroup
                    className="flex flex-wrap gap-3"
                    defaultValue={theme}
                    onValueChange={setTheme}
                  >
                    {items.map((item) => (
                      <label key={item.id} className="cursor-pointer">
                        <RadioGroupItem
                          id={item.id}
                          value={item.value}
                          className="peer sr-only"
                        />
                        <div className="relative overflow-hidden rounded-lg border border-input shadow-sm shadow-black/5 transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-data-[state=checked]:border-primary">
                          <img
                            src={item.image}
                            alt={item.label}
                            width={88}
                            height={70}
                            className="object-cover"
                          />
                          <div className="absolute inset-0 peer-data-[state=checked]:bg-primary/10" />
                        </div>
                        <span className="mt-2 flex items-center gap-1 text-xs font-medium">
                          {item.value === theme ? (
                            <Check
                              size={16}
                              strokeWidth={2}
                              className="text-primary"
                            />
                          ) : (
                            <Minus
                              size={16}
                              strokeWidth={2}
                              className="text-muted-foreground"
                            />
                          )}
                          {item.label}
                        </span>
                      </label>
                    ))}
                  </RadioGroup>
                </fieldset>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <HelpCircle className="mr-2" />
                  Help & Support
                </CardTitle>
                <CardDescription>
                  Get help and support for using the application.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  View Documentation
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Contact Support
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Report a Bug
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
