function StatCard({ icon: Icon, label, value, colorClass }) {
  return (
    <div className="bg-white/70 backdrop-blur-md rounded-2xl border border-white/40 shadow-sm p-5 flex items-center gap-4 hover:shadow-md transition-shadow duration-200">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClass}`}>
        <Icon className="text-xl" aria-hidden="true" />
      </div>
      <div>
        <p className="text-sm text-slate-500">{label}</p>
        <p className="text-2xl font-bold text-slate-800">{value}</p>
      </div>
    </div>
  );
}

export default StatCard;