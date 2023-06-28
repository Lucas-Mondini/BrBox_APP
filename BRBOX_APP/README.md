## REACT NATIVE APP - BRBOX

### BUILD

A geração de um novo apk pode ser feita atrvés dos seguintes passos:

- Instalar as dependências do projeto com ```npm install```

- Rodar ```react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res``` na pasta raiz.

- Ir para a pasta *android* ```cd android```
 
- Na pasta android rodar o comando ```./gradlew assembleDebug```

- O build pode ser encontrado em */android/app/build/outputs/apk/debug/app-debug.apk*

