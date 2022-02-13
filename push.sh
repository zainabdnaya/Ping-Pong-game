#!/bin/bash

# get current branch and push
#
current_branch=$(git branch | sed -n -e 's/^\* \(.*\)/\1/p')
case "$branch" in
'('?*')') echo not on any branch ;;
*) echo on branch $branch ;;
esac
#esac statement is to give an expression to evaluate and to execute several different statements based on the value of the expression. The interpreter checks each case against the value of the expression until a match is found. 
#If nothing matches, a default condition will be used.

# git pull
git pull origin "$current_branch"
echo "====pull changes from '$current_branch' branch"

# get the argument message
message="$1"

# If no commit message is passed, use current date time in the commit message
if [[ -z "${message// }" ]]
    then
        message=$(date '+%Y-%m-%d %H:%M:%S')
fi

# stage all changes
git add .
echo "====staged all git files"

# add commit
git commit -m "$message"
echo "====added the commit with message: '$message'"

# git push
git push origin "$current_branch"
echo "====pushed changes to '$current_branch' branch"