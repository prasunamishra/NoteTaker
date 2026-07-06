function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder="Search notes..."
      className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm outline-none transition focus:border-indigo-400 focus:bg-white"
    />
  )
}

export default SearchBar