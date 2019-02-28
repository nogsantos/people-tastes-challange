# People Tastes

[![CircleCI](https://circleci.com/gh/nogsantos/people-tastes-challange.svg?style=svg)](https://circleci.com/gh/nogsantos/people-tastes-challange)

by Fabricio Nogueira - [nogsantos@gmail.com](https://fabricionogueira.me)

## What

Discover the tastes of people on these subjects:

- Star wars
- Beers

## Setup

Project requirements

<table>
    <tbody>
        <tr>
            <th>Tool</th>
            <th>Min. Version</th>
            <th>Environment</th>
        </tr>
        <tr>
            <td>Node</td>
            <td>>= 10.x</td>
            <td>Dev</td>
        </tr>
        <tr>
            <td>Npm</td>
            <td>>= 5.x</td>
            <td>Dev</td>
        </tr>
        <tr>
            <td>Docker</td>
            <td>latest</td>
            <td>Prod</td>
        </tr>
        <tr>
            <td>docker-compose</td>
            <td>>= 1.23.1</td>
            <td>Prod</td>
        </tr>
    </tbody>
</table>

Install project dependencies

```bash
$ npm i
```

### Development run at [localhost:3001](http://localhost:3001/)

> #### Premisses
>
> The port `3001` will be used to start the servers, they can not be in use for another process at the moment.

```bash
$ npm start
```

### Build for Production

> #### Premisses
>
> The port `80` will be used to start the servers, they can not be in use for another process at the moment.

First build the project

```bash
$ npm run build
```

This project has a docker file with a nginx container.

To start the container

```bash
$ docker-compose up -d
```

To turn off the container

```bash
$ docker-compose down
```

## Project stacks

<table>
	<thead>
		<tr>
			<th>Stack</th>
			<th>Purpose</th>
		</tr>
	</thead>
  	<tbody>
		<tr>
			<td>React</td>
			<td>Javascript Lib</td>
		</tr>
		<tr>
			<td>Material UI</td>
			<td>Javascript Visual UI</td>
		</tr>
		<tr>
			<td>Axios</td>
			<td>Requests</td>
		</tr>
		<tr>
			<td>Dexie</td>
			<td>Local db</td>
		</tr>
		<tr>
			<td>Pubsub JS</td>
			<td>Messages publications</td>
		</tr>
		<tr>
			<td>Jest with react test library</td>
			<td>Tests</td>
		</tr>
	</tbody>
</table>
