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

    def search_businesses(place)
      business_hash = {}
      business_hash[:place] = place
      # I receive back BurstStructures from Yelp
      params = {limit: 10}
      search_response = Yelp.client.search(place, params)
        businesses_names = search_response.businesses.map do |business| 
          business.name
        end
        business_hash[:name] = businesses_names
        business_locations = search_response.businesses.map do |business|
          business.location.address.join
        end
        business_hash[:location] = business_locations
      return business_hash
    end
  
  end
end