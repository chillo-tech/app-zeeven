import React from 'react'

function index() {
  return (null)
}
export async function getServerSideProps() {
    return {
      notFound: true,
    }
}
export default index
