import requests
import json
from dotenv import load_dotenv
import os

load_dotenv()

# Replace with your GitHub personal access token
GITHUB_ADD_REPOS_TOKEN = os.getenv('GITHUB_ADD_REPOS_TOKEN')

# Replace with your GitHub username
GITHUB_USERNAME = os.getenv('aaron-soto')

# List of repository names to create
repo_names = [
  'test-repo-1',
  'test-repo-2',
  'test-repo-3',
  'test-repo-4',
  'test-repo-5',
  ]

# GitHub API URL for creating repositories
api_url = 'https://api.github.com/user/repos'

# Headers for the API request
headers = {
    'Authorization': f'token {GITHUB_TOKEN}',
    'Accept': 'application/vnd.github.v3+json'
}

# Function to create a repository
def create_repo(repo_name):
    payload = {
        'name': repo_name,
        'private': False,  # Set to True if you want to create private repositories
        'description': 'Repository created for testing purposes',
        'auto_init': True  # Automatically initialize the repository with a README
    }
    
    response = requests.post(api_url, headers=headers, data=json.dumps(payload))
    if response.status_code == 201:
        print(f'Successfully created repository: {repo_name}')
    else:
        print(f'Failed to create repository: {repo_name}. Status code: {response.status_code}, Response: {response.json()}')

# Create repositories
for repo_name in repo_names:
    create_repo(repo_name)
