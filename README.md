# Q&A Chatbot Demo

A simple Q&A chatbot that processes web documents and answers questions using OpenAI's GPT models.

## Quick Start

### 1. Setup Environment

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### 2. Configure API Key

Create a `.env` file in the project root:

Edit `.env` and add your OpenAI API key (reach out to Avash for info if you can't find on 1Password):

```
OPENAI_API_KEY=your_actual_api_key_here
OPENAI_MODEL=gpt-5
```

### 3. Run the Application

```bash
# Activate virtual environment and start the server
source venv/bin/activate
cd backend
python app.py
```

The application will be available at `http://localhost:5001` - both the frontend interface and API endpoints run on the same port!

## Usage

1. **Ask Questions**: Type questions in the chat interface

## Project Structure

```
├── backend/
│   ├── app.py              # Flask API server
│   ├── document_processor.py # Web scraping and text chunking
│   └── qa_service.py       # OpenAI integration and Q&A logic
├── frontend/
│   ├── index.html          # Chat interface
│   ├── styles.css          # Styling
│   └── script.js           # Frontend logic
├── config.py               # Configuration (URLs, questions, API keys)
├── requirements.txt        # Python dependencies
└── README.md              # This file
```