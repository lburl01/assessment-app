require 'rails_helper'

RSpec.describe PlayersController do
  let(:conference) { create(:conference) }
  let(:team) { create(:team, :with_players, conference: conference ) }

  describe 'GET index' do
    it 'returns a success response with team players' do
      get conference_team_players_path(
        conference_id: conference.id,
        team_id: team.id
      ), as: :json

      expect(response).to have_http_status(:ok)
      expect(response.parsed_body.size).to eq(1)
      expect(response.parsed_body.first['team_id']).to eq(team.id)
      assert_json(response)
    end
  end

  describe 'PATCH update' do
    it 'returns json success response with updated player' do
      test_update
      assert_json(response)
      expect(response).to have_http_status(:ok)
    end

    it 'returns json failure response with player errors' do
      test_update(jersey_number: 'not a number')
      assert_json(response)
      expect(response).to have_http_status(:unprocessable_entity)
      expect(response.parsed_body['errors']).to eq ['Jersey number is not a number']
    end
  end

  private def assert_json(response)
    expect(response.content_type).to eq "application/json"
  end

  private def test_update(jersey_number: 12)
    patch conference_team_player_path(
      conference_id: conference.id,
      id: team.players.first.id,
      team_id: team.id,
      params: { player: { jersey_number: jersey_number }}
    ), as: :json
  end
end