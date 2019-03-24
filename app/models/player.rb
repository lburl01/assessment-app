class Player < ApplicationRecord
  belongs_to :team

  validates_uniqueness_of :jersey_number, scope: :team_id
  validates :jersey_number, numericality: { only_integer: true }
  validates :weight, numericality: true
end
