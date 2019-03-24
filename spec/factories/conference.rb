# frozen_string_literal: true

FactoryBot.define do
  factory :conference do
    name { 'Atlantic Coast Conference' }
    short_name { 'ACC' }

    trait :ncaa do
      name { 'National Collegiate Athletic Association' }
      short_name { 'NCAA' }
    end
  end
end