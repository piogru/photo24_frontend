export default function Footer() {
  return (
    <footer className="flex flex-row justify-center p-2 space-x-2 border-t-2 border-slate-600">
      {[1, 2, 3].map((i) => {
        return <div key={i}>Link {i}</div>;
      })}
      <span className="inline">2024</span>
    </footer>
  );
}
