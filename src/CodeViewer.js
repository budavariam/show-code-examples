
import React from "react"

let cache = {}
console.log("cca")

function compiletext(text) {
  var result = hljs.highlight("bash", text).value; // use the same highlight as the revealjs module

  ////////// MARKDOWNIT
  // var md = window.markdownit();
  // var result = md.render("```bash\n" + text + "\n```");
  //////////
  return result
}

function showtext(url, text) {
  try {
    /////// Highlightjs assume bash
    var pre = document.createElement("pre")
    var code = document.createElement("code")
    code.classList.add("language-bash")
    code.classList.add("hljs") // have the same background as in the theme
    code.innerHTML = text
    pre.appendChild(code)
    ///////
    var domnode = document.createElement("div");
    domnode.classList.add("modal")
    domnode.classList.add("hljs")
    domnode.ondblclick = function() {domnode.remove()} // remove on click
    var sourcefile = document.createElement("a")
    sourcefile.classList.add("modal-top")
    sourcefile.classList.add("hljs-comment")
    sourcefile.setAttribute("href", url)
    sourcefile.setAttribute("target", "_blank")
    sourcefile.innerText = url
    var info = document.createElement("div")
    info.classList.add("modal-bottom")
    info.classList.add("hljs-comment")
    info.innerText = "... Double-Click to close ..."
    domnode.appendChild(sourcefile)
    domnode.appendChild(pre)
    domnode.appendChild(info)
    document.body.appendChild(domnode) // add to the bottom of the page over everything
  } catch (err) {
    console.error("Failed to parse", err)
  }
}

export function CodeViewer(url) {
  console.log("Opened code viewer", url)
  if (url in cache) {
    showtext(url, cache[url])
  } else {
    fetch(url)
      .then(response => response.text())
      .then(text => {
        const result = compiletext(text)
        cache[url] = result;
        return result;
      })
      .then(result => showtext(url, result))
      .catch(data => {
        console.error(data);
      });
  }
  return false;
}
