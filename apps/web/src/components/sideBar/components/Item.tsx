import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../../../utils/classNameMerge";

interface IItem {
  label: string;
  href: string;
  hideLabel: boolean;
  icon?: React.ReactElement;
}
export const LinkItem = ({ label, href, icon, hideLabel }: IItem) => {
  const pathname = usePathname();

  return (
    <li
      className={cn(
        "group-active-within:bg-sky-700 group m-2 rounded-md py-3 text-left transition duration-150 hover:bg-slate-500",
        pathname === href && "bg-sky-700"
      )}
      tabIndex={-1}
    >
      <Link href={href}>
        <div className="flex gap-4 px-4">
          {icon}
          <div className={!hideLabel ? "hidden" : "block"}>{label}</div>
        </div>
      </Link>
    </li>
  );
};

interface IList {
  children: React.ReactNode;
}

export const List = ({ children }: IList) => {
  return (
    <ul className="relative m-0 flex-1 list-none px-0 py-1">{children}</ul>
  );
};

interface IHeader extends IList {}
export const Header = ({ children }: IHeader) => {
  return (
    <div className="border-border border-b p-[4px]">
      <Link href={"/"}>{children}</Link>
    </div>
  );
};

interface IFooter extends IList {}
export const Footer = ({ children }: IFooter) => {
  return <div className="border-border border-t px-5 py-8">{children}</div>;
};
