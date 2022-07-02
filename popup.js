

async function getPaas() {
    const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const getParameterByName = (e, t) => {
        e = e.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var n = new RegExp("[\\?&]" + e + "=([^&#]*)"),
            r = n.exec(t == true ? location.hash.replace("#", "?") : location.search);
        if (r == null && t == false) {
            return getParameterByName(e, true);
        } else {
            return r == null ? "" : decodeURIComponent(r[1].replace(/\+/g, " "));
        }
    }
    let keyword = getParameterByName("q", false);
    for (let i = 0; i < 4; i++) {
        document.querySelectorAll('div[data-q]').forEach((e) => {
            e.querySelectorAll('div[data-ved]').forEach((eved) => {
                eved.click()
            });
        });
        await sleep(3000);
    }

    let results = []
    let titles = []
    let links = []
    let descriptions = []
    document.querySelectorAll('div[data-q]').forEach((e) => {
        results.push(e.dataset.q)
        e.querySelectorAll('h3').forEach((e) => {
            titles.push(e.innerText.replace(/,/g,'##'))
        });
        e.querySelectorAll('a').forEach((e) => {
            const url = e.href
            let domain = (new URL(url));
            if(!domain.hostname.includes('google')){
                links.push(url)
            }
                
        });
        e.querySelectorAll('span').forEach((e) => {
            descriptions.push(e.innerText.replace(/,/g,'##'))
        });
    });



    const p = new Promise((resolve, reject) => {
        resolve({keyword,results, titles, descriptions,links})
    });
    return p
}


btnGetPaas.addEventListener("click", async () => {
    console.log("btnGetPaas click")
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: getPaas,
    },
        (injectionResults) => {

            results.value = ""
            titles.value = ""
            descriptions.value = ""
            links.value = ""

            const keyword = String(injectionResults[0].result.keyword)
            const lines_results = String(injectionResults[0].result.results)
            const lines_titles = String(injectionResults[0].result.titles)
            const lines_descriptions = String(injectionResults[0].result.descriptions)
            const lines_links = String(injectionResults[0].result.links)
            
            title_keyword.innerText = keyword
            
            let s = ""
            for (const l of lines_results.split(',')) {
                s += l.replace(/##/g,',') + '\r\n'
            }
            results.value = s
            
            s = ""
            for (const l of lines_titles.split(',')) {
                s += l.replace(/##/g,',') + '\r\n'
            }
            titles.value = s
            
            s = ""
            for (const l of lines_descriptions.split(',')) {
                s += l.replace(/##/g,',') + '\r\n'
            }
            descriptions.value = s

            s = ""
            for (const l of lines_links.split(',')) {
                s += l + '\r\n'
            }
            links.value = s
        });
});

