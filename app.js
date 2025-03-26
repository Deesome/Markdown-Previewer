import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";


marked.setOptions({
    async: true,
    breaks: true, // Convert line breaks to <br>
    gfm: true, // Enable GitHub Flavored Markdown
    highlight: function (code, language) {
        // Syntax highlighting for code blocks
        if (language && hljs.getLanguage(language)) {
            try {
                return hljs.highlight(code, { language: language }).value;
            } catch (err) {
                console.error(err);
                return code;
            }
        }
        return hljs.highlightAuto(code).value;
    },
});

const inputElement = document.getElementById("input")
const outputElement = document.getElementById("output")
const resetBtn = document.querySelector(".reset-btn")
const copyBtn = document.querySelector(".copy-btn")

inputElement.addEventListener("input", function () {
    const inputValue = this.value
    convertToMarkDown(inputValue)
})


async function convertToMarkDown(input) {
    try {
        const markdown = await marked.parse(input, { async: true })

        outputElement.innerHTML = markdown

        // Get all the code blocks and highlight them
        document.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightElement(block);
        });
    } catch (error) {
        console.log(error)
        outputElement.innerHTML = `<p>Error occurs while converting the file`

    }

   

}

function handleReset(){
    inputElement.value = ""
    outputElement.innerHTML = ""
 }

 function handleCopy(){
    if(!outputElement.innerText){
        alert("No text present for copy")
    }
    const valueToBeCopied = outputElement.innerText
    navigator.clipboard.writeText(valueToBeCopied)
    .then(()=>{
        alert("copy to clipBoard")
    })
    .catch((err)=>{
        alert("Falied to copy Text",err)
    })
    
    
 }




resetBtn.addEventListener("click",handleReset)
copyBtn.addEventListener("click",handleCopy)


