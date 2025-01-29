# Git

## First Steps

    git config --global --edit // OR The following below
    git config --global user.name mmustermann
    git config --global user.email "max.mustermann@example.com"

To configure the initial branch name to use in all of your new repositories call (names commonly chosen instead of `master` are `main`, `trunk` and `development`):

    git config --global init.defaultBranch <name>

The just-created branch can be renamed via this command:

    git branch -m <name>

Auto push of new branches

    git config --global --add --bool push.autoSetupRemote true

## .gitignore (CACHED vs. UNTRACKED, Mostly .nx Issues)

    folder/file.txt
    generated/
    *.backup
    !someException.bak

If something cannot be ignored, even it is in the .gitignore file, then it is probably already tracked by Git. In this case you have to remove it from the index:

    git rm --cached folder/file.txt
    git rm -r --cached .nx  // remove folder recursively
    # Re-check
    git diff --cached  // should be empty

### Remove ignored files from remote repository

    git rm -r --cached .
    git add .
    git commit -am "Removed ignored files"
    git push

## Undo add

    git reset --hard      // to last commit
    git rm --cached .     // undo add

## Stop ignoring cases, just be insensitive

    sudo sudo git config --unset-all core.ignorecase && git config --system core.ignorecase false

## Show Number of Commits

    # comparison to origin/HEAD (same branch on remote)
    git rev-list --count HEAD

    # comparison to origin/develop
    git rev-list --count HEAD ^origin/develop

## Rebase (Merging Commits)

    # Interactive Rebase. Use the number above
    # -show number of commits- to squash commits
    alias squash='function _squash() { git rebase -i HEAD~$1; }; _squash'

## Show just the current branch

    git rev-parse --abbrev-ref HEAD
    git symbolic-ref --short HEAD
    git branch | grep '*'
    git branch --contains HEAD
    git name-rev --name-only HEAD
    cat .git/HEAD
    basename $(git symbolic-ref HEAD)
    git symbolic-ref HEAD | cut -d/ -f3-
    git branch | sed -n '/\* /s///p'
    git rev-parse --symbolic-full-name --abbrev-ref @{u}
    git branch | awk '/^\*/{print $2}'

## Git Pull and reset/ignore local changes

    git pull -s recursive -X theirs

## Git Show Remote Git Repository Url

    git config --get remote.origin.url  // SIMPLE
    git remote show origin              // DETAILS

## List local and upstream branches

    git branch -vv --sort=-committerdate -a

shows the local branches and their upstream branches

- and the last commit on the branch
- and the last commit on the upstream branch
- and the relationship between the local branch
  - and the upstream branch
- sorts by newest commit first

## Prune Remote Branches

If `git branch -a` shows remote branches that no longer exist on the remote, you can prune them with:

    git remote prune origin

## Sort remote branched by up-to-dateness (committer date)

    // [credits prof. narebski](https://stackoverflow.com/questions/5188320/how-can-i-get-a-list-of-git-branches-ordered-by-most-recent-commit)
    git for-each-ref --sort=-committerdate refs/heads/
    # Or using git branch (since version 2.7.0)
    git branch --sort=-committerdate  # DESC
    git branch --sort=committerdate  # ASC

## Git Cherry Pick

    git cherry-pick <commit> --no-commit

## Git Diff

    git diff --stat commit1 commit2
    git diff develop --name-only     // list of different files
    git diff develop --name-status   // and what kind of differences
    git diff develop --stat          // <-  my favorite
    git diff develop --numstat
    git diff develop --shortstat
    git diff develop --compact-summary

## Find

```shell
git-find-file() {
    git rev-list --all --reverse | while read rev; do
        if git ls-tree -r $rev | grep -q $1; then
            echo $rev
            break
        fi
    done
}

git-find-file-all() {
    git rev-list --all --reverse | while read rev; do
        if git ls-tree -r $rev | grep -q $1; then
            echo $rev
        fi
    done
}

git-find-first-sentence() {
    git rev-list --all --reverse | while read rev; do
        if git grep -q "$1" $rev; then
            echo $rev
            break
        fi
    done
}

git-find-all-sentences-reverse() {
    git rev-list --all --reverse | while read rev; do
        if git grep -q "$1" $rev; then
            echo $rev
        fi
    done
}

git-find-last-sentence() {
    git rev-list --all | while read rev; do
        if git grep -q "$1" $rev; then
            echo $rev
            break
        fi
    done
}

git-find-all-sentences() {
    git rev-list --all | while read rev; do
        if git grep -q "$1" $rev; then
            break
        fi
    done
}

```

## Checkout a single file from another branch

    git restore --source <other-branch> -- readMe.md

## Update Index

    git update-index --assume-unchanged

## Git Alias

    git config --global alias.today 'log --since=7am'  // git today

## Show Configration Paths

    git config --list --show-origin                                 // all config files
    git config --list --system --show-origin                        // system config files
    git config --list --show-origin | awk '{print $1}' | uniq       // show locations
    git config --list --local                                       // local config

