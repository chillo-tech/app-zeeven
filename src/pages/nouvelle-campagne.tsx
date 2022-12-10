import React from 'react'
import Layout from '../containers/opened'
import Category from '../components/new-campain/components/Category'
import Guests from '../components/new-campain/components/guests/Guests'
import Author from '../components/new-campain/components/Author'
import Options from '../components/new-campain/components/Options'
import Recap from '../components/new-campain/components/Recap'
import Title from '../components/new-campain/components/Title'
import Variables from '../components/new-campain/components/Variables'
import NewCampainContextWrapper from '../context/NewCampainContext'
import Messages from '../components/new-campain/components/Messages'

function NewCampain() {
  return (
    <Layout>
        <NewCampainContextWrapper>
          <Category />
          <Title />
          <Guests />
          <Messages />
          <Variables />
          <Options />
          <Recap />
        </NewCampainContextWrapper>
    </Layout>
  )
}

export default NewCampain
