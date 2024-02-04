from flask import Flask, request, jsonify, Response
from flask_cors import CORS

import google.auth
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from google.oauth2 import service_account
import webbrowser
import uuid 
import openai

credentials_file = 'credentials.json'
creds = service_account.Credentials.from_service_account_file(credentials_file)
slides_service = build("slides", "v1", credentials=creds)
drive_service = build("drive", "v3", credentials=creds)


def create_slide(slideNum, presentation_id):
    # Add a new completely blank slide
    requests = [
        {
            "createSlide": {
                "insertionIndex": slideNum,
                "slideLayoutReference": {"predefinedLayout": "BLANK"},
            }
        }
    ]
    slideNum+=1
    response = slides_service.presentations().batchUpdate(presentationId=presentation_id, body={"requests": requests}).execute()

    first_slide_id = response.get('replies')[0]['createSlide']['objectId']
    print(f"The ID of the first slide is: {first_slide_id}")

    return first_slide_id

#-----------------------------------------------------------------------------------------------------

def create_presentation(title):
    try:

        # Create a new presentation
        presentation = slides_service.presentations().create(body={"title": title}).execute()
        presentation_id = presentation.get('presentationId')
        print(f"Created presentation with ID: {presentation_id}")

        # Set sharing settings using Google Drive API
        drive_service.permissions().create(
            fileId=presentation_id,
            body={
                "role": "writer",
                "type": "anyone",
            }
        ).execute()


        # Open the presentation in a web browser
        webbrowser.open(f"https://docs.google.com/presentation/d/{presentation_id}/edit")

        return presentation

    except HttpError as error:
        print(f"An error occurred: {error}")
        print("Presentation not created")
        return error

#-----------------------------------------------------------------------------------------------------

def create_textbox_title(presentation_id, page_id, text):
    try:
        service = build("slides", "v1", credentials=creds)

        # Create a new square textbox, using the supplied element ID.
        element_id = f"MyTextBox_{str(uuid.uuid4())}"  # Use uuid to generate a unique ID

        requests = [
            {
                "createShape": {
                    "objectId": element_id,
                    "shapeType": "TEXT_BOX",
                    "elementProperties": {
                        "pageObjectId": page_id,
                        "size": {"height": {"magnitude": 60, "unit": "PT"}, "width": {"magnitude": 700, "unit": "PT"}},
                        "transform": {
                            "scaleX": 1,
                            "scaleY": 1,
                            "translateX": 10,
                            "translateY": 10,
                            "unit": "PT",
                        },
                    },
                }
            },
            # Insert text into the box, using the supplied element ID.
            {
                "insertText": {
                    "objectId": element_id,
                    "insertionIndex": 0,
                    "text": text,
                }
            },
            # Update the text style to set the font size and text color
           {
                "updateTextStyle": {
                    "objectId": element_id,
                    "textRange": {"type": "ALL"},
                    "style": {
                        "fontSize": {"magnitude": 35, "unit": "PT"},
                        "foregroundColor": {"opaqueColor": {"rgbColor": {"red": 0.0, "green": 0.0, "blue": 0.0}}},
                        "bold": True,
                    },
                    "fields": "fontSize,foregroundColor,bold",
                }
            }, 
        ]

        # Execute the request.
        body = {"requests": requests}
        response = (
            service.presentations()
            .batchUpdate(presentationId=presentation_id, body=body)
            .execute()
        )
        create_shape_response = response.get("replies")[0].get("createShape")
        print(f"Created textbox with ID:{(create_shape_response.get('objectId'))}")
        
    except HttpError as error:
        print(f"An error occurred: {error}")
        return error

    return response

#-----------------------------------------------------------------------------------------------------

