import { User, Mail, Phone } from "lucide-react";

interface UserInfo {
  name: string;
  email: string;
  phone: string;
}

interface UserInfoStepProps {
  userInfo: UserInfo;
  onUserInfoChange: (info: UserInfo) => void;
  onNext: () => void;
  onBack: () => void;
}

export function UserInfoStep({
  userInfo,
  onUserInfoChange,
  onNext,
  onBack
}: UserInfoStepProps) {
  const handleChange = (field: keyof UserInfo, value: string) => {
    onUserInfoChange({ ...userInfo, [field]: value });
  };

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
  };

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhoneNumber(value);
    handleChange('phone', formatted);
  };

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidPhone = (phone: string) => {
    const numbers = phone.replace(/\D/g, '');
    return numbers.length === 10;
  };

  const isValid = 
    userInfo.name.trim().length > 0 &&
    isValidEmail(userInfo.email) &&
    isValidPhone(userInfo.phone);

  return (
    <div className="w-full max-w-md mx-auto">
      <h1 className="text-3xl mb-2 text-center">Your Information</h1>
      <p className="text-gray-600 mb-8 text-center">Please provide your contact details</p>
      
      <div className="space-y-6">
        <div>
          <label htmlFor="name" className="block mb-2 font-medium">
            Full Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              id="name"
              type="text"
              value={userInfo.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="John Doe"
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block mb-2 font-medium">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              id="email"
              type="email"
              value={userInfo.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="john.doe@example.com"
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          {userInfo.email && !isValidEmail(userInfo.email) && (
            <p className="text-red-500 text-sm mt-1">Please enter a valid email address</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block mb-2 font-medium">
            Phone Number
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              id="phone"
              type="tel"
              value={userInfo.phone}
              onChange={(e) => handlePhoneChange(e.target.value)}
              placeholder="(555) 123-4567"
              maxLength={14}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          {userInfo.phone && !isValidPhone(userInfo.phone) && (
            <p className="text-red-500 text-sm mt-1">Please enter a valid 10-digit phone number</p>
          )}
        </div>
      </div>

      <div className="flex gap-4 mt-8">
        <button
          onClick={onBack}
          className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!isValid}
          className="flex-1 bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          Review Appointment
        </button>
      </div>
    </div>
  );
}

export type { UserInfo };