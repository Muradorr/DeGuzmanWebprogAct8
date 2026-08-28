import { useState } from 'react';

function ElectricityBill() {
  const [customerName, setCustomerName] = useState('');
  const [consumption, setConsumption] = useState('');
  const [result, setResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleCalculate = (e) => {
    e.preventDefault();

    if (customerName === '' && consumption === '') {
      setErrorMsg('Please enter customer name and consumption.');
      setResult(null);
      return;
    }

    if (customerName === '') {
      setErrorMsg('Please enter customer name.');
      setResult(null);
      return;
    }

    if (consumption === '') {
      setErrorMsg('Please enter consumption in kWh.');
      setResult(null);
      return;
    }

    setErrorMsg('');

    const kwh = parseFloat(consumption);
    let totalBill = 0;

    if (kwh <= 100) {
      totalBill = kwh * 10;
    } else if (kwh <= 200) {
      totalBill = (100 * 10) + ((kwh - 100) * 12);
    } else if (kwh <= 300) {
      totalBill =
        (100 * 10) +
        (100 * 12) +
        ((kwh - 200) * 15);
    } else {
      totalBill =
        (100 * 10) +
        (100 * 12) +
        (100 * 15) +
        ((kwh - 300) * 18);
    }

    setResult({
      name: customerName,
      kwh,
      bill: totalBill.toFixed(2)
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
                Activity 4
              </p>

              <p className="text-slate-600 text-[8px] uppercase tracking-widest mt-1">
                Calculation Module
              </p>

            </div>

          </div>

          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white">
            Electricity Bill
          </h2>

          <p className="text-xs text-slate-500 leading-relaxed mt-2">
            Calculate the customer's electricity bill based on kWh consumption.
          </p>

        </div>


        {/* =========================
            FORM
        ========================== */}
        <form onSubmit={handleCalculate} className="flex flex-col gap-5">

          {/* CUSTOMER NAME */}
          <div>

            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Customer Name
            </label>

            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Enter customer name"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-sm text-white placeholder:text-slate-700 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/20 transition"
            />

          </div>


          {/* CONSUMPTION */}
          <div>

            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Consumption (kWh)
            </label>

            <input
              type="number"
              value={consumption}
              onChange={(e) => setConsumption(e.target.value)}
              placeholder="Enter kWh consumption"
              min="0"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-sm text-white placeholder:text-slate-700 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/20 transition"
            />

          </div>


          {/* RATE INFORMATION */}
          <div className="bg-slate-950 border border-slate-800 rounded-lg p-4">

            <p className="text-[9px] text-slate-600 uppercase tracking-[0.2em] mb-3">
              Electricity Rate Guide
            </p>

            <div className="grid grid-cols-2 gap-y-2 text-[9px] uppercase tracking-wider">

              <span className="text-slate-500">
                0 – 100 kWh
              </span>

              <span className="text-right text-slate-300">
                ₱10 / kWh
              </span>

              <span className="text-slate-500">
                101 – 200 kWh
              </span>

              <span className="text-right text-slate-300">
                ₱12 / kWh
              </span>

              <span className="text-slate-500">
                201 – 300 kWh
              </span>

              <span className="text-right text-slate-300">
                ₱15 / kWh
              </span>

              <span className="text-slate-500">
                301+ kWh
              </span>

              <span className="text-right text-slate-300">
                ₱18 / kWh
              </span>

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
              Calculate →
            </button>

            <button
              type="button"
              onClick={() => {
                setCustomerName('');
                setConsumption('');
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
          <div className="mt-6 bg-slate-950 border border-slate-800 rounded-lg p-5">

            <div className="flex items-center gap-3 mb-4">

              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center text-sm font-bold">
                ₱
              </div>

              <div>

                <p className="text-[9px] text-slate-600 uppercase tracking-[0.2em]">
                  Billing Summary
                </p>

                <p className="text-xs font-bold text-white uppercase">
                  Calculation Complete
                </p>

              </div>

            </div>


            <div className="space-y-3">

              <div className="flex justify-between items-center border-b border-slate-800 pb-2">

                <span className="text-[9px] text-slate-600 uppercase tracking-wider">
                  Account
                </span>

                <span className="text-xs text-white font-bold">
                  {result.name}
                </span>

              </div>


              <div className="flex justify-between items-center border-b border-slate-800 pb-2">

                <span className="text-[9px] text-slate-600 uppercase tracking-wider">
                  Usage
                </span>

                <span className="text-xs text-white font-bold">
                  {result.kwh} kWh
                </span>

              </div>


              <div className="pt-2 text-center">

                <p className="text-[9px] text-slate-600 uppercase tracking-[0.2em]">
                  Total Amount Due
                </p>

                <p className="mt-2 text-2xl font-black tracking-wide text-cyan-400">
                  ₱{result.bill}
                </p>

              </div>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}

export default ElectricityBill;