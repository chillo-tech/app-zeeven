import Metadata from '@/components/Metadata';
import Guests from '@/components/guests/Guests';
import ProtectedLayout from '@/containers/protected';
import React from 'react'

function Contacts() {
  return (
    <ProtectedLayout>
     <Metadata entry={{
        title: "Tous vos contcats", 
        description: "Informez nos contacts de vos évènements"
      }}
      />
			<Guests params={{fetchPath: "contact", addPath: "contact"}}/>
    </ProtectedLayout>
  )
}

export default Contacts
