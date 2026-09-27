import { useRef, useState } from 'react'
import DashboardCard from '../dashboard/DashboardCard.jsx'
import PillButton from '../ui/PillButton.jsx'
import useFlash from '../../hooks/useFlash.js'
import arrowIcon from '../../assets/user/arrow-drop-down.svg'
import uploadIcon from '../../assets/admin/export-fill.svg'
import { ticketTypes } from '../../data/userData.js'

const MAX_FILE_MB = 5
const emptyForm = { title: '', type: '', description: '' }

// Cream-outlined field from the Support design: 6px corners, text inset 22px
const fieldClass =
  'w-full rounded-[6px] border border-cream bg-surface font-inter text-[16px] text-cream outline-none transition-colors placeholder:text-cream focus:border-input-focus'

// 595x254 "New Ticket" form: title, ticket type, description, optional attachment.
// Submitting validates the fields and hands the ticket to the page.
function NewTicketCard({ onSubmit, className = '' }) {
  const [form, setForm] = useState(emptyForm)
  const [file, setFile] = useState(null)
  const [error, setError] = useState(null)
  const [sent, flashSent] = useFlash(2500)
  const fileRef = useRef(null)
  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const chooseFile = (e) => {
    const picked = e.target.files[0]
    if (picked && picked.size > MAX_FILE_MB * 1024 * 1024) {
      setError(`Attachments can be up to ${MAX_FILE_MB} MB.`)
      e.target.value = ''
      return
    }
    setError(null)
    setFile(picked ?? null)
  }

  const removeFile = () => {
    setFile(null)
    fileRef.current.value = ''
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const title = form.title.trim()
    const description = form.description.trim()
    if (!title) return setError('Give your ticket a title.')
    if (!form.type) return setError('Choose a ticket type.')
    if (description.length < 10) return setError('Describe the problem in a few words (10+ characters).')
    setError(null)
    onSubmit({ title, type: form.type, description, attachment: file?.name ?? null })
    setForm(emptyForm)
    removeFile()
    flashSent()
    return undefined
  }

  return (
    <DashboardCard title="New Ticket" className={`min-w-0 ${className}`} cardClassName="mt-[16px] xl:h-[254px]">
      <form onSubmit={handleSubmit} noValidate className="px-4 pt-[17px] pb-6 sm:px-[29px] xl:pb-0">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-x-8 xl:grid-cols-[220px_219px] xl:gap-x-[77px]">
          <div>
            <label htmlFor="ticket-title" className="block text-[14px] leading-[16px]">
              Title
            </label>
            <input
              id="ticket-title"
              placeholder="Ticket Title"
              maxLength={80}
              value={form.title}
              onChange={set('title')}
              className={`${fieldClass} mt-[5px] h-[40px] px-[22px]`}
            />
          </div>
          <div>
            <label htmlFor="ticket-type" className="block text-[14px] leading-[16px] xl:ml-[4px]">
              Ticket type
            </label>
            <div className="relative mt-[5px]">
              <select
                id="ticket-type"
                value={form.type}
                onChange={set('type')}
                className={`${fieldClass} h-[40px] cursor-pointer appearance-none pr-[40px] pl-[22px] [&>option]:bg-surface`}
              >
                <option value="" disabled>
                  Select Topic
                </option>
                {ticketTypes.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.label}
                  </option>
                ))}
              </select>
              <img src={arrowIcon} alt="" width="33" height="33" className="pointer-events-none absolute top-[3px] right-[7px]" />
            </div>
          </div>
        </div>

        <label htmlFor="ticket-description" className="sr-only">
          Description
        </label>
        <textarea
          id="ticket-description"
          placeholder="Enter Description"
          maxLength={1000}
          value={form.description}
          onChange={set('description')}
          className={`${fieldClass} mt-[12px] block h-[91px] resize-none px-[22px] pt-[9px] xl:w-[522px]`}
        />

        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-0 xl:mt-0">
          <div className="flex min-w-0 items-center sm:mt-[9px] sm:w-[188px] sm:shrink-0">
            <input id="ticket-file" ref={fileRef} type="file" onChange={chooseFile} className="peer sr-only" />
            <label
              htmlFor="ticket-file"
              className="flex min-w-0 cursor-pointer items-center gap-[8px] rounded-[6px] pr-1 text-[14px] leading-[24px] hover:text-primary peer-focus-visible:ring-2 peer-focus-visible:ring-input-focus"
              title={file ? file.name : undefined}
            >
              <img src={uploadIcon} alt="" width="24" height="24" className="shrink-0" />
              <span className="truncate">{file ? file.name : 'Upload attachment'}</span>
            </label>
            {file && (
              <button
                type="button"
                onClick={removeFile}
                className="ml-1 size-[20px] shrink-0 cursor-pointer rounded-full text-[16px] leading-[20px] text-muted outline-none hover:text-residential focus-visible:ring-2 focus-visible:ring-input-focus"
                aria-label={`Remove ${file.name}`}
              >
                ×
              </button>
            )}
          </div>
          <PillButton type="submit" className="self-center sm:mt-[20px] sm:self-start">
            {sent ? 'Ticket sent ✓' : 'Submit Ticket'}
          </PillButton>
          <p role="status" className="text-[12px] leading-[16px] text-residential sm:mt-[28px] sm:ml-4 sm:max-w-[190px]">
            {error}
          </p>
        </div>
      </form>
    </DashboardCard>
  )
}

export default NewTicketCard
