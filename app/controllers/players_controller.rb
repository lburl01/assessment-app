class PlayersController < ApplicationController
  # GET /players
  def index
    team = Team.find_by(id: params[:team_id], conference_id: params[:conference_id])
    @players = team.players

    render json: @players
  end
end
