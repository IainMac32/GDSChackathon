from google_images_search import GoogleImagesSearch

# Replace 'your_api_key' and 'your_cx' with your actual API key and Custom Search Engine ID
api_key = 'AIzaSyBx2hD7jfdA3lbLfrdRjhdh5y5A9Dnu8oI'
cx = '13e50dc25e96d4813'

gis = GoogleImagesSearch(api_key, cx)

search_params = {
    'q': 'bald eagle close up',
    'num': 1,  # Number of results to fetch
    'safe': 'high',  # Safe search level (options: high, medium, off)
}

gis.search(search_params=search_params)

for image in gis.results():
    print(image.url)
    # You can download the image using the image.url or perform other actions here