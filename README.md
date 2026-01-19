# 🍕 DeepDish — AI-Powered Food Classification

DeepDish is an end-to-end **Computer Vision** application designed to classify food images with high precision. This project showcases a full-stack AI integration, combining a Deep Learning pipeline with a website.

The application currently identifies three popular categories:
- **Pizza** 🍕
- **Steak** 🥩
- **Sushi** 🍣

---

## 🚀 Tech Stack

- **Core:** Python
- **Deep Learning:** PyTorch, Torchvision (EfficientNet-B0)
- **Backend API:** FastAPI (Asynchronous processing)
- **Frontend:** React + Vite
- **Infrastructure:** Docker & Docker Compose

---

## 📸 Demo

| Classification Result | Confidence Levels |
| :---: | :---: |
| <img src="https://github.com/user-attachments/assets/55b3c425-d76c-4b29-b11a-1df6c0532472" width="400" /> | <img src="https://github.com/user-attachments/assets/326d8f6d-74d9-4d11-bb96-7329e25689c9" width="400" /> |
| <img src="https://github.com/user-attachments/assets/e34eb5e6-83a9-47e6-b135-04b9fac50e5c" width="400" /> | <img src="https://github.com/user-attachments/assets/5e44d671-a51d-4a0d-bd42-1f080db498e7" width="400" /> |

---

## 🧠 Model Training Overview

### 📊 Dataset
The model was trained on a curated subset of the **Food-101** dataset. A custom data pipeline was built to filter, clean, and remap labels for the target classes.

### 🔬 Evolution of the Model

#### 1. Custom CNN (Baseline)
The initial approach used a handcrafted CNN inspired by **VGG-style** architectures.
- **Goal:** Establish a baseline for the classification task.
- **Outcome:** While the model learned basic patterns, it struggled with complex features and achieved limited accuracy due to dataset size and training constraints.

#### 2. Transfer Learning (Final Model)
For the production model, I implemented **Transfer Learning** using **EfficientNet-B0** (pretrained on ImageNet).
- **Strategy:** Frozen feature extraction layers with a custom-trained classifier head.
- **Result:** Achieved an impressive **95% validation accuracy**, providing robust and confident predictions.

> [!TIP]
> You can find the complete training logs, notebooks, and model evaluation metrics in the `/training` folder.

---

## ⚙️ System Architecture

### **Backend (FastAPI)**
A high-performance REST API designed for seamless model inference.
- **Endpoint:** `POST /predict` handles image uploads and preprocessing.
- **Validation:** Strict input validation for image formats.
- **Inference:** Optimized PyTorch execution in evaluation mode.

### **Frontend (React)**
A modern, responsive dashboard for interacting with the AI.
- **Real-time Preview:** Instant visualization of uploaded images.
- **Detailed Results:** Displays the predicted class alongside a confidence percentage.
- **State Management:** Handles loading states and API errors gracefully.

---

## 🛠 Installation & Setup

DeepDish is fully containerized, making it easy to run on any environment with **Docker**.

### **Prerequisites**
- Docker installed
- Docker Compose installed

### **Quick Start**

```bash
# Clone the repository
git clone https://github.com/Rafael-Souza-De-Almeida/deepdish.git

# Navigate to the project directory
cd deepdish

# Build and run with Docker Compose
docker compose up --build
```

---

## 📈 Future Roadmap

The project is continuously evolving. Future updates will focus on:

- Add more food categories
- Fine-tune EfficientNet layers
- Improve frontend UX
- Model versioning and monitoring

---

## 📄 License

This project is for educational and demonstration purposes.
