from openai import OpenAI
import sys
import os

from pydantic.root_model import RootModelRootType
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from config import Config
from prompts import get_system_prompt


class QAService:
    def __init__(self):
        self.client = OpenAI(api_key=Config.OPENAI_API_KEY)
        self.model = Config.OPENAI_MODEL
        self.messages = [{"role": "system", "content": get_system_prompt()}]
        print(self.messages[0]['content'])
    
    def answer_question(self, question: str) -> str:
        """Generate an answer based on the question"""
        try:
            # Create prompt for OpenAI
            prompt = f"""
                    Please answer the following question. Use the questions and answers within your scope to answer the question. Remember your scope and don't answer questions that are not within your scope. Be helpful and informative.

                    Question: {question}

                    Answer:"""
            self.messages.append({"role": "user", "content": prompt})
            # Call OpenAI API
            response = self.client.responses.create(
                model="gpt-5",
                input=self.messages,
                max_output_tokens=500,
                reasoning={"effort": "minimal"}
            )
            self.messages.append({"role": "assistant", "content": response.output_text.strip()})
            print("LENGTH OF MESSAGES: ", len(self.messages))
            return response.output_text.strip()
        
        except Exception as e:
            return f"Error generating answer: {str(e)}"



# class QAService:
#     def __init__(self):
#         self.client = OpenAI(api_key=Config.OPENAI_API_KEY)
#         self.model = Config.OPENAI_MODEL
    
#     def answer_question(self, question: str) -> str:
#         """Generate an answer based on the question"""
#         try:
#             # Create prompt for OpenAI
#             prompt = f"""
#                     Please answer the following question. Use the questions and answers within your scope to answer the question. Remember your scope and don't answer questions that are not within your scope. Be helpful and informative.

#                     Question: {question}

#                     Answer:"""
#             # Call OpenAI API
#             response = self.client.responses.create(
#                 model="gpt-5",
#                 input=[
#                     {"role": "system", "content": get_system_prompt()},
#                     {"role": "user", "content": prompt}
#                 ],
#                 max_output_tokens=500,
#                 reasoning={"effort": "minimal"}
#             )
#             return response.output_text.strip()
            
#         except Exception as e:
#             return f"Error generating answer: {str(e)}"