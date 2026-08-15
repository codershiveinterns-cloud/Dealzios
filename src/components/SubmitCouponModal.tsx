'use client';

import React, { useState } from 'react';
import { X, PlusCircle, CheckCircle2, ShieldAlert } from 'lucide-react';

interface SubmitCouponModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SubmitCouponModal: React.FC<SubmitCouponModalProps> = ({ isOpen, onClose }) => {
  const [storeName, setStoreName] = useState('');
  const [code, setCode] = useState('');
  const [discount, setDiscount] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setStoreName('');
    setCode('');
    setDiscount('');
    setDescription('');
    setEmail('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden relative max-h-[90vh] flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider mb-1">
            <PlusCircle className="w-4 h-4" /> Community Submission
          </div>
          <h3 className="text-xl font-extrabold text-slate-900">
            Submit a Coupon or Promo Code
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Help thousands of shoppers save money. All submitted offers are reviewed before appearing publicly.
          </p>
        </div>

        <div className="p-6 overflow-y-auto">
          {submitted ? (
            <div className="text-center py-8 space-y-3">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-slate-900 text-lg">Thank You for Submitting!</h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Our verification team will test <span className="font-semibold text-slate-800">{code || storeName}</span> shortly. You'll receive a confirmation email when it goes live!
              </p>
              <button
                onClick={handleReset}
                className="mt-4 px-6 py-2.5 bg-indigo-600 text-white font-bold text-xs rounded-xl hover:bg-indigo-700 transition-colors"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Store / Brand Name *</label>
                <input
                  type="text"
                  required
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  placeholder="e.g. Nike, Canva, NordVPN"
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl outline-none focus:border-indigo-600 transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Coupon Code (Optional)</label>
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="e.g. SAVE25"
                    className="w-full px-3.5 py-2 text-sm font-mono uppercase border border-slate-200 rounded-xl outline-none focus:border-indigo-600 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Discount Amount *</label>
                  <input
                    type="text"
                    required
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                    placeholder="e.g. 25% Off or $15 Off"
                    className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl outline-none focus:border-indigo-600 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Offer Details & Exclusions</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. Valid on footwear orders over $50 until end of month."
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl outline-none focus:border-indigo-600 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Your Email (For Review Notification) *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl outline-none focus:border-indigo-600 transition-colors"
                />
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-xs flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>Submitted offers are verified before appearing publicly. We do not accept fake or non-working spam codes.</span>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold text-sm rounded-xl shadow-md shadow-indigo-600/20 transition-all"
              >
                Submit Coupon for Review
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
