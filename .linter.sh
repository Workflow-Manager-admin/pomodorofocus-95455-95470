#!/bin/bash
cd /home/kavia/workspace/code-generation/pomodorofocus-95455-95470/main_container_for_pomodoro_focus
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

