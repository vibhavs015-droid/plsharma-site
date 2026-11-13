import {
  FileText,
  Receipt,
  ClipboardCheck,
  Building2,
  Calculator,
  Landmark,
  Award,
  Users,
  ShieldCheck,
  Clock,
  Lock,
  Handshake,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  "file-text": FileText,
  receipt: Receipt,
  "clipboard-check": ClipboardCheck,
  "building-2": Building2,
  calculator: Calculator,
  landmark: Landmark,
  award: Award,
  users: Users,
  "shield-check": ShieldCheck,
  clock: Clock,
  lock: Lock,
  handshake: Handshake,
};

export function FeatureIcon({ name, className }: { name: string; className?: string }) {
  const Icon = iconMap[name] ?? Landmark;
  return <Icon className={className} />;
}
