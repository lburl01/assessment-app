class Team < ApplicationRecord
  belongs_to :conference
  has_many :players

  validates :wins, :losses, numericality: { only_integer: true }
end
