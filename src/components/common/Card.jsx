function Card({ children, className = "" }) {
  return (
    <div
      className={
        "bg-white/60 backdrop-blur-md border border-white/40 " +
        "rounded-2xl shadow-sm p-6 " +
        className
      }
    >
      {children}
    </div>
  );
}

export default Card;