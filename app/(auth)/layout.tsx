import EnTete from "@/components/layout/EnTete";
import PiedDePage from "@/components/layout/PiedDePage";
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (<><EnTete /><main className="bg-nuage py-12">{children}</main><PiedDePage /></>);
}
