from torchvision import transforms
from torchvision import models
from PIL import Image

weights = models.EfficientNet_B0_Weights.DEFAULT
image_transforms = weights.transforms()

def process_image(image: Image.Image):

    image = image.convert("RGB")
    tensor = image_transforms(image).unsqueeze(0)
    return tensor




