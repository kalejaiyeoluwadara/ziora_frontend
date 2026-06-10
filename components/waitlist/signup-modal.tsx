"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "motion/react";
import { useState, useEffect } from "react";
import {
  ZioraLogo,
  XTwitter,
  Instagram,
  WhatsApp,
  Spinner,
} from "@/components/icons";
import { saveJoinedSession, clearReferralCode } from "@/lib/waitlist/session";
import { appendExistingSessionToAdmin } from "@/lib/waitlist/admin-store";
import { referralDisplayUrl, referralUrl } from "@/lib/waitlist/share";

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
}

type Step = "role" | "success";
type Role = "buyer" | "vendor";

export function SignupModal({ isOpen, onClose, email }: SignupModalProps) {
  const [step, setStep] = useState<Step>("role");
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mockPosition, setMockPosition] = useState(0);
  const [mockRefCode, setMockRefCode] = useState("");

  // Generate mock waitlist data once on mount / open
  useEffect(() => {
    if (isOpen) {
      setStep("role");
      setSelectedRole(null);
      setIsSubmitting(false);
      setCopied(false);
      
      // Random mock values for high-fidelity experience
      setMockPosition(Math.floor(Math.random() * 350) + 1480);
      const randHex = Math.random().toString(36).substring(2, 7).toUpperCase();
      setMockRefCode(`ZR${randHex}`);
    }
  }, [isOpen]);

  const handleConfirmRole = async () => {
    if (!selectedRole) return;
    setIsSubmitting(true);

    // Simulate network delay for premium feel
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Save session locally to simulate a real registration
    saveJoinedSession({
      email: email.trim().toLowerCase(),
      position: mockPosition,
      referralCode: mockRefCode,
      rank: mockPosition,
      referralCount: 0,
    });
    
    // Also save to global admin store so they show up in the admin dashboard!
    appendExistingSessionToAdmin({
      email: email.trim().toLowerCase(),
      position: mockPosition,
      referralCode: mockRefCode,
      firstName: email.trim().split("@")[0], // Fallback name
      roleInterest: selectedRole === "buyer" ? "buyer" : "vendor",
    });

    clearReferralCode();

    // Fire event to update subscriber numbers or trigger other UI elements
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("waitlist_signup"));
    }

    setIsSubmitting(false);
    setStep("success");
  };

  const referralLink = mockRefCode ? referralUrl(mockRefCode) : "";
  const referralLinkDisplay = mockRefCode
    ? referralDisplayUrl(mockRefCode)
    : "";

  const handleCopyLink = () => {
    if (!referralLink) return;
    navigator.clipboard.writeText(referralLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const shareText = encodeURIComponent(
    `I just joined the waitlist for Ziora, the multi-vendor marketplace built for Nigeria! Get early access here: ${referralLink}`,
  );

  // Success particles array for burst animation
  const particles = Array.from({ length: 8 });

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <AnimatePresence>
        {isOpen && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              />
            </Dialog.Overlay>
            
            <Dialog.Content asChild>
              <motion.div
                className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-32px)] max-w-[460px] rounded-[28px] bg-white p-6 shadow-[0_24px_70px_rgba(8,28,92,0.3)] border border-black/5 outline-none md:p-8 overflow-hidden"
                initial={{ opacity: 0, scale: 0.95, x: "-50%", y: "-47%" }}
                animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
                exit={{ opacity: 0, scale: 0.95, x: "-50%", y: "-47%" }}
                transition={{ type: "spring", damping: 25, stiffness: 250 }}
              >
                {/* Floating ambient gradient behind card content */}
                <div 
                  aria-hidden="true" 
                  className="pointer-events-none absolute -top-40 -left-40 w-96 h-96 rounded-full bg-brand-blue-light/10 blur-3xl"
                />

                <Dialog.Close className="absolute right-4 top-4 rounded-full p-2 text-text-secondary hover:bg-bg-section transition-colors hover:text-text-primary outline-none">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </Dialog.Close>

                <div className="relative z-10 flex flex-col items-center">
                  <ZioraLogo className="text-brand-blue h-6.5 mb-6" />

                  <AnimatePresence mode="wait">
                    {step === "role" ? (
                      <motion.div
                        key="role-step"
                        className="w-full flex flex-col items-center"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                      >
                        <h2 className="text-center font-display text-xl font-bold tracking-tight text-text-primary sm:text-2xl">
                          Choose your experience
                        </h2>
                        <p className="mt-1 text-center text-sm text-text-secondary">
                          Help us tailor Ziora for you. What are you joining as?
                        </p>

                        {/* Interactive Role Cards */}
                        <div className="mt-6 w-full flex flex-col gap-3">
                          {/* Buyer Card */}
                          <button
                            type="button"
                            onClick={() => setSelectedRole("buyer")}
                            className={`group relative flex items-start gap-4 rounded-2xl border-2 p-4 text-left transition-all duration-200 outline-none ${
                              selectedRole === "buyer"
                                ? "border-brand-blue-light bg-brand-blue/5 shadow-[0_4px_16px_rgba(30,91,255,0.08)]"
                                : "border-black/10 hover:border-brand-blue-light/50 bg-white hover:bg-bg-section/50"
                            }`}
                          >
                            <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors duration-200 ${
                              selectedRole === "buyer"
                                ? "bg-brand-blue-light text-white"
                                : "bg-bg-card text-brand-blue"
                            }`}>
                              {/* Shopping Bag Custom Icon */}
                              <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="h-5 w-5 transition-transform duration-200 group-hover:scale-110"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                />
                              </svg>
                            </div>

                            <div className="flex-1 pr-6">
                              <h3 className="font-semibold text-text-primary text-[15px]">
                                Join as a Buyer
                              </h3>
                              <p className="mt-0.5 text-xs text-text-secondary leading-relaxed">
                                I want to discover authentic Nigerian vendors, shop unique items, and pay securely using escrow.
                              </p>
                            </div>

                            {/* Radio selector circle */}
                            <div className={`absolute right-4 top-4 flex h-5 w-5 items-center justify-center rounded-full border transition-colors ${
                              selectedRole === "buyer"
                                ? "border-brand-blue-light bg-brand-blue-light text-white scale-110"
                                : "border-black/25 bg-transparent"
                            }`}>
                              {selectedRole === "buyer" && (
                                <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                          </button>

                          {/* Vendor Card */}
                          <button
                            type="button"
                            onClick={() => setSelectedRole("vendor")}
                            className={`group relative flex items-start gap-4 rounded-2xl border-2 p-4 text-left transition-all duration-200 outline-none ${
                              selectedRole === "vendor"
                                ? "border-brand-blue-light bg-brand-blue/5 shadow-[0_4px_16px_rgba(30,91,255,0.08)]"
                                : "border-black/10 hover:border-brand-blue-light/50 bg-white hover:bg-bg-section/50"
                            }`}
                          >
                            <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors duration-200 ${
                              selectedRole === "vendor"
                                ? "bg-brand-blue-light text-white"
                                : "bg-bg-card text-brand-blue"
                            }`}>
                              {/* Storefront Custom Icon */}
                              <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="h-5 w-5 transition-transform duration-200 group-hover:scale-110"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M3 3h18v2H3V3zm1 6v10a2 2 0 002 2h12a2 2 0 002-2V9M4 9l2-4h12l2 4M4 9h16M9 13h6"
                                />
                              </svg>
                            </div>

                            <div className="flex-1 pr-6">
                              <h3 className="font-semibold text-text-primary text-[15px]">
                                Join as a Vendor
                              </h3>
                              <p className="mt-0.5 text-xs text-text-secondary leading-relaxed">
                                I want to list products, launch my online storefront, access Kwik/GIG shipping, and receive fast payouts.
                              </p>
                            </div>

                            {/* Radio selector circle */}
                            <div className={`absolute right-4 top-4 flex h-5 w-5 items-center justify-center rounded-full border transition-colors ${
                              selectedRole === "vendor"
                                ? "border-brand-blue-light bg-brand-blue-light text-white scale-110"
                                : "border-black/25 bg-transparent"
                            }`}>
                              {selectedRole === "vendor" && (
                                <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                          </button>
                        </div>

                        {/* Submit Action */}
                        <button
                          type="button"
                          onClick={handleConfirmRole}
                          disabled={!selectedRole || isSubmitting}
                          className={`mt-6 flex h-13 w-full items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 ${
                            selectedRole && !isSubmitting
                              ? "bg-gradient-to-r from-brand-blue-light to-brand-blue-dark text-white shadow-[0_4px_16px_rgba(30,91,255,0.35)] hover:shadow-[0_6px_22px_rgba(30,91,255,0.45)] hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                              : "bg-text-muted/20 text-text-muted/60 cursor-not-allowed"
                          }`}
                        >
                          {isSubmitting ? (
                            <>
                              <Spinner className="animate-spin" />
                              Completing registration…
                            </>
                          ) : (
                            <>Confirm & Join Waitlist</>
                          )}
                        </button>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="success-step"
                        className="w-full flex flex-col items-center"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.25 }}
                      >
                        {/* Animated Success Badge with radial aura */}
                        <div className="relative flex items-center justify-center w-24 h-24 mb-4">
                          <motion.div
                            className="absolute inset-0 rounded-full bg-accent-success/10"
                            initial={{ scale: 0.6, opacity: 0 }}
                            animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0.15, 0.6] }}
                            transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                          />

                          {/* Burst Particles */}
                          {particles.map((_, i) => {
                            const angle = (i * Math.PI) / 4;
                            const x = Math.cos(angle) * 44;
                            const y = Math.sin(angle) * 44;
                            return (
                              <motion.span
                                key={i}
                                className="absolute w-2 h-2 rounded-full bg-accent-success"
                                initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                                animate={{ x, y, opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.9, delay: 0.35, ease: "easeOut" }}
                              />
                            );
                          })}

                          {/* Custom Check Circle Draw */}
                          <svg viewBox="0 0 52 52" className="w-20 h-20 text-accent-success relative z-10" fill="none" stroke="currentColor" strokeWidth="4">
                            <motion.circle
                              cx="26"
                              cy="26"
                              r="23"
                              strokeLinecap="round"
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{ duration: 0.5, ease: "easeOut" }}
                            />
                            <motion.path
                              d="M16 26l7 7 14-14"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{ duration: 0.4, delay: 0.35, ease: "easeOut" }}
                            />
                          </svg>
                        </div>

                        <h2 className="text-center font-display text-2xl font-bold tracking-tight text-text-primary">
                          You&apos;re on the list!
                        </h2>
                        <p className="mt-1.5 text-center text-sm text-text-secondary px-2 max-w-sm">
                          Thanks for joining the Ziora waitlist as a <span className="font-semibold text-brand-blue capitalize">{selectedRole}</span>. We&apos;ve reserved your spot and sent details to <span className="font-semibold text-text-primary">{email}</span>.
                        </p>

                        {/* Glassmorphic Ticket Pass */}
                        <div className="mt-6 w-full relative overflow-hidden rounded-2xl border border-brand-blue/20 bg-gradient-to-br from-brand-blue/10 to-brand-blue-light/5 p-5 shadow-inner">
                          {/* Top-Right Glowing Orb */}
                          <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-brand-blue-light/20 blur-xl pointer-events-none" />
                          
                          {/* Ticket side cutouts for style */}
                          <div className="absolute -left-3 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-white border-r border-brand-blue/20 pointer-events-none" />
                          <div className="absolute -right-3 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-white border-l border-brand-blue/20 pointer-events-none" />

                          <div className="flex flex-col items-center text-center">
                            <span className="text-[10px] font-bold tracking-[0.18em] text-brand-blue-light/90 uppercase">
                              Ziora Waitlist Pass
                            </span>
                            <span className="mt-1 font-display text-4xl font-black tracking-tight text-brand-blue">
                              #{mockPosition.toLocaleString()}
                            </span>
                            <span className="mt-0.5 text-[11px] text-text-secondary font-medium">
                              Current position worldwide
                            </span>
                          </div>

                          <div className="mt-4 border-t border-brand-blue/15 pt-4">
                            <span className="block text-[10px] text-center font-bold tracking-wider text-text-secondary uppercase">
                              Your referral link (Skip the line)
                            </span>
                            <div className="mt-2 flex items-center gap-1 bg-white/70 border border-brand-blue/10 p-1.5 rounded-full pl-3 shadow-sm">
                              <span className="flex-1 truncate text-xs text-text-secondary select-all font-mono font-semibold">
                                {referralLinkDisplay}
                              </span>
                              <button
                                type="button"
                                onClick={handleCopyLink}
                                className={`flex h-8 items-center justify-center gap-1.5 rounded-full px-3 text-xs font-semibold transition-all duration-200 ${
                                  copied
                                    ? "bg-accent-success text-white"
                                    : "bg-brand-blue text-white hover:bg-brand-blue-dark active:scale-95"
                                }`}
                              >
                                {copied ? (
                                  <>
                                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                    Copied
                                  </>
                                ) : (
                                  <>
                                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3" />
                                    </svg>
                                    Copy
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Social Share actions */}
                        <div className="mt-6 w-full flex flex-col items-center">
                          <span className="text-xs text-text-secondary font-medium">
                            Share with friends to jump spots instantly
                          </span>
                          
                          <div className="mt-3 flex justify-center gap-3 w-full">
                            <a
                              href={`https://wa.me/?text=${shareText}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center h-10 w-10 rounded-full border border-black/10 hover:border-brand-blue-light/30 bg-bg-section/30 hover:bg-[#25D366]/10 text-text-secondary hover:text-[#25D366] transition-colors"
                              title="Share on WhatsApp"
                            >
                              <WhatsApp className="h-5 w-5" />
                            </a>
                            <a
                              href={`https://twitter.com/intent/tweet?text=${shareText}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center h-10 w-10 rounded-full border border-black/10 hover:border-brand-blue-light/30 bg-bg-section/30 hover:bg-black/10 text-text-secondary hover:text-black transition-colors"
                              title="Share on X"
                            >
                              <XTwitter className="h-4.5 w-4.5" />
                            </a>
                            <a
                              href="https://instagram.com/ziorahq"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center h-10 w-10 rounded-full border border-black/10 hover:border-brand-blue-light/30 bg-bg-section/30 hover:bg-brand-blue/10 text-text-secondary hover:text-brand-blue transition-colors"
                              title="Follow on Instagram"
                            >
                              <Instagram className="h-5 w-5" />
                            </a>
                          </div>
                        </div>

                        {/* Closing Button */}
                        <button
                          type="button"
                          onClick={() => onClose()}
                          className="mt-6 flex h-11 w-full items-center justify-center rounded-full border border-black/10 hover:border-black/20 text-text-primary bg-bg-section/50 hover:bg-bg-section text-sm font-semibold transition-all duration-200 active:scale-[0.98]"
                        >
                          Close Pass
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
