import { MapPin, Phone, Clock } from "lucide-react";

interface Branch {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  distance: string;
}

interface BranchSelectionStepProps {
  zipCode: string;
  selectedBranch: Branch | null;
  onBranchSelect: (branch: Branch) => void;
  onNext: () => void;
  onBack: () => void;
}

// Mock branch data based on zip code
const getBranchesForZip = (zip: string): Branch[] => {
  return [
    {
      id: "1",
      name: "Downtown Financial Center",
      address: "1200 Main Street",
      city: "Kansas City",
      state: "MO",
      zip: "64105",
      phone: "(816) 555-4567",
      distance: "0.5 miles"
    },
    {
      id: "2",
      name: "Country Club Plaza Branch",
      address: "4740 Broadway Boulevard",
      city: "Kansas City",
      state: "MO",
      zip: "64112",
      phone: "(816) 555-5678",
      distance: "1.2 miles"
    },
    {
      id: "3",
      name: "Northland Office",
      address: "8551 N Oak Trafficway",
      city: "Kansas City",
      state: "MO",
      zip: "64155",
      phone: "(816) 555-6789",
      distance: "2.8 miles"
    },
    {
      id: "4",
      name: "Overland Park Branch",
      address: "11920 Metcalf Avenue",
      city: "Overland Park",
      state: "KS",
      zip: "66213",
      phone: "(913) 555-7890",
      distance: "3.5 miles"
    }
  ];
};

export function BranchSelectionStep({
  zipCode,
  selectedBranch,
  onBranchSelect,
  onNext,
  onBack
}: BranchSelectionStepProps) {
  const branches = getBranchesForZip(zipCode);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h1 className="text-3xl mb-2 text-center">Select a Branch</h1>
      <p className="text-gray-600 mb-8 text-center">Choose your preferred location near {zipCode}</p>
      
      <div className="space-y-4 mb-8">
        {branches.map((branch) => (
          <div
            key={branch.id}
            onClick={() => onBranchSelect(branch)}
            className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${
              selectedBranch?.id === branch.id
                ? 'border-green-600 bg-green-50'
                : 'border-gray-200 hover:border-green-300 bg-white'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-lg mb-1">{branch.name}</h3>
                <div className="flex items-center text-gray-600 text-sm mb-1">
                  <MapPin className="w-4 h-4 mr-1" />
                  {branch.address}, {branch.city}, {branch.state} {branch.zip}
                </div>
              </div>
              <span className="text-green-600 text-sm font-medium">{branch.distance}</span>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-gray-600">
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
        ))}
      </div>

      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!selectedBranch}
          className="flex-1 bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          Select Time Slot
        </button>
      </div>
    </div>
  );
}

export type { Branch };