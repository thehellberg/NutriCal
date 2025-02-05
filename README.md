<p align="center"><img src="/apps/nutrical/assets/logo.png" width="230" alt="NutriCal Logo"></p>

# <img src="/apps/nutrical/assets/icon.png" width="45" alt="NutriCal Logo"> NutriCal - Calorie Tracker

Welcome, this project is under active development, feel free to open issues and pull request.

This app is built as an open-source Calorie-tracker. Similar to apps like Lifesum, MyFitnessPal and MacroFactor

## Installation

0. Use a postgres db, existing or new both should work fine, you can get a free one using vercel.
1. Clone Repo
2. Change set .env file in /apps/backend with POSTGRES DB credentials
3. Install Yarn
4. Run `yarn workspace backend dev` to run the express server
5. Build the app to iOS or Android with Expo, the easiest way to do this is by using the workflows in the repository. Make sure to set the env variable to the express server address. This step will not be necessary soon :tm:

### Docker

A docker image will be introduced later

## TO-DO:

- [ ] General Enchancements

  - [ ] UX Enhancements
  - [ ] Replace SWR with @nandorojo/swr-react-native
  - [x] Typescript
  - [x] Configure to use Storage Context
  - [x] Update workflows
  - [x] Better auth management (lucia based)
  - [x] Cache into expo-storage instead of async
  - [x] Replace old API
  - [x] Drizzle
  - [ ] Dark mode
  - [ ] Email verification
  - [ ] Set up docs
  - [x] Write DB schema
    - [x] Users
    - [ ] Devices
    - [ ] Roles
    - [ ] Accounts (Strava, fitbit)
    - [ ] Data Sources
    - [x] Recipes
    - [x] Meals (language, verified)
    - [x] Programs
    - [ ] Sources must be many to one
  - [ ] Logs (steps, water intake, etc..)
  - [ ] Healthkit integration (@kingstinct/react-native-healthkit)
  - [ ] Health Connect Integration (react-native-health-connect)
  - [ ] Replace profile picture placeholder
  - [ ] Docker
  - [ ] Blurhash for images
  - [ ] Support for multiple programs
  - [ ] Replace legacy icons with Lucide
  - [ ] Date-fns
  - [ ] Server URL in start page
  - [ ] First Time Setup

- [x] Home Page

  - [ ] Add functionality to first card
  - [ ] Add more cards
  - [ ] Change placeholder Date
  - [ ] Fix First card text and number
  - [ ] Add card number and position indicator (...) [The one below the cards in other designs]
  - [ ] Add functionality to water card
  - [ ] Change dashboard icon

- [x] Programs

  - [x] Basic Layout
  - [x] Basic functionality (Load Program Templates)
  - [x] Individual Program View
  - [ ] Custom program creation
  - [ ] Repeating cycles
  - [ ] Test to discover program preference
  - [ ] Set Filter to featured only in featured section
  - [ ] Check if modal works on Android

- [x] Meals

  - [x] Individual Recipe View
  - [x] Create an add button
  - [ ] Add an Add Recipes button top right
  - [ ] Add "Add Button Functionality
  - [ ] Allow for adjusting serving size and add options
  - [ ] Add Base Measurement (Serving, Tbsp, fruit), Base Amount w/ unit
  - [ ] Add Individual Meal View
  - [ ] Meal Photo Upload

- [ ] Sources Button in Account

  - [ ] OpenFoodFacts Source
  - [ ] MyNetDiary
  - [ ] Lifesum
  - [ ] USDA
  - [ ] UK Food DB
  - [ ] Swedish
  - [ ] Support For translations

- [ ] Accounts Page

  - [x] Personal Details page
    - [x] Dropdown Menu
    - [x] Save Button
  - [ ] Dietary Prefrences page
    - [ ] Food Preference (Vegan, Vegetarian)
    - [ ] Allergies
  - [ ] Dietary needs adjustment
  - [ ] Calorie and Macronutrient Adjustment

- [ ] Swipe to reload everywhere
- [ ] Thumbhash
- [ ] Version the API
- [ ] Collapse page title into header
