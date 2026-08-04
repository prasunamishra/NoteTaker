import { useState } from 'react'

function AIControls({ onGenerate }) {
  const [prompt, setPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const trimmedPrompt = prompt.trim()
    if (!trimmedPrompt) return

    setIsGenerating(true)
    try {
      await onGenerate(trimmedPrompt)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">AI Note Helper</h2>
        <p className="text-sm text-slate-500">Ask the AI for note ideas, summaries, or structure.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          rows={4}
          placeholder="Enter a prompt for the AI"
          className="w-full rounded-2xl border border-slate-300 px-3 py-3 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
        />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="submit"
            disabled={isGenerating}
            className="rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {isGenerating ? 'Generating...' : 'Generate AI Note'}
          </button>
          <p className="text-xs text-slate-500">Use a prompt like: "Summarize the note content" or "Suggest a note title and summary."</p>
        </div>
      </form>
    </section>
  )
}

export default AIControls
