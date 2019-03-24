require 'rails_helper'

RSpec.describe Player, type: :model do
  let(:conference) { create(:conference) }
  let(:team) { create(:team, :with_players, conference: conference) }
  let(:player) { team.players.first }

  describe 'validations' do
    it 'require jersey numbers to be unique within each team' do
      new_player = player.dup

      refute new_player.valid?
      assert_includes new_player.errors[:jersey_number], 'has already been taken'
    end

    it 'require jersey numbers to be integers' do
      player.update_attributes(jersey_number: 1.2)
      refute player.valid?

      player.update_attributes(jersey_number: 11)
      assert player.valid?
      assert_equal 11, player.jersey_number
    end

    it 'require weight to be numbers' do
      player.update_attributes(weight: 'NaN')
      refute player.valid?
    end

    it 'allow weight to be a float' do
      player.update_attributes!(weight: 166.6)
      assert player.valid?
    end
  end
end
