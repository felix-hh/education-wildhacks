# -*- coding: utf-8 -*-
"""data_clearning.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1yWc41FuQG07eupK89aMJMe59EkFzi4x2
"""

pip install boto3

"""This pipeline donwloads raw files from s3, processes them for format before piping into chatGPT, then pushing them back to s3 in a preferred folder structure and naming convention for further processing."""

import boto3
import os
import numpy as np
import codecs
from datetime import date
import json

# Set up the S3 client
aws_access_key_id = 'YOUR-AWS-ACCESS-KEY'
aws_secret_access_key = 'YOUR-ACCESS-KEY-SECRET'
bucket_name = 'wildhacks2023'

session = boto3.Session(
    aws_access_key_id=aws_access_key_id,
    aws_secret_access_key=aws_secret_access_key,
)
s3 = session.resource('s3')
bucket = s3.Bucket(bucket_name)

# Define a base path for downloads
base_path = '/content/downloads'

# Download all files from the specified bucket
for obj in bucket.objects.all():
    if 'txt' in str(obj.key) or 'json' in str(obj.key):
        # Create the local directory if it doesn't exist
        local_folder = os.path.join(base_path, os.path.dirname(obj.key))
        if not os.path.exists(local_folder):
            os.makedirs(local_folder)

        # Download the file
        local_file_path = os.path.join(base_path, obj.key)
        print(f'Downloading {obj.key} to {local_file_path}')
        try:
            bucket.download_file(obj.key, local_file_path)
        except:
            continue

print('All files have been downloaded successfully.')

transcript_file = None
for file_name in os.listdir(base_path):
    if 'trans' in file_name:
        transcript_file = file_name
        break
with open(base_path+'/'+transcript_file) as user_file:
  file_contents = user_file.read()

parsed_json = json.loads(file_contents)

today = date.today()

new_transcript_json = {
  "name": 'parsed'+parsed_json['jobName'],
  "date": str(today),
  "transcript": str(parsed_json['results']['transcripts'][0])[16:-1]} #parsing extraneous information out

# Serializing json
json_object = json.dumps(new_transcript_json, indent=4)
 
# Writing to sample.json
with open(parsed_json['jobName']+".json", "w") as outfile:
    outfile.write(json_object)

# Create a session with your access and secret keys
session = boto3.Session(
    aws_access_key_id=aws_access_key_id,
    aws_secret_access_key=aws_secret_access_key,
)

# Create an S3 client using the session
s3 = session.client('s3')

# Set the file path and S3 bucket name

for file in os.listdir():
    if 'trans' in file:
        file_path = file
        bucket_name = 'wildhacks2023'

       # Set the folder name and create the S3 object key
        folder_name = 'courses/163516/lectures'
        s3_object_key = f"{folder_name}/{file_path}"

        # Upload the file to the folder in the bucket
        with open(file_path, 'rb') as file_data:
            s3.upload_fileobj(file_data, bucket_name, s3_object_key)

        print(f"{file_path} uploaded to {bucket_name}/{folder_name}.")

syllabus_file = base_path+'/syllabus.txt'

f=codecs.open(syllabus_file, 'r')

new_syllabus_json = {
  "name": 'syllabus',
  "date": str(today),
  "data": str(f.read())}

# Serializing json
json_object = json.dumps(new_syllabus_json, indent=4)
 
# Writing to sample.json
with open('syllabus'+".json", "w") as outfile:
    outfile.write(json_object)

# Create a session with your access and secret keys
session = boto3.Session(
    aws_access_key_id=aws_access_key_id,
    aws_secret_access_key=aws_secret_access_key,
)

# Create an S3 client using the session
s3 = session.client('s3')

# Set the file path and S3 bucket name

for file in os.listdir():
    if 'syllabus' in file:
        file_path = file
        bucket_name = 'wildhacks2023'

       # Set the folder name and create the S3 object key
        folder_name = 'courses/163516/syllabus'
        s3_object_key = f"{folder_name}/{file_path}"

        # Upload the file to the folder in the bucket
        with open(file_path, 'rb') as file_data:
            s3.upload_fileobj(file_data, bucket_name, s3_object_key)

        print(f"{file_path} uploaded to {bucket_name}/{folder_name}.")

assignment_feedback = base_path+'/assignment_feedback.txt'

f=codecs.open(assignment_feedback, 'r')

new_feedback_json = {
  "name": 'feedback.json',
  "date": str(today),
  "data": str(f.read())}

# Serializing json
json_object = json.dumps(new_feedback_json, indent=4)
 
# Writing to sample.json
with open('feedback'+".json", "w") as outfile:
    outfile.write(json_object)

# Create a session with your access and secret keys
session = boto3.Session(
    aws_access_key_id=aws_access_key_id,
    aws_secret_access_key=aws_secret_access_key,
)

# Create an S3 client using the session
s3 = session.client('s3')

# Set the file path and S3 bucket name

for file in os.listdir():
    if 'feedback' in file:
        file_path = file
        bucket_name = 'wildhacks2023'

       # Set the folder name and create the S3 object key
        folder_name = 'courses/163516/assignments'
        s3_object_key = f"{folder_name}/{file_path}"

        # Upload the file to the folder in the bucket
        with open(file_path, 'rb') as file_data:
            s3.upload_fileobj(file_data, bucket_name, s3_object_key)

        print(f"{file_path} uploaded to {bucket_name}/{folder_name}.")