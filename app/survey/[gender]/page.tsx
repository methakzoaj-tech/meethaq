import SurveyPageClient from "./SurveyPageClient";

export default async function Page({ params }: { params: Promise<{ gender: string }> }) {
  const { gender } = await params;
  return <SurveyPageClient gender={gender} />;
}
