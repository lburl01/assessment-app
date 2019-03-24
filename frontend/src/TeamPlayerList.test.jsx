import axios from 'axios'
import { shallow } from 'enzyme'
import React from 'react'

import { BASE_URL, NUM_INPUT_VALIDATION_ERROR } from './App'
import TeamPlayerList from './TeamPlayerList'

describe('<TeamPlayerList />', () => {
  let wrapper;
  const defaultProps = {
    team: {
      coach: "Mike Krzyzewski",
      conference_id: 1,
      id: 1,
      losses: 5,
      mascot: "Blue Devils",
      name: "Duke",
      shouldShowPlayers: false,
      wins: 26,
    }
  }

  beforeEach(() => {
    wrapper = shallow(
      <TeamPlayerList {...defaultProps} />,
      { disableLifecycleMethods: true },
    )
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('lifecycle methods', () => {
    beforeEach(() => {
      jest.spyOn(wrapper.instance(), 'fetchPlayers').mockResolvedValue('success')
    })

    it('calls fetchPlayers if shouldShowPlayers and was not previously showing players', () => {
      wrapper.setProps({ team: { ...defaultProps.team, shouldShowPlayers: true }})
      wrapper.instance().componentDidUpdate(defaultProps)

      expect(wrapper.instance().fetchPlayers).toHaveBeenCalled()
    })

    it('does not fetchPlayers if !shouldShowPlayers', () => {
      wrapper.instance().componentDidUpdate(defaultProps)

      expect(wrapper.instance().fetchPlayers).not.toHaveBeenCalled()
    })
  })

  describe('class methods', () => {
    describe('fetchPlayers()', () => {
      beforeEach(() => {
        jest.spyOn(axios, 'get')
      })

      it('returns early if players are already fetched', () => {
        wrapper.setState({ players: ['many', 'many', 'people' ]})
        wrapper.instance().fetchPlayers()

        expect(axios.get).not.toHaveBeenCalled()
      })

      it('sets isFetching state to true before attempting fetch', () => {
        expect(wrapper.state().isFetching).toBe(false)

        wrapper.instance().fetchPlayers().then(() => {
          expect(wrapper.state().isFetching).toBe(true)
        })
      })

      it('fetches players from correct URL', async () => {
        await wrapper.instance().fetchPlayers()

        expect(axios.get).toHaveBeenCalledWith(
          `${BASE_URL}/conferences/${defaultProps.team.conference_id}/teams/${defaultProps.team.id}/players`,
          { mode: 'no-cors' },
        )
      })

      it('updates player state with response after successful fetch', async () => {
        const successResponse = ['ann', 'lil sebastian', 'jerry' ];
        axios.get.mockResolvedValue({ data: successResponse })

        await wrapper.instance().fetchPlayers()

        expect(wrapper.state().players).toEqual(successResponse)
      })

      it('clears isFetching state even when error is thrown', async () => {
        axios.get.mockRejectedValue({ errors: 'Ran out of waffles' })

        await wrapper.instance().fetchPlayers()

        expect(wrapper.state().isFetching).toEqual(false)
      })
    })

    describe('clearErrors()', () => {
      let fakePlayerId = 22;
      let otherPlayerId = 23;

      beforeEach(() => {
        wrapper.setState({
          errors: {
            [fakePlayerId]: 'Invalid Jersey Number',
            [otherPlayerId]: 'Does not like waffles',
          },
          responseError: 'Something might have gone wrong, too',
        })
      })

      it('clears errors only for given playerId', () => {
        wrapper.instance().clearErrors(fakePlayerId)

        const errorObj = wrapper.state().errors;
        expect(errorObj[fakePlayerId]).toBe('')
        expect(errorObj[otherPlayerId]).toBe('Does not like waffles')
      })

      it('always clears response error', () => {
        wrapper.instance().clearErrors(otherPlayerId)

        expect(wrapper.state().responseError).toBe('')
      })
    })

    describe('handleSuccess()', () => {
      beforeEach(() => {
        jest.spyOn(wrapper.instance(), 'clearErrors')
      })

      it('calls clearErrors with given playerId', () => {
        wrapper.instance().handleSuccess(123)

        expect(wrapper.instance().clearErrors).toHaveBeenCalledWith(123)
      })
    })

    describe('handleUpdate()', () => {
      let fakePlayer = {
        id: 4,
        name: 'Ann Perkins',
        jersey_number: '00',
        team_id: defaultProps.team.id,
        starter: false,
      }
      let anotherPlayer = {
        id: 5,
        name: 'Lil Sebastian',
        jersey_number: '45',
        team_id: defaultProps.team.id,
        starter: false,
      }

      beforeEach(() => {
        jest.spyOn(wrapper.instance(), 'clearErrors');
        jest.spyOn(axios, 'patch')
        wrapper.setState({ players: [
          fakePlayer,
          anotherPlayer,
        ]})
      })

      it('calls clearErrors()', () => {
        wrapper.instance().handleUpdate('waffles', fakePlayer, '666')
        expect(wrapper.instance().clearErrors).toHaveBeenCalledWith(fakePlayer.id)
      })

      it('early returns if jersey number is unchanged', () => {
        wrapper.instance().handleUpdate('jersey_number', fakePlayer, fakePlayer.jersey_number)
        expect(axios.patch).not.toHaveBeenCalled()
      })

      it('early returns if jersey number is not present', () => {
        wrapper.instance().handleUpdate('jersey_number', fakePlayer)

        expect(wrapper.state().errors[fakePlayer.id]).toBe(NUM_INPUT_VALIDATION_ERROR)
        expect(axios.patch).not.toHaveBeenCalled()
      })

      it('early returns if jersey number is not a whole number', () => {
        wrapper.instance().handleUpdate('jersey_number', fakePlayer, '11.5')

        expect(wrapper.state().errors[fakePlayer.id]).toBe(NUM_INPUT_VALIDATION_ERROR)
        expect(axios.patch).not.toHaveBeenCalled()
      })

      it('early returns if jersey number is not positive', () => {
        wrapper.instance().handleUpdate('jersey_number', fakePlayer, '-1')

        expect(wrapper.state().errors[fakePlayer.id]).toBe(NUM_INPUT_VALIDATION_ERROR)
        expect(axios.patch).not.toHaveBeenCalled()
      })

      it('calls axios.patch with correct URL and params', () => {
        wrapper.instance().handleUpdate('starter', fakePlayer, true)

        expect(axios.patch).toHaveBeenCalledWith(
          `${BASE_URL}/conferences/${defaultProps.team.conference_id}/teams/${defaultProps.team.id}/players/${
            fakePlayer.id
          }`,
          {
            player: {
              starter: true,
            },
          },
          { mode: 'no-cors' },
        )
      })

      describe('successful responses', () => {
        beforeEach(() => {
          jest.spyOn(wrapper.instance(), 'handleSuccess')
        })

        it('updates player state with merged state and player response', async () => {
          const expected = { ...fakePlayer, starter: true }
          axios.patch.mockResolvedValue({ data: expected })

          await wrapper.instance().handleUpdate('starter', fakePlayer, true)

          expect(wrapper.state().players).toEqual([expected, anotherPlayer])
        })

        it('calls handleSuccess() with playerId if no response errors present', async () => {
          const expected = { ...fakePlayer, starter: true }
          axios.patch.mockResolvedValue({ data: expected })

          await wrapper.instance().handleUpdate('starter', fakePlayer, true)

          expect(wrapper.instance().handleSuccess).toHaveBeenCalledWith(fakePlayer.id)
        })
      })

      describe('failed responses', () => {
        it('updates responseError state', async () => {
          axios.patch.mockRejectedValue({ data: { errors: 'Something Bad' } })

          await wrapper.instance().handleUpdate('starter', fakePlayer, true).catch(() => {
            expect(wrapper.state().responseError).toBe('Something Bad')
          })
        })
      })
    })
  })
})
