class TeamsController < ApplicationController
  # GET /teams
  def index
    @teams = Team.all

    render json: @teams
  end

  # PATCH /conferences/:conference_id/teams/:id
  def update
    @team = Team.find_by(id: params[:id], conference_id: params[:conference_id])

    if @team.update_attributes(team_params)
      render json: @team
    else
      render json: { errors: @team.errors.full_messages }, status: 422
    end
  end

  private def team_params
    params.require(:team).permit(
      :losses,
      :wins
    )
  end
end
