from flask import Flask, request, jsonify, send_from_directory, send_file
from flask_cors import CORS
import openai
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from config import Config
from qa_service import QAService

app = Flask(__name__, static_folder='../frontend')
CORS(app)

# Initialize services
qa_service = QAService()

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy", "message": "Q&A Chatbot API is running"})


@app.route('/api/ask', methods=['POST'])
def ask_question():
    """Ask a question and get an answer"""
    try:
        question = request.json.get('question', '')
        if not question:
            return jsonify({
                "success": False,
                "error": "Question is required"
            }), 400
        
        answer = qa_service.answer_question(question)
        
        return jsonify({
            "success": True,
            "question": question,
            "answer": answer
        })
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

@app.route('/api/demo-questions', methods=['GET'])
def get_demo_questions():
    """Get list of demo questions for testing"""
    return jsonify({
        "success": True,
        "questions": Config.DEMO_QUESTIONS
    })

# Frontend routes
@app.route('/')
def serve_frontend():
    """Serve the main frontend page"""
    return send_file('../frontend/index.html')

@app.route('/<path:filename>')
def serve_static(filename):
    """Serve static files (CSS, JS)"""
    return send_from_directory('../frontend', filename)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
