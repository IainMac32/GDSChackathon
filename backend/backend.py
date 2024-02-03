import google.auth
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from google.oauth2 import service_account
import webbrowser


credentials_file = 'credentials.json'
creds = service_account.Credentials.from_service_account_file(credentials_file)
slides_service = build("slides", "v1", credentials=creds)
drive_service = build("drive", "v3", credentials=creds)


def create_slide():
    # Add a new completely blank slide
    requests = [
        {
            "createSlide": {
                "insertionIndex": 0,
                "slideLayoutReference": {"predefinedLayout": "BLANK"},
            }
        }
    ]
    response = slides_service.presentations().batchUpdate(presentationId=presentation_id, body={"requests": requests}).execute()

    first_slide_id = response.get('replies')[0]['createSlide']['objectId']
    print(f"The ID of the first slide is: {first_slide_id}")

    return first_slide_id



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

import google.auth
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError


def create_textbox_with_text(presentation_id, page_id):
  try:
    service = build("slides", "v1", credentials=creds)
    # Create a new square textbox, using the supplied element ID.
    element_id = "MyTextBox_10"
    pt350 = {"magnitude": 350, "unit": "PT"}
    requests = [
        {
            "createShape": {
                "objectId": element_id,
                "shapeType": "TEXT_BOX",
                "elementProperties": {
                    "pageObjectId": page_id,
                    "size": {"height": pt350, "width": pt350},
                    "transform": {
                        "scaleX": 1,
                        "scaleY": 1,
                        "translateX": 350,
                        "translateY": 100,
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
                "text": "New Box Text Inserted!",
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

if __name__ == "__main__":
    # Put the title of the presentation
    presentation_id = create_presentation("Test2").get('presentationId')

    create_textbox_with_text(
      presentation_id, create_slide()
    )
    