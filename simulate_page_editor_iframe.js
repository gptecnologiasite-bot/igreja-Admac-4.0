
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

let mediaPageContent = {
    gallery: [
        {
            id: 1,
            title: 'Novo Vídeo',
            url: '',
            thumbnail: 'https://images.unsplash.com/photo-1516280440614-6697288d5d38'
        }
    ]
};

const simulateChange = (index, inputValue) => {
    console.log(`Original URL: ${mediaPageContent.gallery[index].url}`);
    
    let newUrl = inputValue;
    // Check if it's an iframe code
    newUrl = extractUrlFromIframe(newUrl);
    console.log(`Extracted URL: ${newUrl}`);

    const newGallery = [...mediaPageContent.gallery];
    newGallery[index] = { ...newGallery[index], url: newUrl };
    
    // Auto-generate thumbnail
    const videoId = getYouTubeId(newUrl);
    if (videoId) {
        newGallery[index].thumbnail = getYouTubeThumbnail(videoId);
        console.log(`Matched ID: ${videoId}`);
    } else {
        console.log("No YouTube ID matched");
    }

    mediaPageContent = { ...mediaPageContent, gallery: newGallery };

    console.log(`New Thumbnail: ${mediaPageContent.gallery[index].thumbnail}`);
};

// Test Case 3: Paste an iframe code
console.log("\n--- Test Case 3: Iframe Code ---");
const iframeCode = '<iframe width="560" height="315" src="https://www.youtube.com/embed/WPK4mDhKGx8?si=lu3yACLRhl6Yi9i8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>';
simulateChange(0, iframeCode);
