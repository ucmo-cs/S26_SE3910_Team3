import { useState, useEffect } from "react";
import { MapPin, Phone, Clock, AlertCircle, Loader } from "lucide-react";

interface Branch {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  distance: string;
  lat?: number;
  lng?: number;
  availableServices: string[];
}

interface BranchSelectionStepProps {
  zipCode: string;
  appointmentType: string;
  selectedBranch: Branch | null;
  onBranchSelect: (branch: Branch) => void;
  onNext: () => void;
  onBack: () => void;
}

export function BranchSelectionStep({
                                      zipCode,
                                      appointmentType,
                                      selectedBranch,
                                      onBranchSelect,
                                      onNext,
                                      onBack,
                                    }: BranchSelectionStepProps) {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBranches = async () => {
      setLoading(true);
      setError(null);
      try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";
        const response = await fetch(`${baseUrl}/appointments/branches?zipCode=${zipCode}`);
        if (!response.ok) throw new Error("Failed to fetch branches");
        const data: Branch[] = await response.json();
        setBranches(data);
      } catch (err) {
        setError("Unable to load branches. Please check your connection and try again.");
      } finally {
        setLoading(false);
      }
    };
    if (zipCode) fetchBranches();
  }, [zipCode]);

  return (
      <div className="w-full">
        <div className="mb-6">
          <p className="text-xs font-medium uppercase tracking-widest mb-1" style={{ color: "#4a9c4a" }}>Step 2 of 5</p>
          <h1 className="text-2xl font-medium" style={{ color: "#1a2e1a" }}>Select a branch</h1>
          <p className="text-sm mt-1" style={{ color: "#6b7c6b" }}>
            Showing locations near {zipCode} — sorted by distance
          </p>
        </div>

        {loading && (
            <div className="flex items-center justify-center py-16" style={{ color: "#6b7c6b" }}>
              <Loader className="w-5 h-5 animate-spin mr-2" style={{ color: "#4a9c4a" }} />
              <span className="text-sm">Finding branches near you...</span>
            </div>
        )}

        {error && !loading && (
            <div
                className="flex items-center gap-3 p-4 rounded-lg mb-4 text-sm"
                style={{ background: "#fef2f2", border: "1px solid #fecaca", color: "#b91c1c" }}
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
        )}

        {!loading && !error && (
            <div className="space-y-3 mb-4">
              {branches.map((branch) => {
                const canHandle = branch.availableServices?.includes(appointmentType);
                const isSelected = selectedBranch?.id === branch.id;

                return (
                    <div
                        key={branch.id}
                        onClick={() => canHandle && onBranchSelect(branch)}
                        className="rounded-xl p-5 transition-all"
                        style={{
                          background: isSelected ? "#f0f8f0" : canHandle ? "white" : "#faf9f7",
                          border: isSelected
                              ? "2px solid #2d6e2d"
                              : "1px solid #e8e4dc",
                          opacity: canHandle ? 1 : 0.6,
                          cursor: canHandle ? "pointer" : "not-allowed",
                        }}
                        onMouseEnter={(e) => {
                          if (canHandle && !isSelected) {
                            (e.currentTarget as HTMLDivElement).style.borderColor = "#4a9c4a";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (canHandle && !isSelected) {
                            (e.currentTarget as HTMLDivElement).style.borderColor = "#e8e4dc";
                          }
                        }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-medium text-sm" style={{ color: canHandle ? "#1a2e1a" : "#6b7c6b" }}>
                          {branch.name}
                        </h3>
                        <span
                            className="text-xs font-medium px-2 py-0.5 rounded-full ml-3 flex-shrink-0"
                            style={{
                              background: canHandle ? "#edf5ed" : "#f4f2ee",
                              color: canHandle ? "#2d6e2d" : "#8a9a8a",
                            }}
                        >
                    {branch.distance}
                  </span>
                      </div>

                      <div className="flex items-start gap-1 mb-3">
                        <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: "#8a9a8a" }} />
                        <span className="text-xs" style={{ color: "#6b7c6b" }}>
                    {branch.address}, {branch.city}, {branch.state} {branch.zip}
                  </span>
                      </div>

                      {!canHandle && (
                          <div
                              className="flex items-center gap-2 text-xs rounded-md px-3 py-2 mb-3"
                              style={{
                                background: "#fdf0e0",
                                border: "1px solid #f0d5a0",
                                color: "#8a5a2a",
                              }}
                          >
                            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                            This branch does not offer {appointmentType} appointments
                          </div>
                      )}

                      <div className="flex items-center gap-5">
                        <div className="flex items-center gap-1.5">
                          <Phone className="w-3 h-3" style={{ color: "#8a9a8a" }} />
                          <span className="text-xs" style={{ color: "#8a9a8a" }}>{branch.phone}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3 h-3" style={{ color: "#8a9a8a" }} />
                          <span className="text-xs" style={{ color: "#8a9a8a" }}>Mon–Fri 9AM–5PM</span>
                        </div>
                      </div>
                    </div>
                );
              })}
            </div>
        )}

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
              disabled={!selectedBranch || loading}
              className="flex-2 h-12 rounded-lg text-sm font-medium text-white transition-colors"
              style={{
                flex: 2,
                background: selectedBranch && !loading ? "#2d6e2d" : "#c8c4bc",
                cursor: selectedBranch && !loading ? "pointer" : "not-allowed",
              }}
          >
            Select time slot →
          </button>
        </div>
      </div>
  );
}

export type { Branch };
