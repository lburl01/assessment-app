import React, { Component } from 'react'
import axios from 'axios'
import { Box, Card, Heading, Link, Toaster } from '@untappd/components'

import WinLossForm from './WinLossForm'
import TeamPlayerList from './TeamPlayerList'

export const BASE_URL = 'http://localhost:5000'
export const NUM_INPUT_VALIDATION_ERROR =
  'Values must be positive, whole numbers.'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      conference: null,
      error: '',
      isSubmitting: false,
      teams: [],
    }

    this.handleWinsLossesUpdate = this.handleWinsLossesUpdate.bind(this)
    this.toggleShouldShowPlayers = this.toggleShouldShowPlayers.bind(this)
    this.refreshTeam = this.refreshTeam.bind(this)
  }

  fetchData() {
    axios.get(BASE_URL, { mode: 'no-cors' }).then(response => {
      const data = response.data
      this.setState({
        conference: data.conference,
        teams: data.teams.map(team => ({
          ...team,
          shouldShowPlayers: false,
          players: [],
        })),
      })
    })
  }

  componentDidMount() {
    this.fetchData()
  }

  async handleWinsLossesUpdate(conferenceId, teamId, wins, losses) {
    this.setState({ error: '', isSubmitting: true })
    if (
      wins < 0 ||
      losses < 0 ||
      !Number.isInteger(Number(wins)) ||
      !Number.isInteger(Number(losses))
    ) {
      return this.setState({ isSubmitting: false }, () =>
        Toaster.red(NUM_INPUT_VALIDATION_ERROR),
      )
    }
    try {
      await axios
        .patch(
          `${BASE_URL}/conferences/${conferenceId}/teams/${teamId}`,
          {
            team: {
              wins,
              losses,
            },
          },
          { mode: 'no-cors' },
        )
        .then(res => this.refreshTeam(res))
    } catch (error) {
      this.setState({ error: error.response.data.errors, isSubmitting: false })
    } finally {
      this.setState({ isSubmitting: false }, () =>
        this.state.error
          ? Toaster.red(this.state.error)
          : Toaster.green('Success'),
      )
    }
  }

  refreshTeam(res) {
    const stateCopy = JSON.parse(JSON.stringify(this.state))
    const newTeamsState = stateCopy.teams.map(team => {
      if (team.id === res.data.id) {
        team = res.data
      }
      return team
    })
    this.setState({ teams: newTeamsState })
  }

  toggleShouldShowPlayers(conferenceId, teamId) {
    const stateCopy = JSON.parse(JSON.stringify(this.state))
    const newTeamsState = stateCopy.teams.map(team => {
      if (team.id === teamId) {
        team.shouldShowPlayers = !team.shouldShowPlayers
      }
      return team
    })
    this.setState({ teams: newTeamsState })
  }

  render() {
    const { conference, isSubmitting, teams } = this.state

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
                <Link
                  onClick={() =>
                    this.toggleShouldShowPlayers(team.conference_id, team.id)
                  }
                >
                  {team.name} {team.mascot}
                </Link>
              </Heading>
              <Heading>Coached By: {team.coach}</Heading>
            </Card.Header>
            <Card.Header>
              <WinLossForm
                disableButton={isSubmitting}
                team={team}
                handleSubmit={this.handleWinsLossesUpdate}
              />
            </Card.Header>
            <TeamPlayerList team={team} />
          </Card>
        ))}
      </Box>
    )
  }
}

export default App
