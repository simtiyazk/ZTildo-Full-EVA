# Veeva Visual Composer


## Setup
### Visual composer
```
cd composer
nvm use
yarn install
```
### Backend API
```
cd composer/API
yarn install
```
### Veeva presentation
```
cd presentation
nvm use
npm install
```


## Create or edit a presentation
### Visual Composer
```
cd composer
yarn dev
```
### Veeva presentation
```
cd presentation
nvm use
gulp boilerplate
gulp build
gulp serve
```

## Delete all presentations
### Backend API
```
cd composer/API
yarn empty-db
```
### Veeva presentation
```
cd presentation
nvm use
gulp clear
```
  ** Also delete the presentation folders under presentation/src/