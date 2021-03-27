# show-code-examples

Module to view source code in a full screen modal. Suited for html presentations.

- Uses [highlight.js](https://www.npmjs.com/package/highlight.js) to annotate the code.
- Detects source code language by file extension
- Caches source code downloads

## Design decisions

I created slides with reveal.js, and I needed a way to **open examples in full screen mode**, but also be able to **download the source of the files**, without leaving the presentation.

My main motivation was to use minimal boilerplate code, that I can copy without modifications.

```md
- [Examples](./examples/1/hello.sh){onclick="codeExamples.open(event, this)"} {.examples}
```

My initial solution added this Javascript code in a `<script>` to the markdown source file.
At first I only needed to use it in one presentation, but I plan on using it in more presentations later on.

## Getting started

```bash
# open the example
npm install
npm run example
open localhost:8080/example
```

## How to use

- Reference a `highlight.js` theme in your page e.g:

  ```html
  <link rel="stylesheet" href="highlight.js/styles/monokai.css" />
  ```

- Load the code in your page

  ```html
  <script src="/dist/show-code-examples.min.js" type="text/javascript"></script>
  ```

- Optional: Set the parent container for the modal: `codeExamples.initialize("my-examples-modal")`
- Create a link to load up the modal. This boilderplate is necessary: `codeExamples.open(event, this)`

  ```html
  <a
    href="code/hello-bash.sh"
    target="_blank"
    rel="noopener noreferrer"
    onclick="codeExamples.open(event, this)"
  >
    Bash code example
  </a>
  ```

## Development

1. Clone the repo
1. Run `npm install`
1. Run `npm run build`
1. Run the example `npm run example`

See [index.html](/example/index.html) for a full example.
