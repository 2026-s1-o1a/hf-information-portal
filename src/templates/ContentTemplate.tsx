function ContentTemplate({ content }: any) {
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

      </main>
    );
  }
  
  export default ContentTemplate;