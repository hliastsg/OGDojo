# Dojo API

In order to execute this application, how have to set up a local MongoDB Database.

~Create an uploads folder in Dojo/api

~Go to -> server/api/event and update path to you local uploads path:
`path.join(
            "/*your local path*/OGDojo/Dojo/api/uploads/"
          )
`

~Development
1. `cd Dojo/api`
2. `npm i`

~Split terminal, excecute the below at the same time

3. `npm run dev:start`
4. `npm run dev:watch`
