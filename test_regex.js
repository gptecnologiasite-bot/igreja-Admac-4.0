
const getYouTubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
};

const urls = [
  "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  "https://youtu.be/dQw4w9WgXcQ",
  "https://www.youtube.com/embed/dQw4w9WgXcQ",
  "https://m.youtube.com/watch?v=dQw4w9WgXcQ",
  "https://youtube.com/watch?v=dQw4w9WgXcQ&feature=share",
  "https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=12s"
];

urls.forEach(url => {
  console.log(`${url} -> ${getYouTubeId(url)}`);
});
