function VideoTemplate({ content }: any) {
    const props = content.properties;
  
    return (
      <main>
        <h1>{props.pageTitle}</h1>
  
        <div
          dangerouslySetInnerHTML={{
            __html: props.overview
          }}
        />

        {props.description && (
        <div
            dangerouslySetInnerHTML={{
            __html: props.description?.markup
            }}
        />
        )}
  
        {props.videoUrl && (
          <iframe
            width="560"
            height="315"
            src={props.videoUrl}
            title="Video"
          />
        )}
      </main>
    );
  }
  
  export default VideoTemplate;