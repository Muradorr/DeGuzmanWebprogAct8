import { useState } from 'react';

function AttendanceChecker() {
  const [employeeName, setEmployeeName] = useState('');
  const [timeIn, setTimeIn] = useState('');
  const [result, setResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleCheck = (e) => {
    e.preventDefault();

    if (employeeName === '' && timeIn === '') {
      setErrorMsg('Please enter employee name and time in.');
      setResult(null);
      return;
    }

    if (employeeName === '') {
      setErrorMsg('Please enter employee name.');
      setResult(null);
      return;
    }

    if (timeIn === '') {
      setErrorMsg('Please enter time in.');
      setResult(null);
      return;
    }

    setErrorMsg('');

    const time = parseFloat(timeIn);

    let status =
      time <= 7
        ? 'On Time'
        : time <= 8
        ? 'Late'
        : 'Very Late';

    let textColor =
      time <= 7
        ? 'text-cyan-400'
        : time <= 8
        ? 'text-amber-400'
        : 'text-red-400';

    setResult({
      name: employeeName,
      time,
      status,
      textColor
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
                Activity 5
              </p>

              <p className="text-slate-600 text-[8px] uppercase tracking-widest mt-1">
                Attendance Module
              </p>

            </div>

          </div>

          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white">
            Time-in Checker
          </h2>

          <p className="text-xs text-slate-500 leading-relaxed mt-2">
            Check an employee's arrival time and determine their attendance status.
          </p>

        </div>


        {/* =========================
            FORM
        ========================== */}
        <form onSubmit={handleCheck} className="flex flex-col gap-5">

          {/* EMPLOYEE NAME */}
          <div>

            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Employee Name
            </label>

            <input
              type="text"
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
              placeholder="Enter employee name"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-sm text-white placeholder:text-slate-700 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/20 transition"
            />

          </div>


          {/* TIME ARRIVAL */}
          <div>

            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Time Arrival
            </label>

            <input
              type="number"
              step="0.1"
              value={timeIn}
              onChange={(e) => setTimeIn(e.target.value)}
              placeholder="Example: 8.5"
              min="0"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-sm text-white placeholder:text-slate-700 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/20 transition"
            />

            <p className="text-[9px] text-slate-600 uppercase tracking-widest mt-2">
              Use decimal hours — Example: 8.5 = 8:30 AM
            </p>

          </div>


          {/* ATTENDANCE GUIDE */}
          <div className="bg-slate-950 border border-slate-800 rounded-lg p-4">

            <p className="text-[9px] text-slate-600 uppercase tracking-[0.2em] mb-3">
              Attendance Guide
            </p>

            <div className="space-y-2">

              <div className="flex justify-between items-center text-[9px] uppercase tracking-wider">

                <span className="text-slate-500">
                  7:00 AM or earlier
                </span>

                <span className="text-cyan-400 font-bold">
                  On Time
                </span>

              </div>

              <div className="flex justify-between items-center text-[9px] uppercase tracking-wider">

                <span className="text-slate-500">
                  7:01 – 8:00 AM
                </span>

                <span className="text-amber-400 font-bold">
                  Late
                </span>

              </div>

              <div className="flex justify-between items-center text-[9px] uppercase tracking-wider">

                <span className="text-slate-500">
                  After 8:00 AM
                </span>

                <span className="text-red-400 font-bold">
                  Very Late
                </span>

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
              Log Time →
            </button>

            <button
              type="button"
              onClick={() => {
                setEmployeeName('');
                setTimeIn('');
                setResult(null);
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
        {result && (
          <div className="mt-6 bg-slate-950 border border-slate-800 rounded-lg p-5 text-center">

            {/* RESULT ICON */}
            <div className="w-10 h-10 mx-auto mb-4 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center text-sm font-bold">
              ✓
            </div>


            {/* EMPLOYEE */}
            <p className="text-[9px] text-slate-600 uppercase tracking-[0.2em]">
              Employee
            </p>

            <p className="mt-1 text-sm font-bold text-white uppercase">
              {result.name}
            </p>


            {/* ARRIVAL TIME */}
            <div className="mt-4 border-t border-slate-800 pt-4">

              <p className="text-[9px] text-slate-600 uppercase tracking-[0.2em]">
                Arrival Time
              </p>

              <p className="mt-1 text-sm text-slate-300 font-bold">
                {result.time}
              </p>

            </div>


            {/* STATUS */}
            <div className="mt-4 border-t border-slate-800 pt-4">

              <p className="text-[9px] text-slate-600 uppercase tracking-[0.2em]">
                Attendance Status
              </p>

              <p
                className={`mt-2 text-xl font-black uppercase tracking-widest ${result.textColor}`}
              >
                {result.status}
              </p>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}

export default AttendanceChecker;