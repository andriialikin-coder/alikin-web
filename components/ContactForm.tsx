'use client';

import { useState, type FormEvent, type ChangeEvent } from 'react';
import { supabase, type LeadInsert } from '@/lib/supabaseClient';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

interface FormData {
  name: string;
  contact: string;
  message: string;
}

const INITIAL_FORM: FormData = { name: '', contact: '', message: '' };

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic client-side validation
    if (!formData.name.trim() || !formData.contact.trim() || !formData.message.trim()) {
      setStatus('error');
      setErrorMessage('Пожалуйста, заполните все поля.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    const payload: LeadInsert = {
      name: formData.name.trim(),
      contact: formData.contact.trim(),
      message: formData.message.trim(),
    };

    const { error } = await supabase().from('leads').insert(payload);

    if (error) {
      console.error('Supabase insert error:', error);
      setStatus('error');
      setErrorMessage(
        'Не удалось отправить сообщение. Попробуйте чуть позже или напишите напрямую в Telegram.'
      );
      return;
    }

    setStatus('success');
    setFormData(INITIAL_FORM);
  };

  const handleReset = () => {
    setStatus('idle');
    setErrorMessage('');
  };

  return (
    <section id="contact" className="bg-white py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: Copy */}
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold mb-4">
              Контакт
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6 leading-tight">
              Есть задача?
              <br />
              Давайте решим её вместе
            </h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Опишите проект в форме — отвечу в течение{' '}
              <strong className="text-slate-800">24 часов</strong>. Первая
              консультация бесплатна.
            </p>

            {/* Contact cards */}
            <div className="flex flex-col gap-4">
              <a
                id="contact-telegram-link"
                href="https://t.me/alikin"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:border-indigo-200 hover:bg-indigo-50 group transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center text-sky-600 group-hover:scale-110 transition-transform duration-200">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M11.944 0A12 12 0 1 0 24 12 12 12 0 0 0 11.944 0zM19.957 6.888l-2.007 9.456c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.87.765z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-800">Telegram</div>
                  <div className="text-sm text-slate-500">@alikin</div>
                </div>
              </a>

              <a
                id="contact-github-link"
                href="https://github.com/alikin"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:border-indigo-200 hover:bg-indigo-50 group transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700 group-hover:scale-110 transition-transform duration-200">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-800">GitHub</div>
                  <div className="text-sm text-slate-500">github.com/alikin</div>
                </div>
              </a>
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8">
            {status === 'success' ? (
              /* Success state */
              <div className="flex flex-col items-center justify-center text-center py-8 gap-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-emerald-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Заявка отправлена!</h3>
                  <p className="text-slate-600 text-sm">
                    Отвечу в течение 24 часов. Спасибо, что написали!
                  </p>
                </div>
                <button
                  id="contact-form-reset"
                  onClick={handleReset}
                  className="mt-2 px-6 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-700 text-sm font-medium hover:border-slate-300 hover:bg-slate-50 transition-colors duration-200"
                >
                  Отправить ещё одно
                </button>
              </div>
            ) : (
              /* Form */
              <form
                id="contact-form"
                onSubmit={handleSubmit}
                noValidate
                className="flex flex-col gap-5"
              >
                <h3 className="text-xl font-bold text-slate-900">Оставить заявку</h3>

                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="contact-name"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Ваше имя <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Иван Петров"
                    disabled={status === 'loading'}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Contact */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="contact-contact"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Telegram или Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="contact-contact"
                    name="contact"
                    type="text"
                    autoComplete="email"
                    value={formData.contact}
                    onChange={handleChange}
                    placeholder="@username или hello@example.com"
                    disabled={status === 'loading'}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="contact-message"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Расскажите о задаче <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Что нужно сделать? Какие сроки и бюджет?"
                    disabled={status === 'loading'}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed resize-none"
                  />
                </div>

                {/* Error message */}
                {status === 'error' && errorMessage && (
                  <div
                    role="alert"
                    className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm"
                  >
                    <svg
                      className="w-4 h-4 mt-0.5 shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Submit */}
                <button
                  id="contact-form-submit"
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100 transition-all duration-200 shadow-sm shadow-indigo-200"
                >
                  {status === 'loading' ? (
                    <>
                      <svg
                        className="animate-spin w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      Отправляем...
                    </>
                  ) : (
                    'Отправить заявку'
                  )}
                </button>

                <p className="text-xs text-slate-400 text-center">
                  Никакого спама. Только по делу.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
