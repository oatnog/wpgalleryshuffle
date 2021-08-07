// Set this to alter milliseconds between changes
const RATE_OF_SHUFFLE = 3000;
//All the possible portrait URLs
const portrait_urls = [
    "https://www.tihcpa.com/wp-content/uploads/TIH-10-500x500.jpg",
    "https://www.tihcpa.com/wp-content/uploads/TIH-1-2-500x500.jpg",
    "https://www.tihcpa.com/wp-content/uploads/TIH-7-500x500.jpg",
    "https://www.tihcpa.com/wp-content/uploads/TIH-6-500x500.jpg",
    "https://www.tihcpa.com/wp-content/uploads/nec_edited-e1562801351368-500x500.jpg",
    "https://www.tihcpa.com/wp-content/uploads/jon_edited-e1562802058489-500x500.jpg",
    "https://www.tihcpa.com/wp-content/uploads/TIH-13-500x500.jpg"
];

// CSS ids used in HTML/Wordpress (advanced block properties)
const portrait_ids = [
    ".first_portrait",
    ".second_portrait",
    ".third_portrait",
    ".fourth_portrait"
];

// what we have on display at the moment--so we don't duplicate later
// dictionary of portrait_id : url
var current_portraits = {};

// Read these from the HTML/CSS to initialize current_portraits
portrait_ids.forEach((port_id) => {
    // console.log("Adding" + port_id);
    current_portraits[port_id] = document
        .querySelector(port_id)
        .getElementsByTagName("img")[0]
        .getAttribute("src");
});

// These are portraits not currently displayed. Initialize it here, then update in swapPortrait()
var new_portrait_urls = portrait_urls.filter(
    (url) =>
        !Object.keys(current_portraits)
            .map(function (key) {
                return current_portraits[key];
            })
            .includes(url)
);

function swapPortrait() {
    // old_portrait = ".first_portrait";
    old_portrait = portrait_ids[Math.floor(Math.random() * portrait_ids.length)];

    new_portrait_index = Math.floor(Math.random() * new_portrait_urls.length);
    document
        .querySelector(old_portrait)
        .getElementsByTagName("img")[0]
        .setAttribute("src", new_portrait_urls[new_portrait_index]);
    // update current list of displayed portraits
    current_portraits[old_portrait] = new_portrait_urls[new_portrait_index];

    new_portrait_urls = portrait_urls.filter(
        (url) =>
            !Object.keys(current_portraits)
                .map(function (key) {
                    return current_portraits[key];
                })
                .includes(url)
    );
}

// Finally do something! Every x milliseconds.
window.setInterval(swapPortrait, RATE_OF_SHUFFLE);