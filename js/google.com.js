// This script is designed to work with Google search results.
// It will scroll to the next result when the Escape key is pressed.
// It will also highlight the current result with a red border.
// It will reset to the first result when the end of the results is reached.
// @name         Google Search Results Navigator

// [TODO] This work is in progress, it is not yet complete.
$(() => {
    let currentPageIndex = 0;
    const debug = false; // Set to true to enable debug mode
    const buildLinks = (links, selector, el, nestedLevel) => {
        const maxResults = 13;
        const maxNestedLevel = 5;
        nestedLevel = nestedLevel || 0;
        links = links || [];
        selector = el ? selector : '#rso > div';
        $el = el ? $(el) : $(selector);
        if (links.length >= maxResults) {
            return links;
        }
        $el.find('a').each((_, link) => {
            links.push(link);
        });
        $el.siblings('div').map((_, next) => {
            buildLinks(links, selector, next, nestedLevel);
        });
        if (nestedLevel++ < maxNestedLevel) {
            selector = selector + ' > div';
            buildLinks(links, selector, $(selector), nestedLevel);
        }
        return links;
    }
    const showError = (message) => {
        const errorDiv = document.createElement("div");
        errorDiv.style.position = "fixed";
        errorDiv.style.top = "0";
        errorDiv.style.left = "50%";
        errorDiv.style.marginLeft = "-150px";
        errorDiv.style.width = "300px";
        errorDiv.style.backgroundColor = "#f8d7da";
        errorDiv.style.textAlign = "center";
        errorDiv.style.color = "#721c24";
        errorDiv.style.color = "#721c24";
        errorDiv.style.borderRadius = "3px 3px 3px 3px";
        errorDiv.style.border = "1px solid #f5c6cb";
        errorDiv.style.padding = "10px";
        errorDiv.style.zIndex = "1000";
        errorDiv.textContent = message;
        document.body.appendChild(errorDiv);
        // $(errorDiv).fadeOut(5000, () => {
        //     errorDiv.remove();
        // });
    }
    const links = buildLinks();
    const move = () => {
        if (currentPageIndex >= links.length) {
            console.log("Reached the end of the results, resetting to the first page.");
            currentPageIndex = 0;
        }
        console.log("Moving to page index: " + currentPageIndex);
        const link = links[currentPageIndex];
        if (!link || debug) {
            const notFoundError = new Error("No link found for the current page index: " + currentPageIndex);
            showError(notFoundError.message);
            throw notFoundError;
        }
        link.scrollIntoView({ behavior: "smooth", block: "center" });
        link.focus();
        links.forEach(el => {
            el.style.border = "none";
        });
        link.style.border = "2px solid red";
        currentPageIndex++;
    }
    addEventListener("keyup", e => {
        console.log(e.key);
        if (e.key === "Escape") {
            move();
        }
    })
});
