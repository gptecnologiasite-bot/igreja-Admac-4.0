
// Mock dbService
const dbService = {
    getPageBySlug: (slug) => {
        if (slug === 'inicio') {
            return {
                content: JSON.stringify({
                    media: {
                        featuredVideo: { title: 'Home Featured', videoUrl: 'http://home.com' }
                    }
                })
            };
        }
        if (slug === 'midia') {
            return {
                content: JSON.stringify({
                    gallery: [
                        { title: 'Recent Video 1', url: 'http://v1.com' },
                        { title: 'Recent Video 2', url: 'http://v2.com' },
                        { title: 'Recent Video 3', url: 'http://v3.com' }
                    ]
                })
            };
        }
        return null;
    }
};

// Simulation Logic
let mediaData = {};
let latestVideos = [];

const loadMedia = () => {
    try {
        console.log("Loading 'inicio' page...");
        const page = dbService.getPageBySlug('inicio');
        if (page && page.content) {
            const content = typeof page.content === 'string' ? JSON.parse(page.content) : page.content;
            if (content.media) {
                mediaData = content.media;
                console.log("Loaded Home Media:", mediaData);
            }
        }

        console.log("Loading 'midia' page...");
        const mediaPage = dbService.getPageBySlug('midia');
        if (mediaPage && mediaPage.content) {
            const mediaContent = typeof mediaPage.content === 'string' ? JSON.parse(mediaPage.content) : mediaPage.content;
                // Simulate the new logic: take last 2 and reverse
                // Simulate the new logic: take last 2 and reverse
                latestVideos = mediaContent.gallery.slice(-2).reverse();
                console.log("Loaded Latest Videos (Slice -2 Reversed):", latestVideos);
        }
    } catch (err) {
        console.error("Error loading 'midia' gallery:", err);
    }
};

loadMedia();

// Expect Video 3 (newest) then Video 2
if (latestVideos.length === 2 && latestVideos[0].title === 'Recent Video 3' && latestVideos[1].title === 'Recent Video 2') {
    console.log("\nSUCCESS: Logic verified correctly (Newest First).");
} else {
    console.log("\nFAILURE: Logic failed.");
}
