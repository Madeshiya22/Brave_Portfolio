import React, { useState, useRef } from 'react';
import { X, Mail, User, Send, MessageSquare } from 'lucide-react';

const ContactModal = ({ onClose }) => {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const formRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSending(true);
    setError('');

    const fd = new FormData(formRef.current);

    try {
      const res = await fetch('https://formspree.io/f/xwpbovzl', {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fd.get('name'),
          email: fd.get('email'),
          message: fd.get('message'),
          _replyto: fd.get('email'),
        }),
      });

      if (res.ok) {
        setSent(true);
        formRef.current.reset();
      } else {
        const payload = await res.json();
        setError(payload?.errors?.[0]?.message || 'Something went wrong.');
      }
    } catch {
      setError('Network error. Please check your connection.');
    } finally {
      setSending(false);
    }
  };

  const handleClose = () => {
    setSending(false);
    setSent(false);
    setError('');
    formRef.current?.reset();
    onClose();
  };

  return (
    <div className="contact-overlay" onClick={(event) => event.target === event.currentTarget && handleClose()}>
      <div className="contact-modal">
        <button className="contact-modal__close" onClick={handleClose} aria-label="Close">
          <X size={20} />
        </button>

        <div className="contact-modal__header">
          <div className="contact-modal__icon-wrap">
            <Mail size={22} />
          </div>
          <h2 className="contact-modal__title">Get In Touch</h2>
          <p className="contact-modal__sub">Drop me a message and I'll get back to you soon.</p>
        </div>

        {sent ? (
          <div className="contact-modal__success">
            <div className="success-check">✓</div>
            <p>Message sent successfully!</p>
            <span>I'll reply to you shortly.</span>
          </div>
        ) : (
          <form ref={formRef} className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="contact-form__field">
              <label htmlFor="cm-name">
                <User size={14} /> Name
              </label>
              <input id="cm-name" name="name" type="text" placeholder="Your full name" required autoComplete="name" />
            </div>

            <div className="contact-form__field">
              <label htmlFor="cm-email">
                <Mail size={14} /> Email
              </label>
              <input
                id="cm-email"
                name="email"
                type="email"
                placeholder="your@email.com"
                required
                autoComplete="email"
              />
            </div>

            <div className="contact-form__field">
              <label htmlFor="cm-message">
                <MessageSquare size={14} /> Message
              </label>
              <textarea
                id="cm-message"
                name="message"
                placeholder="Write your message here..."
                rows={4}
                required
              />
            </div>

            {error && <p className="contact-form__error">{error}</p>}

            <button className="contact-form__submit" type="submit" disabled={sending}>
              {sending ? <span className="contact-form__spinner" /> : <><Send size={16} /> Send Message</>}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactModal;