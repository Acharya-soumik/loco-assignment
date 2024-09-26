import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const BottomSheet: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
  title: string;
  children: React.ReactNode;
  primaryButtonText?: string;
}> = ({
  isOpen,
  onClose,
  onAccept,
  title,
  children,
  primaryButtonText = "Done",
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white w-full max-w-md rounded-t-2xl shadow-lg"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-semibold text-slate-700">{title}</h2>
              <motion.button
                onClick={onClose}
                className="p-1 rounded-full hover:bg-gray-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={24} />
              </motion.button>
            </div>
            <div className="p-4 max-h-[70vh] overflow-y-auto">{children}</div>
            <div className="flex justify-end space-x-2 p-4 border-t">
              <motion.button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 text-black"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Close
              </motion.button>
              <motion.button
                onClick={onAccept}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {primaryButtonText}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BottomSheet;
