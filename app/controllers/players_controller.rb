class PlayersController < ApplicationController
  before_action :set_team
  # GET /players
  def index
    @players = @team.players

    render json: @players
  end

  def update
    @player = Player.find(params[:id])

    if @player.update_attributes(player_params)
      render json: @player
    else
      render json: { errors: @player.errors.full_messages }
    end
  end

  private def player_params
    params.require(:player).permit(:jersey_number)
  end

  private def set_team
    @team = Team.find_by(id: params[:team_id], conference_id: params[:conference_id])
  end
end
