const Resume = ({ resume }) => {
  return (
    <>
      <a
        href={`${resume}`}
        target="resume"
        className="btn"
        style={{ fontSize: "28px", padding: "10px", zIndex: "1" }}
      >
        Download Resume
      </a>
    </>
  );
};

export default Resume;
