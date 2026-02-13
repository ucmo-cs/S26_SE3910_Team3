import { useState } from "react";
import { AppointmentTypeStep } from "./components/AppointmentTypeStep";
import { BranchSelectionStep } from "./components/BranchSelectionStep";
import { TimeSlotStep } from "./components/TimeSlotStep";
import { UserInfoStep } from "./components/UserInfoStep";
import { ConfirmationStep } from "./components/ConfirmationStep";
import { SuccessStep } from "./components/SuccessStep";
import type { Branch } from "./components/BranchSelectionStep";
import type { TimeSlot } from "./components/TimeSlotStep";
import type { UserInfo } from "./components/UserInfoStep";

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [appointmentType, setAppointmentType] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "",
    email: "",
    phone: ""
  });

  const handleStartOver = () => {
    setCurrentStep(1);
    setAppointmentType("");
    setZipCode("");
    setSelectedBranch(null);
    setSelectedTimeSlot(null);
    setUserInfo({ name: "", email: "", phone: "" });
  };

  const stepTitles = [
    "Appointment Details",
    "Select Branch",
    "Choose Time",
    "Your Information",
    "Review",
    "Confirmed"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl mb-2 text-green-900 font-bold">Commerce Bank</h1>
          <p className="text-gray-600">Schedule Your Branch Appointment</p>
        </div>

        {/* Progress Indicator */}
        {currentStep < 6 && (
          <div className="max-w-4xl mx-auto mb-12">
            <div className="flex items-center justify-between">
              {stepTitles.slice(0, 5).map((title, index) => {
                const stepNumber = index + 1;
                const isActive = stepNumber === currentStep;
                const isCompleted = stepNumber < currentStep;
                
                return (
                  <div key={stepNumber} className="flex items-center flex-1">
                    <div className="flex flex-col items-center flex-1">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                          isActive
                            ? "bg-green-600 text-white scale-110"
                            : isCompleted
                            ? "bg-green-500 text-white"
                            : "bg-gray-300 text-gray-600"
                        }`}
                      >
                        {isCompleted ? "✓" : stepNumber}
                      </div>
                      <span
                        className={`text-xs mt-2 text-center ${
                          isActive ? "font-semibold text-green-900" : "text-gray-600"
                        }`}
                      >
                        {title}
                      </span>
                    </div>
                    {index < 4 && (
                      <div
                        className={`h-1 flex-1 mx-2 transition-all ${
                          isCompleted ? "bg-green-500" : "bg-gray-300"
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          {currentStep === 1 && (
            <AppointmentTypeStep
              appointmentType={appointmentType}
              zipCode={zipCode}
              onAppointmentTypeChange={setAppointmentType}
              onZipCodeChange={setZipCode}
              onNext={() => setCurrentStep(2)}
            />
          )}

          {currentStep === 2 && (
            <BranchSelectionStep
              zipCode={zipCode}
              selectedBranch={selectedBranch}
              onBranchSelect={setSelectedBranch}
              onNext={() => setCurrentStep(3)}
              onBack={() => setCurrentStep(1)}
            />
          )}

          {currentStep === 3 && (
            <TimeSlotStep
              selectedTimeSlot={selectedTimeSlot}
              onTimeSlotSelect={setSelectedTimeSlot}
              onNext={() => setCurrentStep(4)}
              onBack={() => setCurrentStep(2)}
            />
          )}

          {currentStep === 4 && (
            <UserInfoStep
              userInfo={userInfo}
              onUserInfoChange={setUserInfo}
              onNext={() => setCurrentStep(5)}
              onBack={() => setCurrentStep(3)}
            />
          )}

          {currentStep === 5 && (
            <ConfirmationStep
              appointmentType={appointmentType}
              branch={selectedBranch}
              timeSlot={selectedTimeSlot}
              userInfo={userInfo}
              onConfirm={() => setCurrentStep(6)}
              onBack={() => setCurrentStep(4)}
            />
          )}

          {currentStep === 6 && (
            <SuccessStep
              appointmentType={appointmentType}
              branch={selectedBranch}
              timeSlot={selectedTimeSlot}
              onStartOver={handleStartOver}
            />
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-600 text-sm">
          <p>Need help? Call us at (555) 100-2000 or email <span className="font-semibold text-green-700">support@commercebank.com</span></p>
        </div>
      </div>
    </div>
  );
}