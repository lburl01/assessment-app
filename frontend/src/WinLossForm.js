import React, { useState } from 'react'

import { Box, Button, FormLabel, TextInput } from '@untappd/components'

const WinLossForm = ({ disableButton, handleSubmit, team }) => {
  const [wins, setWins] = useState(team.wins)
  const [losses, setLosses] = useState(team.losses)

  return (
    <>
      <Box>
        <FormLabel htmlFor="wins-input">Wins</FormLabel>
        <TextInput
          defaultValue={wins}
          id="wins-input"
          min={0}
          name="wins"
          onChange={e => setWins(e.target.value)}
          type="number"
        />
      </Box>
      <Box>
        <FormLabel htmlFor="losses-input">Losses</FormLabel>
        <TextInput
          defaultValue={losses}
          id="losses-input"
          min={0}
          name="losses"
          onChange={e => setLosses(e.target.value)}
          type="number"
        />
      </Box>
      <Button
        disabled={disableButton}
        onClick={() => handleSubmit(team.conference_id, team.id, wins, losses)}
      >
        Update Wins/Losses
      </Button>
    </>
  )
}

export default WinLossForm
