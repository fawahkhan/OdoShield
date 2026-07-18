"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Star, Fuel, Gauge, Users, ChevronRight } from "lucide-react";
import type { IndianCar } from "@/data/indian-cars";
import { formatPriceRange } from "@/data/indian-cars";

const segmentImageMap: Record<string, string> = {
  hatchback: "/cars/hatchback.png",
  sedan: "/cars/sedan.png",
  suv: "/cars/suv.png",
  muv: "/cars/muv.png",
};

export function CarCard({ car, index = 0 }: { car: IndianCar; index?: number }) {
  const imageSrc = segmentImageMap[car.imageSegment] ?? "/cars/suv.png";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.4), ease: "easeOut" }}
    >
      <Link
        href={`/cars/${car.slug}`}
        className="group relative flex flex-col rounded-2xl border border-white/5 bg-[#0F131A]/40 backdrop-blur-sm overflow-hidden hover:border-emerald-500/20 hover:bg-[#0F131A]/60 transition-all duration-300"
      >
        {/* Image */}
        <div className="relative h-44 overflow-hidden bg-slate-900/60">
          <Image
            src={imageSrc}
            alt={`${car.brand} ${car.model}`}
            fill
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
          {/* Safety badge */}
          {car.safetyRating !== null && (
            <div className="absolute top-3 right-3 flex items-center gap-1 bg-slate-950/80 backdrop-blur-md text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/5">
              <Star className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
              {car.safetyRating} Star
            </div>
          )}
          {/* Segment badge */}
          <div className="absolute top-3 left-3 text-[9px] font-extrabold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full backdrop-blur-md border border-emerald-500/20">
            {car.segment}
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-5">
          <p className="text-[10px] font-mono tracking-widest text-slate-500 uppercase mb-1">
            {car.brand}
          </p>
          <h3 className="text-base font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors">
            {car.model}
          </h3>
          <p className="text-sm font-extrabold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            {formatPriceRange(car.priceMin, car.priceMax)}
          </p>

          {/* Specs grid */}
          <div className="grid grid-cols-3 gap-2.5 mb-4">
            <div className="flex flex-col items-center gap-1 text-center p-2 rounded-lg bg-slate-900/40 border border-white/5">
              <Fuel className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-[9px] text-slate-400 font-mono font-medium leading-tight">
                {car.fuelTypes.slice(0, 2).join("/")}
              </span>
            </div>
            <div className="flex flex-col items-center gap-1 text-center p-2 rounded-lg bg-slate-900/40 border border-white/5">
              <Gauge className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-[9px] text-slate-400 font-mono font-medium leading-tight">
                {car.mileage.split(" ")[0]}
              </span>
            </div>
            <div className="flex flex-col items-center gap-1 text-center p-2 rounded-lg bg-slate-900/40 border border-white/5">
              <Users className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-[9px] text-slate-400 font-mono font-medium leading-tight">
                {car.seatingCapacity} Seats
              </span>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-auto flex items-center justify-between text-[10px] font-mono text-slate-500 pt-3.5 border-t border-white/5">
            <span>{car.transmissions.slice(0, 2).join(" / ")}</span>
            <span className="flex items-center gap-1 text-emerald-400 group-hover:gap-2 transition-all font-bold">
              Scan Details
              <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        {/* Hover glow */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-emerald-500/5 to-transparent pointer-events-none" />
      </Link>
    </motion.div>
  );
}
