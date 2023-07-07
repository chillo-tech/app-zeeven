import React from 'react'
import Preview from './Preview'

function MessageVariables() {
  return (
    <section className="grid grid-cols-1 gap-2 rounded-lg border border-slate-200 bg-white shadow-sm md:grid-cols-3 md:gap-0">
            <div className=" border-r-2 border-slate-300 p-4 md:col-span-2 md:p-5">
</div>
      <div className="p-4 md:p-5">
        <Preview text={messages[0].text} variables={updatedVariables} contacts={guests} />
      </div>
    </section>
  )
}

export default MessageVariables
