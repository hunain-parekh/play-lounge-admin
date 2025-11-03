"use client";

import * as React from "react";

import {
  SearchIcon,
  LayoutDashboard,
  ChartBar,
  Gauge,
  ShoppingBag,
  GraduationCap,
  Forklift,
  Mail,
  MessageSquare,
  Calendar,
  Kanban,
  ReceiptText,
  Users,
  Lock,
  Fingerprint,
  SquareArrowUpRight,
  Laptop,
  Shirt,
  Coffee,
  Home,
  Settings,
  HelpCircle,
  Database,
  ClipboardList,
  File,
  Building,
  Car,
  Plane,
  Zap,
  Heart,
  Star,
  Tag,
  ShoppingCart,
  Package,
  Box,
  Camera,
  Music,
  Film,
  Gamepad2,
  Book,
  Briefcase,
  Bed,
  Sofa,
  Utensils,
  Dumbbell,
  Headphones,
  Smartphone,
  Watch,
  Tablet,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

// Popular icons list
const popularIcons = [
  { name: "Home", icon: Home },
  { name: "Users", icon: Users },
  { name: "Settings", icon: Settings },
  { name: "ShoppingCart", icon: ShoppingCart },
  { name: "Package", icon: Package },
  { name: "Laptop", icon: Laptop },
  { name: "Shirt", icon: Shirt },
  { name: "Coffee", icon: Coffee },
  { name: "ShoppingBag", icon: ShoppingBag },
  { name: "Box", icon: Box },
  { name: "Camera", icon: Camera },
  { name: "Music", icon: Music },
  { name: "Film", icon: Film },
  { name: "Gamepad2", icon: Gamepad2 },
  { name: "Book", icon: Book },
  { name: "Briefcase", icon: Briefcase },
  { name: "Bed", icon: Bed },
  { name: "Sofa", icon: Sofa },
  { name: "Utensils", icon: Utensils },
  { name: "Dumbbell", icon: Dumbbell },
  { name: "Headphones", icon: Headphones },
  { name: "Smartphone", icon: Smartphone },
  { name: "Watch", icon: Watch },
  { name: "Tablet", icon: Tablet },
  { name: "Building", icon: Building },
  { name: "Car", icon: Car },
  { name: "Plane", icon: Plane },
  { name: "Zap", icon: Zap },
  { name: "Heart", icon: Heart },
  { name: "Star", icon: Star },
  { name: "Tag", icon: Tag },
  { name: "LayoutDashboard", icon: LayoutDashboard },
  { name: "ChartBar", icon: ChartBar },
  { name: "Gauge", icon: Gauge },
  { name: "GraduationCap", icon: GraduationCap },
  { name: "Forklift", icon: Forklift },
  { name: "Mail", icon: Mail },
  { name: "MessageSquare", icon: MessageSquare },
  { name: "Calendar", icon: Calendar },
  { name: "Kanban", icon: Kanban },
  { name: "ReceiptText", icon: ReceiptText },
  { name: "Lock", icon: Lock },
  { name: "Fingerprint", icon: Fingerprint },
  { name: "HelpCircle", icon: HelpCircle },
  { name: "Database", icon: Database },
  { name: "ClipboardList", icon: ClipboardList },
  { name: "File", icon: File },
  { name: "SquareArrowUpRight", icon: SquareArrowUpRight },
];

interface IconPickerProps {
  value?: string;
  onChange: (iconName: string) => void;
}

export function IconPicker({ value, onChange }: IconPickerProps) {
  const [open, setOpen] = React.useState(false);

  const selectedIcon = React.useMemo(() => {
    if (!value) return null;
    return popularIcons.find((i) => i.name === value);
  }, [value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
          {selectedIcon ? (
            <div className="flex items-center gap-2">
              <selectedIcon.icon className="size-4" />
              <span>{selectedIcon.name}</span>
            </div>
          ) : (
            "Select icon..."
          )}
          <SearchIcon className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="max-h-[400px] w-[300px] p-0" align="start">
        <Command className="overflow-hidden">
          <CommandInput placeholder="Search icons..." />
          <CommandList className="scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 max-h-[350px] overflow-y-scroll">
            <CommandEmpty>No icon found.</CommandEmpty>
            <CommandGroup heading="Icons">
              {popularIcons.map((iconItem) => (
                <CommandItem
                  key={iconItem.name}
                  value={iconItem.name}
                  onSelect={() => {
                    onChange(iconItem.name);
                    setOpen(false);
                  }}
                  className="cursor-pointer"
                >
                  <iconItem.icon className="mr-2 size-4 shrink-0" />
                  {iconItem.name}
                  <SearchIcon className={cn("ml-auto size-4", value === iconItem.name ? "opacity-100" : "opacity-0")} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