## Log only current branch

    git log develop..branchNow    // from develop till now
    git log develop..             // same as above
    git cherry -v develop         // short list of commits (I'am at the "branchNow")

## Log pretty only commit hashes and titles and save in a file

    git log --pretty="%h %s" > commits.txt

## Log all modified changes by a certain user

### Short version

```
git log --no-merges --author="authorname" --name-only --pretty=format:"" | sort -u
```

### Long Version

```bash
git log --pretty="%H" --author="authorname" |
    while read commit_hash
    do
        git show --oneline --name-only $commit_hash | tail -n+2
    done | sort | uniq
```

## Git Search Strings in Code

```shell
git log --format="%H" -S"mySearchString"   # give me the commit IDs (last time added)
git --no-pager grep "mySearchString" $(git rev-list --all) # checking
```

## Restore deleted file

First find the commit-id. That can help:

git log --diff-filter=D --summary

Then restore it. Please take notive of `~1` after commit-id

    git checkout commitid~1 .npmrc

You can also create an Alias
[original post](https://stackoverflow.com/questions/953481/find-and-restore-a-deleted-file-in-a-git-repository?rq=1)
(everything in one line):

    git config alias.restore '!f() { git checkout $(git rev-list -n 1 HEAD -- $1)~1 -- $(git diff --name-status $(git rev-list -n 1 HEAD -- $1)~1 | grep '^D' | cut -f 2); }; f'

then use it:

    git restore my_deleted_file

## Create and connect to remote repository

### Remote add & pull

    git remote add origin https://github.com/webia1/vueDb.git   // remote add
    git branch --set-upstream-to=origin/master master           // map origin/master to master (= remote/master)

### Set-upstream & push

    git push --set-upstream origin desired_branch_name
    git push -u origin desired_branch_name

### fatal: refusing to merge unrelated histories

     git pull origin master --allow-unrelated-histories

## Git remove remote config

    git remote -v // list existing
    git remote remove origin // e.g.

## Set autocrlf to false

    git config --global core.autocrlf false

## Store Git Credentials on Mac in Key permanently

    git config --global credential.helper cache
    git config --global credential.helper 'cache --timeout=3600'

## Set MacOs KeyChain as Git credential store

    git config --global credential.helper osxkeychain

## Rename local and remote branch

Local:

    git branch -m old_name new_name
    git branch -m new_name # if current branch

Remote:

    git push origin :old_name new_name # does not work always

you will sometimes get the message: The upstream branch of your current branch does not match the name of your current branch.

    git branch --set-upstream-to=origin/my-new-branch my-new-branch

## Delete local branch

    git branch -d branch_name
    git branch -D branch_name

## Delete remote branch

    git push origin --delete branch_name
    git push origin :branch_name

## stash

    git stash --include-untracked
    git stash pop
    git stash list
    git stash pop stash@{1}

## tag

    git tag -a v0.1.0 -m "My Message" // Message optional
    git push origin <tag>   // or push all tags with the following command:
    git push --tags
    git tag -d <tag>        // Delete Tag Locally
    git push origin :<tag>  // Delete Remote Tag
    git describe --tags --abbrev=0  // show latest tag in current branch
    git diff v10.4.15 v11.0.1 (compare tags)

## Correct last commit

    git commit --amend

## Status

    git status --short // One liners

## Reset/Revert/Checkout/..

    git reset HEAD .
    git reset --hard // go to last commit
    git reset --hard commithash  // change back to a certain commit
    git checkout --force someBranch // local changes are away

## Log (and relevant config settings)

    git log --oneline
    git log --graph
    git log --graph --oneline --decorate
    git log --summary -M90% | grep -e "^ rename"
    git log --follow a-modified-file.txt
    git config diff.renames true  // Rename Detection = true

## Blame

    git blame folder/filename.extension // shows what revision and author last modified each line of a file

## Check Integrity

    git fsck

## Create Branch from Commit Hash

    git branch desired-branch-name commithash

## Merge

    git mergetool --tool-help   // list of merge tools
    git reset --merge  // cancel merge
    git log --merges

### Merge without checkout

    git fetch . dev:master // from dev -> into -> master

### Try merge to see if everything ok, do not commit, do not merge yet:

    git merge develop --no-commit --no-ff
    // Automatic merge went well; stopped before committing as requested

### Test merge without merge with git alias

    See -> https://stackoverflow.com/a/23148424/3025289
    git config --global alias.mergetest '!f(){ git merge --no-commit --no-ff "$1"; git merge --abort; echo "Merge aborted"; };f '
    git mergetest <branch>

### Merge: Abort if conflicts (1)

    git merge --no-commit branch2
    git merge --abort

### Merge: Abort if conflicts (2)

    git format-patch $(git merge-base branch1 branch2)..branch2 --stdout | git apply --check -

### Make a branch master or replace/overwrite master with an old branch

Use the "ours" merge strategy to overwrite master with e.g. develop like this:

    git checkout develop
    git merge -s ours master
    git checkout master
    git merge develop

or easier

    git checkout master
    git merge -s theirs develop

## Statistics

    git shortlog -sn // top list
    git shortlog -sne // with Email Addresses
    git shortlog -sn --no-merges  // top list ohne merges

## Rebase (Merging Commits)

Use VSCode and install GitLens Extension.

### Interactive

Set VSCode as Standard-Editor; With `--wait`, Git will wait until you close the file in VSCode before continuing:

```shell
git config --global core.editor "code --wait"
```

Start interactive Rebase for the last e.g. 10 commits:

```shell
git rebase -i HEAD~10
```

![Interactive rebasing with Gitlens](./assets/git-interactive-rebase.png)

## Bisect

git bisect uses a binary search algorithm to find which commit in your project's
history introduced a bug. You use it by first telling it a "bad" commit that is
known to contain the bug, and a "good" commit that is known to be before the bug
was introduced. Then git bisect picks a commit between those two endpoints and
asks you whether the selected commit is "good" or "bad". It continues narrowing
down the range until it finds the exact commit that introduced the change.

```bash
git bisect start
git bisect bad
git bisect good #commithash
```

the rest is interactive,..

## Miscellaneous

```
git log --oneline
git log --graph
git log --graph --oneline --decorate
git log --summary -M90% | grep -e "^ rename"
git log --follow a-modified-file.txt
git config diff.renames true  // Rename Detection = true
```

## ERRORS & SOLUTIONS

### Trying to push (New Repository) without any commits

If you do so, you will get the following error(s):

    error: src refspec main does not match any
    error: failed to push some refs to

#### Solution: Make a break, you're tired :)

Then add a file, commit and push again. :)