service = build("slides", "v1", credentials=creds)
def create_textbox_body(presentation_id, page_id, text):
    try:

        # Create a new square textbox, using the supplied element ID.
        element_id = f"MyTextBox_{str(uuid.uuid4())}"  # Use uuid to generate a unique ID

        requests = [
            {
                "createShape": {
                    "objectId": element_id,
                    "shapeType": "TEXT_BOX",
                    "elementProperties": {
                        "pageObjectId": page_id,
                        "size": {"height": {"magnitude": 400, "unit": "PT"}, "width": {"magnitude": 700, "unit": "PT"}},
                        "transform": {
                            "scaleX": 1,
                            "scaleY": 1,
                            "translateX": 10,
                            "translateY": 75,
                            "unit": "PT",
                        },
                    },
                }
            },
            # Insert text into the box, using the supplied element ID.
            {
                "insertText": {
                    "objectId": element_id,
                    "insertionIndex": 0,
                    "text": text,
                }
            },
            # Update the text style to set the font size and text color
           {
                "updateTextStyle": {
                    "objectId": element_id,
                    "textRange": {"type": "ALL"},
                    "style": {
                        "fontSize": {"magnitude": 20, "unit": "PT"},
                        "foregroundColor": {"opaqueColor": {"rgbColor": {"red": 0.0, "green": 0.0, "blue": 0.0}}},
                    },
                    "fields": "fontSize,foregroundColor",
                }
            }, 
        ]

        # Execute the request.
        body = {"requests": requests}
        response = (
            service.presentations()
            .batchUpdate(presentationId=presentation_id, body=body)
            .execute()
        )
        create_shape_response = response.get("replies")[0].get("createShape")
        print(f"Created textbox with ID:{(create_shape_response.get('objectId'))}")
        
    except HttpError as error:
        print(f"An error occurred: {error}")
        return error

    return response

#-----------------------------------------------------------------------------------------------------

def add_image_to_slide(presentation_id, slide_id, image_url):
    try:
        service = build("slides", "v1", credentials=creds)

        # Create a new image on the slide
        element_id = f"MyImage_{str(uuid.uuid4())}"
        requests = [
            {
                "createImage": {
                    "url": image_url,
                    "elementProperties": {
                        "pageObjectId": slide_id,
                        "size": {"height": {"magnitude": 300, "unit": "PT"}, "width": {"magnitude": 400, "unit": "PT"}},
                        "transform": {
                            "scaleX": 1,
                            "scaleY": 1,
                            "translateX": 50,
                            "translateY": 100,
                            "unit": "PT",
                        },
                    },
                }
            },
        ]

        # Execute the request.
        body = {"requests": requests}
        response = (
            service.presentations()
            .batchUpdate(presentationId=presentation_id, body=body)
            .execute()
        )
        create_image_response = response.get("replies")[0].get("createImage")
        print(f"Added image with ID: {create_image_response.get('objectId')}")

    except HttpError as error:
        print(f"An error occurred: {error}")
        return error

    return response


#-----------------------------------------------------------------------------------------------------

def image_search(searchPrompt):
    from google_images_search import GoogleImagesSearch

    api_key = 'AIzaSyBx2hD7jfdA3lbLfrdRjhdh5y5A9Dnu8oI'
    cx = '13e50dc25e96d4813'
    gis = GoogleImagesSearch(api_key, cx)

    search_params = {
        'q': searchPrompt,
        'num': 1,  # Number of results to fetch
        'safe': 'high',  # Safe search level (options: high, medium, off)
    }
    gis.search(search_params=search_params)

    for image in gis.results():
        return image.url
    return 

def create_slide_information():
    global question
    global slidesList
    global title

    completion = openai.chat.completions.create(model="gpt-4-0125-preview",
    messages=[
    {"role": "user", "content": "I want to make a slide show about the following information. I don't want a title I just want the body of the slides (50 minimum words, 120 max words per slide). Here is the context. "+question+". Nothing else. To indicate a new slide put '|' to help users know when a slide ends. DO NOT have more than 5 slides"}
    ])

    AnswerGPT = (completion.choices[0].message.content).replace("\n", "")
    print(AnswerGPT)
    if AnswerGPT[-1] == "|":
        AnswerGPT = AnswerGPT[:-1]

    slidesList = AnswerGPT.split("|")

    #main title slide
    completion = openai.chat.completions.create(model="gpt-4-0125-preview",
        messages=[
        {"role": "user", "content": "Based of this info make me a title 4 words max. Only return the title nothing else! Also don't include quotation marks"+AnswerGPT}
    ])

    title = (completion.choices[0].message.content)

