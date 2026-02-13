interface AppointmentTypeStepProps {
  appointmentType: string;
  zipCode: string;
  onAppointmentTypeChange: (type: string) => void;
  onZipCodeChange: (zip: string) => void;
  onNext: () => void;
}

const appointmentTypes = [
  "New Account Opening",
  "Loan Consultation",
  "Mortgage Discussion",
  "Financial Planning",
  "Credit Card Application",
  "Investment Services",
  "Business Banking",
  "General Inquiry"
];

export function AppointmentTypeStep({
  appointmentType,
  zipCode,
  onAppointmentTypeChange,
  onZipCodeChange,
  onNext
}: AppointmentTypeStepProps) {
  const isValid = appointmentType && zipCode.length === 5 && /^\d+$/.test(zipCode);

  return (
    <div className="w-full max-w-md mx-auto">
      <h1 className="text-3xl mb-2 text-center">Schedule an Appointment</h1>
      <p className="text-gray-600 mb-8 text-center">Let's get started with your appointment request</p>
      
      <div className="space-y-6">
        <div>
          <label htmlFor="appointmentType" className="block mb-2 font-medium">
            What can we help you with?
          </label>
          <select
            id="appointmentType"
            value={appointmentType}
            onChange={(e) => onAppointmentTypeChange(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Select an appointment type</option>
            {appointmentTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="zipCode" className="block mb-2 font-medium">
            Your ZIP Code
          </label>
          <input
            id="zipCode"
            type="text"
            value={zipCode}
            onChange={(e) => onZipCodeChange(e.target.value)}
            placeholder="Enter 5-digit ZIP code"
            maxLength={5}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <button
          onClick={onNext}
          disabled={!isValid}
          className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          Find Nearby Branches
        </button>
      </div>
    </div>
  );
}