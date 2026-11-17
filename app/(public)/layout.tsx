import EnTete from "@/components/layout/EnTete";
import PiedDePage from "@/components/layout/PiedDePage";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (<><EnTete /><main>{children}</main><PiedDePage /></>);
}
