class Player < ApplicationRecord
  belongs_to :team

  validates_uniqueness_of :jersey_number, scope: :team_id
end
