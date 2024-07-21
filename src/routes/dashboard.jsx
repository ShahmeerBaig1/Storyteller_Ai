import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';

const StoryPage = () => {
  const [input, setInput] = useState('');
  const [story, setStory] = useState('');
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [utterance, setUtterance] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('https://storyteller-flask.onrender.com/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: input }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      if (data.error) {
        setError(data.error);
        setTitle('');
        setStory('');
      } else {
        setTitle(data.title);
        setStory(data.story);
        setError('');
      }
    } catch (error) {
      console.error('Error fetching story:', error);
      setError('An error occurred while generating the story.');
      setTitle('');
      setStory('');
    } finally {
      setLoading(false);
    }
  };

  const handlePlayPauseAudio = () => {
    if (isPlaying) {
      window.speechSynthesis.pause();
      setIsPlaying(false);
    } else {
      if (!story) {
        console.error('No story text available for playback.');
        return; // Prevent playback if story is empty
      }
  
      const newUtterance = new SpeechSynthesisUtterance(story);
      newUtterance.lang = 'en-US';
      
      // Add event listeners for error handling
      newUtterance.onerror = (event) => {
        console.error('Speech synthesis error:', event.error);
        setIsPlaying(false);
      };
  
      newUtterance.onend = () => {
        console.log('Speech synthesis finished.');
        setIsPlaying(false);
      };
  
      window.speechSynthesis.speak(newUtterance);
      setUtterance(newUtterance);
      setIsPlaying(true);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-700">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center text-purple-700">
          Generate a Story
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="border border-gray-300 p-2 mb-4 rounded text-black"
            placeholder="Enter your story idea"
          />
          <button
            type="submit"
            className="bg-red-600 text-white py-2 rounded hover:bg-red-700 transition duration-200 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <svg
                className="w-5 h-5 mr-2 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 0116 0"
                ></path>
              </svg>
            ) : (
              'Generate Story'
            )}
          </button>
        </form>
        {error && (
          <div className="mt-6 text-red-600">
            <p>{error}</p>
          </div>
        )}
        {title && story && (
          <div className="mt-6 flex flex-col items-center">
            <h2 className="text-xl font-bold text-purple-700">{title}</h2>
            <p className="mt-2 text-orange-600">{story}</p>
            <button
              onClick={handlePlayPauseAudio}
              className="mt-4 bg-red-500 text-white p-2 rounded-full hover:bg-orange-700 transition duration-200 flex items-center justify-center"
            >
              <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoryPage;
