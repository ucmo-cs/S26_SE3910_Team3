import { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";

interface TimeSlot {
  date: string;
  time: string;
  available: boolean;
}

interface TimeSlotStepProps {
  selectedTimeSlot: TimeSlot | null;
  onTimeSlotSelect: (slot: TimeSlot) => void;
  onNext: () => void;
  onBack: () => void;
}

// Generate time slots for the next 14 days
const generateTimeSlots = (): { [key: string]: TimeSlot[] } => {
  const slots: { [key: string]: TimeSlot[] } = {};
  const today = new Date();
  
  for (let dayOffset = 1; dayOffset <= 14; dayOffset++) {
    const date = new Date(today);
    date.setDate(today.getDate() + dayOffset);
    const dateStr = date.toISOString().split('T')[0];
    const dayOfWeek = date.getDay();
    
    // Skip weekends
    if (dayOfWeek === 0 || dayOfWeek === 6) continue;
    
    slots[dateStr] = [];
    
    // Generate hourly slots from 9 AM to 4 PM (last appointment at 4 PM)
    for (let hour = 9; hour <= 16; hour++) {
      const time12h = hour > 12 ? `${hour - 12}:00 PM` : hour === 12 ? '12:00 PM' : `${hour}:00 AM`;
      // Randomly make some slots unavailable for realism
      const available = Math.random() > 0.3;
      
      slots[dateStr].push({
        date: dateStr,
        time: time12h,
        available
      });
    }
  }
  
  return slots;
};

const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

const formatShortDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

export function TimeSlotStep({
  selectedTimeSlot,
  onTimeSlotSelect,
  onNext,
  onBack
}: TimeSlotStepProps) {
  const [timeSlots] = useState(generateTimeSlots);
  const availableDates = Object.keys(timeSlots).sort();
  const [selectedDate, setSelectedDate] = useState<string>(availableDates[0] || '');
  const [currentWeekStart, setCurrentWeekStart] = useState(0);

  const displayedDates = availableDates.slice(currentWeekStart, currentWeekStart + 5);
  const canGoBack = currentWeekStart > 0;
  const canGoForward = currentWeekStart + 5 < availableDates.length;

  const handlePreviousWeek = () => {
    if (canGoBack) {
      setCurrentWeekStart(Math.max(0, currentWeekStart - 5));
    }
  };

  const handleNextWeek = () => {
    if (canGoForward) {
      setCurrentWeekStart(Math.min(availableDates.length - 5, currentWeekStart + 5));
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h1 className="text-3xl mb-2 text-center">Choose a Time</h1>
      <p className="text-gray-600 mb-8 text-center">Select your preferred date and time slot</p>
      
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
              onClick={() => setSelectedDate(date)}
              className={`p-3 rounded-lg border-2 text-sm transition-all ${
                selectedDate === date
                  ? 'border-green-600 bg-green-50 text-green-900'
                  : 'border-gray-200 hover:border-green-300 bg-white'
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

      {/* Time Slots Grid */}
      {selectedDate && timeSlots[selectedDate] && (
        <div className="grid grid-cols-4 gap-3 mb-8">
          {timeSlots[selectedDate].map((slot, index) => (
            <button
              key={index}
              onClick={() => slot.available && onTimeSlotSelect(slot)}
              disabled={!slot.available}
              className={`p-4 rounded-lg border-2 font-medium transition-all ${
                selectedTimeSlot?.date === slot.date && selectedTimeSlot?.time === slot.time
                  ? 'border-green-600 bg-green-600 text-white'
                  : slot.available
                  ? 'border-gray-200 hover:border-green-400 bg-white'
                  : 'border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed'
              }`}
            >
              {slot.time}
              {!slot.available && <div className="text-xs mt-1">Booked</div>}
            </button>
          ))}
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
          disabled={!selectedTimeSlot}
          className="flex-1 bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export type { TimeSlot };