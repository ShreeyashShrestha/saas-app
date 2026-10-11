import CompanionForm from "@/components/CompanionForm";
import { newCompanionPermissions } from "@/lib/actions/companion.actions";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const NewCompanion = async () => {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const canCreateCompanion = await newCompanionPermissions();
  return (
    <main className="mb-5 flex min-h-[calc(100vh-80px)] items-center justify-center px-4">
      {canCreateCompanion ? (
        <article className="flex w-full flex-col items-center gap-4">
          <h1>Companion Builder</h1>
          <CompanionForm />
        </article>
      ) : (
        <article className="companion-limit">
          <Image
            src="/images/limit.svg"
            alt="Companion limit reached"
            width={360}
            height={230}
          />
          <div className="cta-badge">Upgrade your plan</div>
          <h1>You've Reached Your Limit</h1>
          <p>
            You've reached your companion limit. Upgrade to create more
            companions and premium features.
          </p>
          <Link
            href="/subscription"
            className="btn-primary w-full justify-center"
          >
            Upgrade My Plan
          </Link>
        </article>
      )}
    </main>
  );
};

export default NewCompanion;
