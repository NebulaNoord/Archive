import { useState } from 'react'

type Status = 'idle' | 'sending' | 'sent' | 'error'

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [form, setForm] = useState({ name: '', email: '', message: '', company: '' })

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.company) return // honeypot tripped
    setStatus('sending')
    try {
      const r = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const j = (await r.json()) as { ok: boolean; error?: string }
      if (!r.ok || !j.ok) throw new Error(j.error || 'Failed to send')
      setStatus('sent')
      setForm({ name: '', email: '', message: '', company: '' })
    } catch {
      setStatus('error')
    }
  }

  const field =
    'edi-border bg-[var(--surface)] px-3 py-2 text-[var(--fg)] outline-none focus:bg-white'

  return (
    <form onSubmit={submit} className="mt-12 grid max-w-xl gap-3 sm:grid-cols-2">
      <label className="edi-tag text-[var(--muted)] sm:col-span-1">
        NAME
        <input
          type="text"
          required
          value={form.name}
          onChange={update('name')}
          className={`mt-1 block w-full ${field}`}
          placeholder="Your name"
        />
      </label>
      <label className="edi-tag text-[var(--muted)] sm:col-span-1">
        EMAIL
        <input
          type="email"
          required
          value={form.email}
          onChange={update('email')}
          className={`mt-1 block w-full ${field}`}
          placeholder="you@email.com"
        />
      </label>
      <label className="edi-tag text-[var(--muted)] sm:col-span-2">
        MESSAGE
        <textarea
          required
          rows={4}
          value={form.message}
          onChange={update('message')}
          className={`mt-1 block w-full ${field}`}
          placeholder="Tell me about your project…"
        />
      </label>
      {/* honeypot — hidden from humans, bots fill it */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={form.company}
        onChange={update('company')}
        className="hidden"
        aria-hidden
      />
      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="edi-tag edi-border bg-[var(--accent)] px-6 py-3 text-[var(--accent-ink)] hover:bg-[var(--fg)] disabled:opacity-60"
        >
          {status === 'sending' ? 'SENDING…' : 'SEND MESSAGE →'}
        </button>
        {status === 'sent' && (
          <span className="edi-tag ml-3 text-[var(--accent)]">SENT — THANKS!</span>
        )}
        {status === 'error' && (
          <span className="edi-tag ml-3 text-[var(--accent)]">
            SOMETHING WENT WRONG — TRY EMAIL BELOW
          </span>
        )}
      </div>
    </form>
  )
}
