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
import type { AppointmentResponse } from "../services/appointmentService";

const stepTitles = [
  "Details",
  "Branch",
  "Time",
  "Your Info",
  "Review",
];

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [appointmentType, setAppointmentType] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo>({ name: "", email: "", phone: "" });
  const [confirmedAppointment, setConfirmedAppointment] = useState<AppointmentResponse | null>(null);

  const handleStartOver = () => {
    setCurrentStep(1);
    setAppointmentType("");
    setZipCode("");
    setSelectedBranch(null);
    setSelectedTimeSlot(null);
    setUserInfo({ name: "", email: "", phone: "" });
    setConfirmedAppointment(null);
  };

  const handleConfirmAppointment = (appointmentData: AppointmentResponse) => {
    setConfirmedAppointment(appointmentData);
    setCurrentStep(6);
  };

  return (
      <div className="min-h-screen flex flex-col" style={{ background: "#f4f2ee" }}>

        {/* Top navigation bar */}
        <div style={{ background: "#1a2e1a" }} className="flex items-center justify-between px-8 h-14 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div
                className="w-7 h-7 rounded flex items-center justify-center text-white text-sm font-medium"
                style={{ background: "#4a9c4a" }}
            >
              C
            </div>
            <span className="text-white text-sm font-medium tracking-wide">Commerce Bank</span>
          </div>
          <span className="text-xs" style={{ color: "#8aab8a" }}>Branch Appointment Scheduling</span>
        </div>

        {/* Hero section */}
        <div style={{ background: "#1a2e1a" }} className="text-center px-8 pt-8 pb-10 relative overflow-hidden">
          <div
              className="absolute rounded-full"
              style={{
                top: -60, right: -60, width: 200, height: 200,
                background: "rgba(74,156,74,0.07)"
              }}
          />
          <div
              className="absolute rounded-full"
              style={{
                bottom: -40, left: -40, width: 150, height: 150,
                background: "rgba(74,156,74,0.05)"
              }}
          />
          <p className="text-xs font-medium tracking-widest uppercase mb-2" style={{ color: "#4a9c4a" }}>
            Branch Services
          </p>
          <h1 className="text-2xl font-medium text-white mb-1">Schedule an Appointment</h1>
          <p className="text-sm" style={{ color: "#8aab8a" }}>Meet with a banker at a location near you</p>
        </div>

        {/* Stepper — stays in dark header, hidden on success step */}
        {currentStep < 6 && (
            <div style={{ background: "#1a2e1a", borderBottom: "1px solid #2d4a2d" }} className="px-8 pb-6">
              <div className="max-w-xl mx-auto flex items-center justify-between">
                {stepTitles.map((title, index) => {
                  const stepNumber = index + 1;
                  const isActive = stepNumber === currentStep;
                  const isCompleted = stepNumber < currentStep;
                  return (
                      <div key={stepNumber} className="flex items-center flex-1">
                        <div className="flex flex-col items-center flex-1">
                          <div
                              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all"
                              style={{
                                background: isCompleted ? "#4a9c4a" : isActive ? "white" : "transparent",
                                border: isCompleted ? "1.5px solid #4a9c4a" : isActive ? "1.5px solid white" : "1.5px solid #2d4a2d",
                                color: isCompleted ? "white" : isActive ? "#1a2e1a" : "#4a6a4a",
                              }}
                          >
                            {isCompleted ? "✓" : stepNumber}
                          </div>
                          <span
                              className="text-xs mt-1.5 text-center"
                              style={{
                                color: isCompleted ? "#4a9c4a" : isActive ? "white" : "#4a6a4a",
                                fontWeight: isActive ? 500 : 400,
                              }}
                          >
                      {title}
                    </span>
                        </div>
                        {index < stepTitles.length - 1 && (
                            <div
                                className="flex-1 h-px mx-1 mb-5"
                                style={{ background: isCompleted ? "#4a9c4a" : "#2d4a2d" }}
                            />
                        )}
                      </div>
                  );
                })}
              </div>
            </div>
        )}

        {/* Main content */}
        <div className="flex-1 flex justify-center px-4 py-8">
          <div className="w-full max-w-2xl">
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
                    appointmentType={appointmentType}
                    selectedBranch={selectedBranch}
                    onBranchSelect={setSelectedBranch}
                    onNext={() => setCurrentStep(3)}
                    onBack={() => setCurrentStep(1)}
                />
            )}
            {currentStep === 3 && (
                <TimeSlotStep
                    branchId={selectedBranch?.id || ""}
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
                    onConfirm={handleConfirmAppointment}
                    onBack={() => setCurrentStep(4)}
                />
            )}
            {currentStep === 6 && confirmedAppointment && (
                <SuccessStep
                    appointmentType={appointmentType}
                    branch={selectedBranch}
                    timeSlot={selectedTimeSlot}
                    confirmationNumber={confirmedAppointment.confirmationNumber}
                    appointmentId={confirmedAppointment.id}
                    userInfo={userInfo}
                    onStartOver={handleStartOver}
                />
            )}
          </div>
        </div>

        {/* Footer */}
        <div
            className="text-center py-5 text-xs border-t"
            style={{ background: "white", borderColor: "#e8e4dc", color: "#8a9a8a" }}
        >
          Need help? Call{" "}
          <a href="tel:5551002000" style={{ color: "#2d6e2d" }}>(555) 100-2000</a>
          {" "}or email{" "}
          <a href="mailto:support@commercebank.com" style={{ color: "#2d6e2d" }}>support@commercebank.com</a>
        </div>
      </div>
  );
}
