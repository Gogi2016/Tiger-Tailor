import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ChevronRight, ChevronLeft, Check, Ruler } from 'lucide-react';
import { toast } from 'sonner';
import { base44 } from '@/api/base44Client';

const steps = [
  {
    title: "Upper Body",
    fields: [
      { name: 'chest', label: 'Chest', min: 70, max: 150, unit: 'cm', help: 'Measure around the fullest part' },
      { name: 'waist', label: 'Waist', min: 60, max: 140, unit: 'cm', help: 'Measure at natural waistline' },
      { name: 'shoulder_width', label: 'Shoulder Width', min: 35, max: 60, unit: 'cm', help: 'From shoulder point to shoulder point' },
      { name: 'neck', label: 'Neck', min: 30, max: 50, unit: 'cm', help: 'Measure around the base of neck' },
    ]
  },
  {
    title: "Arms & Length",
    fields: [
      { name: 'sleeve_length', label: 'Sleeve Length', min: 55, max: 75, unit: 'cm', help: 'From shoulder to wrist' },
      { name: 'jacket_length', label: 'Jacket Length', min: 65, max: 85, unit: 'cm', help: 'From back neck to desired length' },
    ]
  },
  {
    title: "Lower Body",
    fields: [
      { name: 'hips', label: 'Hips', min: 70, max: 150, unit: 'cm', help: 'Measure around the fullest part' },
      { name: 'inseam', label: 'Inseam', min: 65, max: 95, unit: 'cm', help: 'Inside leg from crotch to ankle' },
      { name: 'outseam', label: 'Outseam', min: 90, max: 125, unit: 'cm', help: 'Outside leg from waist to ankle' },
      { name: 'thigh', label: 'Thigh', min: 40, max: 80, unit: 'cm', help: 'Around the fullest part' },
    ]
  },
  {
    title: "General & Notes",
    fields: [
      { name: 'height', label: 'Height', min: 140, max: 220, unit: 'cm', help: 'Your total height' },
      { name: 'weight', label: 'Weight', min: 40, max: 200, unit: 'kg', help: 'Your current weight' },
      { name: 'posture_notes', label: 'Posture Notes', type: 'textarea', help: 'Any posture concerns or fit preferences' },
    ]
  }
];

export default function MeasurementForm({ onComplete, onCancel, existingMeasurements }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [measurements, setMeasurements] = useState(existingMeasurements || {});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (field, value) => {
    if (field.type === 'textarea') return true;
    if (!value) return false;
    const num = parseFloat(value);
    if (isNaN(num)) return false;
    if (field.min && num < field.min) return false;
    if (field.max && num > field.max) return false;
    return true;
  };

  const validateStep = () => {
    const currentFields = steps[currentStep].fields;
    const newErrors = {};
    let isValid = true;

    currentFields.forEach(field => {
      if (field.name === 'posture_notes') return; // Optional
      if (!measurements[field.name] || !validateField(field, measurements[field.name])) {
        newErrors[field.name] = `Enter a valid ${field.label.toLowerCase()} (${field.min}-${field.max}${field.unit})`;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
      setErrors({});
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
    setErrors({});
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;
    
    setIsSubmitting(true);
    try {
      const user = await base44.auth.me();
      const measurementData = { ...measurements, is_primary: true };
      
      if (existingMeasurements?.id) {
        await base44.entities.Measurement.update(existingMeasurements.id, measurementData);
        toast.success('Measurements updated successfully');
      } else {
        await base44.entities.Measurement.create(measurementData);
        toast.success('Measurements saved to your account');
      }
      
      onComplete(measurementData);
    } catch (error) {
      toast.error('Failed to save measurements. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="bg-white p-8 border border-[#EBE4D8]">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-[#A88D4B]" />
            <h3 className="font-serif text-2xl text-[#0E2A47]">Your Measurements</h3>
          </div>
          <span className="text-sm text-[#2B2B2B]/60">
            Step {currentStep + 1} of {steps.length}
          </span>
        </div>
        
        <div className="h-2 bg-[#EBE4D8] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[#A88D4B]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <h4 className="text-xs tracking-[0.3em] uppercase text-[#A88D4B] mb-6">
            {steps[currentStep].title}
          </h4>

          <div className="space-y-6">
            {steps[currentStep].fields.map(field => (
              <div key={field.name} className="space-y-2">
                <Label className="text-[#0E2A47]">
                  {field.label} {field.unit && <span className="text-[#2B2B2B]/50">({field.unit})</span>}
                </Label>
                {field.type === 'textarea' ? (
                  <Textarea
                    value={measurements[field.name] || ''}
                    onChange={(e) => setMeasurements({...measurements, [field.name]: e.target.value})}
                    placeholder={field.help}
                    rows={3}
                    className="border-[#EBE4D8] focus:border-[#A88D4B] focus:ring-[#A88D4B]/20"
                  />
                ) : (
                  <div>
                    <Input
                      type="number"
                      step="0.1"
                      value={measurements[field.name] || ''}
                      onChange={(e) => setMeasurements({...measurements, [field.name]: e.target.value})}
                      placeholder={`${field.min}-${field.max}`}
                      className={`border-[#EBE4D8] focus:border-[#A88D4B] focus:ring-[#A88D4B]/20 ${
                        errors[field.name] ? 'border-red-500' : ''
                      }`}
                    />
                    {errors[field.name] && (
                      <p className="text-xs text-red-500 mt-1">{errors[field.name]}</p>
                    )}
                  </div>
                )}
                <p className="text-xs text-[#2B2B2B]/50">{field.help}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex gap-3 mt-8 pt-6 border-t border-[#EBE4D8]">
        {currentStep > 0 && (
          <Button
            variant="outline"
            onClick={handleBack}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </Button>
        )}
        
        {onCancel && (
          <Button
            variant="outline"
            onClick={onCancel}
            className="ml-auto"
          >
            Cancel
          </Button>
        )}

        {currentStep < steps.length - 1 ? (
          <Button
            onClick={handleNext}
            className="bg-[#0E2A47] hover:bg-[#0E2A47]/90 text-[#F5F1E8] flex items-center gap-2 ml-auto"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-[#0E2A47] hover:bg-[#0E2A47]/90 text-[#F5F1E8] flex items-center gap-2 ml-auto"
          >
            {isSubmitting ? 'Saving...' : 'Save Measurements'}
            <Check className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
}