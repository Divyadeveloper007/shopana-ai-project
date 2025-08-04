import React from "react";
import { CreditCard } from "lucide-react";

const BillingTab = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Plan</h3>
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xl font-bold text-gray-900">Pro Plan</h4>
              <p className="text-gray-600">1000 credits per month</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900">$29/mo</p>
              <p className="text-sm text-gray-600">Billed monthly</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Usage This Month</h3>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-600">Credits Used</span>
            <span className="font-semibold">750 / 1000</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-purple-600 h-2 rounded-full" style={{ width: "75%" }}></div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <CreditCard className="w-8 h-8 text-gray-400 mr-3" />
              <div>
                <p className="font-medium text-gray-900">•••• •••• •••• 4242</p>
                <p className="text-sm text-gray-600">Expires 12/25</p>
              </div>
            </div>
            <button className="text-purple-600 hover:text-purple-700 font-medium">
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingTab;
