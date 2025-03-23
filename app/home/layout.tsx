import { type FC, type ReactNode } from "react";
import { Tabs } from "@/app/home/_components/tabs";

interface LayoutProps {
  children: ReactNode;
}

const tabs = [
  {
    href: "/home",
    label: "New Deposit",
  },
  {
    href: "/home/my-deposits",
    label: "My Deposits",
  },
];

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col gap-6">
      <Tabs tabs={tabs} />
      {children}
    </div>
  );
};

export default Layout;
