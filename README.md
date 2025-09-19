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

```bash
cp .env.example .env
```

Edit `.env` and add your OpenAI API key:

```
OPENAI_API_KEY=your_actual_api_key_here
OPENAI_MODEL=gpt-5
```

### 3. Configure Documents and Questions

Edit `config.py` and add:

- **Document URLs**: Add the webpages you want the chatbot to process
- **Demo Questions**: Add questions to test the chatbot

Example:
```python
DOCUMENT_URLS = [
    "https://example.com/page1",
    "https://example.com/page2",
]

DEMO_QUESTIONS = [
    "What is the main topic of the documents?",
    "How do I contact support?",
]
```

### 4. Run the Application

```bash
# Activate virtual environment and start the server
source venv/bin/activate
cd backend
python app.py
```

The application will be available at `http://localhost:5000` - both the frontend interface and API endpoints run on the same port!

## Usage

1. **Process Documents**: Click "Process Documents" to scrape and process your configured URLs
2. **Ask Questions**: Type questions in the chat interface
3. **Demo Questions**: Click "Load Demo Questions" to see pre-configured test questions

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

## Features

- **Web Scraping**: Automatically extracts text content from web pages
- **Text Chunking**: Splits documents into manageable pieces for processing
- **Simple Retrieval**: Keyword-based relevance scoring (easily upgradeable)
- **Clean UI**: Modern chat interface with demo question support
- **Modular Design**: Separate frontend/backend for easy modifications

## Customization

- **Add more documents**: Update `DOCUMENT_URLS` in `config.py`
- **Improve retrieval**: Replace simple keyword matching in `qa_service.py` with embeddings
- **Add persistence**: Replace in-memory storage with a database
- **Enhance UI**: Modify `frontend/styles.css` and `frontend/script.js`

## Troubleshooting

- **API Key Issues**: Ensure your OpenAI API key is correctly set in `.env`
- **CORS Errors**: Make sure the backend is running on port 5000
- **Document Processing**: Check that URLs are accessible and contain text content
- **Network Issues**: Verify internet connection for web scraping and API calls
