import { useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from 'react-leaflet';
import L from 'leaflet';

import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [course, setCourse] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !course || !email || !address) {
      alert('Please fill in all fields.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          address
        )}`
      );

      const data = await response.json();

      if (data.length === 0) {
        alert('Address not found. Please try a different address.');
        return;
      }

      const result = data[0];

      const newStudent = {
        id: Date.now(),
        firstName,
        lastName,
        course,
        email,
        originalAddress: address,
        latitude: Number(result.lat),
        longitude: Number(result.lon),
      };

      setStudents((prev) => [...prev, newStudent]);

      setFirstName('');
      setLastName('');
      setCourse('');
      setEmail('');
      setAddress('');
    } catch (error) {
      console.error(error);
      alert('Something went wrong while fetching the location.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    setStudents(students.filter((student) => student.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-white font-sans selection:bg-cyan-500">

      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-6 md:px-12 py-4 sticky top-0 z-50 bg-slate-950 border-b border-slate-800">

        <div>
          <h1 className="text-lg md:text-xl font-black tracking-widest uppercase text-cyan-400">
            Student Location System
          </h1>

          <p className="text-[9px] text-slate-500 uppercase tracking-widest mt-1">
            Register Students and View Their Locations
          </p>
        </div>

        <div className="bg-[#0d121c] border border-slate-800 rounded-lg px-4 py-2">

          <p className="text-[8px] uppercase tracking-widest text-slate-500">
            Total Students
          </p>

          <p className="text-lg font-black text-cyan-400 text-center">
            {students.length}
          </p>

        </div>

      </nav>


      {/* MAIN */}
      <main className="flex-1 px-6 md:px-12 py-8 md:py-10 max-w-7xl w-full mx-auto">


        {/* HEADER */}
        <div className="w-full mb-8">

          <div className="bg-[#0d121c] border border-slate-800 rounded-xl px-6 md:px-10 py-8">

            <div className="flex items-center gap-3 mb-4">

              <div className="w-2 h-10 bg-cyan-500 rounded-full"></div>

              <div>

                <p className="text-cyan-400 text-[10px] font-bold uppercase tracking-[0.2em]">
                  INF232 • React Framework
                </p>

                <p className="text-slate-500 text-[9px] uppercase tracking-widest mt-1">
                  Student Mapping Activity
                </p>

              </div>

            </div>

            <h2 className="text-3xl md:text-4xl font-black uppercase text-white">
              Student Locations
            </h2>

            <p className="text-xs md:text-sm text-slate-400 mt-3 max-w-2xl leading-relaxed">
              Register students, search their address, and display their
              locations on an interactive map.
            </p>

          </div>

        </div>


        {/* MAP + REGISTRATION */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 mb-6">


          {/* MAP */}
          <div className="lg:col-span-3 bg-[#0d121c] border border-slate-800 rounded-xl overflow-hidden">

            <div className="px-5 py-4 border-b border-slate-800">

              <p className="text-cyan-400 text-[10px] font-bold uppercase tracking-widest">
                Student Location
              </p>

              <h3 className="text-base font-bold text-white mt-1">
                Interactive Student Location Map
              </h3>

            </div>


            <div className="p-4">

              <div className="h-[500px] border border-slate-800 rounded-lg overflow-hidden">

                <MapContainer
                  center={[14.5995, 121.033]}
                  zoom={11}
                  style={{
                    height: '100%',
                    width: '100%',
                  }}
                >

                  <TileLayer
                    attribution="&copy; OpenStreetMap contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />


                  {students.map((student) => (

                    <Marker
                      key={student.id}
                      position={[
                        student.latitude,
                        student.longitude,
                      ]}
                    >

                      <Popup>

                        <div className="text-slate-900">

                          <h3 className="font-bold uppercase">
                            {student.firstName} {student.lastName}
                          </h3>

                          <p className="text-xs font-bold mt-1">
                            {student.course}
                          </p>

                          <p className="text-xs mt-2">
                            <strong>Email:</strong> {student.email}
                          </p>

                          <p className="text-xs">
                            <strong>Address:</strong>{' '}
                            {student.originalAddress}
                          </p>

                          <p className="text-xs">
                            <strong>Coordinates:</strong>{' '}
                            {student.latitude.toFixed(4)},{' '}
                            {student.longitude.toFixed(4)}
                          </p>

                        </div>

                      </Popup>

                    </Marker>

                  ))}

                </MapContainer>

              </div>

            </div>

          </div>


          {/* FORM */}
          <div className="lg:col-span-2 bg-[#0d121c] border border-slate-800 rounded-xl overflow-hidden">

            <div className="px-5 py-4 border-b border-slate-800">

              <p className="text-cyan-400 text-[10px] font-bold uppercase tracking-widest">
                Registration
              </p>

              <h3 className="text-base font-bold text-white mt-1">
                Student Registration
              </h3>

            </div>


            <form
              onSubmit={handleSubmit}
              className="p-5"
            >


              {/* FIRST NAME */}
              <div className="mb-4">

                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                  First Name
                </label>

                <input
                  type="text"
                  placeholder="Enter first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none focus:border-cyan-500 transition"
                />

              </div>


              {/* LAST NAME */}
              <div className="mb-4">

                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                  Last Name
                </label>

                <input
                  type="text"
                  placeholder="Enter last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none focus:border-cyan-500 transition"
                />

              </div>


              {/* COURSE */}
              <div className="mb-4">

                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                  Course
                </label>

                <select
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-sm text-white outline-none focus:border-cyan-500 transition"
                >

                  <option value="">
                    Select Course
                  </option>

                  <option value="BSCS">
                    BSCS
                  </option>

                  <option value="BSIT">
                    BSIT
                  </option>

                  <option value="BSIS">
                    BSIS
                  </option>

                  <option value="BSCpE">
                    BSCpE
                  </option>

                </select>

              </div>


              {/* EMAIL */}
              <div className="mb-4">

                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                  Email
                </label>

                <input
                  type="email"
                  placeholder="student@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none focus:border-cyan-500 transition"
                />

              </div>


              {/* ADDRESS */}
              <div className="mb-5">

                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                  Address
                </label>

                <textarea
                  rows="3"
                  placeholder="Example: Pasay City, Philippines"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full resize-none bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none focus:border-cyan-500 transition"
                />

              </div>


              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-cyan-500 text-slate-950 rounded-lg py-3 text-xs font-black uppercase tracking-wider hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >

                {loading
                  ? 'Registering...'
                  : 'Register Student'}

              </button>

            </form>

          </div>

        </div>


        {/* STUDENT ROSTER */}
        <div className="bg-[#0d121c] border border-slate-800 rounded-xl overflow-hidden">

          <div className="px-5 py-4 border-b border-slate-800">

            <p className="text-cyan-400 text-[10px] font-bold uppercase tracking-widest">
              Student Records
            </p>

            <h3 className="text-base font-bold text-white mt-1">
              Registered Roster
            </h3>

          </div>


          <div className="overflow-x-auto">

            <table className="w-full text-left">

              <thead>

                <tr className="border-b border-slate-800 text-[9px] uppercase tracking-widest text-slate-500">

                  <th className="px-5 py-4">
                    #
                  </th>

                  <th className="px-5 py-4">
                    Student
                  </th>

                  <th className="px-5 py-4">
                    Course
                  </th>

                  <th className="px-5 py-4">
                    Email
                  </th>

                  <th className="px-5 py-4">
                    Address
                  </th>

                  <th className="px-5 py-4">
                    Coordinates
                  </th>

                  <th className="px-5 py-4">
                    Action
                  </th>

                </tr>

              </thead>


              <tbody>

                {students.length === 0 ? (

                  <tr>

                    <td
                      colSpan="7"
                      className="px-5 py-10 text-center text-xs uppercase tracking-widest text-slate-600"
                    >
                      No Students Found in Database
                    </td>

                  </tr>

                ) : (

                  students.map((student, index) => (

                    <tr
                      key={student.id}
                      className="border-b border-slate-800/70 text-xs text-slate-400 hover:bg-slate-900/40 transition"
                    >

                      <td className="px-5 py-4 text-slate-500">
                        {index + 1}
                      </td>


                      <td className="px-5 py-4 font-bold text-white uppercase">
                        {student.firstName} {student.lastName}
                      </td>


                      <td className="px-5 py-4">

                        <span className="inline-block bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 rounded-md px-2 py-1 text-[9px] font-bold">
                          {student.course}
                        </span>

                      </td>


                      <td className="px-5 py-4">
                        {student.email}
                      </td>


                      <td className="px-5 py-4">
                        {student.originalAddress}
                      </td>


                      <td className="px-5 py-4 font-mono text-[10px]">

                        <div>
                          LAT: {student.latitude.toFixed(5)}
                        </div>

                        <div>
                          LNG: {student.longitude.toFixed(5)}
                        </div>

                      </td>


                      <td className="px-5 py-4">

                        <button
                          onClick={() => handleDelete(student.id)}
                          className="border border-cyan-500/40 text-cyan-400 px-3 py-1.5 rounded-md text-[9px] font-bold uppercase hover:bg-cyan-500 hover:text-slate-950 transition"
                        >
                          Delete
                        </button>

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        </div>

      </main>


      {/* FOOTER */}
      <footer className="border-t border-slate-800 bg-[#080c14] px-6 md:px-12 py-6">

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3">

          <div className="text-center md:text-left">

            <p className="text-cyan-400 text-xs font-bold uppercase tracking-widest">
              DJ DE GUZMAN
            </p>

            <p className="text-[9px] text-slate-600 uppercase tracking-widest mt-1">
              Student Location System
            </p>

          </div>


          <div className="text-center md:text-right">

            <p className="text-[9px] text-slate-600 uppercase tracking-widest">
              INF232 • Web Development
            </p>

            <p className="text-[9px] text-slate-700 mt-1">
              React • Leaflet • OpenStreetMap
            </p>

          </div>

        </div>

      </footer>

    </div>
  );
}

export default App;