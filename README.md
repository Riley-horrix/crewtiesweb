# Documentation

This repository is for the CrewTies webpage, designed to advertise the company, as well as provide a SaaS tool to create webbing designs within the browser, CrewTies Design©.

## Testing

To run the entire test suite, use,
```make
make test 
```

## Building
To create a production build,

```make
make build
```

## Developing

To run the developmenet server, 

```make
make server
```

This creates a server on [http://localhost:3000](http://localhost:3000), browse there to see the page.

## Commiting 

The project uses the [Conventional Commit](https://www.conventionalcommits.org/en/v1.0.0/#specification) framework for commit messages. This is to ensure consistency and strive for more organized commits. For example :
```
feat(homepage): Started css styling process on homepage.

fix(design): Fixed issue of being unable to save artwork in design tool.
```
