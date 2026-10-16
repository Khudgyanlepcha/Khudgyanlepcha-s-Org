import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  gymName: string;
  onBookTrialClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ gymName, onBookTrialClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Programs', href: '#programs' },
    { label: 'Memberships', href: '#memberships' },
    { label: 'Transformations', href: '#transformations' },
    { label: 'Trainers', href: '#trainers' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleMobileNav = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 h-16 bg-[#09090B]/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-[1280px] mx-auto h-full flex items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#top"
          className="font-display text-2xl font-bold tracking-tight text-white whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C8FF00]"
        >
          {gymName}
        </a>

        {/* Zone 2: 5 concise single-line text navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#A1A1AA]"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-white transition-colors duration-150 underline-offset-8 hover:underline whitespace-nowrap shrink-0 py-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C8FF00]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary action (plus mobile menu toggle on small screens) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onBookTrialClick}
            className="px-4 py-2 text-xs sm:text-sm font-semibold text-[#09090B] bg-[#C8FF00] hover:bg-[#d4ff33] active:scale-[0.99] transition-all duration-150 rounded-md whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8FF00]"
          >
            Book Free Trial
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-md text-[#E4E4E7] hover:text-white hover:bg-white/5 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#C8FF00]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0F0F12] border-b border-white/10 px-4 pt-3 pb-6 space-y-3">
          <nav aria-label="Mobile Navigation" className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleMobileNav}
                className="px-3 py-2.5 text-base font-medium text-[#E4E4E7] hover:text-[#C8FF00] hover:bg-white/5 rounded-md transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#about"
              onClick={handleMobileNav}
              className="px-3 py-2.5 text-base font-medium text-[#E4E4E7] hover:text-[#C8FF00] hover:bg-white/5 rounded-md transition-colors"
            >
              About Us
            </a>
            <a
              href="#faq"
              onClick={handleMobileNav}
              className="px-3 py-2.5 text-base font-medium text-[#E4E4E7] hover:text-[#C8FF00] hover:bg-white/5 rounded-md transition-colors"
            >
              FAQ
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};
