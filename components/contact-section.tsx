'use client'

import { useState, type FormEvent } from 'react'
import { ArrowUpRight, Download, MapPin, Mail, Clock3 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import type { Copy, Locale } from '@/lib/translations'

export function ContactSection({ copy, locale }: { copy: Copy; locale: Locale }) {
  const [draft, setDraft] = useState('')
  const [open, setOpen] = useState(false)
  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    setDraft(`${copy.name}: ${String(data.get('name')).trim()}\n${copy.email}: ${String(data.get('email')).trim()}\n\n${copy.message}\n${String(data.get('message')).trim()}`)
    setOpen(true)
  }
  function download() {
    const url = URL.createObjectURL(new Blob([draft], { type: 'text/plain;charset=utf-8' }))
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = locale === 'fr' ? 'lilianne-acupuncture-demande.txt' : 'lilianne-acupuncture-inquiry.txt'
    anchor.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }
  return <section id="contact" className="contact-section section-pad">
    <div className="container contact-grid">
      <div>
        <p className="eyebrow">{copy.contactEyebrow}</p>
        <h2>{copy.contactTitle}<br /><em>{copy.contactItalic}</em></h2>
        <p className="body-copy">{copy.contactBody}</p>
        <div id="hours-locations" className="contact-availability">
          <p className="eyebrow">{copy.hoursLocationsEyebrow}</p>
          <h3>{copy.hoursLocationsTitle}</h3>
          <div className="contact-details">
            <div className="contact-detail">
              <MapPin size={19} strokeWidth={1.3} aria-hidden="true" />
              <div>
                <span className="eyebrow">{locale === 'fr' ? 'Lieu de pratique' : 'Location'}</span>
                <p>{copy.locationInfo || '120 Rue de Grande-Île, Salaberry-de-Valleyfield, QC J6S 3M6'}</p>
              </div>
            </div>
            <div className="contact-detail">
              <Clock3 size={19} strokeWidth={1.3} aria-hidden="true" />
              <div>
                <span className="eyebrow">{locale === 'fr' ? 'Horaires de pratique' : 'Hours'}</span>
                <p>{copy.hoursInfo || (locale === 'fr' ? 'Sur rendez-vous · horaires à confirmer' : 'By appointment · hours to be confirmed')}</p>
              </div>
            </div>
            <div className="contact-detail">
              <Mail size={19} strokeWidth={1.3} aria-hidden="true" />
              <div>
                <span className="eyebrow">{copy.contactLabels[1]}</span>
                <p>{copy.contactDetails[1]}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <form onSubmit={prepare} className="contact-form">
        <FieldGroup>
          <Field><FieldLabel htmlFor="name">{copy.name}</FieldLabel><Input id="name" name="name" required maxLength={100} pattern=".*\S.*" autoComplete="name" placeholder={copy.namePlaceholder} /></Field>
          <Field><FieldLabel htmlFor="email">{copy.email}</FieldLabel><Input id="email" name="email" required maxLength={254} type="email" autoComplete="email" placeholder={copy.emailPlaceholder} /></Field>
          <Field><FieldLabel htmlFor="message">{copy.message}</FieldLabel><Textarea id="message" name="message" required maxLength={3000} rows={4} /></Field>
          <Button type="submit" size="lg">{copy.formAction}<ArrowUpRight data-icon="inline-end" /></Button>
          <p className="form-note">{copy.formNote}</p>
        </FieldGroup>
      </form>
    </div>
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent showCloseButton={false}>
        <DialogHeader><DialogTitle>{copy.draftTitle}</DialogTitle><DialogDescription>{copy.draftDescription}</DialogDescription></DialogHeader>
        <pre className="inquiry-draft">{draft}</pre>
        <Button onClick={download}><Download data-icon="inline-start" />{copy.download}</Button>
        <DialogClose render={<Button variant="outline" />}>{copy.close}</DialogClose>
      </DialogContent>
    </Dialog>
  </section>
}
