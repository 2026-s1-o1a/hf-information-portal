export default function SurveyButton() {
  const openSurvey = () => {
    window.location.href =
      'https://localhost:44343/caffeine-heart-health-survey/';
  };

  return (
    <button onClick={openSurvey}>
      Take the Survey
    </button>
  );
}

