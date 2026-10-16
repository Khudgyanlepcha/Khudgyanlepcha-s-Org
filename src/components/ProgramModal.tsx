import React, { useEffect } from 'react';
import { X, Check, Calendar, MessageCircle } from 'lucide-react';
import { TrainingProgram } from '../data/gymData';
import { ResilientImage } from './ResilientImage';

interface ProgramModalProps {
  program: TrainingProgram | null;
  whatsappNumber: string;
  onClose: () => void;
  onBookProgramTrial: (programTitle: string) => void;
}

export const ProgramModal: React.FC<ProgramModalProps> = ({
  program,
  whatsappNumber,
  onClose,
  onBookProgramTrial,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (program) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [program, onClose]);

  if (!program) return null;

  const whatsappText = encodeURIComponent(
    `Hello KhudGyan Gym! I would like to learn more about the ${program.title} program and book a trial session.`
  );
  const whatsappHref = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${whatsappText}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-program-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-[#121215] border border-white/15 rounded-xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Image Banner */}
        <div className="relative h-56 sm:h-64 w-full overflow-hidden">
          <ResilientImage
            src={program.image}
            alt={program.imageAlt}
            fallbackTitle={program.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121215] via-[#121215]/60 to-transparent" />

          <button
            type="button"
            onClick={onClose}
            aria-label="Close program details"
            className="absolute top-4 right-4 w-10 h-10 rounded-lg bg-black/70 text-white hover:bg-black hover:text-[#C8FF00] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6">
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#C8FF00] font-medium mb-1">
              <span>{program.index}. {program.categoryLabel}</span>
              <span aria-hidden="true">·</span>
              <span>{program.duration}</span>
              <span aria-hidden="true">·</span>
              <span>{program.frequency}</span>
              <span aria-hidden="true">·</span>
              <span>{program.level}</span>
            </div>
            <h2
              id="modal-program-title"
              className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight"
            >
              {program.title}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
          <p className="text-sm sm:text-base text-[#D4D4D8] leading-relaxed">
            {program.fullOverview}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-white/10">
            {/* Target Outcomes */}
            <div>
              <h3 className="text-sm font-semibold text-white mb-3">
                Key Training Outcomes
              </h3>
              <ul className="space-y-2.5">
                {program.targetOutcomes.map((outcome, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-[#A1A1AA]">
                    <Check className="w-4 h-4 text-[#C8FF00] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>

              <h3 className="text-sm font-semibold text-white mt-6 mb-2.5">
                Dedicated Facility & Equipment
              </h3>
              <ul className="space-y-1.5 text-xs text-[#A1A1AA]">
                {program.equipmentUsed.map((eq, idx) => (
                  <li key={idx}>• {eq}</li>
                ))}
              </ul>
            </div>

            {/* Weekly Split / Curriculum */}
            <div className="bg-[#18181C] border border-white/10 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-white mb-3">
                Sample Weekly Structure
              </h3>
              <div className="space-y-2.5">
                {program.weeklyStructure.map((item, idx) => (
                  <div
                    key={idx}
                    className="pb-2.5 border-b border-white/5 last:border-b-0 last:pb-0"
                  >
                    <div className="font-mono text-xs text-[#C8FF00] tabular-nums">
                      {item.day}
                    </div>
                    <div className="text-xs sm:text-sm text-[#E4E4E7] mt-0.5">
                      {item.focus}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => {
                onBookProgramTrial(program.title);
                onClose();
              }}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-[#09090B] bg-[#C8FF00] hover:bg-[#d4ff33] rounded-md transition-colors cursor-pointer whitespace-nowrap"
            >
              <Calendar className="w-4 h-4" aria-hidden="true" />
              <span>Book Free Trial for {program.title}</span>
            </button>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-white bg-white/5 hover:bg-white/10 border border-white/15 rounded-md transition-colors whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4 text-[#C8FF00]" aria-hidden="true" />
              <span>Ask a Coach on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
