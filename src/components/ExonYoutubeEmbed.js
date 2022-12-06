import React from 'react';
import PropTypes from 'prop-types';

const YoutubeEmbed = () => (
  <div className="video-responsive">
    <iframe
      width="853"
      height="480"
      //   src={`https://www.youtube.com/embed/${embedId}`}
      src="https://www.youtube-nocookie.com/embed?max-results=1&showinfo=0&rel=0&listType=user_uploads&list=BRKsEDU"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </div>
);

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired,
};

export default YoutubeEmbed;
