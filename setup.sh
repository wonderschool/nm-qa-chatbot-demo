#!/bin/bash

# Q&A Chatbot Demo Setup Script

echo "🚀 Setting up Q&A Chatbot Demo..."

# Create virtual environment
echo "📦 Creating virtual environment..."
python3 -m venv venv

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "📥 Installing dependencies..."
pip install -r requirements.txt

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "⚙️  Creating .env file..."
    cat > .env << EOF
# Add your OpenAI API key here
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-3.5-turbo
EOF
    echo "📝 Please edit .env file and add your OpenAI API key"
fi

echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit .env file and add your OpenAI API key"
echo "2. Edit config.py and add your document URLs and demo questions"
echo "3. Run: source venv/bin/activate"
echo "4. Run: cd backend && python app.py"
echo "5. Open frontend/index.html in your browser"
echo ""
echo "Happy demoing! 🎉"
