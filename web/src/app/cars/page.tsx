"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Car } from "lucide-react";
import { indianCars, type IndianCar } from "@/data/indian-cars";
import { CarCard } from "@/components/CarCard";
import { CarFilters, INITIAL_FILTERS, type CarFiltersState } from "@/components/CarFilters";

export default function BrowseCarsPage() {
  const [filters, setFilters] = useState<CarFiltersState>(INITIAL_FILTERS);

  const filteredCars = useMemo(() => {
    let result = [...indianCars];

    if (filters.brand) {
      result = result.filter((c) => c.brand === filters.brand);
    }
    if (filters.segment) {
      result = result.filter((c) => c.segment === filters.segment);
    }
    if (filters.fuelType) {
      result = result.filter((c) => c.fuelTypes.includes(filters.fuelType!));
    }
    if (filters.priceRange[0] > 0) {
      result = result.filter((c) => c.priceMax >= filters.priceRange[0]);
    }
    if (filters.priceRange[1] < 70) {
      result = result.filter((c) => c.priceMin <= filters.priceRange[1]);
    }
    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      result = result.filter(
        (c) =>
          c.brand.toLowerCase().includes(q) ||
          c.model.toLowerCase().includes(q) ||
          c.segment.toLowerCase().includes(q) ||
          c.bodyType.toLowerCase().includes(q)
      );
    }

    switch (filters.sortBy) {
      case "price-low":
        result.sort((a, b) => a.priceMin - b.priceMin);
        break;
      case "price-high":
        result.sort((a, b) => b.priceMax - a.priceMax);
        break;
      case "name":
        result.sort((a, b) => `${a.brand} ${a.model}`.localeCompare(`${b.brand} ${b.model}`));
        break;
      case "popular":
      default:
        result.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
        break;
    }

    return result;
  }, [filters]);

  return (
    <div className="min-h-screen bg-[#080B10] text-[#E2E8F0] relative overflow-x-hidden">
      {/* Ambient glows */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-[-15%] right-[-10%] w-[45%] h-[45%] rounded-full bg-emerald-500/5 blur-[140px]" />
        <div className="absolute bottom-[-15%] left-[-10%] w-[45%] h-[45%] rounded-full bg-cyan-500/5 blur-[140px]" />
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#080B10]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3 group">
              <Image
                src="/logo.png"
                alt="OdoShield"
                width={34}
                height={34}
                className="rounded-lg shadow-lg shadow-emerald-500/20"
              />
              <span className="text-lg font-bold tracking-wider uppercase bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                OdoShield
              </span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <Link href="/cars" className="text-white">Browse Cars</Link>
            <Link href="/compare" className="hover:text-white transition-colors">Compare Tool</Link>
            <Link href="/chat" className="hover:text-white transition-colors">AI Advisor</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Home
            </Link>
          </div>
        </div>
      </header>

      {/* Page Header */}
      <section className="relative z-10 pt-12 pb-8 px-6">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <Car className="w-5 h-5 text-emerald-400" />
              </div>
              <span className="text-xs font-semibold tracking-widest uppercase text-emerald-400">
                Indian Car Directory
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2 text-white">
              Explore{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                {indianCars.length}+ Models
              </span>
            </h1>
            <p className="text-slate-400 max-w-xl text-sm leading-relaxed">
              Browse through the complete dataset of vehicles in the Indian car market. Inspect detailed configurations, pricing spreads, pros & cons, and safety stats.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="relative z-10 px-6 pb-20">
        <div className="mx-auto max-w-7xl">
          <CarFilters
            filters={filters}
            onChange={setFilters}
            totalResults={filteredCars.length}
          />

          {/* Car Grid */}
          {filteredCars.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredCars.map((car, i) => (
                <CarCard key={car.id} car={car} index={i} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20 text-center border border-white/5 rounded-2xl bg-[#0F131A]/20 backdrop-blur-sm"
            >
              <Car className="w-12 h-12 text-slate-600 mb-4" />
              <h3 className="text-base font-bold text-white mb-2">No matching vehicles found</h3>
              <p className="text-xs text-slate-500 mb-4">
                Try widening your price range or search query
              </p>
              <button
                onClick={() => setFilters(INITIAL_FILTERS)}
                className="px-6 py-2.5 text-xs font-bold bg-emerald-500 text-slate-900 rounded-lg hover:brightness-110 transition-all"
              >
                Reset all filters
              </button>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
