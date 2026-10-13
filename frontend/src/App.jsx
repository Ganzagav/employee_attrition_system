import React, { useState } from 'react';
import axios from 'axios';
import { UserCheck, UserX, AlertCircle, Loader2, Briefcase, Building, GraduationCap, DollarSign, Calendar, Award } from 'lucide-react';

function App() {
  const [formData, setFormData] = useState({
    Education: 'Bachelors',
    JoiningYear: 2018,
    City: 'Bangalore',
    PaymentTier: 3,
    Age: 28,
    Gender: 'Male',
    EverBenched: 'No',
    ExperienceInCurrentDomain: 3
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: ['JoiningYear', 'PaymentTier', 'Age', 'ExperienceInCurrentDomain'].includes(name) 
        ? Number(value) 
        : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await axios.post('http://localhost:5000/predict', formData);
      setResult(response.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Failed to connect to backend server. Make sure Flask is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <header className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-indigo-600/20 rounded-2xl mb-4 text-indigo-400">
            <Briefcase className="w-8 h-8" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Employee Attrition Prediction System
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-400">
            Full-Stack Machine Learning Application (Flask + React)
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Form Section */}
          <div className="lg:col-span-2 bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6 sm:p-8 shadow-xl">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <Award className="w-5 h-5 text-indigo-400" /> Enter Employee Details
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                {/* Education */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Education</label>
                  <select
                    name="Education"
                    value={formData.Education}
                    onChange={handleChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <option value="Bachelors">Bachelors</option>
                    <option value="Masters">Masters</option>
                    <option value="PHD">PHD</option>
                  </select>
                </div>

                {/* City */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">City</label>
                  <select
                    name="City"
                    value={formData.City}
                    onChange={handleChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <option value="Bangalore">Bangalore</option>
                    <option value="Pune">Pune</option>
                    <option value="New Delhi">New Delhi</option>
                  </select>
                </div>

                {/* Joining Year */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Joining Year</label>
                  <input
                    type="number"
                    name="JoiningYear"
                    min="2012"
                    max="2018"
                    value={formData.JoiningYear}
                    onChange={handleChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                {/* Payment Tier */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Payment Tier (1-3)</label>
                  <select
                    name="PaymentTier"
                    value={formData.PaymentTier}
                    onChange={handleChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <option value={1}>Tier 1</option>
                    <option value={2}>Tier 2</option>
                    <option value={3}>Tier 3</option>
                  </select>
                </div>

                {/* Age */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Age (Years)</label>
                  <input
                    type="number"
                    name="Age"
                    min="18"
                    max="60"
                    value={formData.Age}
                    onChange={handleChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Gender</label>
                  <select
                    name="Gender"
                    value={formData.Gender}
                    onChange={handleChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                {/* Ever Benched */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Ever Benched?</label>
                  <select
                    name="EverBenched"
                    value={formData.EverBenched}
                    onChange={handleChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>

                {/* Experience in Current Domain */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Domain Experience (Yrs)</label>
                  <input
                    type="number"
                    name="ExperienceInCurrentDomain"
                    min="0"
                    max="15"
                    value={formData.ExperienceInCurrentDomain}
                    onChange={handleChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-6 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 px-6 rounded-xl transition duration-200 flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Analyzing Employee...
                  </>
                ) : (
                  'Predict Attrition Risk'
                )}
              </button>
            </form>
          </div>

          {/* Results Section */}
          <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white mb-6">Prediction Result</h2>

              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              {!result && !error && !loading && (
                <div className="text-center py-12 text-slate-500">
                  <p>Fill out the form and click predict to view the employee attrition risk assessment.</p>
                </div>
              )}

              {loading && (
                <div className="text-center py-16 text-slate-400 flex flex-col items-center justify-center gap-3">
                  <Loader2 className="w-8 h-8 animate-spin text-indigo-400" />
                  <p className="text-sm">Running ML model inference...</p>
                </div>
              )}

              {result && !loading && (
                <div className="space-y-6">
                  
                  {/* Status Card */}
                  <div className={`p-6 rounded-2xl border text-center transition-all ${
                    result.prediction === 1 
                      ? 'bg-red-500/10 border-red-500/30 text-red-400' 
                      : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                  }`}>
                    <div className="inline-flex p-3 rounded-full mb-3 bg-slate-900/40">
                      {result.prediction === 1 ? (
                        <UserX className="w-10 h-10 text-red-400" />
                      ) : (
                        <UserCheck className="w-10 h-10 text-emerald-400" />
                      )}
                    </div>
                    <h3 className="text-lg font-bold">
                      {result.prediction === 1 ? 'High Risk of Leaving' : 'Low Risk (Likely to Stay)'}
                    </h3>
                    <p className="text-sm mt-1 opacity-90">{result.message}</p>
                  </div>

                  {/* Probability Score */}
                  <div className="bg-slate-900/60 rounded-xl p-4 border border-slate-700/50">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-400">Attrition Probability</span>
                      <span className="font-bold text-white">{(result.probability * 100).toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                      <div 
                        className={`h-2.5 rounded-full transition-all duration-500 ${
                          result.probability > 0.5 ? 'bg-red-500' : 'bg-emerald-500'
                        }`}
                        style={{ width: `${result.probability * 100}%` }}
                      ></div>
                    </div>
                  </div>

                </div>
              )}
            </div>

            <div className="mt-8 pt-4 border-t border-slate-700/50 text-center text-xs text-slate-500">
              Powered by Flask & Scikit-Learn RandomForest
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;