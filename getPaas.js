
var sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

var getParameterByName = (e, t) => {
    e = e.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var n = new RegExp("[\\?&]" + e + "=([^&#]*)"),
        r = n.exec(t == true ? location.hash.replace("#", "?") : location.search);
    if (r == null && t == false) {
        return getParameterByName(e, true);
    } else {
        return r == null ? "" : decodeURIComponent(r[1].replace(/\+/g, " "));
    }
}
const paas = {keyword,paas: []};





(() => {
    
    const r = (async () => {
        for (let i = 0; i < 2; i++) {
            document.querySelectorAll('div[data-q]').forEach((e) => {
                e.querySelectorAll('div[data-ved]').forEach((eved) => {
                    eved.click()
                });
            });
            await sleep(4000);
        }

        let keyword = getParameterByName("q", false);
        
        document.querySelectorAll('div[data-q]').forEach((e) => {
            console.log(e.dataset.q)
            paas.pass.push(e.dataset.q)
        });
        return paas
    })();

    return r;
})();