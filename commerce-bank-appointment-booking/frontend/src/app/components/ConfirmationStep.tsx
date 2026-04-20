import { FileText, Calendar, MapPin, User, CheckCircle } from "lucide-react";
import { useState } from "react";
import type { Branch } from "./BranchSelectionStep";
import type { TimeSlot } from "./TimeSlotStep";
import type { UserInfo } from "./UserInfoStep";
import { bookAppointment } from "../../services/appointmentService";
import { sendConfirmationEmail } from "../../services/emailService";
import type { AppointmentResponse } from "../../services/appointmentService";

interface ConfirmationStepProps {
  appointmentType: string;
  branch: Branch | null;
  timeSlot: TimeSlot | null;
  userInfo: UserInfo;
  onConfirm: (appointmentData: AppointmentResponse) => void;
  onBack: () => void;
}

const formatDate = (dateStr: string): string => {
  const [year, month, day] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
};

const rowStyle = {
  display: "flex",
  gap: 12,
  alignItems: "flex-start",
  padding: "14px 0",
  borderBottom: "1px solid #f0ece4",
};

export function ConfirmationStep({
                                   appointmentType,
                                   branch,
                                   timeSlot,
                                   userInfo,
                                   onConfirm,
                                   onBack,
                                 }: ConfirmationStepProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!branch || !timeSlot) return null;

  const handleConfirmAppointment = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const appointmentResponse = await bookAppointment({ appointmentType, branch, timeSlot, userInfo });
      await sendConfirmationEmail({
        appointmentId: appointmentResponse.id,
        email: userInfo.email,
        confirmationNumber: appointmentResponse.confirmationNumber,
        appointmentType,
        branch: { name: branch.name, address: branch.address, city: branch.city, state: branch.state, zip: branch.zip, phone: branch.phone },
        timeSlot: { date: timeSlot.date, time: timeSlot.time },
        userInfo,
      });
      onConfirm(appointmentResponse);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to book appointment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <div className="w-full">
        <div className="mb-6">
          <p className="text-xs font-medium uppercase tracking-widest mb-1" style={{ color: "#4a9c4a" }}>Step 5 of 5</p>
          <h1 className="text-2xl font-medium" style={{ color: "#1a2e1a" }}>Review your appointment</h1>
          <p className="text-sm mt-1" style={{ color: "#6b7c6b" }}>Please confirm the details below</p>
        </div>

        {error && (
            <div
                className="flex items-start gap-3 p-4 rounded-lg mb-4 text-sm"
                style={{ background: "#fef2f2", border: "1px solid #fecaca", color: "#b91c1c" }}
            >
              <span className="font-medium">Error:</span> {error}
            </div>
        )}

        <div className="rounded-xl p-6 mb-4" style={{ background: "white", border: "1px solid #e8e4dc" }}>
          <div style={{ ...rowStyle }}>
            <FileText className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#4a9c4a" }} />
            <div>
              <div className="text-xs uppercase tracking-wide mb-1" style={{ color: "#8a9a8a" }}>Appointment type</div>
              <div className="text-sm font-medium" style={{ color: "#1a2e1a" }}>{appointmentType}</div>
            </div>
          </div>

          <div style={{ ...rowStyle }}>
            <Calendar className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#4a9c4a" }} />
            <div>
              <div className="text-xs uppercase tracking-wide mb-1" style={{ color: "#8a9a8a" }}>Date & time</div>
              <div className="text-sm font-medium" style={{ color: "#1a2e1a" }}>{formatDate(timeSlot.date)}</div>
              <div className="text-sm" style={{ color: "#6b7c6b" }}>{timeSlot.time} · 1 hour</div>
            </div>
          </div>

          <div style={{ ...rowStyle }}>
            <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#4a9c4a" }} />
            <div>
              <div className="text-xs uppercase tracking-wide mb-1" style={{ color: "#8a9a8a" }}>Branch location</div>
              <div className="text-sm font-medium" style={{ color: "#1a2e1a" }}>{branch.name}</div>
              <div className="text-sm" style={{ color: "#6b7c6b" }}>{branch.address}</div>
              <div className="text-sm" style={{ color: "#6b7c6b" }}>{branch.city}, {branch.state} {branch.zip}</div>
              <div className="text-sm" style={{ color: "#6b7c6b" }}>{branch.phone}</div>
            </div>
          </div>

          <div style={{ ...rowStyle, borderBottom: "none" }}>
            <User className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#4a9c4a" }} />
            <div>
              <div className="text-xs uppercase tracking-wide mb-1" style={{ color: "#8a9a8a" }}>Your information</div>
              <div className="text-sm font-medium" style={{ color: "#1a2e1a" }}>{userInfo.name}</div>
              <div className="text-sm" style={{ color: "#6b7c6b" }}>{userInfo.email} · {userInfo.phone}</div>
            </div>
          </div>
        </div>

        <div
            className="flex items-start gap-3 rounded-lg px-4 py-3 mb-4 text-sm"
            style={{ background: "#f0f8f0", border: "1px solid #c8e0c8", color: "#3d5a3d" }}
        >
          <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#4a9c4a" }} />
          A confirmation email and calendar invite will be sent to {userInfo.email}
        </div>

        <div className="flex gap-3">
          <button
              onClick={onBack}
              disabled={isLoading}
              className="flex-1 h-12 rounded-lg text-sm font-medium transition-colors"
              style={{
                background: "transparent",
                border: "1px solid #c8c4bc",
                color: "#3d5a3d",
                opacity: isLoading ? 0.5 : 1,
              }}
          >
            ← Back
          </button>
          <button
              onClick={handleConfirmAppointment}
              disabled={isLoading}
              className="h-12 rounded-lg text-sm font-medium text-white transition-colors"
              style={{
                flex: 2,
                background: isLoading ? "#8ab88a" : "#2d6e2d",
                cursor: isLoading ? "not-allowed" : "pointer",
              }}
          >
            {isLoading ? "Confirming..." : "Confirm appointment"}
          </button>
        </div>
      </div>
  );
}
