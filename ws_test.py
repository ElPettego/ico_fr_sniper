import pika 
import dotenv
import os


dotenv.load_dotenv()

def callback(ch, method, properties, body):
    print(f"Received message: {body.decode()}")

connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
channel = connection.channel()

queue = 'test'

channel.queue_declare(queue=queue)
channel.basic_consume(queue=queue, on_message_callback=callback, auto_ack=True)

print('Waiting for messages...')
channel.start_consuming()