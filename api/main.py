from fastapi import FastAPI, File, UploadFile
from PIL import Image
import io
import torch

from load_model import model, class_names
from utils.utils import process_image

app = FastAPI()

CONFIDENCE_THRESHOLD = 0.5

@app.post("/predict")
async def predict(file:UploadFile = File(...)):
    
    image_bytes = await file.read()
    image = Image.open(io.BytesIO(image_bytes))

    tensor = process_image(image)

    with torch.inference_mode():
        outputs = model(tensor)
        probabilities = torch.softmax(outputs, dim=1)
        confidence, predicted_idx = torch.max(probabilities, dim=1)

        if confidence.item() < CONFIDENCE_THRESHOLD:
            return {
                "predicted_class": "uncertain",
                "confidence": round(confidence.item(), 4)
            }
        else:
            return {
            "predicted_class": class_names[predicted_idx.item()],
            "confidence": round(confidence.item(), 4) 
            }


    

