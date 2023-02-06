const ProgressBar = ({ progress }) => {
  
  const colors = [
    'rgb(255,214,161)',
    'rgb(255,175,163)',
    'rgb(255,128,163)',
    'rgb(255,64,163)',
  ];

  const randomProgressColor = colors[Math.floor(Math.random() * colors.length)];

  return (
    <div className="outer-bar">
      <div
        className="inner-bar"
        style={{width: `${progress}%`, backgroundColor: randomProgressColor}}
      >

      </div>
    </div>
  );
};

export default ProgressBar;
