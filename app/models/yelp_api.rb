module Yelp
  class Api
    def initialize
      Yelp.client.configure do |config|
        config.consumer_key = "cKv4aQh0NBoFq-h2uvutFg"
        config.consumer_secret = "64Wrgn2ML84YgEWjHT09Zg6zZAM"
        config.token = "WFMDqK4bLhsEZ5D1zeDRAiYT0VW47pEz"
        config.token_secret = "ZtslXhT3rAhzPRq5pG9niiJV7uU"
      end
    end

    def search_food(place)
      search_response = Yelp.client.search(place, {term: 'food'})
    end
  
  end
end