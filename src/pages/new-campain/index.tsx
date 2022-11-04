import React from 'react'
import Layout from '../../containers/opened'
import Category from './components/Category'
import Dates from './components/Dates'
import Guests from './components/guests/Guests'
import Informations from './components/Informations'
import Message from './components/Message'
import Options from './components/Options'
import Recap from './components/Recap'
import Title from './components/Title'
import Variables from './components/Variables'
import NewCampainContextWrapper from './context/NewCampainContext'

function NewCampain() {
  return (
    <Layout>
        <NewCampainContextWrapper>
          <Category />
          <Title />
          <Message />
          <Variables />
          <Guests />
          <Options />
          <Dates />
          <Informations />
          <Recap />
        </NewCampainContextWrapper>
    </Layout>
  )
}

export default NewCampain
