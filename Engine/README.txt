Usage:
After adding a file ->
    1. Add it to binding.gyp under sources

After writing the code ->
    1. Compile with "node-gyp build"
    2. Run with node index.js //main folder subject to change

Common problems:
LNK error ->
    Windows: 
        1. Run ./rebuild.ps1
    Other systems:
        1. Delete build folder
        2. Run node-gyp configure
        3. Run node-gyp build

npm rebuild