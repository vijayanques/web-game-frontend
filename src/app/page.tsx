import All_games from "@/components/Home/All_games";
import AllCategoriesSections from "@/components/Home/AllCategoriesSections";
import Categories from "@/components/Home/Explore_Categories_";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#E8E9ED]">
      <All_games />
      <Categories />
      <AllCategoriesSections />
      <Footer />
    </div>
  );
}
