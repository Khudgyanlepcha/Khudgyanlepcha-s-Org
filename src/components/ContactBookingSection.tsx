import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Phone,
  Clock,
  MessageCircle,
  Mail,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Calendar,
  Settings,
  ClipboardList,
  Loader2,
} from 'lucide-react';
import { BusinessSettings, TRAINING_PROGRAMS } from '../data/gymData';
import { createBookingAppointment } from '../lib/supabase';

interface ContactBookingSectionProps {
  settings: BusinessSettings;
  preselectedIntent: {
    type: 'trial' | 'membership' | 'contact';
    planOrProgram: string;
  };
  onOpenOwnerSettings: () => void;
  onOpenBookingsManager: () => void;
}

interface BookingSubmission {
  referenceId: string;
  fullName: string;
  phone: string;
  email: string;
  inquiryType: 'trial' | 'membership' | 'contact';
  planOrProgram: string;
  preferredDate: string;
  preferredTimeSlot: string;
  goalNotes: string;
  submittedAt: string;
  savedToSupabase: boolean;
  needsTableSetup: boolean;
}

export const ContactBookingSection: React.FC<ContactBookingSectionProps> = ({
  settings,
  preselectedIntent,
  onOpenOwnerSettings,
  onOpenBookingsManager,
}) => {
  const [inquiryType, setInquiryType] = useState<'trial' | 'membership' | 'contact'>(
    preselectedIntent.type
  );
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [planOrProgram, setPlanOrProgram] = useState(preselectedIntent.planOrProgram);
  const [preferredDate, setPreferredDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [preferredTimeSlot, setPreferredTimeSlot] = useState('Morning (06:00 AM – 10:00 AM)');
  const [goalNotes, setGoalNotes] = useState('');

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submission, setSubmission] = useState<BookingSubmission | null>(null);
  const [copiedWhatsApp, setCopiedWhatsApp] = useState(false);

  useEffect(() => {
    setInquiryType(preselectedIntent.type);
    if (preselectedIntent.planOrProgram) {
      setPlanOrProgram(preselectedIntent.planOrProgram);
    }
  }, [preselectedIntent]);

  const validateForm = () => {
    const nextErrors: { [key: string]: string } = {};

    if (!fullName.trim() || fullName.trim().length < 2) {
      nextErrors.fullName = 'Please enter your full name.';
    }

    const cleanedPhone = phone.replace(/[\s\-()]/g, '');
    if (!cleanedPhone || !/^\+?[0-9]{8,15}$/.test(cleanedPhone)) {
      nextErrors.phone = 'Please enter a valid 10-digit phone or WhatsApp number.';
    }

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }

    if (inquiryType !== 'contact' && !preferredDate) {
      nextErrors.preferredDate = 'Please select your preferred visit date.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    const refCode = `KG-${Math.floor(100000 + Math.random() * 900000)}`;

    const result = await createBookingAppointment({
      reference_id: refCode,
      full_name: fullName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      inquiry_type: inquiryType,
      plan_or_program: planOrProgram,
      preferred_date: preferredDate,
      preferred_time_slot: preferredTimeSlot,
      goal_notes: goalNotes.trim(),
    });

    const record: BookingSubmission = {
      referenceId: refCode,
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      inquiryType,
      planOrProgram,
      preferredDate,
      preferredTimeSlot,
      goalNotes: goalNotes.trim(),
      submittedAt: new Date().toLocaleString(),
      savedToSupabase: result.savedToSupabase,
      needsTableSetup: result.needsTableSetup,
    };

    setIsSubmitting(false);
    setSubmission(record);
  };

  const buildWhatsAppMessage = () => {
    if (submission) {
      const typeLabel =
        submission.inquiryType === 'trial'
          ? 'Free 1-Day Trial Visit'
          : submission.inquiryType === 'membership'
          ? 'Membership Inquiry'
          : 'General Gym Inquiry';
      return [
        `Hello ${settings.gymName}!`,
        `Inquiry Reference: ${submission.referenceId}`,
        `Type: ${typeLabel}`,
        `Name: ${submission.fullName}`,
        `Phone: ${submission.phone}`,
        `Selected Program/Plan: ${submission.planOrProgram}`,
        `Preferred Visit: ${submission.preferredDate} (${submission.preferredTimeSlot})`,
        submission.goalNotes ? `Fitness Goals: ${submission.goalNotes}` : '',
      ]
        .filter(Boolean)
        .join('\n');
    }

    return `Hello ${settings.gymName}! I would like to inquire about ${
      planOrProgram || 'membership plans and booking a free trial visit'
    }.`;
  };

  const whatsappDirectUrl = `https://wa.me/${settings.whatsappNumber.replace(
    /[^0-9]/g,
    ''
  )}?text=${encodeURIComponent(buildWhatsAppMessage())}`;

  const handleCopyMessage = () => {
    navigator.clipboard?.writeText(buildWhatsAppMessage());
    setCopiedWhatsApp(true);
    setTimeout(() => setCopiedWhatsApp(false), 2000);
  };

  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
    settings.mapQuery || settings.address
  )}&t=&z=14&ie=UTF8&iwloc=&output=embed`;

  return (
    <section
      id="contact"
      className="py-20 sm:py-24 bg-[#09090B] border-t border-white/10"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="text-xs font-medium text-[#C8FF00] tracking-wide mb-2">
              Start Training · Book Your Complimentary Trial Visit
            </div>
            <h2
              id="contact-heading"
              className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight text-balance"
            >
              Visit KhudGyan Gym or Book a Free Trial
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#A1A1AA] leading-relaxed">
              Reserve a free 1-day trial pass, inquire about membership tiers, or message our
              coaching desk directly on WhatsApp. All appointment bookings are saved for our front
              desk team.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start md:self-auto shrink-0">
            <button
              type="button"
              onClick={onOpenBookingsManager}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#09090B] bg-[#C8FF00] hover:bg-[#d4ff33] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <ClipboardList className="w-3.5 h-3.5" aria-hidden="true" />
              <span>View Saved Bookings</span>
            </button>

            <button
              type="button"
              onClick={onOpenOwnerSettings}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-white bg-[#141418] hover:bg-white/10 border border-white/15 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Settings className="w-3.5 h-3.5 text-[#C8FF00]" aria-hidden="true" />
              <span>Edit Contact & Location</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Booking & Inquiry Form */}
          <div className="lg:col-span-7 bg-[#121215] border border-white/10 rounded-xl p-6 sm:p-8">
            {/* Inquiry Mode Tabs */}
            <div className="flex flex-wrap items-center gap-1 p-1 bg-[#09090B] border border-white/10 rounded-lg mb-6">
              <button
                type="button"
                onClick={() => {
                  setInquiryType('trial');
                  setSubmission(null);
                }}
                className={`flex-1 px-3 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  inquiryType === 'trial'
                    ? 'bg-[#C8FF00] text-[#09090B] font-semibold'
                    : 'text-[#A1A1AA] hover:text-white'
                }`}
              >
                Book Free Trial Visit
              </button>
              <button
                type="button"
                onClick={() => {
                  setInquiryType('membership');
                  setSubmission(null);
                }}
                className={`flex-1 px-3 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  inquiryType === 'membership'
                    ? 'bg-[#C8FF00] text-[#09090B] font-semibold'
                    : 'text-[#A1A1AA] hover:text-white'
                }`}
              >
                Membership Inquiry
              </button>
              <button
                type="button"
                onClick={() => {
                  setInquiryType('contact');
                  setSubmission(null);
                }}
                className={`flex-1 px-3 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  inquiryType === 'contact'
                    ? 'bg-[#C8FF00] text-[#09090B] font-semibold'
                    : 'text-[#A1A1AA] hover:text-white'
                }`}
              >
                General Message
              </button>
            </div>

            {submission ? (
              <div className="space-y-6 py-4" role="status" aria-live="polite">
                <div className="p-5 rounded-lg bg-[#C8FF00]/10 border border-[#C8FF00]/40 space-y-2">
                  <div className="flex items-center gap-2 text-[#C8FF00] font-semibold text-sm">
                    <CheckCircle2 className="w-5 h-5 shrink-0" aria-hidden="true" />
                    <span>
                      {submission.savedToSupabase
                        ? 'Appointment Saved to Supabase Database'
                        : 'Appointment Logged & Ready to Sync'}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#E4E4E7]">
                    Thank you, <strong>{submission.fullName}</strong>. Your appointment reference is{' '}
                    <span className="font-mono text-[#C8FF00] font-semibold">
                      {submission.referenceId}
                    </span>
                    .{' '}
                    {submission.savedToSupabase
                      ? 'Your booking details have been stored directly in the KhudGyan Gym Supabase database.'
                      : 'Your booking is recorded. Click "View Saved Bookings" above if you need to initialize the bookings table in your Supabase SQL Editor.'}
                  </p>
                </div>

                <div className="bg-[#09090B] border border-white/10 rounded-lg p-5 space-y-2.5 text-xs sm:text-sm">
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-[#A1A1AA]">Selected Track / Plan:</span>
                    <span className="text-white font-medium">{submission.planOrProgram}</span>
                  </div>
                  {submission.inquiryType !== 'contact' && (
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-[#A1A1AA]">Preferred Visit Window:</span>
                      <span className="text-white font-mono tabular-nums">
                        {submission.preferredDate} · {submission.preferredTimeSlot}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-[#A1A1AA]">Contact Number:</span>
                    <span className="text-white font-mono tabular-nums">{submission.phone}</span>
                  </div>
                  {submission.goalNotes && (
                    <div className="pt-1">
                      <span className="text-[#A1A1AA] block mb-1">Notes / Fitness Goals:</span>
                      <p className="text-[#D4D4D8]">{submission.goalNotes}</p>
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <a
                    href={whatsappDirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold text-[#09090B] bg-[#C8FF00] hover:bg-[#d4ff33] rounded-md transition-colors whitespace-nowrap"
                  >
                    <MessageCircle className="w-4 h-4" aria-hidden="true" />
                    <span>Send Instant Confirmation via WhatsApp</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyMessage}
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 text-xs sm:text-sm font-medium text-white bg-white/5 hover:bg-white/10 border border-white/15 rounded-md transition-colors cursor-pointer whitespace-nowrap"
                  >
                    {copiedWhatsApp ? (
                      <>
                        <Check className="w-4 h-4 text-[#C8FF00]" />
                        <span>Copied Summary</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-[#A1A1AA]" />
                        <span>Copy Summary</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setSubmission(null)}
                    className="text-xs text-[#A1A1AA] hover:text-white underline cursor-pointer"
                  >
                    Book another appointment
                  </button>

                  <button
                    type="button"
                    onClick={onOpenBookingsManager}
                    className="text-xs text-[#C8FF00] hover:underline cursor-pointer"
                  >
                    Open Saved Bookings Manager →
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="booking-fullname"
                      className="block text-xs font-medium text-[#E4E4E7] mb-1.5"
                    >
                      Full Name *
                    </label>
                    <input
                      id="booking-fullname"
                      type="text"
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        if (errors.fullName) setErrors({ ...errors, fullName: '' });
                      }}
                      placeholder="e.g. Aarav Subba"
                      className="w-full px-3.5 py-2.5 text-sm bg-[#09090B] border border-white/15 rounded-md text-white placeholder-[#71717A] focus:outline-none focus:border-[#C8FF00]"
                    />
                    {errors.fullName && (
                      <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.fullName}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="booking-phone"
                      className="block text-xs font-medium text-[#E4E4E7] mb-1.5"
                    >
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      id="booking-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (errors.phone) setErrors({ ...errors, phone: '' });
                      }}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2.5 text-sm bg-[#09090B] border border-white/15 rounded-md text-white font-mono placeholder-[#71717A] focus:outline-none focus:border-[#C8FF00]"
                    />
                    {errors.phone && (
                      <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.phone}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="booking-email"
                      className="block text-xs font-medium text-[#E4E4E7] mb-1.5"
                    >
                      Email Address *
                    </label>
                    <input
                      id="booking-email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors({ ...errors, email: '' });
                      }}
                      placeholder="you@example.com"
                      className="w-full px-3.5 py-2.5 text-sm bg-[#09090B] border border-white/15 rounded-md text-white placeholder-[#71717A] focus:outline-none focus:border-[#C8FF00]"
                    />
                    {errors.email && (
                      <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="booking-program"
                      className="block text-xs font-medium text-[#E4E4E7] mb-1.5"
                    >
                      Program or Membership Tier
                    </label>
                    <select
                      id="booking-program"
                      value={planOrProgram}
                      onChange={(e) => setPlanOrProgram(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-[#09090B] border border-white/15 rounded-md text-white focus:outline-none focus:border-[#C8FF00]"
                    >
                      <optgroup label="Membership Plans">
                        <option value="Pro Membership (Gym + Group Training)">
                          Pro Membership (Gym + Group Training)
                        </option>
                        <option value="Basic Membership (Essential Gym Access)">
                          Basic Membership (Essential Gym Access)
                        </option>
                        <option value="Elite Membership (Premium + Personal Training)">
                          Elite Membership (Premium + Personal Training)
                        </option>
                      </optgroup>
                      <optgroup label="Training Programs">
                        {TRAINING_PROGRAMS.map((p) => (
                          <option key={p.id} value={p.title}>
                            {p.title}
                          </option>
                        ))}
                      </optgroup>
                    </select>
                  </div>
                </div>

                {inquiryType !== 'contact' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="booking-date"
                        className="block text-xs font-medium text-[#E4E4E7] mb-1.5"
                      >
                        Preferred Trial / Visit Date *
                      </label>
                      <input
                        id="booking-date"
                        type="date"
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-[#09090B] border border-white/15 rounded-md text-white font-mono focus:outline-none focus:border-[#C8FF00]"
                      />
                      {errors.preferredDate && (
                        <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.preferredDate}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="booking-slot"
                        className="block text-xs font-medium text-[#E4E4E7] mb-1.5"
                      >
                        Preferred Time Window
                      </label>
                      <select
                        id="booking-slot"
                        value={preferredTimeSlot}
                        onChange={(e) => setPreferredTimeSlot(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-[#09090B] border border-white/15 rounded-md text-white focus:outline-none focus:border-[#C8FF00]"
                      >
                        <option value="Early Morning (05:30 AM – 08:30 AM)">
                          Early Morning (05:30 AM – 08:30 AM)
                        </option>
                        <option value="Mid-Morning (08:30 AM – 12:00 PM)">
                          Mid-Morning (08:30 AM – 12:00 PM)
                        </option>
                        <option value="Afternoon (12:00 PM – 05:00 PM)">
                          Afternoon (12:00 PM – 05:00 PM)
                        </option>
                        <option value="Evening Peak (05:00 PM – 08:30 PM)">
                          Evening Peak (05:00 PM – 08:30 PM)
                        </option>
                        <option value="Late Evening (08:30 PM – 10:30 PM)">
                          Late Evening (08:30 PM – 10:30 PM)
                        </option>
                      </select>
                    </div>
                  </div>
                )}

                <div>
                  <label
                    htmlFor="booking-goals"
                    className="block text-xs font-medium text-[#E4E4E7] mb-1.5"
                  >
                    Fitness Goals, Experience Level, or Questions (Optional)
                  </label>
                  <textarea
                    id="booking-goals"
                    rows={3}
                    value={goalNotes}
                    onChange={(e) => setGoalNotes(e.target.value)}
                    placeholder="Tell us about your primary goal (e.g., strength building, fat loss, beginner onboarding, or any past injuries our coaches should know about)..."
                    className="w-full px-3.5 py-2.5 text-sm bg-[#09090B] border border-white/15 rounded-md text-white placeholder-[#71717A] focus:outline-none focus:border-[#C8FF00]"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-[#09090B] bg-[#C8FF00] hover:bg-[#d4ff33] disabled:opacity-60 rounded-md transition-colors cursor-pointer whitespace-nowrap"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                        <span>Saving Appointment...</span>
                      </>
                    ) : (
                      <>
                        <Calendar className="w-4 h-4" aria-hidden="true" />
                        <span>
                          {inquiryType === 'trial'
                            ? 'Reserve Free 1-Day Trial Pass'
                            : inquiryType === 'membership'
                            ? 'Request Membership Consultation'
                            : 'Send Message to KhudGyan Gym'}
                        </span>
                      </>
                    )}
                  </button>

                  <a
                    href={whatsappDirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-3.5 text-xs sm:text-sm font-medium text-white bg-white/5 hover:bg-white/10 border border-white/15 rounded-md transition-colors whitespace-nowrap"
                  >
                    <MessageCircle className="w-4 h-4 text-[#C8FF00]" aria-hidden="true" />
                    <span>Direct WhatsApp Inquiry</span>
                  </a>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Gym Contact Details & Google Maps Embed */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#121215] border border-white/10 rounded-xl p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="font-display text-2xl font-bold text-white">
                  Facility Location & Hours
                </h3>
                <button
                  type="button"
                  onClick={onOpenOwnerSettings}
                  className="text-xs text-[#C8FF00] hover:underline cursor-pointer"
                >
                  Edit Details
                </button>
              </div>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#C8FF00] shrink-0 mt-1" aria-hidden="true" />
                  <div>
                    <div className="font-medium text-white">Gym Address</div>
                    <div className="text-[#A1A1AA] text-xs sm:text-sm mt-0.5">
                      {settings.address}
                    </div>
                    <div className="text-xs text-[#71717A] mt-0.5">{settings.cityRegion}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#C8FF00] shrink-0 mt-1" aria-hidden="true" />
                  <div>
                    <div className="font-medium text-white">Front Desk & Coaching Line</div>
                    <a
                      href={`tel:${settings.phoneDial}`}
                      className="font-mono text-xs sm:text-sm text-[#E4E4E7] hover:text-[#C8FF00] transition-colors mt-0.5 inline-block tabular-nums"
                    >
                      {settings.phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#C8FF00] shrink-0 mt-1" aria-hidden="true" />
                  <div>
                    <div className="font-medium text-white">Email Desk</div>
                    <a
                      href={`mailto:${settings.email}`}
                      className="text-xs sm:text-sm text-[#A1A1AA] hover:text-white transition-colors mt-0.5 inline-block"
                    >
                      {settings.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#C8FF00] shrink-0 mt-1" aria-hidden="true" />
                  <div>
                    <div className="font-medium text-white">Operating Hours</div>
                    <div className="text-xs sm:text-sm text-[#A1A1AA] font-mono tabular-nums mt-0.5">
                      {settings.weekdayHours}
                    </div>
                    <div className="text-xs sm:text-sm text-[#A1A1AA] font-mono tabular-nums">
                      {settings.sundayHours}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={whatsappDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold text-[#09090B] bg-[#C8FF00] hover:bg-[#d4ff33] rounded-md transition-colors whitespace-nowrap"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  <span>Chat with KhudGyan Gym on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Responsive Google Maps Embed */}
            <div className="bg-[#121215] border border-white/10 rounded-xl overflow-hidden">
              <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between text-xs text-[#A1A1AA]">
                <span>Interactive Map ({settings.mapQuery})</span>
                <button
                  type="button"
                  onClick={onOpenOwnerSettings}
                  className="text-[#C8FF00] hover:underline cursor-pointer"
                >
                  Change Map Pin
                </button>
              </div>
              <div className="w-full h-64 bg-[#09090B]">
                <iframe
                  title="KhudGyan Gym Location Map"
                  src={mapEmbedUrl}
                  className="w-full h-full border-0 filter grayscale contrast-125 opacity-90 hover:filter-none hover:opacity-100 transition-all duration-300"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
