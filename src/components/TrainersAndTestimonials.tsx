import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Edit3, Plus, Check } from 'lucide-react';
import {
  TRAINERS,
  INITIAL_TESTIMONIALS,
  TrainerProfile,
  TestimonialItem,
} from '../data/gymData';
import { ResilientImage } from './ResilientImage';

interface TrainersAndTestimonialsProps {
  onSelectTrainer: (trainerName: string) => void;
}

export const TrainersAndTestimonials: React.FC<TrainersAndTestimonialsProps> = ({
  onSelectTrainer,
}) => {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(INITIAL_TESTIMONIALS);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedTrainerModal, setSelectedTrainerModal] = useState<TrainerProfile | null>(null);
  const [isEditingStory, setIsEditingStory] = useState(false);

  // Editable form state for current slide
  const activeTestimonial = testimonials[currentSlide] || testimonials[0];
  const [draftName, setDraftName] = useState(activeTestimonial.memberName);
  const [draftRole, setDraftRole] = useState(activeTestimonial.memberRole);
  const [draftQuote, setDraftQuote] = useState(activeTestimonial.quote);
  const [draftOutcome, setDraftOutcome] = useState(activeTestimonial.outcomeHighlight);

  const handleOpenEditStory = () => {
    setDraftName(activeTestimonial.memberName);
    setDraftRole(activeTestimonial.memberRole);
    setDraftQuote(activeTestimonial.quote);
    setDraftOutcome(activeTestimonial.outcomeHighlight);
    setIsEditingStory(true);
  };

  const handleSaveStory = (e: React.FormEvent) => {
    e.preventDefault();
    setTestimonials((prev) =>
      prev.map((item, idx) =>
        idx === currentSlide
          ? {
              ...item,
              memberName: draftName.trim() || item.memberName,
              memberRole: draftRole.trim() || item.memberRole,
              quote: draftQuote.trim() || item.quote,
              outcomeHighlight: draftOutcome.trim() || item.outcomeHighlight,
              isPlaceholder: false,
            }
          : item
      )
    );
    setIsEditingStory(false);
  };

  const handleAddVerifiedStory = () => {
    const newStory: TestimonialItem = {
      id: `journey-${Date.now()}`,
      memberName: 'New Verified Member Name',
      memberRole: 'Strength & Conditioning Member',
      programTag: 'Strength Training',
      durationTag: '12 Weeks at KhudGyan Gym',
      quote:
        'Enter the verified member review here with their concrete starting point, training experience, and achieved outcome.',
      outcomeHighlight: 'Measurable strength and consistency milestone achieved',
      isPlaceholder: true,
    };
    const nextIdx = testimonials.length;
    setTestimonials((prev) => [...prev, newStory]);
    setCurrentSlide(nextIdx);
    setDraftName(newStory.memberName);
    setDraftRole(newStory.memberRole);
    setDraftQuote(newStory.quote);
    setDraftOutcome(newStory.outcomeHighlight);
    setIsEditingStory(true);
  };

  const nextSlide = () => {
    setIsEditingStory(false);
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setIsEditingStory(false);
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <>
      {/* MEET OUR TRAINERS SECTION */}
      <section
        id="trainers"
        className="py-20 sm:py-24 bg-[#0D0D10] border-t border-white/10"
        aria-labelledby="trainers-heading"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <div className="text-xs font-medium text-[#C8FF00] tracking-wide mb-2">
              Certified Coaching Team · Biomechanics & Strength
            </div>
            <h2
              id="trainers-heading"
              className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight text-balance"
            >
              Meet Our Trainers
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#A1A1AA] leading-relaxed">
              Every coach on the KhudGyan Gym floor is selected for technical mastery, teaching
              clarity, and dedication to safe, long-term progression.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TRAINERS.map((trainer, index) => (
              <article
                key={trainer.id}
                className="bg-[#131317] border border-white/10 rounded-xl overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-64 overflow-hidden bg-[#09090B]">
                    <ResilientImage
                      src={trainer.image}
                      alt={trainer.name}
                      fallbackTitle={trainer.name}
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-200"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#131317] via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-5 right-5 flex items-center gap-2 text-xs text-[#C8FF00] font-medium">
                      <span>0{index + 1}</span>
                      <span aria-hidden="true">·</span>
                      <span>{trainer.experience}</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-display text-2xl font-bold text-white tracking-tight">
                      {trainer.name}
                    </h3>
                    <p className="text-xs font-medium text-[#E4E4E7] mt-0.5">{trainer.role}</p>

                    <div className="mt-3 text-xs text-[#A1A1AA]">
                      {trainer.specialization}
                    </div>

                    <p className="mt-4 text-sm text-[#A1A1AA] leading-relaxed">
                      {trainer.bio}
                    </p>

                    <div className="mt-4 pt-4 border-t border-white/10 text-xs text-[#A1A1AA] space-y-1">
                      <div>
                        <span className="text-white font-medium">Credentials: </span>
                        {trainer.certifications}
                      </div>
                      <div>
                        <span className="text-white font-medium">Floor Hours: </span>
                        {trainer.availability}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => onSelectTrainer(trainer.name)}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#09090B] bg-[#C8FF00] hover:bg-[#d4ff33] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Book Session</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedTrainerModal(trainer)}
                    className="px-3.5 py-2.5 text-xs font-medium text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Coaching Bio
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Trainer Bio Modal */}
      {selectedTrainerModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedTrainerModal(null)}
        >
          <div
            className="w-full max-w-lg bg-[#141418] border border-white/15 rounded-xl p-6 sm:p-8 space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs text-[#C8FF00] font-medium">
                  {selectedTrainerModal.role} · {selectedTrainerModal.experience}
                </div>
                <h3 className="font-display text-3xl font-bold text-white mt-1">
                  {selectedTrainerModal.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedTrainerModal(null)}
                className="px-3 py-1.5 text-xs text-[#A1A1AA] hover:text-white bg-white/5 rounded-md cursor-pointer"
              >
                Close
              </button>
            </div>

            <p className="text-sm text-[#D4D4D8] leading-relaxed">{selectedTrainerModal.bio}</p>

            <div className="p-4 rounded-lg bg-[#09090B] border border-white/10 space-y-2">
              <div className="text-xs font-semibold text-white">Coaching Philosophy</div>
              <p className="text-xs sm:text-sm text-[#A1A1AA] italic">
                "{selectedTrainerModal.philosophy}"
              </p>
            </div>

            <div className="text-xs text-[#A1A1AA] space-y-1.5">
              <div>
                <strong className="text-white">Specializations:</strong>{' '}
                {selectedTrainerModal.specialization}
              </div>
              <div>
                <strong className="text-white">Certifications:</strong>{' '}
                {selectedTrainerModal.certifications}
              </div>
              <div>
                <strong className="text-white">Coaching Schedule:</strong>{' '}
                {selectedTrainerModal.availability}
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  const name = selectedTrainerModal.name;
                  setSelectedTrainerModal(null);
                  onSelectTrainer(name);
                }}
                className="px-5 py-2.5 text-xs font-semibold text-[#09090B] bg-[#C8FF00] hover:bg-[#d4ff33] rounded-md transition-colors cursor-pointer"
              >
                Request Trial Session with Coach
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TESTIMONIALS & MEMBER JOURNEYS CAROUSEL */}
      <section
        id="testimonials"
        className="py-20 sm:py-24 bg-[#09090B] border-t border-white/10"
        aria-labelledby="testimonials-heading"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <div className="text-xs font-medium text-[#C8FF00] tracking-wide mb-2">
                Member Journeys · Editable Review Templates
              </div>
              <h2
                id="testimonials-heading"
                className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight text-balance"
              >
                Member Stories & Fitness Journeys
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#A1A1AA] leading-relaxed">
                Structured member journey templates ready for verified KhudGyan Gym member quotes.
                Use the editor controls below to customize or add authorized reviews.
              </p>
            </div>

            {/* Carousel Controls */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleOpenEditStory}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-white bg-white/5 hover:bg-white/10 border border-white/15 rounded-md transition-colors cursor-pointer whitespace-nowrap"
              >
                <Edit3 className="w-3.5 h-3.5 text-[#C8FF00]" aria-hidden="true" />
                <span>Edit Current Story</span>
              </button>
              <button
                type="button"
                onClick={handleAddVerifiedStory}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-white bg-white/5 hover:bg-white/10 border border-white/15 rounded-md transition-colors cursor-pointer whitespace-nowrap"
              >
                <Plus className="w-3.5 h-3.5 text-[#C8FF00]" aria-hidden="true" />
                <span>Add Story</span>
              </button>
              <button
                type="button"
                onClick={prevSlide}
                aria-label="Previous member story"
                className="w-10 h-10 rounded-md bg-[#141418] hover:bg-white/10 border border-white/10 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next member story"
                className="w-10 h-10 rounded-md bg-[#141418] hover:bg-white/10 border border-white/10 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Active Carousel Card */}
          <div className="bg-[#121215] border border-white/10 rounded-xl p-6 sm:p-10">
            {isEditingStory ? (
              <form onSubmit={handleSaveStory} className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <h3 className="text-sm font-semibold text-white">
                    Customize Member Story Slot #{currentSlide + 1}
                  </h3>
                  <span className="text-xs text-[#A1A1AA]">
                    Replace placeholder with verified member feedback
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-[#A1A1AA] mb-1">Member Name</label>
                    <input
                      type="text"
                      value={draftName}
                      onChange={(e) => setDraftName(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-[#09090B] border border-white/15 rounded-md text-white focus:outline-none focus:border-[#C8FF00]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#A1A1AA] mb-1">
                      Program / Training Batch
                    </label>
                    <input
                      type="text"
                      value={draftRole}
                      onChange={(e) => setDraftRole(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-[#09090B] border border-white/15 rounded-md text-white focus:outline-none focus:border-[#C8FF00]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-[#A1A1AA] mb-1">Member Quote</label>
                  <textarea
                    rows={3}
                    value={draftQuote}
                    onChange={(e) => setDraftQuote(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-[#09090B] border border-white/15 rounded-md text-white focus:outline-none focus:border-[#C8FF00]"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#A1A1AA] mb-1">
                    Key Outcome / Milestone Achieved
                  </label>
                  <input
                    type="text"
                    value={draftOutcome}
                    onChange={(e) => setDraftOutcome(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-[#09090B] border border-white/15 rounded-md text-white focus:outline-none focus:border-[#C8FF00]"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsEditingStory(false)}
                    className="px-4 py-2 text-xs font-medium text-[#A1A1AA] hover:text-white bg-white/5 rounded-md cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#09090B] bg-[#C8FF00] hover:bg-[#d4ff33] rounded-md cursor-pointer"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Save Story</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 space-y-5">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[#A1A1AA]">
                    <span className="font-mono text-[#C8FF00] tabular-nums">
                      Story 0{currentSlide + 1} / 0{testimonials.length}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{activeTestimonial.programTag}</span>
                    <span aria-hidden="true">·</span>
                    <span>{activeTestimonial.durationTag}</span>
                  </div>

                  <blockquote className="text-lg sm:text-2xl font-medium text-white leading-relaxed">
                    "{activeTestimonial.quote}"
                  </blockquote>

                  <div>
                    <div className="font-display text-xl font-bold text-white">
                      {activeTestimonial.memberName}
                    </div>
                    <div className="text-xs text-[#A1A1AA] mt-0.5">
                      {activeTestimonial.memberRole}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4 bg-[#09090B] border border-white/10 rounded-lg p-6 space-y-3">
                  <div className="text-xs font-medium text-[#C8FF00]">
                    Documented Training Outcome
                  </div>
                  <p className="text-sm sm:text-base font-semibold text-white leading-snug">
                    {activeTestimonial.outcomeHighlight}
                  </p>
                  <p className="text-[11px] text-[#A1A1AA] pt-2 border-t border-white/10">
                    {activeTestimonial.isPlaceholder
                      ? 'Template placeholder — Click "Edit Current Story" above to insert an authorized member quote.'
                      : 'Customized member story saved on this device.'}
                  </p>
                </div>
              </div>
            )}

            {/* Slide Indicators */}
            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {testimonials.map((item, idx) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setIsEditingStory(false);
                      setCurrentSlide(idx);
                    }}
                    aria-label={`Go to story ${idx + 1}`}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      idx === currentSlide
                        ? 'w-8 bg-[#C8FF00]'
                        : 'w-2 bg-white/20 hover:bg-white/40'
                    }`}
                  />
                ))}
              </div>

              <span className="font-mono text-xs text-[#A1A1AA] tabular-nums">
                {currentSlide + 1} of {testimonials.length}
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