### ⚠ lint-staged prevented an empty git commit.

```shell
 ⚠ lint-staged prevented an empty git commit.
  Use the --allow-empty option to continue, or check your task configuration

husky - pre-commit script failed (code 1)
```

#### Reason

The "empty git commit" error indicates that after the tasks configured in the pre-commit hook (such as linting or formatting by tools like Prettier) have been executed, no changes to the code have been detected that could be included in the commit. This can happen if the changes you are trying to commit are exclusively whitespace or line-ending changes that have been reverted or normalized by the tasks executed in the hook.

If your team uses different operating systems, line ending changes (LF vs CRLF) may actually be the reason for this behavior. Git can automatically convert line endings based on the configuration (core.autocrlf), which can lead to seemingly "empty" commits if the only changes are reverted by tools in the pre-commit hook.

#### Solution

First create a `.gitattributes` file in the root of your repository and add the following line to it:

```shell
* text=auto eol=lf
```

And then run the following commands:

> use **`--allow-empty`** & **`--no-verify`** to bypass the pre-commit hook that is preventing the empty commit and **do so only in exceptional cases** like Windows/Linux/MacOS mixed environments, etc.

```shell
git add .gitattributes
git commit --allow-empty -m "Add .gitattributes file to normalize line endings" --no-verify
```

This will ensure that all text files in your repository are normalized to use LF line endings.

### Your configuration specifies to merge with the <branch name> from the remote, but no such ref was fetched

Reason: Most probably the remote branch has been deleted.

    git config --global --unset-all remote.origin.url
    git fetch

### Git autocomplete on Windows Visual Studio Code integrated Terminal (VSCode/Cygwin/Git/Autocomplete)

#### Install Cygwin and following cygwin packages

    bash-completion
    bash-completion-devel

#### Add VSCode Settings

    "terminal.integrated.shell.windows": "C:\\Cygwin64\\bin\\bash.exe",
    "terminal.integrated.shellArgs.windows": ["/bin/xhere", "/bin/bash"],

#### Copy `.git-completion.bash` into your Cygwin Home

    C:\cygwin64\home\--myuserfolder--\

#### Edit your `.bash_profile` in your cygwin home folder and add

    if [ -e "${HOME}/.git-completion.bash" ] ; then
    source "${HOME}"/.git-completion.bash
    fi

### Git-TFS-Error: RPC failed; HTTP 501 curl 22 The requested URL returned error: 501 Not Implemented

**Problem:**

    Counting objects: 131, done.
    Delta compression using up to 8 threads.
    Compressing objects: 100% (43/43), done.
    error: RPC failed; HTTP 501 curl 22 The requested URL returned error: 501 Not Implemented
    fatal: The remote end hung up unexpectedly
    Writing objects: 100% (131/131), 2.26 MiB | 4.87 MiB/s, done.
    Total 131 (delta 102), reused 103 (delta 76)
    fatal: The remote end hung up unexpectedly
    Everything up-to-date

**Solution:**

At first try a garbage collection:

    git gc --aggressive

Run this command in root folder of git repository

    git config --get http.postBuffer

If it shows nothing, than used default value 1 MiB from [git config man page](http://kernel.org/pub/software/scm/git/docs/v1.7.10.1/git-config.html).

Now set this value

    git config http.postBuffer 524288000

To allow up to the file size 500M
