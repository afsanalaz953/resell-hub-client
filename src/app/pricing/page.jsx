"use client";

 import { Card, CardFooter, Button,  Badge } from "@heroui/react";

import { FaRocket, FaCrown, FaCheck, FaArrowRight } from "react-icons/fa";

// Reusable feature row — all Tailwind classes
 const FeatureItem = ({ children }) => (
  <div className="flex items-center gap-3 text-sm text-slate-700">
     <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
        <FaCheck className="h-3 w-3" />
     </span>
     <span>{children}</span>
   </div>
 );

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-16 px-4 flex flex-col items-center justify-center">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          Choose your{" "}
        <span className= {`bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent`}>
            plan
          </span>
        </h2>
        <p className="mt-3 text-slate-500 text-lg">
          Simple, transparent pricing that grows with you. Try any plan free for 14 days.
        </p>
        <div className="mt-4 inline-flex items-center gap-2 bg-slate-100 px-4 py-1.5 rounded-full text-xs font-medium text-slate-600">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          All plans include a 14‑day free trial
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl w-full">
        {/* Basic Plan */}
        <Card className="p-6 bg-white shadow-md rounded-2xl border border-slate-200/70 h-full flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
          <div className="flex items-center gap-3 mb-1">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500 text-white">
              <FaRocket className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Free</h2>
              <p className="text-xs text-slate-500">Perfect for getting started</p>
            </div>
          </div>

          <div className="mt-4 flex items-baseline">
            <span className="text-3xl font-extrabold text-slate-900">$0</span>
            <span className="ml-1 text-sm font-medium text-slate-400">/ Per Month</span>
          </div>

          {/* <Divider className="my-5" />
          <div className="divider my-5"></div> */}

          <div className="space-y-3 flex-1">
            <FeatureItem><strong>5</strong> Projects</FeatureItem>
            <FeatureItem><strong>10GB</strong> Storage</FeatureItem>
            <FeatureItem>Basic Support</FeatureItem>
            <FeatureItem>Community Access</FeatureItem>
          </div>

          <CardFooter className="px-0 pt-6">
            <Button
              as="button"
              color="primary"
              className="w-full bg-blue-900 text-white hover:bg-slate-800 transition-all duration-200 rounded-full py-6 text-sm font-semibold"
              endContent={<FaArrowRight className="h-4 w-4" />}
              onClick={() => alert("🚀 Free plan selected")}
            >
              Start Free
            </Button>
          </CardFooter>
        </Card>

        {/* Standard Plan */}
        <Card className="p-6 bg-white shadow-lg rounded-2xl border border-indigo-200/80 h-full flex flex-col relative overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
          {/* Most Popular Badge */}
          <Badge
            color="secondary"
            variant="solid"
            className="absolute top-4 right-4 bg-linear-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full"
          >
            Most Popular
          </Badge>

          {/* Decorative glow - pure Tailwind */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-100/30 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex items-center gap-3 mb-1 relative z-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-indigo-600 to-purple-600 text-white">
              <FaCrown className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Standard</h2>
              <p className="text-xs text-slate-500">For growing teams &amp; businesses</p>
            </div>
          </div>

          <div className="mt-4 flex items-baseline relative z-10">
            <span className="text-3xl font-extrabold text-slate-900">$29</span>
            <span className="ml-1 text-sm font-medium text-slate-400">/ Per Month</span>
          </div>

          {/* <Divider className="my-5 relative z-10" /> */}

          <div className="space-y-3 flex-1 relative z-10">
            <FeatureItem><strong>Unlimited</strong> Projects</FeatureItem>
            <FeatureItem><strong>50GB</strong> Storage</FeatureItem>
            <FeatureItem>Priority Support</FeatureItem>
            <FeatureItem>Advanced Analytics</FeatureItem>
            <FeatureItem>Team Collaboration</FeatureItem>
          </div>

          <CardFooter className="px-0 pt-6 relative z-10">
            <Button
              as="button"
              color="secondary"
              className="w-full bg-linear-to-r from-orange-800 to-orange-600 text-white hover:shadow-lg hover:shadow-indigo-200/50 transition-all duration-200 rounded-full py-6 text-sm font-semibold"
              endContent={<FaArrowRight className="h-4 w-4" />}
              onClick={() => alert("⭐ Standard plan selected")}
            >
              Buy Now
            </Button>
          </CardFooter>
        </Card>

        {/* premium plan */}
         <Card className="p-6 bg-white shadow-lg rounded-2xl border border-indigo-200/80 h-full flex flex-col relative overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
          {/* Most Popular Badge */}
          <Badge
            color="secondary"
            variant="solid"
            className="absolute top-4 right-4 bg-linear-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full"
          >
            Most Popular
          </Badge>

          {/* Decorative glow - pure Tailwind */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-100/30 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex items-center gap-3 mb-1 relative z-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-orange-800 to-orange-600 text-white">
              <FaCrown className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Premium</h2>
              <p className="text-xs text-slate-500">For growing teams &amp; businesses</p>
            </div>
          </div>

          <div className="mt-4 flex items-baseline relative z-10">
            <span className="text-3xl font-extrabold text-slate-900">$100</span>
            <span className="ml-1 text-sm font-medium text-slate-400">/ Per Month</span>
          </div>

          {/* <Divider className="my-5 relative z-10" /> */}

          <div className="space-y-3 flex-1 relative z-10">
            <FeatureItem><strong>Unlimited</strong> Projects</FeatureItem>
            <FeatureItem><strong>50GB</strong> Storage</FeatureItem>
            <FeatureItem>Priority Support</FeatureItem>
            <FeatureItem>Advanced Analytics</FeatureItem>
            <FeatureItem>Team Collaboration</FeatureItem>
          </div>

          <CardFooter className="px-0 pt-6 relative z-10">
            <Button
              as="button"
              color="secondary"
              className="w-full bg-linear-to-r from-indigo-600 to-orange-800 text-white hover:shadow-lg hover:shadow-indigo-200/50 transition-all duration-200 rounded-full py-6 text-sm font-semibold"
              endContent={<FaArrowRight className="h-4 w-4" />}
              onClick={() => alert("⭐ Premium plan selected")}
            >
              Buy Now
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Footer */}
      <p className="mt-12 text-xs text-slate-400 flex items-center gap-1">
        <span className="inline-block w-2 h-2 bg-slate-300 rounded-full"></span>
        Secure payments · Cancel anytime · No hidden fees
      </p>
    </main>
  );
}