def presentation_routine():
    global title
    global slidesList

    if __name__ == "__main__":

        presentation_id = create_presentation(title[0]).get('presentationId')
        slideNum = 1

        print("waiting for slide create")
        slide_id1 = create_slide(slideNum, presentation_id)
        print("waiting for title create")
        create_textbox_title(presentation_id, slide_id1,title[0])
        print("done first!")

        completion = openai.chat.completions.create(model="gpt-4-0125-preview",
            messages=[
            {"role": "user", "content": "if you were to look up an image to put with this title of a slide what would you search up . Only return the search prompt nothing else! Also don't include quotation marks"+title[0]}
        ])
        searchPrompt = (completion.choices[0].message.content)

        print("PROMP!!!!!!!!!!!!!! ",searchPrompt)

        imgURL = image_search(searchPrompt)
        add_image_to_slide(presentation_id, slide_id1, imgURL)

        slideNum +=1

        #############################

        for slideInfo in slidesList:
            print("Waiting for GPT")
            completion = openai.chat.completions.create(model="gpt-4-0125-preview",
                messages=[
                {"role": "user", "content": "Based of this info make me a title 4 words max. Only return the title nothing else! Also don't include quotation marks"+slideInfo}
            ])


            print("waiting for slide create")
            slide_id1 = create_slide(slideNum, presentation_id)
            print("waiting for title create")
            title = (completion.choices[0].message.content)
            create_textbox_title(presentation_id, slide_id1,title)
            print("waiting for body create")
            body = slideInfo
            create_textbox_body(presentation_id, slide_id1,body)
            print("done one!")
            slideNum +=1
                

        #Deletes first slide
        requests = [{"deleteObject": {"objectId": "p",}}]
        body = {"requests": requests}
        response = (service.presentations().batchUpdate(presentationId=presentation_id, body=body).execute())



app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])

# GLOBAL VARIABLES
title = ""
question = ""
slidesList = []

# OTHER STUFF
openai.api_key = ""

# ROUTES 

@app.before_request
def basic_authentication():
    if request.method.lower() == 'options':
        return Response()

@app.route("/api/submit", methods=['POST', 'GET', 'OPTIONS'])
def submit_data():


    input_data = request.json.get('inputValues')

    print("####################")
    print(input_data)
    print("####################")

    
    global slidesList
    slidesList = input_data

    
    print(slidesList)
    
    presentation_routine()
    

    return {"response": "POST REQUEST RECEIVED"}

@app.route("/api/submit_title", methods=['POST', 'GET', 'OPTIONS'])
def submit_title():
    input_data = request.json.get('inputValue')

    print("$$$$$$$$$$$$$$$$")
    print(input_data)
    print("$$$$$$$$$$$$$$$$")

    global title
    title = input_data

    return {"response": "POST REQUEST RECEIVED"}


@app.route("/api/submit_description", methods=['POST', 'GET', 'OPTIONS'])
def submit_description():
    input_data = request.json.get('descriptionValue')

    global question
    question = input_data

    print("!!!!!!!!!!!!!!!!")
    print(input_data)
    print("!!!!!!!!!!!!!!!!")


    create_slide_information()
    get_slides()
    get_info()
    print("finished")

    return {"response": "POST REQUEST RECEIVED"}


@app.route("/api/get_title", methods=['GET'])
def get_info():
    global title
    return {"response": [title]}


@app.route("/api/get_slides", methods=['GET'])
def get_slides():
    global slidesList
    return {"response": slidesList}


if __name__ == '__main__':
    app.run(debug=True)