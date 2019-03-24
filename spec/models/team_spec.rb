require 'rails_helper'

RSpec.describe Team, type: :model do
  let(:conference) { create(:conference) }
  let(:team) { create(:team, :with_players, conference: conference) }

  describe 'validations' do
    it 'require wins to be only integers' do
      team.update_attributes(wins: 'waffles')
      refute team.valid?

      team.update_attributes(wins: 23)
      assert team.valid?
      assert_equal 23, team.wins
    end

    it 'require losses to be only integers' do
      team.update_attributes(losses: 'bacon')
      refute team.valid?

      team.update_attributes(losses: 123)
      assert team.valid?
      assert_equal 123, team.losses
    end
  end
end
