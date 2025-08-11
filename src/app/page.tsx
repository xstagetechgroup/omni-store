import { CategorySidebar } from "@/components/categorySidebar";
import SearchForm from "@/components/form/search-form";
import NewslatterSection from "@/components/newslatter";
import ProductGrid from "@/components/productGrid";
import RecomendedProducts from "@/components/recomendations";
import Container from "@/components/shared/container";
import Footer from "@/components/shared/footer";
import Navbar from "@/components/shared/navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <div className="w-full relative h-[600px] flex flex-col justify-between items-center">

        <Navbar />

        <Image src={'/assets/home-banner.jpg'} alt={'Home Banner'} width={1000} height={1000} className="w-full h-full object-cover" />

        <div className="absolute bottom-0 w-full">
          <SearchForm />
        </div>

      </div>

      <Container>
        <div className="min-h-screen flex flex-col md:flex-row py-10">
          {/* Sidebar */}
          <aside className="hidden lg:block flex-shrink-0">
            <CategorySidebar />
          </aside>

          {/* Main content */}
          <main className="flex-1">
            <ProductGrid />
          </main>
        </div>
      </Container>

      <RecomendedProducts />

      <NewslatterSection />
      <Footer />
    </div>
  );
}




{/* <div className="min-h-screen flex flex-col md:flex-row">
  <SidebarProvider defaultOpen={true}>
    <CategorySidebar />
    <div className="flex-1">
      <ProductGrid />
    </div>
  </SidebarProvider>
</div> */}