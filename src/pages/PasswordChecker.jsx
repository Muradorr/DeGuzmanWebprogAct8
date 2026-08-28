import { useState } from 'react';

function PasswordChecker() {
  const [password, setPassword] = useState('');
  const [result, setResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleCheck = (e) => {
    e.preventDefault();

    if (password === '') {
      setErrorMsg('Please enter a password to check.');
      setResult(null);
      return;
    }

    setErrorMsg('');

    const len = password.length;

    let strength =
      len < 6
        ? 'Weak'
        : len <= 9
        ? 'Medium'
        : 'Strong';

    let textColor =
      len < 6
        ? 'text-red-400'
        : len <= 9
        ? 'text-amber-400'
        : 'text-cyan-400';

    setResult({ strength, textColor });
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
                Activity 3
              </p>

              <p className="text-slate-600 text-[8px] uppercase tracking-widest mt-1">
                Validation Module
              </p>

            </div>

          </div>

          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white">
            Password Strength
          </h2>

          <p className="text-xs text-slate-500 leading-relaxed mt-2">
            Check the length of your password and determine its strength.
          </p>

        </div>


        {/* =========================
            FORM
        ========================== */}
        <form onSubmit={handleCheck} className="flex flex-col gap-5">

          {/* PASSWORD INPUT */}
          <div>

            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Enter Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-sm text-white placeholder:text-slate-700 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/20 transition"
            />

            <div className="flex justify-between items-center mt-2">

              <p className="text-[9px] text-slate-600 uppercase tracking-widest">
                Password Length
              </p>

              <p className="text-[10px] text-cyan-400 font-bold">
                {password.length} characters
              </p>

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
              Check Strength →
            </button>

            <button
              type="button"
              onClick={() => {
                setPassword('');
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

            <p className="text-[9px] text-slate-600 uppercase tracking-[0.2em]">
              Password Status
            </p>

            <p
              className={`mt-2 text-2xl font-black uppercase tracking-widest ${result.textColor}`}
            >
              {result.strength}
            </p>

            {/* STRENGTH INDICATOR */}
            <div className="flex gap-1.5 mt-4">

              <div
                className={`h-1.5 flex-1 rounded-full ${
                  result.strength === 'Weak' ||
                  result.strength === 'Medium' ||
                  result.strength === 'Strong'
                    ? 'bg-cyan-500'
                    : 'bg-slate-800'
                }`}
              ></div>

              <div
                className={`h-1.5 flex-1 rounded-full ${
                  result.strength === 'Medium' ||
                  result.strength === 'Strong'
                    ? 'bg-cyan-500'
                    : 'bg-slate-800'
                }`}
              ></div>

              <div
                className={`h-1.5 flex-1 rounded-full ${
                  result.strength === 'Strong'
                    ? 'bg-cyan-500'
                    : 'bg-slate-800'
                }`}
              ></div>

            </div>

            <p className="text-[9px] text-slate-600 uppercase tracking-widest mt-3">
              Based on password length
            </p>

          </div>
        )}

      </div>

    </div>
  );
}

export default PasswordChecker;