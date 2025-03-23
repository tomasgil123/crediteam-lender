import { type FC, type ReactNode } from "react";
import { Tabs } from "@/app/home/_components/Tabs";

interface LayoutProps {
  children: ReactNode;
}

const tabs = [
  {
    href: "/home",
    label: "New Loan",
  },
  {
    href: "/home/my-loans",
    label: "My Loans",
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
