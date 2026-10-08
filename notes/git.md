# 🌿 Git Cheat Sheet

## ⚙️ Setup (one time)
```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
git config --global init.defaultBranch main
```

## 📦 Start a Project
| Command | What it does |
|:---|:---|
| `git init` | Create a new repo in the current folder |
| `git clone <url>` | Download a repo |

## 🔄 Daily Workflow
| Command | What it does |
|:---|:---|
| `git status` | Show changed files |
| `git add <file>` | Stage one file |
| `git add .` | Stage all changes |
| `git commit -m "message"` | Commit staged changes |
| `git commit -am "message"` | Stage tracked files and commit |
| `git push` | Upload commits to remote |
| `git pull` | Download and merge remote changes |
| `git fetch` | Download changes without merging |

## 🌱 Branches
| Command | What it does |
|:---|:---|
| `git branch` | List local branches |
| `git branch -a` | List all branches (incl. remote) |
| `git switch <branch>` | Switch to a branch |
| `git switch -c <branch>` | Create and switch to a new branch |
| `git merge <branch>` | Merge a branch into the current one |
| `git branch -d <branch>` | Delete a merged branch |
| `git push -u origin <branch>` | Push a new branch and track it |

## 🔍 History & Changes
| Command | What it does |
|:---|:---|
| `git log --oneline` | Short commit history |
| `git log --oneline --graph --all` | Visual branch history |
| `git diff` | Show unstaged changes |
| `git diff --staged` | Show staged changes |
| `git show <commit>` | Show one commit's details |
| `git blame <file>` | Who changed each line |

## ↩️ Undo Things
| Command | What it does |
|:---|:---|
| `git restore <file>` | Discard changes in a file ⚠️ |
| `git restore --staged <file>` | Unstage a file (keep changes) |
| `git commit --amend -m "new msg"` | Fix the last commit message |
| `git reset --soft HEAD~1` | Undo last commit, keep changes staged |
| `git reset --hard HEAD~1` | Undo last commit and **delete** changes ⚠️ |
| `git revert <commit>` | Make a new commit that undoes one |

## 📥 Stash (save work for later)
| Command | What it does |
|:---|:---|
| `git stash` | Save uncommitted changes aside |
| `git stash list` | List stashes |
| `git stash pop` | Bring back the latest stash |
| `git stash drop` | Delete the latest stash |

## 🌐 Remotes
| Command | What it does |
|:---|:---|
| `git remote -v` | Show remote URLs |
| `git remote add origin <url>` | Connect to a remote repo |
| `git pull --rebase` | Pull with a cleaner history |

## 🧭 Typical Feature Flow
```bash
git switch main
git pull
git switch -c feature/my-feature
# ...make changes...
git add .
git commit -m "Add my feature"
git push -u origin feature/my-feature
# then open a Pull Request on GitHub
```

> ⚠️ = can lose work, double-check before running