
# Be Good ( Next Upload CSV -> Create Teams Events)

implementing Microsoft graph api to create events from a csv file.

## Features

- Upload CSV on server
- Compress & Transform CSV to JSON
- Read JSON and use Microsoft Graph API to create Teams Events

## Tech Stack

**Project:** NextJs, Tailwindcss

## Installation

Clone repository
```bash
git clone https://github.com/endricklosange/be-good.git
```

## Configuration

### Client
Add .env.local based on .env in  **client folder** 
```bash
cd ./client
cp .env .env.local
```
Change environment variable
- MICROSOFT_GRAPH_TOKEN=**Token**
- CHANNEL_ID=**Your channel's link**

## Get Started

Install client dependencies

```bash
cd ./client &&
npm install 
```

Go to the root of the project and type the following command to start the client:

```bash
docker-compose up
```

## Documentation

| Informations | values | 
|---|---|
| 1 CSV | can't have more than 1 event |
| 1 JSON | was the compression of all CSVs when uploading  |
| 1 Event | can't be create when they got bad email |

## CSV Format

| Title | Attendees | Location | Start Date ( yyyy-mm-dd hh:mm:ss ) | End Date ( yyyy-mm-dd hh:mm:ss ) | Start Time ( yyyy-mm-dd hh:mm:ss ) | End Time ( yyyy-mm-dd hh:mm:ss ) | Description |
|---|---|---|---|---|---|---|---|
| string; | string, string; | string; | string; | string; | string; | string; | string |

## Contributing

Contributions to this project are welcome. If you find a bug or have a feature request, please create an issue on GitHub. If you'd like to contribute code, please fork the repository and create a pull request with your changes.