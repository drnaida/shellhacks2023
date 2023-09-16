# shellhacks2023 🐚🖥️ 🤖

Project to revolutionize educational examinations. 📝 😄

## Formating Git 🙀

### For branches:

    issue/{issue #}-{short description}.

    Example: issue/1-setup-backend

**NOTE**: Use dashes no spaces

### For commits:

    {type of change}: {description}. 
    
    Example:feat: student can submit

Types of changes:

- *feat* -> add a new feature
- *refactor* -> change something not visible for users
- *fix* -> fixed something that already existed

### Pull requests template:

    Closes #{issue #}

    Added:

    - {Bullet points of what was done}

## Updating Database 💾

Once data context has been modified, open a terminal on the root of the project and run the following:

    > dotnet ef migrations add {descriptive short name for changes}

If the above succeed then run

    > dotnet ef database update