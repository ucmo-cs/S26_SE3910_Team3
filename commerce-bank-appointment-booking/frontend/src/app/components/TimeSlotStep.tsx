import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Calendar, Loader } from "lucide-react";

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

// Generate all time slots for the next 14 business days (no random availability)
const generateDates = (): string[] => {
  const dates: string[] = [];
  const today = new Date();
  let dayOffset = 0;

  while (dates.length < 14) {
    dayOffset++;
    const date = new Date(today);
    date.setDate(today.getDate() + dayOffset);
    const dayOfWeek = date.getDay();

    // Skip weekends (0 = Sunday, 6 = Saturday)
    if (dayOfWeek === 0 || dayOfWeek === 6) continue;

    // Use local date parts instead of ISO string to avoid UTC timezone shift
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
  const date = new Date(year, month - 1, day); // Local time, not UTC
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
};

const formatShortDate = (dateStr: string): string => {
  const [year, month, day] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day); // Local time, not UTC
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "short",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
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

  // Fetch booked slots whenever branch or date changes
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
      } catch (err) {
        console.error("Error fetching booked slots:", err);
        setBookedTimes([]); // Assume all available on error
      } finally {
        setLoading(false);
      }
    };

    fetchBookedSlots();
  }, [branchId, selectedDate]);

  const displayedDates = availableDates.slice(currentWeekStart, currentWeekStart + 5);
  const canGoBack = currentWeekStart > 0;
  const canGoForward = currentWeekStart + 5 < availableDates.length;

  const handlePreviousWeek = () => {
    if (canGoBack) setCurrentWeekStart(Math.max(0, currentWeekStart - 5));
  };

  const handleNextWeek = () => {
    if (canGoForward)
      setCurrentWeekStart(Math.min(availableDates.length - 5, currentWeekStart + 5));
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    // Clear selected time slot if it was on the old date
    if (selectedTimeSlot?.date !== date) {
      onTimeSlotSelect({ date, time: "", available: false });
    }
  };

  return (
      <div className="w-full max-w-4xl mx-auto">
        <h1 className="text-3xl mb-2 text-center">Choose a Time</h1>
        <p className="text-gray-600 mb-8 text-center">
          Select your preferred date and time slot
        </p>

        {/* Date Navigation */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <button
                onClick={handlePreviousWeek}
                disabled={!canGoBack}
                className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="w-5 h-5" />
              <span className="font-medium">Select a Date</span>
            </div>
            <button
                onClick={handleNextWeek}
                disabled={!canGoForward}
                className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {displayedDates.map((date) => (
                <button
                    key={date}
                    onClick={() => handleDateSelect(date)}
                    className={`p-3 rounded-lg border-2 text-sm transition-all ${
                        selectedDate === date
                            ? "border-green-600 bg-green-50 text-green-900"
                            : "border-gray-200 hover:border-green-300 bg-white"
                    }`}
                >
                  {formatShortDate(date)}
                </button>
            ))}
          </div>
        </div>

        {/* Selected Date Display */}
        {selectedDate && (
            <div className="mb-4">
              <h3 className="font-semibold text-lg">{formatDate(selectedDate)}</h3>
              <p className="text-sm text-gray-600">Available time slots (1 hour each)</p>
            </div>
        )}

        {/* Loading State */}
        {loading && (
            <div className="flex items-center justify-center py-10 text-gray-500">
              <Loader className="w-6 h-6 animate-spin mr-2 text-green-600" />
              <span>Checking availability...</span>
            </div>
        )}

        {/* Time Slots Grid */}
        {selectedDate && !loading && (
            <div className="grid grid-cols-4 gap-3 mb-8">
              {TIME_SLOTS.map((time, index) => {
                const isBooked = bookedTimes.includes(time);
                const isSelected =
                    selectedTimeSlot?.date === selectedDate &&
                    selectedTimeSlot?.time === time;

                return (
                    <button
                        key={index}
                        onClick={() =>
                            !isBooked &&
                            onTimeSlotSelect({ date: selectedDate, time, available: true })
                        }
                        disabled={isBooked}
                        className={`p-4 rounded-lg border-2 font-medium transition-all ${
                            isSelected
                                ? "border-green-600 bg-green-600 text-white"
                                : isBooked
                                    ? "border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed"
                                    : "border-gray-200 hover:border-green-400 bg-white"
                        }`}
                    >
                      {time}
                      {isBooked && <div className="text-xs mt-1">Booked</div>}
                    </button>
                );
              })}
            </div>
        )}

        <div className="flex gap-4">
          <button
              onClick={onBack}
              className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
          >
            Back
          </button>
          <button
              onClick={onNext}
              disabled={!selectedTimeSlot?.time}
              className="flex-1 bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Continue
          </button>
        </div>
      </div>
  );
}

export type { TimeSlot };