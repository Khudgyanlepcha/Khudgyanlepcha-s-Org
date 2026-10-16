import React, { useState } from 'react';
import { Upload, ShieldCheck, ArrowRight, RotateCcw } from 'lucide-react';
import { TRANSFORMATION_CASES, TransformationCase } from '../data/gymData';
import { ResilientImage } from './ResilientImage';

interface TransformationSectionProps {
  onStartJourneyClick: (programName: string) => void;
}

interface AuthorizedImagesMap {
  [caseId: string]: {
    beforeUrl?: string;
    afterUrl?: string;
  };
}

export const TransformationSection: React.FC<TransformationSectionProps> = ({
  onStartJourneyClick,
}) => {
  const [activeCaseId, setActiveCaseId] = useState<string>(TRANSFORMATION_CASES[0].id);
  const [authorizedImages, setAuthorizedImages] = useState<AuthorizedImagesMap>({});
  const [viewMode, setViewMode] = useState<'workout' | 'before-after'>('before-after');

  const activeCase: TransformationCase =
    TRANSFORMATION_CASES.find((c) => c.id === activeCaseId) || TRANSFORMATION_CASES[0];

  const handleImageUpload = (
    caseId: string,
    slot: 'beforeUrl' | 'afterUrl',
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setAuthorizedImages((prev) => ({
          ...prev,
          [caseId]: {
            ...prev[caseId],
            [slot]: reader.result as string,
          },
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  const currentAuthorized = authorizedImages[activeCase.id] || {};

  return (
    <section
      id="transformations"
      className="py-20 sm:py-24 bg-[#09090B] border-t border-white/10"
      aria-labelledby="transformations-heading"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="text-xs font-medium text-[#C8FF00] tracking-wide mb-2">
              Real Benchmarks · Verified Consent Policy
            </div>
            <h2
              id="transformations-heading"
              className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight text-balance"
            >
              Transformation Gallery & Performance Logs
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#A1A1AA] leading-relaxed">
              We measure progress through objective strength numbers, cardiovascular recovery, and
              sustainable body recomposition. In strict accordance with member privacy, before-and-after
              portraits use structured placeholders until a signed member release photo is uploaded.
            </p>
          </div>

          {/* Interactive View Switcher (Functional Segmented Control) */}
          <div className="flex items-center gap-1 p-1 bg-[#141418] border border-white/10 rounded-lg self-start lg:self-auto shrink-0">
            <button
              type="button"
              onClick={() => setViewMode('before-after')}
              className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                viewMode === 'before-after'
                  ? 'bg-[#C8FF00] text-[#09090B] font-semibold'
                  : 'text-[#A1A1AA] hover:text-white'
              }`}
            >
              Before / After Placeholders
            </button>
            <button
              type="button"
              onClick={() => setViewMode('workout')}
              className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                viewMode === 'workout'
                  ? 'bg-[#C8FF00] text-[#09090B] font-semibold'
                  : 'text-[#A1A1AA] hover:text-white'
              }`}
            >
              Training Floor Photography
            </button>
          </div>
        </div>

        {/* Case Selector Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {TRANSFORMATION_CASES.map((item, idx) => {
            const isSelected = item.id === activeCase.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveCaseId(item.id)}
                className={`text-left p-5 rounded-xl border transition-all duration-150 cursor-pointer ${
                  isSelected
                    ? 'bg-[#16161B] border-[#C8FF00]/60'
                    : 'bg-[#111114] border-white/10 hover:border-white/25'
                }`}
              >
                <div className="flex items-center justify-between text-xs text-[#A1A1AA] mb-1.5">
                  <span className="font-mono text-[#C8FF00] tabular-nums">
                    0{idx + 1}. {item.timeframe}
                  </span>
                </div>
                <div className="font-display text-xl font-bold text-white tracking-tight">
                  {item.title}
                </div>
                <div className="text-xs text-[#A1A1AA] mt-1">{item.programUsed}</div>
              </button>
            );
          })}
        </div>

        {/* Active Transformation Spotlight */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-[#121215] border border-white/10 rounded-xl p-6 sm:p-8">
          {/* Left Column: Visual Before/After Placeholder or Workout Photography */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            {viewMode === 'before-after' ? (
              <div className="space-y-4 h-full flex flex-col">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
                  {/* BEFORE SLOT */}
                  <div className="relative rounded-lg border border-white/10 bg-[#09090B] overflow-hidden flex flex-col justify-between min-h-[280px]">
                    {currentAuthorized.beforeUrl ? (
                      <img
                        src={currentAuthorized.beforeUrl}
                        alt="Authorized member before transformation"
                        referrerPolicy="no-referrer"
                        className="w-full h-72 object-cover"
                      />
                    ) : (
                      <div className="p-6 flex-1 flex flex-col justify-between bg-gradient-to-b from-[#16161A] to-[#09090B]">
                        <div className="flex items-center justify-between text-xs text-[#A1A1AA]">
                          <span className="font-mono uppercase tracking-wider text-white">
                            Day 01 · Baseline
                          </span>
                          <span>Authorized Slot</span>
                        </div>

                        <div className="my-6 py-6 border-y border-dashed border-white/15 text-center space-y-2">
                          <ShieldCheck className="w-7 h-7 text-[#A1A1AA] mx-auto" aria-hidden="true" />
                          <p className="text-xs font-medium text-white">
                            Before Portrait Placeholder
                          </p>
                          <p className="text-[11px] text-[#A1A1AA] max-w-[220px] mx-auto">
                            Reserved for verified member photo with signed release authorization.
                          </p>
                        </div>

                        <label className="inline-flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-[#E4E4E7] bg-white/5 hover:bg-white/10 border border-white/15 rounded-md cursor-pointer transition-colors">
                          <Upload className="w-3.5 h-3.5 text-[#C8FF00]" aria-hidden="true" />
                          <span>Preview Authorized "Before" Photo</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="sr-only"
                            onChange={(e) => handleImageUpload(activeCase.id, 'beforeUrl', e)}
                          />
                        </label>
                      </div>
                    )}
                  </div>

                  {/* AFTER SLOT */}
                  <div className="relative rounded-lg border border-[#C8FF00]/30 bg-[#09090B] overflow-hidden flex flex-col justify-between min-h-[280px]">
                    {currentAuthorized.afterUrl ? (
                      <img
                        src={currentAuthorized.afterUrl}
                        alt="Authorized member after transformation"
                        referrerPolicy="no-referrer"
                        className="w-full h-72 object-cover"
                      />
                    ) : (
                      <div className="p-6 flex-1 flex flex-col justify-between bg-gradient-to-b from-[#1A1D12] to-[#09090B]">
                        <div className="flex items-center justify-between text-xs text-[#C8FF00]">
                          <span className="font-mono uppercase tracking-wider font-semibold">
                            {activeCase.timeframe.split('·')[0].trim()} · Result
                          </span>
                          <span>Authorized Slot</span>
                        </div>

                        <div className="my-6 py-6 border-y border-dashed border-[#C8FF00]/25 text-center space-y-2">
                          <ShieldCheck className="w-7 h-7 text-[#C8FF00] mx-auto" aria-hidden="true" />
                          <p className="text-xs font-medium text-white">
                            After Portrait Placeholder
                          </p>
                          <p className="text-[11px] text-[#A1A1AA] max-w-[220px] mx-auto">
                            Upload authorized progress photo or inspect verified lift benchmarks.
                          </p>
                        </div>

                        <label className="inline-flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-[#09090B] bg-[#C8FF00] hover:bg-[#d4ff33] rounded-md cursor-pointer transition-colors">
                          <Upload className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Preview Authorized "After" Photo</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="sr-only"
                            onChange={(e) => handleImageUpload(activeCase.id, 'afterUrl', e)}
                          />
                        </label>
                      </div>
                    )}
                  </div>
                </div>

                {(currentAuthorized.beforeUrl || currentAuthorized.afterUrl) && (
                  <div className="flex items-center justify-between text-xs text-[#A1A1AA] pt-1">
                    <span>Showing locally previewed authorized member photography.</span>
                    <button
                      type="button"
                      onClick={() =>
                        setAuthorizedImages((prev) => ({
                          ...prev,
                          [activeCase.id]: {},
                        }))
                      }
                      className="inline-flex items-center gap-1 text-[#C8FF00] hover:underline cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Reset Placeholder</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="relative rounded-lg overflow-hidden h-full min-h-[300px] border border-white/10">
                <ResilientImage
                  src={activeCase.facilityImage}
                  alt={activeCase.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex items-end p-6">
                  <div>
                    <div className="text-xs text-[#C8FF00] font-medium mb-1">
                      KhudGyan Gym Training Floor · {activeCase.programUsed}
                    </div>
                    <p className="text-sm text-white font-medium">{activeCase.summary}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Quantified Before & After Metric Log */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 bg-[#0C0C0E] border border-white/10 rounded-lg p-6">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#A1A1AA] mb-1">
                <span>{activeCase.memberLabel}</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#C8FF00]">{activeCase.timeframe}</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-white tracking-tight">
                {activeCase.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#A1A1AA] mt-2 leading-relaxed">
                {activeCase.summary}
              </p>
            </div>

            {/* Tabular Numerals Comparison Table */}
            <div className="space-y-3">
              <div className="grid grid-cols-3 text-[11px] font-medium text-[#A1A1AA] pb-2 border-b border-white/10">
                <span>Benchmark Metric</span>
                <span className="text-right">Starting Baseline</span>
                <span className="text-right text-[#C8FF00]">Recorded Result</span>
              </div>

              {activeCase.beforeMetrics.map((beforeItem, idx) => {
                const afterItem = activeCase.afterMetrics[idx];
                return (
                  <div
                    key={beforeItem.label}
                    className="grid grid-cols-3 items-center py-2 border-b border-white/5 text-xs sm:text-sm"
                  >
                    <span className="text-[#E4E4E7] font-medium">{beforeItem.label}</span>
                    <span className="text-right font-mono tabular-nums text-[#A1A1AA]">
                      {beforeItem.value}
                    </span>
                    <span className="text-right font-mono tabular-nums font-semibold text-[#C8FF00]">
                      {afterItem?.value}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-[11px] text-[#A1A1AA]">{activeCase.statusNote}</span>
              <button
                type="button"
                onClick={() => onStartJourneyClick(activeCase.programUsed)}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-[#09090B] bg-[#C8FF00] hover:bg-[#d4ff33] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Train for This Goal</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
