import { CheckCircle, Calendar, MapPin, Clock, User, Mail, Phone, FileText } from "lucide-react";
import type { Branch } from "./BranchSelectionStep";
import type { TimeSlot } from "./TimeSlotStep";
import type { UserInfo } from "./UserInfoStep";

interface ConfirmationStepProps {
  appointmentType: string;
  branch: Branch | null;
  timeSlot: TimeSlot | null;
  userInfo: UserInfo;
  onConfirm: () => void;
  onBack: () => void;
}

const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

export function ConfirmationStep({
  appointmentType,
  branch,
  timeSlot,
  userInfo,
  onConfirm,
  onBack
}: ConfirmationStepProps) {
  if (!branch || !timeSlot) return null;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h1 className="text-3xl mb-2">Review Your Appointment</h1>
        <p className="text-gray-600">Please confirm the details below</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-8 mb-6">
        {/* Appointment Type */}
        <div className="mb-6 pb-6 border-b border-gray-200">
          <div className="flex items-start gap-3">
            <FileText className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <h3 className="font-medium text-gray-600 mb-1">Appointment Type</h3>
              <p className="text-lg">{appointmentType}</p>
            </div>
          </div>
        </div>

        {/* Date and Time */}
        <div className="mb-6 pb-6 border-b border-gray-200">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <h3 className="font-medium text-gray-600 mb-1">Date</h3>
                <p className="text-lg">{formatDate(timeSlot.date)}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <h3 className="font-medium text-gray-600 mb-1">Time</h3>
                <p className="text-lg">{timeSlot.time}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Branch Location */}
        <div className="mb-6 pb-6 border-b border-gray-200">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <h3 className="font-medium text-gray-600 mb-1">Branch Location</h3>
              <p className="text-lg font-medium">{branch.name}</p>
              <p className="text-gray-600">{branch.address}</p>
              <p className="text-gray-600">{branch.city}, {branch.state} {branch.zip}</p>
              <p className="text-gray-600 mt-1">{branch.phone}</p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div>
          <h3 className="font-medium text-gray-600 mb-4">Your Information</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-green-600" />
              <p>{userInfo.name}</p>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-green-600" />
              <p>{userInfo.email}</p>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-green-600" />
              <p>{userInfo.phone}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-green-900">
          <strong>Note:</strong> You will receive a confirmation email at {userInfo.email} with your appointment details and a calendar invite.
        </p>
      </div>

      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
        >
          Back
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
        >
          Confirm Appointment
        </button>
      </div>
    </div>
  );
}