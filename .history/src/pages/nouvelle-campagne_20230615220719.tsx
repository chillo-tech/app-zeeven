import React from 'react'
import OpenedLayout from '@/containers/opened'
import Category from '@/components/new-campain/components/Category'
import Guests from '@/components/new-campain/components/guests/Guests'
import Options from '@/components/new-campain/components/Options'
import Recap from '@/components/new-campain/components/Recap'
import Title from '@/components/new-campain/components/Title'
import Variables from '@/components/new-campain/components/Variables'
import NewCampainContextWrapper from '@/context/NewCampainContext'
import Messages from '@/components/new-campain/components/Messages'
import CampainMessages from '@/components/new-campain/components/messages/CampainMessages'
import Dates from '@/components/new-campain/components/dates/Dates'
import Schedules from '@/components/new-campain/components/dates/Schedules'

function NewCampain() {
	return (
		<OpenedLayout>
			<NewCampainContextWrapper>
        <Schedules />
				<Category/>
				<Title/>
				<Guests/>
				<Messages/>
        <Dates />
				<Variables/>
				<Options/>
				<Recap/>
			</NewCampainContextWrapper>
		</OpenedLayout>
	)
}

export default NewCampain
