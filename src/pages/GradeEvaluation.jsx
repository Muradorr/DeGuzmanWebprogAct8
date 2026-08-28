import { useState } from 'react';

function GradeEvaluation() {
  const [studentName, setStudentName] = useState('');
  const [score, setScore] = useState('');
  const [evaluation, setEvaluation] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleEvaluate = (e) => {
    e.preventDefault();

    if (studentName === '' && score === '') {
      setErrorMsg('Please enter student name and score.');
      setEvaluation(null);
      return;
    }

    if (studentName === '') {
      setErrorMsg('Please enter student name.');
      setEvaluation(null);
      return;
    }

    if (score === '') {
      setErrorMsg('Please enter a score.');
      setEvaluation(null);
      return;
    }

    setErrorMsg('');

    const numericScore = parseFloat(score);

    let remarks = '';

    if (numericScore >= 90) {
      remarks = 'Excellent';
    } else if (numericScore >= 85) {
      remarks = 'Very Good';
    } else if (numericScore >= 80) {
      remarks = 'Good';
    } else if (numericScore >= 75) {
      remarks = 'Passed';
    } else {
      remarks = 'Failed';
    }

    setEvaluation({
      name: studentName,
      finalScore: numericScore,
      remarks
    });
  };

  return (
    <div className="flex justify-center py-6">

      <div className="w-full max-w-md bg-[#0d121c] border border-slate-800 rounded-xl p-6 md:p-8 shadow-2xl">

        {/* =========================
            HEADER
        ========================== */}
        <div className="border-b border-slate-800 pb-5 mb-6">

          <div className="flex items-center gap-3 mb-3">

            <div className="w-1.5 h-8 bg-cyan-500 rounded-full"></div>

            <div>

              <p className="text-cyan-400 text-[10px] font-bold uppercase tracking-[0.2em]">
                Activity 2
              </p>

              <p className="text-slate-600 text-[8px] uppercase tracking-widest mt-1">
                Evaluation Module
              </p>

            </div>

          </div>

          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white">
            Grade Evaluator
          </h2>

          <p className="text-xs text-slate-500 leading-relaxed mt-2">
            Enter a student's score to automatically determine their academic remarks.
          </p>

        </div>


        {/* =========================
            FORM
        ========================== */}
        <form onSubmit={handleEvaluate} className="flex flex-col gap-5">

          {/* STUDENT NAME */}
          <div>

            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Student Name
            </label>

            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Enter student name"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-sm text-white placeholder:text-slate-700 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/20 transition"
            />

          </div>


          {/* SCORE */}
          <div>

            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Final Score (0-100)
            </label>

            <input
              type="number"
              value={score}
              onChange={(e) => setScore(e.target.value)}
              placeholder="Enter final score"
              min="0"
              max="100"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-sm text-white placeholder:text-slate-700 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/20 transition"
            />

          </div>


          {/* GRADING GUIDE */}
          <div className="bg-slate-950 border border-slate-800 rounded-lg p-4">

            <p className="text-[9px] text-slate-600 uppercase tracking-[0.2em] mb-3">
              Grading Guide
            </p>

            <div className="space-y-2">

              <div className="flex justify-between text-[9px] uppercase tracking-wider">
                <span className="text-slate-500">90 – 100</span>
                <span className="text-cyan-400 font-bold">Excellent</span>
              </div>

              <div className="flex justify-between text-[9px] uppercase tracking-wider">
                <span className="text-slate-500">85 – 89</span>
                <span className="text-cyan-400 font-bold">Very Good</span>
              </div>

              <div className="flex justify-between text-[9px] uppercase tracking-wider">
                <span className="text-slate-500">80 – 84</span>
                <span className="text-cyan-400 font-bold">Good</span>
              </div>

              <div className="flex justify-between text-[9px] uppercase tracking-wider">
                <span className="text-slate-500">75 – 79</span>
                <span className="text-cyan-400 font-bold">Passed</span>
              </div>

              <div className="flex justify-between text-[9px] uppercase tracking-wider">
                <span className="text-slate-500">Below 75</span>
                <span className="text-red-400 font-bold">Failed</span>
              </div>

            </div>

          </div>


          {/* ERROR MESSAGE */}
          {errorMsg && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">

              <p className="text-center text-[10px] font-bold text-red-400 uppercase tracking-wider">
                {errorMsg}
              </p>

            </div>
          )}


          {/* BUTTONS */}
          <div className="flex gap-3 mt-1">

            <button
              type="submit"
              className="flex-1 bg-cyan-500 text-slate-950 rounded-lg py-3 text-[10px] font-black uppercase tracking-wider hover:bg-cyan-400 transition"
            >
              Evaluate →
            </button>

            <button
              type="button"
              onClick={() => {
                setStudentName('');
                setScore('');
                setEvaluation(null);
                setErrorMsg('');
              }}
              className="flex-1 bg-slate-950 border border-slate-800 rounded-lg py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider hover:border-slate-600 hover:text-white transition"
            >
              Clear
            </button>

          </div>

        </form>


        {/* =========================
            RESULT
        ========================== */}
        {evaluation && (
          <div className="mt-6 bg-slate-950 border border-slate-800 rounded-lg p-5">

            {/* RESULT HEADER */}
            <div className="flex items-center gap-3 mb-5">

              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center text-sm font-bold">
                ✓
              </div>

              <div>

                <p className="text-[9px] text-slate-600 uppercase tracking-[0.2em]">
                  Evaluation Result
                </p>

                <p className="text-xs font-bold text-white uppercase">
                  Grade Processed
                </p>

              </div>

            </div>


            {/* STUDENT */}
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">

              <span className="text-[9px] text-slate-600 uppercase tracking-wider">
                Student
              </span>

              <span className="text-xs text-white font-bold">
                {evaluation.name}
              </span>

            </div>


            {/* SCORE */}
            <div className="flex justify-between items-center border-b border-slate-800 py-3">

              <span className="text-[9px] text-slate-600 uppercase tracking-wider">
                Final Score
              </span>

              <span className="text-lg text-white font-black">
                {evaluation.finalScore}
              </span>

            </div>


            {/* REMARKS */}
            <div className="pt-4 text-center">

              <p className="text-[9px] text-slate-600 uppercase tracking-[0.2em]">
                Final Remarks
              </p>

              <p
                className={`mt-2 text-xl font-black uppercase tracking-widest ${
                  evaluation.remarks === 'Failed'
                    ? 'text-red-400'
                    : 'text-cyan-400'
                }`}
              >
                {evaluation.remarks}
              </p>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}

export default GradeEvaluation;