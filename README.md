# shellhacks2023 🐚🖥️ 🤖

Project to revolutionize educational examinations. 📝 😄

## Technologies
Backend: C#, ASP.Net, CockRoachDB

Frontend: TypeScript, JavaScript, React.js, Tailwind

Infrastructure: Docker

## Formating Git 🙀

Install the Editor Config plugin for VSCode/VS/whichever editor you are using. This will ensure line-endings and indentations are formatted correctly when saving.

### For branches:

    issue/{issue #}-{short description}.

    Example: issue/1-setup-backend

**NOTE**: Use dashes no spaces

### For commits:

    {type of change}: {description}. 
    
    Example:feat: student can submit

Types of changes:

- `feat` -> add a new feature
- `refactor` -> change something not visible for users
- `fix` -> fixed something that already existed
- `infra` -> Infrastructure setups

### Pull requests template:

    Closes #{issue #}

    Added:

    - {Bullet points of what was done}

## Updating Database 💾

Once data context has been modified, open a terminal on the root of the project and run the following:

    > dotnet ef migrations add {descriptive short name for changes}

If the above succeed then run

    > dotnet ef database update

## Get Started 

### Requirements

- Visual Studio 2022
- .NET 6 / ASP.NET 6 Workload
- Yarn
- Node

### Local Development Frontend

1. Install prerequirements from the root of repository:

    `yarn run i`

2. Run code locally:
    
    `yarn start-local --no-cache`

### Local Development Backend

1. Run the project solution in the Visual Studio

2. To describe the structure of API for Frontend (while local server in Visual Studio is turned off):

    `yarn run nswag run /runtime:Net60`

## How to deploy 🚀

Deploy frontend and backend separately.

### Backend

Already has Dockerfile, therefore only thing to do is to deploy it on railway. Login into railway (for now only `Alvaro's` account):

    railway login

Then deploy using

    railway up

It's that simple. If it says it has no linked project then just run:

    railway link

And then select shellhacks2023

### Frontend

First make sure the server url is the deployed server, it should be a railway.app link. Localhost is for development only not production.

CD into the client folder and run:

    yarn run build-prod

This command will create a `dist` folder (or update it). To deploy it login into netlify (for now Alvaro's account). Select deploys and drag and drop the `dist` folder and it will deploy.
