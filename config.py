import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class Config:
    OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
    OPENAI_MODEL = os.getenv('OPENAI_MODEL', 'gpt-5')
    
    # Demo questions to test the chatbot
    DEMO_QUESTIONS = [
        # Add your demo questions here
        # Example: "What is the main topic of the documents?",
        # Example: "How do I contact support?",
    ]
