
const getYouTubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
};

const getYouTubeThumbnail = (id) => {
    return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
};

const extractUrlFromIframe = (input) => {
    if (!input) return input;
    if (input.trim().startsWith('<iframe')) {
        const match = input.match(/src="([^"]+)"/);
        return match ? match[1] : input;
    }
    return input;
};

let homeMedia = {
    featuredVideo: {
        title: 'Original Title',
        videoUrl: '',
        image: ''
    }
};

const simulateHomeMediaChange = (inputValue) => {
    console.log(`Original Video URL: ${homeMedia.featuredVideo.videoUrl}`);
    console.log(`Original Image: ${homeMedia.featuredVideo.image}`);

    let newUrl = inputValue;
    // Check if it's an iframe code
    newUrl = extractUrlFromIframe(newUrl);
    console.log(`Extracted URL: ${newUrl}`);

    const newFeatured = { ...homeMedia.featuredVideo, videoUrl: newUrl };

    // Auto-generate thumbnail for Home Featured Video
    const videoId = getYouTubeId(newUrl);
    if (videoId) {
        newFeatured.image = getYouTubeThumbnail(videoId);
        console.log(`Matched ID: ${videoId}`);
    } else {
        console.log("No YouTube ID matched");
    }

    homeMedia = { ...homeMedia, featuredVideo: newFeatured };

    console.log(`New Video URL: ${homeMedia.featuredVideo.videoUrl}`);
    console.log(`New Image: ${homeMedia.featuredVideo.image}`);
};

// Test Case 4: Home Media Iframe
console.log("\n--- Test Case 4: Home Media Iframe ---");
const iframeCode = '<iframe width="560" height="315" src="https://www.youtube.com/embed/WPK4mDhKGx8?si=lu3yACLRhl6Yi9i8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>';
simulateHomeMediaChange(iframeCode);
