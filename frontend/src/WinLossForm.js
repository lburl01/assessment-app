import React, { useState } from 'react'

import { Box, Button, FormLabel, TextInput } from '@untappd/components'

const WinLossForm = ({ team, handleSubmit }) => {
  const [wins, setWins] = useState(team.wins)
  const [losses, setLosses] = useState(team.losses)

  return (
    <>
      <Box>
        <FormLabel htmlFor="wins-input">Wins</FormLabel>
        <TextInput
          id="wins-input"
          defaultValue={wins}
          name="wins"
          onChange={e => setWins(e.target.value)}
          type="number"
        />
      </Box>
      <Box>
        <FormLabel htmlFor="losses-input">Losses</FormLabel>
        <TextInput
          id="losses-input"
          defaultValue={losses}
          name="losses"
          onChange={e => setLosses(e.target.value)}
          type="number"
        />
      </Box>
      <Button
        onClick={() => handleSubmit(team.conference_id, team.id, wins, losses)}
      >
        Update Wins/Losses
      </Button>
    </>
  )
}

export default WinLossForm
