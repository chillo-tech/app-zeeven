import React from 'react'
import Layout from '../containers/opened'
import Category from '../components/new-campain/components/Category'
import Dates from '../components/new-campain/components/Dates'
import Guests from '../components/new-campain/components/guests/Guests'
import Informations from '../components/new-campain/components/Informations'
import Message from '../components/new-campain/components/Message'
import Options from '../components/new-campain/components/Options'
import Recap from '../components/new-campain/components/Recap'
import Title from '../components/new-campain/components/Title'
import Variables from '../components/new-campain/components/Variables'
import NewCampainContextWrapper from '../context/NewCampainContext'

function NewCampain() {
  return (
    <Layout>
        <NewCampainContextWrapper>
          <Category />
          <Title />
          <Guests />
          <Message />
          <Variables />
          <Options />
          <Dates />
          <Informations />
          <Recap />
        </NewCampainContextWrapper>
    </Layout>
  )
}

export default NewCampain
