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

export function UserInfoStep({ userInfo, onUserInfoChange, onNext, onBack }: UserInfoStepProps) {
  const handleChange = (field: keyof UserInfo, value: string) => {
    onUserInfoChange({ ...userInfo, [field]: value });
  };

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
  };

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPhone = (phone: string) => phone.replace(/\D/g, "").length === 10;

  const isValid =
      userInfo.name.trim().length > 0 &&
      isValidEmail(userInfo.email) &&
      isValidPhone(userInfo.phone);

  const inputStyle = {
    background: "#faf9f7",
    border: "1px solid #ddd9d0",
    color: "#1a2e1a",
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = "#4a9c4a";
    e.target.style.background = "white";
    e.target.style.boxShadow = "0 0 0 3px rgba(74,156,74,0.08)";
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = "#ddd9d0";
    e.target.style.background = "#faf9f7";
    e.target.style.boxShadow = "none";
  };

  return (
      <div className="w-full">
        <div className="mb-6">
          <p className="text-xs font-medium uppercase tracking-widest mb-1" style={{ color: "#4a9c4a" }}>Step 4 of 5</p>
          <h1 className="text-2xl font-medium" style={{ color: "#1a2e1a" }}>Your information</h1>
          <p className="text-sm mt-1" style={{ color: "#6b7c6b" }}>We'll send your confirmation to these details</p>
        </div>

        <div className="rounded-xl p-6 mb-4" style={{ background: "white", border: "1px solid #e8e4dc" }}>
          <div className="mb-5">
            <label className="block text-xs font-medium uppercase tracking-wide mb-2" style={{ color: "#3d5a3d" }}>
              Full name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#8a9a8a" }} />
              <input
                  type="text"
                  value={userInfo.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="Your full name"
                  className="w-full h-11 pl-10 pr-4 rounded-lg text-sm outline-none transition-all"
                  style={inputStyle}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
              />
            </div>
          </div>

          <div className="mb-5">
            <label className="block text-xs font-medium uppercase tracking-wide mb-2" style={{ color: "#3d5a3d" }}>
              Email address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#8a9a8a" }} />
              <input
                  type="email"
                  value={userInfo.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="you@example.com"
                  className="w-full h-11 pl-10 pr-4 rounded-lg text-sm outline-none transition-all"
                  style={inputStyle}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
              />
            </div>
            {userInfo.email && !isValidEmail(userInfo.email) && (
                <p className="text-xs mt-1.5" style={{ color: "#b91c1c" }}>Please enter a valid email address</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium uppercase tracking-wide mb-2" style={{ color: "#3d5a3d" }}>
              Phone number
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#8a9a8a" }} />
              <input
                  type="tel"
                  value={userInfo.phone}
                  onChange={(e) => handleChange("phone", formatPhoneNumber(e.target.value))}
                  placeholder="(555) 123-4567"
                  maxLength={14}
                  className="w-full h-11 pl-10 pr-4 rounded-lg text-sm outline-none transition-all"
                  style={inputStyle}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
              />
            </div>
            {userInfo.phone && !isValidPhone(userInfo.phone) && (
                <p className="text-xs mt-1.5" style={{ color: "#b91c1c" }}>Please enter a valid 10-digit phone number</p>
            )}
          </div>
        </div>

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
              disabled={!isValid}
              className="h-12 rounded-lg text-sm font-medium text-white transition-colors"
              style={{
                flex: 2,
                background: isValid ? "#2d6e2d" : "#c8c4bc",
                cursor: isValid ? "pointer" : "not-allowed",
              }}
          >
            Review appointment →
          </button>
        </div>
      </div>
  );
}

export type { UserInfo };
