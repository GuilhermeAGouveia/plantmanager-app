> Why do I have a folder named ".expo" in my project?

The ".expo" folder is created when an Expo project is started using "expo start" command.

> What does the "packager-info.json" file contain?

The "packager-info.json" file contains port numbers and process PIDs that are used to serve the application to the mobile device/simulator.

> What does the "settings.json" file contain?

The "settings.json" file contains the server configuration that is used to serve the application manifest.

> Should I commit the ".expo" folder?

No, you should not share the ".expo" folder. It does not contain any information that is relevant for other developers working on the project, it is specific to your machine.

Upon project creation, the ".expo" folder is already added to your ".gitignore" file.

#GETTING STARTED

O arquivo json src/services/server.json é uma forma de simulação em ambiente de desenvolvimento para uma API REST, para iniciar essa simulação instale o utilitário json-server de maneira global utilizando um gerenciador de pacote como npm ou yarn, Exemplo npm: npm i -g json-server. Para iniciar a API, dentro do diretório src/services, execute: json-server --host <IP-HOST> --port <PORT-HOST> server.json

Outra coisa a se considerar é o server especificado no cliente REST (axios) usado no projeto, que fica em src/services/api.ts, lembre-se de alterar o IP do server ou apenas subtituí-lo por "localhost" em caso de testes restritamente locais.