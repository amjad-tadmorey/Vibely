// Simple React app: Display a built-in image and share it to Instagram Story (mobile-compatible)
import React from "react";

function App() {
    const imageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Example.jpg/800px-Example.jpg";


    const handleShare = async () => {
        try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const file = new File([blob], "story-image.jpg", { type: blob.type });

            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                await navigator.share({
                    files: [file],
                    title: "Instagram Story",
                    text: "Check out this review!",
                });
            } else {
                alert("Sharing not supported on this device. Please share manually.");
            }
        } catch (error) {
            console.error("Error sharing image:", error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-4 bg-gray-100">
            <h1 className="text-2xl font-bold">Share to Instagram Story</h1>

            <img
                src={imageUrl}
                alt="Preview"
                className="w-64 h-64 object-cover rounded-lg shadow-lg"
            />

            <button
                onClick={handleShare}
                className="px-6 py-2 text-white bg-purple-600 rounded shadow hover:bg-purple-700"
            >
                Share to Instagram Story
            </button>
        </div>
    );
}

export default App;
