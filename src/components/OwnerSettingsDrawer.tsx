import React, { useState, useEffect } from 'react';
import { X, RotateCcw, Check } from 'lucide-react';
import { BusinessSettings, DEFAULT_BUSINESS_SETTINGS } from '../data/gymData';

interface OwnerSettingsDrawerProps {
  isOpen: boolean;
  settings: BusinessSettings;
  onClose: () => void;
  onSave: (newSettings: BusinessSettings) => void;
  onReset: () => void;
}

export const OwnerSettingsDrawer: React.FC<OwnerSettingsDrawerProps> = ({
  isOpen,
  settings,
  onClose,
  onSave,
  onReset,
}) => {
  const [formState, setFormState] = useState<BusinessSettings>(settings);
  const [savedBanner, setSavedBanner] = useState(false);

  useEffect(() => {
    setFormState(settings);
  }, [settings, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formState);
    setSavedBanner(true);
    setTimeout(() => {
      setSavedBanner(false);
    }, 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="owner-settings-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-[#121215] border-l border-white/15 h-full flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
          <div>
            <h2 id="owner-settings-title" className="font-display text-2xl font-bold text-white">
              Customize Gym Details & Pricing
            </h2>
            <p className="text-xs text-[#A1A1AA] mt-0.5">
              Edit placeholder membership rates, contact numbers, hours, and location.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close customization panel"
            className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 text-white flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Pricing Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white">
              Monthly Membership Rates (Editable Placeholders)
            </h3>

            <div className="grid grid-cols-4 gap-3">
              <div className="col-span-1">
                <label className="block text-xs text-[#A1A1AA] mb-1" htmlFor="currency-symbol">
                  Currency
                </label>
                <input
                  id="currency-symbol"
                  type="text"
                  value={formState.currencySymbol}
                  onChange={(e) =>
                    setFormState({ ...formState, currencySymbol: e.target.value || '₹' })
                  }
                  className="w-full px-3 py-2 text-sm bg-[#09090B] border border-white/15 rounded-md text-white font-mono focus:outline-none focus:border-[#C8FF00]"
                />
              </div>

              <div className="col-span-1">
                <label className="block text-xs text-[#A1A1AA] mb-1" htmlFor="price-basic">
                  Basic / mo
                </label>
                <input
                  id="price-basic"
                  type="number"
                  min={0}
                  value={formState.prices.basic}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      prices: { ...formState.prices, basic: Number(e.target.value) || 0 },
                    })
                  }
                  className="w-full px-3 py-2 text-sm bg-[#09090B] border border-white/15 rounded-md text-white font-mono tabular-nums focus:outline-none focus:border-[#C8FF00]"
                />
              </div>

              <div className="col-span-1">
                <label className="block text-xs text-[#A1A1AA] mb-1" htmlFor="price-pro">
                  Pro / mo
                </label>
                <input
                  id="price-pro"
                  type="number"
                  min={0}
                  value={formState.prices.pro}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      prices: { ...formState.prices, pro: Number(e.target.value) || 0 },
                    })
                  }
                  className="w-full px-3 py-2 text-sm bg-[#09090B] border border-white/15 rounded-md text-white font-mono tabular-nums focus:outline-none focus:border-[#C8FF00]"
                />
              </div>

              <div className="col-span-1">
                <label className="block text-xs text-[#A1A1AA] mb-1" htmlFor="price-elite">
                  Elite / mo
                </label>
                <input
                  id="price-elite"
                  type="number"
                  min={0}
                  value={formState.prices.elite}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      prices: { ...formState.prices, elite: Number(e.target.value) || 0 },
                    })
                  }
                  className="w-full px-3 py-2 text-sm bg-[#09090B] border border-white/15 rounded-md text-white font-mono tabular-nums focus:outline-none focus:border-[#C8FF00]"
                />
              </div>
            </div>
          </div>

          {/* Contact & Location Section */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <h3 className="text-sm font-semibold text-white">
              Location, Contact & Operating Hours
            </h3>

            <div>
              <label className="block text-xs text-[#A1A1AA] mb-1" htmlFor="gym-address">
                Gym Street Address
              </label>
              <input
                id="gym-address"
                type="text"
                value={formState.address}
                onChange={(e) => setFormState({ ...formState, address: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-[#09090B] border border-white/15 rounded-md text-white focus:outline-none focus:border-[#C8FF00]"
              />
            </div>

            <div>
              <label className="block text-xs text-[#A1A1AA] mb-1" htmlFor="map-query">
                Google Maps Search / Embed Location Query
              </label>
              <input
                id="map-query"
                type="text"
                value={formState.mapQuery}
                onChange={(e) => setFormState({ ...formState, mapQuery: e.target.value })}
                placeholder="e.g. KhudGyan Gym MG Road Gangtok"
                className="w-full px-3 py-2 text-sm bg-[#09090B] border border-white/15 rounded-md text-white focus:outline-none focus:border-[#C8FF00]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-[#A1A1AA] mb-1" htmlFor="phone-display">
                  Phone Number (Display)
                </label>
                <input
                  id="phone-display"
                  type="text"
                  value={formState.phoneDisplay}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      phoneDisplay: e.target.value,
                      phoneDial: e.target.value.replace(/\s+/g, ''),
                    })
                  }
                  className="w-full px-3 py-2 text-sm bg-[#09090B] border border-white/15 rounded-md text-white font-mono focus:outline-none focus:border-[#C8FF00]"
                />
              </div>

              <div>
                <label className="block text-xs text-[#A1A1AA] mb-1" htmlFor="whatsapp-num">
                  WhatsApp Number (with country code)
                </label>
                <input
                  id="whatsapp-num"
                  type="text"
                  value={formState.whatsappNumber}
                  onChange={(e) => setFormState({ ...formState, whatsappNumber: e.target.value })}
                  placeholder="919876543210"
                  className="w-full px-3 py-2 text-sm bg-[#09090B] border border-white/15 rounded-md text-white font-mono focus:outline-none focus:border-[#C8FF00]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-[#A1A1AA] mb-1" htmlFor="gym-email">
                Inquiry Email Address
              </label>
              <input
                id="gym-email"
                type="email"
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-[#09090B] border border-white/15 rounded-md text-white focus:outline-none focus:border-[#C8FF00]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-[#A1A1AA] mb-1" htmlFor="weekday-hours">
                  Mon – Sat Hours
                </label>
                <input
                  id="weekday-hours"
                  type="text"
                  value={formState.weekdayHours}
                  onChange={(e) => setFormState({ ...formState, weekdayHours: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-[#09090B] border border-white/15 rounded-md text-white focus:outline-none focus:border-[#C8FF00]"
                />
              </div>

              <div>
                <label className="block text-xs text-[#A1A1AA] mb-1" htmlFor="sunday-hours">
                  Sunday Hours
                </label>
                <input
                  id="sunday-hours"
                  type="text"
                  value={formState.sundayHours}
                  onChange={(e) => setFormState({ ...formState, sundayHours: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-[#09090B] border border-white/15 rounded-md text-white focus:outline-none focus:border-[#C8FF00]"
                />
              </div>
            </div>
          </div>

          {savedBanner && (
            <div className="p-3 rounded-md bg-[#C8FF00]/15 border border-[#C8FF00]/40 text-xs text-[#C8FF00] flex items-center gap-2">
              <Check className="w-4 h-4 shrink-0" />
              <span>Gym details and pricing placeholders updated across the website.</span>
            </div>
          )}

          <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => {
                setFormState(DEFAULT_BUSINESS_SETTINGS);
                onReset();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#A1A1AA] hover:text-white bg-white/5 hover:bg-white/10 rounded-md transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-[#D4D4D8] hover:text-white bg-white/5 rounded-md transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-semibold text-[#09090B] bg-[#C8FF00] hover:bg-[#d4ff33] rounded-md transition-colors cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
