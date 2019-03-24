require 'rails_helper'

RSpec.describe TeamsController do
  let(:conference) { create(:conference) }
  let(:team) { create(:team, conference: conference )}

  describe 'GET index' do
    it 'returns a success response with teams' do
      3.times { create(:team, :with_players, conference: conference) }
      get "/conferences/#{conference.id}/teams", as: :json

      expect(response).to have_http_status(:ok)
      expect(response.parsed_body.size).to eq(3)
    end
  end

  describe 'PATCH update' do
    it 'returns json success response with team' do
      test_update
      assert_json(response)
      expect(response).to have_http_status(:ok)
    end

    it 'returns json failure response with team errors' do
      test_update(wins: 'super bad thing that is not a number')
      assert_json(response)
      expect(response).to have_http_status(:unprocessable_entity)
      expect(response.parsed_body['errors']).to eq ['Wins is not a number']
    end
  end

  private def assert_json(response)
    expect(response.content_type).to eq "application/json"
  end

  private def test_update(wins: 1, losses: 1)
    patch conference_team_path(
      conference_id: conference.id,
      id: team.id,
      params: { team: { wins: wins, losses: losses }}
    ), as: :json
  end
end