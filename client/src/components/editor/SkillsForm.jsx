import React from 'react';
import { motion } from 'framer-motion';
import { Code, Plus, X } from 'lucide-react';

const levelOptions = [
  { value: 'Beginner', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30', activeColor: 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25' },
  { value: 'Intermediate', color: 'bg-sky-500/20 text-sky-400 border-sky-500/30', activeColor: 'bg-sky-500 text-white shadow-lg shadow-sky-500/25' },
  { value: 'Advanced', color: 'bg-amber-500/20 text-amber-400 border-amber-500/30', activeColor: 'bg-amber-500 text-white shadow-lg shadow-amber-500/25' },
  { value: 'Expert', color: 'bg-rose-500/20 text-rose-400 border-rose-500/30', activeColor: 'bg-rose-500 text-white shadow-lg shadow-rose-500/25' },
];



const SkillsForm = ({ skills, addSkill, updateSkill, removeSkill }) => {
  return (
    <motion.div
      key="skills"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-6 max-w-2xl"
    >
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold mb-1">Skills</h2>
          <p className="text-sm text-slate-500">Add your technical and soft skills.</p>
        </div>
        <button
          onClick={addSkill}
          className="px-4 py-2 bg-slate-950 dark:bg-white text-white dark:text-slate-950 hover:bg-slate-850 dark:hover:bg-slate-100 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add
        </button>
      </div>

      {skills.length === 0 && (
        <div className="text-center py-12 text-slate-500">
          <Code className="w-12 h-12 mx-auto mb-3 opacity-20" />
          <p>No skills added yet. Click "Add" to get started!</p>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {skills.map((skill, index) => (
          <div key={index} className="t-card p-3 rounded-2xl flex items-center gap-3 relative">
            <div className="flex-1 flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={skill.name}
                onChange={(e) => updateSkill(index, 'name', e.target.value)}
                className="w-full t-input rounded-xl px-3 py-2 text-sm flex-1"
                placeholder="React.js"
              />
              <select
                value={skill.level}
                onChange={(e) => updateSkill(index, 'level', e.target.value)}
                className="w-full sm:w-48 t-input rounded-xl px-3 py-2 text-sm cursor-pointer outline-none bg-transparent"
              >
                {levelOptions.map(opt => (
                  <option key={opt.value} value={opt.value} className="text-slate-900 bg-white dark:bg-slate-900 dark:text-white">
                    {opt.value}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={() => removeSkill(index)}
              className="p-2 hover:bg-red-500/20 rounded-lg text-red-400 transition-colors shrink-0 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default SkillsForm;
