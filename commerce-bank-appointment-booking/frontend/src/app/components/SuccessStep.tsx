import { Calendar, MapPin, FileText, Download, Check } from "lucide-react";
import { useState } from "react";
import type { Branch } from "./BranchSelectionStep";
import type { TimeSlot } from "./TimeSlotStep";
import type { UserInfo } from "./UserInfoStep";
import { generatePDF } from "../../services/pdfService";

interface SuccessStepProps {
  appointmentType: string;
  branch: Branch | null;
  timeSlot: TimeSlot | null;
  confirmationNumber: string;
  appointmentId: string;
  userInfo: UserInfo;
  onStartOver: () => void;
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

export function SuccessStep({
                              appointmentType,
                              branch,
                              timeSlot,
                              confirmationNumber,
                              appointmentId,
                              userInfo,
                              onStartOver,
                            }: SuccessStepProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  if (!branch || !timeSlot) return null;

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    setDownloadError(null);
    try {
      await generatePDF({
        appointmentId,
        confirmationNumber,
        appointmentType,
        branch: { name: branch.name, address: branch.address, city: branch.city, state: branch.state, zip: branch.zip, phone: branch.phone },
        timeSlot: { date: timeSlot.date, time: timeSlot.time },
        userInfo: { name: userInfo.name, email: userInfo.email, phone: userInfo.phone },
      });
    } catch (err) {
      setDownloadError(err instanceof Error ? err.message : "Failed to download PDF. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
      <div className="w-full">
        {/* Success header */}
        <div className="text-center mb-6">
          <div
              className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ background: "#2d6e2d" }}
          >
            <Check className="w-7 h-7 text-white" strokeWidth={2.5} />
          </div>
          <h1 className="text-2xl font-medium mb-1" style={{ color: "#1a2e1a" }}>Appointment confirmed</h1>
          <p className="text-sm" style={{ color: "#6b7c6b" }}>Your appointment has been successfully scheduled</p>
        </div>

        {/* Confirmation number block */}
        <div
            className="rounded-xl px-5 py-4 mb-4 flex items-center justify-between"
            style={{ background: "#1a2e1a" }}
        >
          <div>
            <div className="text-xs uppercase tracking-widest mb-1" style={{ color: "#8aab8a" }}>
              Confirmation number
            </div>
            <div
                className="text-xl font-medium tracking-wider"
                style={{ color: "white", fontFamily: "monospace" }}
            >
              {confirmationNumber}
            </div>
          </div>
          <button
              onClick={() => navigator.clipboard?.writeText(confirmationNumber)}
              className="text-xs px-3 py-1.5 rounded-md transition-colors"
              style={{ color: "#4a9c4a", background: "rgba(74,156,74,0.1)" }}
          >
            Copy
          </button>
        </div>

        {downloadError && (
            <div
                className="flex items-start gap-3 p-4 rounded-lg mb-4 text-sm"
                style={{ background: "#fef2f2", border: "1px solid #fecaca", color: "#b91c1c" }}
            >
              <span className="font-medium">Error:</span> {downloadError}
            </div>
        )}

        {/* Appointment details */}
        <div className="rounded-xl p-6 mb-4" style={{ background: "white", border: "1px solid #e8e4dc" }}>
          <div style={{ ...rowStyle }}>
            <FileText className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#4a9c4a" }} />
            <div>
              <div className="text-xs uppercase tracking-wide mb-1" style={{ color: "#8a9a8a" }}>Type</div>
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

          <div style={{ ...rowStyle, borderBottom: "none" }}>
            <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#4a9c4a" }} />
            <div>
              <div className="text-xs uppercase tracking-wide mb-1" style={{ color: "#8a9a8a" }}>Location</div>
              <div className="text-sm font-medium" style={{ color: "#1a2e1a" }}>{branch.name}</div>
              <div className="text-sm" style={{ color: "#6b7c6b" }}>{branch.address}</div>
              <div className="text-sm" style={{ color: "#6b7c6b" }}>{branch.city}, {branch.state} {branch.zip}</div>
            </div>
          </div>
        </div>

        {/* What's next */}
        <div
            className="rounded-xl p-5 mb-5"
            style={{ background: "#f0f8f0", border: "1px solid #c8e0c8" }}
        >
          <div className="text-sm font-medium mb-3" style={{ color: "#1a2e1a" }}>What's next</div>
          <ul className="space-y-2">
            {[
              "A confirmation email with all appointment details has been sent",
              "A calendar invite has been sent to add this to your schedule",
              "Please arrive 5 minutes early and bring a valid ID",
              `To reschedule, call us at ${branch.phone}`,
            ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "#3d5a3d" }}>
                  <span className="mt-0.5 flex-shrink-0" style={{ color: "#4a9c4a" }}>✓</span>
                  {item}
                </li>
            ))}
          </ul>
        </div>

        {/* Actions */}
        <button
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="w-full h-12 rounded-lg text-sm font-medium text-white flex items-center justify-center gap-2 mb-3 transition-colors"
            style={{
              background: isDownloading ? "#8ab88a" : "#2d6e2d",
              cursor: isDownloading ? "not-allowed" : "pointer",
            }}
        >
          <Download className="w-4 h-4" />
          {isDownloading ? "Generating PDF..." : "Download confirmation PDF"}
        </button>

        <div className="text-center">
          <button
              onClick={onStartOver}
              className="text-sm transition-colors"
              style={{ color: "#4a9c4a", background: "none", border: "none", cursor: "pointer" }}
          >
            Schedule another appointment
          </button>
        </div>
      </div>
  );
}
