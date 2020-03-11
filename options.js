function save_options() {
    var api = document.getElementById('wptk').value;
    chrome.storage.sync.set({
        savedApi: api,
    }, function() {
        var status = document.getElementById('status');
        status.textContent = 'Country saved successfully!';
        setTimeout(function() {
            status.textContent = '';
        }, 25000);
    })
}

document.getElementById('wptk').addEventListener('change', save_options);

function restore_options() {
    chrome.storage.sync.get({
        "savedApi": ''
    }, function(items) {
        document.getElementById('wptk').value = items.savedApi;
    });
}
document.addEventListener('DOMContentLoaded', restore_options);