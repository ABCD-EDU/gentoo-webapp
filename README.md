# gentoo-webapp

## Github Repositories for the application's backend microservices:
https://github.com/ABCD-EDU/hate-speech-backend

https://github.com/ABCD-EDU/gentoo-admin

https://github.com/ABCD-EDU/gentoo-posts

https://github.com/ABCD-EDU/gentoo-users

https://github.com/ABCD-EDU/gentoo-socialgraph

It is recommended that the repositories be cloned in a single directory, including this repostiory, with the following file structure:

```bash
/directory
  - /hate-speech-model
  - /gentoo-admin
  - /gentoo-posts
  - /gentoo-users
  - /gentoo-socialgraph
  - /gentoo-webapp
  - run.bat
```

Where run.bat contains the following script:

```bash
cd gentoo-users
start go build && start go run main.go
cd..
cd gentoo-posts
start go build && start go run main.go
cd..
cd gentoo-socialgraph
start go build && start go run main.go
cd..
cd hate-speech-backend
start python -m uvicorn main:app --reload --port 8010
cd..
cd gentoo-admin/src
start python main.py
cd..
cd..
cd gentoo-webapp
npm run dev
```

Make sure to install the python package requirements for gentoo-admin and hate-speech-backend before running the run script.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

