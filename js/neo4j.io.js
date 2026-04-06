// This script is designed to work with Neo4j browser editor.
// It will focus on and scroll to the specific editor when the Alt key + Number is pressed..
// @name    Neo4j browser editor Navigator

$(() => {
    let currentEditorIndex = 0;
    const debug = false; // Set to true to enable debug mode
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
        $(errorDiv).fadeOut(5000, () => {
            errorDiv.remove();
        });
    }
    const findInactiveEditorContainers = () => {
        return document.querySelectorAll(
            // ['main-editor', 'frame', 'frame-command'].map(testid => `[data-testid="${testid}"] button`).join(', ')
            '[data-testid="main-editor"] button, [data-testid="frame"] button, [data-testid="frame-command"] button'
            // Below lines are DEPRECATED.
            // keep for reference, in case the above selector stops working due to changes in the Neo4j browser UI.
            // location.host.split('.')[0] === 'console-preview'
            //    ? '[data-testid="frame-command"] button'
            //    : 'label[data-testid="frameCommand"]'
        );
    }
    const move = () => {
        const inactiveEdContainers = findInactiveEditorContainers();
        if (currentEditorIndex >= inactiveEdContainers.length) {
            console.log("Reached the last (bottom) editor, resetting to the first editor.");
            currentEditorIndex = 0;
        }
        console.log("Moving to editor index: " + currentEditorIndex);
        const link = inactiveEdContainers[currentEditorIndex];
        if (!link || debug) {
            const msg = "No link found for the current editor index: " + currentEditorIndex;
            showError(msg);
            console.info(msg);
            return;
        }
        link.scrollIntoView({ behavior: "smooth", block: "center" });
        link.click();
        inactiveEdContainers.forEach(el => {
            el.style.border = "none";
        });
        link.style.border = "2px solid red";
        currentEditorIndex++;
    }
    addEventListener("keyup", e => {
        debug && console.log(e.key);
        if (e.altKey && e.key === 'n') {
            move();
        }
    });
});
