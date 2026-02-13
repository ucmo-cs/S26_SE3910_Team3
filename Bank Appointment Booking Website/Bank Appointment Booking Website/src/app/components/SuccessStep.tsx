import { CheckCircle, Calendar, Download } from "lucide-react";
import type { Branch } from "./BranchSelectionStep";
import type { TimeSlot } from "./TimeSlotStep";

interface SuccessStepProps {
  appointmentType: string;
  branch: Branch | null;
  timeSlot: TimeSlot | null;
  onStartOver: () => void;
}

const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

export function SuccessStep({
  appointmentType,
  branch,
  timeSlot,
  onStartOver
}: SuccessStepProps) {
  if (!branch || !timeSlot) return null;

  const confirmationNumber = `BNK-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;

  return (
    <div className="w-full max-w-2xl mx-auto text-center">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
        <CheckCircle className="w-12 h-12 text-green-600" />
      </div>

      <h1 className="text-4xl mb-3">Appointment Confirmed!</h1>
      <p className="text-gray-600 text-lg mb-8">
        Your appointment has been successfully scheduled
      </p>

      <div className="bg-white border border-gray-200 rounded-lg p-8 mb-6 text-left">
        <div className="mb-6 pb-6 border-b border-gray-200">
          <h3 className="text-gray-600 text-sm mb-1">Confirmation Number</h3>
          <p className="text-2xl font-mono font-semibold text-green-600">{confirmationNumber}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="font-medium text-gray-600 mb-2">Appointment Type</h3>
            <p className="text-lg">{appointmentType}</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-600 mb-2">Date & Time</h3>
            <div className="flex items-center gap-2 text-lg">
              <Calendar className="w-5 h-5 text-green-600" />
              <div>
                <p>{formatDate(timeSlot.date)}</p>
                <p className="text-green-600">{timeSlot.time}</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-medium text-gray-600 mb-2">Location</h3>
          <p className="font-medium">{branch.name}</p>
          <p className="text-gray-600">{branch.address}</p>
          <p className="text-gray-600">{branch.city}, {branch.state} {branch.zip}</p>
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
        <h3 className="font-semibold mb-3">What's Next?</h3>
        <ul className="text-left space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-green-600 mt-0.5">✓</span>
            <span>You will receive a confirmation email with all appointment details</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 mt-0.5">✓</span>
            <span>A calendar invite has been sent to add this to your schedule</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 mt-0.5">✓</span>
            <span>Please arrive 5 minutes early and bring a valid ID</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 mt-0.5">✓</span>
            <span>If you need to reschedule, please call us at {branch.phone}</span>
          </li>
        </ul>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button className="flex-1 bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
          <Download className="w-5 h-5" />
          Download Confirmation
        </button>
        <button
          onClick={onStartOver}
          className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
        >
          Schedule Another Appointment
        </button>
      </div>
    </div>
  );
}