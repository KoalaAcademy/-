#!/bin/bash
echo "Starting Flask Backend..."
cd "$(dirname "$0")"
if [ -d ".venv" ]; then
    source .venv/bin/activate
else
    echo "Virtual environment not found. Please create one first."
    exit 1
fi
export FLASK_APP=backend/app.py
export FLASK_ENV=development
export FLASK_DEBUG=1
python backend/app.py
