import React from "react"
import { highlight } from "highlight.js"

function compiletext(language, text) {
    const options = { language, ignoreIllegals: true }
    const result = highlight(text, options); // use the same highlight as the revealjs module

    ////////// MARKDOWNIT
    // var md = window.markdownit();
    // var result = md.render("```bash\n" + text + "\n```");
    //////////
    return result.value
}

const CodeHighlight = ({ language, code }) => {
    return (
        <code
            className={`hljs language-${language}`}
            dangerouslySetInnerHTML={{ __html: compiletext(language, code) }}
        />
    )
}
export default CodeHighlight