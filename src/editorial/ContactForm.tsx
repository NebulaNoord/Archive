import { useState } from 'react'
import { useForm, ValidationError } from '@formspree/react'

const FORMSPREE_ID = 'xgogvwvj'

export function ContactForm() {
  const [state, handleSubmit] = useForm(FORMSPREE_ID)
  const [company, setCompany] = useState('') // honeypot

  const field =
    'edi-border bg-[var(--surface)] px-3 py-2 text-[var(--fg)] outline-none focus:bg-white'

  if (state.succeeded) {
    return (
      <p className="edi-tag mt-12 inline-block bg-[var(--accent)] px-4 py-3 text-[var(--accent-ink)]">
        MESSAGE SENT — THANKS FOR REACHING OUT!
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mt-12 grid max-w-xl gap-3 sm:grid-cols-2">
      {/* honeypot — hidden from humans, bots fill it */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        className="hidden"
        aria-hidden
      />

      <label className="edi-tag text-[var(--muted)] sm:col-span-1">
        NAME
        <input
          type="text"
          name="name"
          required
          className={`mt-1 block w-full ${field}`}
          placeholder="Your name"
        />
        <ValidationError field="name" errors={state.errors} className="mt-1 block text-[var(--accent)]" />
      </label>

      <label className="edi-tag text-[var(--muted)] sm:col-span-1">
        EMAIL
        <input
          type="email"
          name="email"
          required
          className={`mt-1 block w-full ${field}`}
          placeholder="you@email.com"
        />
        <ValidationError field="email" errors={state.errors} className="mt-1 block text-[var(--accent)]" />
      </label>

      <label className="edi-tag text-[var(--muted)] sm:col-span-2">
        MESSAGE
        <textarea
          name="message"
          required
          rows={4}
          className={`mt-1 block w-full ${field}`}
          placeholder="Tell me about your project…"
        />
        <ValidationError field="message" errors={state.errors} className="mt-1 block text-[var(--accent)]" />
      </label>

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={state.submitting}
          className="edi-tag edi-border bg-[var(--accent)] px-6 py-3 text-[var(--accent-ink)] hover:bg-[var(--fg)] disabled:opacity-60"
        >
          {state.submitting ? 'SENDING…' : 'SEND MESSAGE →'}
        </button>
      </div>
    </form>
  )
}
