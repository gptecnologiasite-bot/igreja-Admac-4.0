
const extractUrlFromIframe = (input) => {
    if (!input) return input;
    if (input.trim().startsWith('<iframe')) {
        const match = input.match(/src="([^"]+)"/);
        return match ? match[1] : input;
    }
    return input;
};

// Original regex for reference
const getYouTubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
};

const input = '<iframe width="560" height="315" src="https://www.youtube.com/embed/WPK4mDhKGx8?si=lu3yACLRhl6Yi9i8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>';

const extractedUrl = extractUrlFromIframe(input);
console.log(`Input: ${input}`);
console.log(`Extracted URL: ${extractedUrl}`);
console.log(`Extracted ID: ${getYouTubeId(extractedUrl)}`);
