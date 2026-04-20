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
    "General Inquiry",
];

export function AppointmentTypeStep({
                                        appointmentType,
                                        zipCode,
                                        onAppointmentTypeChange,
                                        onZipCodeChange,
                                        onNext,
                                    }: AppointmentTypeStepProps) {
    const isValid = appointmentType && zipCode.length === 5 && /^\d+$/.test(zipCode);

    return (
        <div className="w-full">
            <div className="mb-6">
                <p className="text-xs font-medium uppercase tracking-widest mb-1" style={{ color: "#4a9c4a" }}>Step 1 of 5</p>
                <h1 className="text-2xl font-medium" style={{ color: "#1a2e1a" }}>Appointment details</h1>
                <p className="text-sm mt-1" style={{ color: "#6b7c6b" }}>Tell us what you need help with</p>
            </div>

            <div
                className="rounded-xl p-6 mb-4"
                style={{ background: "white", border: "1px solid #e8e4dc" }}
            >
                <div className="mb-5">
                    <label className="block text-xs font-medium uppercase tracking-wide mb-2" style={{ color: "#3d5a3d" }}>
                        What can we help you with?
                    </label>
                    <div className="relative">
                        <select
                            value={appointmentType}
                            onChange={(e) => onAppointmentTypeChange(e.target.value)}
                            className="w-full h-11 rounded-lg px-4 text-sm appearance-none outline-none transition-all"
                            style={{
                                background: appointmentType ? "white" : "#faf9f7",
                                border: "1px solid #ddd9d0",
                                color: appointmentType ? "#1a2e1a" : "#8a9a8a",
                            }}
                            onFocus={(e) => {
                                e.target.style.borderColor = "#4a9c4a";
                                e.target.style.boxShadow = "0 0 0 3px rgba(74,156,74,0.08)";
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = "#ddd9d0";
                                e.target.style.boxShadow = "none";
                            }}
                        >
                            <option value="">Select an appointment type</option>
                            {appointmentTypes.map((type) => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                        <svg
                            className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
                            width="12" height="8" viewBox="0 0 12 8" fill="none"
                        >
                            <path d="M1 1l5 5 5-5" stroke="#6b7c6b" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-medium uppercase tracking-wide mb-2" style={{ color: "#3d5a3d" }}>
                        Your ZIP code
                    </label>
                    <input
                        type="text"
                        value={zipCode}
                        onChange={(e) => onZipCodeChange(e.target.value)}
                        placeholder="Enter 5-digit ZIP code"
                        maxLength={5}
                        className="w-full h-11 rounded-lg px-4 text-sm outline-none transition-all"
                        style={{
                            background: "#faf9f7",
                            border: "1px solid #ddd9d0",
                            color: "#1a2e1a",
                        }}
                        onFocus={(e) => {
                            e.target.style.borderColor = "#4a9c4a";
                            e.target.style.background = "white";
                            e.target.style.boxShadow = "0 0 0 3px rgba(74,156,74,0.08)";
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = "#ddd9d0";
                            e.target.style.background = "#faf9f7";
                            e.target.style.boxShadow = "none";
                        }}
                    />
                </div>
            </div>

            <button
                onClick={onNext}
                disabled={!isValid}
                className="w-full h-12 rounded-lg text-sm font-medium text-white transition-colors"
                style={{
                    background: isValid ? "#2d6e2d" : "#c8c4bc",
                    cursor: isValid ? "pointer" : "not-allowed",
                }}
            >
                Find nearby branches →
            </button>
        </div>
    );
}
