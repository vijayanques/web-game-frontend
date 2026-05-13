'use client';

import PageSeoHead from '@/components/PageSeoHead';
import All_games from "@/components/Home/All_games";
import AllCategoriesSections from "@/components/Home/AllCategoriesSections";
import Categories from "@/components/Home/Explore_Categories_";
import Footer from "@/components/Footer";
import ResponsiveAd from "@/components/common/ResponsiveAd";

export default function Home() {
  return (
    <>
      <PageSeoHead pageSlug="/" />
      
      <div className="min-h-screen bg-[#E8E9ED]">
        <ResponsiveAd slot="homepage_banner" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6" />
        <All_games />
        <ResponsiveAd slot="homepage_mid_banner_1" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6" />
        <Categories />
        <ResponsiveAd slot="homepage_mid_banner_2" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6" />
        <AllCategoriesSections />
        <Footer />
      </div>
    </>
  );
}
