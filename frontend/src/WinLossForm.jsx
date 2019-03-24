import React, { useState } from 'react'

import { Box, Button, Flex, FormLabel, TextInput } from '@untappd/components'

const WinLossForm = ({ disableButton, handleSubmit, team }) => {
  const [wins, setWins] = useState(team.wins)
  const [losses, setLosses] = useState(team.losses)

  return (
    <>
      <Box mr={3}>
        <TextInput
          defaultValue={wins}
          id={`wins-input-${team.id}`}
          min={0}
          name="wins"
          onChange={e => setWins(e.target.value)}
          type="number"
          width={[1, 1 / 2]}
        />
        <FormLabel htmlFor={`wins-input-${team.id}`}>Wins</FormLabel>
      </Box>
      <Box mr={3}>
        <TextInput
          defaultValue={losses}
          id={`losses-input-${team.id}`}
          min={0}
          name="losses"
          onChange={e => setLosses(e.target.value)}
          type="number"
          width={[1, 1 / 2]}
        />
        <FormLabel htmlFor={`losses-input-${team.id}`}>Losses</FormLabel>
      </Box>
      <Box>
        <Button
          disabled={disableButton}
          onClick={() => handleSubmit(team.conference_id, team.id, wins, losses)}
        >
          Update Wins/Losses
        </Button>
      </Box>
    </>
  )
}

export default WinLossForm
