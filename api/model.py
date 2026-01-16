import torch
from torch import nn
from torchvision import models

def create_model(num_classes: int):

    weights = models.EfficientNet_B0_Weights.DEFAULT
    model = models.efficientnet_b0(weights=weights)

    for params in model.features.parameters():
        params.requires_grad = False
    
    in_features = model.classifier[1].in_features

    model.classifier = nn.Sequential(
        nn.Dropout(p=0.2),
        nn.Linear(in_features=in_features, out_features=num_classes)
    )
