class PlayersController < ApplicationController
  before_action :set_team

  # GET /conferences/:conference_id/teams/:team_id/players
  def index
    @players = @team.players

    render json: @players
  end

  # PATCH /conferences/:conference_id/teams/:team_id/players/:id
  def update
    @player = Player.find(params[:id])

    if @player.update_attributes(player_params)
      render json: @player
    else
      render json: { errors: @player.errors.full_messages }, status: 422
    end
  end

  private def player_params
    params.require(:player).permit(:jersey_number, :starter)
  end

  private def set_team
    @team = Team.find_by(id: params[:team_id], conference_id: params[:conference_id])
  end
end
