import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, AlertCircle, HelpCircle, Award, ArrowRight, RotateCcw } from 'lucide-react';

interface AssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  modality?: string;
  onPassed?: () => void;
}

export default function AssessmentModal({
  isOpen,
  onClose,
  title = 'MRI Preprocessing & Morphometry Assessment',
  modality = 'MRI',
  onPassed,
}: AssessmentModalProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const questions = [
    {
      question: 'What is the primary objective of B1 field inhomogeneity correction in structural MRI?',
      options: [
        'To remove high-frequency thermal noise across all voxels.',
        'To correct spatial intensity non-uniformity across anatomical tissues caused by RF coil geometry.',
        'To align the 3D volume into MNI152 stereotaxic space.',
        'To discard slice timing errors from multi-band acquisitions.',
      ],
      correct: 1,
      explanation: 'B1 field inhomogeneity correction (e.g., via N4ITK) removes low-frequency spatial intensity bias across white and gray matter.',
    },
    {
      question: 'Which tool produces vertex-wise cortical thickness measurements via surface reconstruction?',
      options: ['SPM12', 'FSL FEAT', 'FreeSurfer', 'NiLearn GLM'],
      correct: 2,
      explanation: 'FreeSurfer reconstructs the white matter surface and pial surface to calculate cortical thickness at each tessellated vertex.',
    },
    {
      question: 'In BIDS formatting, what suffix must structural T1-weighted image files contain?',
      options: ['_bold.nii.gz', '_T1w.nii.gz', '_eeg.edf', '_dwi.nii.gz'],
      correct: 1,
      explanation: 'BIDS specifies `_T1w.nii.gz` for anatomical T1-weighted structural scans.',
    },
  ];

  if (!isOpen) return null;

  const handleSelectOption = (index: number) => {
    const nextAnswers = [...selectedAnswers];
    nextAnswers[currentQuestion] = index;
    setSelectedAnswers(nextAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsSubmitted(true);
      if (onPassed) onPassed();
    }
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correct) score += 1;
    });
    return Math.round((score / questions.length) * 100);
  };

  const score = calculateScore();
  const passed = score >= 66;

  const handleReset = () => {
    setSelectedAnswers([]);
    setCurrentQuestion(0);
    setIsSubmitted(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-stone-900/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 border border-stone-200 my-8"
        >
          {/* Header */}
          <div className="bg-stone-900 text-white p-6 flex items-center justify-between border-b border-stone-800">
            <div>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold uppercase tracking-wider">
                Competency Checkpoint · {modality}
              </span>
              <h3 className="text-lg font-bold text-white mt-1">{title}</h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-stone-800 text-stone-300 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8">
            {!isSubmitted ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between text-xs text-stone-500 pb-2 border-b border-stone-100">
                  <span>Question {currentQuestion + 1} of {questions.length}</span>
                  <span>Pass mark: 66%</span>
                </div>

                <div className="space-y-4">
                  <h4 className="text-base font-bold text-stone-900 leading-snug">
                    {questions[currentQuestion].question}
                  </h4>

                  <div className="space-y-2.5 pt-2">
                    {questions[currentQuestion].options.map((option, optIdx) => {
                      const isSelected = selectedAnswers[currentQuestion] === optIdx;
                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectOption(optIdx)}
                          className={`w-full p-4 text-left rounded-2xl border text-xs sm:text-sm font-medium transition-all ${
                            isSelected
                              ? 'border-amber-600 bg-amber-50/70 text-stone-900 shadow-sm ring-1 ring-amber-600'
                              : 'border-stone-200 hover:border-stone-300 hover:bg-stone-50 text-stone-700'
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <span
                              className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0 ${
                                isSelected ? 'bg-amber-600 text-white' : 'bg-stone-200 text-stone-700'
                              }`}
                            >
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span className="leading-relaxed">{option}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    disabled={currentQuestion === 0}
                    onClick={() => setCurrentQuestion(currentQuestion - 1)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:bg-stone-100 disabled:opacity-30 disabled:pointer-events-none"
                  >
                    Previous
                  </button>

                  <button
                    disabled={selectedAnswers[currentQuestion] === undefined}
                    onClick={handleNext}
                    className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 disabled:opacity-40 text-white text-xs font-bold shadow-sm transition-all flex items-center space-x-2"
                  >
                    <span>{currentQuestion === questions.length - 1 ? 'Submit Assessment' : 'Next Question'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-4 space-y-6">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-inner ${
                    passed ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'
                  }`}
                >
                  {passed ? <CheckCircle2 className="w-10 h-10" /> : <AlertCircle className="w-10 h-10" />}
                </div>

                <div>
                  <h4 className="text-2xl font-extrabold text-stone-900">
                    {passed ? 'Assessment Passed!' : 'Requires Review'}
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-600 mt-1">
                    You scored <strong className="text-stone-900">{score}%</strong> ({questions.filter((q, i) => selectedAnswers[i] === q.correct).length}/{questions.length} correct)
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-left space-y-3 text-xs">
                  {questions.map((q, idx) => {
                    const isCorrect = selectedAnswers[idx] === q.correct;
                    return (
                      <div key={idx} className="pb-2 border-b border-stone-200/60 last:border-0 last:pb-0">
                        <div className="flex items-center space-x-2 font-semibold text-stone-800">
                          {isCorrect ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                          ) : (
                            <AlertCircle className="w-3.5 h-3.5 text-rose-600 flex-shrink-0" />
                          )}
                          <span>Question {idx + 1}: {isCorrect ? 'Correct' : 'Incorrect'}</span>
                        </div>
                        <p className="text-stone-500 mt-1 pl-5.5">{q.explanation}</p>
                      </div>
                    );
                  })}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={handleReset}
                    className="flex-1 py-2.5 px-4 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-700 text-xs font-semibold flex items-center justify-center space-x-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retake Assessment</span>
                  </button>
                  <button
                    onClick={onClose}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-sm"
                  >
                    <span>Return to Dashboard</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
