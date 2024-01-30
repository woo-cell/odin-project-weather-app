# webpack-vanilla-js-template
webpack html css js eslinter prettier template


```
npm install webpack webpack-cli --save-dev
```

```
npm install webpack-merge --save-dev
```

```
npm install eslint --save-dev
```

```
./node_modules/.bin/eslint --init
```

add this to vscode workspace json config file
```
{
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    },
    "eslint.validate": ["javascript"]
}
```

```
npm install --save-dev --save-exact prettier
```

```
node --eval "fs.writeFileSync('.prettierrc','{}\n')"
```

```
npm install --save-dev eslint-config-prettier
```


or just use npm install