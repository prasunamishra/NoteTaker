import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="flex gap-3 rounded-3xl border border-slate-200 bg-white p-3 shadow-sm">
      <Link to="/" className="rounded-full px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
        Dashboard
      </Link>
      <Link to="/tasks" className="rounded-full px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
        Tasks
      </Link>
    </nav>
  )
}

export default Navbar
