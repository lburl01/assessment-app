import React from 'react'

import { ListItem, TextInput, Toggle } from '@untappd/components'

const PlayerListItem = ({ errors, handlePlayerUpdate, player }) => (
  <ListItem>
    <ListItem.Content>
      <ListItem.Heading>{player.name}</ListItem.Heading>
      <ListItem.Info>
        Jersey:
        <TextInput
          defaultValue={player.jersey_number}
          error={errors[player.id]}
          id={`jersey-input-${player.id}`}
          min={0}
          name="jersey-number"
          onBlur={e =>
            handlePlayerUpdate('jersey_number', player, e.target.value)
          }
          type="number"
        />
      </ListItem.Info>
      <ListItem.Info>
        Starter:
        <Toggle
          height={24}
          id={`starter=${player.id}`}
          width={44}
          checked={player.starter}
          onChange={val => handlePlayerUpdate('starter', player, val)}
        />
      </ListItem.Info>
      <ListItem.Info>Position: {player.position}</ListItem.Info>
      <ListItem.Info>Height: {player.height}</ListItem.Info>
      <ListItem.Info>Weight: {player.weight}</ListItem.Info>
    </ListItem.Content>
  </ListItem>
)

export default PlayerListItem
