import { Channel } from '@/types/data'
import React from 'react'
import { AiOutlineMail, AiOutlineWhatsApp, AiOutlineMessage } from 'react-icons/ai'

function Icon({channel}: any) {
 if(channel === "EMAIL") return <AiOutlineMail />
 if(channel === "WHATSAPP") return <AiOutlineWhatsApp />
 if(channel === "SMS") return <AiOutlineMessage />
  return  null
}

export default Icon
