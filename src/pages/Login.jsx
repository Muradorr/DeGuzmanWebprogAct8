import { useState } from 'react';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === '' && password === '') {
      setMessage('Please enter username and password.');
    } else if (username === '') {
      setMessage('Please enter your username.');
    } else if (password === '') {
      setMessage('Please enter your password.');
    } else if (username === 'admin' && password === '12345') {
      setMessage('Login successful!');
      setIsLoggedIn(true);
    } else {
      setMessage('Invalid username or password.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    setMessage('');
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
                Activity 1
              </p>

              <p className="text-slate-600 text-[8px] uppercase tracking-widest mt-1">
                Authentication Module
              </p>
            </div>

          </div>

          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white">
            Login Authentication
          </h2>

          <p className="text-xs text-slate-500 leading-relaxed mt-2">
            Validate user credentials and manage login/logout state.
          </p>

        </div>


        {/* =========================
            LOGGED IN STATE
        ========================== */}
        {isLoggedIn ? (

          <div className="text-center py-4">

            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-cyan-400 font-bold uppercase text-xs tracking-wider p-4 mb-6">
              {message}
            </div>

            <div className="mb-6">

              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center text-lg font-black">
                ✓
              </div>

              <p className="text-[9px] text-slate-600 uppercase tracking-widest mb-2">
                Authentication Status
              </p>

              <h3 className="text-lg font-black uppercase text-white">
                Welcome, {username}!
              </h3>

              <p className="text-xs text-slate-500 mt-2">
                You have successfully logged into the system.
              </p>

            </div>

            <button
              onClick={handleLogout}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg py-3 text-xs font-bold text-slate-300 uppercase tracking-wider hover:bg-slate-700 hover:text-white transition"
            >
              Logout
            </button>

          </div>

        ) : (

          /* =========================
              LOGIN FORM
          ========================== */
          <form onSubmit={handleLogin} className="flex flex-col gap-5">

            {/* USERNAME */}
            <div>

              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                Username
              </label>

              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-sm text-white placeholder:text-slate-700 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/20 transition"
              />

            </div>


            {/* PASSWORD */}
            <div>

              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-sm text-white placeholder:text-slate-700 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/20 transition"
              />

            </div>


            {/* LOGIN BUTTON */}
            <button
              type="submit"
              className="w-full bg-cyan-500 text-slate-950 rounded-lg py-3 text-xs font-black uppercase tracking-wider hover:bg-cyan-400 transition mt-1"
            >
              Login →
            </button>


            {/* SAMPLE CREDENTIALS */}
            <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 text-center">

              <p className="text-[8px] text-slate-600 uppercase tracking-widest mb-1">
                Sample Credentials
              </p>

              <p className="text-[10px] text-slate-400 font-mono">
                admin&nbsp;&nbsp;/&nbsp;&nbsp;12345
              </p>

            </div>


            {/* MESSAGE */}
            {message && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">

                <p className="text-center text-[10px] font-bold text-red-400 uppercase tracking-wider">
                  {message}
                </p>

              </div>
            )}

          </form>

        )}

      </div>

    </div>
  );
}

export default Login;