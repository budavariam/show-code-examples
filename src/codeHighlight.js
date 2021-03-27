import React from "react"
import { highlightAuto, getLanguage } from "highlight.js"

const CodeHighlight = ({ language, code }) => {
    const languageSubset = getLanguage(language)
        ? [language]
        : null
    const highlightResult = highlightAuto(code, languageSubset)
    return (
        <code
            className="hljs"
            dangerouslySetInnerHTML={{ __html: highlightResult.value }}
        />
    )
}
export default CodeHighlight