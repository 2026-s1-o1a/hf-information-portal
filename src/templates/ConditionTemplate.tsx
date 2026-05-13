function ConditionTemplate({ content }: any) {
    const props = content.properties;
  
    return (
      <main>
        <h1>{props.pageTitle}</h1>
  
        <p>{props.overview}</p>

        {props.bodyContent && (
            <div
                dangerouslySetInnerHTML={{
                __html: props.bodyContent?.markup
                }}
            />
        )}

        {props.bodyContent && (
            <div
                dangerouslySetInnerHTML={{
                __html: props.symptoms?.markup
                }}
            />
        )}

        {props.bodyContent && (
            <div
                dangerouslySetInnerHTML={{
                __html: props.causes?.markup
                }}
            />
        )}

        {props.bodyContent && (
            <div
                dangerouslySetInnerHTML={{
                __html: props.treatments?.markup
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
  
  export default ConditionTemplate;