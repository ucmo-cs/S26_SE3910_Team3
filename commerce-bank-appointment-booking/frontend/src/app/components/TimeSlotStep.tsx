import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Loader } from "lucide-react";

interface TimeSlot {
  date: string;
  time: string;
  available: boolean;
}

interface TimeSlotStepProps {
  branchId: string;
  selectedTimeSlot: TimeSlot | null;
  onTimeSlotSelect: (slot: TimeSlot) => void;
  onNext: () => void;
  onBack: () => void;
}

const generateDates = (): string[] => {
  const dates: string[] = [];
  const today = new Date();
  let dayOffset = 0;
  while (dates.length < 14) {
    dayOffset++;
    const date = new Date(today);
    date.setDate(today.getDate() + dayOffset);
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) continue;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    dates.push(`${year}-${month}-${day}`);
  }
  return dates;
};

const TIME_SLOTS = [
  "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM",
];

const formatDate = (dateStr: string): string => {
  const [year, month, day] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
};
const formatDayNum = (dateStr: string): { day: string; num: string } => {
  const [year, month, day] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return {
    day: date.toLocaleDateString("en-US", { weekday: "short" }),
    num: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
  };
};

export function TimeSlotStep({
                               branchId,
                               selectedTimeSlot,
                               onTimeSlotSelect,
                               onNext,
                               onBack,
                             }: TimeSlotStepProps) {
  const availableDates = generateDates();
  const [selectedDate, setSelectedDate] = useState<string>(availableDates[0] || "");
  const [currentWeekStart, setCurrentWeekStart] = useState(0);
  const [bookedTimes, setBookedTimes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!branchId || !selectedDate) return;
    const fetchBookedSlots = async () => {
      setLoading(true);
      try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";
        const response = await fetch(
            `${baseUrl}/appointments/booked-slots?branchId=${branchId}&date=${selectedDate}`
        );
        if (!response.ok) throw new Error("Failed to fetch booked slots");
        const data: string[] = await response.json();
        setBookedTimes(data);
      } catch {
        setBookedTimes([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBookedSlots();
  }, [branchId, selectedDate]);

  const displayedDates = availableDates.slice(currentWeekStart, currentWeekStart + 5);
  const canGoBack = currentWeekStart > 0;
  const canGoForward = currentWeekStart + 5 < availableDates.length;

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    if (selectedTimeSlot?.date !== date) {
      onTimeSlotSelect({ date, time: "", available: false });
    }
  };

  return (
      <div className="w-full">
        <div className="mb-6">
          <p className="text-xs font-medium uppercase tracking-widest mb-1" style={{ color: "#4a9c4a" }}>Step 3 of 5</p>
          <h1 className="text-2xl font-medium" style={{ color: "#1a2e1a" }}>Choose a time</h1>
          <p className="text-sm mt-1" style={{ color: "#6b7c6b" }}>Select your preferred date and 1-hour slot</p>
        </div>

        <div className="rounded-xl p-6 mb-4" style={{ background: "white", border: "1px solid #e8e4dc" }}>
          {/* Date navigation */}
          <div className="flex items-center gap-2 mb-5">
            <button
                onClick={() => canGoBack && setCurrentWeekStart(Math.max(0, currentWeekStart - 5))}
                disabled={!canGoBack}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors flex-shrink-0"
                style={{
                  background: "white",
                  border: "1px solid #ddd9d0",
                  color: canGoBack ? "#3d5a3d" : "#c8c4bc",
                  cursor: canGoBack ? "pointer" : "not-allowed",
                }}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex gap-2 flex-1">
              {displayedDates.map((date) => {
                const { day, num } = formatDayNum(date);
                const isSelected = selectedDate === date;
                return (
                    <button
                        key={date}
                        onClick={() => handleDateSelect(date)}
                        className="flex-1 h-14 rounded-lg flex flex-col items-center justify-center gap-0.5 transition-all"
                        style={{
                          background: isSelected ? "#f0f8f0" : "white",
                          border: isSelected ? "2px solid #2d6e2d" : "1px solid #ddd9d0",
                          cursor: "pointer",
                        }}
                    >
                      <span className="text-xs" style={{ color: isSelected ? "#2d6e2d" : "#8a9a8a" }}>{day}</span>
                      <span className="text-xs font-medium" style={{ color: "#1a2e1a" }}>{num}</span>
                    </button>
                );
              })}
            </div>

            <button
                onClick={() => canGoForward && setCurrentWeekStart(Math.min(availableDates.length - 5, currentWeekStart + 5))}
                disabled={!canGoForward}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors flex-shrink-0"
                style={{
                  background: "white",
                  border: "1px solid #ddd9d0",
                  color: canGoForward ? "#3d5a3d" : "#c8c4bc",
                  cursor: canGoForward ? "pointer" : "not-allowed",
                }}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {selectedDate && (
              <>
                <div className="mb-1 text-sm font-medium" style={{ color: "#1a2e1a" }}>
                  {formatDate(selectedDate)}
                </div>
                <div className="mb-4 text-xs" style={{ color: "#8a9a8a" }}>
                  Available slots · 1 hour each
                </div>
              </>
          )}

          {loading ? (
              <div className="flex items-center justify-center py-8" style={{ color: "#6b7c6b" }}>
                <Loader className="w-4 h-4 animate-spin mr-2" style={{ color: "#4a9c4a" }} />
                <span className="text-sm">Checking availability...</span>
              </div>
          ) : (
              <div className="grid grid-cols-4 gap-2">
                {TIME_SLOTS.map((time, index) => {
                  const isBooked = bookedTimes.includes(time);
                  const isSelected = selectedTimeSlot?.date === selectedDate && selectedTimeSlot?.time === time;
                  return (
                      <button
                          key={index}
                          onClick={() => !isBooked && onTimeSlotSelect({ date: selectedDate, time, available: true })}
                          disabled={isBooked}
                          className="h-12 rounded-lg text-xs font-medium transition-all flex flex-col items-center justify-center"
                          style={{
                            background: isSelected ? "#2d6e2d" : isBooked ? "#f4f2ee" : "white",
                            border: isSelected ? "2px solid #2d6e2d" : isBooked ? "1px solid #e8e4dc" : "1px solid #ddd9d0",
                            color: isSelected ? "white" : isBooked ? "#b0b8b0" : "#1a2e1a",
                            cursor: isBooked ? "not-allowed" : "pointer",
                          }}
                          onMouseEnter={(e) => {
                            if (!isBooked && !isSelected) {
                              (e.currentTarget as HTMLButtonElement).style.borderColor = "#4a9c4a";
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!isBooked && !isSelected) {
                              (e.currentTarget as HTMLButtonElement).style.borderColor = "#ddd9d0";
                            }
                          }}
                      >
                        {time}
                        {isBooked && <span className="text-xs mt-0.5" style={{ fontSize: 10 }}>Booked</span>}
                      </button>
                  );
                })}
              </div>
          )}
        </div>

        <div className="flex gap-3">
          <button
              onClick={onBack}
              className="flex-1 h-12 rounded-lg text-sm font-medium transition-colors"
              style={{ background: "transparent", border: "1px solid #c8c4bc", color: "#3d5a3d" }}
          >
            ← Back
          </button>
          <button
              onClick={onNext}
              disabled={!selectedTimeSlot?.time}
              className="h-12 rounded-lg text-sm font-medium text-white transition-colors"
              style={{
                flex: 2,
                background: selectedTimeSlot?.time ? "#2d6e2d" : "#c8c4bc",
                cursor: selectedTimeSlot?.time ? "pointer" : "not-allowed",
              }}
          >
            Continue →
          </button>
        </div>
      </div>
  );
}

export type { TimeSlot };
