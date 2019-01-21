from flask import Flask, jsonify, request
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

# Required information for Bing Search API
subscription_key = "98bf5ad85846461f8031b0e681960bb6"
search_url = "https://api.cognitive.microsoft.com/bing/v7.0/search"

# When a search term is sent to this URL, this Flask server will return
# a JSON object representing the relevant search results
@app.route("/api/search", methods=["GET"])
def search():
    search_term = request.args.get("search_term")

    # Makes the request to the Bing Search API and returns the search results
    # as a dictionary-like data structure
    headers = {"Ocp-Apim-Subscription-Key" : subscription_key}
    params  = {"q": search_term, "textDecorations":True, "textFormat":"HTML"}
    response = requests.get(search_url, headers=headers, params=params)
    response.raise_for_status()
    search_results = response.json()

    # Build up a data structure from the Bing search results
    # that contains only the information that I want to return from this API
    results_to_return = []
    for v in search_results["webPages"]["value"]:
        result = {
            "name": v["name"],
            "description":v["snippet"],
            "url" : v["url"]
        }
        results_to_return.append(result)

    return jsonify(results_to_return)

if __name__ == "__main__":
    app.run()
