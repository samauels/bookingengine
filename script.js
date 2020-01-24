function getSyncScriptParams(id) {
    var scripts = document.getElementById(id);
    return {
        housingid: scripts.getAttribute('data-housingid')
    };
}
const {
    housingid: ibe_housingid
} = getSyncScriptParams('ibe-script')