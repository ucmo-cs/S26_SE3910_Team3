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
                                      onBack
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

        if (!response.ok) {
          throw new Error("Failed to fetch branches");
        }

        const data: Branch[] = await response.json();
        setBranches(data);
      } catch (err) {
        setError("Unable to load branches. Please check your connection and try again.");
        console.error("Error fetching branches:", err);
      } finally {
        setLoading(false);
      }
    };

    if (zipCode) {
      fetchBranches();
    }
  }, [zipCode]);

  return (
      <div className="w-full max-w-2xl mx-auto">
        <h1 className="text-3xl mb-2 text-center">Select a Branch</h1>
        <p className="text-gray-600 mb-8 text-center">
          Choose your preferred location near {zipCode}
        </p>

        {/* Loading state */}
        {loading && (
            <div className="flex flex-col items-center justify-center py-16 text-gray-500">
              <Loader className="w-8 h-8 animate-spin mb-3 text-green-600" />
              <p>Finding branches near you...</p>
            </div>
        )}

        {/* Error state */}
        {error && !loading && (
            <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg mb-6 text-red-700">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p>{error}</p>
            </div>
        )}

        {/* Branch list */}
        {!loading && !error && (
            <div className="space-y-4 mb-8">
              {branches.map((branch) => {
                const canHandleAppointment = branch.availableServices?.includes(appointmentType);

                return (
                    <div
                        key={branch.id}
                        onClick={() => canHandleAppointment && onBranchSelect(branch)}
                        className={`p-6 border-2 rounded-lg transition-all ${
                            !canHandleAppointment
                                ? "border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed"
                                : selectedBranch?.id === branch.id
                                    ? "border-green-600 bg-green-50 cursor-pointer"
                                    : "border-gray-200 hover:border-green-300 bg-white cursor-pointer"
                        }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3
                              className={`font-semibold text-lg mb-1 ${
                                  !canHandleAppointment ? "text-gray-500" : ""
                              }`}
                          >
                            {branch.name}
                          </h3>
                          <div
                              className={`flex items-center text-sm mb-1 ${
                                  !canHandleAppointment ? "text-gray-400" : "text-gray-600"
                              }`}
                          >
                            <MapPin className="w-4 h-4 mr-1" />
                            {branch.address}, {branch.city}, {branch.state} {branch.zip}
                          </div>
                        </div>
                        <span
                            className={`text-sm font-medium ${
                                !canHandleAppointment ? "text-gray-400" : "text-green-600"
                            }`}
                        >
                    {branch.distance}
                  </span>
                      </div>

                      {!canHandleAppointment && (
                          <div className="mb-3 flex items-center gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded px-3 py-2">
                            <AlertCircle className="w-4 h-4 flex-shrink-0" />
                            <span>
                      This branch does not offer {appointmentType} appointments
                    </span>
                          </div>
                      )}

                      <div
                          className={`flex items-center gap-6 text-sm ${
                              !canHandleAppointment ? "text-gray-400" : "text-gray-600"
                          }`}
                      >
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 mr-1" />
                          {branch.phone}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          Mon-Fri: 9AM - 5PM
                        </div>
                      </div>
                    </div>
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
              disabled={!selectedBranch || loading}
              className="flex-1 bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Select Time Slot
          </button>
        </div>
      </div>
  );
}

export type { Branch };