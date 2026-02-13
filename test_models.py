# Create a test file: test_models.py
import google.generativeai as genai
import os

genai.configure(api_key="YOUR_API_KEY_HERE")

for model in genai.list_models():
    if 'embedContent' in model.supported_generation_methods:
        print(model.name)
