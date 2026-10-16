import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  Check,
  ChevronDown,
  SlidersHorizontal,
  MessageCircle,
  Calendar,
} from 'lucide-react';
import {
  BusinessSettings,
  DEFAULT_BUSINESS_SETTINGS,
  TRAINING_PROGRAMS,
  MEMBERSHIP_PLANS,
  WHY_CHOOSE_ITEMS,
  FAQ_ITEMS,
  HERO_IMAGE,
  COACHING_IMAGE,
  STRENGTH_IMAGE,
  TrainingProgram,
} from './data/gymData';
import { Navbar } from './components/Navbar';
import { ResilientImage } from './components/ResilientImage';
import { ProgramModal } from './components/ProgramModal';
import { OwnerSettingsDrawer } from './components/OwnerSettingsDrawer';
import { BookingsManagerDrawer } from './components/BookingsManagerDrawer';
import { TransformationSection } from './components/TransformationSection';
import { TrainersAndTestimonials } from './components/TrainersAndTestimonials';
import { ContactBookingSection } from './components/ContactBookingSection';

const STORAGE_KEY = 'khudgyan_gym_business_settings_v1';

export default function App() {
  const [settings, setSettings] = useState<BusinessSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_BUSINESS_SETTINGS, ...JSON.parse(saved) };
      }
    } catch {
      // Fallback to default settings
    }
    return DEFAULT_BUSINESS_SETTINGS;
  });

  const [programFilter, setProgramFilter] = useState<'all' | 'strength' | 'conditioning' | 'coaching'>('all');
  const [selectedProgram, setSelectedProgram] = useState<TrainingProgram | null>(null);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'quarterly' | 'annual'>('monthly');
  const [ownerSettingsOpen, setOwnerSettingsOpen] = useState(false);
  const [bookingsManagerOpen, setBookingsManagerOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const [bookingIntent, setBookingIntent] = useState<{
    type: 'trial' | 'membership' | 'contact';
    planOrProgram: string;
  }>({
    type: 'trial',
    planOrProgram: 'Pro Membership (Gym + Group Training)',
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // Ignore storage quota errors
    }
  }, [settings]);

  const handleSaveSettings = (newSettings: BusinessSettings) => {
    setSettings(newSettings);
  };

  const handleResetSettings = () => {
    setSettings(DEFAULT_BUSINESS_SETTINGS);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  };

  const scrollToBookingWithIntent = (
    type: 'trial' | 'membership' | 'contact',
    planOrProgram: string
  ) => {
    setBookingIntent({ type, planOrProgram });
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const filteredPrograms =
    programFilter === 'all'
      ? TRAINING_PROGRAMS
      : TRAINING_PROGRAMS.filter((p) => p.category === programFilter);

  const calculatePlanPrice = (planId: 'basic' | 'pro' | 'elite') => {
    const baseMonthly = settings.prices[planId];
    if (billingCycle === 'quarterly') {
      return Math.round(baseMonthly * 0.85);
    }
    if (billingCycle === 'annual') {
      return Math.round(baseMonthly * 0.75);
    }
    return baseMonthly;
  };

  return (
    <div id="top" className="min-h-screen bg-[#09090B] text-[#F4F4F5] flex flex-col">
      {/* Sticky Top Bar (Strict 3-Zone Contract) */}
      <Navbar
        gymName={settings.gymName}
        onBookTrialClick={() =>
          scrollToBookingWithIntent('trial', 'Strength Training')
        }
      />

      <main className="flex-1">
        {/* 1. FULL-SCREEN HERO SECTION */}
        <section
          aria-label="KhudGyan Gym Hero"
          className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-between overflow-hidden"
        >
          {/* Background Image & Measured Contrast Scrims */}
          <div className="absolute inset-0 z-0">
            <ResilientImage
              src={HERO_IMAGE}
              alt="Athletes training with heavy barbells inside KhudGyan Gym"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#09090B]/95 via-[#09090B]/80 to-[#09090B]/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-[#09090B]/40 to-transparent" />
          </div>

          {/* Hero Content Container */}
          <div className="relative z-10 max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-12 flex-1 flex flex-col justify-center">
            <div className="max-w-3xl space-y-6">
              {/* Quiet unboxed text kicker (Zero-Pill Discipline) */}
              <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-medium text-[#C8FF00] tracking-wide">
                <span>{settings.tagline}</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#E4E4E7]">Strength · Discipline · Transformation</span>
              </div>

              {/* Main Headline */}
              <h1
                className="font-display font-bold text-white tracking-tight leading-[1.03] text-balance"
                style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)' }}
              >
                BUILD YOUR STRENGTH. TRANSFORM YOUR LIFE.
              </h1>

              {/* Subheadline */}
              <p className="text-base sm:text-lg text-[#D4D4D8] max-w-2xl leading-relaxed">
                Your journey to a stronger body and a stronger mindset starts at KhudGyan Gym.
                Train harder, stay consistent, and become your best self.
              </p>

              {/* Two Prominent CTA Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a
                  href="#memberships"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-semibold text-[#09090B] bg-[#C8FF00] hover:bg-[#d4ff33] active:scale-[0.99] rounded-md transition-all duration-150 whitespace-nowrap shrink-0"
                >
                  <span>Join KhudGyan Gym</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>

                <a
                  href="#programs"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-medium text-white bg-white/10 hover:bg-white/15 border border-white/20 rounded-md transition-all duration-150 whitespace-nowrap shrink-0"
                >
                  <span>Explore Our Programs</span>
                </a>
              </div>
            </div>
          </div>

          {/* Full-Width 4-Column Benchmark Strip Below Hero Split */}
          <div className="relative z-10 border-t border-white/10 bg-[#09090B]/90 backdrop-blur-md">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <div className="font-mono text-xl sm:text-2xl font-semibold text-white tabular-nums">
                  45+ Stations
                </div>
                <div className="text-xs text-[#A1A1AA] mt-0.5">
                  Calibrated Power Racks, Platforms & Cables
                </div>
              </div>
              <div>
                <div className="font-mono text-xl sm:text-2xl font-semibold text-white tabular-nums">
                  07 Tracks
                </div>
                <div className="text-xs text-[#A1A1AA] mt-0.5">
                  From Beginner Onboarding to Heavy Strength
                </div>
              </div>
              <div>
                <div className="font-mono text-xl sm:text-2xl font-semibold text-white tabular-nums">
                  1:1 & Group
                </div>
                <div className="text-xs text-[#A1A1AA] mt-0.5">
                  Certified Biomechanical & Nutrition Coaching
                </div>
              </div>
              <div>
                <div className="font-mono text-xl sm:text-2xl font-semibold text-[#C8FF00] tabular-nums">
                  Free 1-Day Trial
                </div>
                <div className="text-xs text-[#A1A1AA] mt-0.5">
                  Supervised Floor Tour & Baseline Assessment
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. ABOUT US & WHY CHOOSE KHUDGYAN GYM */}
        <section
          id="about"
          className="py-20 sm:py-24 bg-[#0D0D10] border-t border-white/10"
          aria-labelledby="about-heading"
        >
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            {/* 2-Column Asymmetric Split: About KhudGyan Gym */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
              <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="text-xs font-medium text-[#C8FF00] tracking-wide">
                    About KhudGyan Gym · Know Your Strength
                  </div>
                  <h2
                    id="about-heading"
                    className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight text-balance"
                  >
                    Built for Disciplined Training, Real Coaching & Lasting Results
                  </h2>
                  <p className="text-sm sm:text-base text-[#D4D4D8] leading-relaxed">
                    <strong>KhudGyan</strong> means self-knowledge—understanding what your body and
                    mind are truly capable of when guided by structured training and daily
                    consistency. We created KhudGyan Gym as a dedicated strength and conditioning
                    destination where first-time lifters and experienced athletes train side by
                    side in a clean, motivating, zero-ego environment.
                  </p>
                  <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed">
                    Instead of leaving members to guess their way through crowded machines, our
                    coaching team teaches foundational movement mechanics, progressive overload,
                    and sustainable nutrition habits that carry over into everyday life.
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() =>
                      scrollToBookingWithIntent('trial', 'Beginner Fitness Programs')
                    }
                    className="px-5 py-3 text-xs sm:text-sm font-semibold text-[#09090B] bg-[#C8FF00] hover:bg-[#d4ff33] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Book a Guided Facility Tour
                  </button>
                  <a
                    href="#trainers"
                    className="px-5 py-3 text-xs sm:text-sm font-medium text-white bg-white/5 hover:bg-white/10 border border-white/15 rounded-md transition-colors whitespace-nowrap shrink-0"
                  >
                    Meet Our Coaching Staff
                  </a>
                </div>
              </div>

              <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 items-stretch">
                <div className="relative rounded-xl overflow-hidden border border-white/10 min-h-[260px]">
                  <ResilientImage
                    src={COACHING_IMAGE}
                    alt="Personal coach guiding a member through a barbell squat"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-5">
                    <div className="text-xs text-white font-medium">
                      Hands-On Biomechanical Coaching
                    </div>
                  </div>
                </div>

                <div className="relative rounded-xl overflow-hidden border border-white/10 min-h-[260px]">
                  <ResilientImage
                    src={STRENGTH_IMAGE}
                    alt="Calibrated cast-iron plates and heavy dumbbells at KhudGyan Gym"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-5">
                    <div className="text-xs text-white font-medium">
                      Calibrated Free Weights & Power Racks
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Why Choose KhudGyan Gym (6 Pillars) */}
            <div className="pt-8 border-t border-white/10">
              <div className="max-w-2xl mb-10">
                <div className="text-xs font-medium text-[#C8FF00] tracking-wide mb-2">
                  The KhudGyan Standard
                </div>
                <h3 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight">
                  Why Choose KhudGyan Gym?
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {WHY_CHOOSE_ITEMS.map((item) => (
                  <div
                    key={item.number}
                    className="bg-[#131317] border border-white/10 rounded-xl p-6 flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between text-xs text-[#A1A1AA]">
                        <span className="font-mono font-semibold text-[#C8FF00] tabular-nums">
                          {item.number}.
                        </span>
                        <span className="font-mono text-[#E4E4E7] tabular-nums">{item.metric}</span>
                      </div>
                      <h4 className="font-display text-2xl font-bold text-white tracking-tight">
                        {item.title}
                      </h4>
                      <p className="text-sm text-[#A1A1AA] leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 3. OUR TRAINING PROGRAMS */}
        <section
          id="programs"
          className="py-20 sm:py-24 bg-[#09090B] border-t border-white/10"
          aria-labelledby="programs-heading"
        >
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
              <div className="max-w-2xl">
                <div className="text-xs font-medium text-[#C8FF00] tracking-wide mb-2">
                  Structured Training Tracks · Click Any Program for Weekly Split
                </div>
                <h2
                  id="programs-heading"
                  className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight text-balance"
                >
                  Our Training Programs
                </h2>
                <p className="mt-3 text-sm sm:text-base text-[#A1A1AA] leading-relaxed">
                  Seven specialized training tracks engineered for measurable strength, muscle
                  hypertrophy, metabolic fat loss, and confident beginner progression.
                </p>
              </div>

              {/* Interactive Category Filter Control */}
              <div className="flex flex-wrap items-center gap-1 p-1 bg-[#141418] border border-white/10 rounded-lg self-start lg:self-auto">
                {[
                  { id: 'all', label: 'All Programs (7)' },
                  { id: 'strength', label: 'Strength & Muscle' },
                  { id: 'conditioning', label: 'Weight Loss & Cardio' },
                  { id: 'coaching', label: '1:1 & Beginners' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() =>
                      setProgramFilter(tab.id as 'all' | 'strength' | 'conditioning' | 'coaching')
                    }
                    className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      programFilter === tab.id
                        ? 'bg-[#C8FF00] text-[#09090B] font-semibold'
                        : 'text-[#A1A1AA] hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Programs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPrograms.map((program, idx) => {
                const isFeaturedSpan =
                  programFilter === 'all' && idx === 0
                    ? 'md:col-span-2 lg:col-span-2'
                    : 'col-span-1';

                return (
                  <article
                    key={program.id}
                    className={`${isFeaturedSpan} bg-[#121215] border border-white/10 hover:border-white/25 rounded-xl overflow-hidden flex flex-col justify-between transition-colors group`}
                  >
                    <div>
                      <div className="relative h-56 overflow-hidden bg-[#09090B]">
                        <ResilientImage
                          src={program.image}
                          alt={program.imageAlt}
                          fallbackTitle={program.title}
                          className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-200"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#121215] via-[#121215]/30 to-transparent" />
                      </div>

                      <div className="p-6">
                        {/* Unboxed Clean Metadata with Typographic Separators */}
                        <div className="flex flex-wrap items-center gap-2 text-xs text-[#A1A1AA] mb-2">
                          <span className="font-mono text-[#C8FF00] font-semibold tabular-nums">
                            {program.index}. {program.categoryLabel}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>{program.frequency}</span>
                          <span aria-hidden="true">·</span>
                          <span>{program.level}</span>
                        </div>

                        <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                          {program.title}
                        </h3>

                        <p className="mt-2.5 text-sm text-[#A1A1AA] leading-relaxed">
                          {program.shortDescription}
                        </p>
                      </div>
                    </div>

                    <div className="px-6 pb-6 pt-2 flex items-center justify-between gap-3 border-t border-white/5 mt-2">
                      <button
                        type="button"
                        onClick={() => setSelectedProgram(program)}
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-[#09090B] bg-[#C8FF00] hover:bg-[#d4ff33] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <span>Learn More</span>
                        <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>

                      <button
                        type="button"
                        onClick={() => scrollToBookingWithIntent('trial', program.title)}
                        className="text-xs font-medium text-[#E4E4E7] hover:text-[#C8FF00] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        Book Free Trial →
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* 4. MEMBERSHIP PLANS (WITH EDITABLE PLACEHOLDER PRICES) */}
        <section
          id="memberships"
          className="py-20 sm:py-24 bg-[#0D0D10] border-t border-white/10"
          aria-labelledby="memberships-heading"
        >
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
              <div className="max-w-2xl">
                <div className="text-xs font-medium text-[#C8FF00] tracking-wide mb-2">
                  Transparent Tiers · Editable Placeholder Pricing
                </div>
                <h2
                  id="memberships-heading"
                  className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight text-balance"
                >
                  Membership Plans
                </h2>
                <p className="mt-3 text-sm sm:text-base text-[#A1A1AA] leading-relaxed">
                  Choose the training access level that matches your goals. All plans include a
                  complimentary floor orientation and zero hidden administrative fees.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 self-start lg:self-auto">
                {/* Billing Duration Switcher */}
                <div className="flex items-center gap-1 p-1 bg-[#141418] border border-white/10 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setBillingCycle('monthly')}
                    className={`px-3 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      billingCycle === 'monthly'
                        ? 'bg-[#C8FF00] text-[#09090B] font-semibold'
                        : 'text-[#A1A1AA] hover:text-white'
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    type="button"
                    onClick={() => setBillingCycle('quarterly')}
                    className={`px-3 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      billingCycle === 'quarterly'
                        ? 'bg-[#C8FF00] text-[#09090B] font-semibold'
                        : 'text-[#A1A1AA] hover:text-white'
                    }`}
                  >
                    Quarterly (-15%)
                  </button>
                  <button
                    type="button"
                    onClick={() => setBillingCycle('annual')}
                    className={`px-3 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      billingCycle === 'annual'
                        ? 'bg-[#C8FF00] text-[#09090B] font-semibold'
                        : 'text-[#A1A1AA] hover:text-white'
                    }`}
                  >
                    Annual (-25%)
                  </button>
                </div>

                {/* Editable Prices Trigger */}
                <button
                  type="button"
                  onClick={() => setOwnerSettingsOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-medium text-white bg-white/5 hover:bg-white/10 border border-white/15 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#C8FF00]" aria-hidden="true" />
                  <span>Edit Placeholder Prices</span>
                </button>
              </div>
            </div>

            {/* 3 Pricing Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
              {MEMBERSHIP_PLANS.map((plan) => {
                const monthlyRate = calculatePlanPrice(plan.id);
                const planFullTitle = `${plan.name} Membership (${plan.subtitle})`;

                return (
                  <div
                    key={plan.id}
                    className={`rounded-xl p-6 sm:p-8 flex flex-col justify-between border transition-colors ${
                      plan.highlighted
                        ? 'bg-[#16161C] border-[#C8FF00]'
                        : 'bg-[#121215] border-white/10'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 text-xs text-[#A1A1AA] mb-2">
                        <span>{plan.subtitle}</span>
                        {plan.badge && (
                          <span className="font-semibold text-[#C8FF00]">{plan.badge}</span>
                        )}
                      </div>

                      <h3 className="font-display text-3xl font-bold text-white tracking-tight">
                        {plan.name}
                      </h3>

                      {/* Price Display */}
                      <div className="mt-5 pb-5 border-b border-white/10">
                        <div className="flex items-baseline gap-1.5">
                          <span className="font-mono text-3xl sm:text-4xl font-bold text-white tabular-nums">
                            {settings.currencySymbol}
                            {monthlyRate.toLocaleString()}
                          </span>
                          <span className="text-xs text-[#A1A1AA]">/ month</span>
                        </div>
                        <div className="mt-1.5 flex items-center justify-between text-xs text-[#A1A1AA]">
                          <span>
                            {billingCycle === 'monthly'
                              ? 'Billed monthly · Cancel anytime'
                              : billingCycle === 'quarterly'
                              ? `Billed quarterly (${settings.currencySymbol}${(
                                  monthlyRate * 3
                                ).toLocaleString()} every 3 mos)`
                              : `Billed annually (${settings.currencySymbol}${(
                                  monthlyRate * 12
                                ).toLocaleString()} / yr)`}
                          </span>
                          <button
                            type="button"
                            onClick={() => setOwnerSettingsOpen(true)}
                            className="text-[11px] text-[#C8FF00] hover:underline cursor-pointer"
                          >
                            Edit price
                          </button>
                        </div>
                      </div>

                      <p className="mt-5 text-sm text-[#D4D4D8] leading-relaxed">
                        {plan.description}
                      </p>

                      {/* Included Features */}
                      <ul className="mt-6 space-y-3">
                        {plan.features.map((feat, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-sm text-[#E4E4E7]">
                            <Check
                              className="w-4 h-4 text-[#C8FF00] shrink-0 mt-0.5"
                              aria-hidden="true"
                            />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/10 space-y-2.5">
                      <button
                        type="button"
                        onClick={() =>
                          scrollToBookingWithIntent('membership', planFullTitle)
                        }
                        className={`w-full py-3 px-4 rounded-md text-xs sm:text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                          plan.highlighted
                            ? 'bg-[#C8FF00] text-[#09090B] hover:bg-[#d4ff33]'
                            : 'bg-white/10 text-white hover:bg-white/15 border border-white/15'
                        }`}
                      >
                        {plan.ctaLabel}
                      </button>
                      <p className="text-[11px] text-center text-[#A1A1AA]">
                        Reserve your tier online · Pay at the gym front desk after your tour
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 5. TRANSFORMATION GALLERY SECTION */}
        <TransformationSection
          onStartJourneyClick={(programName) =>
            scrollToBookingWithIntent('trial', programName)
          }
        />

        {/* 6. MEET OUR TRAINERS & 7. TESTIMONIALS CAROUSEL */}
        <TrainersAndTestimonials
          onSelectTrainer={(trainerName) =>
            scrollToBookingWithIntent('trial', `Personal Training with ${trainerName}`)
          }
        />

        {/* 8. FAQ ACCORDION */}
        <section
          id="faq"
          className="py-20 sm:py-24 bg-[#0D0D10] border-t border-white/10"
          aria-labelledby="faq-heading"
        >
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-5 space-y-4">
                <div className="text-xs font-medium text-[#C8FF00] tracking-wide">
                  Frequently Asked Questions
                </div>
                <h2
                  id="faq-heading"
                  className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight text-balance"
                >
                  Everything You Need to Know Before Day One
                </h2>
                <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed">
                  Have a specific question about equipment, personal training availability, or
                  corporate memberships? Reach out directly via WhatsApp or book a complimentary
                  gym visit.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => scrollToBookingWithIntent('trial', 'Strength Training')}
                    className="inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold text-[#09090B] bg-[#C8FF00] hover:bg-[#d4ff33] rounded-md transition-colors cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" aria-hidden="true" />
                    <span>Schedule a Free 1-Day Trial</span>
                  </button>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-3">
                {FAQ_ITEMS.map((faq, index) => {
                  const isOpen = openFaqIndex === index;
                  return (
                    <div
                      key={index}
                      className="bg-[#131317] border border-white/10 rounded-xl overflow-hidden"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                        aria-expanded={isOpen}
                        className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors cursor-pointer"
                      >
                        <span className="text-sm sm:text-base font-semibold text-white">
                          {faq.question}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-[#C8FF00] shrink-0 transition-transform duration-150 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                          aria-hidden="true"
                        />
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-5 pt-1 text-sm text-[#A1A1AA] leading-relaxed border-t border-white/5">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* 9. CONTACT, LOCATION & FREE TRIAL BOOKING */}
        <ContactBookingSection
          settings={settings}
          preselectedIntent={bookingIntent}
          onOpenOwnerSettings={() => setOwnerSettingsOpen(true)}
          onOpenBookingsManager={() => setBookingsManagerOpen(true)}
        />
      </main>

      {/* QUIET FOOTER */}
      <footer className="bg-[#070709] border-t border-white/10 py-12">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <a
                href="#top"
                className="font-display text-2xl font-bold tracking-tight text-white"
              >
                {settings.gymName}
              </a>
              <p className="text-xs text-[#A1A1AA] mt-1">
                {settings.tagline} · {settings.address}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm text-[#A1A1AA]">
              <a href="#about" className="hover:text-white transition-colors">
                About Us
              </a>
              <a href="#programs" className="hover:text-white transition-colors">
                Programs
              </a>
              <a href="#memberships" className="hover:text-white transition-colors">
                Memberships
              </a>
              <a href="#transformations" className="hover:text-white transition-colors">
                Transformations
              </a>
              <a href="#trainers" className="hover:text-white transition-colors">
                Trainers
              </a>
              <a href="#faq" className="hover:text-white transition-colors">
                FAQ
              </a>
              <a href="#contact" className="hover:text-white transition-colors">
                Contact
              </a>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#71717A]">
            <div>
              © {new Date().getFullYear()} {settings.gymName}. All rights reserved.
            </div>

            <div className="flex flex-wrap items-center gap-5">
              <button
                type="button"
                onClick={() => setBookingsManagerOpen(true)}
                className="text-[#A1A1AA] hover:text-[#C8FF00] transition-colors cursor-pointer"
              >
                Manage Saved Bookings
              </button>
              <button
                type="button"
                onClick={() => setOwnerSettingsOpen(true)}
                className="text-[#A1A1AA] hover:text-[#C8FF00] transition-colors cursor-pointer"
              >
                Customize Placeholders & Pricing
              </button>
              <a
                href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#A1A1AA] hover:text-white transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#C8FF00]" aria-hidden="true" />
                <span>WhatsApp Desk</span>
              </a>
              <a
                href={settings.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#A1A1AA] hover:text-white transition-colors"
              >
                Instagram
              </a>
              <a
                href={settings.socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#A1A1AA] hover:text-white transition-colors"
              >
                YouTube
              </a>
              <a
                href={settings.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#A1A1AA] hover:text-white transition-colors"
              >
                Facebook
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Program Details Modal */}
      <ProgramModal
        program={selectedProgram}
        whatsappNumber={settings.whatsappNumber}
        onClose={() => setSelectedProgram(null)}
        onBookProgramTrial={(programTitle) =>
          scrollToBookingWithIntent('trial', programTitle)
        }
      />

      {/* Owner Customization Drawer for Editable Placeholders */}
      <OwnerSettingsDrawer
        isOpen={ownerSettingsOpen}
        settings={settings}
        onClose={() => setOwnerSettingsOpen(false)}
        onSave={handleSaveSettings}
        onReset={handleResetSettings}
      />

      {/* Bookings & Appointments Manager Drawer (Supabase) */}
      <BookingsManagerDrawer
        isOpen={bookingsManagerOpen}
        onClose={() => setBookingsManagerOpen(false)}
      />
    </div>
  );
}
