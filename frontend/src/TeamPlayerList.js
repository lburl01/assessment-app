import React, { Component } from 'react'
import axios from 'axios'

import { List, ListItem, TextInput, Toaster } from '@untappd/components'

import { BASE_URL, NUM_INPUT_VALIDATION_ERROR } from './App'

class TeamPlayerList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      errors: {},
      responseError: '',
    }

    this.clearErrors = this.clearErrors.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleSuccess = this.handleSuccess.bind(this)
  }

  clearErrors(playerId) {
    return this.setState({
      errors: { ...this.state.errors, [playerId]: '' },
      responseError: '',
    })
  }

  handleSuccess(playerId) {
    Toaster.green('Jersey successfully updated')
    return this.clearErrors(playerId)
  }

  async handleUpdate(conferenceId, player, newVal) {
    this.clearErrors(player.id)
    if (Number(newVal) === player.jersey_number) return
    if (!newVal || newVal < 0 || !Number.isInteger(Number(newVal))) {
      return this.setState({
        errors: {
          ...this.state.errors,
          [player.id]: NUM_INPUT_VALIDATION_ERROR,
        },
      })
    }
    const teamId = player.team_id
    try {
      await axios.patch(
        `${BASE_URL}/conferences/${conferenceId}/teams/${teamId}/players/${
          player.id
        }`,
        {
          player: {
            jersey_number: newVal,
          },
        },
        { mode: 'no-cors' },
      )
    } catch (error) {
      this.setState({ responseError: error.response.data.errors })
    } finally {
      return this.state.responseError
        ? Toaster.red(this.state.responseError)
        : this.handleSuccess(player.id)
    }
  }

  render() {
    const { team } = this.props
    return (
      <List>
        {team.players.map(player => (
          <ListItem key={player.id}>
            <ListItem.Content>
              <ListItem.Heading>{player.name}</ListItem.Heading>
              <ListItem.Info>
                Jersey:
                <TextInput
                  defaultValue={player.jersey_number}
                  error={this.state.errors[player.id]}
                  id={`jersey-input-${player.id}`}
                  min={0}
                  name="jersey-number"
                  onBlur={e =>
                    this.handleUpdate(
                      team.conference_id,
                      player,
                      e.target.value,
                    )
                  }
                  type="number"
                />
              </ListItem.Info>
              <ListItem.Info>
                Starter: {player.starter.toString()}
              </ListItem.Info>
              <ListItem.Info>Position: {player.position}</ListItem.Info>
              <ListItem.Info>Height: {player.height}</ListItem.Info>
              <ListItem.Info>Weight: {player.weight}</ListItem.Info>
            </ListItem.Content>
          </ListItem>
        ))}
      </List>
    )
  }
}

export default TeamPlayerList
