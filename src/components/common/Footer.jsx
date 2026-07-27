function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <p className="font-semibold text-white">GBU Grievance Management System</p>
        <p className="text-sm text-slate-400 mt-1">
          Gautam Buddha University &copy; {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}

export default Footer;