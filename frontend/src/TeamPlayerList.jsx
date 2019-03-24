import React, { Component } from 'react'
import axios from 'axios'

import { List, Toaster } from '@untappd/components'

import { BASE_URL, NUM_INPUT_VALIDATION_ERROR } from './App'
import PlayerListItem from './PlayerListItem'

class TeamPlayerList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      errors: {},
      isFetching: false,
      players: [],
      responseError: '',
      team: props.team,
    }

    this.clearErrors = this.clearErrors.bind(this)
    this.fetchPlayers = this.fetchPlayers.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleSuccess = this.handleSuccess.bind(this)
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.team.shouldShowPlayers !== this.props.team.shouldShowPlayers &&
      this.props.team.shouldShowPlayers
    ) {
      return this.fetchPlayers()
    }
  }

  async fetchPlayers() {
    const { conference_id, id } = this.state.team
    if (this.state.players.length > 1) return
    this.setState({ isFetching: true })
    try {
      await axios
        .get(`${BASE_URL}/conferences/${conference_id}/teams/${id}/players`, {
          mode: 'no-cors',
        })
        .then(res => this.setState({ players: res.data }))
    } catch (error) {
      Toaster.red('Something went wrong')
    } finally {
      this.setState({ isFetching: false })
    }
  }

  clearErrors(playerId) {
    return this.setState({
      errors: { ...this.state.errors, [playerId]: '' },
      responseError: '',
    })
  }

  handleSuccess(playerId) {
    this.clearErrors(playerId)
    Toaster.green('Player successfully updated')
  }

  async handleUpdate(attr, player, newVal) {
    const { conference_id, id } = this.state.team
    this.clearErrors(player.id)
    if (attr === 'jersey_number') {
      if (Number(newVal) == player.jersey_number) return
      if (!newVal || newVal < 0 || !Number.isInteger(Number(newVal))) {
        return this.setState({
          errors: {
            ...this.state.errors,
            [player.id]: NUM_INPUT_VALIDATION_ERROR,
          },
        })
      }
    }
    try {
      await axios
        .patch(
          `${BASE_URL}/conferences/${conference_id}/teams/${id}/players/${
            player.id
          }`,
          {
            player: {
              [attr]: newVal,
            },
          },
          { mode: 'no-cors' },
        )
        .then(res => {
          const stateCopy = JSON.parse(JSON.stringify(this.state))
          const updatedPlayers = stateCopy.players.map(player => {
            if (player.id === res.data.id) {
              player = res.data
            }
            return player
          })
          this.setState({ players: updatedPlayers })
        })
    } catch (error) {
      this.setState({ responseError: error.response.data.errors })
    } finally {
      return this.state.responseError
        ? Toaster.red(this.state.responseError)
        : this.handleSuccess(player.id)
    }
  }

  render() {
    const { players } = this.state
    const { isFetching, shouldShowPlayers } = this.props.team

    if (!shouldShowPlayers || isFetching) return null

    return (
      <List>
        {players.map(player => (
          <PlayerListItem
            errors={this.state.errors}
            handlePlayerUpdate={this.handleUpdate}
            key={player.id}
            player={player}
          />
        ))}
      </List>
    )
  }
}

export default TeamPlayerList
