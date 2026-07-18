"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { BRANDS, SEGMENTS, FUEL_TYPES, type Segment, type FuelType } from "@/data/indian-cars";

export interface CarFiltersState {
  searchQuery: string;
  brand: string | undefined;
  segment: Segment | undefined;
  fuelType: FuelType | undefined;
  priceRange: [number, number];
  sortBy: "price-low" | "price-high" | "name" | "popular";
}

const INITIAL_FILTERS: CarFiltersState = {
  searchQuery: "",
  brand: undefined,
  segment: undefined,
  fuelType: undefined,
  priceRange: [0, 70],
  sortBy: "popular",
};

export function CarFilters({
  filters,
  onChange,
  totalResults,
}: {
  filters: CarFiltersState;
  onChange: (filters: CarFiltersState) => void;
  totalResults: number;
}) {
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const activeFilterCount = [
    filters.brand,
    filters.segment,
    filters.fuelType,
    filters.priceRange[0] > 0 || filters.priceRange[1] < 70 ? true : undefined,
  ].filter(Boolean).length;

  const clearAll = () => onChange(INITIAL_FILTERS);

  return (
    <>
      {/* Search + Sort Bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search by brand, model, body type..."
            value={filters.searchQuery}
            onChange={(e) => onChange({ ...filters, searchQuery: e.target.value })}
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#0F131A]/40 border border-white/5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all backdrop-blur-sm"
          />
        </div>

        {/* Sort */}
        <div className="relative">
          <select
            value={filters.sortBy}
            onChange={(e) => onChange({ ...filters, sortBy: e.target.value as CarFiltersState["sortBy"] })}
            className="appearance-none w-full sm:w-48 px-4 py-3 pr-10 rounded-xl bg-[#0F131A]/40 border border-white/5 text-sm text-slate-300 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 cursor-pointer backdrop-blur-sm"
          >
            <option value="popular">Popular First</option>
            <option value="price-low">Price: Low → High</option>
            <option value="price-high">Price: High → Low</option>
            <option value="name">Name: A → Z</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
        </div>

        {/* Mobile Filter Toggle */}
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="sm:hidden flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#0F131A]/40 border border-white/5 text-sm font-medium text-slate-300"
        >
          <SlidersHorizontal className="w-4 h-4 text-slate-500" />
          Filters
          {activeFilterCount > 0 && (
            <span className="bg-emerald-500 text-slate-900 text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* Desktop Filter Bar */}
      <div className="hidden sm:flex flex-wrap gap-3 mb-6 items-center">
        <FilterDropdown
          label="Brand"
          value={filters.brand}
          options={BRANDS.map((b) => ({ value: b, label: b }))}
          onChange={(v) => onChange({ ...filters, brand: v || undefined })}
        />

        <FilterDropdown
          label="Segment"
          value={filters.segment}
          options={SEGMENTS.map((s) => ({ value: s, label: s }))}
          onChange={(v) => onChange({ ...filters, segment: (v as Segment) || undefined })}
        />

        <FilterDropdown
          label="Fuel Type"
          value={filters.fuelType}
          options={FUEL_TYPES.map((f) => ({ value: f, label: f }))}
          onChange={(v) => onChange({ ...filters, fuelType: (v as FuelType) || undefined })}
        />

        {/* Price Range */}
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0F131A]/40 border border-white/5 text-sm text-slate-300">
          <span className="text-slate-500 text-[10px] font-mono">₹</span>
          <input
            type="number"
            min={0}
            max={filters.priceRange[1]}
            value={filters.priceRange[0]}
            onChange={(e) => onChange({ ...filters, priceRange: [Number(e.target.value), filters.priceRange[1]] })}
            className="w-12 bg-transparent text-sm text-white focus:outline-none font-mono"
            placeholder="Min"
          />
          <span className="text-slate-600">–</span>
          <input
            type="number"
            min={filters.priceRange[0]}
            max={70}
            value={filters.priceRange[1]}
            onChange={(e) => onChange({ ...filters, priceRange: [filters.priceRange[0], Number(e.target.value)] })}
            className="w-12 bg-transparent text-sm text-white focus:outline-none font-mono"
            placeholder="Max"
          />
          <span className="text-slate-500 text-[10px] font-mono">Lakh</span>
        </div>

        {/* Result Count + Clear */}
        <div className="ml-auto flex items-center gap-4">
          <span className="text-xs text-slate-500 font-mono">
            [ <span className="font-bold text-slate-300 font-sans">{totalResults}</span> cars listed ]
          </span>
          {activeFilterCount > 0 && (
            <button
              onClick={clearAll}
              className="flex items-center gap-1 text-[11px] font-bold text-red-400 hover:text-red-300 transition-colors uppercase tracking-wider font-mono"
            >
              <X className="w-3.5 h-3.5" />
              Reset filters
            </button>
          )}
        </div>
      </div>

      {/* Mobile Filters Panel */}
      <AnimatePresence>
        {showMobileFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="sm:hidden overflow-hidden mb-6"
          >
            <div className="flex flex-col gap-3 p-4 rounded-xl bg-[#0F131A]/60 border border-white/5 backdrop-blur-sm">
              <FilterDropdown
                label="Brand"
                value={filters.brand}
                options={BRANDS.map((b) => ({ value: b, label: b }))}
                onChange={(v) => onChange({ ...filters, brand: v || undefined })}
              />
              <FilterDropdown
                label="Segment"
                value={filters.segment}
                options={SEGMENTS.map((s) => ({ value: s, label: s }))}
                onChange={(v) => onChange({ ...filters, segment: (v as Segment) || undefined })}
              />
              <FilterDropdown
                label="Fuel Type"
                value={filters.fuelType}
                options={FUEL_TYPES.map((f) => ({ value: f, label: f }))}
                onChange={(v) => onChange({ ...filters, fuelType: (v as FuelType) || undefined })}
              />
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-slate-400">
                  {totalResults} cars listed
                </span>
                {activeFilterCount > 0 && (
                  <button onClick={clearAll} className="text-xs font-semibold text-red-400">
                    Reset
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function FilterDropdown({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string | undefined;
  options: { value: string; label: string }[];
  onChange: (value: string | undefined) => void;
}) {
  return (
    <div className="relative">
      <select
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value || undefined)}
        className="appearance-none px-4 py-2.5 pr-8 rounded-xl bg-[#0F131A]/40 border border-white/5 text-sm text-slate-300 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 cursor-pointer backdrop-blur-sm"
      >
        <option value="">All {label}s</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 pointer-events-none" />
    </div>
  );
}

export { INITIAL_FILTERS };
