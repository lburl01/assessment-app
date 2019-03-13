# README

# Project Dependencies

- Ruby 2.4+
- Node 8+
- Bundler gem

# Setting the Project

- running `yarn setup` will do the following:
  - install backend dependencies (Rails, etc.)
  - install frontend dependencies (React, etc.)
  - create, migrate, and seed the database (SQLite)

# Running the Project

- running `yarn start` will boot the Rails API & the React frontend
- The root directory contains the Rails API (runs on `localhost:5000`)
- The React app lives within the `frontend` folder. (runs on `localhost:3000`)
- A simple Rspec test has been created for the single existing endpoint. Run the
  test suite but running the `rspec` command in your terminal.

_NOTE:_ Make sure you're in the `frontend` folder when adding any additional packages

# Task at hand:

- This project has been setup with 3 ActiveRecord models: `Conference`, `Team`,
  and `Player`. A `Player` belongs to a `Team`, a `Team` belongs to a `Conference`,
  and a `Conference` `has_many` `Teams`.

- Additionally, a root endpoint (`Conferences#show`) of our Rails API has been defined to return the data which will be seeded on the initial setup of the project (e.g. running `yarn setup`).

### Tasks

- [ ] loop over & output the data for each Team within the confernence
- [ ] the `wins` & `losses` for each team should be input fields of which are
      updatable values
- [ ] clicking on a team should toggle open a hidden container that reveals
      that team's players and the attributes for each player
- [ ] add a new attribute to the `Player` model called `starter`. This should
      be a `boolean` data type with default value of `false`
- [ ] add the ability to change the `starter` status of a player from
      `false` to `true`

```
- Conference
  - Team ===== Wins: [  ] Losses: [  ]
    - Player Name
      - (other player attributes)
    - Player Name
      - (other player attributes)
    - Player Name
      - (other player attributes)
  - Team ===== Wins: [  ] Losses: [  ]
    - Player Name
      - (other player attributes)
    - Player Name
      - (other player attributes)
    - Player Name
      - (other player attributes)
```

## Stretch Goals

- [ ] add the ability to create a new team for the conference
- [ ] add testing for any of the frontend or backend changes that you've made
- [ ] implement a react component library such as [Segment Evergreen](https://evergreen.segment.com/components/)

## Additional Notes

- You're allowed to add anything additional to either the backend or frontend
  that you'd like. Those changes may improve your overall assessment, but nothing
  added will hurt you.
- Don't worry if some of the instructions above seem a little vague. Read between
  the lines as much as possible; make assumptions.
- We're only looking at the functionality of the items in the _Tasks_
  list.
- Don't get too caught up on the design; you won't lose any credit for not
  having any design.
- Please use your best judgement before reaching out with questions, as it's
  very likely that any questions you have won't be of any significance in regards
  to what we're looking for in this assessment.
