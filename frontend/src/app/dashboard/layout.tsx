
import Header from "@/components/Header";
import { OrderProvider } from "@/contexts/OrderModalContext";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <OrderProvider>
        <Header />

        {children}
      </OrderProvider>
    </>
  );
}
