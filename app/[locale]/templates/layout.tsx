import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default async function TemplatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
