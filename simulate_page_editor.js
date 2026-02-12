
const getYouTubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
};

const getYouTubeThumbnail = (id) => {
    return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
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

const simulateChange = (index, newUrl) => {
    console.log(`Original URL: ${mediaPageContent.gallery[index].url}`);
    console.log(`Original Thumbnail: ${mediaPageContent.gallery[index].thumbnail}`);

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

    console.log(`New URL: ${mediaPageContent.gallery[index].url}`);
    console.log(`New Thumbnail: ${mediaPageContent.gallery[index].thumbnail}`);
};

// Test Case 1: Paste a valid YouTube URL
console.log("--- Test Case 1 ---");
simulateChange(0, "https://www.youtube.com/watch?v=dQw4w9WgXcQ");

// Test Case 2: Paste an invalid URL
console.log("\n--- Test Case 2 ---");
simulateChange(0, "https://example.com/video");
