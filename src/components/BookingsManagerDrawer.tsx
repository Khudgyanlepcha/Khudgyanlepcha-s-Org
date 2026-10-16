import React, { useState, useEffect, useCallback } from 'react';
import {
  X,
  RefreshCw,
  Copy,
  Check,
  MessageCircle,
  Calendar,
  ExternalLink,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import {
  AppointmentRecord,
  fetchAllBookingAppointments,
  updateBookingAppointmentStatus,
  syncPendingAppointmentsToSupabase,
  SUPABASE_TABLE_SETUP_SQL,
} from '../lib/supabase';

interface BookingsManagerDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingsManagerDrawer: React.FC<BookingsManagerDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  const [appointments, setAppointments] = useState<AppointmentRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [tableReady, setTableReady] = useState(true);
  const [showSqlHelper, setShowSqlHelper] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);
  const [statusFilter, setStatusFilter] = useState<
    'all' | 'pending' | 'confirmed' | 'completed' | 'cancelled'
  >('all');
  const [syncMessage, setSyncMessage] = useState<string | null>(null);

  const loadBookings = useCallback(async () => {
    setLoading(true);
    const result = await fetchAllBookingAppointments();
    setAppointments(result.appointments);
    setTableReady(result.tableReady);
    if (!result.tableReady) {
      setShowSqlHelper(true);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      loadBookings();
    }
  }, [isOpen, loadBookings]);

  if (!isOpen) return null;

  const handleCopySql = () => {
    navigator.clipboard?.writeText(SUPABASE_TABLE_SETUP_SQL);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  const handleStatusChange = async (
    referenceId: string,
    newStatus: AppointmentRecord['status']
  ) => {
    setAppointments((prev) =>
      prev.map((a) => (a.reference_id === referenceId ? { ...a, status: newStatus } : a))
    );
    await updateBookingAppointmentStatus(referenceId, newStatus);
  };

  const handleSyncPending = async () => {
    setLoading(true);
    setSyncMessage(null);
    const res = await syncPendingAppointmentsToSupabase();
    if (res.errorMessage) {
      setSyncMessage(`Could not sync yet: please run the SQL table setup in Supabase first.`);
    } else if (res.syncedCount > 0) {
      setSyncMessage(`Synced ${res.syncedCount} pending booking(s) to Supabase.`);
    } else {
      setSyncMessage('All bookings are already synced with Supabase.');
    }
    await loadBookings();
  };

  const unsyncedCount = appointments.filter((a) => !a.synced_to_supabase).length;

  const filteredAppointments =
    statusFilter === 'all'
      ? appointments
      : appointments.filter((a) => a.status === statusFilter);

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="bookings-drawer-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-[#121215] border-l border-white/15 h-full flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between gap-4">
          <div>
            <h2
              id="bookings-drawer-title"
              className="font-display text-2xl font-bold text-white"
            >
              Booked Appointments & Inquiries
            </h2>
            <p className="text-xs text-[#A1A1AA] mt-0.5">
              Connected to Supabase Project <span className="font-mono text-white">nukaujxoonylvqnpwwtv</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowSqlHelper((prev) => !prev)}
              className="px-3 py-1.5 text-xs font-medium text-[#E4E4E7] bg-white/5 hover:bg-white/10 border border-white/10 rounded-md transition-colors cursor-pointer whitespace-nowrap"
            >
              {showSqlHelper ? 'Hide SQL Schema' : 'Supabase Table SQL'}
            </button>
            <button
              type="button"
              onClick={loadBookings}
              aria-label="Refresh appointments"
              className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 text-white flex items-center justify-center cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-[#C8FF00]' : ''}`} />
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close bookings drawer"
              className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 text-white flex items-center justify-center cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* SQL Table Setup Guide if table not created yet or toggled open */}
          {showSqlHelper && (
            <div className="bg-[#09090B] border border-[#C8FF00]/40 rounded-xl p-5 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-sm font-semibold text-white">
                    {tableReady
                      ? 'Supabase "bookings" Table Schema'
                      : 'One-Time Step: Create the "bookings" Table in Supabase'}
                  </h3>
                  <p className="text-xs text-[#A1A1AA] mt-0.5">
                    Copy and run this SQL once in your Supabase SQL Editor so appointments save directly to your table.
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={handleCopySql}
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#09090B] bg-[#C8FF00] hover:bg-[#d4ff33] rounded-md transition-colors cursor-pointer whitespace-nowrap"
                  >
                    {copiedSql ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied SQL</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy SQL Script</span>
                      </>
                    )}
                  </button>

                  <a
                    href="https://supabase.com/dashboard/project/nukaujxoonylvqnpwwtv/sql/new"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-white bg-white/10 hover:bg-white/15 rounded-md transition-colors whitespace-nowrap"
                  >
                    <span>Open SQL Editor</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              <pre className="p-3.5 rounded-lg bg-[#121215] border border-white/10 text-[11px] font-mono text-[#D4D4D8] overflow-x-auto max-h-48">
                {SUPABASE_TABLE_SETUP_SQL}
              </pre>
            </div>
          )}

          {/* Sync Banner if there are unsynced local bookings */}
          {unsyncedCount > 0 && (
            <div className="p-4 rounded-lg bg-[#16161B] border border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="text-xs text-[#E4E4E7]">
                <span className="font-mono font-semibold text-[#C8FF00] tabular-nums">
                  {unsyncedCount}
                </span>{' '}
                booking(s) are saved locally and ready to push to your Supabase{' '}
                <code className="font-mono text-white">bookings</code> table.
              </div>
              <button
                type="button"
                onClick={handleSyncPending}
                className="px-3.5 py-2 text-xs font-semibold text-[#09090B] bg-[#C8FF00] hover:bg-[#d4ff33] rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                Sync to Supabase Now
              </button>
            </div>
          )}

          {syncMessage && (
            <div className="p-3 rounded-md bg-white/5 border border-white/10 text-xs text-[#C8FF00]">
              {syncMessage}
            </div>
          )}

          {/* Status Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1 p-1 bg-[#09090B] border border-white/10 rounded-lg">
              {(['all', 'pending', 'confirmed', 'completed', 'cancelled'] as const).map(
                (st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md capitalize transition-colors cursor-pointer whitespace-nowrap ${
                      statusFilter === st
                        ? 'bg-[#C8FF00] text-[#09090B] font-semibold'
                        : 'text-[#A1A1AA] hover:text-white'
                    }`}
                  >
                    {st}
                  </button>
                )
              )}
            </div>

            <span className="font-mono text-xs text-[#A1A1AA] tabular-nums">
              {filteredAppointments.length} record(s)
            </span>
          </div>

          {/* Appointments List */}
          {loading ? (
            <div className="py-16 text-center text-sm text-[#A1A1AA]">
              Loading booked appointments from Supabase...
            </div>
          ) : filteredAppointments.length === 0 ? (
            <div className="py-16 px-6 text-center bg-[#09090B] border border-white/10 rounded-xl space-y-2">
              <Calendar className="w-8 h-8 text-[#A1A1AA] mx-auto" />
              <div className="text-sm font-semibold text-white">
                No Booked Appointments Found
              </div>
              <p className="text-xs text-[#A1A1AA] max-w-sm mx-auto">
                When visitors submit the Free Trial or Membership Inquiry form on the website,
                their appointment details will appear here and in your Supabase table.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredAppointments.map((apt) => {
                const cleanPhone = apt.phone.replace(/[^0-9]/g, '');
                const waText = encodeURIComponent(
                  `Hello ${apt.full_name}, this is KhudGyan Gym regarding your ${apt.plan_or_program} booking (${apt.reference_id}) for ${apt.preferred_date}.`
                );

                return (
                  <div
                    key={apt.reference_id}
                    className="bg-[#09090B] border border-white/10 rounded-xl p-5 space-y-4"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2 border-b border-white/10 pb-3">
                      <div>
                        <div className="flex items-center gap-2 text-xs text-[#A1A1AA]">
                          <span className="font-mono text-[#C8FF00] font-semibold tabular-nums">
                            {apt.reference_id}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span className="capitalize">{apt.inquiry_type}</span>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono tabular-nums">
                            {new Date(apt.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <h3 className="font-display text-2xl font-bold text-white mt-0.5">
                          {apt.full_name}
                        </h3>
                      </div>

                      <div className="flex items-center gap-2">
                        {apt.synced_to_supabase ? (
                          <span className="inline-flex items-center gap-1 text-[11px] text-[#C8FF00]">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Saved in Supabase</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] text-[#A1A1AA]">
                            <Clock className="w-3.5 h-3.5" />
                            <span>Pending Table Sync</span>
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-[#A1A1AA] block">Program / Plan:</span>
                        <span className="text-white font-medium">{apt.plan_or_program}</span>
                      </div>
                      <div>
                        <span className="text-[#A1A1AA] block">Preferred Visit Slot:</span>
                        <span className="text-white font-mono tabular-nums">
                          {apt.preferred_date || 'Flexible'} · {apt.preferred_time_slot || 'Anytime'}
                        </span>
                      </div>
                      <div>
                        <span className="text-[#A1A1AA] block">Phone / WhatsApp:</span>
                        <span className="text-white font-mono tabular-nums">{apt.phone}</span>
                      </div>
                      <div>
                        <span className="text-[#A1A1AA] block">Email:</span>
                        <span className="text-white">{apt.email}</span>
                      </div>
                    </div>

                    {apt.goal_notes && (
                      <div className="text-xs bg-[#121215] border border-white/5 rounded-lg p-3 text-[#D4D4D8]">
                        <span className="text-[#A1A1AA] font-medium block mb-0.5">
                          Member Notes / Goals:
                        </span>
                        {apt.goal_notes}
                      </div>
                    )}

                    <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs text-[#A1A1AA] mr-1">Status:</span>
                        {(['pending', 'confirmed', 'completed', 'cancelled'] as const).map(
                          (st) => (
                            <button
                              key={st}
                              type="button"
                              onClick={() => handleStatusChange(apt.reference_id, st)}
                              className={`px-2.5 py-1 text-[11px] font-medium rounded capitalize transition-colors cursor-pointer ${
                                apt.status === st
                                  ? 'bg-[#C8FF00] text-[#09090B] font-semibold'
                                  : 'bg-white/5 text-[#A1A1AA] hover:text-white'
                              }`}
                            >
                              {st}
                            </button>
                          )
                        )}
                      </div>

                      {cleanPhone && (
                        <a
                          href={`https://wa.me/${cleanPhone}?text=${waText}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-white/5 hover:bg-white/10 border border-white/15 rounded-md transition-colors"
                        >
                          <MessageCircle className="w-3.5 h-3.5 text-[#C8FF00]" />
                          <span>WhatsApp Client</span>
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
