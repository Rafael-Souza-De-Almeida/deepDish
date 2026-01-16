import torch
from model import create_model

DEVICE = "cuda" if torch.cuda.is_available() else "cpu"

trained_model = torch.load("models/sps_classifier.pt", map_location=DEVICE)

class_names = trained_model["class_names"]

model = create_model(
    num_classes=len(class_names),
    device=DEVICE,
)

model.load_state_dict(trained_model["model_state_dict"])

model.eval()