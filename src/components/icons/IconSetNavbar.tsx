import IconSchema from "@components/icons/IconSchema";
import IconTable from "@components/icons/IconTable";
import {
  HomeIcon,
  CommandLineIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

export type TIconSetNavbarType =
  | "home"
  | "table"
  | "terminal"
  | "schema"
  | "settings";

export default function IconSetNavbar({
  type,
  className,
}: {
  type: TIconSetNavbarType;
  className?: string;
}) {
  if (type === "table") return <IconTable className={className} />;
  if (type === "terminal") return <CommandLineIcon className={className} />;
  if (type === "schema") return <IconSchema className={className} />;
  if (type === "settings") return <Cog6ToothIcon className={className} />;
  return <HomeIcon className={className} />;
}
