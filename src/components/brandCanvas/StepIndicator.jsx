import React, { useEffect, useRef } from 'react';
import { Check } from 'lucide-react';

const StepIndicator = ({ steps, currentStep }) => {
  const activeStepRef = useRef(null);

  useEffect(() => {
    if (window.innerWidth < 768 && activeStepRef.current) {
      activeStepRef.current.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [currentStep]);

  return (
    <div className="w-full overflow-x-auto pt-2">
      <div className="flex items-center justify-start md:justify-between min-w-[600px] md:min-w-0 px-2 md:px-0">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div
              className="flex flex-col items-center"
              ref={currentStep === step.id ? activeStepRef : null}
            >
              <div className={`
                relative w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-semibold text-sm transition-all
                ${currentStep > step.id 
                  ? 'bg-green-500 text-white' 
                  : currentStep === step.id 
                  ? 'bg-purple-600 text-white ring-4 ring-purple-200' 
                  : 'bg-gray-200 text-gray-500'
                }
              `}>
                {currentStep > step.id ? (
                  <Check className="w-5 h-5" />
                ) : (
                  step.id
                )}
              </div>
              <div className="mt-2 text-center">
                <p className={`text-xs md:text-sm font-medium ${currentStep >= step.id ? 'text-gray-900' : 'text-gray-500'}`}>
                  {step.title}
                </p>
                <p className="text-[10px] md:text-xs text-gray-500 mt-1 max-w-[80px] md:max-w-24">
                  {step.description}
                </p>
              </div>
            </div>

            {index < steps.length - 1 && (
              <div className={`
                flex-1 h-0.5 mx-2 md:mx-4 transition-all
                ${currentStep > step.id ? 'bg-green-500' : 'bg-gray-200'}
              `} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default StepIndicator;
