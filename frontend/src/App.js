import React, { Component } from 'react'
import axios from 'axios'
import {
  Box,
  Card,
  Heading,
  Link,
  List,
  ListItem,
  Toaster,
} from '@untappd/components'

import WinLossForm from './WinLossForm'

const BASE_URL = 'http://localhost:5000'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      conference: null,
      error: '',
      isFetching: false,
      isSubmitting: false,
      teams: [],
    }

    this.handleWinsLossesUpdate = this.handleWinsLossesUpdate.bind(this)
    this.toggleShouldShowPlayers = this.toggleShouldShowPlayers.bind(this)
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

  async fetchPlayers(conferenceId, teamId) {
    if (
      this.state.teams.find(
        team => team.id === teamId && team.players.length > 1,
      )
    ) {
      return this.setState({ isFetching: false })
    }
    try {
      await axios
        .get(
          `${BASE_URL}/conferences/${conferenceId}/teams/${teamId}/players`,
          { mode: 'no-cors' },
        )
        .then(response => {
          const stateCopy = JSON.parse(JSON.stringify(this.state))
          stateCopy.teams.map(team => {
            if (team.id === teamId) {
              team.players = response.data
            }
            return team
          })
          this.setState({ teams: stateCopy.teams })
        })
    } catch (error) {
      console.warn(error)
    } finally {
      this.setState({ isFetching: false })
    }
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
        Toaster.red('Values must be positive, whole numbers.'),
      )
    }
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
      this.setState({ error: error.response.data.errors, isSubmitting: false })
    } finally {
      this.setState({ isSubmitting: false }, () =>
        this.state.error
          ? Toaster.red(this.state.error)
          : Toaster.green('Success'),
      )
    }
  }

  toggleShouldShowPlayers(conferenceId, teamId) {
    const stateCopy = JSON.parse(JSON.stringify(this.state))
    const newTeamsState = stateCopy.teams.map(team => {
      if (team.id === teamId) {
        team.shouldShowPlayers = !team.shouldShowPlayers
      }
      return team
    })
    this.setState({ teams: newTeamsState, isFetching: true }, () =>
      this.fetchPlayers(conferenceId, teamId),
    )
  }

  render() {
    const { conference, isFetching, isSubmitting, teams } = this.state

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
            {team.shouldShowPlayers && !isFetching && (
              <List>
                {team.players.map(player => (
                  <ListItem key={player.id}>
                    <ListItem.Content>
                      <ListItem.Heading>{player.name}</ListItem.Heading>
                      <ListItem.Info>
                        Jersey: {player.jersey_number}
                      </ListItem.Info>
                      <ListItem.Info>Position: {player.position}</ListItem.Info>
                      <ListItem.Info>Height: {player.height}</ListItem.Info>
                      <ListItem.Info>Weight: {player.weight}</ListItem.Info>
                    </ListItem.Content>
                  </ListItem>
                ))}
              </List>
            )}
          </Card>
        ))}
      </Box>
    )
  }
}

export default App
