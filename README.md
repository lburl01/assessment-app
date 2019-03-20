# README

# Project Dependencies

- Ruby 2.4+
- Node 8+
- Bundler gem

## Project Setup

Clone this repo locally, and from the top-level directory run:

- `bin/setup`
  - installs backend dependencies (Rails, etc.)
  - create, migrate, and seed the database (SQLite)

Now `cd` into the `frontend` directory and run:

- `yarn install`
  - installs frontend dependencies (React, etc.)

# Running the Project

- Running `yarn start` will boot the Rails API & the React frontend
- Navigating to `localhost:3000` should display the homepage with starting point
  data - The root directory contains the Rails API (running at `localhost:5000`)
- The React app lives within the `frontend` folder. (running at `localhost:3000`)
- A simple Rspec test has been created for the single existing endpoint. Run the
  test suite but running the `rspec` command in your terminal.

_NOTE:_ Make sure you're in the `frontend` folder when adding any additional packages

## Before You Start:

- This project has been setup with 3 ActiveRecord models: `Conference`, `Team`,
  and `Player`. A `Player` belongs to a `Team`, a `Team` belongs to a `Conference`,
  and a `Conference` `has_many` `Teams`.

- Additionally, a root endpoint (`Conferences#show`) of the Rails API has been
  defined & setup to return the data which was seeded on the initial setup
  of the project (e.g. running `yarn setup`).

### Design

Our [custom React component library](https://design.business.untappd.com/) has
been added to this project so that you don't get too caught up on the design.
This component library is based on [styled-system](https://styled-system.com/getting-started)
and [styled-components](https://www.styled-components.com/docs/), so you can
reference those docs if you need clarification. You shouldn't need to add much,
if any, custom styling when using this. Margins & paddings would be the main
edits; reference how `styled-system` handles this.

### Design Specs: (reference Figure 1)

- [ ] Each team should be contained within a `Card` component
- [ ] `Card.Header` should contain Team name, mascot, coach, wins, & losses
  - [ ] Use `TextInput`'s for `wins` & `losses` values
- [ ] The `Card.Content` should contain a `List` of the players (should hidden
      by default - see tasks below)
- [ ] Each player should be contained in a `ListItem` component
- [ ] Use `Box`/`Flex` components to layout the player attributes
- [ ] A player's `jersey_number` will be editable, so use a `TextInput`
      component for that attribute.
      
(The remaing player attributes can be static text.)

### Tasks

- Teams

  - [ ] Loop over & output the data for each Team within the conference
  - [ ] The `wins` & `losses` for each team should be input fields
  - [ ] Add functionality to allow `wins` & `losses` to be updated & saved to
        the Rails database

- Players
  - [ ] Add functionality to toggle open the `Card.Content` component when the
        Team (`Card.Header`) is clicked
    - [ ] Additionally, create an API endpoint to return the players and their
          attributes when the Team is clicked
  - [ ] Update the Rails API to allow the ability to update the `jersey_number`
        for an instance of a `Player`.
    - [ ] On the frontend, editing this attribute should happen 'in-line' and
          save the edit on the backend automatically
  - [ ] Add a new attribute to the `Player` model called `starter`. This should
        be a `boolean` data type with a default value of `false`
  - [ ] Add the ability to change the `starter` status of a player from
        `false` to `true`

--- Figure 1 ---

```
- Conference <Heading>
  <Card>
  - Team ===== Wins: [  ] Losses: [  ] <Card.Header>
    <List> (initially hidden)
    - Player Name <ListItem>
      - (other player attributes) <Box> / <Flex>
    - Player Name <ListItem>
      - (other player attributes) <Box> / <Flex>
    - Player Name <ListItem>
      - (other player attributes) <Box> / <Flex>

  <Card>
  - Team ===== Wins: [  ] Losses: [  ] <Card.Header>
    <List> (initially hidden)
    - Player Name <ListItem>
      - (other player attributes) <Box> / <Flex>
    - Player Name <ListItem>
      - (other player attributes) <Box> / <Flex>
    - Player Name <ListItem>
      - (other player attributes) <Box> / <Flex>
```

## Stretch Goals

- [ ] add the ability to create a new team for the conference
- [ ] add testing for any of the frontend or backend changes that you've made

## Additional Notes

- You're allowed to add anything additional to either the backend or frontend
  that you'd like. Those changes may improve your overall assessment, but nothing
  added will hurt you.
- Don't worry if some of the instructions above seem a little vague. Read between
  the lines as much as possible; make assumptions.
- We're mainly looking at the functionality of the items in the _Tasks_
  list, so don't get too caught up in other areas.
- Please use your best judgement before reaching out with questions, as it's
  very likely that any questions you have won't be of any significance in regards
  to what we're looking for in this assessment.

## Submitting your project

Once you're ready to submit your assessment, please open a Pull Request against
this repository for us to evaluate. If needed, add any additional instructions
or comments to the very top of this README file. Expect to discuss your
solutions and additions to this assessment.
