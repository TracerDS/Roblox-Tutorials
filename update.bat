@echo off
git add *
set /p updateMsg=Update message: 

git commit -m "%updateMsg%"
git push origin docs