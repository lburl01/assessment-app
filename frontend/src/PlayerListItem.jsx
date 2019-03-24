import React from 'react'

import { Box, FormLabel, ListItem, TextInput, Toggle } from '@untappd/components'

const heightFormatter = height => {
  const heightVals = height.split('-')
  return `${heightVals[0]}' ${heightVals[1]}"`
}

const PlayerListItem = ({ errors, handlePlayerUpdate, player }) => (
  <ListItem>
    <ListItem.Content>
      <ListItem.Heading fontSize={3}>{player.name}</ListItem.Heading>
      <ListItem.Info>{player.position}</ListItem.Info>
      <ListItem.Info>{heightFormatter(player.height)}</ListItem.Info>
      <ListItem.Info>{player.weight} lbs.</ListItem.Info>
    </ListItem.Content>
    <ListItem.Actions>
      <Box mr={3}>
        <FormLabel>Jersey Number</FormLabel>
        <TextInput
          defaultValue={player.jersey_number}
          error={errors[player.id]}
          id={`jersey-input-${player.id}`}
          min={0}
          width={[1, 1 / 2]}
          name="jersey-number"
          onBlur={e =>
            handlePlayerUpdate('jersey_number', player, e.target.value)
          }
          type="number"
        />
      </Box>
      <Box>
        <FormLabel>Starter</FormLabel>
        <Toggle
          height={24}
          id={`starter=${player.id}`}
          width={44}
          checked={player.starter}
          onChange={val => handlePlayerUpdate('starter', player, val)}
        />
      </Box>
    </ListItem.Actions>
  </ListItem>
)

export default PlayerListItem
