'use client';

import PageSeoHead from '@/components/PageSeoHead';
import All_games from "@/components/Home/All_games";
import AllCategoriesSections from "@/components/Home/AllCategoriesSections";
import Categories from "@/components/Home/Explore_Categories_";
import TrendingGames from "@/components/Home/TrendingGames";
import Footer from "@/components/Footer";
import ResponsiveAd from "@/components/common/ResponsiveAd";

export default function HomeClient() {
  return (
    <>
      <PageSeoHead pageSlug="/" />
      
      <div className="min-h-screen bg-[#E8E9ED]">
        <ResponsiveAd slot="homepage_banner" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6" />
        
        <div className="max-w-[1600px] mx-auto flex flex-col xl:flex-row gap-4 justify-center py-6 px-4">
          {/* Left Sidebar Ad - Sticky */}
          <div className="hidden 2xl:block w-[160px] shrink-0 sticky top-24 self-start">
            <ResponsiveAd slot="left_sidebar_ad" layout="vertical" />
          </div>

          <div className="flex-1 max-w-7xl w-full">
            <TrendingGames />
            <ResponsiveAd slot="homepage_mid_banner_1" className="w-full my-6" />
            <All_games />
            <ResponsiveAd slot="homepage_mid_banner_2" className="w-full my-6" />
            <Categories />
            <AllCategoriesSections />
          </div>

          {/* Right Sidebar Ad - Sticky */}
          <div className="hidden 2xl:block w-[160px] shrink-0 sticky top-24 self-start">
            <ResponsiveAd slot="right_sidebar_ad" layout="vertical" />
          </div>
        </div>

        <ResponsiveAd slot="footer_ad" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6" />
        <Footer />
      </div>
    </>
  );
}
