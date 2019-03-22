import React, { Component } from 'react'
import axios from 'axios'
import { Box, Card, Heading, Toaster } from '@untappd/components'

import WinLossForm from './WinLossForm'

const BASE_URL = 'http://localhost:5000'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      conference: null,
      error: '',
      teams: [],
    }

    this.handleWinsLossesUpdate = this.handleWinsLossesUpdate.bind(this)
  }

  fetchData() {
    axios.get(BASE_URL, { mode: 'no-cors' }).then(response => {
      const data = response.data
      this.setState({ conference: data.conference, teams: data.teams })
    })
  }

  componentDidMount() {
    this.fetchData()
  }

  async handleWinsLossesUpdate(conferenceId, teamId, wins, losses) {
    this.setState({ error: '' })
    try {
      await axios.patch(
        `${BASE_URL}/conferences/${conferenceId}/teams/${teamId}`,
        {
          team: {
            wins,
            losses,
          },
        },
        { mode: 'no-cors' },
      )
    } catch (error) {
      this.setState({ error: error.response.data.errors })
    } finally {
      return this.state.error
        ? Toaster.red(this.state.error)
        : Toaster.green('Success')
    }
  }

  render() {
    const { conference, teams } = this.state

    if (conference === null) {
      return <h3>loading</h3>
    }

    return (
      <Box className="App" mx={12} my={5}>
        <Heading>
          {conference.short_name} ({conference.name})
        </Heading>

        {teams.map(team => (
          <Card key={team.id} mb={3}>
            <Card.Header>
              <Heading>
                {team.name} {team.mascot} • Coached By: {team.coach}
              </Heading>
            </Card.Header>
            <Card.Header>
              <WinLossForm
                team={team}
                handleSubmit={this.handleWinsLossesUpdate}
              />
            </Card.Header>
            <Card.Content>
              <li>Player's</li>
              <li>go</li>
              <li>here</li>
            </Card.Content>
          </Card>
        ))}
      </Box>
    )
  }
}

export default App
