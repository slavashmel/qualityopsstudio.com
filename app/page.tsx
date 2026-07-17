import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { detectLocale, defaultLocale } from "@/lib/i18n";

export default async function Home() {
  const cookieStore = await cookies();
  const headerStore = await headers();
  const cookieLocale = cookieStore.get("NEXT_LOCALE")?.value;
  const acceptLanguage = headerStore.get("accept-language");
  const locale = detectLocale(acceptLanguage, cookieLocale);
  const forwardedProto = headerStore.get("x-forwarded-proto");
  const forwardedHost = headerStore.get("x-forwarded-host");
  const host = forwardedHost ?? headerStore.get("host");

  if (forwardedProto === "https" && host) {
    redirect(`https://${host}/${locale || defaultLocale}`);
  }

  redirect(`/${locale || defaultLocale}`);
}
