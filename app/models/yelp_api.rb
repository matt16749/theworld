module Yelp
  class Api
    def initialize
      Yelp.client.configure do |config|
        config.consumer_key = ENV['CONSUMER_KEY']
        config.consumer_secret = ENV['CONSUMER_SECRET']
        config.token = ENV['TOKEN']
        config.token_secret = ENV['TOKEN_SECRET']
      end
    end

    def search_businesses(place)
      business_hash = {}
      business_hash[:place] = place
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