import React from 'react'

type FormSectionProps = {
  heading?: string
  subheading?: string
  formEmbed?: string
  alignment?: string
  fields?: { label: string; name: string; type: string; required: boolean }[]
}

const FormSection = ({ heading, subheading, formEmbed, alignment = 'center', fields }: FormSectionProps) => {
  const alignmentClass =
    alignment === 'left' ? 'text-left' : alignment === 'right' ? 'text-right' : 'text-center'

  return (
    <section className={`max-w-4xl mx-auto px-6 py-10 ${alignmentClass}`}>
      {heading && <h2 className="text-3xl font-bold mb-4">{heading}</h2>}
      {subheading && <p className="text-lg text-gray-600 mb-8">{subheading}</p>}
      {Array.isArray(fields) && fields.length > 0 && (
        <form className="space-y-4 mt-8 max-w-xl mx-auto">
          {fields.map((field) => (
            <div key={field.name} className="text-left">
              <label className="block mb-1 font-medium">{field.label}</label>
              {field.type === 'textarea' ? (
                <textarea name={field.name} required={field.required} className="w-full border px-3 py-2 rounded" />
              ) : (
                <input type={field.type} name={field.name} required={field.required} className="w-full border px-3 py-2 rounded" />
              )}
            </div>
          ))}
          <button type="submit" className="bg-black text-white px-6 py-2 rounded mt-4">Send</button>
        </form>
      )}
      {formEmbed ? (
        <div
          className="form-embed"
          dangerouslySetInnerHTML={{ __html: formEmbed }}
        />
      ) : (
        <p className="text-sm text-gray-400">Form embed coming soon.</p>
      )}
    </section>
  )
}

export default FormSection
