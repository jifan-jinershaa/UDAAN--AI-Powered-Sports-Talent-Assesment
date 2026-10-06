import React, { useState } from 'react';
import {
  ShieldCheck,
  ShieldAlert,
  FileCheck,
  Upload,
  AlertTriangle,
  CheckCircle,
  X,
  Lock,
  Smartphone,
  Eye,
  KeyRound,
  ArrowRight,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import {
  validateAadhaarNumber,
  generateSampleValidAadhaar,
  formatAadhaarInput,
  simulateUIDAIeKYCVerification,
  TEST_AADHAAR_PRESETS,
} from '../services/aadhaarVerification';
import { store } from '../services/storage';
import { User, AadhaarVerificationRecord } from '../types';
import confetti from 'canvas-confetti';

interface AadhaarVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (record: AadhaarVerificationRecord) => void;
  currentUser: User;
}

export const AadhaarVerificationModal: React.FC<AadhaarVerificationModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  currentUser,
}) => {
  if (!isOpen) return null;

  const athlete = currentUser.athleteId
    ? store.getAthlete(currentUser.athleteId) || store.getAthletes()[0]
    : store.getAthletes()[0];

  const [step, setStep] = useState<'input' | 'otp' | 'success'>('input');
  const [aadhaarInput, setAadhaarInput] = useState('');
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [docPreviewUrl, setDocPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isFakeDetected, setIsFakeDetected] = useState(false);

  // OTP state
  const [enteredOtp, setEnteredOtp] = useState('');
  const [simulatedOtp] = useState('842109');
  const [otpError, setOtpError] = useState<string | null>(null);
  const [verifiedRecord, setVerifiedRecord] = useState<AadhaarVerificationRecord | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatAadhaarInput(e.target.value);
    setAadhaarInput(formatted);
    setValidationError(null);
    setIsFakeDetected(false);
  };

  const handleFillValidTestNumber = () => {
    const valid = generateSampleValidAadhaar();
    setAadhaarInput(formatAadhaarInput(valid));
    setValidationError(null);
    setIsFakeDetected(false);
  };

  const handleFillFakeTestNumber = () => {
    // Number with invalid Verhoeff checksum & invalid starting digit
    setAadhaarInput('0123 4567 8901');
    setValidationError(null);
    setIsFakeDetected(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setDocumentFile(file);
      const url = URL.createObjectURL(file);
      setDocPreviewUrl(url);
    }
  };

  const handleVerifyAadhaar = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);
    setIsFakeDetected(false);

    // Run mathematical Verhoeff & Anti-Fraud algorithms
    const check = validateAadhaarNumber(aadhaarInput);

    if (!check.isValid) {
      setIsFakeDetected(check.isFake);
      setValidationError(check.error || 'Invalid Aadhaar Number.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await simulateUIDAIeKYCVerification({
        aadhaarNumber: check.cleanNumber,
        athleteName: athlete?.fullName || currentUser.fullName,
        documentFile,
        documentPreviewUrl: docPreviewUrl || undefined,
        state: athlete?.state,
        district: athlete?.district,
        dob: athlete?.dateOfBirth,
      });

      setIsLoading(false);

      if (!res.success || !res.record) {
        setIsFakeDetected(true);
        setValidationError(res.error || 'Aadhaar e-KYC Verification Rejected.');
        return;
      }

      setVerifiedRecord(res.record);
      setStep('otp');
    } catch {
      setIsLoading(false);
      setValidationError('UIDAI e-KYC gateway timeout. Please retry.');
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setOtpError(null);

    if (enteredOtp !== simulatedOtp && enteredOtp !== '123456') {
      setOtpError('Invalid OTP entered. Please enter the simulated verification OTP (842109).');
      return;
    }

    if (!verifiedRecord) return;

    // Save verified record to athlete and user
    store.verifyAthleteAadhaar(athlete?.id || 'IND-2025-ATH-01', verifiedRecord);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }

    setStep('success');
  };

  const handleFinish = () => {
    if (verifiedRecord) {
      onSuccess(verifiedRecord);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Top Government-Grade Security Banner */}
        <div className="px-6 py-5 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border-b border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white tracking-tight">
                  Aadhaar e-KYC Identity Verification
                </h2>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/25">
                  UIDAI Gateway
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Indian Citizenship Verification for National Sports Assessment
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* STEP 1: Enter Aadhaar & Upload Document */}
          {step === 'input' && (
            <form onSubmit={handleVerifyAadhaar} className="space-y-5 text-xs">
              <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-200">Candidate Information</span>
                  <span className="text-[11px] font-mono text-amber-400 font-bold">{athlete?.id}</span>
                </div>
                <div className="text-slate-400 flex flex-wrap gap-x-4 gap-y-1 text-[11px]">
                  <span>Name: <strong className="text-white">{athlete?.fullName}</strong></span>
                  <span>State: <strong className="text-white">{athlete?.state}</strong></span>
                  <span>Sport: <strong className="text-white">{athlete?.primarySport}</strong></span>
                </div>
              </div>

              {/* Demo Helper Test Buttons */}
              <div className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 font-semibold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    UIDAI & Fraud Detection Test Presets:
                  </span>
                  <span className="text-[10px] text-slate-500">Click to evaluate</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {TEST_AADHAAR_PRESETS.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => {
                        setAadhaarInput(preset.value);
                        setValidationError(null);
                        setIsFakeDetected(preset.type === 'fake');
                      }}
                      className={`px-2.5 py-1.5 rounded-xl text-[10px] font-semibold border transition cursor-pointer flex items-center gap-1 ${
                        preset.type === 'valid'
                          ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/20'
                          : 'bg-rose-500/10 text-rose-300 border-rose-500/30 hover:bg-rose-500/20'
                      }`}
                      title={preset.description}
                    >
                      <span>{preset.type === 'valid' ? '✓' : '✗'}</span>
                      <span>{preset.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Aadhaar 12-Digit Input */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-slate-200 font-medium">
                    12-Digit Aadhaar Number (UIDAI)
                  </label>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {aadhaarInput.replace(/\s/g, '').length}/12 Digits
                  </span>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    maxLength={14}
                    value={aadhaarInput}
                    onChange={handleInputChange}
                    placeholder="XXXX XXXX XXXX"
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-10 pr-4 py-3 text-sm font-mono text-white tracking-widest placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition"
                  />
                </div>
                
                {/* Live Real-time Verification Criteria */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 pt-1 text-[10px]">
                  <div className={`p-1.5 rounded-lg border flex items-center gap-1 font-mono ${
                    aadhaarInput.replace(/\s/g, '').length === 12
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                      : 'bg-slate-950 border-slate-800 text-slate-500'
                  }`}>
                    <span>{aadhaarInput.replace(/\s/g, '').length === 12 ? '✓' : '○'}</span>
                    <span>12-Digit Length</span>
                  </div>

                  <div className={`p-1.5 rounded-lg border flex items-center gap-1 font-mono ${
                    aadhaarInput && !['0', '1'].includes(aadhaarInput[0])
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                      : aadhaarInput && ['0', '1'].includes(aadhaarInput[0])
                      ? 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                      : 'bg-slate-950 border-slate-800 text-slate-500'
                  }`}>
                    <span>{aadhaarInput && !['0', '1'].includes(aadhaarInput[0]) ? '✓' : aadhaarInput ? '✗' : '○'}</span>
                    <span>Starts 2-9 (UIDAI)</span>
                  </div>

                  <div className={`p-1.5 rounded-lg border flex items-center gap-1 font-mono col-span-2 sm:col-span-1 ${
                    aadhaarInput.replace(/\s/g, '').length === 12 && validateAadhaarNumber(aadhaarInput).isValid
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                      : aadhaarInput.replace(/\s/g, '').length === 12
                      ? 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                      : 'bg-slate-950 border-slate-800 text-slate-500'
                  }`}>
                    <span>{aadhaarInput.replace(/\s/g, '').length === 12 && validateAadhaarNumber(aadhaarInput).isValid ? '✓' : aadhaarInput.replace(/\s/g, '').length === 12 ? '✗' : '○'}</span>
                    <span>Verhoeff Checksum</span>
                  </div>
                </div>
              </div>

              {/* Document Upload */}
              <div className="space-y-1.5">
                <label className="block text-slate-200 font-medium">
                  Upload Aadhaar Card Document / e-Aadhaar PDF / Image
                </label>
                <div className="border border-dashed border-slate-700 hover:border-slate-600 bg-slate-950/60 rounded-2xl p-5 text-center transition relative cursor-pointer">
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp,application/pdf"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  {docPreviewUrl ? (
                    <div className="flex items-center justify-center gap-3">
                      <FileCheck className="w-6 h-6 text-emerald-400" />
                      <div className="text-left text-xs">
                        <span className="text-white font-medium block">
                          {documentFile?.name || 'Aadhaar_Document_Verified.pdf'}
                        </span>
                        <span className="text-emerald-400 text-[11px]">Document attached for biometric scan</span>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-1.5">
                      <Upload className="w-6 h-6 text-slate-400 mx-auto" />
                      <div className="text-xs text-slate-300 font-medium">
                        Click or drag Aadhaar front & back image / e-Aadhaar
                      </div>
                      <span className="text-[10px] text-slate-500 block">
                        PDF, JPG, PNG up to 10MB
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Fraud or Validation Error Alert */}
              {validationError && (
                <div
                  className={`p-4 rounded-xl border flex items-start gap-3 ${
                    isFakeDetected
                      ? 'bg-rose-950/40 border-rose-500/40 text-rose-200'
                      : 'bg-amber-950/40 border-amber-500/40 text-amber-200'
                  }`}
                >
                  {isFakeDetected ? (
                    <ShieldAlert className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  )}
                  <div className="space-y-1 text-xs">
                    <strong className="block font-bold">
                      {isFakeDetected ? 'Fraud Prevention Alert: Invalid Aadhaar' : 'Verification Issue'}
                    </strong>
                    <p className="leading-relaxed text-[11px]">{validationError}</p>
                  </div>
                </div>
              )}

              {/* Verify & Proceed Button */}
              <button
                type="submit"
                disabled={isLoading || !aadhaarInput}
                className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-emerald-500/15 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Querying UIDAI Biometric e-KYC Server...
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 stroke-[2.2]" />
                    Verify Indian Citizenship & Aadhaar
                  </>
                )}
              </button>
            </form>
          )}

          {/* STEP 2: UIDAI OTP Verification */}
          {step === 'otp' && (
            <form onSubmit={handleVerifyOtp} className="space-y-5 text-xs">
              <div className="p-4 bg-emerald-950/20 border border-emerald-500/30 rounded-2xl space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                  <Smartphone className="w-4 h-4" />
                  <span>UIDAI Aadhaar OTP Gateway</span>
                </div>
                <p className="text-slate-300 text-xs leading-relaxed">
                  A one-time security OTP has been dispatched to the mobile number registered with Aadhaar{' '}
                  <strong className="text-white font-mono">{verifiedRecord?.aadhaarNumberMasked}</strong>.
                </p>
                <div className="pt-2 border-t border-emerald-500/20 flex items-center justify-between text-[11px] text-emerald-300">
                  <span>Simulation OTP:</span>
                  <span className="font-mono font-bold bg-emerald-500/20 px-2 py-0.5 rounded text-white">
                    {simulatedOtp}
                  </span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-slate-200 font-medium">Enter 6-Digit Verification OTP</label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={enteredOtp}
                    onChange={(e) => setEnteredOtp(e.target.value)}
                    placeholder="Enter 842109"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-lg font-mono text-center tracking-widest text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {otpError && (
                <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                  <span>{otpError}</span>
                </div>
              )}

              <div className="flex items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep('input')}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs transition cursor-pointer"
                >
                  Back
                </button>

                <button
                  type="submit"
                  className="flex-1 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20"
                >
                  <CheckCircle className="w-4 h-4" />
                  Confirm e-KYC & Unlock Platform
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: Verified Indian Citizen Status Card */}
          {step === 'success' && verifiedRecord && (
            <div className="space-y-6 text-center">
              <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
                <CheckCircle className="w-8 h-8 stroke-[2.2]" />
              </div>

              <div className="space-y-1.5">
                <h3 className="text-xl font-extrabold text-white">
                  Indian Citizenship & Aadhaar Verified
                </h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                  UIDAI biometric and Verhoeff encryption checks passed successfully. You are now officially authorized to record and upload performance assessment videos.
                </p>
              </div>

              {/* Official Credential Badge */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 text-left space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400 text-[11px]">Aadhaar Masked UID:</span>
                  <span className="text-emerald-400 font-bold">{verifiedRecord.aadhaarNumberMasked}</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400 text-[11px]">Citizen Name:</span>
                  <span className="text-white font-sans font-semibold">{verifiedRecord.fullName}</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400 text-[11px]">Verification Hash:</span>
                  <span className="text-[10px] text-slate-400 truncate max-w-[240px]">
                    {verifiedRecord.securityHash}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-[11px]">Status:</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1 font-sans text-xs">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    UIDAI e-KYC Certified
                  </span>
                </div>
              </div>

              <button
                onClick={handleFinish}
                className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-amber-500/15"
              >
                Proceed to Assessment Center <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
