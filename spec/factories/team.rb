FactoryBot.define do
  factory :team do
    name { 'UNC' }
    mascot { 'Ram' }
    coach { 'Roy Williams' }
    wins { 1 }
    losses { 1 }

    trait :with_players do
      after(:create) do |team|
        team.players << create(:player, team: team)
      end
    end
  end
end