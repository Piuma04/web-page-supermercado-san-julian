import { Suspense } from "react";
import ProfileLayout from "@/app/components/profile/ProfileLayout";
import ProfileSkeleton from "@/app/components/profile/ProfileSkeleton";

export default async function Profile(
  props: {
    searchParams?: Promise<{
      query?: string;
      page?: string;
    }>
  }
) {  
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams?.page) || 1;
  
  return (
    <Suspense fallback={<ProfileSkeleton />}>
      <ProfileLayout currentPage={currentPage} />
    </Suspense>
  );
}