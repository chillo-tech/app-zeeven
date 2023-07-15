import React from 'react'
import { AiOutlineMail, AiOutlineWhatsApp, AiOutlineMessage, AiOutlineQrcode } from 'react-icons/ai'

function Icon({channel}: any) {
 if(channel === "EMAIL") return <AiOutlineMail />
 if(channel === "WHATSAPP") return <AiOutlineWhatsApp />
 if(channel === "SMS") return <AiOutlineMessage />
 if(channel === "QRCODE") return <AiOutlineQrcode />
  return  null
}

export default Icon
