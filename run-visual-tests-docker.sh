#!/bin/bash
# scripts/run-visual-tests-docker.sh

echo "Building and running visual tests in Docker..."
docker-compose -f docker-compose.visual-tests.yml up --build --abort-on-container-exit

# Копируем снепшоты если нужно
if [ -d "/app/__snapshots__" ]; then
    echo "Copying snapshots from container..."
    docker cp $(docker-compose -f docker-compose.visual-tests.yml ps -q visual-tests):/app/__snapshots__ ./
fi
