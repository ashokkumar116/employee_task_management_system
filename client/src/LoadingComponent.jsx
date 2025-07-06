import React from "react";
import { Loader2, Rocket } from "lucide-react";
import { motion } from "framer-motion";

const LoadingComponent = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex flex-col items-center justify-center text-white p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-6"
      >
        <Rocket className="w-16 h-16 text-white animate-bounce" />
        <div className="flex items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-white" />
          <span className="text-2xl font-semibold">Launching your experience...</span>
        </div>
        <p className="text-lg text-white/80 max-w-md text-center">
          Our servers are waking up ⏳ This might take a few seconds because we’re on Render’s free plan.
        </p>
      </motion.div>
    </div>
  );
};

export default LoadingComponent;